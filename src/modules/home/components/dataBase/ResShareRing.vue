<template>
  <div id="app">
    <EchartsRingShare
      :ringId="dataRing"
      v-if="flagData">
    </EchartsRingShare>
  </div>
</template>
<script type="text/ecmascript-6">
  import EchartsRingShare from './EchartsRingShare.vue'
  export default {
    name: 'ResShareRing',
    components: {
      EchartsRingShare
    },
    data () {
      return {
        // 企业类型  ------start-------
        dataRing: 'peiRing',
        flagData: true
        // 企业类型  ------end-------
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
