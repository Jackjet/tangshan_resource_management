<template>
  <div class="wrapper">
    <div class="user-content-left">
      <div class="user-avatar">
        <img src="./images/avatar.png" />
        <p class="user-name">
          <router-link :to="{name: 'userIndex'}">{{user.account}}</router-link>
        </p>
        <p class="depart_name">{{user.deptName=='null'?'':user.deptName}}</p>
      </div>
      <!-- <div class="login-time">上次登录: 2017-12-11 10:22:23</div> -->
      <div class="user-menu">
        <ul>
          <li style="height: 30px;line-height: 30px;width: 90%;display: inline-block;font-size: 18px;position: relative;font-weight: 400;color: #666666;font-weight: bolder;">个人信息</li>
          <li :class="{active: isInfoActive}">
            <router-link :to="{name: 'userBasic'}">&emsp;&emsp;&emsp;&emsp;基本信息</router-link>
          </li>
          <!--<li :class="{active: isDemandActive}">
            <router-link :to="{name: 'userDemand'}">我的需求</router-link>
          </li>-->
          <li :class="{active: isCataActive}">
            <router-link :to="{name: 'userCata'}">&emsp;&emsp;&emsp;&emsp;关注的目录</router-link>
          </li>
          <li :class="{active: isObjectionActive}">
            <router-link :to="{name: 'userObjection'}">&emsp;&emsp;&emsp;&emsp;异议管理</router-link>
          </li>
          <li style="height: 30px;line-height: 30px;width: 90%;display: inline-block;font-size: 18px;position: relative;font-weight: 400;color: #666666;font-weight: bolder;">数据申请</li>
          <li :class="{active: isDataActive}">
            <router-link :to="{name: 'userDataApply'}">&emsp;&emsp;&emsp;&emsp;文件</router-link>
          </li>
          <li :class="{active: isApiActive}">
            <router-link :to="{name: 'userApiApply'}">&emsp;&emsp;&emsp;&emsp;接口</router-link>
          </li>
          <!--<li :class="{active: isServiceActive}">
            <router-link :to="{name: 'userServiceApply'}">我的云服务</router-link>
          </li>-->
          <li style="height: 30px;line-height: 30px;width: 90%;display: inline-block;font-size: 18px;position: relative;font-weight: 400;color: #666666;font-weight: bolder;">受理审核</li>
          <li :class="{active: isCheckDataActive}">
            <router-link :to="{name: 'checkDataApply'}">&emsp;&emsp;&emsp;&emsp;文件</router-link>
          </li>
          <li :class="{active: isCheckApiActive}">
            <router-link :to="{name: 'checkApiApply'}">&emsp;&emsp;&emsp;&emsp;接口</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-content-right">
      <router-view :user="user"></router-view>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api/index'
  export default {
    data () {
      return {
        routeName: '',
        user: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      API.Common.getLoginInfo().then((res) => {
        if (res.result) {
          next(vm => {
            vm.routeName = to.name
            vm.user = res.result
          })
        } else {
          // next(vm => {
          //   vm.$router.replace({name: 'login', query: { service: window.location.href }})
          // })
          location.href = '/login?service=' + encodeURIComponent(window.location.href)
        }
      })
    },
    watch: {
      $route (to, from) {
        this.routeName = to.name
      }
    },
    computed: {
      isInfoActive () {
        return ['userBasic', 'userPassword'].indexOf(this.routeName) > -1
      },
      isDataActive () {
        return ['userDataApply', 'userDataFollow', 'userDataApproving'].indexOf(this.routeName) > -1
      },
      isApiActive () {
        return ['userApiApply', 'userApiFollow', 'userApiApproving'].indexOf(this.routeName) > -1
      },
      isCheckDataActive () {
        return ['checkDataApply'].indexOf(this.routeName) > -1
      },
      isCheckApiActive () {
        return ['checkApiApply'].indexOf(this.routeName) > -1
      },
      isServiceActive () {
        return ['userServiceApply', 'userServiceFollow', 'userServiceApproving'].indexOf(this.routeName) > -1
      },
      isDemandActive () {
        return ['userDemand'].indexOf(this.routeName) > -1
      },
      isObjectionActive(){
        return ['userObjection'].indexOf(this.routeName) > -1
      },
      isCataActive(){
        return ['userCata'].indexOf(this.routeName) > -1
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/common.less';
  @import '~@/assets/less/variables.less';
  .wrapper {
    /*width: 1190px;*/
    margin-top: 35px;
    overflow: hidden;
    .user-content-left {
      width: 20%;
      float: left;
      .user-avatar {
        height: 171px;
        border: 1px solid #ccc;
        // border-bottom: 0;
        padding-top: 28px;
        text-align: center;
        background: #fff;
        // background: #fff url(../../assets/images/icons/logo_bg.svg) bottom center no-repeat;
        .user-name {
          margin-top: 13px;
          a {
            font-size:16px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            // color:rgba(255,255,255,1);
            line-height:11px;
            &:hover {
              // color:rgba(255,255,255,1);
            }
          }
        }
        .depart_name{
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          // color:rgba(255,255,255,1);
          line-height:10px;
          margin-top:10px;
        }
        img{
          width:63px;
          height:63px;
        }
      }
      .login-time {
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: center;
        bottom: 0;
        width: 100%;
        font-size: 12px;
        border: 1px solid #ccc;
        border-top: 0;
        background: @linkColor;
      }
      .user-menu {
        height: 465px;
        background: #fff;
        padding-top: 28px;
        li {
          list-style-type:none;
          text-align: center;
          width: 80%;
          height: 30px;
          background: rgba(255,255,255,1);
          border-radius: 1px;
          margin-left: 10%;
          margin-bottom:9px;
          a {
            color: #000;
            height: 30px;
            line-height: 30px;
            width: 90%;
            display: inline-block;
            font-size: 16px;
            position: relative;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102,102,102,1);
            &:before {
              width: 4px;
              height: 4px;
              background: @textlightColor;
              border-radius: 50%;
              top: 50%;
              margin-top: -3px;
              left: 5px;
              position: absolute;
              content: ' ';
            }
          }
          &:last-child {
            a {
              border-bottom: 0;
            }
          }
          &:hover,
          &.active {
            width: 80%;
            height: 30px;
            background: rgba(255,255,255,1);
            border-radius: 1px;
            border: 1px solid rgba(225,225,225,1);
            margin-left: 10%;
            a {
              font-size:16px;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(0,170,113,1);

            }
          }
        }
      }
    }
    .user-content-right {
      width: 78%;
      float: right;
    }
  }
</style>
