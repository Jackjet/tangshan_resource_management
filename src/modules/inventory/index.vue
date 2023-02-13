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
      <el-col :span="20" style="min-height: 500px;margin-top: 64px; position: relative">
        <dcvtable></dcvtable>
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
      <img
        style="cursor: pointer"
        src="../../assets/images/icons/float_button.svg"
        alt="返回顶部"
        title="返回顶部"
        href="#"
        @click="scrollTop"
      />
    </div>
  </div>
</template>
<script>
import Headers from "@/components/header/Header";
import Footers from "@/components/footer/Footer";
import API from "@/common/api";
import dcvtable from "./table.vue"
export default {
  components: {
    Headers,
    Footers,
    dcvtable
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
  z-index: 1;
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
</style>
