<template>
  <div id="app">
    <span style="padding-left: 85%;" v-show="false">
            <router-link :to="{ name: 'resTopo'}">
                <el-button  size="small" round >查看图谱</el-button>
            </router-link>
    </span>
    <EchartsPieShare
      :pieId="dataPie"
      :typeName="nameData"
      :typeData="dataData"
      :typeColor="colorData"
      :legendData="legendDataData"
      :cardName="cardNameData"
      :cardNum="cardNumData"
      v-if="flagData">
    </EchartsPieShare>
    <EchartsPieShare
      :pieId="apiPie"
      :typeName="nameApi"
      :typeData="dataApi"
      :typeColor="colorApi"
      :legendData="legendDataApi"
      :cardName="cardNameApi"
      :cardNum="cardNumApi"
      v-if="flagApi">
    </EchartsPieShare>
    <EchartsPieShare
      :pieId="appPie"
      :typeName="nameApp"
      :typeData="dataApp"
      :typeColor="colorApp"
      :legendData="legendDataApp"
      :cardName="cardNameApp"
      :cardNum="cardNumApp"
      v-if="flagApp">
    </EchartsPieShare>
  </div>
</template>
<script type="text/ecmascript-6">
  import EchartsPieShare from '../components/EchartsPieShare.vue'
  import API from '@/common/api'
  export default {
    name: 'ResShareCont',
    components: {
      EchartsPieShare
    },
    data () {
      return {
        // 数据文件  ------start-------
        dataPie: 'dataPie',
        cardNameData: '数据文件总数量',
        cardNumData: '',
        legendDataData: ['无条件共享', '有条件共享'],
        nameData: '数据文件',
        dataData: [],
        colorData: ['rgb(131,175,155)', 'rgb(200,200,169)'],
        flagData: false,
        // 数据文件  ------end-------
        // 数据Api  ------start-------
        apiPie: 'apiPie',
        cardNameApi: '数据Api总数量',
        cardNumApi: '',
        legendDataApi: ['无条件共享', '有条件共享'],
        nameApi: '数据Api',
        dataApi: [],
        colorApi: ['rgb(138,43,226)', 'rgb(200,200,169)'],
        flagApi: false,
        // 数据Api  ------end-------
        // 微应用  ------start-------
        appPie: 'appPie',
        cardNameApp: '微应用总数量',
        cardNumApp: '',
        legendDataApp: ['无条件共享', '有条件共享'],
        nameApp: '微应用',
        dataApp: [],
        colorApp: ['rgb(255,128,0)', 'rgb(200,200,169)'],
        flagApp: false
        // 微应用  ------end-------
      }
    },

    mounted: function () {
      this.getDataCount()
      this.getApiCount()
      this.getAppCount()
    },
//    created () {
//      this.getDataCount()
//    },
    methods: {
      getDataCount () {
        API.Data.getDataCount().then((res) => {
          this.cardNumData = res.result.totalNum + ''
          this.dataData = []
          this.dataData.push({value: res.result.noShareNum + '', name: '无条件共享'})
          this.dataData.push({value: res.result.yesShareNum + '', name: '有条件共享'})
          this.flagData = true
        })
      },
      getApiCount () {
        API.Api.getApiCount().then((res) => {
          this.cardNumApi = res.result.totalNum + ''
          this.dataApi = []
          this.dataApi.push({value: res.result.noShareNum + '', name: '无条件共享'})
          this.dataApi.push({value: res.result.yesShareNum + '', name: '有条件共享'})
          this.flagApi = true
        })
      },
      getAppCount () {
        API.App.getAppCount().then((res) => {
          this.cardNumApp = res.result.totalNum + ''
          this.dataApp = []
          this.dataApp.push({value: res.result.noShareNum + '', name: '无条件共享'})
          this.dataApp.push({value: res.result.yesShareNum + '', name: '有条件共享'})
          this.flagApp = true
        })
      }
    }
  }
</script>
<style lang="less" scoped>


</style>
