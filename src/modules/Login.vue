<template>
  <div class="newLogin">
    <img src="../assets/images/icons/login_bg.png" style="width: 100%; height: 100%">
    <div class="loginMain">
      <div class="loginInner">
        <div class="loginBox">
          <div class="loginTitle">
            <img src="../assets/images/icons/logo.svg" alt="">
          </div>
          <form class="form">
            <div class="loginItem">
              <div :class="[{ 'error': $v.form.loginName.$error }, 'form-item-content']">
                <div class="userContent"><input type="text" class="userName" value="" name="loginName"
                                                placeholder="请输入用户名" v-model.trim="form.loginName"
                                                @input="$v.form.loginName.$touch()"/></div>
                <div class="error-message" v-if="!$v.form.loginName.required"></div>
                <div class="error-message" v-if="!$v.form.loginName.maxLength">用户名不超过20个字符</div>
                <div class="warn_error" v-show="isNullName">请输入用户名</div>
              </div>
            </div>
            <div class="loginItem">
              <div :class="[{ 'error': $v.form.password.$error }, 'form-item-content']">
                <div class="pswdContent"><input type="password" class="userPawd" value="" name="password"
                                                placeholder="请输入密码" v-model.trim="form.password"
                                                @input="$v.form.password.$touch()"/></div>
                <div class="error-message" v-if="!$v.form.password.required"></div>
                <div class="error-message" v-if="!$v.form.password.minLength">密码至少6个字符</div>
                <div class="error-message" v-if="!$v.form.password.maxLength">密码不超过20个字符</div>
                <div class="warn_error" v-show="isNullPassword">请输入密码</div>
              </div>
            </div>
            <div class="loginItem">

              <div :class="[{ 'error': $v.form.captcha.$error }, 'form-item-content']">
                <div class="codeContent"><input type="text" class="userCode" value="" name="captcha"
                                                @keyup.enter="submit" v-model.trim="form.captcha"
                                                @input="$v.form.captcha.$touch()" placeholder="请输入验证码"/></div>
                <div class="error-message" v-if="!$v.form.captcha.required"></div>
                <div class="error-message" v-if="!$v.form.captcha.minLength">验证码为四位</div>
                <div class="error-message" v-if="!$v.form.captcha.maxLength">验证码为四位</div>
              </div>
              <img :src="captchaSrc" @click="refreshCaptcha" class="captcha-img" alt="验证码">
              <div class="warn_error" v-show="isNullAuthCode" style="margin-top: 50px;">请输入验证码</div>
            </div>
          </form>
          <el-button type="success"  size="mini" :class="[{ 'disabled': $v.form.$invalid }, 'btn-login']" @click="submit" class="loginSubmit">登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'
  import 'assets/less/common.less'
  import asc from '@/modules/asc'
  import {Base64} from 'js-base64'
  export default {
    data () {
      return {
        nowTime: '',
        form: {
          loginName: '',
          password: '',
          captcha: ''
        },
        captchaSrc: '/login/captcha.do?t=' + new Date().getTime(),
        isNullName:false,
        isNullPassword:false,
        isNullAuthCode:false
      }
    },
    computed: {
      loginName() {
        return this.form.loginName
      },
      password(){
        return this.form.password
      },
      captcha(){
        return this.form.captcha
      }
    },
    validations: {
      form: {
        loginName: {
          required,
          maxLength: maxLength(20)
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(20)
        },
        captcha: {
          required: required,
          minLength: minLength(4),
          maxLength: maxLength(4)
        }
      }
    },
    beforeMount () {
//      this.getNowTime()
    },
    watch:{
      loginName:{
        handler(){
          if(this.form.loginName){
            this.isNullName = false
          }else{
            this.isNullName = true
          }
        },
        deep:true
      },
      password:{
        handler () {
          if(this.form.password){
            this.isNullPassword = false
          }else{
            this.isNullPassword = true
          }
        },
        deep: true
      },
      captcha:{
        handler () {
          if(this.form.captcha){
            this.isNullAuthCode = false
          }else{
            this.isNullAuthCode = true
          }
        },
        deep:true
      }
    },
    methods: {
      submit () {
        if (!this.$v.form.$invalid) {
          let old=this.form.password;
          //前端进行加密编码
          this.form.password = Base64.encode(this.form.password);
          this.form.password = asc.encrypt(this.form.password);
          API.Common.login(this.form).then((res) => {
            if (res.status === 'OK') {
              this.redirectToIndex()
            }else if(res.status === 'ERROR'){
              this.form.password=old;
                this.$message.error(res.message);
                 this.refreshCaptcha()
            }
          }).catch(() => {
            this.refreshCaptcha()
          })
        }
      },
      refreshCaptcha () {
        this.captchaSrc = '/login/captcha.do?t=' + new Date().getTime()
      },
      redirectToIndex () {
        var nHref = location.search.replace('?service=', '')
        if (nHref) {
          location.href = decodeURIComponent(nHref)
        } else {
          this.$router.push('/home')
        }
      },
      getNowTime () {
        var _this = this
        setInterval(getNowTime2, 1000)
        function getNowTime2 () {
          console.log('this is nowTime', new Date().toLocaleString())
          _this.nowTime = new Date().toLocaleString()
        }
      }
    }
  }
</script>
<style scoped>
  @import '~@/assets/less/variables.less';

  .newLogin {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 660px;
    overflow: hidden;
  }

  .newLogin form {
    padding: 0 !important;
  }

  .loginLogo {
    width: 1100px;
    margin: 15px auto 0;
    height: 80px;
    line-height: 80px;
    font-size: 12px;
    overflow: hidden;
  }

  .loginLogo img {
    vertical-align: middle;
  }

  .nowTime {
    float: right;
    height: 60px;
    line-height: 60px;
    margin-top: 20px;
    font-size: 14px;
    color: #1f65a5;
  }

  .loginMain {
    width: 100%;
    background: url(../assets/images/icons/login_bg.png);
    background-size: cover;
    background-position: center center;
    overflow: hidden;
  }

  .loginInner {
    width: 1100px;
    margin: 0 auto;
    overflow: hidden;
  }

  .loginBox {
    float: left;
    width: 364px;
    height: 411px;
    margin: 50px 10px 20px 0;
    padding: 30px;
    background: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(21, 166, 252, .2);
    overflow: hidden;
    border-radius: 4px;
    position: absolute;
    top: 44%;
    left: 29%;
    margin-top: -200px;
    margin-left: -150px;
    padding-top: 48px;
  }

  .loginBox .loginTitle {
    width: 100%;
    height: 44px;
    line-height: 44px;
    margin: 10px 0;
    font-size: 24px;
    color: #333333;
    text-align: center;
    overflow: hidden;
  }

  .loginItem {
    position: relative;
    width: 100%;
    padding-bottom: 25px;
    overflow: hidden;
  }

  .userContent {
    width: 100%;
    height: 40px;
    padding: 10px 10px 10px 40px;
    font-size: 14px;
    border: 1px solid #E5E5E5;
    background: url(../assets/images/user.png) no-repeat 10px center;
    background-size: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .userContent:hover {
    border: 1px solid #15a6fc;
  }

  .userContent .userName {
    width: 100%;
    padding: 0 10px !important;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    border-left: 1px solid #E5E5E5;
    border-top: none;
    border-right: none;
    border-bottom: none;
    box-sizing: border-box;
    background: none;
    overflow: hidden;
  }

  .pswdContent {
    width: 100%;
    height: 40px;
    padding: 10px 10px 10px 40px;
    font-size: 14px;
    border: 1px solid #E5E5E5;
    background: url(../assets/images/password.png) no-repeat 10px center;
    background-size: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .pswdContent:hover {
    border: 1px solid #15a6fc;
  }

  .pswdContent .userPawd {
    width: 100%;
    padding: 0 10px !important;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    border-left: 1px solid #E5E5E5;
    border-top: none;
    border-right: none;
    border-bottom: none;
    box-sizing: border-box;
    background: none;
    overflow: hidden;
  }

  .codeContent {
    width: 185px;
    float: left;
    height: 40px;
    padding: 10px 10px 10px 40px;
    font-size: 14px;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;
    background: url(../assets/images/code.png) no-repeat 10px center;
    background-size: 20px;
    overflow: hidden;
  }

  .codeContent .userCode {
    width: 100%;
    height: 20px;
    line-height: 20px;
    padding: 0 10px !important;
    font-size: 14px;
    color: #333333;
    box-sizing: border-box;
    border-left: 1px solid #E5E5E5;
    border-top: none;
    border-right: none;
    border-bottom: none;
    box-sizing: border-box;
    background: none;
    overflow: hidden;
  }

  .captcha-img {
    float: right;
    height: 35px;
  }

  .loginSubmit {
    width:86px;
    height:36px;
    background:rgba(0,170,113,1);
    border-radius:2px;
  }


  .loginSubmit:hover, .loginSubmit:active, .loginSubmit:visited {
    border: none !important;
    outline: none;
  }

  .loginFooter {
    width: 100%;
    padding: 20px 0;
    overflow: hidden;
  }

  .loginFooter .copyright {
    width: 100%;
    line-height: 16px;
    font-size: 14px;
    color: #5b7389;
    text-align: center;
    overflow: hidden;
  }

  .loginFooter .copyright p {
    margin-top: 8px;
  }

  .error-message {
    left: 0;
    position: absolute;
    bottom: 5px;
    color: #e1504a;
  }
  .warn_error{
    color: #e1504a;
  }
</style>
