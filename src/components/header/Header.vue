<template>
  <!--HEADER-->
  <div id="header">
    <!--TOP-->
    <div class="topNav">
      <div class="topNavCont clearfix">
        <div class="topNavR">
          <!-- <img class="header_image" src="../../assets/images/icons/home_logo.svg" alt="" @click="logoClick"> -->
          <div class="logo_bak"></div>
          <p class="heade_logo">资 源 管 理 中 心</p>
          <ul class="nav">
            <router-link tag="li" :to="{ name: 'home' }">
              <a href="">首页</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'dataHall' }">
              <a href="">办事窗口</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'resCatalog' }">
              <a href="">资源目录</a>
            </router-link>
            <!-- <router-link tag="li" :to="{ name: 'data' }">
              <a href="">云数据</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'api' }">
              <a href="">云接口</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'service' }">
              <a href="">云服务</a>
            </router-link> -->
            <!--<router-link tag="li" :to="{ name: 'demandCreate' }" >
              <a href="">部门需求</a>
            </router-link>-->
            <router-link tag="li" :to="{ name: 'shareInfo' }">
              <a href="">统计分析</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'policy' }">
              <a href="">政策资讯</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'docDownload' }">
              <a href="">资料下载</a>
            </router-link>

            <router-link tag="li" :to="{name: 'userIndex'}">
              <a href="">资源管理</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'screen' }">
              <a href="">返回数据大厅 <i class="el-icon-refresh-left"></i></a>
            </router-link>
            <router-link tag="li" :to="{name: 'login'}" style="float: right;margin-right: 15px;">
              <a href="javascript:;" class="" @click="logout">退出</a>
            </router-link>
            <div tag="li" style="float: right;">
              <a href="javascript:void(0);">{{user.name}}</a>
            </div>
            <!--  <li class="inputSearch">
               <div class="headSearch" id="showGlobalSearch" style="height: 35px" @keyup.enter="keySearch">
                 <el-input
                   id="globalSearch"
                   placeholder="请输入关键字"
                   v-model="keyword"
                   v-model.trim="keyword">
                 </el-input>
                 <span class="searchBtn" style="height: 27px;" v-on:click="handleSelect"></span>
               </div>
              &lt;!&ndash; <div class="goSearchDiv">
                 <span  id="goSearch" @click="goGlobalSearch"></span>
               </div>&ndash;&gt;
             </li>-->

            <!--已登录时，显示-->
            <!--<li class="tn_welcomeInfo">
              &lt;!&ndash;<router-link :to="{name: 'userIndex'}" class="tn_userNick">{{user.name}}</router-link>&ndash;&gt;
              &lt;!&ndash;<img class="header_user_icon" src="" alt="">&ndash;&gt;
              <div @mouseover="userTab=true" @mouseout="userTab=false" class="header_user" style="height:100px">

                <div href="javascript:;" class="tn_userNick"><router-link :to="{name: 'userIndex'}">

                {{user.name}}</router-link></div>
                <div v-show="userTab" class="user_cont">
                  <div>
                    <router-link :to="{name: 'userIndex'}">系统设置</router-link>
                  </div>
                  &lt;!&ndash; <div><a href="javascript:;" target="_blank" @click="getDefaultBackEndUrl">管理后台</a></div> &ndash;&gt;
                  <div><a href="javascript:;" class="tn_logout" @click="logout">退出</a></div>
                </div>
              </div>

            </li>-->
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="headerCont clearfix">

        <!--NAV-->

        <!--headSearch-->

      </div>
    </div>

    <div style="bottom: 340px;right: 15px;height: 60px;position: fixed;z-index: 100;width: 60px;">
      <div style="cursor: pointer;font-size: 15px;width: 60px;background: url(/static/images/suoping.png);
      background-size:60px 60px;color: white;
      text-align: center;height: 60px;line-height: 60px;" title="锁屏" href="#" @click="lock">
        锁屏
      </div>
    </div>
  </div>

</template>
<script>
import API from '@/common/api/index'
import './css/topCanvas.css'
import '../../assets/less/common.less'
import '../../assets/less/variables.less'
//  import ElInput from '../../../node_modules/element-ui/packages/input/src/input'

export default {
  //    components: {ElInput},
  name: 'Headers',
  data() {
    return {
      user: {},
      dropHover: false,
      keyword: '',
      userTab: '',
      count: 1,
      defaultBackEndUrl: 'http://10.15.1.26:30003/#/publishApi.do'
    }
  },
  created() {
    // 获取用户信息
    API.Common.getLoginInfo().then((res) => {
      if (res.result) {
        this.user = res.result
        this.$emit('getUser', res.result)
      }
      $('.topNav .topNavCont a').css('color', '#000000')
    })
    //      API.Common.getDefaultBackEndUrl().then((res) => {
    //        if (res.result) {
    //          this.defaultBackEndUrl = res.result
    //        }
    //      })
  },
  mounted() {
  },
  watch: {
    keyword: {
      handler() {
        if (this.keyword != '') {
          this.$router.push({ 'name': 'search', 'params': { 'keyword': this.keyword } })
        }
      }
    },
    deep: true
  },
  methods: {
    goGlobalSearch() {
      $("#goSearchDiv").hide()
      $("#goSearch").hide()
      $("#showGlobalSearch").show(500)

    },
    keySearch() {
      this.handleSelect()

    },
    lock() {
      var that = this;
      $("body").click(function () {
        if (that.count > 1) {
          $("body").unbind("click");
          that.logout()
        }
        that.count = that.count + 1;
      })
    },
    querySearch(queryString, cb) {
      this.$router.push({ 'name': 'search', 'params': { 'keyword': this.keyword } })
    },
    packing(result) {
      let array = []
      if (result != null) {
        for (let i = 0; i < result.length; i++) {
          array.push({ 'value': result[i] })
        }
      }
      return array
    },
    handleSelect() {
      this.$router.push({ 'name': 'search', 'params': { 'keyword': this.keyword } })
    },
    logout() {
      API.Common.outLoginByCurrentUser(res => { })
      API.Common.logout().then((res) => {
        window.location.href = location.protocol + '//' + location.host + '/#/login?t=' + new Date().getTime()
      })
    },
    showDropdown() {
      this.dropHover = true
    },
    hideDropdown() {
      this.dropHover = false
    },
    getDefaultBackEndUrl() {
      window.open(this.defaultBackEndUrl)
      //        window.location.href = location.protocol + '//' + location.host + '/getDefaultBackEndUrl'
    },
    logoClick() {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style>
/*topNav*/
.topNav {
  height: 55px;
  /*background: url(./images/black_opacity20.png);*/
  line-height: 55px;
  background-color: #e3e3e3ed;
  /*overflow: hidden;*/
}
.logo_bak {
  position: absolute;
  width: 55px;
  height: 55px;
  background: url("../../assets/images/icons/home_logo.svg");
  background-size: 570% 100%;
}
.heade_logo {
  /* position: absolute; */
  float: left;
  width: 250px;
  height: 55px;
  /* background-color: #e3e3e3ed; */
  margin-left: 70px;
  font-size: 28px;
  font-weight: 500;
  font-style: italic;
}
/*  .topNav .topNavCont ul {
      overflow: hidden;
    }*/

.topNav .topNavCont ul li {
  float: left;
  height: 55px;
  line-height: 55px;
}

.topNav .topNavCont a {
  display: block;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topNav .topNavCont .tn_welcomeInfo {
  /*color: #fff;*/
  z-index: 1;
  float: right;
}

.topNav .topNavCont .tn_welcomeInfo a {
  /* float: left;
    padding: 0 15px; */
}

.topNav .topNavCont .tn_welcomeInfo .header_user {
  float: left;
}
.header_user_icon {
  width: 23px;
  height: 23px;
  margin-top: 8px;
  float: left;
  margin-right: 2px;
}

.topNav .topNavCont .tn_welcomeInfo .header_user .user_cont {
  /*margin-top: 34px;*/
  color: #000000;
  width: 100%;
  padding: 5px 10px;
  line-height: 30px;
  box-sizing: border-box;
  background: #ffffff80;
  text-align: center;
}

.topNav .topNavCont .tn_welcomeInfo .header_user .user_cont a {
  color: #000000 !important;
  float: none;
  padding: 0;
}

.topNav .topNavCont .tn_welcomeInfo .tn_userNick {
  display: block;
  width: 110px;
  margin-right: 0;
  padding: 0;
  color: #15a6fc;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
}

.topNav .topNavCont .tn_welcomeInfo .tn_logout {
  background: #15a6fc;
  color: #fff;
  text-align: center;
}

/*HEAD--*/
#header {
  width: 100%;
  height: 43px;
}

.headerCont {
  /*background-color: #ddd;*/
}

.nav li {
  position: relative;
  display: inline-block;
  margin-left: 40px;
}

.nav li:first-child {
  margin-left: 0;
}

.nav li:hover {
  filter: alpha(opacity=85);
  -moz-opacity: 0.85;
  -khtml-opacity: 0.85;
  -webkit-opacity: 0.85;
  opacity: 0.85;
  -webkit-transition: all linear 0.2s;
  -moz-transition: all linear 0.2s;
  -ms-transition: all linear 0.2s;
  -o-transition: all linear 0.2s;
  transition: all linear 0.2s;
}

.nav li a {
  display: block;
  /*font-size: 18px;*/
  /*color: #fff;*/
}

.nav li.router-link-exact-active a {
  font-weight: 500;
  color: rgba(0, 170, 113, 1);
  /* line-height: 16px; */
}

.nav li:before,
.nav li:after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 50%;
  height: 3px;
  background: rgba(0, 170, 113, 1);
  -webkit-transform: scaleX(0);
  -ms-transform: scaleX(0);
  -o-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: transform 0.5s ease;
  -ms-transition: transform 0.5s ease;
  -o-transition: transform 0.5s ease;
  transition: transform 0.5s ease;
}
.inputSearch:before,
.inputSearch:after {
  background: rgba(255, 255, 255, 0) !important;
}
.tn_welcomeInfo:before,
.tn_welcomeInfo:after {
  background: rgba(255, 255, 255, 0) !important;
}

.nav li:before {
  left: 0;
  transform-origin: right;
}

.nav li:after {
  right: 0;
  transform-origin: left;
}

.nav li:hover:before,
.nav li:hover:after,
.nav li.router-link-exact-active:before,
.nav li.router-link-exact-active:after {
  -webkit-transform: scaleX(1);
  -ms-transform: scaleX(1);
  -o-transform: scaleX(1);
  transform: scaleX(1);
}

/*SEARCH*/
#header .headSearch {
  width: 105px;
  height: 23px;
  /* margin: 32px auto 0 auto; */
  background: rgba(255, 255, 255, 0.3);
  /*border: 1px solid #ddd;*/
  border-radius: 2px;
  display: inline-block;
  /*overflow: hidden;*/
  position: relative;
  top: 10px;
}

#header .headSearch input[type="text"] {
  float: left;
  width: 105px;
  height: 23px;
  line-height: 23px;
  height: 23px;
  border-radius: 2px;
  padding-left: 20px;
  font-size: 9px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

#header .headSearch input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

#header .headSearch input::-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

#header .headSearch input:-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

#header .headSearch input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

#header .headSearch .searchBtn {
  width: 11px;
  height: 11px;
  background: url(../../assets/images/icons/ico_search.svg) no-repeat center
    center;
  position: absolute;
  top: 7px;
  cursor: pointer;
  left: 5px;
  background-size: 11px 11px;
}
.goSearchDiv {
  width: 105px;
  height: 23px;
}
#goSearch {
  width: 11px;
  height: 11px;
  background: url(../../assets/images/icons/ico_search.svg) no-repeat center
    center;
  position: absolute;
  top: 17px;
  cursor: pointer;
  right: 5px;
  background-size: 11px 11px;
}

.header_image {
  float: left;
  width: 300px;
  margin-left: 12px;
  margin-right: 40px;
  /*width: 154px;
    height: 23px;*/
  top: 5px;
  position: relative;
}
</style>
