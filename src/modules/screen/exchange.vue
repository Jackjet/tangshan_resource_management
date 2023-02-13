<template>
  <div class="screen_home">
    <span class="logout" @click="logout">
      <img src="../../assets/images/screen/退出.svg" alt="">
    </span>
    <div class="header_text">
      <!-- 唐 山 市 线 上 数 据 大厅 -->
    </div>
    <div class="statistics_num">
      <div class="statistics_box">
        <ul>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据交换.svg" alt=""> 今日交换 <span>{{today.swapCount}}</span> 万条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用.svg" alt=""> 今日共享 <span>{{today.appCount}}</span> 万条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用2.svg" alt=""> 今日接入 <span>{{today.shareDirCount}}</span> 万条</li>
        </ul>
        <ul>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据交换.svg" alt=""> 累计交换 <span>{{heade.swapCount}}</span> 亿条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用.svg" alt=""> 累计共享 <span>{{heade.appCount}}</span> 亿条</li>
          <li class="statistics_bg"><img src="../../assets/images/screen/数据应用2.svg" alt=""> 累计接入 <span>{{heade.shareDirCount}}</span> 亿条</li>
        </ul>
      </div>
      <div class="resource_management" @click="routerGo('/home')">资源管理中心 <em> ▶</em></div>
    </div>
    <div class="box_content">
      <div class="left_btn">
        <div class="btn_nav" @click="routerGo('/handle')">
          <img src="../../assets/images/screen/left.svg" alt="">
        </div>
      </div>
      <div class="chart_box">
        <div class="echarts_content">
          <div class="apply_box">
            <h2>数据提供TOP10</h2>
            <div class="apply_chart" id="apply_chart"></div>
          </div>
          <div class="handle_box">
            <h2>数据共享TOP10</h2>
            <div class="handle_chart" id="handle_chart"></div>
          </div>
          <div class="handle_box">
            <h2>热门资源</h2>
            <div class="radar_chart" id="radar_chart"></div>
          </div>
        </div>
        <div class="list_box">
          <div class="box_left">
            <h2>近30天数据接入共享</h2>
            <span class="overview_btn" @click="routerGo('/exchangeList')">更多详情 >></span>
            <div class="overview_chart" id="overview_chart"></div>
          </div>
          <div class="box_right">
            <h2>热门应用场景</h2>
            <div class="diagram_chart" id="diagram_chart"></div>
          </div>
        </div>
      </div>
      <div class="right_btn">
        <div class="btn_nav">
          <!-- <img src="../../assets/images/screen/right.svg" alt=""> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'echarts-wordcloud';
import echarts from "echarts";
import API from "@/common/api";
export default {
  data() {
    return {
      today: {
        appCount: 0,
        mscxDirCount: 0,
        shareDirCount: 0,
        swapCount: 0
      },
      heade: {
        appCount: 0,
        mscxDirCount: 0,
        shareDirCount: 0,
        swapCount: 0
      },
      totalPage: 0,
      totalSize: 0,
    }
  },
  mounted() {
    // 今日统计
    API.exchangeApi.dataCurrentExchangeTotal().then(res => {
      if (res.status === 'OK') {
        this.today = {
          appCount: res.result.appCount,
          mscxDirCount: res.result.mscxDirCount,
          shareDirCount: res.result.shareDirCount,
          swapCount: res.result.swapCount
        }
      }
    })
    // 累计统计
    API.exchangeApi.dataExchangeTotal().then(res => {
      if (res.status === 'OK') {
        this.heade = {
          appCount: res.result.appCount,
          mscxDirCount: res.result.mscxDirCount,
          shareDirCount: res.result.shareDirCount,
          swapCount: res.result.swapCount
        }
      }
    })
    API.exchangeApi.dataProvideDepTop10().then(res => {
      if (res.status === 'OK') {
        let data = {
          names: [],
          value: []
        }
        res.result.forEach(item => {
          data.names.push(item.acceptDep);
          data.value.push(item.swapCount);
        })
        this.applyChartApiFun("apply_chart", data);
      }
    })
    API.exchangeApi.dataUseDepTop10().then(res => {
      if (res.status === 'OK') {
        let data = {
          names: [],
          value: []
        }
        res.result.forEach(item => {
          data.names.push(item.provideType);
          data.value.push(item.swapCount);
        })
        this.applyChartApiFun("handle_chart", data);
      }
    })
    // 热门资源
    API.exchangeApi.getRmzyList().then(res => {
      if (res.status === 'OK') {
        let names = [], values = [];
        res.result.forEach((item, index) => {
          if (index < 5) {
            names.push({
              name: item.name
            })
            values.push(item.applyCount)
          }
        })
        this.radarChartFun(names, values);
      }
    })
    // 热门应用场景
    API.exchangeApi.getRmyycjList().then(res => {
      if (res.status === 'OK') {
        this.diagramChartFun(res.result);
      }
    })
    // 数据总览
    API.exchangeApi.getData30sjjrList().then(res => {
      if (res.status === 'OK') {
        let time = [], jrCount = [], gxCount = [];
        res.result.forEach(item => {
          time.push(item.name)
          jrCount.push(item.jrCount)
          gxCount.push(item.gxCount)
        })
        this.brokenLineChart(time, jrCount, gxCount);
      }
    })

  },
  methods: {
    logout() {
      API.Common.outLoginByCurrentUser(res => { })
      API.Common.logout().then((res) => {
        window.location.href = location.protocol + '//' + location.host + '/#/login?t=' + new Date().getTime()
      })
    },
    // 柱状图
    applyChartApiFun(byid, datas) {
      let myChart = echarts.init(document.getElementById(byid));
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          // 会canvas的应该都能看得懂，shape是从custom传入的
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x + 2, shape.y];
          const c1 = [shape.x - 13, shape.y - 1];
          const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 3];
          const c3 = [xAxisPoint[0] + 2, xAxisPoint[1]];
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
        },
      });
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x + 2, shape.y];
          const c2 = [xAxisPoint[0] + 2, xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 15, xAxisPoint[1] - 5];
          const c4 = [shape.x + 15, shape.y - 5];
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
        },
      });
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x + 2, shape.y + 3];
          const c2 = [shape.x + 15, shape.y - 5]; //右点
          const c3 = [shape.x - 0, shape.y - 10];
          const c4 = [shape.x - 13, shape.y - 1];
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
        },
      });
      // 注册三个面图形
      echarts.graphic.registerShape('CubeLeft', CubeLeft);
      echarts.graphic.registerShape('CubeRight', CubeRight);
      echarts.graphic.registerShape('CubeTop', CubeTop);
      let option = {
        grid: {
          left: '5%',
          right: '5%',
          top: '15%',
          bottom: '-1%',
          containLabel: true,
        },
        tooltip: {
          confine: true,
          formatter: (params) => {
            let num = Math.ceil(params.value / 10000);
            return `${params.name} : ${num}万 项`
          },
          borderColor: "#fff",
          borderWidth: 2,
          backgroundColor: "rgba(36, 97, 167,.5)",
          padding: 10,
        },
        xAxis: {
          type: 'category',
          data: datas.names,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            },
          },
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: '#7DFFFD',
            },
          },
          axisLabel: {
            fontSize: 12,
            formatter: function (value) {
              var ret = "";
              var maxLength = 2;
              var valLength = value.length;
              var rowN = Math.ceil(valLength / maxLength);
              if (rowN > 1) {
                for (var i = 0; i < rowN; i++) {
                  var temp = "";
                  var start = i * maxLength
                  var end = start + maxLength;
                  temp = value.substring(start, end) + "\n";
                  ret += temp;
                }
                return ret;
              } else {
                return value;
              }
            }
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          splitNumber: 4,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: (params) => {
              return params / 10000 + " 万"
            },
            fontSize: 14,
          },
          boundaryGap: ['20%', '20%'],
        },
        series: [
          {
            type: 'custom',
            renderItem: (params, api) => {
              let cubeLeftStyle = '';
              let cubeRightStyle = '';
              let cubeTopStyle = '';
              // 颜色
              cubeLeftStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(211, 231, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(64, 154, 255)',
                },
              ])
              cubeRightStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 255, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(124, 182, 248)',
                },
              ])
              cubeTopStyle = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 255, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(191, 220, 255)',
                },
              ])
              //颜色end
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                children: [
                  {
                    type: 'CubeLeft',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: cubeLeftStyle,
                    },
                  },
                  {
                    type: 'CubeRight',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: cubeRightStyle,
                    },
                  },
                  {
                    type: 'CubeTop',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: cubeTopStyle,
                    },
                  },
                ],
              };
            },
            data: datas.value,
          },
          {
            type: 'bar',
            barMaxWidth: 10,
            label: {
              normal: {
                show: true,
                position: 'top',
                fontSize: 14,
                color: '#fff',
                offset: [2, -10],
                formatter: (params) => {
                  return Math.ceil(params.value / 10000)
                },
              },
            },
            itemStyle: {
              color: 'transparent',
            },
            tooltip: {},
            data: datas.value,
          },
        ],
      };

      myChart.setOption(option);
    },
    // 折线图
    brokenLineChart(xaxisData, yaxisData1, yaxisData2) {

      let myChart = echarts.init(document.getElementById('overview_chart'));

      let option = {
        grid: {
          top: "18%",
          left: "2%",
          right: "3%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          borderColor: "#fff",
          borderWidth: 2,
          backgroundColor: "rgba(36, 97, 167,.5)",
          padding: 10,
          formatter: function (params) {
            var relVal = params[0].name;
            for (var i = 0; i < params.length; i++) {
              relVal +=
                "<br/>" +
                params[i].marker +
                params[i].seriesName +
                ": " +
                params[i].value / 10000 +
                " 万条";
            }
            return relVal;
          },
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#fff",
            },
          },
        },
        legend: {
          orient: "horizontal",
          top: "3%",
          right: "3%",
          itemWidth: 10,
          itemHeight: 10,
          icon: "react",
          itemGap: 17,
          align: "right",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontFamily: "AlibabaPuHuiTi-Medium",
          },
        },
        xAxis: {
          data: xaxisData,
          boundaryGap: true,
          axisLabel: {
            color: "#fff",
            fontSize: 14,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          axisLabel: {
            color: "#fff",
            fontSize: 14,
            formatter: (params) => {
              return params / 10000 + " 万"
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "数据接入",
            data: yaxisData1,
            type: "line",
            symbol: "circle",
            symbolSize: 3,
            itemStyle: {
              color: "#fff",
              shadowColor: "#fff",
              shadowBlur: 10,
              borderColor: "#fff",
              borderWidth: 3,
              lineStyle: {
                color: "#fff",
              },
            },
          },
          {
            name: "数据共享",
            data: yaxisData2,
            type: "line",
            symbol: "circle",
            symbolSize: 3,
            itemStyle: {
              color: "#0af1fc",
              shadowColor: "#0af1fc",
              shadowBlur: 10,
              borderColor: "#0af1fc",
              borderWidth: 3,
              lineStyle: {
                color: "#0af1fc",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 雷达图
    radarChartFun(indicator, dataValue) {
      let myChart = echarts.init(document.getElementById('radar_chart'));
      var uploadedDataURL2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWoAAACFCAYAAAByvbIAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNTI0OWE0Ni0wMGZkLTQ5MDAtYWZmOS1jYmM3NjcwNzE0N2YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTNDNDYyQjZBREQ2MTFFOUE2ODJBQjZCRjQ4MDgyNzUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTAyMjFDQUNBREQ2MTFFOUE2ODJBQjZCRjQ4MDgyNzUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ZjczZmE5Yy0wZDYyLTRhNmMtOTQ1Ny03N2M4YTA5M2IyYTQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OTAxN2QwNS1lNTgzLTExN2MtYmUzNy1mZWZjMjY1Mzc4NTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4QJw7RAAAD6klEQVR42uzd34tUZRzH8bPLhoW0JAZSSiyEkIRe2EWi6I3eKJE3dZFUoBgaan9CF/4J/SARKSS8iAShUAgKAgMlKAiEkFjCpRTBSDYKV5e1z8OMEKHuuDtz5hFeL/jysLMz58Bz8WaZPXNmZGpysmnbu2d/n8hyMPN4A8B9jQ0h0uuy7M0ssf0AlYU6kd6S5bXMqK0HqCjUCfRIlp2Z7bYcoLJQJ9LlHG9mXrTdAJWFOpF+LMv+zHO2GqCyUCfSy7K8k3naNgNUFupEelWWQ5knbDFAZaFOpNc0nbc7HrW9AJWFOpHekOWNZgjXZwMI9fyR3pHl5cyIbQWoKNQJdPnwyq7MZtsJUFmoE+nyMfC3MmttJUBloU6kx7McyEzYRoDKQp1Ir2g610g/aQsBKgt1Iv1s9y/ppbYPoLJQJ9Lrs+zJPGLrACoLdSK9NcurjcvvAOoKdfcWpa9kttkugMpCnUiXtzh2Z16wVQCVhTqRLv8sfDuz2jYBVBbqRHp507n73VO2CKCyUCfSz3QjPW57ACoLdSL9fJZ9jW8IB6gv1In0piyvN74hHKCuUHcvv3upOwBU+Bd1+YbwjbYCoE6jIg1Qf6gBEGoAhBpAqAEQagCEGkCoARBqAKEGQKgBEGoAoQZAqAGE2hYACDUAQg0g1AAINQBCDSDUAAg1gFADINQACDWAUAMg1AAINYBQAyDUAEINgFADINQAQg2AUAMINQBCDYBQAwg1AEINgFADCDUAQg0g1AAINQBCDSDUAAg1gFADINQACDWAUAMg1AAINYBQAyDUAEINgFADINQAQg2AUAMINQBCDYBQAwg1AEINgFADCDUAQg0g1AAINQBCDSDUAAg1gFADINQACDWAUAMg1AAINcDD5NyYPQCo1unMl0INUJ+5zInDm1d+V34QaoC6zGSOJtIX7jwg1AD1mM68n0hP/fdBoQaow5VupP/4/y+EGmD4fsl8lEj/fbdfCjXAcP2Q+SSRvnWvJwg1wPB8nTmZSN++35OEGqB9JcyfJ9Df9PJkoQZoV3mL4+NE+sdeXyDUAO0p/yz8MJGefJAXCTVAO65l3kukrz7oC4UaYPAuZT5IpKcX8mKhBhis8lHw8pHwmYUeQKgBBqfcVKncXGluMQcRaoD+K5fffZFAn+nHwYQaoL9mM58m0uf7dUChBuifG5kjifTP/TyoUAP0x/Wmc/e73/p9YKEGWLzLTeca6T8HcXChBlici03n7Y5/BnUCoQZYuO8zxxPp2UGeRKgBFuarzKn5blEq1ADtKx9e+SyB/ratEwo1QO9uZo4l0j+1eVKhBujNX03nFqW/tn3ifwUYACTfn86fpYgKAAAAAElFTkSuQmCC';
      var dataArr = [
        {
          value: dataValue,
          name: '',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#17E7FF',
              },
              shadowColor: '#17E7FF',
              shadowBlur: 5,
            },
          },
        },
      ];
      function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i].name === obj) {
            return i;
          }
        }
        return false;
      }
      let option = {
        radar: {
          center: ['50%', '60%'],
          radius: '50%',
          triggerEvent: true, //开启雷达图的边角名称可点击
          name: {
            // (圆外的标签)雷达图每个指示器名称的配置项。分
            formatter: (value) => {
              let i = contains(indicator, value); // 处理对应要显示的样式
              return '{a|' + dataValue[i] + '}\n' + '{b|' + value + '}';
            },
            // textStyle: {
            //   padding: [5, 10, 5, 10],
            // },
            // backgroundColor: {
            //   image: uploadedDataURL2,
            // },
            // width: 100,
            // height: 70,
            rich: {
              a: {
                align: 'center',
                color: '#6EFFFD',
                fontSize: 20,
              },
              b: {
                align: 'center',
                color: '#FFFFFF',
                fontSize: 14,
              },
              // triggerEvent: true,//开启雷达图的边角名称可点击
            },
          },

          nameGap: 8,
          indicator: indicator,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: false,
          },
          axisLine: {
            //轴线
            show: true,
            lineStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  color: '#15506D0D',
                  offset: 0,
                },
                {
                  color: '#95E4F0',
                  offset: 0.9,
                },
              ]),
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(153, 209, 246, 0.5)', // 网格分割线颜色
            },
          },
        },
        series: [
          {
            type: 'radar',
            symbolSize: 10,
            symbol: 'circle',
            data: dataArr,
            areaStyle: {
              color: '#9EDDFF',
              opacity: 0.3,
            },
            lineStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#00D1FF',
                  },
                  {
                    offset: 1,
                    color: '#00A5FE',
                  },
                ],
                false
              ),
              width: 1,
            },
            itemStyle: {
              color: '#fff ',
              borderColor: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#00D1FF',
                  },
                  {
                    offset: 1,
                    color: '#00A5FE',
                  },
                ],
                false
              ),
              borderWidth: 1,
              opacity: 1,
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    // 关系图
    diagramChartFun(datas) {
      let myChart = echarts.init(document.getElementById('diagram_chart'));
      // 获取设置图形的颜色样式
      function getCircle(option = {}) {
        option.color = option.color || [];
        return {
          shadowBlur: 10,
          shadowColor: option.shadowColor || '#D65CEA',
          color: {
            type: 'radial', // 径向渐变
            x: 0.5, // 圆心坐标（中心）
            y: 0.5,
            r: 0.5, // 半径长度
            colorStops: [
              {
                offset: 0.1,
                color: option.color[0] || '#FCA7FF', // offset：坐标为0处的颜色
              },
              {
                offset: 1,
                color: option.color[1] || '#F772FB', // offset：坐标为1处的颜色
              },
            ],
          },
        };
      }

      // 计算线条箭头，根据source 样式设置箭头颜色
      function calcLines(links, seriesData) {
        let obj = {};
        links.forEach((v) => {
          if (obj[v.source]) {
            obj[v.source].data.push({
              coords: [seriesData[v.source].value, seriesData[v.target].value],
            });
          } else {
            obj[v.source] = {
              type: 'lines',
              coordinateSystem: 'cartesian2d',
              z: 1,
              zlevel: 2,
              animation: false,
              effect: {
                show: true,
                period: 10,
                trailLength: 0.01,
                symbolSize: 8,
                symbol: 'arrow',
                loop: true,
                //   color: "rgba(55,155,255,0.9)"
                color: seriesData[v.source].itemStyle.shadowColor,
              },
              // lines 线条样式，echarts 5.0+ 不生效时可以使用 方法1
              // lineStyle: {
              //     opacity: 0.9,
              //     width: 1,
              //     curveness: 0.3,
              //     color: seriesData[v.source].itemStyle.shadowColor,
              // },
              lineStyle: {
                width: 0,
                curveness: 0.3,
              },
              data: [
                {
                  coords: [seriesData[v.source].value, seriesData[v.target].value],
                },
              ],
            };
          }
        });
        let arr = Object.keys(obj).map((v) => obj[v]);

        return arr;
      }

      // 连接关联数据 根据index 下标连接
      const links = [
        { source: 0, target: 1 },
        { source: 2, target: 0 },
        { source: 0, target: 3 },
        { source: 4, target: 0 },
        { source: 2, target: 1 },
        { source: 2, target: 3 },
        { source: 5, target: 3 },
        { source: 3, target: 1 },
        { source: 5, target: 4 },
        { source: 0, target: 5 },
        { source: 6, target: 0 },
        { source: 7, target: 0 },
      ];

      // 图形数据
      const seriesData = [
        {
          name: '北京分院',
          symbolSize: 50,
          value: [20, 40],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '中国计量科学研究院',
          symbolSize: 30,
          value: [-20, 60],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '湖北计量中心',
          symbolSize: 50,
          value: [0, 80],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '国网计量中心',
          symbolSize: 40,
          value: [0, 30],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '江西计量中心',
          symbolSize: 50,
          value: [36, 30],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '武汉分院',
          symbolSize: 50,
          value: [5, -20],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '辽宁计量中心',
          symbolSize: 50,
          value: [35, 80],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '四川计量中心',
          symbolSize: 50,
          value: [30, -35],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '四川计量中心1',
          symbolSize: 35,
          value: [-10, 15],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
        {
          name: '四川计量中心2',
          symbolSize: 40,
          value: [-15, -35],
          itemStyle: getCircle({
            color: ['#89C4FF', '#449BF3'],
            shadowColor: '#60BDF6',
          }),
        },
      ];

      // seriesData.forEach((item, index) => {
      //   item.name = datas[index].name
      // })
      // 根据图形样式，创建图例样式
      const categories = seriesData.map((v) => {
        return {
          name: v.name,
          itemStyle: {
            color: v.itemStyle.color,
          },
        };
      });

      let option = {
        tooltip: {
          confine: true,
          borderColor: "#fff",
          borderWidth: 2,
          backgroundColor: "rgba(36, 97, 167,.5)",
          padding: 10,
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [
          {
            type: 'graph',
            layout: 'none', // 图的布局
            zlevel: 3,
            symbolSize: 90,
            coordinateSystem: 'cartesian2d',
            categories: categories,
            label: {
              show: true,
              // position: 'center',
              textStyle: { fontSize: 12, color: 'rgba(255,255,255,.9)' },
            },
            data: seriesData,
            links: links,
            lineStyle: {
              opacity: 1,
              width: 1.5,
              curveness: 0.3, // 曲线弯曲度
              // 根据连接线开始节点颜色设置，目前ehcarts5.0+ 不支持
              // 可以在 上一个属性 links 里指定样式，也可以在type: lines seriesItem 里指定线条样式 ↑↑↑↑↑
              color: 'source',
            },
          },
          ...calcLines(links, seriesData),
        ],
      };
      myChart.setOption(option);

    },
    routerGo(path) {
      this.$router.push({
        path: path,
        name: path.slice(1)
      });
    },
  }
}
</script>

<style lang="less" scoped>
.screen_home {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/screen/bg_back.jpg");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
.logout {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.header_text {
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 32px;
}
.statistics_num {
  display: flex;
  align-items: center;
  height: 20%;
  margin-top: 10px;
  padding-right: 5%;
}
.statistics_box {
  flex: 1;
}
.statistics_num ul {
  height: 44%;
  margin: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.statistics_bg {
  width: 260px;
  height: 60px;
  background: url("../../assets/images/screen/blue_num_bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.statistics_bg img {
  width: 12%;
  margin: 0 17px;
}
.statistics_bg span {
  font-size: 30px;
  margin: 0 5px;
}
.resource_management {
  width: 200px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/images/screen/资源管理中心底.svg");
  background-size: 100% 100%;
  color: #fff;
  cursor: pointer;
}
.resource_management em {
  font-size: 12px;
  margin-left: 5px;
}
.box_content {
  flex: 1;
  display: flex;
}
.left_btn,
.right_btn {
  width: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart_box {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.conference_table {
  width: 100%;
  height: 100%;
}
.echarts_content {
  flex: 0.7;
  display: flex;
  justify-content: space-between;
}
.apply_box,
.handle_box {
  margin-right: 10px;
  width: 49%;
  display: flex;
  flex-direction: column;
}
.apply_box h2,
.handle_box h2 {
  padding-left: 10px;
  width: 50%;
  line-height: 30px;
  color: #fff;
  background: url("../../assets/images/screen/heade.png");
  background-size: 100% 100%;
}
.apply_chart,
.handle_chart,
.radar_chart {
  flex: 1;
  background: url("../../assets/images/screen/柱图背景.png");
  background-size: 100% 100%;
  margin: 5px 0;
}
.list_box {
  flex: 1;
  display: flex;
}
.box_left {
  flex: 2;
  margin-right: 10px;
}
.box_right {
  flex: 1;
}
.list_box h2 {
  padding-left: 10px;
  width: 25%;
  line-height: 30px;
  color: #fff;
  background: url("../../assets/images/screen/heade.png");
  background-size: 100% 100%;
  margin-bottom: 5px;
}
.overview_btn {
  float: right;
  color: #fff;
  cursor: pointer;
  margin-top: -25px;
  margin-right: 20px;
}
.overview_chart,
.diagram_chart {
  width: 100%;
  height: 75%;
  margin-top: 20px;
  background: url("../../assets/images/screen/柱图背景.png");
  background-size: 100% 100%;
}
.btn_nav {
  width: 40px;
  height: 100px;
  cursor: pointer;
}
.btn_nav img {
  width: 100%;
  height: 100%;
}
</style>
<style>
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
  background: rgb(36, 97, 167) !important;
  color: #fff;
  padding: 0 10px;
}
.el-pagination.is-background .el-pager li {
  background: rgb(36, 97, 167);
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #fff;
  color: rgb(36, 97, 167);
}
</style>