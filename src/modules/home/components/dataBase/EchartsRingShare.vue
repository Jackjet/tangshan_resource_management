<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 350px;">
      <!--创建一个echarts的容器-->
           <div :id="ringId" style="width:350px; height:330px;margin-top: -20px;"></div>
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
  require('echarts/lib/chart/pie')
  // 引入所需组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/toolbox')

  export default {
    name: 'EchartsRingShare',
    data () {
      return {
      }
    },
    props: {
      ringId: {
        type: String,
        required: true
      }
    },
    methods: {
       /* 创建图表一 */
      createChartOne () {
        let chartOne = echarts.init(document.getElementById(this.ringId))
        var dataStyle = {
          normal: {
            label: {
              show: true
            },
            labelLine: {
              show: true
            },
            shadowBlur: 15,
            shadowColor: 'white'
          }
        }
        var placeHolderStyle = {
          normal: {
            color: 'rgba(0,0,0,0)',
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        }
        chartOne.setOption({
          color: ['#007eff', '#afeb15', '#fd5870'],
          legend: {
            top: '13%',
            left: '28%',
            itemHeight: 15,
            itemWidth: 20,
            data: ['小微型', '中型', '大型'],
            textStyle: {
              color: '#333'
            },
            selectedMode: true,
            orient: 'vertical'
          },
          series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['52%', '62%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [{
              value: 150,
              name: '小微型'
            }, {
              value: 50,
              name: 'invisible',
              itemStyle: placeHolderStyle
            }
            ]
          }, {
            name: 'Line 2',
            type: 'pie',
            clockWise: true,
            radius: ['43.8%', '51.8%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [{
              value: 150,
              name: '中型'
            }, {
              value: 60,
              name: 'invisible',
              itemStyle: placeHolderStyle
            }]
          }, {
            name: 'Line 3',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['35.6%', '43.6%'],
            itemStyle: dataStyle,
            data: [{
              value: 80,
              name: '大型'
            }, {
              value: 50,
              name: 'invisible',
              itemStyle: placeHolderStyle
            }]
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
