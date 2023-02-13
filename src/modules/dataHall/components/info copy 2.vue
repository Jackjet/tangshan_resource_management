<template>
  <div class="info">

    <div class="info-left">
      <user :my="true" :item="myItem"></user>
    </div>
    <div class="info-scroll">
      <div class="parent">
        <div v-for="item in itemList" :key="item">
          <user :item="item"></user>
        </div>
      </div>
    </div>
    <!-- 上一页 -->
    <div class="left">
      <a @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </a>
    </div>
    <!-- 下一页 -->
    <div class="right">
      <a @click="onClickRight">
        <i class="el-icon-arrow-right"></i>
      </a>
    </div>
  </div>
</template>
<script>
import user from "./user.vue";

import API from "@/common/api";
export default {
  components: { user },
  data() {
    return { myItem: {}, itemList: [] }
  },
  created() {
    this.scrollLeft = 0;

    API.Demand.save().then(data => {
      this.myItem = data.result;
    })
    API.Demand.modify1({ "currentPage": 1, "pageSize": 10 }).then(data => {
      this.itemList = data.result.data;
    })

  },
  methods: {
    onClickRight() {
      const w = document.getElementsByClassName("info-scroll")[0].clientWidth;
      document.getElementsByClassName("info-scroll")[0].scrollLeft =
        this.scrollLeft = this.scrollLeft + (w - 64);
    },
    onClickLeft() {
      const w = document.getElementsByClassName("info-scroll")[0].clientWidth;
      document.getElementsByClassName("info-scroll")[0].scrollLeft =
        this.scrollLeft = this.scrollLeft - (w - 64);
    },
  },
};
</script>
<style lang="less" scoped>
.info {
  position: relative;
  .info-left {
    position: absolute;
    padding: 8px;
    width: 300px;
    height: 100%;
  }
  .right {
    position: absolute;
    right: 16px;
    top: 180px;
    height: 60px;
    width: 30px;
    .el-icon-arrow-right {
      font-size: 64px;
    }
  }
  .left {
    z-index: 1;
    position: absolute;
    left: 16px;
    top: 180px;
    height: 60px;
    width: 30px;
    .el-icon-arrow-left {
      font-size: 64px;
    }
  }
}

.info-scroll {
  margin-left: 300px;
  padding: 8px;
  overflow-x: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.info-scroll::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.parent {
  width: auto;
  display: grid;
  grid-template-columns: repeat(12, 150px);
  grid-template-rows: repeat(2, 200px);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
}
</style>
