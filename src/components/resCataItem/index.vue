<template>
  <div class="view-warp">
    <div class="view-box" v-if="!viewTime.time">
      <div class="view-flex" v-for="(v,k) in viewData" :key="k" :style="style">
        <router-link :to="{ name: 'resCatalogDetail', params: { id: v.id }}">
        <div class="view-item">
          <div class="item-icon" style="text-align:center;margin-top: 20px;">
            <img :src="v.image_uri" width="60px" height="60px" style="text-align:center;margin-top: 28px;"/>
          </div>
          <div class="res_name" :title="v.name">{{v.name}}</div>
          <div class="res_dept_name">{{v.dept_name}}</div>
          <div class="res_attention">
            <img src="../../assets/images/icons/ico_01.svg" width="11px" height="9px" title=""><span style="margin-right: 10px;">{{v.view_count}}</span>
            <img src="../../assets/images/icons/ico_02.svg" width="11px" height="9px" title=""><span>{{v.attention_count}}</span>
          </div>

        </div>
        </router-link>
      </div>
    </div>
    <div class="view-no-data" v-else>{{viewTime.msg}}</div>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      viewData: {
        type: Array,
        default: () => []
      },
      width: {
        type: String,
        default: "20%"
      },
      height: {
        type: String,
        default: "210px"
      },
      viewTime: {
        type: Object,
        default: {
          time: true,
          msg: '数据加载中...'
        }
      }
    },
    computed: {
      style() {
        return {
          width: `${this.width.replace(/%+/, '')}%`,
          height: `${this.height.replace(/px+/, '')}px`
        }
      }
    },
    methods:{

    }
  }
</script>
<style scoped>
  /* 布局组件:start */
  .view-no-data {
    margin: auto;
  }
  .view-warp {
    flex: 1;
    overflow: hidden;
    margin: auto;
    /*display: flex;*/
  }
  .view-box {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -10px;
  }
  .view-flex {
    padding: 10px;
    cursor: pointer;
    transition: ease .5s;
    transform-style: preserve-3d;
  }

  .view-flex:hover {
    transform: translateY(-10px);
    transition: ease .5s;
  }
  .view-item {
    width: 157px;
    height: 189px;
    text-align: center;
    background: rgba(255,255,255,1);
    border-radius: 4px;
  }

  .view-item>span {
    margin: auto;
    text-align: center;
  }
  .res_name{
    margin-top:17px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
    margin-left: 10%;
  }
  .res_dept_name{
      min-width: 70px;
      max-width: 130px;
      height: 16px;
      line-height: 16px;
      margin: 0 auto;
      font-size: 12px;
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 400;
      color: rgba(255,152,17,1);
      background: rgba(255,245,228,1);
      opacity: 1;
      border-radius: 0px 10px 0px 10px;
  }
  .res_attention{
    text-align: center;
  }
  .res_attention img{
    margin-right:8px;
  }
  .res_attention span{
    /* margin-right:24px; */
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:10px;
  }
  /* 布局组件:end */
</style>
