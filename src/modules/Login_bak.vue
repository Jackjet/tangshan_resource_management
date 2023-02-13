<template>
  <div class="login">
    <div class="content">
      <div class="left">
        <div>WELCOME</div>
        <div class="second">TO LOGIN!</div>
      </div>
      <div class="right">
        <div class="title">
          政务信息资源共享平台
        </div>
        <form class="form">
          <div class="form-item">
            <div :class="[{ 'error': $v.form.loginName.$error }, 'form-item-content']">
              <input type="text" class="login-name" name="loginName" placeholder="请输入用户名" v-model.trim="form.loginName" @input="$v.form.loginName.$touch()" />
              <div class="error-message" v-if="!$v.form.loginName.required">请输入用户名</div>
              <div class="error-message" v-if="!$v.form.loginName.maxLength">用户名不超过20个字符</div>
            </div>
          </div>
          <div class="form-item">
            <div :class="[{ 'error': $v.form.password.$error }, 'form-item-content']">
              <input type="password" class="password" name="password" v-model.trim="form.password" @input="$v.form.password.$touch()" placeholder="请输入密码" />
              <div class="error-message" v-if="!$v.form.password.required">请输入密码</div>
              <div class="error-message" v-if="!$v.form.password.minLength">密码至少6个字符</div>
              <div class="error-message" v-if="!$v.form.password.maxLength">密码不超过20个字符</div>
            </div>
          </div>
          <div class="form-item">
            <div :class="[{ 'error': $v.form.captcha.$error }, 'form-item-content']">
              <input type="text" class="captcha" name="captcha" @keyup.enter="submit" v-model.trim="form.captcha" @input="$v.form.captcha.$touch()" placeholder="请输入验证码" />
              <div class="error-message" v-if="!$v.form.captcha.required">请输入验证码</div>
              <div class="error-message" v-if="!$v.form.captcha.minLength">验证码为四位</div>
              <div class="error-message" v-if="!$v.form.captcha.maxLength">验证码为四位</div>
            </div>
            <img :src="captchaSrc" @click="refreshCaptcha" class="captcha-img" alt="验证码">
          </div>
        </form>
        <el-button type="success"  size="mini" :class="[{ 'disabled': $v.form.$invalid }, 'btn-login']" @click="submit">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'
  import 'assets/less/common.less'
  export default {
    data () {
      return {
        form: {
          loginName: '',
          password: '',
          captcha: ''
        },
        captchaSrc: '/login/captcha.do?t=' + new Date().getTime()
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
    methods: {
      submit () {
        if (!this.$v.form.$invalid) {
          API.Common.login(this.form).then((res) => {
            if (res.status === 'OK') {
              this.redirectToIndex()
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
          this.$router.push('/')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .login {
    width: 100%;
    height: 100%;
    min-height: 550px;
    background: url(../assets/images/login-bg.png) no-repeat;
    overflow: hidden;
    background-size: 100% 100%;
    position: absolute;
    .content {
      width: 730px;
      height: 400px;
      margin: 0 auto;
      position: relative;
      top: 50%;
      margin-top: -200px;
      background: #fff url(../assets/images/login-content-bg.png) left 0 no-repeat;
      .left {
        width: 410px;
        float: left;
        padding: 70px 35px;
        div {
          color: #fff;
          font-size: 48px;
          &.second {
            margin-left: 60px;
          }
        }
      }
      .right {
        width: 320px;
        float: right;
        padding: 60px 30px;
        text-align: center;
        .title {
          font-size: 22px;
          color: @linkColor;
          font-family: '方正姚体';
          font-weight: 600;
        }
        .form {
          padding: 0;
          margin-top: 60px;
          .error-message {
            left: 0;
          }
          .form-item-content {
            margin-left: 0;
            input {
              width: 100%;
              border: 1px solid #ccc;
              padding-left: 30px;
              &:hover {
                border-color: #aaa;
              }
              &.login-name {
                background: url(../assets/images/icon-user.png) 5px center no-repeat;
              }
              &.password {
                background: url(../assets/images/icon-password.png) 6px center no-repeat;
              }
            }
            .captcha {
              width: 175px;
              float: left;
            }
          }
        }
        .btn-login {
          margin-top: 20px;
          width: 100%;
          background: @linkColor;
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-size: 16px;
          border: 0;
          padding: 0;
          outline: none;
          cursor: pointer;
          transition: all .3s;
          &:hover {
            background: @linkColorHover;
          }
          &.disabled {
            background: #aaa;
            cursor: default;
          }
        }
      }
    }
  }
</style>
