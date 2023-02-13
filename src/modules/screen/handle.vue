<template>
  <div class="screen_home">
    <span class="logout" @click="logout">
      <img src="../../assets/images/screen/退出.svg" alt="">
    </span>
    <div class="header_text">
      <!-- 唐 山 市 线 上 数 据 大厅 -->
    </div>
    <div class="statistics_num">
      <ul>
        <li class="statistics_bg"><img src="../../assets/images/screen/今日申请.svg" alt=""> 今日申请 <span>{{heade.currApplyCount}}</span> 项</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/累计申请.svg" alt=""> 累计申请 <span>{{heade.applyCount}}</span> 项</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/今日审批.svg" alt=""> 今日办理 <span>{{heade.currDealCount}}</span> 项</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/累计审批.svg" alt=""> 累计办理 <span>{{heade.dealCount}}</span> 项</li>
        <li class="resource_management" @click="routerGo('/home')">资源管理中心 <em> ▶</em></li>
      </ul>
    </div>
    <div class="box_content">
      <div class="left_btn">
        <div class="btn_nav" @click="routerGo('/')">
          <img src="../../assets/images/screen/left.svg" alt="">
        </div>
      </div>
      <div class="chart_box">
        <div class="echarts_content">
          <div class="apply_box">
            <h2>资源在线申请TOP10</h2>
            <div class="apply_chart" id="apply_chart"></div>
          </div>
          <div class="handle_box">
            <h2>资源在线办理TOP10</h2>
            <div class="handle_chart" id="handle_chart"></div>
          </div>
        </div>
        <div class="overview_box">
          <h2>近30天资源申请办理</h2>
          <span class="overview_btn" @click="routerGo('/handleList')">更多详情 >></span>
          <div class="overview_chart" id="overview_chart"></div>
        </div>
      </div>
      <div class="right_btn">
        <div class="btn_nav" @click="routerGo('/exchange')">
          <img src="../../assets/images/screen/right.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import API from "@/common/api";
export default {
  data() {
    return {
      heade: {
        currApplyCount: 0,
        applyCount: 0,
        currDealCount: 0,
        dealCount: 0
      },
      listData: [],
      totalPage: 0,
      totalSize: 0,
    }
  },
  mounted() {
    // 申请
    API.handleApi.listDepartRelReqTop10().then(res => {
      if (res.status === 'OK') {
        let data = {
          names: [],
          value: []
        }
        res.result.forEach(item => {
          data.names.push(item.name);
          data.value.push(item.sum);
        })
        this.applyChartApiFun("apply_chart", data);
      }
    })
    // 办理
    API.handleApi.listDepartRecReqTop10().then(res => {
      if (res.status === 'OK') {
        let data = {
          names: [],
          value: []
        }
        res.result.forEach(item => {
          data.names.push(item.name);
          data.value.push(item.sum);
        })
        this.applyChartApiFun("handle_chart", data);
      }
    })
    // 头部统计
    API.handleApi.dataDealHeaderTotal({ groupType: 'A' }).then(res => {
      if (res.status === 'OK') {
        this.heade = {
          currApplyCount: res.result.currApplyCount,
          applyCount: res.result.applyCount,
          currDealCount: res.result.currDealCount,
          dealCount: res.result.dealCount
        }
      }
    })
    // 近30天资源申请
    API.handleApi.getApply30BeforeList().then(res => {
      if (res.status === 'OK') {
        let time = [], applyCount = [], dealCount = [];
        res.result.forEach(item => {
          time.push(item.name)
          applyCount.push(item.applyCount)
          dealCount.push(item.dealCount)
        })
        this.brokenLineChart(time, applyCount, dealCount);
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
          top: '12%',
          bottom: '0%',
          containLabel: true,
        },
        tooltip: {
          confine: true,
          formatter: (params) => {
            return `${params.name} : ${params.value} 项`
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
            fontSize: 14,
            // rotate: 40,
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
          splitNumber: 5,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            },
          },
          splitLine: {
            show: false,
          },

          axisTick: {
            show: false,
          },
          axisLabel: {
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
                params[i].value +
                " 条";
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
          // max: 100,
          axisLabel: {
            color: "#fff",
            fontSize: 14,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
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
            name: "申请",
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
            name: "办理",
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
  height: 15%;
}
.statistics_num ul {
  height: 100%;
  margin: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.statistics_bg {
  width: 240px;
  height: 60px;
  background: url("../../assets/images/screen/blue_num_bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.statistics_bg img {
  width: 30px;
  margin: 0 16px;
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
  // flex: 1;
  width: 86%;
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
  width: 49%;
  display: flex;
  flex-direction: column;
}
.apply_box h2,
.handle_box h2 {
  padding-left: 10px;
  width: 50%;
  line-height: 30px;
  margin-bottom: 10px;
  color: #fff;
  background: url("../../assets/images/screen/heade.png");
  background-size: 100% 100%;
}
.apply_chart,
.handle_chart {
  flex: 1;
  background: url("../../assets/images/screen/柱图背景.png");
  background-size: 100% 100%;
  margin: 5px 0;
}
.overview_box {
  flex: 1;
}
.overview_box h2 {
  padding-left: 10px;
  width: 25%;
  line-height: 30px;
  margin: 10px 0;
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
}
.overview_chart {
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