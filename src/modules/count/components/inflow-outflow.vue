<style>
  .resMointChartPage{
    background-color: #03070a;
  }
  .resMointChartPage .el-header {
    background-color:#1b1b1b;
    color: #a5a5a5;
    padding: 0 0 0 20px;
  }
  .mainBack {
    background-color: #1d2023;
    color: #ffffff;
    margin:15px;
    padding: 15px;
  }
  .resMointChartPage header .el-button.is-round {
    border-radius: 12px;
  }
  .resMointChart .el-tabs__nav-wrap::after{
    height: 1px;
    background-color: transparent;
  }

  .resMointChart .el-table tr{
    background-color: #4a4d4f;
  }
  .resMointChart .el-table th{
    background-color: #5b5e60;
    color: #fafafa
  }
  .resMointChart .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #5b5e60;
  }
  .resMointChart table tbody{
    color: #efefef
  }
  .resMointChart .el-table--border td{
    border-right: 1px solid #6e6e6e;
  }
  .resMointChart .el-table--border th {
    border-right: 1px solid #6e6e6e;
  }
  .resMointChart .el-table td{
    border-bottom: 1px solid #6e6e6e;
  }
  .resMointChart .el-table th.is-leaf {
    border-bottom: 1px solid #6e6e6e;
  }
  .resMointChart .el-table--border {
    border: 1px solid #6e6e6e;
  }
  .resMointChart .el-table--group {
    border: 1px solid #6e6e6e;
  }
  .resMointChart .el-tabs__nav-wrap{
    overflow: visible;
  }
  .resMointChart .el-tabs__item{
    color:#a5a5a5;
  }
  .resMointChart .el-tabs__item.is-active {
    color: #409EFF;
  }
  .div-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner,.div-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color:#7b7b7b;
  }
  .div-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner:hover{
    color:#409EFF;
  }
  .div-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color:#7b7b7b;
  }
  .backIcon{
    color:#409eff;
  }
  #changeBtn{
    background-color: #20a0ff;
    border-radius: 4px;
    padding:8px 16px;
    z-index:9999;
    position: relative;
    top: -5px;
    cursor: pointer;
  }
  .resMointList .el-table::before {
    height: 0;
  }
  .resMointList .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: transparent;
  }
  .dialogBox .el-table::before {
    background-color: #e6e6e6;
  }
</style>
<template>
  <div id='inflowOutflowID' style="height: 400px" >
  </div>
</template>
<script >
  import '../../../../static/jquery.arctext.js'
  import API from '@/common/api'
  export default {
    name: 'inflowoutflow',
    data () {
      return {
        data1: [
          {name: '', value: [10, -20], num: '', count: '', Count: '', code: ''},
          {name: '', value: [20.3, 30], num: '', count: '', Count: '', code: ''},
          {name: '', value: [6, 50], num: '', count: '', Count: '', code: ''},
          {name: '', value: [30, 10], num: '', count: '', Count: '', code: ''},
          {name: '', value: [-15, -25], num: '', count: '', Count: '', code: ''},
          {name: '', value: [-10, 40], num: '', count: '', Count: '', code: ''},
          {name: '', value: [-10, -60], num: '', count: '', Count: '', code: ''},
          {name: '', value: [28, -60], num: '', count: '', Count: '', code: ''},
          {name: '', value: [10, -80], num: '', count: '', Count: '', code: ''},
          {name: '', value: [-20, 30], num: '', count: '', Count: '', code: ''}
        ],
        coordList:[]
      }
    },
    mounted: function () {
      this.drawflow()
    },
    created: function () {
    },
    methods: {
      drawflow () {
        var echarts = require('echarts')
        let inOrOutFlowChart = echarts.init(document.getElementById('inflowOutflowID'));
        API.Statistics.getFlowToDept().then((res) => {
          var _this = this
          var resultData = res.result
          for (var i = 0; i < 10; i++) {
            if (resultData.length <= i) {
              _this.data1[i].value = []
            } else {
              _this.data1[i].name = resultData[i].dep_name
              _this.data1[i].code = resultData[i].dep_code
              _this.data1[i].num = resultData[i].count
              _this.data1[i].count = resultData[i].flowCount
              _this.data1[i].Count = resultData[i].useCount
            }
          }

          for(var i=0;i<resultData.length;i++){
            if(resultData[i].flowList.length>0){
              for(var j=0;j<resultData[i].flowList.length;j++){
                  for(var k=0;k<_this.data1.length;k++){
                    if(resultData[i].flowList[j].dep_code==_this.data1[k].code){
                        var temp=[{
                          coord: _this.data1[i].value,
                          name: _this.data1[i].name
                        }, {
                          coord: _this.data1[k].value,
                          name: _this.data1[k].name
                        }];
                        _this.coordList.push(temp);
                    }
                  }
              }
            }
            if(resultData[i].useList.length>0){
              for(var j=0;j<resultData[i].useList.length;j++){
                for(var k=0;k<_this.data1.length;k++){
                  if(resultData[i].useList[j].dep_code==_this.data1[k].code){
                    var temp=[{
                      coord: _this.data1[k].value,
                      name: _this.data1[k].name
                    }, {
                      coord: _this.data1[i].value,
                      name: _this.data1[i].name
                    }];
                    _this.coordList.push(temp);
                  }
                }
              }
            }
          }
          inOrOutFlowChart.setOption(
            {
              tooltip: {
                trigger: 'item',
                formatter: function (params) {
                  if (params.componentSubType === 'lines') {
                    return params.data.name + '→' + params.data.toName
                  } else if (params.componentSubType === 'effectScatter') {
                    return '<div><h3>' + params.data.name + '</h3>资源数量:' + params.data.num + '<br/>流向部门:' + params.data.count + '<br/>使用部门:' + params.data.Count + '<br/></div>'
                  }
                }
              },
              xAxis: {
                show: false,
                type: 'value'
              },
              yAxis: {
                show: false,
                type: 'value'
              },
              series: [{
                type: 'effectScatter',
                coordinateSystem: 'cartesian2d',
                symbolSize: 35,
                label: {
                  normal: {
                    show: true,
                    formatter: '{b}'
                  }
                },
                edgeSymbolSize: function (val) {
                  return 9 + val[2] / 10
                },
                data: this.data1.slice(1),
                // links: links,
                itemStyle: {
                  normal: {
                    show: false,
                    //                  color: '#dfbf26',
                    label: {
                      color: '#ccc',
                      shadowBlur: 80,
                      shadowColor: '#000'
                    }
                  }
                }
              }, {
                name: this.data1[0].name,
                type: 'effectScatter',
                // zlevel: 3,
                symbolSize: 55,
                coordinateSystem: 'cartesian2d',
                label: {
                  normal: {
                    show: true,
                    formatter: '{b}'
                  }
                },
                edgeSymbolSize: function (val) {
                  return 9 + val[2] / 10
                },
                data: [this.data1[0]],
                // links: links,
                itemStyle: {
                  normal: {
                    show: false,
                    color: '#dfbf26',
                    label: {
                      color: '',
                      shadowBlur: 80,
                      shadowColor: '#000'
                    }
                  }
                }
              },
                {
                  type: 'lines',
                  zlevel: 2,
                  // links: links,
                  coordinateSystem: 'cartesian2d',
                  edgeSymbol: ['', 'arrow'],
                  effect: {
                    show: true,
                    smooth: false,
                    symbol: 'arrow',
                    symbolSize: 6
                  },
                  lineStyle: {
                    normal: {
                      color: '#dfbf26',
                      opacity: 0.2,
                      width: 1,
                      curveness: 0.15
                    }
                  },
                  data: this.coordList
                }]
            }
          )
        })
      }
    }
  }
</script>

