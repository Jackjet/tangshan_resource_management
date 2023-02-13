<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 350px;">
      <!--创建一个echarts的容器-->
           <div :id="barId" style="width:350px; height:330px;margin-top: 0px;"></div>
      </el-aside>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
  // 引入Echarts主模块
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/bar')
  // 引入圆饼图
  // require('echarts/lib/chart/pie')
  // 引入所需组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/toolbox')

  export default {
    name: 'EchartsBarShare',
    data () {
      return {
//        legendData: ['直接访问', '邮件营销'],
//        typeName: '访问来源',
//        typeData: [
//          {value: 835, name: '直接访问'},
//          {value: 210, name: '邮件营销'}
//        ],
//        typeColor: ['rgb(131,175,155)', 'rgb(200,200,169)']
      }
    },
    props: {
      barId: {
        type: String,
        required: true
      },
      barColor: {
        type: Array,
        required: true
      },
      legendData: {
        type: Array,
        required: true
      }
    },
    methods: {
       /* 创建图表一 */
      createChartOne () {
        let chartOne = echarts.init(document.getElementById(this.barId))
        chartOne.setOption({
          color: this.barColor,
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: this.legendData
          },
          grid: {
            left: '2%',
            right: '2%',
            top: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['201711', '201712', '201801', '201802', '201803', '201804']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '新增企业',
              type: 'bar',
              barWidth: '40%',
              stack: 'company',
              data: [20552, 12632, 22413, 18863, 15239, 28674]
            },
            {
              name: '注销企业',
              type: 'bar',
              barWidth: '40%',
              stack: 'company',
              data: [1652, 1324, 961, 1465, 1398, 3607]
            }
          ]
        })
      }
    },
    mounted () {
      this.createChartOne()
    }
  }
</script>
<style lang="less" scoped>

</style>
