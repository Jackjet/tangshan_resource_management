<template>

  <div>
    <!--header-->
    <el-row >
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <Headers @getUser="getUser"></Headers>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>

    <!--content-->
    <el-row class="main_area">
      <div class="progress_bar">
        <el-col :span="16" :offset="4">
          <div class="progress_bar_title">资源申请流程</div>
          <el-col :span="16" :offset="4">
            <div class="progress_step">
              <div class="step1">
                <img src="../../assets/images/icons/ico_zysq_sel.svg" alt=""><span>资源申请</span>
              </div>
              <div class="step_arrows"><img src="../../assets/images/icons/ico_to.svg" alt=""></div>
              <div class="step2">
                <img src="../../assets/images/icons/ico_tgdwsp.svg" alt=""><span>提供单位处理</span>
              </div>
              <div class="step_arrows"><img src="../../assets/images/icons/ico_to.svg" alt=""></div>
              <div class="step3">
                <img src="../../assets/images/icons/ico_zysq_sel.svg" alt=""><span>资源申请</span>
              </div>
            </div>
          </el-col>

        </el-col>
      </div>
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20" >

        <div class="apply_content">
          <!--面包屑导航-->
          <div class="breadCrumbNav clearfix" style="position: relative;">
            <span class="col3">/</span>
            <span>部门需求</span>
            <div class="goMemandList">
              <router-link tag="span" :to="{ name: 'demand' }">
                 <span>更多已发布需求</span>
                <img src="../../assets/images/icons/ico_to_green.svg" alt="">
              </router-link>
            </div>
          </div>
          <div class="apply_form">
            <div class="apply_res_form">
              <div class="label_title">需求详情</div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">需求标题
                </div>
                <div :class="[{ 'error': $v.form.name.$error }, 'form-item-content']">
                  <input type="text" class="login-name" name="loginName" placeholder="请输入需求名称" v-model.trim="form.name" @input="$v.form.name.$touch()" />
                  <div class="error-message" v-if="!$v.form.name.required"></div>
                  <div class="error-message" v-else-if="!$v.form.name.maxLength">需求名称不超过20个字符</div>
                  <div class="error-message" v-else-if="!$v.form.name.name">请输入中文、英文和数字组合</div>
                </div>
                <div class="error-message" v-show="nameRequired===true">请输入需求标题</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">受理单位
                </div>
                <div class="form-item-content">
                  <select class="demand-type" v-model.trim="form.supplyDepCode" id="dept" >
                    <option v-for="(dep, index) in deptList" :value="dep.dep_code" >{{dep.dep_name}}</option>
                  </select>
                </div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">缘由
                </div>
                <div class="form-item-content">
                  <select class="demand-type"  v-model.trim="form.reasonType">
                    <option v-for="rt in reasonTypeList":value="rt.code">{{rt.name}}</option>
                  </select>
                </div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">缘由说明
                </div>
                <el-input
                  type="textarea" name="purpose" :rows="7" cols="141"
                  placeholder="为便于受理单位处理您的需求，请说明需求提出的缘由"
                  v-model.trim="form.reason" >
                </el-input>
                <div style=" margin-left: 80px; margin-top: 5px;">
                  <div class="error-message" v-if="!$v.form.reason.required"></div>
                  <div class="error-message" v-else-if="!$v.form.reason.maxLength">缘由说明不超过200个字符</div>
                </div>
                <div class="error-message" v-show="reasonRequired===true" style="margin-left: 105px;">请输入缘由说明</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">需求类型
                </div>
                <div class="apply_declare_tag_group" style=" width: 80%;float: left;">
                  <el-tag v-for="tag,index in demandTags" :key="index" @click="tagClick(index,tag.value)"
                          :id="'tag_'+index">{{tag.name}}</el-tag>
                </div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">需求描述
                </div>
                <div :class="[{ 'error': $v.form.description.$error }, 'form-item-content']">
                  <el-input
                    type="textarea" name="purpose" :rows="7" cols="141"
                    placeholder="为便于受理单位处理您的需求，请详细描述资源目录或共享资源的需求"
                    v-model.trim="form.description"
                    @input="$v.form.description.$touch()">
                  </el-input>
                  <div style=" margin-left: 80px; margin-top: 5px;">
                    <div class="error-message" v-if="!$v.form.description.required"></div>
                    <div class="error-message" v-else-if="!$v.form.description.maxLength">需求描述不超过200个字符</div>
                  </div>
                  <div class="error-message" v-show="descriptionRequired===true" style="margin-left: 105px;">请输入需求描述</div>
                </div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  期望解决时间
                </div>
                <vue-datepicker-local id="expectTime" v-model="form.expectTime" :disabled-date="disabledDate" placeholder="期望解决时间" />
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">联系人
                </div>
                <div :class="[{ 'error': $v.form.contractPerson.$error }, 'form-item-content']">
                  <input type="text" class="login-name" name="contractPerson"  v-model.trim="form.contractPerson" @input="$v.form.contractPerson.$touch()" />
                  <div class="error-message" v-if="!$v.form.contractPerson.required"></div>
                  <div class="error-message" v-else-if="!$v.form.contractPerson.maxLength">名称不超过20个字符</div>
                </div>
                <div class="error-message" v-show="contractPersonRequired===true">请输入联系人名称</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">联系电话
                </div>
                <div :class="[{ 'error': $v.form.contractPhone.$error }, 'form-item-content']">
                  <input type="text" class="login-name" name="contractPhone"  v-model.trim="form.contractPhone" @input="$v.form.contractPhone.$touch()" />
                  <div class="error-message" v-if="!$v.form.contractPhone.required"></div>
                  <div class="error-message" v-else-if="!$v.form.contractPhone.maxLength">联系电话不超过20个字符</div>
                  <div class="error-message" v-else-if="!$v.form.contractPhone.mobile">请输入正确的号码</div>
                </div>
                <div class="error-message" v-show="contractPhoneRequired===true">请输入联系电话</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  电子邮箱
                </div>
                <div :class="[ 'form-item-content']">
                  <input type="text" class="login-name" name="contractEmail"  v-model.trim="form.contractEmail" />
                </div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  附件
                </div>
                <div style="width: 80%;float: left;">
                  <el-upload
                    :action="uploadFileUrl"
                    multiple
                    :limit="5"
                    :on-exceed="handleExceed"
                    :on-success="uploadSuccess"
                    :on-remove="onRemoveFile"
                    :file-list="uploadFiles" style="height: 200px;">
                    <el-button size="small"  class="uploadBtn" style="width: 106px; height: 32px;">
                      <img src="../../assets/images/icons/ico_upload.svg" alt="">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="font-size: 12px;color:rgba(153,153,153,1);">
                      <img src="../../assets/images/icons/ico_link.svg" alt="">最多上传5个附件，每个附件不大于10M，支持word、pdf、jpg等文件格式</div>
                  </el-upload>
                </div>
              </div>
              <div class="submit_btn">
                <el-button type="success" size="small" @click="commit" :class="[{ 'disabled': $v.form.$invalid}]">提交</el-button>
                <el-button type="info" size="small" @click="save" :class="[{ 'disabled': $v.form.$invalid }]">暂存</el-button>
              </div>


            </div>
          </div>


        </div>

      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>

    <!--footer-->
    <el-row class="footer_background">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <div>
          <Footers></Footers>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
    <div class="slide">
      <img style="cursor: pointer" src="../../assets/images/icons/float_button.svg" alt="返回顶部" title="返回顶部" href="#" @click="scrollTop">
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  import VueDatepickerLocal from 'vue-datepicker-local'
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'
  import name from '@/common/validation/name'
  import mobile from '@/common/validation/mobile'
//  import resourceItem from '@/common/validation/resourceItem'
  import Headers from '@/components/header/Header'
  import Footers from '@/components/footer/Footer'
  export default {
    data () {
      return {
        uploadFileUrl:"/zuul/ro/share-requirement-api/uploadFile.do",
        uploadFiles:[],
        myData: [],
        keyword: '',
        now: -1,
        checkbox: 'checkbox',
        nameRequired:false,
        contractPersonRequired:false,
        contractPhoneRequired:false,
        reasonRequired:false,
        descriptionRequired:false,
        reasonTypeList: [
          { code: 0, name: '非政策相关' },
          { code: 1, name: '政策相关' }
        ],
        expectTime:'',
        deptList: [],
        form: {
          name: '',
          description: '',
          resourceTypeList: [],
          expectTime:'',
          supplyDepCode: '',
          supplyDepName: '',
          reasonType:'',
          contractPerson:'',
          reason:'',
          contractPhone:'',
          fileList:[]
        },
        resList: [],
        resName: '',
        tempTag: {},
        selectDep: '',
        tempList: [],
        layerIndex: '',
        demandTags:
          [{name:'新增变更目录',value:1},
            {name:'新增变更文件',value:2},
            {name:'新增变更接口',value:3},
//            {name:'新增变更云服务',value:5},
            {name:'数据交换',value:6},
            {name:'线下对接',value:7}
          ]
      }
    },
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(20),
          name
        },
        reason: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200)
        },
        description: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200)
        },
        contractPerson: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200)
        },
        contractPhone: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200),
          mobile
        }
      }
    },
    computed: {
      name() {
        return this.form.name
      },
      contractPerson(){
        return this.form.contractPerson
      },
      contractPhone(){
        return this.form.contractPhone
      },
      reason(){
        return this.form.reason
      },
      description(){
        return this.form.description
      }
    },
    created () {
      this.getDeptList()
    },
    watch: {
      name:{
        handler () {
          if(this.form.name){
              this.nameRequired=false;
          }else{
            this.nameRequired=true;
          }
        },
        deep: true
      },
      contractPerson:{
        handler () {
          if(this.form.contractPerson){
            this.contractPersonRequired=false;
          }else{
            this.contractPersonRequired=true;
          }
        },
        deep: true
      },
      contractPhone:{
        handler () {
          if(this.form.contractPhone){
            this.contractPhoneRequired=false;
          }else{
            this.contractPhoneRequired=true;
          }
        },
        deep: true
      },
      reason:{
        handler () {
          if(this.form.reason){
            this.reasonRequired=false;
          }else{
            this.reasonRequired=true;
          }
        },
        deep: true
      },
      description:{
        handler () {
          if(this.form.description){
            this.descriptionRequired=false;
          }else{
            this.descriptionRequired=true;
          }
        },
        deep: true
      }
    },
    methods: {
      tagClick(index,value){
          for(var i=0;i<this.form.resourceTypeList.length;i++){
            if(this.form.resourceTypeList[i]==value){
            document.getElementById("tag_"+index).classList.remove("active");
              this.form.resourceTypeList.splice(i, 1);
              return;
          }
          }
          document.getElementById("tag_"+index).classList.add("active");
        this.form.resourceTypeList.push(value);
      },
      getUser (user) {
        this.user = user
      },
      scrollTop () {
        if (document.documentElement.scrollTop !== 0) {
          document.documentElement.scrollTop = 0
        }
        if (document.body.scrollTop !== 0) {
          document.body.scrollTop = 0
        }
      },
      handleExceed(){
        layer.msg("最多选择5个文件");
      },
      uploadSuccess(response,file,fileList)
      {
        var data = response.result;
        var tmpFile = {};
        tmpFile['fileName'] = data.fileName;
        tmpFile['fileKey'] = data.OSSFileKey;
        tmpFile['uid'] = file.uid;
        this.form.fileList.push(tmpFile);
      },
      onRemoveFile(file,fileList){
        var fileKey = "";
        var index = -1;
        for(var i=0;i<this.form.fileList.length;i++){
          //uid用来判断新上传，fileKey用来判断旧上传
          if(this.form.fileList[i].uid==file.uid || this.form.fileList[i].fileKey==file.fileKey){
            fileKey = this.form.fileList[i].fileKey;
            index = i;
          }
        }
        if(index!=-1){
          this.form.fileList.splice(index,1);
          API.Demand.deleteFile({"fileKey":fileKey});
        }
      },
      disabledDate (time) {
        // TODO 包含当天
        return new Date() > time
      },
      get (event) {
        if (event.keyCode === 38 || event.keyCode === 40) {
          return
        }
        if (event.keyCode === 13) {
          this.keyword = ''
        }
      },
      getDeptList () {
        this.deptList = []
        API.Dict.getDepsByNode().then((res) => {
          this.deptList = res.result
          if (this.deptList && this.deptList.length > 0) {
            this.form.supplyDepId = this.deptList[0].dep_code
          }
        })
      },
      makeForm(){
        this.form.supplyDepName = $('#dept').find('option:selected').text()
      },
      commit () {
        // 校验
        if (this.$v.form.$invalid ) {
          return
        }
        if (this.form.supplyDepId === '') {
          return layer.msg('请选择资源供给部门')
        }

        this.makeForm()
        if(this.form.resourceTypeList.length==0){
            return layer.msg('请选择需求类型')
        }
        API.Demand.commit(this.form).then((res) => {
          if (res.status === 'OK') {
            layer.msg('提交成功！')
            this.$router.push({name: 'demand'})
          }
        })
      },
      save () {
        // 校验
        if (this.$v.form.$invalid ) {
          return
        }
        if (this.form.supplyDepCode === '') {
          return layer.msg('请选择资源供给部门')
        }
        this.makeForm()
        if(this.form.resourceTypeList.length==0){
          return layer.msg('请选择需求类型')
        }
        API.Demand.save(this.form).then((res) => {
          if (res.status === 'OK') {
            layer.msg('暂存成功！')
            this.$router.push({name: 'demand'})
          }
        })
      }
    },
    components: {
      VueDatepickerLocal,
      Headers,
      Footers
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  @import './css/index.css';
  .main_layout{
    min-height:20px;
  }
  .slide {
    position: fixed;
    right: 50px;
    bottom: 0;
    z-index: 100;
    width: 40px;
    height: 100px;
    background: rgba(255,255,255, 0.1);
  }
  .footer_background{
    background-image:url("../../assets/images/icons/footer_background.png");
    background-repeat:no-repeat;
    background-size:100% 434px;
    -moz-background-size:100% 434px;
  }
  .main_area{
    // background-color: #fafaf9;
  }
  .active {
    color: #00ab6e!important;
    background-color: #ecf5ff !important
  }
</style>
