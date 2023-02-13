<template>
  <div  class="rightBlock">
    <table class="table" id="followServiceTable">
      <tr>
        <th>云服务名称</th>
        <th>共享类型</th>
        <th width="36%">云服务描述</th>
        <th>关注时间</th>
        <th>操作</th>
      </tr>
      <tbody>
        <template v-if="list.length > 0">
          <tr v-for="(item, index) in list">
            <td>{{ item.name }}</td>
            <td>{{ item.shareTypeDesc }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.attentionTime | formatTime }}</td>
            <td>
              <router-link :to="{name: 'serviceDetail', params: {id: item.id}}">查看</router-link>
              <a @click="cancelFollow(item.id)" href="javascript:;">取消关注</a>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="5">暂无数据</td>
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
    data () {
      return {
        list: [],
        pageInfo: {
          totalPage: 0
        },
        params: {
          page: 1,
          pageSize: 5
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
      queryList () {
        API.App.getMyAttentionApi(this.params).then((res) => {
          this.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      cancelFollow (id) {
        API.App.unFollowApp({
          id: id
        }).then((res) => {
          layer.msg('取消关注成功！')
          this.queryList()
        })
      },
      jumpPage (page) {
        this.params.page = page
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/css/user_common.css";
</style>
