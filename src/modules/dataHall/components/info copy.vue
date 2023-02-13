<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4"><user></user></el-col>
      <el-col :span="20">
        <el-carousel indicator-position="outside" height="500px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-row :gutter="20">
              <el-col v-for="item in 6" :key="item" :span="4"><user></user></el-col>
            </el-row>
             <el-row :gutter="20" style="margin-top: 8px">
              <el-col v-for="item in 6" :key="item" :span="4"><user></user></el-col>
            </el-row>
          </el-carousel-item> </el-carousel
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import user from "./user.vue";
export default {
  components: { user },
};
</script>
