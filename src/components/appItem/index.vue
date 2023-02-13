<template>
  <div class="result-item">
    <div class="item-icon">
      <router-link :to="{ name: 'serviceDetail', params: { id: appItem.appId }}">
        <img :src="appItem.image">
      </router-link>
    </div>
    <div class="item-desc">
      <p>{{appItem.appName}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    data () {
      return {
        appItem: this.item
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .result-item {
    width: 24.25%;
    margin-right: 1%;
    float: left;
    border: 1px solid #ccc;
    height: 215px;
    margin-bottom: 12px;
    background: #fff;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover {
      box-shadow: 0 2px 10px rgba(0,0,0,.3);
    }
    .item-icon {
      height: 127px;
      line-height: 127px;
      text-align: center;
      background: #f9f9f9;
      border-bottom: 1px solid #ccc;
      img {
        vertical-align: middle;
        width: 110px;
        height: 110px;
      }
    }
    .item-desc {
      text-align: center;
      p {
        color: #333;
        font-size: 16px;
      }
      div {
        color: #666;
      }
    }
  }
</style>
