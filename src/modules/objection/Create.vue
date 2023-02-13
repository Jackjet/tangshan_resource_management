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
          <div class="progress_bar_title">资源异议流程</div>
          <el-col :span="16" :offset="4">
            <div class="progress_step">
              <div class="step1">
                <img src="../../assets/images/icons/ico_zysq_sel.svg" alt=""><span>提交异议</span>
              </div>
              <div class="step_arrows"><img src="../../assets/images/icons/ico_to.svg" alt=""></div>
              <div class="step2">
                <img src="../../assets/images/icons/ico_tgdwsp.svg" alt=""><span>提供单位处理</span>
              </div>
              <div class="step_arrows"><img src="../../assets/images/icons/ico_to.svg" alt=""></div>
              <div class="step3">
                <img src="../../assets/images/icons/ico_zysq_sel.svg" alt=""><span>结果反馈</span>
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
          <div class="breadCrumbNav clearfix" style="width: 1190px;">
            <span class="col3">/</span>
            <span>资源异议</span>
            <!--<router-link tag="span" :to="{ name: 'data' }">-->
            <!--</router-link>-->
          </div>
          <div class="apply_form">
            <div class="apply_res_form">
              <div class="label_title">资源信息</div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">资源名称</div>
                <div :class="[ 'form-item-content']">
                  <input type="text"  v-model.trim="form.resName" disabled="" class="inputDisable"/>
                </div>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">提供单位</div>
                <div :class="[ 'form-item-content']">
                  <input type="text"  v-model.trim="form.supplyDepName" disabled="" class="inputDisable" />
                </div>
              </div>
              <div class="apply_res_group mb17" style=" height: 20px;">
                <div  class="apply_res_label">描述</div>
                <div :class="[ 'form-item-content']">
                  <input type="text"  v-model.trim="form.resDescription" disabled="" class="inputDisable" />
                </div>
              </div>
              <div class="label_title">异议说明</div>
               <div class="apply_res_group mb17">
                  <div  class="apply_declare_label">
                    <img src="../../assets/images/icons/＊.svg" alt="">问题类型
                  </div>
                  <select class="base-imput" v-model="form.type" >
                   <option v-for='rt in typeList' :value='rt.code'>
                     {{ rt.name }}
                   </option>
                  </select>
                </div>
              <div class="apply_res_group mb17">
                  <div  class="apply_declare_label">
                    <img src="../../assets/images/icons/＊.svg" alt="">问题描述
                  </div>
                <div :class="[{ 'error': $v.form.description.$error }, 'form-item-content']">
                  <textarea class="textarea_input" name="purpose" rows="7" cols="141" placeholder="请详细描述资源目录或共享资源的问题"  v-model.trim="form.description" @input="$v.form.description.$touch()" ></textarea>
                  <div class="error-message warnMessage" v-if="!$v.form.description.required"></div>
                  <div class="error-message" v-else-if="!$v.form.description.maxLength">问题描述不超过200个字符</div>
                </div>
                <div class="error-message" v-show="descriptionRequired===true" style="margin-left: 105px;">请输入问题描述</div>
              </div>
              <!--<div class="apply_res_group mb17">
                <div  class="apply_declare_label">参考链接</div>
                <div class="form-item-content">
                  <input type="text" class="login-name explainInput" placeholder="http://" v-model.trim="form.referUrl" />
                </div>
              </div>
              <div class="apply_res_group mb17">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">期望解决时间
                </div>
                <vue-datepicker-local id="expectTime"
                                      v-model="form.expectTime"
                                      :disabled-date="disabledDate"
                                      placeholder="期望解决时间" style="width: 285px" />

              </div>-->
              <div class="apply_res_group mb17">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">联系人
                </div>
                <div :class="[{ 'error': $v.form.contractPerson.$error }, 'form-item-content']">
                  <input type="text" class="login-name explainInput" name="contractPerson"  v-model.trim="form.contractPerson" @input="$v.form.contractPerson.$touch()" />
                  <div class="error-message warnMessage" v-if="!$v.form.contractPerson.required"></div>
                  <div class="error-message" v-else-if="!$v.form.contractPerson.maxLength">名称不超过20个字符</div>
                </div>
                <div class="error-message" v-show="contractPersonRequired===true" style="margin-left: 105px;">请输入联系人名称</div>
              </div>
              <div class="apply_res_group mb17">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">联系电话
                </div>
                <div :class="[{ 'error': $v.form.contractPhone.$error }, 'form-item-content']">
                  <input type="text" class="login-name explainInput" name="contractPhone"  v-model.trim="form.contractPhone" @input="$v.form.contractPhone.$touch()" />
                  <div class="error-message warnMessage" v-if="!$v.form.contractPhone.required"></div>
                  <div class="error-message" v-else-if="!$v.form.contractPhone.maxLength">联系电话不超过20个字符</div>
                  <div class="error-message" v-else-if="!$v.form.contractPhone.mobile">请输入正确的手机号码</div>
                </div>
                <div class="error-message" v-show="contractPhoneRequired===true" style="margin-left: 105px;">请输入联系电话</div>
              </div>
              <div class="apply_res_group mb17">
                <div  class="apply_declare_label">
                 电子邮箱
                </div>
                <div :class="[ 'form-item-content']">
                  <input type="text" class="login-name explainInput" name="contractEmail"  v-model.trim="form.contractEmail" />
                </div>
              </div>
              <div class="apply_res_group mb17">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">问题附件
                </div>
                <el-upload
                  class="upload-demo"
                  :action="uploadFileUrl"
                  multiple
                  :limit="5"
                  :on-exceed="handleExceed"
                  :on-success="uploadSuccess"
                  :on-remove="onRemoveFile"
                  :file-list="uploadFiles">
                  <el-button size="small" class="upload_btn">
                    <img src="../../assets/images/icons/ico_upload.svg" alt="">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip uploadTip">
                    <img src="../../assets/images/icons/ico_link.svg" alt="">
                    最多上传5个附件，每个附件不大于10M，支持word、pdf、jpg等文件格式
                  </div>
                </el-upload>
              </div>

            </div>
            <div class="submit_btn">
              <el-button type="success" size="small" @click="commit" :class="[{ 'disabled': $v.form.$invalid}]">提交</el-button>
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
  import Headers from '@/components/header/Header'
  import Footers from '@/components/footer/Footer'
  export default {
    data () {
      return {
        uploadFileUrl:"/zuul/ro/share-objection-api/uploadFile.do",
        uploadFiles:[],
        myData: [],
        keyword: '',
        now: -1,
        descriptionRequired:false,
        contractPersonRequired:false,
        contractPhoneRequired:false,
        checkbox: 'checkbox',
        typeList: [
          { code: '01', name: '信息项缺失' },
          { code: '02', name: '信息项描述错误/不准确'},
          { code: '03', name: '共享资源不能正常使用' },
          { code: '04', name: '共享资源与目录不匹配' },
          { code: '05', name: '资源目录基本信息不准确' },
          { code: '06', name: '更新频率不符' },
          { code: '07', name: '其他' }
        ],
        expectTime:'',
        form: {
          name: '',
          description: '',
          expectTime:'',
          supplyDepCode: '',
          supplyDepName: '',
          type:'',
          contractPerson:'',
          contractPhone:'',
          fileList:[]
        },
        layerIndex: ''
      }
    },
    validations: {
      form: {
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
      contractPerson(){
        return this.form.contractPerson
      },
      contractPhone(){
        return this.form.contractPhone
      },
      description(){
        return this.form.description
      }
    },
    watch: {
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
    created () {
//      this.getDeptList()
      this.makeForm()
    },
    methods: {
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
          API.Objection.deleteFile({"fileKey":fileKey});
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
        var resInfo = this.$route.params.resInfo;
        this.form.resId = resInfo.resId
        this.form.resName = resInfo.resName;
        this.form.resType = resInfo.resType
        this.form.resDescription = resInfo.resDescription
        this.form.resCatId = resInfo.resCatId
        this.form.resCatName = resInfo.resCatName
        this.form.supplyDepId = resInfo.supplyDepId
        this.form.supplyDepCode = resInfo.supplyDepCode
        this.form.supplyDepName = resInfo.supplyDepName
      },
      commit () {
        // 校验
        if (this.$v.form.$invalid ) {
          return
        }
//        this.makeForm()
        if (this.form.supplyDepCode === ''||this.form.resId === '') {
          return layer.msg('请选择返回重新选择资源')
        }
        if(this.form.type===''){
          return layer.msg('请选择问题类型')
        }
//        if(this.form.expectTime===''){
//          return layer.msg('请选择期望解决时间')
//        }
        if(this.form.fileList.length==0){
          return layer.msg('请上传问题附件')
        }
        API.Objection.commit(this.form).then((res) => {
          if (res.status === 'OK') {
            layer.msg('提交成功！')
            this.$router.push({name: 'userIndex'})
          }
        })
      },
      save () {
        // 校验
        if (this.$v.form.$invalid ) {
          return
        }
        if (this.form.supplyDepCode === ''||this.form.resId === '') {
          return layer.msg('请选择返回重新选择资源')
        }
        if(this.form.type===''){
          return layer.msg('请选择问题类型')
        }
//        if(this.form.expectTime===''){
//          return layer.msg('请选择期望解决时间')
//        }
        if(this.form.fileList.length==0){
          return layer.msg('请上传问题附件')
        }
//        this.makeForm()
        API.Obejection.save(this.form).then((res) => {
          if (res.status === 'OK') {
            layer.msg('暂存成功！')
            this.$router.push({name: 'objection'})
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
  @import "../../modules/resApply/css/index.css";
  .wrapper {
    /*width: 1190px;*/
    margin: 30px auto 0;
    background: #fff;
    border: 1px solid #ccc;
    .data-box{
      padding-top: 20px;
      .container{
        width: 100%;
        padding: 0 15px;
        display: table;
      }
      .row{
        display: table-row;
        margin: 0 -15px;
      }
      .column{
        display: table-cell;
        padding: 15px;
        max-width: 280px;
        .base{
          border: 1px solid #ccc;
          padding: 10px;
          min-width: 300px;
          min-height: 460px;
        }
        .searcher{
          margin-top: 1px;
          input{
            height: 36px;
          }
          .icon{
            width: 60px;
            text-align: center;
            border: 1px solid #ccc;
            display: inline-block;
            line-height: 34px;
            height:36px;
            color: #4898d5;
          }
          .icon:hover{
            cursor: pointer;
          }
          .res-box{
            margin-top:10px;
            border-bottom: 1px solid #ccc;
            .res-icon{
              /*background: url(./images/ods.png);*/
              background-repeat:no-repeat;
              background-size:100% 100%;
              -moz-background-size:100% 100%;
              width: 40px;
              height: 40px;
              margin-right:5px;
              float: left;
            }
            res-info{
              display: inline-block;
            }
            .res-body{
              clear:both;
              height: 30px;
              .itm{
                width:20px;
                height:20px;
                /*background: url(./images/itm.png);*/
                background-repeat:no-repeat;
                background-size:100% 100%;
                -moz-background-size:100% 100%;
                float:left;
              }
              lable{
                display: inline-block;
                padding-left:10px;
                line-height:30px;
              }
              input{
                height: 13px;
                float:right;
              }
            }
          }
        }
      }
    }
    .detail-top {
      position: relative;
      border-bottom: 1px solid #ccc;
      padding: 30px 50px;
      background: #f9f9f9;
      h2 {
        max-width: 400px;
        word-break: break-all;
      }
    }
    form{
      .form-item{
        .not-null{
          color: red;
          margin-right: 2px;
        }
        .form-item-content{
          input{
            width: 100%
          }
          .demand-type{
            width: 100%;
            height: 36px;
          }
          .tag{
            position: relative;
            background-color: rgba(241, 241, 241, 1);
            height:36px;
            display:inline-block;
            min-width:60px;
            *display:inline;
            *zoom:1;
            border: 1px solid #ccc;
            border-radius:4px;
            line-height:36px;
            text-align: center;
            margin-right: 5px;
            a {
              cursor: pointer;
              line-height:12px;
              font-size:9px;
              color: #ccc;
              position: absolute;
              top: 2px;
              right: 2px;
            }
            a:hover{
              color: #999;
            }
          }
          .addTag{
            height: 36px;
            width:95px;
            margin-top:10px;
            background: #0f92f3;
            border-radius:4px;
            text-align:center;
            line-height:36px;
            color:#fff;
          }
          .w150{
            width: 150px;
          }
          .select-box{
            border: 1px solid #ccc;
          }
          .gray{
            background: #0f92f3;
            color:#fff;
          }
          .text-center:hover{
            background: #0f92f3;
            color:#fff;
          }
          .addTag:hover{
            cursor:pointer;
          }
        }
        .btn-save{
          text-align: center;
          a {
            display: inline-block;
            width: 95px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            border: 1px solid @linkColor;
            background: @linkColor;
            color: #fff;
            border-radius: 5px;
            transition: all .3s;
            &:hover {
              background: @linkColorHover;
            }
            &:last-child {
              margin-left: 25px;
            }
            &.disabled {
              background: #aaa;
              cursor: default;
              border: 1px solid #aaa;
            }
          }
        }
      }
    }
  }
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
  .apply_declare_label{
    width:85px;
  }
  .base-imput{
    width: 50%;
    border-radius: 2px;
    border: 1px solid rgba(204,204,204,1);
    padding: 0 10px;
    font-size: 10px;
  }
  .textarea_input{
    width: 80%;
    padding: 5px;
    border-radius: 2px;
    font-size: 10px;
    border: 1px solid rgba(204,204,204,1);
  }
  .warnMessage{
    margin-left: 18%;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 12px;
    margin-top:5px;
  }
  .inputDisable{
    border-color: #fff;
    width: 85%;
  }
  .explainInput{
    background:rgba(255,255,255,1);
    border-radius:2px;
    border:1px solid rgba(204,204,204,1);
    width: 50%;
    height: 28px;
    padding-left:15px;
  }
  .apply_res_group{
    /*margin-top:0;*/
  }
  .mb17{
    margin-bottom:17px;
  }
  .error-message{
    color: red;
    font-size:12px;
  }
</style>
