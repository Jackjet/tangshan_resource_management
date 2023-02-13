<template>
  <div class="rightBlock">
    <div class="cate_search">
      <el-input placeholder="请输入要搜索的关键字" v-model="cateInput" class="input-with-select cataSearch">
        <el-button slot="append" icon="el-icon-search" class="cateSearchBtn" v-on:click="handleSelect"></el-button>
      </el-input>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%" id="cateTable">
      <el-table-column
        prop="name"
        label="目录名称"
        show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="信息资源摘要"
        show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        label="包含资源">
        <template slot-scope="scope">
          <span v-if="scope.row.api_count>0">接口 </span>
          <span v-if="scope.row.data_count>0">文件 </span>
          <!--<span v-if="scope.row.app_count>0">云服务</span>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="dept_name"
        label="提供单位"
        show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        label="共享类型">
        <template slot-scope="scope">
          <span v-if="scope.row.share_type === '1'">无条件共享</span>
          <span v-if="scope.row.share_type === '2'">有条件共享</span>
          <span v-if="scope.row.share_type === '3'">不予共享</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'resCatalogDetail', params: {id: scope.row.id}}">查看</router-link>
          <a type="text" size="small" @click="cancelFollow(scope.row.id)" style="color:#20a0ff">取消关注</a>
        </template>
      </el-table-column>
    </el-table>
    <paginate
      v-show="pageInfo.totalPage > 0"
      :page-count="pageInfo.totalPage"
      :click-handler="jumpPage"
      :prev-text="'上一页'"
      :next-text="'下一页'"
      :container-class="'pagination'">
    </paginate>
  </div>
</template>
<script>
  import API from '@/common/api/index'
  export default {
    data () {
      return {
        list: [],
        cateInput:'',
        pageInfo: {
          totalPage: 0,
          totalSize:0,
          currentPage:0
        },
        params: {
          page: 1,
          pageSize: 10,
          name:''
        }
      }
    },
    watch: {
      params: {
        handler (val) {
          this.queryList()
        },
        deep: true
      }
    },
    created () {
      this.queryList()
    },
    methods: {
      handleSelect () {
        this.params.name=this.cateInput;
      },
      queryList () {
        API.Resdoc.getMyAttentionCata(this.params).then((res) => {
          this.list = res.result.records
          this.pageInfo.totalSize = res.result.total
          this.pageInfo.totalPage = res.result.pages
          this.pageInfo.currentPage = res.result.current
        })
      },
      cancelFollow (id) {
        API.Resdoc.unFollowCata({
          cataId: id
        }).then((res) => {
          layer.msg('取消关注成功！')
          this.queryList()
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str.length * 2 <= len) {
          return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
          s = s + str.charAt(i);
          if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
              return s.substring(0, s.length - 1) + "...";
            }
          } else {
            strlen = strlen + 1;
            if (strlen >= len) {
              return s.substring(0, s.length - 2) + "...";
            }
          }
        }
        return s;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/css/user_common.css";
</style>
<style>
  .cataSearch{
    width: 45%;
  }
  .cataSearch .el-input__inner{
    height:28px!important;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:10px;
    padding: 0 15px;
  }
  .cataSearch .el-button{
    padding: 6px 15px;
    background: rgba(0,170,113,1)!important;
    color: #fff!important;
    border-radius: 0;
  }
  #cateTable{
    font-size: 12px!important;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0,0,0,0.65);
  }
  #cateTable a:link, a:visited, a:hover, a:active{
    color: rgba(0,170,113,1)
  }
</style>
