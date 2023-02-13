<template>
  <div id="app">
    <EchartsPieShare
      :pieId="dataPie"
      :typeName="nameData"
      :typeData="dataData"
      :typeColor="colorData"
      :legendData="legendDataData"
      v-if="flagData">
    </EchartsPieShare>
  </div>
</template>
<script type="text/ecmascript-6">
  import EchartsPieShare from './EchartsPieShare.vue'
  import API from '@/common/api'
  export default {
    name: 'ResShareCont',
    components: {
      EchartsPieShare
    },
    data () {
      return {
        // 企业类型  ------start-------
        dataPie: 'companyPie',
        legendDataData: [
          '内资公司',
          '个人独资企业',
          '农民专业合作社',
          '外资企业',
          '内资非公司企业法人',
          '合伙企业'
        ],
        nameData: '企业类型',
        dataData: [],
        colorData: ['#007eff', '#afeb15', '#fd5870', '#03fed6', '#ffbb00', '#f76800'],
        flagData: false
        // 企业类型  ------end-------
      }
    },

    mounted: function () {
      this.getDataCount()
    },
//    created () {
//      this.getDataCount()
//    },
    methods: {
      getDataCount () {
        API.Data.getDataCount().then((res) => {
          this.dataData = []
          this.dataData.push({value: '975777', name: '内资公司'})
          this.dataData.push({value: '62766', name: '个人独资企业'})
          this.dataData.push({value: '38391', name: '农民专业合作社'})
          this.dataData.push({value: '28977', name: '外资企业'})
          this.dataData.push({value: '22691', name: '内资非公司企业法人'})
          this.dataData.push({value: '14493', name: '合伙企业'})
          this.flagData = true
        })
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
