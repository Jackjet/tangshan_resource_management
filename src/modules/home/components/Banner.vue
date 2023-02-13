<template>
  <div>
    <div class="block">
      <el-carousel :interval="banner.autoplaySpeed" height="366px">
        <el-carousel-item v-for="item in banner.list" :key="item.bannerId" class="itemCenter">
          <a :href="item.bannerUrl">
            <img :src="item.bigBannerPic">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class='banner'>
      <!--<img class='banner-bg' src='../images/banner1.png' />-->
      <div class='notice-bg'></div>
      <div class='notice wrapper'>
        <span class='title'>已共享：</span>
        <span>文件 {{countObject.shareNumData}}；接口 {{countObject.shareNumApi}}；云服务 {{countObject.shareNumApp}}；共享部门 {{countObject.deptNum}}</span>
        <span class='title second'>最新上线：</span>
        <span>文件 {{countObject.latestNumData}}；接口 {{countObject.latestNumApi}}；云服务 {{countObject.latestNumApp}}</span>
        <div class='tip'>
          <span @click="altMessage">{{latestMsg}}</span>
        </div>
      </div>
    </div>
    <div v-show="showBox" id="msgBox">
      <div style="margin: 20px 20px">{{msgObj.msgContent}}</div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  export default {
    data () {
      return {
        countObject: {
          'shareNumApp': 0,
          'latestNumApp': 0,
          'shareNumData': 0,
          'deptNum': 0,
          'shareNumApi': 0,
          'latestNumApi': 0,
          'latestNumData': 0
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
    computed: {
    },
    created () {
      this.getAnnouncement()
      this.getReduceIndexOverview()
      this.getLatestMsg()
      this.getBannerInfo()
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
<style lang='less'>
  .itemCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner {
    height: 55px;
    max-width: 1349px;
    margin: 0 auto;
    position: relative;
    .banner-bg {
      max-width: 1349px;
      height: 55px;
    }
    .notice-bg {
      width: 100%;
      height: 53px;
      background: #000;
      opacity: .3;
      border: 1px solid #fff;
      position: absolute;
      bottom: 0;
      z-index: 1;
    }
    .notice {
      position: absolute;
      bottom: 0;
      z-index: 2;
      height: 53px;
      line-height: 53px;
      bottom: 0;
      left: 0;
      right: 0;
      color: #fff;
      .title {
        font-size: 16px;
        &.second {
          margin-left: 35px;
        }
      }
      .tip {
        float: right;
        background: url(../images/notice-icon.png) left center no-repeat;
        padding-left: 45px;
        span {
          padding: 8px;
          background: #2d4daf;
        }
      }
    }
  }
</style>
