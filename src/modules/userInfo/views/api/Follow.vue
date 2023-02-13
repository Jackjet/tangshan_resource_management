<template>
  <div class="rightBlock">
    <table class="table" id="followApiTable">
      <tr>
        <th>接口名称</th>
        <th>共享类型</th>
        <th width="20%">接口描述</th>
        <th>关注时间</th>
        <th>操作</th>
      </tr>
      <tbody>
      <template v-if="list.length > 0">
        <tr v-for="(item, index) in list">
          <td>{{ item.apiServiceCName }}</td>
          <td>{{ cutString(item.shareTypeDesc,18) }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.attentionTime | formatTime }}</td>
          <td>
            <a href="javascript:void(0);" v-if="item.status == 1" onclick="layer.msg('此API资源已下架')">查看</a>
            <router-link :to="{name: 'apiDetail', params: {id: item.apiServiceId}}" v-else="item.status != 1">查看
            </router-link>
            <a @click="cancelFollow(item.apiServiceId)" href="javascript:;">取消关注</a>
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
        API.Api.getMyAttentionApi(this.params).then((res) => {
          this.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      cancelFollow(id) {
        API.Api.unFollowApi({
          apiServiceId: id
        }).then((res) => {
          layer.msg('取消关注成功！')
          this.queryList()
        })
      },
      jumpPage(page) {
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
</style>
