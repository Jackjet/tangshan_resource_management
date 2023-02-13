<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix" style="width: 1190px;">
      <span class="col3">/</span>
      <router-link tag="span" :to="{ name: 'data' }">
        <a href="">文件</a>
      </router-link>
    </div>
    <div class="wrapper">
      <div class="left">
      <!--<el-col :span="5">-->
        <Filters v-on:conditions="handleConditions" :params="filterTags"></Filters>
      <!--</el-col>-->
      </div>
      <div class="right">
      <!--<el-col :span="19">-->
        <div class="result-top">
          <div class="sort">
            <a style="margin-left: -20px;" href="javascript:;" :class="{'active': params.orderBy === 1}" @click="handleSort(1)">最新上线</a>
            <a href="javascript:;" :class="{'active': params.orderBy === 2}" @click="handleSort(2)">浏览量</a>
            <a href="javascript:;" :class="{'active': params.orderBy === 3}" @click="handleSort(3)">收藏量</a>
            <a href="javascript:;" :class="{'active': params.orderBy === 4}" @click="handleSort(4)">下载量</a>
          </div>
          <span class="countc">共<span class="count">{{pageInfo.totalSize}}</span>个</span>
        </div>
        <Filter-tags :params="filterTags"></Filter-tags>
        <div class="result-body">
          <p v-if="dataList.length < 1">暂无数据</p>
          <DataItem v-for="item in dataList" :item="item,type" :key="item.id"></DataItem>
          <paginate
            v-show="pageInfo.totalPage > 0"
            :page-count="pageInfo.totalPage"
            :click-handler="jumpPage"
            :prev-text="'上一页'"
            :next-text="'下一页'"
            :container-class="'pagination'">
          </paginate>
        </div>
        <!--</el-col>-->
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  import DataItem from '@/components/dataItem'
  import Filters from '@/components/filters'
  import FilterTags from '@/components/filterTags'

  export default {
    data() {
      return {
        dataList: [],
        pageInfo: {
          totalSize: 0,
          totalPage: 1,
          currentPage: 1
        },
        params: {
          orderBy: '',
          page: 1,
          pageSize: 8,
          depNo: '',
          topicId: '',
          tagId: '',
          shareType: '',
          baseId:''
        },
        filterTags: {
          deps: '',
          types: '',
          topic: '',
          base:'',
          tag: ''
        },
        type:0
      }
    },
    created() {
      if (typeof (this.$route.params.depCode) !== 'undefined') {
        this.params.depNo = this.$route.params.depCode
        this.filterTags.deps = {}
        this.filterTags.deps.dep_code = this.$route.params.depCode
      }
      if (typeof (this.$route.params.topicId) !== 'undefined') {
        this.params.topicId = this.$route.params.topicId
        this.filterTags.topic = {}
        this.filterTags.topic.id = this.$route.params.topicId
      }
      if (typeof (this.$route.params.baseId) !== 'undefined') {
        this.params.baseId = this.$route.params.baseId;
        this.filterTags.base = {};
        this.filterTags.base.id = this.$route.params.baseId
      }
      this.filterList()
    },
    watch: {
      params: {
        handler() {
          this.filterList()
        },
        deep: true
      },
      filterTags: {
        handler(args) {
          this.params.depNo = (args.deps && args.deps.dep_code) || '';
          this.params.shareType = (args.types && args.types.dictCode) || '';
          this.params.topicId = (args.topic && args.topic.id) || '';
          this.params.tagId = (args.tag && args.tag.tagId) || '';
          this.params.baseId = (args.base && args.base.id) || '';
          this.params.page = 1;
          this.params.pageSize = 8;
        },
        deep: true
      }
    },
    methods: {
      filterList() {
        this.dataList = []
        API.Data.getDataList(this.params).then((res) => {
          this.dataList = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage(page) {
        this.params.page = page
      },
      handleConditions(params) {
        Object.keys(params).forEach((key) => {
          if (params[key].id !== -1) {
            this.filterTags[key] = params[key]
          } else {
            this.filterTags[key] = ''
          }
        })
      },
      handleSort(args) {
        this.params.orderBy = args || ''
      }
    },
    components: {
      DataItem,
      Filters,
      FilterTags
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .wrapper {
    /*width: 1190px;
    margin: 0 auto;
    overflow: hidden;*/
  }

  .left {
    float: left;
    width: 165px;
    margin-right:36px;
  }

  .right {
    float: left;
    width: 653px;
    .result-top {
      height: 28px;
      line-height: 28px;
      border-bottom: 1px solid rgba(204,204,204,1);
      padding: 0 20px;
      .prev {
        font-size: 16px;
      }
      .count {
        color: @textlightColor;
        margin: 0 5px;
      }
      .countc{
        float: right;
        font-size:13px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,170,113,1);
      }
      .sort {
        float: left;
        a {
          font-size: 14px;
          margin: 0 20px;
          color: @textColor;
          display: inline-block;
          &:hover,
          &.active {
            color: @textlightColor;
            border-bottom: 2px solid @textlightColor;
          }
        }
      }
    }
    .result-body {
      margin-top: 12px;
    }
  }
</style>
