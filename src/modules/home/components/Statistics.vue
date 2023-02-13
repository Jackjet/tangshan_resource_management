<!--统计数据-->
<template>
  <div class="statistics">
    <div class="inner">
      <!--<div class="dataItem">-->
        <!--<div class="itemTit">资源目录：</div>-->
        <!--<dl>-->
          <!--<dt>部门</dt>-->
          <!--<dd><a href="http://10.32.118.95/"  target="_blank">29</a></dd>-->
        <!--</dl>-->
        <!--<dl>-->
          <!--<dt>业务信息</dt>-->
          <!--<dd><a href="http://10.32.118.95/"  target="_blank">6315</a></dd>-->
        <!--</dl>-->
      <!--</div>-->
      <div class="dataItem">
        <div class="itemTit">数据汇聚：</div>
        <dl>
          <dt>部门</dt>
          <dd><router-link to="/aggregationDataList" class="moreBtn">{{countObject.deptNum}}</router-link></dd>
        </dl>
        <dl>
          <dt>目录</dt>
          <dd><router-link to="/aggregationDataList" class="moreBtn">{{countObject.itemNum}}</router-link></dd>
        </dl>
        <dl>
          <dt>数据项</dt>
          <dd><router-link to="/aggregationDataList" class="moreBtn">{{countObject.recordNum}}</router-link></dd>
        </dl>
      </div>
      <div class="dataItem">
        <div class="itemTit">数据共享：</div>
        <dl>
          <dt>部门</dt>
          <dd><router-link to="/shareDataList" class="moreBtn">{{countObject.shareDeptNum}}</router-link></dd>
        </dl>
        <dl>
          <dt>目录</dt>
          <dd><router-link to="/shareDataList" class="moreBtn">{{countObject.shareItemNum}}</router-link></dd>
        </dl>
        <dl>
          <dt>数据项</dt>
          <dd><router-link to="/shareDataList" class="moreBtn">{{countObject.shareRecordNum}}</router-link></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '@/common/api'

  export default {
    data () {
      return {
        countObject: {
          deptNum: 0,
          itemNum: 0,
          recordNum: 0,
          shareDeptNum: 0,
          shareItemNum: 0,
          shareRecordNum: 0
        },
        latestMsg: '政务信息资源共享平台已上线，请各部门试用！',
        msgObj: {},
        banner: {
          autoplaySpeed: 3000,
          list: [{
            bannerUrl: 'http://www.citysdk.cn/',
            bigBannerPic: 'http://news.citysdk.cn/uploads/8/image/public/201709/20170901092502_c9gfiqxbqb.png'
          },
          {
            bannerUrl: 'http://www.citysdk.cn/',
            bigBannerPic: 'http://news.citysdk.cn/uploads/8/image/public/201709/20170901092516_552vi70aw5.png'
          }]
        },
        barStyle: {},
        showBox: false
      }
    },
    computed: {},
    created () {
      this.getAnnouncement()
      // this.getReduceIndexOverview()
      this.getLatestMsg()
      this.getBannerInfo()
      this.getStatisticsData()
    },
    methods: {
      getReduceIndexOverview () {
        API.Reduce.getReduceIndexOverview().then((res) => {
          this.countObject = res.result
        })
      },
      getLatestMsg () {
        // TODO
      },
      getBannerInfo () {
        API.Cms.getBannerInfo().then((res) => {
          this.banner.list = res
        })
      },
      getStatisticsData () {
        API.Statistics.getDataStatistics().then((res) => {
          this.countObject = res.result
        })
        API.Cms.getBannerInfo().then((res) => {
          this.banner.list = res
        })
      },
      getAnnouncement () {
        let _this = this
        API.Message.getAnnouncement().then((res) => {
          if (res.result.length > 0) {
            _this.msgObj = res.result[0]
            let msg = res.result[0].msgContent
            if (msg.length >= 20) {
              this.latestMsg = msg.substring(0, 19) + '...'
            } else {
              this.latestMsg = msg
            }
          }
        })
      },
      altMessage () {
        this.showBox = true
        this.layerIndex = layer.open(
          {
            type: 1,
            title: this.msgObj.msgTitle,
            shadeClose: true,
            content: $('#msgBox'),
            end: () => {
              this.showBox = false
            }
          }
        )
      }
    }
  }
</script>

<style>
  .statistics {
    height: 50px;
    background: #f5f5f5;
  }

  .statistics .inner {
    width: 1190px;
    margin: 0 auto;
    font-size: 0;
    color: #333;
    text-align: center;
  }

  .statistics .dataItem {
    display: inline;
    margin-left: 25px;
    line-height: 50px;
    vertical-align: middle;
  }

  .statistics .dataItem:first-child {
    margin-left: 0;
  }

  .statistics .itemTit {
    display: inline;
    font-size: 16px;
    font-weight: bold;
    vertical-align: middle;
  }

  .statistics .dataItem dl {
    display: inline;
    margin-right: 15px;
  }

  .statistics .dataItem dt {
    display: inline;
    font-size: 16px;
    vertical-align: middle;
  }

  .statistics .dataItem dd {
    display: inline;
    margin-left: 5px;
    font-size: 20px;
    font-weight: bold;
    color: #1885e1;
    vertical-align: middle;
  }
  .statistics .dataItem dd a{
    color: #15a6fc;
  }
</style>
