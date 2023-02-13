<template>
  <div class="demand-item">
    <div class="item-status">
      <!--<a href="javascript:;" class="status-0"></a>-->
      <div v-if="dataItem.reqStatus == 10" class="accepting"> {{dataItem.reqStatusDesc}}</div>
      <div v-if="dataItem.reqStatus == 20" class="dealing"> {{dataItem.reqStatusDesc}}</div>
      <div v-if="dataItem.reqStatus == 90" class="no_accepted">{{dataItem.reqStatusDesc}}</div>
      <div v-if="dataItem.reqStatus == 40" class="processing"> {{dataItem.reqStatusDesc}}</div>
    </div>
    <div class="item-body">
      <div class="item-title">
        <router-link :to="{ name: 'demandDetail', params: { id: dataItem.id }}">{{dataItem.name}}</router-link>
      </div>
      <div class="item-desc">
        <el-row>
          <div class="item_detail">
            <el-col :span="7">发布部门：<span>{{dataItem.userDepName}}</span></el-col>
            <el-col :span="7">归属部门：<span>{{dataItem.supplyDepName}}</span></el-col>
            <el-col :span="6">发布日期：<span>{{dataItem.createdTime | formatTime}}</span></el-col>
            <el-col :span="4" style="text-align: right">浏览量：<span>{{dataItem.pageviewAmount}}</span></el-col>
          </div>
          <div class="demand_des">
            <el-col :span="24">需求描述：{{dataItem.description}}</el-col>
          </div>
        </el-row>


   <!--     <span>发布部门：<span class="highlight"></span></span>
        <span>归属部门：<span class="highlight"></span></span>
        <span>发布日期：<span class="highlight"></span></span>
        <span>浏览量：<span class="highlight"></span></span>
        <span></span>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    data () {
      return {
        id: this.item.id,
        dataItem: this.item
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .demand-item {
    padding: 28px;
    position: relative;
    width:100%;
    height:142px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 9px 0px rgba(0,0,0,0.08);
    border-radius:6px;
    margin-bottom:17px;
    .item-body {
      width: 90%;
      float: left;
      margin-left:10px;
      .item-title {
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:16px;

      }
      .item-desc {
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:16px;
          span {
            color:rgba(72,196,121,1);
          }
        .item_detail{
          height:12px;
          width:100%;
          margin-top:17px;
          margin-bottom:11px;
        }
        .demand_des div{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

      }
    }
    .item-status {
      float: left;
      width:6%;
       div{
        min-width: 48px;
        height: 18px;
        border-radius: 9px 0px 9px 0p x;
        font-size: 12px;
        font-family: FontName;
        color: rgba(255,255,255,1);
        line-height: 16px;
        text-align: center;
      }
      .accepting{
        background:rgba(250,84,28,1);
      }
      .processing{
        background:rgba(72,196,121,1);
      }
      .dealing{
        background:rgba(255,143,61,1);
      }
      .no_accepted{
        background:red;
      }
    }
  }
</style>
