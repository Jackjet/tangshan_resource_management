<template>
  <div class="result-item">
    <div class="item-left">
      <router-link :to="{ name: itemInfo.detailRouter, params: { id: itemInfo.id }}">
        <img :src="itemInfo.imageUri">
      </router-link>
    </div>
    <div class="item-body">
      <div class="item-title">
        <router-link :to="{ name: itemInfo.detailRouter, params: { id: itemInfo.id }}">{{itemInfo.name}}</router-link>
      </div>
      <div class="item-desc">
        <span>类型：{{itemInfo.type}}</span>
        <span >共享类型：{{itemInfo.shareType}}</span>
        <br />
        <br />
        <span style="color: #666666;" >{{itemInfo.description.length > 80 ? (itemInfo.description.substring(0, 80) + '...') : itemInfo.description}}</span>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: ['item'],
    data () {
      return {
        itemInfo: this.item
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .result-item {
    height: 160px;
    padding: 25px 20px;
    background: #fff;
    border: 1px solid #ccc;
    margin-top: 12px;
    position: relative;
    .item-left {
      display: table-cell;
      vertical-align: middle;
      img {
        width: 110px;
        height: 110px;
      }
    }
    .item-body {
      display: table-cell;
      padding-left: 20px;
      padding-right: 90px;
      .item-title {
        font-size: 20px;
        color: @linkColor;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 390px;
        a {
          color: @linkColor;
        }
      }
      .item-desc {
        margin-top: 20px;
        color: @textColor;
        span {
          min-width: 400px;
          height: 25px;
          line-height: 25px;
          display: inline-block;

        }
      }
    }
    .item-download {
      position: absolute;
      top: 50%;
      right: 40px;
      margin-top: -20px;
      a {
        display: block;
        width: 88px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid @linkColor;
        color: @linkColor;
        border-radius: 10px;
        transition: all .3s;
        &:hover {
          background: @linkColorHover;
          color: #fff;
        }
      }
    }
  }
</style>
