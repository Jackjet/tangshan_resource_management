<template>
  <div class="result-item">
    <div class="item-left">
      <router-link :to="{}">
        <img :src="dataItem.dataPic">
      </router-link>
    </div>
    <div class="item-body">
      <div class="item-title">
        <router-link :to="{}">
          {{dataItem.name}}
        </router-link>
      </div>
      <div class="item-desc">
        <span>主题分类：{{dataItem.categoryName}}</span>
        <br />
        <span>所属部门：{{dataItem.depName}}</span>
      </div>
    </div>
    <div class="item-download">
      <a style="margin-bottom: 28px;">{{dataItem.resTypeName}}</a>
      <a>{{dataItem.shareTypeDesc}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['dataItem'],
    data () {
      return {
      }
    },
    created () {
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
      border-right: 1px solid #ccc;
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
          min-width: 175px;
          height: 25px;
          line-height: 25px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:first-child {
            width: 390px;
          }
        }
      }
    }
    .item-download {
      position: absolute;
      top: 35%;
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
      }
    }
  }
</style>
