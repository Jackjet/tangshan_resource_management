<template>
  <div>
    <el-row class="header_area">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <div>
          <Headers @getUser="getUser"></Headers>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>

    <!--<transition name="fade" mode="out-in">-->
    <el-row class="main_area">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <div>
          <router-view class="content" :user="user" />
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>

    <!--</transition>-->

    <el-row class="footer_background">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <div>
          <Footers></Footers>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>

    <!--<el-popover
      ref="popover1"
      placement="left"
      width="40"
      height="40"
      trigger="hover">
      <img width="120" height="120" src="../assets/images/qrcode.jpg"/>
      <div style="width: 80px;margin: 0 auto;"> 微信扫一扫</div>
    </el-popover>-->
    <div class="slide">
      <!--
      <a class="theme1 first" @click="switchCity" href="#" title="不同域名切换城市">
      </a>
      <a class="theme1 first" @click="switchCity1" href="#" title="同一域名切换城市">
      </a>-->
      <!--<a class="theme1 first" @click="scrollTop" href="#" title="返回顶部"></a>-->
      <img style="cursor: pointer" src="../assets/images/icons/float_button.svg" alt="返回顶部" title="返回顶部" href="#" @click="scrollTop">
      <!--
      <a class="theme1 second"></a>
      <a class="theme1 third"></a>
      -->
      <!--<el-button class="theme1 fourth" v-popover:popover1></el-button>
      <a class="theme1 five"  @click="aboutUs" href="#" title="关于我们"></a>-->
    </div>
  </div>
</template>

<script>
import Headers from '@/components/header/Header'
import Footers from '@/components/footer/Footer'
import constantValues from '@/common/utils/constant'
import cityStation from '@/common/json/cityStation'
import API from '@/common/api'

export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    // 这个神奇的接口会返回`code: 500800`，然后根据`http.js`中`axios.interceptors`的逻辑，会让页面跳转到登录页...
    API.App.getHotAppList()
  },
  methods: {
    getUser(user) {
      this.user = user
    },
    scrollTop() {
      if (document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop = 0
      }
      if (document.body.scrollTop !== 0) {
        document.body.scrollTop = 0
      }
    },
    aboutUs() {
      this.$router.push({ 'name': 'aboutus' })
    },
    switchCity() {
      location.href = 'http://share-portal2.hanlnk.com:82/'
    },
    switchCity1() {
      let _this = this
      _this.checkChangeAreaCode('123456')
      API.Common.switchCity({
        'areaCode': '123456',
        'callback': function () {
          // _this.$router.go(0)
          window.location.reload()
        }
      })
    },
    checkChangeAreaCode(newAreaCode) {
      if (newAreaCode && newAreaCode.toString() !== constantValues.areaCode.toString()) {
        constantValues.areaCode = newAreaCode.toString()
        let currentCity = cityStation.cities.filter(function (item) {
          return item.code === newAreaCode.toString()
        })
        constantValues.cityAbbr = currentCity[0].abbr
        // cityStation.test = 'qqqq'
        // alert('constantValues.cityAbbr:' + constantValues.cityAbbr + 'currentCity[0].abbr:' + currentCity[0].abbr)
        // console.log('constantValues.areaCode:' + constantValues.areaCode)
        // console.log('constantValues.cityAbbr:' + constantValues.cityAbbr)
        window.sessionStorage.setItem('areaCode', newAreaCode.toString())
        window.sessionStorage.setItem('cityAbbr', currentCity[0].abbr)
      }
    }
  },
  components: {
    Headers,
    Footers
  }
}
</script>

<style type="less">
.main_layout {
  min-height: 20px;
}
.slide {
  position: fixed;
  right: 50px;
  bottom: 0;
  z-index: 100;
  width: 40px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
}
.theme1 {
  width: 100%;
  display: inline-block;
  height: 40px;
  border: 1px solid #dadee7;
  background: url("../assets/images/data_image.png") no-repeat;
  cursor: pointer;
  margin-bottom: 10px;
}
.theme1:hover {
  border: 2px solid #5cb981;
}
.first {
  background-position: 0px 0px;
}
.second {
  background-position: 0px -42px;
}
.third {
  background-position: 0px -82px;
}
.fourth {
  background-position: 0px -124px;
}
.five {
  background-position: 0px -168px;
}
.footer_background {
  background-image: url("../assets/images/icons/footer_background.png");
  background-repeat: no-repeat;
  background-size: 100% 309px;
  -moz-background-size: 100% 434px;
  background-color: #fafaf9;
}
.main_area {
  /* background-color: #fafaf9; */
}
</style>
