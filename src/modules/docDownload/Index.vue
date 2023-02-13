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
                <span slot="label"><div class="dot"></div> 技术资料 <i class="el-icon-arrow-right"></i></span>
                <!-- <div class="message_item" v-for="(item,index) in notice.list" :key="index"> -->
                    <!-- <el-col :span="3"  class="policyDateD" >{{item.publishDate.substring(item.publishDate.length-2)}}日</el-col>
                    <el-col :span="19">
                      <div class="policyDateYM" >{{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月</div>
                      <div class="item_title">{{item.title}}</div>
                    </el-col> -->
                    <el-row>
                      <el-col :span="20" :offset="1">
                          <div class="docTitle">技术资料</div>
                          <el-table
                            :data="technology.list"
                            stripe
                            :show-header="false"
                            style="width: 100%">
                            <el-table-column
                              prop="name"
                              show-overflow-tooltip
                              label="标题">
                              <template slot-scope="scope">
                                <!-- <div class="docDownload" @click="docDownload(scope.row.indexes)">{{scope.row.name}}</div> -->
                                <div class="docDownload" @click="fileDownload(scope.row)">{{scope.row.name}}</div>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="addTime"
                              label="日期"
                               width="150"
                              align="right">
                               <template slot-scope="scope">
                                <div>{{formatTime1(scope.row.addTime)}}</div>
                              </template>
                            </el-table-column>
                          </el-table>
                      </el-col>
                    </el-row>
                <!-- </div> -->
                <paginate
                  v-show="technology.pageInfo.totalPage > 0"
                  :page-count="technology.pageInfo.totalPage"
                  :click-handler="jumpPageTechnology"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
              <el-tab-pane >
                <span slot="label"><div class="dot"></div> 培训资料 <i class="el-icon-arrow-right"></i></span>
                <!-- <div class="policyFile_item" v-for="item,index in policy.list">
                  <el-col :span="3"  class="policyDateD" >{{item.publishDate.substring(item.publishDate.length-2)}}日</el-col>
                  <el-col :span="19">
                    <div class="policyDateYM" >{{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月</div>
                    <div class="item_title">{{item.title}}</div>
                    <div class="item_description">
                      {{item.description}}
                    </div>
                  </el-col>
                  </div> -->
                   <el-row>
                      <el-col :span="20" :offset="1">
                          <div class="docTitle">培训资料</div>
                          <el-table
                            :data="train.list"
                            stripe
                            :show-header="false"
                            style="width: 100%">
                            <el-table-column
                              prop="name"
                              show-overflow-tooltip
                              label="标题">
                              <template slot-scope="scope">
                                <!-- <div class="docDownload" @click="docDownload(scope.row.indexes)">{{scope.row.name}}</div> -->
                                <div class="docDownload" @click="fileDownload(scope.row)">{{scope.row.name}}</div>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="addTime"
                              label="日期"
                              width="150"
                              align="right">
                              <template slot-scope="scope">
                                <div>{{formatTime1(scope.row.addTime)}}</div>
                              </template>
                            </el-table-column>
                          </el-table>
                      </el-col>
                    </el-row>
                <paginate
                  v-show="train.pageInfo.totalPage > 0"
                  :page-count="train.pageInfo.totalPage"
                  :click-handler="jumpPageTrain"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
              <!--    共享责任清单  start    -->
              <el-tab-pane >
                <span slot="label"><div class="dot"></div> 责任清单 <i class="el-icon-arrow-right"></i></span>
                <!-- <div class="policyFile_item" v-for="item,index in policy.list">
                  <el-col :span="3"  class="policyDateD" >{{item.publishDate.substring(item.publishDate.length-2)}}日</el-col>
                  <el-col :span="19">
                    <div class="policyDateYM" >{{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月</div>
                    <div class="item_title">{{item.title}}</div>
                    <div class="item_description">
                      {{item.description}}
                    </div>
                  </el-col>
                  </div> -->
                <el-row>
                  <el-col :span="20" :offset="1">
                    <div class="docTitle">责任清单</div>
                    <el-table
                      :data="respon.list"
                      stripe
                      :show-header="false"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        show-overflow-tooltip
                        label="标题">
                        <template slot-scope="scope">
                          <!-- <div class="docDownload" @click="docDownload(scope.row.indexes)">{{scope.row.name}}</div> -->
                          <div class="docDownload" @click="fileDownload(scope.row)">{{scope.row.name}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="addTime"
                        label="日期"
                        width="150"
                        align="right">
                        <template slot-scope="scope">
                          <div>{{formatTime1(scope.row.addTime)}}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
                <paginate
                  v-show="respon.pageInfo.totalPage > 0"
                  :page-count="respon.pageInfo.totalPage"
                  :click-handler="jumpPageRespon"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
              <!--    共享责任清单  end    -->
              <!--      政策文件   start    -->
              <el-tab-pane >
                <span slot="label"><div class="dot"></div> 政策文件 <i class="el-icon-arrow-right"></i></span>
                <!-- <div class="policyFile_item" v-for="item,index in policy.list">
                  <el-col :span="3"  class="policyDateD" >{{item.publishDate.substring(item.publishDate.length-2)}}日</el-col>
                  <el-col :span="19">
                    <div class="policyDateYM" >{{item.publishDate.split('-')[0]}}年{{item.publishDate.split('-')[1]}}月</div>
                    <div class="item_title">{{item.title}}</div>
                    <div class="item_description">
                      {{item.description}}
                    </div>
                  </el-col>
                  </div> -->
                <el-row>
                  <el-col :span="20" :offset="1">
                    <div class="docTitle">政策文件</div>
                    <el-table
                      :data="policyDoc.list"
                      stripe
                      :show-header="false"
                      style="width: 100%">
                      <el-table-column
                        prop="name"
                        show-overflow-tooltip
                        label="标题">
                        <template slot-scope="scope">
                          <!-- <div class="docDownload" @click="docDownload(scope.row.indexes)">{{scope.row.name}}</div> -->
                          <div class="docDownload" @click="fileDownload(scope.row)">{{scope.row.name}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="addTime"
                        label="日期"
                        width="150"
                        align="right">
                        <template slot-scope="scope">
                          <div>{{formatTime1(scope.row.addTime)}}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
                <paginate
                  v-show="policyDoc.pageInfo.totalPage > 0"
                  :page-count="policyDoc.pageInfo.totalPage"
                  :click-handler="jumpPagePolicyDoc"
                  :prev-text="'上一页'"
                  :next-text="'下一页'"
                  :container-class="'pagination'">
                </paginate>
              </el-tab-pane>
              <!--      政策文件   end    -->
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
   import moment from 'moment'
  export default {
    data () {
      return {
        train: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_policy_page"
        },
        technology: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_notice_page"
        },
        respon: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_notice_page"
        },
        policyDoc: {
          list: [],
          pageInfo: {
            pageSize: 10,
            totalPage: 1,
            currentPage: 1
          },
          code: "_pc_notice_page"
        },
        indexesValue:'',
        downloadUrl:location.protocol + '//' + location.host + '/ro/share-dict-api/' + 'sysStorage/fetch.do?indexes='

      }
    },
    created () {
      this.loadTrain();
      this.loadTechnology();
      this.loadRespon();
      this.loadPolicyDoc();
    },
    watch: {
      'train.pageInfo' : {
        handler() {
          this.loadTrain()
        },
        deep: true
      },
      'technology.pageInfo' : {
        handler() {
          this.loadTechnology()
        },
        deep: true
      },
      'respon.pageInfo': {
        handler() {
          this.loadRespon()
        },
        deep: true
      },
      'policyDoc.pageInfo': {
        handler() {
          this.loadPolicyDoc()
        },
        deep: true
      }
    },
    methods: {
      fileDownload(obj){
        // var link = document.createElement('a');
        // link.href=location.protocol + '//' + location.host + '/ro/share-dict-api/' + 'sysStorage/fetch.do?indexes=' + obj.indexes;
        // link.download=obj.name;
        // link.click();

      let link = document.createElement('a')
			link.style.display = 'none'
			link.href=location.protocol + '//' + location.host + '/ro/share-dict-api/' + 'sysStorage/fetch.do?indexes=' + obj.indexes;
      link.setAttribute('download', '')
      link.download=obj.name;
			document.body.appendChild(link)
			link.click()
      },
      docDownload(indexes){

         var _this = this
         this.indexesValue = indexes
        const url = location.protocol + '//' + location.host + '/ro/share-dict-api/' + 'sysStorage/fetch.do?indexes=' + indexes;
        $.ajax( {
               "dataType": 'json',
               "type": "POST",
               "async":false,//使用同步的Ajax请求
                // headers: {
                //   "Content-Type": "text/html"
                // },
               "url": "location.protocol + '//' + location.host + '/ro/share-dict-api/' + 'sysStorage/fetch.do?indexes="+ indexes,
               "success": function(data){
                        var iframe = document.createElement('iframe')
                        iframe.src = url
                        iframe.id = 'dcDownloadHelper'
                        document.body.appendChild(iframe)
                        iframe.style.display = 'none'
                        iframe.onload = function() {
                          console.log('start downloading...')
                          document.body.removeAttribute(iframe)
                        }
                        var timer = setInterval(function() {
                          iframe = document.getElementById('dcDownloadHelper')
                          var iframeDoc = iframe.contentDocument || iframe.contentWindow.document
                          console.log(iframeDoc)
                          // Check if loading is complete
                          debugger
                          if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
                            clearInterval(timer)
                            setTimeout(() => {
                              console.log("下载成功")
                            }, 3000)
                          }
                        }, 10)


               }
           });




      // var _this = this
      // const url = location.protocol + '//' + location.host + '/ro/share-dict-api/' + 'sysStorage/fetch.do?indexes=' + indexes;
      // var iframe = document.createElement('iframe')
      // iframe.src = url
      // iframe.id = 'dcDownloadHelper'
      // document.body.appendChild(iframe)
      // iframe.style.display = 'none'
      // iframe.onload = function() {
      //   console.log('start downloading...')
      //   document.body.removeAttribute(iframe)
      // }
      // var timer = setInterval(function() {
      //   iframe = document.getElementById('dcDownloadHelper')
      //   var iframeDoc = iframe.contentDocument || iframe.contentWindow.document
      //   console.log(iframeDoc)
      //   // Check if loading is complete
      //   debugger
      //   if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
      //     clearInterval(timer)
      //     setTimeout(() => {
      //       console.log("下载成功")
      //     }, 3000)
      //   }
      //  }, 10)
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
      loadTrain(){
        this.loadPage('train');
      },
      formatTime1(time) {
        return moment(time).format('YYYY年MM月DD日')
      },
      loadTechnology(){
        this.loadPage('technology');
      },
      loadRespon(){
        this.loadPage('respon');
      },
      loadPolicyDoc(){
        this.loadPage('policyDoc');
      },
      loadPage(type){
        var _this = this;
       if(type == 'technology'){
           API.docDownload.getDocList({
          "busType": '0',
          "page": _this.technology.pageInfo.currentPage,
          "pageSize": _this.technology.pageInfo.pageSize
        }).then((res) => {
          this.technology.list = res.result.storeList
          this.technology.pageInfo.currentPage = res.result.page.currentPage
          this.technology.pageInfo.pageSize = res.result.page.totalSize
          this.technology.pageInfo.totalPage = res.result.page.totalPage
        })
       } else if(type == 'train'){
           API.docDownload.getDocList({
              "busType": '1',
              "page": _this.train.pageInfo.currentPage,
              "pageSize": _this.train.pageInfo.pageSize
        }).then((res) => {
          this.train.list = res.result.storeList
          this.train.pageInfo.currentPage = res.result.page.currentPage
          this.train.pageInfo.pageSize = res.result.page.totalSize
          this.train.pageInfo.totalPage = res.result.page.totalPage
        })
       } else if (type == 'respon'){
         API.docDownload.getDocList({
           "busType": '2',
           "page": _this.respon.pageInfo.currentPage,
           "pageSize": _this.respon.pageInfo.pageSize
         }).then((res) => {
           this.respon.list = res.result.storeList
           this.respon.pageInfo.currentPage = res.result.page.currentPage
           this.respon.pageInfo.pageSize = res.result.page.totalSize
           this.respon.pageInfo.totalPage = res.result.page.totalPage
         })
       } else if (type == 'policyDoc'){
         API.docDownload.getDocList({
           "busType": '3',
           "page": _this.policyDoc.pageInfo.currentPage,
           "pageSize": _this.policyDoc.pageInfo.pageSize
         }).then((res) => {
           this.policyDoc.list = res.result.storeList
           this.policyDoc.pageInfo.currentPage = res.result.page.currentPage
           this.policyDoc.pageInfo.pageSize = res.result.page.totalSize
           this.policyDoc.pageInfo.totalPage = res.result.page.totalPage
         })
       }

      },
      jumpPageTrain(page) {
        this.train.pageInfo.currentPage = page
      },
      jumpPageTechnology(page) {
        this.technology.pageInfo.currentPage = page
      },
      jumpPageRespon(page) {
        this.respon.pageInfo.currentPage = page
      },
      jumpPagePolicyDoc(page) {
        this.policyDoc.pageInfo.currentPage = page
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
  .docTitle{
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 47px;
    color: rgba(0,0,0,1);
    opacity: 1;
    border-bottom: 1px solid rgba(217,217,217,1);
  }
  .docDownload{
    cursor: pointer;
    color: rgba(0,170,113,1);
  }
</style>
