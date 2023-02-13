<template>
  <div id="app">
    <EchartsBarShare
      :barId="dataBar"
      :barColor="colorData"
      :legendData="legendData"
      v-if="flagData">
    </EchartsBarShare>
  </div>
</template>
<script type="text/ecmascript-6">
  import EchartsBarShare from './EchartsBarShare.vue'
  export default {
    name: 'ResShareBar',
    components: {
      EchartsBarShare
    },
    data () {
      return {
        // 数据文件  ------start-------
        dataBar: 'dataBar',
        colorData: ['#007eff', '#afeb15'],
        legendData: ['新增企业', '注销企业'],
        flagData: true
        // 数据文件  ------end-------
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
