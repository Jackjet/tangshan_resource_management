<template>
  <!--floor3-->
  <div class="floor">
    <div class="floorTit">数据中心</div>
    <!--数据汇聚-->
    <div class="dataGrid gridL">
      <div class="gridHead">
        <h2 class="gridTit">数据汇聚</h2>
        <router-link to="/aggregationDataList" class="moreBtn">更多&nbsp;&gt;</router-link>
      </div>
      <div class="gridCont">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="dataTable">
            <thead>
              <tr>
                <th width="20%">单位名称</th>
                <th width="34%">信息名称</th>
                <th width="12%">接入方式</th>
                <th width="10%">记录数</th>
                <th width="24%">时间</th>
              </tr>
            </thead>
          <tbody>
          <tr v-for="item in convergeDataList.slice(0,8)">       <!-- 控制循环条数为7-->
            <td>{{item.institutionname}}</td>
            <td>
              <router-link :to="{ name: 'resCatalogDetail', params: { id: item.id }}" :title="item.name">
                {{item.name}}
              </router-link>
            </td>
            <td>{{item.infoformatclassify}}</td>
            <td>{{item.recordeTotal}}</td>
            <td>{{item.itemupdatetime | dateformat}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--部门信息汇聚总量TOP5-->
    <div class="dataGrid gridR">
      <div class="gridHead">
        <h2 class="gridTit">部门信息汇聚总量TOP5</h2>
      </div>
      <div class="gridCont">
        <div id="gridLine1" style="width: 420px; height: 345px;"></div>
      </div>
    </div>
    <!--数据共享-->
    <div class="dataGrid gridL mt25">
      <div class="gridHead">
        <h2 class="gridTit">数据共享</h2>
        <router-link to="/shareDataList" class="moreBtn">更多&nbsp;&gt;</router-link>
      </div>
      <div class="gridCont">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="dataTable">
          <thead>
          <tr>
            <th width="15%">单位名称</th>
            <th width="25%">信息名称</th>
            <th width="12%">共享方式</th>
            <th width="9%">记录数</th>
            <th width="24%">时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in shareDataList.slice(0,8)">
            <td>{{item.institutionname}}</td>
            <td>
              <router-link :to="{ name: 'resCatalogDetail', params: { id: item.id }}" :title="item.name">
                {{item.name}}
              </router-link>
            </td>
            <td>{{item.sharetype}}</td>
            <td>{{item.recordeTotal}}</td>
            <td>{{item.itemupdatetime | dateformat}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--共享部门排行TOP5-->
    <div class="dataGrid gridR mt25">
      <div class="gridHead">
        <h2 class="gridTit">共享部门排行TOP5</h2>
      </div>
      <div class="gridCont">
        <div id="gridLine2" style="width: 420px; height: 345px;"></div>
      </div>
    </div>
  </div>
  <!--end floor3-->
</template>

<script>
  import API from '@/common/api'
  import moment from 'moment'
  import Axios from 'axios'
  export default {
    data () {
      return {
        convergeDataList: [],
        shareDataList: [],
        deptConvergeStatistics: [],
        deptShareStatisticsAll: [],
        deptShareStatisticsMonth: []
      }
    },
    created: function () {
      this.initData()
    },
    mounted: function () {
    },
    methods: {
      initData: function () {
        API.Resdoc.getInfoList({
          'pageSize': 8,
          'hasDb': false
        }).then((res) => {
          this.convergeDataList = res.result.records
        })
        API.Resdoc.findShareDataList({
          'pageSize': 8,
          'hasDb': false
        }).then((res) => {
          this.shareDataList = res.result.records
        })
        let _this = this
        API.Statistics.getDeptConvergeStatistics().then((res) => {
          _this.deptConvergeStatistics = res.result
          this.initConverge()
        })

        var startPublishTime = moment().subtract(1, 'months').format('YYYY-MM-DD')
        Axios.all([
          API.Statistics.getDeptShareStatistics(),
          API.Statistics.getDeptShareStatistics({
            startPublishTime: startPublishTime
          })]).then(Axios.spread((res1, res2) => {
            _this.deptShareStatisticsAll = res1.result
            _this.deptShareStatisticsMonth = res2.result
            this.initShare()
          })
        )
      },
      initConverge: function () {
        let _this = this
        let electronicEvidenceNum = []
        let naturalPersonNum = []
        let creditNum = []
        let legalPerson = []
        let otherNum = []
        let institutionname = []
        var deptLength = _this.deptConvergeStatistics.length > 5 ? 5 : _this.deptShareStatisticsAll.length
        for (var i = 0; i < deptLength; i++) {
          electronicEvidenceNum.push(_this.deptConvergeStatistics[i].electronicEvidenceNum)
          naturalPersonNum.push(_this.deptConvergeStatistics[i].naturalPersonNum)
          creditNum.push(_this.deptConvergeStatistics[i].creditNum)
          legalPerson.push(_this.deptConvergeStatistics[i].legalPerson)
          otherNum.push(_this.deptConvergeStatistics[i].otherNum)
          institutionname.push(_this.deptConvergeStatistics[i].INSTITUTIONNAME)
        }
        let line1 = window.echarts.init(document.getElementById('gridLine1'))
        let option1 = {
          tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
//          legend: {
//            y: '3%',
//            data: ['自然人', '信用', '电子证照', '法人', '其他']
//          },
          grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: institutionname,
            axisLabel: {
              formatter: function (value) {
                var res = value
                if (res.length > 5) {
                  res = res.substring(0, 4) + '..'
                }
                return res
              }
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '自然人',
              type: 'bar',
              stack: '信息汇聚',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              },
              data: naturalPersonNum
            },
            {
              name: '信用',
              type: 'bar',
              stack: '信息汇聚',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              },
              data: creditNum
            },
            {
              name: '电子证照',
              type: 'bar',
              stack: '信息汇聚',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              },
              data: electronicEvidenceNum
            },
            {
              name: '法人',
              type: 'bar',
              stack: '信息汇聚',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              },
              data: legalPerson
            },
            {
              name: '其他',
              type: 'bar',
              stack: '信息汇聚',
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              },
              data: otherNum
            }
          ]
        }

        // 使用刚指定的配置项和数据显示图表。
        line1.setOption(option1)
      },
      initShare: function () {
        let _this = this
        let institutionName = []
        let shareNumAll = []
        let shareNumMonth = []
        var shareAllLength = _this.deptShareStatisticsAll.length > 5 ? 5 : _this.deptShareStatisticsAll.length
        for (var j = 0; j < shareAllLength; j++) {
          institutionName.push(_this.deptShareStatisticsAll[j].INSTITUTIONNAME)
          shareNumAll.push(_this.deptShareStatisticsAll[j].shareNum)
        }
        var shareMonthLength = _this.deptShareStatisticsMonth.length > 5 ? 5 : _this.deptShareStatisticsMonth.length
        for (var k = 0; k < shareMonthLength; k++) {
          shareNumMonth.push(_this.deptShareStatisticsMonth[k].shareNum)
        }
        let line2 = window.echarts.init(document.getElementById('gridLine2'))
        let option2 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            y: '3%',
            data: ['累计共享', '近一个月共享']
          },
          grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: institutionName,
            axisLabel: {
              formatter: function (value) {
                var res = value
                if (res.length > 5) {
                  res = res.substring(0, 4) + '..'
                }
                return res
              }
            }
          },
          series: [
            {
              name: '累计共享',
              type: 'bar',
              data: shareNumAll,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              }
            },
            {
              name: '近一个月共享',
              type: 'bar',
              data: shareNumMonth,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'white',
                    align: 'center'
                  }
                }
              }
            }
          ]
        }
        line2.setOption(option2)
      }
    }
  }
</script>


