<template xmlns:v="http://www.w3.org/1999/xhtml">


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
              <div class="step1" :class="[detail.reqStatus==0?'show':'']">
                <img src="../../assets/images/icons/ico_zysq_sel.svg" alt=""><span>提交需求</span>
              </div>
              <div class="step_arrows"><img src="../../assets/images/icons/ico_to.svg" alt=""></div>
              <div class="detail_step2" :class="[detail.reqStatus<20?'show':'']">
                <img src="../../assets/images/icons/ico_xycl_sel.svg" alt=""><span>响应处理</span>
              </div>
              <div class="step_arrows"><img src="../../assets/images/icons/ico_to.svg" alt=""></div>
              <div class="detail_step3" :class="[detail.reqStatus>30?'':'show']">
                <img src="../../assets/images/icons/ico_jgfk_sel.svg" alt=""><span>结果反馈</span>
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
          <!--面包屑导航-->
          <div class="breadCrumbNav clearfix">
            <span class="col3">/</span>
            <router-link tag="span" :to="{ name: 'demand' }">
              <a href="javascript:;">部门需求</a>
            </router-link>
            <span class="col9"> &gt; </span>
              <a href="javascript:;">已发布需求</a>
            <span class="col9"> &gt; </span>
            <a href="javascript:;">需求详情</a>
          </div>
          <div class="apply_form">
            <div class="apply_res_form">
              <div class="label_title">需求详情</div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">需求标题</div>
                <span class="apply_res_input">{{detail.name}}</span>
              </div>
               <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">受理单位</div>
                <span class="apply_res_input">{{detail.supplyDepName}}</span>
              </div>
               <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">缘由</div>
                <span class="apply_res_input">{{detail.reasonTypeDesc}}</span>
              </div>
               <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">缘由说明</div>
                <span class="apply_res_input">{{detail.reason}}</span>
              </div>
               <div class="apply_res_group" style="min-height: 50px;">
                <div class="apply_res_label" style="margin-top:10px">需求类型</div>
                 <div class="apply_declare_tag_group" style=" width: 80%;float: left;">
                   <el-tag size="mini" v-for="tag,index in demandTags" :class="{'active': tag.active }"
                            :key="index">{{tag.name}}</el-tag>
                 </div>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">需求描述</div>
                <span class="apply_res_input">{{detail.description}}</span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">期望解决时间</div>
                <span class="apply_res_input">{{detail.expectTime | formatTime}}</span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">联系人</div>
                <span class="apply_res_input">{{detail.contractPerson}}</span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">联系电话</div>
                <span class="apply_res_input">{{detail.contractPhone}}</span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">电子邮箱</div>
                <span class="apply_res_input">{{detail.contractEmail}}</span>
              </div>
               <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">附件</div>
                   <span class="apply_res_input"  v-for="file in detail.fileList">
                     <a :href="file.fileUrl" target='_blank'>{{file.fileName}}</a>
                   </span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">需求提出部门</div>
                <span class="apply_res_input">{{detail.userDepName}}</span>
              </div>
              <div class="apply_res_group" style="height: 20px;">
                <div class="apply_res_label">需求提出时间</div>
                <span class="apply_res_input">{{detail.publishTime | formatTime}}</span>
              </div>
              <div class="label_title" style="margin-top: 20px;">需求详情</div>
                <div class="apply_res_group" style="height: 20px;">
                  <div class="apply_res_label">受理单位</div>
                  <span class="apply_res_input">{{detail.supplyDepName}}</span>
                </div>
              <div v-if="detail.historyList.length != 0">
                <div v-for="history in detail.historyList" :key="index">
                  <div class="apply_res_group" style="height: 20px;">
                    <div class="apply_res_label">反馈内容</div>
                    <span class="apply_res_input">{{history.updatedComment?history.updatedComment:''}}</span>
                  </div>
                  <div class="apply_res_group" style="height: 20px;">
                    <div class="apply_res_label">反馈时间</div>
                    <span class="apply_res_input">{{history.updatedTime?history.updatedTime:''| formatTime}}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                  <div class="apply_res_group" style="height: 20px;">
                    <div class="apply_res_label">反馈内容</div>
                    <span class="apply_res_input"></span>
                  </div>
                  <div class="apply_res_group" style="height: 20px;">
                    <div class="apply_res_label">反馈时间</div>
                    <span class="apply_res_input"></span>
                  </div>
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
  import Headers from '@/components/header/Header'
  import Footers from '@/components/footer/Footer'
  export default {
    props: ['user'],
    components: {
      Headers,
      Footers
    },
    data () {
      return {
        id: '',
        detail: {},
        mostDownload: [],
        demandTags:
          [{name:'新增变更目录',value:1},
          {name:'新增变更文件',value:2},
          {name:'新增变更接口',value:3},
//          {name:'新增变更云服务',value:5},
          {name:'数据交换',value:6},
          {name:'线下对接',value:7}
          ]
      }
    },
    created () {
      this.id = this.$route.params.id
      this.getDetail()
    },
    watch: {
      '$route' (to, from) {
        this.id = this.$route.params.id
        this.getDetail()
      }
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
      getDetail () {
        API.Demand.getDetail({id: this.id}).then((res) => {
          this.detail = res.result
          for(var i=0;i<this.demandTags.length;i++){
            for(var j=0;j<this.detail.resourceTypeList.length;j++){
              if(this.detail.resourceTypeList[j]==this.demandTags[i].value){
                this.demandTags[i]['active']=true;
              }
            }
          }
        })
      },
      isInArray (arr,value) {
        return API.Common.isInArray(arr,value);
      }
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
  .show{
    background: rgba(245,249,250,1);
  }
  .show span{
    color: #495060;
  }
</style>
