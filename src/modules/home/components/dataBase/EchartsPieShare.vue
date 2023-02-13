<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 350px;">
      <!--创建一个echarts的容器-->
           <div :id="pieId" style="width:350px; height:330px;margin-top: 0px;"></div>
      </el-aside>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
  // 引入Echarts主模块
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图
 // require('echarts/lib/chart/bar')
  // 引入圆饼图
  require('echarts/lib/chart/pie')
  // 引入所需组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/toolbox')

  export default {
    name: 'EchartsPieShare',
    data () {
      return {
//        cardName: '数据文件总数量',
//        cardNum: '3456781',
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
      pieId: {
        type: String,
        required: true
      },
      legendData: {
        type: Array,
        required: true
      },
      typeName: {
        type: String,
        required: true
      },
      typeData: {
        type: Array,
        required: true
      },
      typeColor: {
        type: Array,
        required: true
      }
    },
    methods: {
       /* 创建图表一 */
      createChartOne () {
        let chartOne = echarts.init(document.getElementById(this.pieId))
        chartOne.setOption({
//          tooltip: {
//            trigger: 'item',
//            formatter: '{a} <br/>{b} : {c} ({d}%)',
//            position: function (p) {
//              // 位置回调
//              return [p[0] + 2, p[1] - 1]
//            }
//          },
          legend: {
            orient: 'horizontal', // 'vertical'
            x: 'center', // 'center' | 'left' | {number},
            y: 'top', // 'center' | 'bottom' | {number}
            itemGap: 10,
            data: this.legendData,
            width: 350
          },
//          toolbox: {
//            show: true,
//            feature: {
//              mark: {show: true},
//              dataView: {show: true, readOnly: false},
//              magicType: {
//                show: true,
//                type: ['pie', 'funnel'],
//                option: {
//                  funnel: {
//                    x: '25%',
//                    width: '70%',
//                    funnelAlign: 'left',
//                    max: 1548
//                  }
//                }
//              },
//              restore: {show: true},
//              saveAsImage: {show: true}
//            }
//          },
          calculable: true,
          series: [
            {
              name: this.typeName,
              type: 'pie',
              radius: ['40%', '55%'],
              center: ['50%', '50%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                    position: 'center',
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    position: 'inner',
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'bold'
                    }
                  }
                }
              },
              data: this.typeData
            }
          ],
          color: this.typeColor
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
