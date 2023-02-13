<template>
  <div class="fragment">
    <div class="title">热点资讯</div>
    <div class="news-content">
      <div class="shadow"></div>
      <div class="box">
        <div class="news-tabs">
          <div class="tab-active-bar" :style="tabStyle"></div>
          <span @click="toggleTab(0)" :class="{ active: activeTabIndex == 0 }">政策解读</span>
          <span @click="toggleTab(1)" :class="{ active: activeTabIndex == 1 }">通知公告</span>
        </div>
       <!-- <ul class="news-list">
          <li v-for="policy in policyList">
            <a href="#">{{policy.title}}</a>
          </li>
        </ul>-->

        <div v-show="activeTabIndex == 0">
          <ul class="news-list">
            <li v-for="policy in policyList" :key="policy.id">
              <a :href="policy.url" class="fl" target="_blank">
                {{policy.title.length>18?(policy.title.substr(0,18)+'...'):policy.title}}
              </a>
            </li>
          </ul>
        </div>
        <div v-show="activeTabIndex == 1">
          <ul class="news-list">
            <li v-for="policy in noticeList" :key="policy.id">
              <a :href="policy.url" class="fl" target="_blank">
                {{policy.title.length>18?(policy.title.substr(0,18)+'...'):policy.title}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import API from '@/common/api'
  export default {
    data () {
      return {
        activeTabIndex: 0,
        policyList: [],
        noticeList: []
      }
    },
    computed: {
      tabStyle: {
        cache: false,
        get () {
          let style = {}
          let offset = 0
          let tabWidth = 87

          offset = tabWidth * this.activeTabIndex

          const transform = 'translateX(' + offset + 'px)'
          style.width = tabWidth + 'px'
          style.transform = transform
          style.msTransform = transform
          style.webkitTransform = transform

          return style
        }
      }
    },
    created () {
      this.getPolicyReading()
      this.getNoticePublic()
    },
    methods: {
      toggleTab (index) {
        this.activeTabIndex = index
      },
      getPolicyReading () {
        API.Cms.getPolicyReading().then((res) => {
          this.policyList = res
        })
      },
      getNoticePublic () {
        API.Cms.getNoticePublic().then((res) => {
          this.noticeList = res
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .fragment {
    padding: 30px 0;
    height: 500px;
    background: #fff url(../images/news-bg.png) center center no-repeat;
    position: relative;
    .news-content {
      position: absolute;
      width: 350px;
      height: 360px;
      top: 120px;
      left: 50%;
      margin-left: 250px;
      box-shadow: 0 2px 10px rgba(0,0,0,.3);
      .shadow {
        background: #36a9ff;
        width: 100%;
        height: 100%;
        opacity: .9;
        position: absolute;
      }
      .box {
        width: 100%;
        height: 100%;
        padding: 45px 30px;
        position: absolute;
        color: #fff;
        .news-tabs {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #fff;
          position: relative;
          span {
            height: 20px;
            line-height: 20px;
            display: inline-block;
            padding: 0 15px 0 5px;
            margin: 10px 0;
            border-right: 1px solid #fff;
            cursor: pointer;
            &:last-child {
              border-right: 0;
              padding-left: 10px;
            }
          }
          .active {
            font-size: 18px;
          }
          .tab-active-bar {
            position: absolute;
            bottom: -1px;
            left: 0;
            height: 3px;
            background-color: #ff9320;
            z-index: 1;
            transition: transform .3s cubic-bezier(.645,.045,.355,1);
          }
        }
        .news-list {
          list-style: none;
          margin: 0;
          padding: 0;
          margin-top: 20px;
          li {
            height: 40px;
            line-height: 40px;
            a {
              color: #fff;
              &:hover {
                text-decoration: underline;
              }
            }

          }
        }
      }
    }
  }
</style>
