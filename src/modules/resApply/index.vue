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
          <div class="breadCrumbNav clearfix" style="width: 1190px;">
            <span class="col3">/</span>
            <span>资源申请</span>
            <!--<router-link tag="span" :to="{ name: 'data' }">-->
            <!--</router-link>-->
          </div>
          <div class="apply_form">
            <div class="apply_res_form">
              <div class="label_title">您申请的资源</div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">资源名称</div>
                <span class="apply_res_input">{{name}}</span>
                <span class="apply_res_type">{{typeName}}</span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">提供单位</div>
                <span class="apply_res_input">{{depName}}</span>
              </div>
              <div class="apply_res_group" style="margin-bottom: 46px; height: 20px;">
                <div  class="apply_res_label">描述</div>
                <span class="apply_res_input">{{description}}</span>
              </div>
              <div class="label_title">申请说明</div>
              <div class="apply_res_group" style="margin-bottom: 46px;">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">共享方式
                </div>
                <div class="apply_declare_tag_group">
                  <el-radio v-model="param.busType" label="01">接口</el-radio>
                  <el-radio v-model="param.busType" label="02">文件</el-radio>
                  <span style="color: #ccc;">文件默认xls或xlsx格式</span>
                  <div class="error_hint" v-show="isNullBusType">请选择一个共享方式</div>
                </div>
              </div>
              <div class="apply_res_group" style="margin-bottom: 46px;">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">数据提供方式
                </div>
                <div class="apply_declare_tag_group">
                  <!--<el-tag v-for="(item,index) in purposeList" :key="index" @click="purposeClick(index)"
                  :id="'purpose_'+index">{{item.name}}</el-tag>-->
                  <el-radio v-model="param.purpose" label="批量" style="margin-right: 0px;">批量</el-radio>
                  <el-radio v-model="param.purpose" label="查询" style="margin-right: 0px;">查询</el-radio>
                  <el-radio v-model="param.purpose" label="核验" style="margin-right: 0px;">核验</el-radio>
                  <el-radio v-model="param.purpose" label="其它" style="margin-right: 10px;">其它</el-radio>
                  <span style="color: #ccc;">选择其它请在业务需求场景中详细描述</span>
                  <div class="error_hint" v-show="isNullPurpose">请选择一项用途</div>
                </div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">业务需求场景
                </div>
                <el-input
                  type="textarea"
                  :rows="7"
                  placeholder="请输入内容"
                  v-model="param.busreq">
                </el-input>
                <div class="input_hint">请填写本共享资源主要应用的系统（系统名称、简介）、应用场景、业务办理描述或其他</div>
                <div class="error_hint" v-show="isNullBusreq">业务需求场景不能为空</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">信息项需求
                </div>
                <el-input
                  type="textarea"
                  :rows="7"
                  placeholder="请输入内容"
                  v-model="param.itemreq">
                </el-input>
                <div class="input_hint">信息项请按实际需求填写</div>
                <div class="error_hint" v-show="isNullItemreq">信息项需求不能为空</div>
              </div>

              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">申请依据
                </div>
                <el-input
                  type="textarea"
                  :rows="7"
                  placeholder="请输入内容"
                  v-model="param.explains">
                </el-input>
                <div class="error_hint" v-show="isNullDeclare">申请依据不能为空</div>
                <el-upload
                  class=""
                  action="string"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="onBeforeUpload"
                  :http-request="uploadFile"
                  multiple
                  :limit="5"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" class="upload_btn" style="width: 135px;margin-left: 90px;margin-top: 10px;">
                    <img src="../../assets/images/icons/ico_upload.svg" alt="">依据附件上传</el-button>
                  <div slot="tip" class="el-upload__tip uploadTip"><img src="../../assets/images/icons/ico_link.svg" alt="">最多上传5个附件，每个附件不大于10M，支持word、pdf、jpg等文件格式</div>
                </el-upload>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  使用期限
                </div>
                <el-date-picker size="small" v-model="times"
                                :editable="false"
                                type="daterange"
                                :picker-options="expireTimeOption"
                                placeholder="选择日期" value-format=" yyyy-MM-dd" format="yyyy-MM-dd">
                </el-date-picker>
                <div class="input_hint">如不填则为申请永久使用</div>
                <div class="error_hint" v-show="isNullDate">使用期限不能为空</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">联系人
                </div>
                <el-input v-model="param.applyUserName" placeholder="请输入联系人"></el-input>
                <div class="error_hint" v-show="isApplyUserName">请输入联系人</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">手机号
                </div>
                <el-input v-model="param.applyUserPhone" placeholder="请输入手机号码"></el-input>
                <div class="error_hint" v-show="isTelphone">请输入正确的手机号码</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">办公电话
                </div>
                <el-input v-model="param.applyUserTel" placeholder="请输入办公电话"></el-input>
                <div class="error_hint" v-show="isTel">请输入正确的办公电话</div>
              </div>
              <div class="apply_res_group">
                <div  class="apply_declare_label">
                 电子邮箱
                </div>
                <el-input v-model="param.applyUserEmail" placeholder="请输入电子邮箱"></el-input>
                <div class="error_hint" v-show="isEmailConfirm">请输入正确的邮箱地址</div>
              </div>

              <div class="apply_res_group">
                <div  class="apply_declare_label">
                  <img src="../../assets/images/icons/＊.svg" alt="">
                  <el-checkbox v-model="checked" @change="checkedChange"></el-checkbox>
                </div>
                <div style="line-height: 37px;">
                  我已阅读并同意<a style="color: blue;" @click="outerVisible = true">《唐山市政府数据共享网站声明》</a>
                </div>
                <div class="error_hint" v-show="isAgreementConfirm1">请阅读网站声明并同意</div>
              </div>
              <div class="apply_res_group" v-show="flag1">
                <div style="margin-left: 91px;">
                  保密声明已上传！
                </div>
              </div>
              <div class="apply_res_group" v-show="flag">
                <div  class="apply_declare_label" style="width: 180px;">
                  <img src="../../assets/images/icons/＊.svg" alt="">
                  <el-button @click="downloadTemp" style="font-weight: 500;background-color: #00b2ff;">保密声明模板</el-button>
                </div>
                <el-upload
                  class=""
                  action="string"
                  :on-remove="handleRemove1"
                  :before-upload="onBeforeUpload1"
                  :http-request="uploadFile1"
                  :limit="1"
                  :on-exceed="handleExceed1"
                  :file-list="fileList1">
                  <el-button size="small" class="upload_btn" style="width: 106px;margin-top: 5px;">
                    <img src="../../assets/images/icons/ico_upload.svg" alt="">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip uploadTip" style="margin-top: 22px;">将左侧《保密承诺书》模板下载、打印、盖章、上传</div>
                  <div class="error_hint" v-show="isAgreementConfirm">请上传保密承诺书</div>
                </el-upload>
              </div>
              <el-dialog title="共享声明" :visible.sync="outerVisible">
                <h1 style="font-size: 22px;text-align: center;">唐山市政府数据共享网站声明</h1>
                <div style="line-height: 20px;"><h2 style="text-align: center;"> 第一项    网站使用条款</h2>
                  <p>在您访问或使用唐山市政府数据共享网站（以下简称本网站）前，请认真阅读本声明。如使用本网站，您必须完全接受本声明中所包含的条款、条件和网站即时刊登的通告，并且遵守中华人民共和国关于政务网的相关法律、规定与规则。
                  <p>本网站有权不经提前通知随时修改本声明。本声明一经变动，将在相关页面提示修改内容；用户如果不同意本声明的修改，可以放弃使用或者访问本网站或取消已经获得的服务；如果用户选择在本声明修改后继续使用本网站，则视为用户已经接受本声明的修改。</p>
                                                       <h2 style="text-align: center;">第二项    用户接受条款</h2>
                  <p>用户在访问或使用本网站过程中，必须遵循以下原则：</p>
                  <p>（一）遵守中华人民共和国有关政务网管理的相关法律、法规和规章；</p>
                  <p>（二）遵守所有与网络服务有关的网络协议、规定和程序；</p>
                  <p>（三）禁止对网站进行技术性破坏，不得干扰或妨害本网站提供正常的政务网服务；</p>
                  <p>（四）不得利用本网站进行任何可能对政务网的正常运转造成不利影响的行为；</p>
                  <p>（五）不得为任何非法目的而使用、利用本网站；</p>
                  <p>（六）不得利用本网站散布广告以及其它商业化的宣传；</p>
                  <p>（七）不得利用本网站发布或传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的、可能产生不良后果的信息资料，不得发布任何包含种族、性别、宗教有歧视性和攻击性的信息内容；</p>
                  <p>（八）用户发现任何非法使用用户帐号或安全漏洞的情况，应当立即告知本网站运营管理方。</p>
                                                          <h2 style="text-align: center;">第三项    网站服务内容</h2>
                  <p> 本网站主要提供数据下载、API开发服务、APP应用程序上传与下载等功能。网站数据涉及了表格、文本、图片、地图、多媒体等各类实时与非实时的政府可公开数据。</p>
                                                       <h2 style="text-align: center;">第四项    用户的权利与义务</h2>
                  <p> （一）用户的权利与义务
                  <p> 1．现阶段，用户有权免费获取本网站所提供的所有政府数据资源，享有数据资源的非排他使用权。用户不得有偿或无偿转让在本网站中获取的各种数据资源。</p>
                  <p> 2．用户应在应用本网站政府数据资源所产生的成果中注明政府数据资源来源为"唐山市政府数据共享平台"，及时将应用情况通过网站进行备案，并应积极配合有关的用户需求调查和数据资源调查。</p>
                  <p> 3．用户在发布基于本网站获取的政府数据资源开发的APP应用时，应确保其发布内容不会侵犯任何第三方的合法权益（包括但不限于著作权、商标权、专利权等），不会违反任何法律、法规、条例或规章，如造成法律纠纷及事故，由用户承担相应法律责任。</p>
                  <p> （二）“唐山政府数据共享平台”的权利与义务
                  <p> 1、本网站包含的所有内容（包括但不限于：文本、图形、图片、地图、LOGO标识，版面设计，专栏目录与名称、内容分类）的所有权归唐山市大数据资源管理中心所有。</p>
                  <p> 2、在任何情况下，本网站有合理理由怀疑用户的行为违反法律、法规、规章以及本声明的，本网站有权在任何时候，随时终止向该用户提供服务。</p>
                  <p> 3、本网站提供的各项网络服务目前均为免费，但我们保留收费浏览及收费下载的权利。</p>
                  <p> 4、本通过平台成功注册的用户，不受歧视的享有免费访问、获取、使用、传播分享和利用及再利用数据资源的权利 ，但不得有偿转让在本网站中获取的各种数据资源。</p>
                                                           <h2 style="text-align: center;">第五项    免责声明</h2>
                  <p>（一）本网站所有数据资源均为政府部门在履行政府职能过程中所采集和提供，本网站数据资源提供者对所提供数据的完整性、准确性、及时性不作任何承诺或担保；</p>
                  <p>（二）用户因使用本网站所提供数据、APP应用而造成的任何损失，由用户自行承担；</p>
                  <p>（三）本网站包含到其他网站的链接，这些网站内容和隐私策略可能与本网站不同，本网站不对由于这些网站内容和隐私策略造成的后果承担责任；</p>
                  <p>（四）本网站保留由于法律、法规、规章或政策调整等原因而修订、中止、终止部分或全部网站、网络服务的权利。</p>
                  <p>（五）本网站不对任何因使用数据或任何衍生的分析和应用程序而造成的直接或间接损失承担责任。</p>
                                                      <h2 style="text-align: center;">第六项    隐私保护声明</h2>
                  <p>本网站尊重并保护所有网站用户的个人隐私权，未经用户许可或根据相关法律、法规的强制性规定，本网站不主动将用户个人信息泄露给任何第三方。</p>
                                                    <h2 style="text-align: center;">第七项    条款说明</h2>
                  <p>本网站服务条款的最终解释权归唐山市智慧办所有。</p></div>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="passCheck">同意</el-button>
                  <el-button @click="outerVisible = false">取消</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="submit_btn">
              <el-button type="success" size="small" @click="submit">提交</el-button>
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
  import Headers from '@/components/header/Header'
  import Footers from '@/components/footer/Footer'
  import constantValues from '@/common/utils/constant'
  import cityStation from '@/common/json/cityStation'
  import API from '@/common/api'
  import axios from 'axios'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

  export default {
    props: ['user'],
    data () {
      return {
        flag1:false,
          flag:false,
        checked:false,
        outerVisible:false,
        user: {},
        useDeadline:'',
        explainTextarea:'',
        fileList: [],
        fileList1:[],
        name:'',
        type:'',
        typeName:'',
        depName:'',
        description:'',
        purposeList:[
          {name:'批量'},
          {name:'查询'},
          {name:'核验'},
          {name:'其它'}
        ],
        expireTimeOption: {
          disabledDate (time) {
            let nowData = new Date()
            nowData = new Date(nowData.setDate(nowData.getDate() - 1))
            return time < nowData
          }
        },
        param:{
          busId:'',
          busType:'',
          busName:'',
          busreq:'',
          itemreq:'',
          ownerDeptName:'',
          startTime:'',
          endTime:'',
          purpose:'',
          explains:'',
          applyUserPhone:'',
          applyUserTel:'',
          applyUserEmail:'',
          applyUserName:'',
          shareType:'02',
        fileList: [],
          agreementUrl:''
        },
        times:'',
        isNullBusreq:false,
        isNullItemreq:false,
        isNullBusType:false,
        isNullPurpose:false,
        isNullDate:false,
        isNullDeclare:false,
        isApplyUserName:false,
        isTelphone:false,
        isTel:false,
        isEmailConfirm:false,
        isAgreementConfirm:false,
        isAgreementConfirm1:false
      }
    },
    created () {
      // 获取用户信息
//      API.Common.getLoginInfo().then((res) => {
//          this.param.applyUserName = res.result.name
//      })
      this.param.busId=this.$route.params.id;
      this.param.busName=this.$route.params.name;
      this.param.ownerDeptName=this.$route.params.depName;
      this.name=this.$route.params.name;
      this.type=this.$route.params.type;
      this.depName=this.$route.params.depName;
      this.description=this.$route.params.description;
      if(this.type==='api'){
        this.typeName='接口';
        this.param.busType='01';
      }else if(this.type==='data'){
        this.typeName='文件';
        this.param.busType='02';
      }else if(this.type==='app'){
        this.typeName='云服务';
        this.param.busType='03';
      }else if(this.type==='cata'){
        this.typeName='资源目录';
        this.param.busType='05';
      }
      // 查询部门有没有协议
      API.Common.checkDeptAgreement().then((res) => {
        if(res.result==='0') {
          this.flag = true;
        }else{
          this.flag1 = true;
        }
      })
    },
    methods: {
      downloadTemp(){
        const downloadNodeHelper = document.getElementById('dcDownloadHelper');
        if (downloadNodeHelper) {
          document.body.removeChild(downloadNodeHelper)
        }
        const iframe = document.createElement('iframe');
        iframe.id = 'dcDownloadHelper';
        iframe.style.display = 'none';
        iframe.src = 'http://10.15.1.26:10000/ConfidentialityAgreement.docx';
        this.downloadNodeHelper = 'ok';
        document.body.appendChild(iframe);
      },
      checkedChange(){
          if(this.checked){
            this.isAgreementConfirm1=false;
          }else{
            this.isAgreementConfirm1=true;
          }
      },
      passCheck(){
          this.checked=true;
        this.outerVisible=false;
        this.isAgreementConfirm1=false;
      },
      async submit(){
        var telReg = /^1(3|4|5|6|7|8|9)\d{9}$/
        var telPhoneReg = /^(0315)([\w\W]{1})\d{7}$/
        var telPhoneReg1 = /^(022)([\w\W]{1})\d{8}$/
        if(this.param.busType==''||this.param.busType==null){
          this.isNullBusType = true
          return ;
        }else{
          this.isNullBusType = false
        }
        //用途校验
//        var isHasActiveTag = $(".apply_declare_tag_group .el-tag").hasClass('active')
        if(this.param.busreq==''||this.param.busreq==null){
         this.isNullBusreq = true
          return ;
        }else{
          this.isNullBusreq = false
        }
        if(this.param.itemreq==''||this.param.itemreq==null){
          this.isNullItemreq = true
          return ;
        }else{
          this.isNullItemreq = false
        }
        if(this.param.purpose==''||this.param.purpose==null){
          this.isNullPurpose = true
          return ;
        }else{
          this.param.purpose = this.param.purpose+","
          this.isNullPurpose = false
        }

        //说明文本框不为空
        if(this.param.explains == '' || this.param.explains == null){
           this.isNullDeclare = true
           return ;
         }else{
           this.isNullDeclare = false
         }
         //联系人不为空
        if(this.param.applyUserName == '' || this.param.applyUserName == null){
          this.isApplyUserName = true
          return ;
        }else{
          this.isApplyUserName = false
        }

        if(this.param.applyUserPhone == '' || this.param.applyUserPhone == null){
          this.isTelphone = true
          return ;
        }else if(!telReg.test(this.param.applyUserPhone)){
          this.isTelphone = true
          return;
        }else{
          this.isTelphone = false
        }

        if(this.param.applyUserTel == '' || this.param.applyUserTel == null){
          this.isTel = true
          return ;
        }else if(!telPhoneReg.test(this.param.applyUserTel)&&!telPhoneReg1.test(this.param.applyUserTel)){
          this.isTel = true
          return;
        }else{
          this.isTel = false
        }

        //电子邮箱验证
        var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(this.param.applyUserEmail == '' || this.param.applyUserEmail == null){
          this.isEmailConfirm = false
        }else{
          if(!emailReg.test(this.param.applyUserEmail)){
            this.isEmailConfirm = true
            return;
          }else{
            this.isEmailConfirm = false
          }
        }
        if(this.times!=null&&this.times!=''){
          this.param.startTime=this.times[0]
          this.param.endTime=this.times[1]
        }
        if(!this.checked){
          this.isAgreementConfirm1=true;
          return;
        }else{
          this.isAgreementConfirm1=false;
        }
        if(this.flag&&this.param.agreementUrl==''){
          this.isAgreementConfirm=true;
          return;
        }else{
          this.isAgreementConfirm=false;
        }
        var res;
        if(this.type==='api'){
          res=await axios.post('/ro/share-common-api/userApply/addApiApply.do',this.param);
        }else if(this.type==='app'){
          res=await axios.post('/ro/share-common-api/userApply/addAppApply.do',this.param);
        }else if(this.type==='data'){
          res=await axios.post('/ro/share-common-api/userApply/addDataApply.do',this.param);
        }else if(this.type==='cata'){
          res=await axios.post('/ro/share-common-api/userApply/addCataApply.do',this.param);
        }
        if(res.code==='000000'){
          layer.msg(res.result);
          if(res.status==='OK'){
          if(this.type==='api'){
            this.$router.push({name:'apiDetail', params: {id: this.param.busId}});
          }else if(this.type==='data'){
            this.$router.push({name:'dataDetail', params: {id: this.param.busId}});
          }else if(this.type==='app'){
            this.$router.push({name:'serviceDetail', params: {id: this.param.busId}});
          }else if(this.type==='cata'){
            this.$router.push({name:'resCatalogDetail', params: {id: this.param.busId}});
            }
          }
        }
      },
      async uploadFile(param){
        const formData = new FormData()
        formData.append('file', param.file)
        var options = {
          url: '/zuul/ro/share-common-api/file/upload.do',
          data: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        var res =  await axios.post('/zuul/ro/share-common-api/file/upload.do',formData,{
          'Content-Type': 'multipart/form-data'
        })
        if(res.result.status==='ERROR'){
          param.onError(res.result.message)
          layer.msg(res.result.message);
        }else{
          var temp={
              "uid":param.file.uid,
            "fileKey": res.result.key,
            "fileName": param.file.name.substring(0,param.file.name.lastIndexOf(".")),
            "fileSize": res.result.size,
            "fileType": res.result.type,
            "fileUri": res.result.uri
          }
          this.param.fileList.push(temp);
        }
      },
      async uploadFile1(param){
        const formData = new FormData()
        formData.append('file', param.file)
        var options = {
          url: '/zuul/ro/share-common-api/file/upload.do',
          data: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        var res =  await axios.post('/zuul/ro/share-common-api/file/upload.do',formData,{
          'Content-Type': 'multipart/form-data'
        })
        if(res.status==='ERROR'){
          param.onError(res.message)
          layer.msg(res.message);
        }else{
          var temp={
            "uid":param.file.uid,
            "fileKey": res.result.key,
            "fileName": param.file.name.substring(0,param.file.name.lastIndexOf(".")),
            "fileSize": res.result.size,
            "fileType": res.result.type,
            "fileUri": res.result.uri
          }
          this.fileList1.push(temp);
          this.param.agreementUrl=res.result.uri;
          this.isAgreementConfirm=false;
        }
      },
      onBeforeUpload(file)
      {
        const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png'||'image/jpg'||'application/vnd.openxmlformats-officedocument.wordprocessingml.document'||'application/pdf'||'application/msword';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isIMAGE) {
          layer.msg('上传文件只能是word、pdf、jpg等格式!');
        }
        if (!isLt10M) {
          layer.msg('上传文件大小不能超过 10MB!');
        }
        return isIMAGE && isLt10M;
      },
      onBeforeUpload1(file)
      {
        const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png'||'image/jpg'||'application/vnd.openxmlformats-officedocument.wordprocessingml.document'||'application/pdf'||'application/msword';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isIMAGE) {
          layer.msg('上传文件只能是word、pdf、jpg等格式!');
        }
        if (!isLt10M) {
          layer.msg('上传文件大小不能超过 10MB!');
        }
        return isIMAGE && isLt10M;
      },
      purposeClick(index){
        if(this.param.purpose){
          if(this.param.purpose.indexOf(this.purposeList[index].name+",")!=-1){
            document.getElementById("purpose_"+index).classList.remove("active");
            this.param.purpose=this.param.purpose.replace(this.purposeList[index].name+",","");
          }else{
            document.getElementById("purpose_"+index).classList.add("active");
            this.param.purpose+=this.purposeList[index].name+",";
          }
        }else{
          document.getElementById("purpose_"+index).classList.add("active");
          this.param.purpose+=this.purposeList[index].name+",";
        }
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
        if(this.param.fileList){
          for(var i=0;i<this.param.fileList.length;i++){
            if(this.param.fileList[i].uid===file.uid){
              this.param.fileList.splice(i, 1);
            }
          }
        }
      },
      handleRemove1(file, fileList) {
        console.log(file, fileList);
        if(this.fileList1){
          for(var i=0;i<this.fileList1.length;i++){
            if(this.fileList1[i].uid===file.uid){
              this.fileList1.splice(i, 1);
              this.param.agreementUrl='';
            }
          }
        }
      },
      handlePreview(file) {
        console.log(file);
      },
      handlePreview1(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
//        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        layer.msg("最多只能选择5个文件！！！")

        },
      handleExceed1(files, fileList) {
//        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        layer.msg("最多只能上传1个文件！！！")

      }
    },
    components: {
      ElButton,
      Headers,
      Footers
    }
  }
</script>

<style type="less" scoped>
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
    /* background-color: #fafaf9; */
  }
  .active {
    color: #00ab6e!important;
    background-color: #ecf5ff !important
  }
</style>
