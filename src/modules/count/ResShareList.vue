<template>
  <el-container class="wrapper">
    <el-aside width="280px" style="background-color: #ffffff; margin-top: 20px;">
      <DeptAndTheme
        :departs="departs"
        :category="category"
        @my-handleClickTab="myHandleClickTab"
        @my-handleButtonClick="myHandleButtonClick">
      </DeptAndTheme>
    </el-aside>
    <el-main>
      <div class="result-top">
        <span class="prev">按{{myActiveName}}
          <span v-if="myDataName != ''">&nbsp;>&nbsp;{{myDataName}}
          </span>
        </span>
        <span style="padding-left: 60%;">
            <router-link :to="{ name: 'resTopo'}">
                <el-button  size="small" round >查看图谱</el-button>
            </router-link>
        </span>
      </div>
      <ResItem v-for="(item,index) in dataInfoList" key="item.id"
       :dataItem="item"
      ></ResItem>
      <paginate
        v-show="pageInfo.totalPage > 0"
        :page-count="pageInfo.totalPage"
        :force-page="pageInfo.currentPage - 1"
        :click-handler="jumpPage"
        :prev-text="'上一页'"
        :next-text="'下一页'"
        :container-class="'pagination'">
      </paginate>
    </el-main>
  </el-container>
</template>
<script type="text/ecmascript-6">
  import DeptAndTheme from '../count/components/DeptAndTheme.vue'
  import ResItem from '../count/components/ResItem.vue'
  import Axios from 'axios'
  import API from '@/common/api'
  export default {
    name: 'ResShareList',
    components: {
      DeptAndTheme,
      ResItem
    },
    data () {
      return {
        departs: [],
        category: [],
        pageInfo: {
          totalSize: 0,
          totalPage: 1,
          currentPage: 1
        },
        params: {
          page: 1,
          pageSize: 10,
          depCode: '',
          categoryId: ''
        },
        myActive: 'first',
        myActiveName: '部门',
        myDataName: '',
        dataInfoList: []
      }
    },

    mounted: function () {
    },
    created () {
      this.getDepartCategry()
      this.getDataList()
    },
    methods: {
      jumpPage (page) {
        this.params.page = page
        this.getDataList()
      },
      myHandleClickTab (activeName) {
        this.myActive = activeName
        if (this.myActive === 'first') {
          this.myActiveName = '部门'
        } else {
          this.myActiveName = '主题'
        }
        this.myDataName = ''
        this.params.depCode = ''
        this.params.categoryId = ''
        this.params.page = 1
        this.params.pageSize = 10
        this.getDataList()
      },
      myHandleButtonClick (data) {
        this.myDataName = data.name
        if (this.myActive === 'first') {
          this.params.depCode = data.id + ''
          this.params.categoryId = ''
        } else {
          this.params.categoryId = data.id + ''
          this.params.depCode = ''
        }
        this.params.page = 1
        this.params.pageSize = 10
        this.getDataList()
      },
      getDataList () {
        this.dataInfoList = []
        API.Reduce.getResList(this.params).then((res) => {
          this.dataInfoList = res.result.dataList
          this.pageInfo.totalSize = res.result.totalNum
          this.pageInfo.totalPage = res.result.totalPage
          this.pageInfo.currentPage = res.result.currentPage
        })
      },
      getDepartCategry () {
        let _this = this
        Axios.all([
          API.Dict.getDepsByNode(),
          API.Dict.getCategory({ parentId: 2 })]).then(Axios.spread((departs, category) => {
            _this.departs = departs.result
            _this.category = category.result
          }
        ))
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .result-top {
    height: 45px;
    line-height: 45px;
    border: 1px solid #ccc;
    padding: 0 20px;
    background: #fff;

  .prev {
    font-size: 16px;
  }
  .count {
    color: @highlightColor;
    margin: 0 5px;
  }
  }
</style>
