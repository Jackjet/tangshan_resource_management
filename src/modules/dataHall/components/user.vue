<template>
  <div class="user" :style="{
      '--fonWidth':my? '32px':'24px',
      'color':my?'#fff':'',
      'background-image':
       my ?`url(${require('../../../assets/images/screen/六边形大浅色版.svg')})`: item.loginStatus == 'on' ? `url(${require('../../../assets/images/screen/六边形小浅色版.svg')})` : `url(${require('../../../assets/images/screen/矩形 831.svg')})`,
    }">
    <img src="../../../assets/images/screen/浅色在线.svg" alt="" srcset="" :style="{ height: my ? '50px' : '30px' }" v-if="my || item.loginStatus == 'on'" />
    <img src="../../../assets/images/screen/浅色离线.svg" alt="" srcset="" :style="{ height: my ? '50px' : '30px' }" v-else />
    <div style="text-align: left">
      <p v-if="my" :title="item.deptName">部&emsp;&emsp;门：{{ item.deptName }}</p>
      <p v-else :title="item.depName">部&emsp;&emsp;门：{{ item.depName }}</p>
      <p :title="item.name">姓&emsp;&emsp;名：{{ item.name }}</p>
      <p :title="item.mobilePhone">联系方式：{{ item.mobilePhone }}</p>
      <p :title="item.officePhone">办公电话：{{ item.officePhone }}</p>
      <!-- 隐藏项目 -->
      <div class="text_style" v-if="my">
        <p><span>{{ item.dealtCount }}</span>我的待办</p>
        <p><span>{{ item.approvalCount }}</span>我的审批</p>
        <p><span>{{ item.rejectCount }}</span>我的驳回</p>
        <p><span>{{ item.applyCount }}</span>我的申请</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    my: Boolean,
  },
  methods: {
    // getUrl() {
    //   return this.my || this.item.loginStatus == 'on' ? './1.png' : './2.png'
    // }
  }
};
</script>
<style  lang="less" scoped>
.user {
  background-size: 100% 100%;
  // border: 1px solid #898989;
  text-align: center;
  padding: 10px 0;
  margin: 0 5px;

  p {
    line-height: var(--fonWidth);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 40px;
  }
  .text_style {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 40px;
    p {
      width: 25%;
      text-align: center;
      padding: 0 14px;
      line-height: 20px;
      white-space: pre-wrap;
      span {
        display: block;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
