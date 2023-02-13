<template>
  <div class="rightBlock">
    <table class="table" id="followDataTable">
      <tr>
        <th>文件名称</th>
        <th>共享类型</th>
        <th>关注时间</th>
        <th>操作</th>
      </tr>
      <tbody>
      <template v-if="list.length > 0">
        <tr v-for="(item, index) in list">
          <td>{{ item.name }}</td>
          <td>{{ item.shareTypeDesc }}</td>
          <td>{{ item.attentionTime | formatTime('YYYY-MM-DD HH:mm:ss') }}</td>
          <td>
            <router-link :to="{name: 'dataDetail', params: {id: item.dataInfoId}}">查看</router-link>
            <a @click="cancelFollow(item.dataInfoId)" href="javascript:;">取消关注</a>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="4">暂无数据</td>
      </tr>
      </tbody>
    </table>
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
    data() {
      return {
        list: [],
        pageInfo: {
          totalPage: 0
        },
        params: {
          page: 1,
          pageSize: 10
        }
      }
    },
    watch: {
      params: {
        handler(val) {
          this.queryList()
        },
        deep: true
      }
    },
    created() {
      this.queryList()
    },
    methods: {
      queryList() {
        API.Data.getMyAttentionData(this.params).then((res) => {
          this.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      cancelFollow(id) {
        API.Data.unFollowData({
          dataId: id
        }).then((res) => {
          layer.msg('取消关注成功！')
          this.queryList()
        })
      },
      jumpPage(page) {
        this.params.page = page
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/css/user_common.css";
</style>
