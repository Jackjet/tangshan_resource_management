<style lang="" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  svg {
    transform: rotate(-90deg);
    position: relative;
  }
  circle {
    transition: stroke-dasharray .2s;
  }
  .time-count-x {
    line-height: 1.5;
    position: relative;
  }
  .time-second {
    position: absolute;
    top: 50%; left: 0; right: 0;
    margin-top: -.75em;
    text-align: center;
    font-size: 100px;
  }
  circle{
    position: relative;
  }

  .index_circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #4E88DB;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    font-weight: 700;
    white-space: nowrap;
  }
  .index_circle span{
    color: #000;
    font-size: 12px;
    white-space: nowrap;
    position: absolute;
    left: 110%;
    font-weight: normal;
  }
  .index_circle:nth-of-type(1){
    top:6px;
    left:61%;
    background: #3D9CCF;
    font-size: 18px;
  }
  .index_circle:nth-of-type(2){
    top:34px;
    left:76%;
    background: #626CF7;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 17px;
  }
  .index_circle:nth-of-type(3){
    top:74px;
    left:86.2%;
    background: #5E69FF;
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 16px;
  }
  .index_circle:nth-of-type(4){
    top:126px;
    left:90%;
    background: #4A8DD8;
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 15px;
  }
  .index_circle:nth-of-type(5){
    bottom:99px;
    left:88%;
    background: #4A8DD8;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
  }
  .index_circle:nth-of-type(6){
    bottom: 52px;
    left: 80.5%;
    background: #4197D2;
    width: 22px;
    height: 22px;
    line-height: 22px;
    font-size: 13px;
  }
  .index_circle:nth-of-type(7){
    bottom:20px;
    left:66%;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .index_circle:nth-of-type(8){
    bottom:7px;
    left:45%;
    background: #2CAEC4;
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
  .index_circle:nth-of-type(8) span{
    top:70%;
  }
  .index_circle:nth-of-type(9){
    bottom:32px;
    left:22%;
    background: #1CC0B9;
    width: 16px;
    height: 16px;
    line-height: 16px;

  }
  .index_circle:nth-of-type(9) span{
    /*direction: ;*/
    left:-130px;
  }
  .index_circle:nth-of-type(10){
    bottom:80px;
    left:28px;
    background: #15C8B4;
    width: 14px;
    height: 14px;
    font-weight: normal;
    line-height: 14px;
  }
  .index_circle:nth-of-type(10) span{
    /*direction: ;*/
    left:-130px;
  }
  .middle_show{
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    margin: auto;
    width: 170px;
    height: 170px;
    color: #83A8E5;
    font-weight: 400;
    font-size: 14px;
  }
  .middle_show {
    padding-top: 45px;
  }
  .mock_legend{
    font-size: 13px;
    font-weight: 700;
    color: #3EC0B9;
    transform: rotate(-62deg);
    position: absolute;

    left: -47px;
    top: 80px;
    letter-spacing: 2px;

  }
  .middle_show p{text-align: center;margin-bottom: 12px}

  /*.tooltip {*/
  /*font-size: 13px;*/
  /*width: 120px;*/
  /*height: 60px;*/

  /*text-align: center;*/
  /*background: rgba(0, 0, 0, 0.5);*/
  /*position: fixed;*/
  /*padding-top: 10px;*/
  /*}*/
  /*.tooltip p{*/
  /*margin: 0;*/
  /*padding: 0;*/
  /*font-size: 13px;*/
  /*line-height: normal;*/
  /*}*/
</style>
<template>
  <div id="timeCountX" class="time-count-x" style="width: 100%;height: 300px;position: relative;left: 120px">
    <!--<div class="middle_show" v-for="item in resultData">-->
      <!--{{item}}-->
    <!--</div>-->
    <div id="main"  style="width: 100%;height: 300px;position: relative;left: -130px"></div>
  </div>
</template>
<script type="">
  import '../../../../static/jquery.arctext.js'
  import API from '@/common/api'

  export default {
    name: 'ResDeptDownloadNum',
    data () {
      return {
        resultData: [],
        deptArray:[],
        dataArray:[],
        appArray:[],
        apiArray:[]
      }
    },
    mounted: function () {
      var whdef = 100 / 1819// 表示1920的设计图,使用100PX的默认值
      // var wH = window.innerHeight// 当前窗口的高度q
      var wW = window.innerWidth// 当前窗口的宽度
      var rem = wW * whdef// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
      $('html').css('font-size', rem + 'px')
      $('.mock_legend').arctext({radius: 115})
      this.getReduceDeptDownloadNum()
    },
    methods: {
      getReduceDeptDownloadNum () {
        API.Statistics.getDeptDownloadNum().then((res) => {
          var resultData = res.result
          var category = []
          var category1 = []
          var category2 = []
          var category3 = []
          for (var i = 0; i < resultData.length; i++) {
            category.push(resultData[i].dep_name)
            category1.push(resultData[i].appNum)
            category2.push(resultData[i].dataNum)
            category3.push(resultData[i].apiNum)
          }
          this.resultData = res.result
          this.deptArray = category
          this.appArray = category1
          this.dataArray = category2
          this.apiArray = category3

          var echarts = require('echarts')
          require('echarts/theme/macarons')
          var myChart = echarts.init(document.getElementById('main'),'macarons')
          var option = {
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['接口', '文件']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: this.deptArray,
              axisLabel: {
                interval:0,
                rotate:40
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '接口',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'inside'
                  }
                },
                barWidth:'50%',
                data: this.apiArray
              },
              {
                name: '文件',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'inside'
                  }
                },
                barWidth:'50%',
                data: this.dataArray
//              },
//              {
//                name: '云服务',
//                type: 'bar',
//                stack: '总量',
//                label: {
//                  normal: {
//                    show: true,
//                    position: 'inside'
//                  }
//                },
//                barWidth:'50%',
//                data: this.appArray
              }
            ]
          }
          myChart.setOption(option)
        })
      }
    }
  }
</script>
