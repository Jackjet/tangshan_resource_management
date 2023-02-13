<template>
  <div class="floor">
    <!--云数据-->
    <div class="newsGrid">
      <div class="gridHead">
        <h2 class="gridTit">文件</h2>
        <router-link :to="{ name: 'data' }" class="moreBtn">更多&nbsp;&gt;</router-link>
      </div>
      <div class="gridCont">
        <ul class="newsList">
          <li v-for="data in dataList">
            <router-link :to="{ name: 'dataDetail', params: { id: data.id }}">
              {{data.name}}
            </router-link>
            <span class="time">[{{data.updatedTime | formatTime}}]</span>
          </li>
        </ul>
      </div>
    </div>
    <!--云接口-->
    <div class="newsGrid gridB">
      <div class="gridHead">
        <h2 class="gridTit">接口</h2>
        <router-link :to="{ name: 'api' }" class="moreBtn">更多&nbsp;&gt;</router-link>
      </div>
      <div class="gridCont">
        <ul class="newsList">
          <li v-for="api in apiList">
            <router-link :to="{ name: 'apiDetail', params: { id: api.apiServiceId }}">
              {{api.apiServiceName}}
            </router-link>
            <span class="time">[{{api.updatedTimeFormat | formatTime}}]</span>
          </li>
        </ul>
      </div>
    </div>
    <!--云服务-->
    <div class="newsGrid gridC">
      <div class="gridHead">
        <h2 class="gridTit">云服务</h2>
        <router-link :to="{ name: 'service' }" class="moreBtn">更多&nbsp;&gt;</router-link>
      </div>
      <div class="gridCont">
        <ul class="newsList">
          <li v-for="app in appList">
            <router-link :to="{ name: 'serviceDetail', params: { id: app.id }}">
              {{app.name}}
            </router-link>
            <span class="time">[{{app.updatedTimeFormat | formatTime}}]</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'

  export default {
    data () {
      return {
        dataList: [],
        apiList: [],
        appList: [],
        params: {
          orderBy: 1,
          page: 1,
          pageSize: 5
        }
      }
    },
    created () {
      this.getDataList()
      this.getApiList()
      this.getAppList()
    },
    methods: {
      getDataList () {
        API.Data.getDataList(this.params).then((res) => {
          this.dataList = res.result.list
        })
      },
      getApiList () {
        API.Api.getApiList(this.params).then((res) => {
          this.apiList = res.result.list
        })
      },
      getAppList () {
        API.App.getAppList(this.params).then((res) => {
          this.appList = res.result.list
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .newsGrid {
    float: left;
    width: 356px;
    margin-left: 16px;
  }

  .newsGrid:first-child {
    margin-left: 0;
  }

  .newsGrid .gridHead {
    position: relative;
    padding: 13px 15px;
    background: url(../images/newsHeadBg.png) no-repeat;
    overflow: hidden;
  }

  .newsGrid .gridHead:after {
    content: "";
    position: absolute;
    left: 90px;
    bottom: 0;
    display: inline-block;
    width: 74px;
    height: 44px;
    background-image: url(../images/newsHeadIco_a.png);
    background-repeat: no-repeat;
    background-position: left bottom;
  }

  .newsGrid.gridB .gridHead:after {
    background-image: url(../images/newsHeadIco_b.png);
  }

  .newsGrid.gridC .gridHead:after {
    background-image: url(../images/newsHeadIco_c.png);
  }

  .newsGrid .gridHead .gridTit {
    float: left;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    line-height: 24px;
  }

  .newsGrid .gridHead .moreBtn {
    float: right;
    display: block;
    font-size: 16px;
    color: #fff;
    line-height: 24px;
  }

  .newsGrid .gridCont {
    height: 254px;
    padding: 15px;
    background-image: url(../images/newsGridBg_a.png);
    background-repeat: no-repeat;
    background-position: right bottom;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-top: 0;
  }

  .newsGrid.gridB .gridCont {
    background-image: url(../images/newsGridBg_b.png);
  }

  .newsGrid.gridC .gridCont {
    background-image: url(../images/newsGridBg_c.png);
  }

  .newsList {
  }

  .newsList li {
    margin-top: 12px;
    padding-left: 15px;
    background: url(../images/blueDot.png) no-repeat left 7px;
    line-height: 18px;
    overflow: hidden;
  }

  .newsList li:first-child {
    margin-top: 0;
  }

  .newsList li a {
    display: inline-block;
    max-width: 100%;
    font-size: 16px;
    vertical-align: bottom;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .newsList .time {
    display: block;
    margin-top: 5px;
    font-size: 16px;
    color: #999;
  }
</style>
