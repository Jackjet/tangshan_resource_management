<template>
  <div class="screen_home">
    <span class="logout" @click="logout">
      <img src="../../assets/images/screen/退出.svg" alt="">
    </span>
    <div class="header_text">
      <!-- 唐 山 市 线 上 数 据 大厅 -->
    </div>
    <div class="statistics_num">
      <div class="statistics_box">
        <ul>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据交换.svg" alt=""> 今日交换 <span>{{today.swapCount}}</span> 万条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用.svg" alt=""> 今日共享 <span>{{today.appCount}}</span> 万条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用2.svg" alt=""> 今日接入 <span>{{today.shareDirCount}}</span> 万条</li>
        </ul>
        <ul>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据交换.svg" alt=""> 累计交换 <span>{{heade.swapCount}}</span> 亿条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用.svg" alt=""> 累计共享 <span>{{heade.appCount}}</span> 亿条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用2.svg" alt=""> 累计接入 <span>{{heade.shareDirCount}}</span> 亿条</li>
        </ul>
      </div>
      <div class="resource_management" @click="routerGo('/home')">资源管理中心 <em> ▶</em></div>
    </div>
    <div class="box_content">
      <div class="left_btn">
        <div class="btn_nav" @click="routerGo('/handle')">
          <img src="../../assets/images/screen/left.svg" alt="">
        </div>
      </div>
      <div class="chart_box">
        <div class="list_box">
          <h2>数据交换总览</h2>
          <span class="return_btn el-icon-close" @click="routerGo('/exchange')"></span>
          <ul class="table_herder">
            <li>交换类型</li>
            <li>提供部门</li>
            <li>交换时间</li>
            <li>资源名称</li>
            <li>提供方式</li>
            <li>交换量</li>
            <li>接收单位</li>
          </ul>
          <div class="list_content">
            <ul class="table_list" v-for="(item,index) in listData" :key="index">
              <li>{{item.swapType}}</li>
              <li>{{item.provideType}}</li>
              <li>{{item.swapTime}}</li>
              <li :title="item.resourceName">{{item.resourceName}}</li>
              <li>{{item.resourceType}}</li>
              <li>{{item.swapCount}}</li>
              <li>{{item.acceptDep}}</li>
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
        <div class="btn_nav">
          <!-- <img src="../../assets/images/screen/right.svg" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "@/common/api";
export default {
  data() {
    return {
      today: {
        appCount: 0,
        mscxDirCount: 0,
        shareDirCount: 0,
        swapCount: 0
      },
      heade: {
        appCount: 0,
        mscxDirCount: 0,
        shareDirCount: 0,
        swapCount: 0
      },
      listData: [],
      totalPage: 0,
      totalSize: 0,
    }
  },
  mounted() {
    // 今日统计
    API.exchangeApi.dataCurrentExchangeTotal().then(res => {
      if (res.status === 'OK') {
        this.today = {
          appCount: res.result.appCount,
          mscxDirCount: res.result.mscxDirCount,
          shareDirCount: res.result.shareDirCount,
          swapCount: res.result.swapCount
        }
      }
    })
    // 头部统计
    API.exchangeApi.dataExchangeTotal().then(res => {
      if (res.status === 'OK') {
        this.heade = {
          appCount: res.result.appCount,
          mscxDirCount: res.result.mscxDirCount,
          shareDirCount: res.result.shareDirCount,
          swapCount: res.result.swapCount
        }
      }
    })
    // 列表
    this.dataExchangeListFun(1);
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
    dataExchangeListFun(page) {
      API.exchangeApi.dataExchangeList({ currentPage: page, pageSize: 15 }).then(res => {
        if (res.status === 'OK') {
          this.listData = res.result.data;
          this.totalPage = res.result.totalPage;
          this.totalSize = res.result.totalSize;
        }
      })
    },
    pageClick(val) {
      this.dataExchangeListFun(val);
    }
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
  display: flex;
  align-items: center;
  height: 20%;
  margin-top: 10px;
  padding-right: 5%;
}
.statistics_box {
  flex: 1;
}
.statistics_num ul {
  height: 44%;
  margin: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.statistics_bg {
  width: 260px;
  height: 60px;
  background: url("../../assets/images/screen/blue_num_bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.statistics_bg img {
  width: 12%;
  margin: 0 17px;
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
  color: #fff;
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
  flex: 1;
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
.return_btn {
  color: #fff;
  font-size: 20px;
  float: right;
  margin-top: -25px;
  cursor: pointer;
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
  flex: 1;
  padding: 0 10px;
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
  flex: 1;
  line-height: 26px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.btn_nav {
  width: 40px;
  height: 100px;
  cursor: pointer;
}
.btn_nav img {
  width: 100%;
  height: 100%;
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