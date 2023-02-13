<template>
  <div>
    <!--header-->
    <div class="demand_back">
      <el-row>
        <el-col :span="2" class="main_layout"> </el-col>
        <el-col :span="20">
          <Headers @getUser="getUser"></Headers>
        </el-col>
        <el-col :span="2" class="main_layout"></el-col>
      </el-row>
    </div>
    <!--content-->
    <el-row>
      <el-col :span="2" class="main_layout"> </el-col>
      <el-col :span="20" style="min-height: 500px; position: relative">
        <div class="data-hall-content">
          <p style="text-align: center;font-size: 32px;line-height: 56px;">唐山市线上数据大厅</p>
          <!-- 信息统计 -->
          <div style="margin-top: 12px;margin-top: 16px;">
            <el-row :gutter="20" style="font-size: 18px;margin: 0px;">
              <el-col :span="4">在线人数：<samp class="number">{{myItem.currentLogin || 0}}</samp>人</el-col>
              <el-col :span="5">今日申请：<samp class="number">{{myItem.applyTodayCount || 0}}</samp>项</el-col>
              <el-col :span="5">累计申请：<samp class="number">{{myItem.applyCount || 0}}</samp>项</el-col>
              <el-col :span="5">今日审批：<samp class="number">{{myItem.approvalTodayCount || 0}}</samp>项</el-col>
              <el-col :span="5">累计审批：<samp class="number">{{myItem.approvalCount || 0}}</samp>项</el-col>
            </el-row>
          </div>
          <!-- 在线预览 -->
          <div style="margin-top: 12px">
            <Info></Info>
          </div>
          <!-- 代办申请 -->
          <apply-for></apply-for>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"> </el-col>
    </el-row>

    <!--footer-->
    <el-row class="footer_background">
      <el-col :span="2" class="main_layout"> </el-col>
      <el-col :span="20">
        <div>
          <Footers></Footers>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
    <div class="slide">
      <img style="cursor: pointer" src="../../assets/images/icons/float_button.svg" alt="返回顶部" title="返回顶部" href="#" @click="scrollTop" />
    </div>
  </div>
</template>
<script>
import Headers from "@/components/header/Header";
import Footers from "@/components/footer/Footer";
import ApplyFor from "./components/applyFor.vue";
import Info from "./components/info.vue"
import API from "@/common/api";
export default {
  components: {
    Headers,
    Footers,
    ApplyFor,
    Info
  },
  data() {
    return { myItem: {} }
  },
  created() {

    API.Demand.commit().then(data => {
      this.myItem = data.result;
    })
  },
  methods: {
    getUser(user) {
      this.user = user;
    },
    scrollTop() {
      if (document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body.scrollTop !== 0) {
        document.body.scrollTop = 0;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/less/common.less";
@import "~@/assets/less/variables.less";
.data-hall-content {
  margin-top: 62px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.main_layout {
  min-height: 20px;
}
.slide {
  position: fixed;
  right: 50px;
  bottom: 0;
  z-index: 100;
  width: 40px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
}
.footer_background {
  background-image: url("../../assets/images/icons/footer_background.png");
  background-repeat: no-repeat;
  background-size: 100% 434px;
  -moz-background-size: 100% 434px;
}
.main_area {
  // background-color: #fafaf9;
}
.active {
  color: #00ab6e !important;
  background-color: #ecf5ff !important;
}

.demand_back {
  position: absolute;
  width: 100%;
  height: 50px;
  z-index: 100;
  min-width: 1366px;
}
.docTitle {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 47px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
}
.docDownload {
  cursor: pointer;
  color: rgba(0, 170, 113, 1);
}
.number {
  color: #00aa71;
}
</style>
