<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix" style="width: 1190px;">
      <span class="col3">/</span>
      <a href="javascript:;">首页</a>
      <span class="col9">&gt;</span>
      <a href="javascript:;">搜索结果</a>
    </div>
    <div class=" clearfix">
      <div class="searchCont">
        <el-tabs v-model="group">
          <el-tab-pane label="关联目录" name="cata">
            <ResCatalogSearch ref="resCatalogSearch" :cataList="cataList" style="min-height: 350px;"></ResCatalogSearch>
          </el-tab-pane>
          <el-tab-pane label="文件" name="data">
            <DataSearch ref="dataSearch" :dataList="dataList" style="min-height: 350px;"></DataSearch>
          </el-tab-pane>
          <el-tab-pane label="接口" name="api">
            <ApiSearch ref="apiSearch" :apiList="apiList" style="min-height: 350px;"></ApiSearch>
          </el-tab-pane>
          <!--<el-tab-pane label="云服务" name="app">
            <AppSearch ref="appSearch" :appList="appList" style="min-height: 350px;"></AppSearch>
          </el-tab-pane>-->
        </el-tabs>
      </div>
      <!--Pages-->
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
</template>
<script>
  import ResCatalogSearch from './components/ResCatalogSearch'
  import DataSearch from './components/DataSearch'
  import AppSearch from './components/AppSearch'
  import ApiSearch from './components/ApiSearch'
  import API from '@/common/api'

  export default {
    data () {
      return {
        group: 'cata',
        keyword: '',
        cataList:[],
        dataList:[],
        apiList:[],
        appList:[],
        pageInfo: {
          totalSize: 0,
          totalPage: 1,
          currentPage: 1
        },
        param: {
          page: 1,
          pageSize: 10
        }
      }
    },
    created () {
      this.keyword = this.$route.params.keyword
    },
    watch: {
      group: function (val, oldval) {
        if(this.param.page===1){
        this.search()
        }else{
          this.param.page=1;
      }
    },
      param: {
        handler () {
      this.search()
    },
        deep: true
      },
      $route: {
        handler (){
          this.keyword=this.$route.params.keyword;
          if(this.param.page===1){
            this.search()
          }else{
            this.param.page=1;
        }
      },
        deep: true
        }
    },
    mounted () {
      this.search()
    },
    methods: {
      jumpPage (page) {
        this.param.page = page;
      },
      search () {
        if (!this.keyword) {
          return
        }
        let _this = this
        if(_this.group === 'cata'){
          API.Resdoc.globalSearch({'name': _this.keyword,'page':this.param.page,'pageSize':this.param.pageSize}).then((res) => {
            _this.cataList=res.result.records;
            _this.pageInfo.totalSize = res.result.total
            _this.pageInfo.totalPage = res.result.pages
            _this.pageInfo.currentPage = res.result.current
          })
        }else if (_this.group === 'data') {
          API.Data.globalSearch({'keyword': _this.keyword,'page':this.param.page,'pageSize':this.param.pageSize}).then((res) => {
            _this.dataList=res.result.list;
            _this.pageInfo.totalSize = res.result.page.totalSize
            _this.pageInfo.totalPage = res.result.page.totalPage
            _this.pageInfo.currentPage = res.result.page.currentPage
          })
        } else if (this.group === 'api') {
          API.Api.getApiList({'keyword': this.keyword,'page':this.param.page,'pageSize':this.param.pageSize}).then((res) => {
            _this.apiList=res.result.list;
            _this.pageInfo.totalSize = res.result.page.totalSize
            _this.pageInfo.totalPage = res.result.page.totalPage
            _this.pageInfo.currentPage = res.result.page.currentPage
          })
        } else if (this.group === 'app') {
          API.App.getAppList({'keyword': this.keyword,'page':this.param.page,'pageSize':this.param.pageSize}).then((res) => {
            _this.appList=res.result.list;
            _this.pageInfo.totalSize = res.result.page.totalSize
            _this.pageInfo.totalPage = res.result.page.totalPage
            _this.pageInfo.currentPage = res.result.page.currentPage
          })
        }
      }
    },
    components: {
      ResCatalogSearch,
      DataSearch,
      AppSearch,
      ApiSearch
    }
  }
</script>
<style lang="less" scoped>
  @import './css/search.css';
  @import '~@/assets/less/common.less';
  @import '~@/assets/less/variables.less';
</style>
