<template>
  <div class="user-content">
    <div class="tabs">
      <ul>
        <router-link tag="li" :to="{name: 'userDataApply'}" exact>
          <span>申请的文件</span>
        </router-link>
        <router-link tag="li" :to="{name: 'userDataFollow'}">
          <span>关注的文件</span>
        </router-link>
      </ul>
    </div>
    <div class="center-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  @import "../../../../assets/css/user_common.css";
</style>
