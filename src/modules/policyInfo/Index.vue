<template>
  <div>
    <!--header-->
    <div class="demand_back">
      <el-row>
        <el-col :span="2" class="main_layout">
        </el-col>
        <el-col :span="20">
          <Headers @getUser="getUser"></Headers>
        </el-col>
        <el-col :span="2" class="main_layout"></el-col>
      </el-row>
    </div>
    <!--content-->
    <el-row>
        <el-col :span="2" class="main_layout">
        </el-col>
        <el-col :span="20" style="min-height: 500px;position: relative;">
          <div class="policy_tabs">
            <el-tabs tab-position="left" >
              <el-tab-pane >
                <span slot="label"><div class="dot"></div> 通知公告 <i class="el-icon-arrow-right"></i></span>
                <div @keyup.enter="loadNotice" class="seach-notice-box">
                    <el-input
                      clearable
                      class="zixunSeach"
                      placeholder="请输入内容"
                      v-model.trim="noticeSeach">
                      <template slot="append">
                        <el-button @click="loadNotice" icon="el-icon-search"></el-button>
                      </template>
                    </el-input>
                </div>
                <div class="message_item" v-for="item,index in notice.list">
                    <el-col :span="3"  class="policyDateD" >{{item.publishDate.split(' ')[0].substring(item.publishDate.split(' ')[0].length-2)}}日</el-col>
                    <el-col :span="19">
                      <div class="policyDateYM" >
                        {{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月
                        <span class="zhengce_zhiding" v-show="item.priority == '9'">↑置顶</span>
                      </div>
                      <div class="item_title">{{item.title}}</div>
                      <div  class="goPolicyDetail" @click="openPolicy(item.url)">
                        阅读全文 <img src="../../assets/images/icons/ico_to_green.svg" alt="">
                      </div>
                    </el-col>
                </div>
                <paginate
                  v-show="notice.pageInfo.totalPage > 0"
                  :page-count="notice.pageInfo.totalPage"
                  :click-handler="jumpPageNotice"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
              <el-tab-pane >
                <span slot="label"><div class="dot"></div> 政策文件 <i class="el-icon-arrow-right"></i></span>
                <div @keyup.enter="loadPolicy" class="seach-notice-box">
                    <el-input
                      clearable
                      class="zixunSeach"
                      placeholder="请输入内容"
                      v-model.trim="policySeach">
                      <template slot="append">
                        <el-button @click="loadPolicy" icon="el-icon-search"></el-button>
                      </template>
                    </el-input>
                </div>
                <div class="policyFile_item" v-for="item,index in policy.list">
                  <el-col :span="3"  class="policyDateD" >{{item.publishDate.split(' ')[0].substring(item.publishDate.split(' ')[0].length-2)}}日</el-col>
                  <el-col :span="19">
                    <div class="policyDateYM" >
                      {{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月
                      <span class="zhengce_zhiding" v-show="item.priority == '9'">↑置顶</span>
                    </div>
                    <div class="item_title">{{item.title}}</div>
                    <div class="item_description">
                      {{item.description}}
                    </div>
                     <div  class="goPolicyDetail" @click="openPolicy(item.url)">
                          阅读全文 <img src="../../assets/images/icons/ico_to_green.svg" alt="">
                     </div>
                  </el-col>
                  </div>
                <paginate
                  v-show="policy.pageInfo.totalPage > 0"
                  :page-count="policy.pageInfo.totalPage"
                  :click-handler="jumpPagePolicy"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><div class="dot"></div> 共享资讯 <i class="el-icon-arrow-right"></i></span>
                <div @keyup.enter="loadShare" class="seach-notice-box">
                    <el-input
                      clearable
                      class="zixunSeach"
                      placeholder="请输入内容"
                      v-model.trim="shareSeach">
                      <template slot="append">
                        <el-button @click="loadShare" icon="el-icon-search"></el-button>
                      </template>
                    </el-input>
                </div>
                <div class="share_item" v-for="item,index in share.list">
                  <el-col :span="3"  class="policyDateD" >{{item.publishDate.split(' ')[0].substring(item.publishDate.split(' ')[0].length-2)}}日</el-col>
                  <el-col :span="19">
                    <div class="policyDateYM" >
                      {{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月
                      <span class="zhengce_zhiding" v-show="item.priority == '9'">↑置顶</span>
                    </div>
                    <div class="item_title">{{item.title}}</div>
                    <div class="item_description">
                      {{item.description}}
                    </div>
                    <div  class="goPolicyDetail" @click="openPolicy(item.url)">
                          阅读全文 <img src="../../assets/images/icons/ico_to_green.svg" alt="">
                    </div>
                  </el-col>
                </div>
                <paginate
                  v-show="share.pageInfo.totalPage > 0"
                  :page-count="share.pageInfo.totalPage"
                  :click-handler="jumpPageShare"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
            </el-tabs>

          </div>
        </el-col>
        <el-col :span="2" class="main_layout">
        </el-col>

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
      <img style="cursor: pointer" src="../../assets/images/icons/float_button.svg" alt="返回顶部" title="返回顶部" href="#"
           @click="scrollTop">
    </div>
  </div>
</template>
<script>
  import Headers from '@/components/header/Header'
  import Footers from '@/components/footer/Footer'
  import API from '@/common/api'
  export default {
    data () {
      return {
        noticeSeach: '',
        policySeach: '',
        shareSeach: '',
        policy: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_policy_page"
        },
        notice: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_notice_page"
        },
        share: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_share_page"
        }
      }
    },
    created () {
      this.loadNotice();
      this.loadPolicy();
      this.loadShare();
    },
    watch: {
      'policy.pageInfo' : {
        handler() {
          this.loadPolicy()
        },
        deep: true
      },
      'notice.pageInfo' : {
        handler() {
          this.loadNotice()
        },
        deep: true
      },
      'share.pageInfo' : {
        handler() {
          this.loadShare()
        },
        deep: true
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
      loadPolicy(){
        this.loadPage('policy');
      },
      loadNotice(){
        this.loadPage('notice');
      },
      loadShare(){
        this.loadPage('share');
      },
      loadPage(type){
        var _this = this;
        var index_index = '_' + this[type].pageInfo.currentPage;
        if (this[type].pageInfo.currentPage == 1) {
          index_index = '';
        }
        API.Cms.getSeachListByPage({
          keyword: this[type + 'Seach'],
          code: 'pc_' + type + '_page',
          number: this[type].pageInfo.currentPage,
          size: 10
        }).then((res) => {
          _this[type].pageInfo.totalPage = res.result.totalPages
          _this[type].pageInfo.pageSize = res.result.size
          _this[type].pageInfo.currentPage = res.result.number + 1
          _this[type].list = res.list
        })
      },
      jumpPagePolicy(page) {
        this.policy.pageInfo.currentPage = page
      },
      jumpPageNotice(page) {
        this.notice.pageInfo.currentPage = page
      },
      jumpPageShare(page) {
        this.share.pageInfo.currentPage = page
      },
      openPolicy (url) {
//        window.open(url)
        this.$router.push({name: 'policyDetail',params:{url:url}})
      },
    },
    components: {
      Headers,
      Footers
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/common.less';
  @import '~@/assets/less/variables.less';
  @import "./css/policy.css";
  /*new css*/
  .main_layout{
    min-height:20px;
  }
  .zixunSeach {
    width: 50%;
    margin: 0 80px 10px;
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

  .demand_back{
    position: absolute;
    width:100%;
    height: 50px;
    z-index: 1;
    min-width: 1366px;
  }
</style>
