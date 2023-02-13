<template>
  <div class="info">
    <div class="info-left">
      <user :my="true" :item="myItem"></user>
    </div>
    <div class="info-scroll">
      <!-- <div class="parent">
        <div v-for="item in itemList" :key="item"><user :item="item"></user></div>
      </div> -->
      <el-carousel indicator-position="outside" :autoplay="false" @change="change">
        <el-carousel-item v-for="(listitem, index) in list" :key="index">
          <el-row>
            <template v-for="(item, index) in listitem">
              <el-col class="col" :key="index" :span="6" v-if="index < 4">
                <user :item="item"></user>
              </el-col>
            </template>
          </el-row>
          <el-row>
            <template v-for="(item, index) in listitem">
              <el-col class="col" :key="index" :span="6" v-if="index >= 4">
                <user :item="item"></user>
              </el-col>
            </template>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 上一页 -->
    <!-- <div class="left">
      <a @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </a>
    </div> -->
    <!-- 下一页 -->
    <!-- <div class="right">
      <a @click="onClickRight">
        <i class="el-icon-arrow-right"></i>
      </a>
    </div> -->
  </div>
</template>
<script>
import user from "./user.vue";

import API from "@/common/api";

const pageSize = 8;
export default {
  components: { user },
  data() {
    return {
      myItem: {},
      itemList: [],
      list: [],
    };
  },
  created() {
    this.scrollLeft = 0;
    API.Demand.save().then((data) => {
      console.log(data, "========")
      this.myItem = data.result;
    });
    API.Demand.modify1({ currentPage: 1, pageSize: pageSize }).then((data) => {
      // 多少个
      const totalSize = data.result.totalSize;
      const totalPage = data.result.totalPage;
      // 造数据
      const list = [];
      for (let i = 0; i < totalPage; i++) {
        list.push([]);
        if (i > 0) this.upData(i + 1); // 获取后面的数据
      }
      // 默认第一个
      for (let i = 0; i < data.result.data.length; i++) {
        data.result.data[i]["isOnLine"] = i % 2;
      }
      list[0] = data.result.data;
      this.list = list;
    });
  },
  methods: {
    upData(currentPage) {
      API.Demand.modify1({ currentPage: currentPage, pageSize: pageSize }).then(
        (data) => {
          for (let i = 0; i < data.result.data.length; i++) {
            data.result.data[i]["isOnLine"] = i % 2;
          }
          // 多少个
          const list = [...this.list];
          list[currentPage - 1] = [...data.result.data];

          this.list = list;
          //  this.list.splice(currentPage,data.result.data)
          // console.log(" this.list", data.result.data)
        }
      );
    },
    change(i) {
      console.log(i);
    },
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
    width: 330px;
    position: absolute;
    top: 16px;
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
  .col {
    // height: 210px;
    // margin: 0 5px;
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
<style>
/* .el-carousel__container {
  height: 370px;
} */
</style>
