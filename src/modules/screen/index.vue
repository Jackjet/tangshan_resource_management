<template>
  <div class="screen_home">
    <span class="logout" @click="logout">
      <img src="../../assets/images/screen/退出.svg" alt="">
    </span>
    <div class="header_text">
      <!-- 唐 山 市 线 上 数 据 大厅 -->
    </div>
    <div class="statistics_num">
      <ul v-if="btnType!=='Z'" class="classification_type">
        <!-- <li class="statistics_bg"><img src="../../assets/images/screen/入驻单位.svg" alt=""> 入驻单位 <span>{{heade.settldDeptTotal}}</span> 个</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/在线单位.svg" alt=""> 在线单位 <span>{{heade.onLineDepTotal}}</span> 个</li> -->
        <li class="statistics_bg"><img src="../../assets/images/screen/在线单位.svg" alt=""> {{btnType}}区在线率 <span>{{(heade.currSettldDeptTotal/(heade.onLineDepTotal+heade.currOnLineCurrDepTotal)*100).toFixed(2)}}</span> %</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/资源办理.svg" alt=""> {{btnType}}区在线单位 <span>{{heade.currSettldDeptTotal}}</span> 个</li>
        <li class="statistics_bg"><img src="../../assets/images/screen/资源申请.svg" alt=""> {{btnType}}区离线单位 <span>{{heade.currOnLineCurrDepTotal}}</span> 个</li>
        <li class="resource_management" @click="routerGo('/home')">资源管理中心 <em> ▶</em></li>
      </ul>
      <ul v-if="btnType==='Z'" class="classification_z">
        <li class="statistics_bg statistics_rz"> 入驻单位 <span>{{header.settedDep}}</span> 个</li>
        <li class="statistics_bg statistics_zx"> 在线单位 <span>{{header.onlineDep}}</span> 个</li>
        <li class="statistics_bg statistics_lx"> 离线单位 <span>{{header.outlineDep}}</span> 个</li>
        <li class="statistics_bg statistics_zxl"> 在线率 <span>{{header.onLineRatio}}</span></li>
        <li class="resource_management" @click="routerGo('/home')">资源管理中心 <em> ▶</em></li>
      </ul>
    </div>
    <div class="box_content">
      <div class="left_btn">
        <div class="btn_nav">
          <!-- <img src="../../assets/images/screen/left.svg" alt=""> -->
        </div>
      </div>
      <div class="chart_box">
        <div v-if="btnType!=='Z'" class="data_left" @click="directionBtn('left')"></div>
        <div v-if="btnType!=='Z'" class="data_right" @click="directionBtn('right')"></div>
        <div v-if="btnType==='Z'" class="overview_content">
          <div v-for="item in statistics" :key="item.type" :class="'con_box con_'+item.type">
            <div class="overview_details">
              <p>入住单位 &emsp;&emsp; <em>{{item.settle_in}}</em> 个</p>
              <p>在线单位 &emsp;&emsp; <em>{{item.currSettldDeptTotal}}</em> 个</p>
              <p>离线单位 &emsp;&emsp; <em>{{item.currOnLineCurrDepTotal}}</em> 个</p>
              <ul class="details_instructions">
                <li v-for="v in item.currSettldDeptTotal" :key="v+'_1'"><span style="background:rgb(0, 255, 110)"></span></li>
                <li v-for="v in item.currOnLineCurrDepTotal" :key="v+'_2'"><span style="background:rgb(27, 44, 104)"></span></li>
                <li v-for="v in 20-item.settle_in" :key="v"></li>
              </ul>
            </div>
            <img :src="require('../../assets/images/screen/'+item.type+'.png')" alt="">
          </div>
        </div>
        <div v-if="btnType!=='Z'" class="conference_table" id="conference_table"></div>
        <div class="meeting_distinguish">
          <span :class="btnType==='Z'?'meeting_active':''" @click="tabsBtn('Z')">入住总览</span>
          <span v-for="item in btnTypeArr" :class="btnType===item?'meeting_active':''" @click="tabsBtn(item)" :key="item">
            {{item}} 区
          </span>
        </div>
      </div>
      <div class="right_btn">
        <div class="btn_nav" @click="routerGo('/handle')">
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
      btnType: 'Z',
      btnTypeArr: [],
      heade: {
        onLineDepTotal: 0,
        currSettldDeptTotal: 0,
        currOnLineCurrDepTotal: 0,
        settldDeptTotal: 0
      },
      header: {
        onLineRatio: 0,
        onlineDep: 0,
        outlineDep: 0,
        settedDep: 0
      },
      deptList: [],
      tipsData: null,
      statistics: []
    }
  },
  mounted() {
    // 入驻总览头部统计接口
    API.screenApi.settedHeader().then(res => {
      if (res.status === 'OK') {
        this.header = res.result[0];
      }
    })
    // 入住单位分组
    API.screenApi.dataDepGroupTypeList().then(res => {
      if (res.status === 'OK') {
        this.btnTypeArr = res.result;

        // 处理分组统计数据
        res.result.forEach((item, index) => {
          this.dataHallHeaderTotalFun(item, index);
        })

        this.dataHallDeptListFun(this.btnType);
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
    // 头部 统计接口
    async dataHallHeaderTotalFun(type, index) {
      let res = await API.screenApi.dataHallHeaderTotal({ groupType: type });
      if (res.status === 'OK') {
        this.heade = {
          onLineDepTotal: res.result.onLineDepTotal,
          currSettldDeptTotal: res.result.currSettldDeptTotal,
          currOnLineCurrDepTotal: res.result.currOnLineCurrDepTotal,
          settldDeptTotal: res.result.settldDeptTotal
        }

        if (index !== undefined) {
          this.statistics.push({
            type: type,
            index: index,
            settle_in: res.result.currSettldDeptTotal + res.result.currOnLineCurrDepTotal,
            currSettldDeptTotal: res.result.currSettldDeptTotal,
            currOnLineCurrDepTotal: res.result.currOnLineCurrDepTotal,
          })
        }

        this.statistics.sort((a, b) => {
          return a.index - b.index;
        })
      }
    },
    // 入住单位列表
    dataHallDeptListFun(type) {
      API.screenApi.dataHallDeptList({ groupType: type }).then(res => {
        if (res.status === 'OK') {
          this.deptList = res.result;
          if (type !== 'Z') {
            this.echartsApiFun(this.deptList);
          }
        }
      })
    },
    directionBtn(directionType) {
      let index = this.btnTypeArr.indexOf(this.btnType);

      if (directionType == 'left') {
        if (index > -1) {
          index -= 1;
        }
      } else {
        if (index < this.btnTypeArr.length - 1) {
          index += 1;
        } else {
          index = this.btnTypeArr.length - 1
        }
      }
      if (index === -1) {
        this.btnType = 'Z'
      } else {
        this.btnType = this.btnTypeArr[index];

      }
      this.dataHallHeaderTotalFun(this.btnType);
      this.dataHallDeptListFun(this.btnType);
    },
    // 区域切换
    tabsBtn(type) {
      this.btnType = type;
      this.dataHallHeaderTotalFun(type);
      this.dataHallDeptListFun(type);
    },
    echartsApiFun(dataList) {
      // 坐标
      let values = [
        [-41, 20],
        [-32, 23],
        [-23, 26],
        [-14, 27],
        [-5, 28],
        [4, 28],
        [13, 28],
        [22, 26],
        [31, 24],
        [40, 22],
        [-40, -18],
        [-31, -20],
        [-22, -22],
        [-13, -23],
        [-4, -24],
        [5, -24],
        [14, -23],
        [23, -22],
        [32, -20],
        [41, -18],
      ];
      let datas = [];
      values.forEach((item, index) => {
        if (dataList[index]) {
          datas.push({
            value: item,
            name: dataList[index].depName,
            shortName: dataList[index].shortName,
            depCode: dataList[index].depCode,
            loginType: dataList[index].loginType,
            id: dataList[index].id
          })
        } else {
          return false;
        }
      })

      let myChart = echarts.init(document.getElementById('conference_table'));
      let itemsData = [];
      datas.forEach((item, index) => {
        // 在位
        if (item.loginType === 'on') {
          itemsData.push({
            id: item.id,
            name: item.name,
            value: item.value,
            pointType: "point",
            // 在位
            symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAACvCAYAAADg+sAgAAAABHNCSVQICAgIfAhkiAAAA9dJREFUeJzt3cFqXFUAxvHvuzOTVBFbEYqPYF6gLyFd+BguFNz6GIr4FloKbnyErtzZpSC46CoFoYUk87mI2jad5N5bJ5lvyP+3Prkczp9z7+TMMOOPHn77jVBpGflo15PAZsOuJ4DLEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRpxhxihGnGHGKEacYcYoRp9gy0Sdz/sCD7mmt1di4WC8cnbz71PZHrJWj90YHDjrJWsdTr7ucPxO9H0+YiHQWybOvv59WsT4cG+TohTQ9zqzbmq0heYegkCQlWtrT13zmMycHcyeEi6av4fQ4ziLx6LMGV0u8krOYMnZyHMvsmi2ZupaT4vj8VR3Pmi1JtPSEF2MTdw7Pmu0bX9PROJaXkSfdIzFd5IXlK3fPaJw4h9ubEl43trZXxrG1UjjiuTbRYF9+2nLlwkfsmut21RpfGsf2geLbcvyyO7HtzS+tN8ax44Rdc1OSHNp5ayNs3jnhH84bt2HN34pja4hEnBsW6eDioeiGncOu2Z031/6NOHYWSTjc3JEkK792KHph57Brdu9Vg//i2F5wuLl752/InR+Xvdo5WfPSucU/LQZJssXhZpHIC1vLQZISsWvKJDr89+CNw80+w1KSbL2c8UcnU47cLL2Ucis+tyb7LBr/jJ7P12PyWi8l/TF7MuvcGRsS+c+Z0fdW1rojTfjQxvl6TF5vbmfFiFOMOMWIU4w4xYhTjDjFiFNs8lsEVn6L9TTRAw2+OzreeaLk+f+b3n7woLuJHoyNS/Lc1hNHn0Y+Ghs/OU6sp8ePv/rx3sPv1onvj40/XSx+/uunL55Nvf4+++DzH+4vTs9G30G29Oz48ZePPv7s+6OzYT0ah9taMeIUI04x4hQjTjHiFCNOMeIUI04x4hQjTjHiFCNOMeIUI04x4hQjTjHiFCNOMeIUI04x4hQjTjHiFCNOMeIUI04x4hQjTjHiFCNOMeIUI04x4hQjTjHiFCNOMeIUI04x4hQjTjHiFCNOMeIUm//DEovTX6f9kNvt+vZ9L05+2fY1Z8c5fvT179uexL67rm/H4rZWjDjFiFOMOMWIU4w4xYhTjDjFiFOMOMWIU4w4xYhTjDjFiFOMOMWIU4w4xYhTjDjFiFOMOMWIU4w4xYhTjDjFiFPsbxxsp3supMwxAAAAAElFTkSuQmCC",
            symbolSize: [50, 100],
            label: {
              position: "top",
              borderRadius: 4,
              show: true,
              padding: 10,
              width: 65,
              height: 40,
              formatter: (params) => {
                let arr = params.name.split('');
                let str = '';
                arr.forEach((item, index) => {
                  if (index === 5) {
                    str += '\n'
                  }
                  str += item;
                })
                return ['{a|' + str + '}'];
              },
              backgroundColor: {
                image: require('../../assets/images/screen/文字背景.svg')
              },
              rich: {
                a: {
                  height: 100,
                  color: '#fff',
                  align: "center",
                  lineHeight: 18,
                }
              }
            }
          })
        } else {//缺位
          itemsData.push({
            id: item.id,
            name: item.name,
            value: item.value,
            pointType: "point",
            // 缺位
            symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAACvCAYAAADg+sAgAAAABHNCSVQICAgIfAhkiAAAA5NJREFUeJzt3TFuG0cUgOH3lkvLSRGnMnyE6AIEoaPlUIGbNDmAQLBKF5cGDKRwFVcWIJAvhQlblkTujCCJP5P/q4eL0fyY3cVQkHK5XP4aQhoj4vzYk9D9hmNPQPsZB8w4YMYBMw6YccCMA2YcMOOAGQfMOGDGATMOmHHAjANmHDDjgBkHzDhgxgEzDphxwIwDZhww44AZB8w4YMYBMw6YccCMA2YcMOOAGQfMOGDGATMOmHHAjANmHDDjgBkHzDhgxgEzDphxwIwDZhww44AZB8w4YMYBMw6YccCMA2YcMOOAGQfMOGDGATMOmHHAjANmHLAxIt70fKCqfs7MecPQz5l5/bBpnZaqmkfEDw3jrjPzn9brjr0Tycwfq2pyIpm5qarsvf6JmlfVT1ODMvNzRDTH6bqtZeZQVd1B9UVVjZnZvOZdcarqRf+UdFPPGvbEmUVEy7NGh83jy1pO6onjrnk8TWvZGmeMB7w8aK+m9WyKk5numkfWsqYtccaqarpHqt1uTQ/unsk4mXn2aDPSd6bW9mCczJxXlUc8T6SqhkOnLQcXvqrcNU/s0BrvjbN7YP1fjl+OKfe9HOyLk+6a57Nb6zsb4d44vjo/v/vW/E6c3eGmcZ5ZVb24fSh6J45hjuf22t+O4+HmcX13KHo7jrvm+L42uBln8jhBz2KM3e65GcdXZ46ziG9xvtYSwiwixiHCw02izDwbPNxkqqphrKqIiKuOz7X+LtpVx9hTt4m2n/U6OtZ6jIgPPbPIzIiIlw3j/q6qnugnKzNfRtsz+yo61tvbGZhxwIwDZhww44AZB8w4YMYB6/mK4K+IeBcRi4h4NTV4u92uM/PTQyd2Srbb7avMXDQM/RQR64j4JSLOpwb3xHm3Wq1+WywW28x8PTV4Npv9fnl5+bHj+ifr4uLi9WazmfwGuao+rtfrt8vl8jwa4nhbAzMOmHHAjANmHDDjgBkHzDhgxgEzDphxwIwDZhww44AZB8w4YMYBMw6YccCMA2YcMOOAGQfMOGDGATMOmHHAjANmHDDjgBkHzDhgxgEzDphxwIwDZhww44AZB8w4YMYBMw6YccCMA9b9jyWGYfjzKSZy6jLzj4YxXdfsjrNard73fua/7qn+Opa3NTDjgBkHzDhgxgEzDphxwIwDZhww44AZB8w4YMYBMw6YccCMA2YcMOOAGQfMOGDGATMOmHHAjANmHDDjgBkH7F8jV47NAevv/AAAAABJRU5ErkJggg==",
            symbolSize: [50, 100],
            label: {
              position: "top",
              borderRadius: 4,
              show: true,
              padding: 10,
              width: 65,
              height: 40,
              formatter: (params) => {
                let arr = params.name.split('');
                let str = '';
                arr.forEach((item, index) => {
                  if (index === 5) {
                    str += '\n'
                  }
                  str += item;
                })
                return ['{a|' + str + '}'];
              },
              backgroundColor: {
                image: require('../../assets/images/screen/文字背景缺位.svg')
              },
              rich: {
                a: {
                  height: 100,
                  color: 'rgb(197, 197, 197)',
                  align: "center",
                  lineHeight: 18,
                }
              }
            }
          })
        }
      })
      let option = {
        tooltip: {
          formatter: (params, ticket, callback) => {
            if (this.tipsName != params.name) {
              this.tipsName = params.name;
              API.screenApi.dataHallDeptInfo({ depId: params.data.id }).then(res => {
                if (res.status === 'OK') {
                  this.tipsData = res.result;
                  callback(ticket, this.tipsHtml(res.result));
                }
              })
            } else {
              if (this.tipsData) {
                return this.tipsHtml(this.tipsData)
              }
            }
          },
          padding: [10, 15],
          backgroundColor: "transparent",
          extraCssText: `background:url(${require('../../assets/images/screen/弹框背景.png')});background-size:100% 100%;width:350px;height:200px;`
        },
        xAxis: {
          show: false,
          type: "value",
          max: 50,
          min: -51
        },
        yAxis: {
          show: false,
          type: "value",
          max: 50,
          min: -50
        },
        series: [{
          type: "graph",
          coordinateSystem: "cartesian2d",
          silent: false,
          hoverAnimation: false,
          legendHoverLink: false,
          z: 1,
          data: itemsData.slice(0, 10)
        },
        {
          type: "graph",
          coordinateSystem: "cartesian2d",
          silent: true,
          hoverAnimation: false,
          legendHoverLink: false,
          z: 2,
          data: [
            {
              name: '',
              value: [0, 0],
              pointType: "point",
              symbol: "image://data:image/png;base64,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",
              symbolSize: [1100, 300],
            }
          ]
        },
        {
          type: "graph",
          coordinateSystem: "cartesian2d",
          silent: false,
          hoverAnimation: false,
          legendHoverLink: false,
          data: itemsData.slice(10, 20)
        },
        ]
      };
      myChart.setOption(option);
    },
    tipsHtml(data) {
      if (data.userList.length) {
        return `<div>
                  <h2 style='font-size:18px;line-height:34px;'>${data.name}</h2>
                  <ul style='display: flex;flex-wrap: wrap;'>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>工作人员： ${data.userList[0] ? data.userList[0].name : ''}</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>手机号： ${data.userList[0] ? data.userList[0].mobilePhone : ''}</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>首席代表： ${data.userList[1] ? data.userList[1].name : ''}</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>手机号： ${data.userList[1] ? data.userList[1].mobilePhone : ''}</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>办公电话： ${data.officePhone ? data.officePhone : ''}</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'></li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>部门待办： ${data.dealCount} 项</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>部门驳回： ${data.rejectCount} 项</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>部门审批： ${data.approveCount} 项</li>
                    <li style='width:50%;background: rgb(36, 97, 167);line-height:28px;margin-bottom:1px;padding-left:10px;'>部门申请： ${data.applyCount} 项</li>
                  </ul>
                </div>`
      } else {
        return `<div>
                  <h2 style='font-size:18px;line-height:34px;'>${data.name}</h2>
                  详情暂无数据...  
                </div>`
      }

    },
    routerGo(path) {
      this.$router.push({
        path: path,
        name: path.slice(1)
      });
    }
  }
}
</script>

<style scoped>
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
  height: 20%;
}
.statistics_num .classification_type {
  height: 100%;
  margin: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.statistics_num .classification_z {
  height: 100%;
  margin: 0 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.classification_type .statistics_bg {
  width: 280px;
  height: 70px;
  background: url("../../assets/images/screen/blue_num_bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.classification_z .statistics_bg {
  width: 250px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding-left: 64px;
}
.statistics_rz {
  background: url("../../assets/images/screen/入住单位.png");
  background-size: 100% 100%;
}
.statistics_zx {
  background: url("../../assets/images/screen/在线单位.png");
  background-size: 100% 100%;
}
.statistics_lx {
  background: url("../../assets/images/screen/离线单位.png");
  background-size: 100% 100%;
}
.statistics_zxl {
  background: url("../../assets/images/screen/在线率.png");
  background-size: 100% 100%;
}
.statistics_bg img {
  width: 30px;
  margin: 0 20px;
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
  flex: 1;
  position: relative;
}
.meeting_distinguish {
  width: 100%;
  position: absolute;
  bottom: 15%;
  display: flex;
  justify-content: center;
  color: #fff;
}
.meeting_distinguish span {
  background: rgba(16, 77, 147, 0.3);
  margin: 0 20px;
  padding: 5px 20px;
  cursor: pointer;
}
.meeting_distinguish .meeting_active {
  background: rgb(16, 77, 147);
}
.data_left {
  position: absolute;
  width: 30px;
  height: 50px;
  background: url("../../assets/images/screen/chart_left.png");
  background-size: 100% 100%;
  left: 8%;
  top: 45%;
  z-index: 100;
  cursor: pointer;
}
.data_right {
  position: absolute;
  width: 30px;
  height: 50px;
  background: url("../../assets/images/screen/chart_right.png");
  background-size: 100% 100%;
  right: 8%;
  top: 45%;
  z-index: 100;
  cursor: pointer;
}
.overview_content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.con_box {
  flex: 1;
  /* margin-top: 10%; */
  text-align: center;
}
.overview_details {
  color: #fff;
  width: 38%;
  margin: 0 auto;
  /* font-size: 18px; */
}
.details_instructions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0 20px 0;
}
.details_instructions li {
  width: 15px;
  height: 15px;
  padding: 2px;
  border: 1px solid rgb(17, 31, 79);
  background: rgb(5, 9, 23);
  padding: 2px;
}
.details_instructions li span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.overview_details p {
  line-height: 30px;
}
.overview_details p em {
  display: inline-block;
  text-align: left;
  width: 1em;
}
.con_box img {
  width: 90%;
}
.con_A {
  margin-top: -15%;
  margin-right: -15%;
}
.con_D {
  margin-top: -15%;
  margin-left: -15%;
}
.conference_table {
  width: 100%;
  height: 100%;
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