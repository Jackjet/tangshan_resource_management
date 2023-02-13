<template>
  <div class="user-content">
    <div class="tabs">
      <ul>
        <router-link tag="li" :to="{name: 'userApiApply'}" exact>
          <span>申请的接口</span>
        </router-link>
        <router-link tag="li" :to="{name: 'userApiFollow'}">
          <span>关注的接口</span>
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
