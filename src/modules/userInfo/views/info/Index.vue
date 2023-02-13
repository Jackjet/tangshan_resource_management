<template>
  <div class="user-content">
    <div class="tabs">
      <ul>
        <router-link tag="li" :to="{name: 'userBasic'}" exact>
          <span>基本信息</span>
        </router-link>
       <!-- <router-link tag="li" :to="{name: 'userPassword'}">
          <span>修改密码</span>
        </router-link>-->
      </ul>
    </div>
    <div class="center-content">
      <router-view :user="user"></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['user'],
    data () {
      return {
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
 @import "../../../../assets/css/user_common.css";
</style>
