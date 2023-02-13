<template>
  <el-row :gutter="20" style="padding: 8px">
    <el-col :span="12">
    <span class="apply-for">我的办理</span>
    <dctable></dctable>
    </el-col>
    <el-col :span="12">
    <span  class="apply-for">我的申请</span>
    <dctable :my="true"></dctable>
    </el-col>
  </el-row>
</template>
<script>
import dctable from "./table.vue";
export default {
  components: { dctable },
};
</script>
<style scoped>
.apply-for{
  font-size: 22px;
  margin-bottom: 16px;
  margin-top: 16px;
}
</style>
