<template>
  <div class="screen_home">
    <span class="logout" @click="logout">
      <img src="../../assets/images/screen/退出.svg" alt="">
    </span>
    <div class="header_text">
      <!-- 唐 山 市 线 上 数 据 大厅 -->
    </div>
    <div class="statistics_num">
      <ul>
        <li class="statistics_bg"><img src="../../assets/images/screen/今日申请.svg" alt=""> 今日申请 <span>{{heade.currApplyCount}}</span> 项</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/累计申请.svg" alt=""> 累计申请 <span>{{heade.applyCount}}</span> 项</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/今日审批.svg" alt=""> 今日办理 <span>{{heade.currDealCount}}</span> 项</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/累计审批.svg" alt=""> 累计办理 <span>{{heade.dealCount}}</span> 项</li>
        <li class="resource_management" @click="routerGo('/home')">资源管理中心 <em> ▶</em></li>
      </ul>
    </div>
    <div class="box_content">
      <div class="left_btn">
        <!-- <div class="btn_nav" @click="routerGo('/')">
          <img src="../../assets/images/screen/left.svg" alt="">
        </div> -->
      </div>
      <div class="chart_box">
        <div class="list_box">
          <h2>线上办事总览</h2>
          <span class="return_btn el-icon-close" @click="routerGo('/handle')"></span>
          <ul class="table_herder">
            <li style="width:100px">办理事项</li>
            <li style="width:140px">办理单位</li>
            <li style="width:100px">办理人</li>
            <li style="width:190px">办理时间</li>
            <li class="widthFlex">资源名称</li>
            <li style="width:90px">提供方式</li>
            <li class="widthFlex">应用场景</li>
            <li style="width:140px">需求单位</li>
            <li style="width:140px">提供单位</li>
          </ul>
          <div class="list_content">
            <ul class="table_list" v-for="(item,index) in listData" :key="index">
              <li :title="item.dealItem" style="width:100px">{{item.dealItem}}</li>
              <li :title="item.dealDepName" style="width:140px">{{item.dealDepName}}</li>
              <li :title="item.dealPersonName" style="width:100px">{{item.dealPersonName}}</li>
              <li :title="item.dealTime" style="width:190px">{{item.dealTime}}</li>
              <li :title="item.busName" class="widthFlex">{{item.busName}}</li>
              <li :title="item.busType" style="width:90px">{{item.busType}}</li>
              <li :title="item.purpose" class="widthFlex">{{item.purpose}}</li>
              <li :title="item.applyDepName" style="width:140px">{{item.applyDepName}}</li>
              <li :title="item.provideDepName" style="width:140px">{{item.provideDepName}}</li>
            </ul>
          </div>
          <div class="pagination_box">
            <span>共{{totalSize}}条</span>
            <span>共{{totalPage}}页</span>
            <el-pagination background layout="prev, pager, next" :total="totalSize" :prev-text="'上一页'" :next-text="'下一页'" @current-change="pageClick">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="right_btn">
        <!-- <div class="btn_nav" @click="routerGo('/exchange')">
          <img src="../../assets/images/screen/right.svg" alt="">
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/common/api";
export default {
  data() {
    return {
      heade: {
        currApplyCount: 0,
        applyCount: 0,
        currDealCount: 0,
        dealCount: 0
      },
      listData: [],
      totalPage: 0,
      totalSize: 0,
    }
  },
  mounted() {
    // 头部统计
    API.handleApi.dataDealHeaderTotal({ groupType: 'A' }).then(res => {
      if (res.status === 'OK') {
        this.heade = {
          currApplyCount: res.result.currApplyCount,
          applyCount: res.result.applyCount,
          currDealCount: res.result.currDealCount,
          dealCount: res.result.dealCount
        }
      }
    })
    // 列表
    this.dataDealListFun(1);
  },
  methods: {
    logout() {
      API.Common.outLoginByCurrentUser(res => { })
      API.Common.logout().then((res) => {
        window.location.href = location.protocol + '//' + location.host + '/#/login?t=' + new Date().getTime()
      })
    },
    routerGo(path) {
      this.$router.push({
        path: path,
        name: path.slice(1)
      });
    },
    pageClick(val) {
      this.dataDealListFun(val);
    },
    // 列表
    dataDealListFun(page) {
      API.handleApi.dataDealList({ currentPage: page, pageSize: 15 }).then(res => {
        if (res.status === 'OK') {
          this.listData = res.result.data;
          this.totalPage = res.result.totalPage;
          this.totalSize = res.result.totalSize;
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.screen_home {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/screen/bg_back.jpg");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
.logout {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.header_text {
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 32px;
}
.statistics_num {
  height: 15%;
}
.statistics_num ul {
  height: 100%;
  margin: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.statistics_bg {
  width: 240px;
  height: 60px;
  background: url("../../assets/images/screen/blue_num_bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.statistics_bg img {
  width: 30px;
  margin: 0 16px;
}
.statistics_bg span {
  font-size: 30px;
  margin: 0 5px;
}
.resource_management {
  width: 200px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/images/screen/资源管理中心底.svg");
  background-size: 100% 100%;
  cursor: pointer;
}
.resource_management em {
  font-size: 12px;
  margin-left: 5px;
}
.box_content {
  flex: 1;
  display: flex;
}
.left_btn,
.right_btn {
  width: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart_box {
  // flex: 1;
  width: 86%;
  display: flex;
  flex-direction: column;
}
.conference_table {
  width: 100%;
  height: 100%;
}
.list_box {
  flex: 1.3;
}
.list_box h2 {
  padding-left: 10px;
  width: 25%;
  line-height: 30px;
  color: #fff;
  background: url("../../assets/images/screen/heade.png");
  background-size: 100% 100%;
  margin-bottom: 5px;
}
.return_btn {
  color: #fff;
  font-size: 20px;
  float: right;
  margin-top: -25px;
  cursor: pointer;
}
.table_herder {
  margin-top: 10px;
  display: flex;
  background: rgb(16, 77, 147);
  color: #fff;
  font-size: 16px;
  line-height: 34px;
  padding: 0 5px;
}
.table_herder li {
  // flex: 1;
  padding: 0 10px;
  text-align: center;
}
.list_content {
  border: 3px solid #fff;
}
.table_list {
  display: flex;
  background: rgb(36, 97, 167);
  color: #fff;
  border-bottom: 1px solid #fff;
}
.table_list li {
  // flex: 1;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  text-align: center;
}
.widthFlex {
  flex: 1;
}
.pagination_box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  margin-top: 5px;
}
.pagination_box span {
  margin-left: 10px;
  font-size: 12px;
}
</style>
<style>
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
  background: rgb(36, 97, 167) !important;
  color: #fff;
  padding: 0 10px;
}
.el-pagination.is-background .el-pager li {
  background: rgb(36, 97, 167);
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #fff;
  color: rgb(36, 97, 167);
}
</style>