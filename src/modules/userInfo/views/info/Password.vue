<template>
  <div class="password">
    <form class="form">
      <div class="form-item">
        <label><span class="required">*</span>旧密码：</label>
        <div class="form-item-content" :class="{ 'error': $v.form.oldPassword.$error }">
          <input placeholder="请输入旧密码" type="password" v-model.trim="form.oldPassword" @input="$v.form.oldPassword.$touch()" />
          <div class="error-message fs10" v-if="!$v.form.oldPassword.required">请输入旧密码</div>
          <div class="error-message fs10" v-if="!$v.form.oldPassword.maxLength">旧密码超出长度</div>
        </div>
      </div>
      <div class="form-item">
        <label><span class="required">*</span>新密码：</label>
        <div class="form-item-content" :class="{ 'error': $v.form.password.$error }">
          <input v-model.trim="form.password" @input="$v.form.password.$touch()" type="password" placeholder="请输入新密码" />
          <div class="error-message fs10" v-if="!$v.form.password.required">请输入新密码</div>
          <div class="error-message fs10" v-else-if="!$v.form.password.password">密码只能包含数字字母和部分特殊字符，8到20位</div>
          <div class="error-message fs10" v-else-if="!$v.form.password.notSameAsOld">新密码与原密码不能一致</div>
        </div>
      </div>
      <div class="form-item">
        <label><span class="required">*</span>确认新密码：</label>
        <div class="form-item-content" :class="{ 'error': $v.form.passwordConfirm.$error }">
          <input v-model.trim="form.passwordConfirm" @input="$v.form.passwordConfirm.$touch()" type="password" placeholder="请确认新密码" />
          <div class="error-message fs10" v-if="!$v.form.passwordConfirm.required">请确认新密码</div>
          <div class="error-message fs10" v-else-if="!$v.form.passwordConfirm.sameAs">密码请确认一致</div>
        </div>
      </div>
      <p class="tip">注意：密码只能包含数字字母下划线中划线，8到20位</p>
      <div class="form-item">
        <div class="form-item-content">
          <button :class="[{ 'disabled': $v.form.$invalid }, 'btn-submit']" @click.prevent="submit">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import { required, maxLength, sameAs } from 'vuelidate/lib/validators'
  import notSameAs from '@/common/validation/notSameAs'
  import password from '@/common/validation/password'
  import API from '@/common/api'
  export default {
    data () {
      return {
        form: {
          oldPassword: '',
          password: '',
          passwordConfirm: ''
        }
      }
    },
    validations: {
      form: {
        oldPassword: {
          required,
          maxLength: maxLength(20)
        },
        password: {
          required,
          password,
          notSameAsOld: notSameAs('oldPassword')
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      submit () {
        if (!this.$v.form.$invalid) {
          API.UC.changePassword(this.form).then((res) => {
            if (res.status === 'OK') {
              layer.msg('修改密码成功！')
              this.resetForm()
            }
          })
        }
      },
      resetForm () {
        this.form.oldPassword = ''
        this.form.password = ''
        this.form.passwordConfirm = ''
        this.$v.form.$reset()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .form{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:10px;
  }
  .password {
    .form-item {
      label{
        padding:0;
        width: 95px;
        text-align: right;
      }
      .form-item-content{
        margin-left:100px;
      }
      .form-item-content input{
        width:50%;
        height:28px;
        background:rgba(255,255,255,1);
        border-radius:1px;
        border:1px solid rgba(204,204,204,1);
      }
      .error-message {
       left: 120px;
      }
      .fs10{
        font-size: 10px;
        margin-left: -3%;
      }
    }
    .tip {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153,153,153,1);
      line-height: 9px;
      margin-left: 15%;
      margin-top: -5px;
    }
    .btn-submit {
      margin-top: 46px;
      background: @linkColor;
      color: #fff;
      border: 0;
      padding: 0;
      outline: none;
      cursor: pointer;
      transition: all .3s;
      width: 57px;
      height: 23px;
      background: rgba(0,170,113,1);
      border-radius: 1px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255,255,255,1);
      line-height: 10px;
      margin-left: 40%;
      &:hover {
        background: @textlightColor;
      }

    }
  }
</style>
