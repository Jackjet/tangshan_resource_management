<template>
  <div class="wrapper">
    <div class="cardStyale">
      <div style="width: 100%; margin-top: 10px;float: left">
        <el-card class="box-card">
          <div slot="header" class="clearfix cardBlock">
            <span class="cardText">目录及资源按类型统计</span>
          </div>
          <div id="resRankByType" class="chart"></div>
          <!--<ResAndCatTypeCont></ResAndCatTypeCont>-->
        </el-card>
      </div>
    </div>
    <div class="cardStyale">
      <div style="width: 100%;height:495px; margin-top: 10px;float: left">
        <div style="width: 50%; height:461px;float: left;">
        <el-card class="box-card">
          <div slot="header" class="clearfix cardBlock">
              <span class="cardText">共享资源统计</span>
          </div>
          <div id="topicAnaly" class="chart"></div>
        </el-card>
      </div>
        <div style="width: 50%; height:461px;float: right;">
        <el-card class="box-card" style="height: 494px;">
          <div slot="header" class="clearfix cardBlock">
              <span class="cardText">提供资源排行榜TOP10</span>
          </div>
          <ResDeptNum></ResDeptNum>
        </el-card>
        </div>
      </div>

      <div style="width: 100%; margin-top: 10px;float: left">
        <el-card class="box-card">
          <div slot="header" class="clearfix cardBlock">
            <span class="cardText">资源使用TOP10</span>
          </div>
          <ResDeptDownloadNum></ResDeptDownloadNum>
        </el-card>
      </div>

      <div style="width: 100%; margin-top: 10px;float: left;margin-right: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix cardBlock">
            <span class="cardText">共享需求TOP10</span>
          </div>
          <ResDeptNeedNum></ResDeptNeedNum>
        </el-card>
      </div>

        <!--资源流出监控start-->
        <div style="width: 100%; margin-top: 10px;float: left">
          <el-card class="box-card">
            <div slot="header" class="clearfix cardBlock">
              <span class="cardText">资源流向</span>
            </div>
            <div id="" class="chart">
              <inflowoutflow></inflowoutflow>
            </div>

          </el-card>
        </div>
    </div>
  </div>

</template>

<script>
  import ResShareCont from '../count/components/ResShareCont.vue'
  import ResDeptNum from '../count/components/ResDeptNum.vue'
  import ResDeptDownloadNum from '../count/components/ResDeptDownloadNum.vue'
  import ResDeptNeedNum from '../count/components/ResDeptNeedNum.vue'
  import inflowoutflow from '../count/components/inflow-outflow.vue'
  import API from '@/common/api'
  import Axios from 'axios'
  export default {
    components: {
      ResShareCont,
      ResDeptNum,
      ResDeptDownloadNum,
      ResDeptNeedNum,
      inflowoutflow
    },
    data () {
      return {
        topics: ['公共服务', '健康保障', '社会保障', '食品药品安全', '安全生产', '价格监管', '能源安全', '信用体系', '城乡建设'],
        dataArray: [50, 100, 150, 200, 30, 40, 140, 230, 140],
        apiArray: [30, 30, 40, 50, 80, 20, 60, 90, 100],
        appArray: [60, 100, 25, 34, 55, 25, 35, 65, 56],
        dataSum: 1000,
        apiSum: 410,
        appSum: 370,
        data_notShare:100,
        app_notShare:0,
        api_notShare:0,
        data_totalShare:50,
        api_totalShare:50,
        app_totalShare:100,
        data_halfShare:100,
        api_halfShare:120,
        app_halfShare:80,
        notShare:100,
        totalShare:200,
        halfShare:300
      }
    },
    mounted () {
      this.drawTopic()
      this.drawResRankByType()
    },
    methods: {
      drawResRankByType () {
        let _this = this
        API.Statistics.getCountResByShareType().then((res) => {
          if (res.status === 'OK') {
            _this.totalShare = res.result.totalShare
            _this.notShare = res.result.notShare
            _this.halfShare = res.result.halfShare
            _this.data_notShare = res.result.data_notShare
            _this.data_totalShare = res.result.data_totalShare
            _this.data_halfShare = res.result.data_halfShare
//            _this.app_totalShare = res.result.app_totalShare
//            _this.app_halfShare = res.result.app_halfShare
//            _this.app_notShare = res.result.app_notShare
            _this.api_notShare = res.result.api_notShare
            _this.api_halfShare = res.result.api_halfShare
            _this.api_totalShare = res.result.api_totalShare
          this.createResRank()
          }
        })
      },
      createResRank () {
        let _this = this
        var echarts = require('echarts')
        require('echarts/theme/macarons')
        var myChart = echarts.init(document.getElementById('resRankByType'),'macarons')
        // 指定图表的配置项和数据
        var option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true}
//              dataView : {show: true, readOnly: false},
//              magicType : {
//                show: true,
//                type: ['pie', 'funnel']
//              },
//              restore : {show: true},
//              saveAsImage : {show: true}
            }
          },
          calculable : false,
          series : [
            {
              name:'目录共享类别',
              type:'pie',
              selectedMode: 'single',
              radius : [0, 70],
              // for funnel
              // x: '20%',
              width: '100%',
              funnelAlign: 'right',
              // max: 1548,
              avoidLabelOverlap: true,
            // itemStyle: {
            //     normal : {
            //       label : {
            //         position : 'inner'
            //       },
            //       labelLine : {
            //         show : false
            //       }
            //     }
            //   },
              data:[
                {value:this.notShare, name:'不予共享'},
                {value:this.totalShare, name:'无条件共享'},
                {value:this.halfShare, name:'有条件共享'}
              ]
            },
            {
              name:'资源类别',
              type:'pie',
              radius : [100, 140],
              // for funnel
              // x: '60%',
              width: '100%',
              funnelAlign: 'left',
              // max: 1048,
              data:[
                {value:this.data_notShare, name:'文件-不予共享'},
                {value:this.api_notShare, name:'接口-不予共享'},
//                {value:this.app_notShare, name:'云服务-不予共享'},
                {value:this.data_totalShare, name:'文件-无条件共享'},
                {value:this.api_totalShare, name:'接口-无条件共享'},
//                {value:this.app_totalShare, name:'云服务-无条件共享'},
                {value:this.data_halfShare, name:'文件-有条件共享'},
                {value:this.api_halfShare, name:'接口-有条件共享'}
//                {value:this.app_halfShare, name:'云服务-有条件共享'}
              ]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      drawTopic () {
        let _this = this
        API.Statistics.getCountResByTopic().then((res) => {
          if (res.status === 'OK') {
            var topicArr = res.result.topic
//            var appArr = res.result.app
            var apiArr = res.result.api
            var dataArr = res.result.data
            var newTopics = []
          var newDataArray = []
          var newApiArray = []
//          var newAppArray = []
            for (var i = 0; i < topicArr.length; i++) {
              newTopics.push(topicArr[i].name)
            var flag = false
            for (var j = 0; j < dataArr.length; j++) {
                if (dataArr[j].id === topicArr[i].id) {
                  newDataArray.push(dataArr[j].SUM)
                  flag = true
                }
              }
              if (!flag) {
                newDataArray.push(0)
              }
              flag = false
              for (var k = 0; k < apiArr.length; k++) {
                if (apiArr[k].id === topicArr[i].id) {
                  newApiArray.push(apiArr[k].SUM)
                  flag = true
                }
              }
              if (!flag) {
                newApiArray.push(0)
              }
              flag = false
//              for (var l = 0; l < appArr.length; l++) {
//                if (appArr[l].id === topicArr[i].id) {
//                  newAppArray.push(appArr[l].SUM)
//                  flag = true
//                }
//              }
//              if (!flag) {
//                newAppArray.push(0)
//              }
            }
            _this.topics = newTopics
          _this.dataArray = newDataArray
//          _this.appArray = newAppArray
          _this.apiArray = newApiArray
          _this.createTopic()
        }
        })
      },
      createTopic () {
        let _this = this
        var echarts = require('echarts')
        require('echarts/theme/macarons')
        var myChart = echarts.init(document.getElementById('topicAnaly'),'macarons')
        myChart.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
          },
          angleAxis: {
            type: 'category',
            data: _this.topics,
            z: 100
          },
          radiusAxis: {
          },
          polar: {
          },
          series: [{
            type: 'bar',
            data: _this.dataArray,
            coordinateSystem: 'polar',
            name: '文件',
            stack: 'a'
          }, {
            type: 'bar',
            data: _this.apiArray,
            coordinateSystem: 'polar',
            name: '接口',
            stack: 'a'
//          }, {
//            type: 'bar',
//            data: _this.appArray,
//            coordinateSystem: 'polar',
//            name: '云服务',
//            stack: 'a'
          }],
          legend: {
            show: true,
            orient: 'vertical',
            right: '0',
            bottom: '0',
            data: ['文件', '接口']
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '~@/assets/less/variables.less';
  .wrapper {
    overflow: hidden;
  }
  .chart {
    height: 400px;
  }
  .cardText {
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:11px;
  }
  #echartStye .el-container{
    margin-bottom: -12px!important;

  }
  .cardBlock{
    width: 200px;
    height: 14px;
    padding-left: 6px;
    border-left: 2px solid rgba(0,170,113,1);
  }
  .cardStyale .el-card{
    border:0px solid #EBEEF5
  }
  .cardStyale .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0);
  }

</style>
