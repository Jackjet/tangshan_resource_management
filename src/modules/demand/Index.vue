<template>
  <div>
    <!--header-->
    <el-row class="demand_back">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <Headers @getUser="getUser"></Headers>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
    <!--content-->
    <div class="">
      <el-row class="" style="position:unset">
        <el-col :span="2" class="main_layout">
        </el-col>
        <el-col :span="20" style="min-height: 500px;margin-top: 131px;position: relative;">
          <div class="search">
            <img src="../../assets/images/icons/ico_search.svg" alt="" @click="query">
            <input type="text" name="" v-model="params.keywords">
            <!--<a href="javascript:;" >搜索</a>-->
          </div>
          <!--面包屑导航-->
          <div class="breadCrumbNav clearfix">
            <span class="col3">/</span>
            <router-link tag="span" :to="{ name: 'demand' }">
              <a href="javascript:;">部门需求</a>
            </router-link>
            <span class="col9"> &gt; </span>
              <a href="javascript:;">已发布需求</a>
          </div>
          <DemandItem v-for="item in demandList" :item="item" :key="item.id"></DemandItem>
          <paginate
            v-show="pageInfo.totalPage > 0"
            :page-count="pageInfo.totalPage"
            :click-handler="jumpPage"
            :prev-text="'上一页'"
            :next-text="'下一页'"
            :container-class="'pagination'">
          </paginate>
        </el-col>
        <el-col :span="2" class="main_layout">
        </el-col>

      </el-row>
    </div>

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
  import DemandItem from '@/components/demandItem'
  export default {
    data () {
      return {
        user: {},
        demandList: [],
        pageInfo: {
          totalSize: 0,
          totalPage: 1
        },
        params: {
          keywords: '',
          orderBy: '',
          page: 1,
          pageSize: 10,
          depId: '',
          categoryId: '',
          tagId: '',
          shareType: ''
        },
        filterTags: {
          deps: '',
          types: '',
          category: '',
          tag: ''
        }
      }
    },
    created () {
      this.filterList()
    },
    watch: {
      params: {
        handler () {
          this.filterList()
        }
      },
      filterTags: {
        handler (args) {
          this.params.depId = (args.deps && args.deps.dep_code) || ''
          this.params.shareType = (args.types && args.types.dictCode) || ''
          this.params.categoryId = (args.category && args.category.categoryId) || ''
          this.params.tagId = (args.tag && args.tag.tagId) || ''
        },
        deep: true
      }
    },
    methods: {
      getUser (user) {
        this.user = user
      },
      filterList () {
        this.demandList = []
        API.Demand.getDemandList(this.params).then((res) => {
          this.demandList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      query () {
        this.params.page = 1
        this.filterList()
      },
      jumpPage (page) {
        this.params.page = page
        this.filterList()
      },
      handleConditions (params) {
        Object.keys(params).forEach((key) => {
          if (params[key].id !== -1) {
            this.filterTags[key] = params[key]
          } else {
            this.filterTags[key] = ''
          }
        })
      },
      handleSort (args) {
        this.params.orderBy = args || ''
      },
      scrollTop () {
        if (document.documentElement.scrollTop !== 0) {
          document.documentElement.scrollTop = 0
        }
        if (document.body.scrollTop !== 0) {
          document.body.scrollTop = 0
        }
      }
    },
    components: {
      DemandItem,
      Headers,
      Footers
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/common.less';
  @import '~@/assets/less/variables.less';
  .wrapper {
    overflow: hidden;
    background: #fff;
    /*padding: 20px 50px;*/
    border: 1px solid #ccc;
   /* .search {
      text-align: center;
      height: 50px;
      width: 548px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      input {
        float: left;

      }
      a {
        float: left;
        display: inline-block;
        width: 108px;
        height: 50px;
        line-height: 50px;
        background: @linkColor;
        color: #fff;
        font-size: 16px;
      }
    }*/
  }
  .search{
    position: relative;
    margin-bottom:63px;
  }
  .search input{
    width: 342px;
    height: 34px;
    border-radius: 3px;
    opacity: 0.4;
    border: 1px solid rgba(255,255,255,1);
    color: #fff;
    background-color: #40404b;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    padding-left: 40px;
  }
  .search img{
    position: absolute;
    left: 17px;
    top: 9px;
    cursor: pointer;
  }
  .banner {
    position: relative;
    margin-top: 30px;
    margin-bottom: 10px;
    height: 140px;
    background: url(./images/demand-banner.png) no-repeat;
    .btn-create {
      position: absolute;
      width: 190px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      background: #ffa904;
      border-radius: 30px;
      top: 50%;
      margin-top: -22.5px;
      right: 10%;
      &:hover {
        box-shadow: 0px -1px 9px #000;
        background: #e79800;
      }
    }
  }
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
    height:211px;
    background: url(../../assets/images/icons/demand_banner.svg) no-repeat center center;
    min-width:1366px;
    background-size:100%;
    min-width: 1366px;

  }
</style>
