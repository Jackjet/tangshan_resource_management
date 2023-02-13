<template>
  <div class="result-item">
    <div class="item-icon">
      <router-link :to="{ name: 'serviceDetail', params: { id: appItem.id }}">
        <img class="appItemImg" :src="appItem.imageUri"/>
      </router-link>
      <div class="result-item_detail">
        <div class="title_info">
          <div class="detail_name">
            {{appItem.name}}
    </div>
          <div class="detail_attention">
            <img src="../../assets/images/icons/ico_01.svg" title="浏览量">
            <span>{{appItem.viewCount}}</span>
            <img src="../../assets/images/icons/ico_02.svg" title="关注量">
            <span>{{appItem.attentionCount}}</span>
            <img src="../../assets/images/icons/ico_04.svg" title="申请量">
            <span>{{appItem.applyCount}}</span>
          </div>
        </div>
        <div class="condition_label">
          <div v-for="(item,index) in getTag(appItem.tagNames)">
            <el-tag>{{item}}</el-tag>
          </div>
          <div class="depart_label">
            {{appItem.depName}}
      </div>
        </div>
        <div class="detail_info">
          <el-row>
            <div class="lineHeight">
              <el-col :span="12">
                <div v-if="appItem.shareType ==='01'">共享条件：无条件共享</div>
                <div v-if="appItem.shareType ==='02'">共享条件：有条件共享</div>
                <div v-if="appItem.shareType ==='03'">共享条件：不允共享</div>
              </el-col>
              <el-col :span="12">
                发布日期：{{appItem.updatedTimeFormat}}
              </el-col>

            </div>
            <div class="lineHeight">
              <el-col :span="12">
                服务渠道：{{appItem.serviceChannel}}
              </el-col>
              <el-col :span="12">

                服务方式：{{appItem.serviceType}}
              </el-col>
            </div>
            <div class="lineHeight">
              <el-col :span="24" v-if="appItem.businessinfoNames===''">
                关联目录：无
              </el-col>
              <el-col :span="24" v-else>
                关联目录：{{appItem.businessinfoNames}}
              </el-col>
            </div>
           <div class="lineHeight">
              <el-col :span="24" >描述：<span class="fileDes">{{appItem.description}}</span>
              </el-col>
           </div>
       </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    data () {
      return {
        appItem: this.item,
        labelItem: ['标签一', '标签二', '标签二']
      }
    },
    methods: {
      getTag(tagStr){
        return tagStr.split(",");
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/common.less';
  @import '~@/assets/less/variables.less';
  .result-item {
    margin-bottom: 12px;
    padding: 28px;
    height: 164px;
    background-color: #fff;
    box-shadow: 0px 3px 9px 0px rgba(0,0,0,0.08);
    border-radius: 6px;
    &:hover {
      box-shadow: 0 2px 10px rgba(0,0,0,.3);
    }
    .item-icon {
      .appItemImg {
        width: 107px;
        height: 107px;
        float: left;
        margin-right:17px;
      }
    }
    .item-desc {
      padding: 10px;
      text-align: center;
      p {
        color: #333;
        font-size: 16px;
      }
      div {
        color: #666;
        }
      }
    .result-item_detail{
      float: left;
      width: 470px;
    }
    .detail_name{
      font-size:18px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:16px;
      float: left;
    }
    .detail_attention{
      float: right;
      margin-right:28px;
        }
    .detail_attention img{
      margin-right: 8px;
      width:11px;
      height:11px;
      }
    .detail_attention span{
      margin-right: 17px;
    }
    .title_info{
      width:510px;
      height:12px;
      margin-bottom:11px;
    }
    .condition_label{
      height:28px;
    }
    .depart_label{
      float: right;
      min-width:46px;
      height:16px;
      background:rgba(255,185,56,1);
      border-radius:9px 0px 9px 0px;
      font-size: 12px;
      font-family: FontName;
      color: rgba(255,255,255,1);
      line-height: 6px;
      padding: 5px;
    }
    .condition_label .el-tag{
      height:16px;
      line-height:14px;
      background: rgba(0,170,113,0.05);
      border-radius: 2px;
      border: 1px solid rgba(0,170,113,1);
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0,170,113,1);
      margin-right:11px;
      margin-bottom: 11px;
      float: left;
        }
    .detail_info{
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:14px;
      height:55px;
      }
    .detail_info .lineHeight{
      height: 8px;
      margin-bottom: 11px;
      width:100%;
    }
    .fileDes{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width:380px;
      display: inline-block;
    }
  }
</style>
