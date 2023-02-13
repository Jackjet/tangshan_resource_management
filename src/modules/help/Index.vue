<template>
  <div>
    <el-row class="background_aboutUs">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <Headers @getUser="getUser"></Headers>
        <div>
          <p class="aboutUs_title">关于我们</p>
          <p class="aboutUs_subtitle">
            信息资源共享门户是技术领先的企业级全栈云 ICT 服务商和解决方案提供商，也是致力于为企业用户提供安全可靠、性能卓越、按需、实时的 ICT 资源与管理服务，并携手众多生态合作伙伴共同构建云端综合企业服务交付平台。
          </p>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
    <!--content-->
    <div class="">
      <el-row class="" style="position:unset;background: rgba(250,250,250,1);">
        <el-col :span="2" class="main_layout">
        </el-col>
        <el-col :span="20" style="min-height: 500px;margin-top: 274px;position: relative;">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="aboutUsTabs">
            <el-tab-pane label="关于我们" name="first">
              <div class="aboutUsContent">
                信息资源共享门户 是技术领先的企业级全栈云 ICT
                服务商和解决方案提供商，也是一个基于云模式的综合企业服务平台致力于为企业用户提供安全可靠、性能卓越、按需、实时的 ICT
                资源与管理服务，并携手众多生态合作伙伴共同构建云端综合企业服务交付平台。<br><br>
                目前拥有公有云、企业云和桌面云，超融合系统，软件定义存储，KubeSphere 容器平台，统一多云管理平台，光格网络EverVite 智能广域网服务，Anybox 企业云盘，OpenPitrix
                多云应用管理平台，RadonDB 分布式数据库等产品和服务，以一体化架构实现公有云、私有云、混合云和托管云的一致化交付与统一管理。产品上，全栈云纵向跨越 ICT
                架构各层次，整合立体多维的产品能力；业务上，全模云横向兼顾“稳态”、“敏态”与“混合态”，同时支持企业实现集中式核心业务的云端迁移与互联网分布式核心业务的云端构建。<br><br> 目前正在为逾 90,000
                家企业提供服务，帮助它们构建和运维更加可靠、敏捷、高效的 ICT 基础设施、平台层服务与应用管理平台，显著降低 TCO
                和运维投入。其中既包括众多大型企事业客户，如中国银行、招商银行、光大银行、泰康保险、中国太平、江苏交通控股、华润创业、本钢集团、京博控股、广东省公路局、国航、四川航空、康美药业、环球网、好丽友等，又包括大量新兴行业及互联网企业，如掌众金融、闪银、量化派、91金融、好未来、VIPKID、轻课、大象科技、e城e家、极光推送、SENSORO
                等。<br><br> 凭借全球领先的技术、卓越的产品表现和成熟的企业服务解决方案，荣获工信部
                “最具影响力企业奖”、“全球创新产品奖可信云“技术创新奖”、金融电子化“优秀自主创新奖”、“优秀解决方案奖”、福布斯“中国50家最具创新力企业”、IDC中国“互联网+”产业创新创业100强、荣膺Gartner“Cool
                Vender”，连续两年入选Gartner MG报告，并连续三次被Forrester评为中国公有云服务商“Strong Performer”。<br><br>
                此外，还获得公安部信息系统安全等级保护三级备案证明（等保三级）、ITSS&#174 云计算服务能力标准符合性证书贰级通过国家 ISO 9001 质量管理体系认证、ISO 27001
                信息安全管理体系认证、可信云服务认证、软件能力成熟度集成模型三级认证（CMMI 3）、CSA（Cloud Security Alliance）STAR Tech
                认证、高新技术企业证书、跨境数据通信产业联盟证书等权威机构颁发的证书及认证。<br><br></div>
            </el-tab-pane>
            <el-tab-pane label="版权声明" name="second">
              <div class="aboutUsContent">
                信息资源共享门户 是技术领先的企业级全栈云 ICT
                服务商和解决方案提供商，也是一个基于云模式的综合企业服务平台致力于为企业用户提供安全可靠、性能卓越、按需、实时的 ICT
                资源与管理服务，并携手众多生态合作伙伴共同构建云端综合企业服务交付平台。<br><br>
                目前拥有公有云、企业云和桌面云，超融合系统，软件定义存储，KubeSphere 容器平台，统一多云管理平台，光格网络EverVite 智能广域网服务，Anybox 企业云盘，OpenPitrix
                多云应用管理平台，RadonDB 分布式数据库等产品和服务，以一体化架构实现公有云、私有云、混合云和托管云的一致化交付与统一管理。产品上，全栈云纵向跨越 ICT
                架构各层次，整合立体多维的产品能力；业务上，全模云横向兼顾“稳态”、“敏态”与“混合态”，同时支持企业实现集中式核心业务的云端迁移与互联网分布式核心业务的云端构建。<br><br> 目前正在为逾 90,000
                家企业提供服务，帮助它们构建和运维更加可靠、敏捷、高效的 ICT 基础设施、平台层服务与应用管理平台，显著降低 TCO
                和运维投入。其中既包括众多大型企事业客户，如中国银行、招商银行、光大银行、泰康保险、中国太平、江苏交通控股、华润创业、本钢集团、京博控股、广东省公路局、国航、四川航空、康美药业、环球网、好丽友等，又包括大量新兴行业及互联网企业，如掌众金融、闪银、量化派、91金融、好未来、VIPKID、轻课、大象科技、e城e家、极光推送、SENSORO
                等。<br><br> 凭借全球领先的技术、卓越的产品表现和成熟的企业服务解决方案，荣获工信部
                “最具影响力企业奖”、“全球创新产品奖可信云“技术创新奖”、金融电子化“优秀自主创新奖”、“优秀解决方案奖”、福布斯“中国50家最具创新力企业”、IDC中国“互联网+”产业创新创业100强、荣膺Gartner“Cool
                Vender”，连续两年入选Gartner MG报告，并连续三次被Forrester评为中国公有云服务商“Strong Performer”。<br><br>
                此外，还获得公安部信息系统安全等级保护三级备案证明（等保三级）、ITSS&#174 云计算服务能力标准符合性证书贰级通过国家 ISO 9001 质量管理体系认证、ISO 27001
                信息安全管理体系认证、可信云服务认证、软件能力成熟度集成模型三级认证（CMMI 3）、CSA（Cloud Security Alliance）STAR Tech
                认证、高新技术企业证书、跨境数据通信产业联盟证书等权威机构颁发的证书及认证。<br><br>
              </div>
            </el-tab-pane>
            <el-tab-pane label="常见问题" name="third">
              <div class="aboutUsContent">
                <div>
                  <div style="margin-bottom: 28px;height: 28px">
                    <el-input class="questionInput" v-model="params.search" placeholder="请输入内容">
                      <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
                    </el-input>
                  </div>
                  <div v-for="(item,index) in questionList" :key="item.id" class="questionItem">
                    <div class="question_title">
                      {{item.title}}
                    </div>
                    <div class="question_content">
                      {{item.content}}
                    </div>
                    <hr/>
                  </div>
                  <div>
                    <paginate
                      v-show="pageInfo.totalPage > 0"
                      :page-count="pageInfo.totalPage"
                      :click-handler="jumpPage"
                      :prev-text="'上一页'"
                      :next-text="'下一页'"
                      :container-class="'pagination'">
                    </paginate>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="操作手册" name="fourth">操作手册</el-tab-pane>
            <el-tab-pane label="意见反馈" name="fifth">
              <div class="aboutUsContent">
                <div class="suggestBack_title">填写反馈</div>
                <el-input class="writeBack" type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                          v-model="feedback.content"></el-input>
                <div style="position: relative;">
                  <el-upload ref="upload"
                    class=""
                    action="string"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="onBeforeUpload"
                    :http-request="uploadFile"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="feedbackImgs">
                    <el-button size="small" class="upload_btn">
                      <img src="../../assets/images/icons/ico_upload.svg" alt="">上传图片
                    </el-button>
                    <div slot="tip" class="el-upload__tip uploadTip" style="margin-left: 0;" ><img src="../../assets/images/icons/ico_link.svg"
                                                                          alt="">最多上传3张图片，每张图片不大于1M，支持jpg、png等文件格式
                    </div>
                  </el-upload>
                  <el-button class="aboutUsSubmit" size="mini" @click="submit">提交</el-button>
                </div>
                <div class="suggestBack_title" style="margin-top: 28px;">反馈历史</div>
                <div v-for="(item,index) in feedbackList" :key="item.id" class="feedbackHisItem">
                  <el-col :span="2">
                    <div class="suggestBack_time">
                      {{formatTime3(item.createdTime)}}
                    </div>

                  </el-col>
                  <el-col :span="22">
                    <p class="suggestBack_date">{{formatTime2(item.createdTime)}}</p>
                    <p class="itemTitle">{{item.content}}</p>
                    <div v-if="item.feedbackImgs!=null" v-for="(item2,index2) in item.feedbackImgs" class="imgList">
                      <img :src="item2.fileKey"/>
                    </div>
                    <div v-if="item.listChild!=null" v-for="(item2,index2) in item.listChild" :key="item2.id" class="suggestBack_reply">
                     <div style="height: 28px;">
                       <div class="title">回复：</div>
                       <div class="time">{{formatTime1(item2.createdTime)}}</div>
                     </div>
                      <div class="content">{{item2.content}}</div>
                    </div>
                  </el-col>
                </div>
                <div>
                  <paginate
                    v-show="pageInfo1.totalPage > 0"
                    :page-count="pageInfo1.totalPage"
                    :click-handler="jumpPage1"
                    :prev-text="'上一页'"
                    :next-text="'下一页'"
                    :container-class="'pagination'">
                  </paginate>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="2" class="main_layout">
        </el-col>

      </el-row>
    </div>

    <!--footer-->
    <el-row class="footer_background" style="background: rgba(250,250,250,1); ">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <div>
          <Footers></Footers>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
  </div>
</template>

<script>
  import Headers from '@/components/header/Header'
  import Footers from '@/components/footer/Footer'
  import API from '@/common/api'
  import moment from 'moment'
  import axios from 'axios'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    data() {
      return {
        user: {},
        activeName: '',
        params: {
          page: '',
          pageSize: '5',
          search: ''
        },
        params1: {
          page: '',
          pageSize: '3',
        },
        questionList: '',
        feedbackList: '',
        pageInfo: '',
        pageInfo1: '',
        feedbackImgs: [],
        feedback: {
          id: '',
          parentId: '',
          content: '',
          area: '',
          createdTime: '',
          createdUserId: '',
          createdBy: '',
          updatedTime: '',
          updatedBy: '',
          status: '',
          depId: '',
          depName: '',
          depCode: '',
          feedbackImgs: []
        },
      }
    },
    mounted(){
      this.activeName= this.$route.params.name;
    },
    watch:{
      $route(to,from){
        if(to.params.name!=from.params.name){
          this.activeName= to.params.name;
          this.searchInfo();
          this.getFeedBackInfo();
        }
      }
    },
    created() {
      this.searchInfo();
      this.getFeedBackInfo();
    },
    methods: {
      getUser(user) {
        this.user = user
      },
      searchInfo() {
        API.About.getQuestInfo(this.params).then(res => {
          this.questionList = res.result.list;
          this.pageInfo = res.result.page;
        })
      },
      getFeedBackInfo() {
        API.About.getFeedInfo(this.params1).then(res => {
          this.feedbackList = res.result.list;
          this.pageInfo1 = res.result.page;
        })
      },
      jumpPage(page) {
        this.params.page = page;
        this.searchInfo();
      },
      jumpPage1(page) {
        this.params1.page = page;
        this.getFeedBackInfo();
      },
      handleClick(tab, event) {
        console.log(tab, event);
        if (tab.label === '常见问题') {
          this.searchInfo();
        }
      },
      formatTime1(time) {
        return moment(time).format('YYYY年MM月DD日 HH:mm')
      },
      formatTime2(time) {
        return moment(time).format('YYYY年MM月DD日')
      },
      formatTime3(time) {
        return moment(time).format('HH:mm')
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        if (this.feedback.feedbackImgs) {
          for (var i = 0; i < this.feedback.feedbackImgs.length; i++) {
            if (this.feedback.feedbackImgs[i].fdId === file.uid) {
              this.feedback.feedbackImgs.splice(i, 1);
            }
          }
        }
      },
      onBeforeUpload(file) {
        const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png' || 'image/jpg';
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isIMAGE) {
          layer.msg('上传图片只能是jpg、png、jpeg、gif等格式!');
        }
        if (!isLt1M) {
          layer.msg('上传图片大小不能超过 1MB!');
        }
        return isIMAGE && isLt1M;
      },
      // 上传图片OK
      async uploadFile(param) {
        const formData = new FormData();
        formData.append('file', param.file);
        axios.post('/ro/share-feedback-api/file/upload.do', formData, {'Content-Type': 'multipart/form-data'}).then(res => {
          if (res.result.status === 'ERROR') {
            param.onError(res.result.message);
            layer.msg(res.result.message);
          } else {
            var temp = {
              "fdId": '',
              "fileKey": res.result.key,
              "fileName": param.file.name.substring(0, param.file.name.lastIndexOf(".")),
              "fileSize": res.result.size,
              "fileType": res.result.type,
              "fileUri": res.result.uri
            };
            this.feedback.feedbackImgs.push(temp);
          }
        })
      },
      handleExceed(files, fileList) {
        layer.msg("最多只能选择3张图片！！！")
      },
      async submit() {
        //说明文本框不为空
        if (this.feedback.content === '' || this.feedback.content == null) {
          layer.msg("反馈信息不能为空！");
          return;
        }
        axios.post('/ro/share-feedback-api/pubFeedback.do', this.feedback).then(res => {
          if (res.code === '000000') {
            if (res.status === 'OK') {
              layer.msg("提交成功！");
              this.params1.page = '';
              this.feedback.content='';
              this.$refs.upload.clearFiles();

              this.getFeedBackInfo();
            }
          }
        })
      },

    },
    components: {
      ElCol,
      Headers,
      Footers
    }
  }
</script>

<style  scoped>
  @import "../../assets/css/help.css";

  .main_layout {
    min-height: 20px;
  }
  .slide {
    position: fixed;
    right: 50px;
    bottom: 0;
    z-index: 100;
    width: 40px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
  }
  .demo {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    margin-bottom: 15px;
    min-height: 500px;
    height: auto !important;
    height: 140px;
    background-color: #fff;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    padding: 0 16px;
  }
  .theme1 {
    width: 100%;
    display: inline-block;
    height: 40px;
    border: 1px solid #dadee7;
    background: url("../../assets/images/data_image.png") no-repeat;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .theme1:hover {
    border: 2px solid #5cb981;
  }
  .footer_background {
    background-image: url("../../assets/images/icons/footer_background.png");
    background-repeat: no-repeat;
    background-size: 100% 309px;
    -moz-background-size: 100% 434px;
    background-color: #fafaf9;
  }

  .main_area {
    /* background-color: #fafaf9; */
  }
  .background_aboutUs {
    position: absolute;
    width: 100%;
    height: 313px;
    background: url(../../assets/images/icons/hero_body_bg_base.svg) no-repeat center center;
    min-width: 1366px;
    background-size: 100%;
  }
</style>
