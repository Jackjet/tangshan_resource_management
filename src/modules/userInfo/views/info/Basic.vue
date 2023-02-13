<template>
  <div class="basic">
    <form class="form">
      <ul>
        <li>
          <label>用户名：</label>
          <div class="name">{{basicInfo.account}}</div>
        </li>
        <li>
          <label>用户姓名：</label>
          <div class="name">{{basicInfo.name}}</div>
        </li>
        <li>
          <label>APIKey：</label>
          <div class="name">{{basicInfo.apiKey}}</div>
        </li>
        <li>
          <label>secretKey：</label>
          <div class="name">{{basicInfo.secretKey}}</div>
        </li>
        <li>
          <label>所属部门：</label>
          <div class="name">{{basicInfo.depName}}</div>
        </li>
        <li>
          <label>手机号码：</label>
          <div class="form-item" v-if="updateFlag">
            <div class="form-item-content name" :class="{ 'error': $v.form.phone.$error }">
              <input type="text" placeholder="请输入手机号码" @input="$v.form.phone.$touch()" v-model.trim="form.phone" />
              <div class="error-message mgL50" v-if="!$v.form.phone.required">请输入手机号码</div>
              <div class="error-message mgL50" v-if="!$v.form.phone.mobile">手机号码格式不正确</div>
            </div>
          </div>
          <div v-else class="name">{{basicInfo.phone}}</div>
        </li>
        <li>
          <label>邮箱：</label>
          <div class="form-item" v-if="updateFlag">
            <div class="form-item-content name" :class="{ 'error': $v.form.email.$error }">
              <input type="text" placeholder="请输入邮箱" @input="$v.form.email.$touch()" v-model.trim="form.email" />
              <div class="error-message mgL50" v-if="!$v.form.email.required">请输入邮箱</div>
              <div class="error-message mgL50" v-if="!$v.form.email.email">邮箱格式不正确</div>
            </div>
          </div>
          <div v-else class="name">{{basicInfo.email}}</div>
        </li>
        <li>
          <button style="color: #fff;margin-left: 46%;" :class="[{ 'disabled': updateFlag && $v.form.$invalid }, 'btn-update name']" @click.prevent="update">{{updateFlag ? '提交' : '修改'}}</button>
        </li>
      </ul>
    </form>
  </div>
</template>
<script>
  import API from '@/common/api'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import mobile from '@/common/validation/mobile'
  export default {
    props: ['user'],
    data () {
      return {
        basicInfo: {},
        updateFlag: false,
        form: {
          phone: '',
          email: ''
        }
      }
    },
    watch: {
      user () {
        this.getUserInfo()
      }
    },
    created () {
      this.getUserInfo()
    },
    validations: {
      form: {
        phone: {
          required,
          mobile,
          maxLength: maxLength(11),
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getUserInfo () {
        if (!this.user.userId) {
          return
        }
        API.UC.getUserInfo({
          userId: this.user.userId
        }).then((res) => {
          this.basicInfo = res.result
          this.form.phone = this.basicInfo.phone
          this.form.email = this.basicInfo.email
        })
      },
      update () {
        if (this.updateFlag && !this.$v.form.$invalid) {
          // 提交修改
          API.UC.updateUserInfo(this.form).then((res) => {
            if (res.status === 'OK') {
              layer.msg('修改成功！')
              this.getUserInfo()
              this.updateFlag = false
            }
          })
        } else {
          this.updateFlag = true
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .basic {
    li {
      height: 50px;
      line-height: 50px;
      label {
        width: 70px;
        height: 50px;
        line-height: 50px;
        float: left;
        text-align: right;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51,51,51,1);
      }
      .name {
        margin-left: 90px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51,51,51,1);
      }
    }
    .btn-update {
      width:57px;
      height:23px;
      background:rgba(0,170,113,1);
      color: #fff;
      border: 0;
      padding: 0;
      outline: none;
      cursor: pointer;
      border-radius:1px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:10px;
      margin-left: 48%;
      margin-top: 42px;
      &:hover {
        background: rgba(0,170,113,1);
      }
      &.disabled {
        background: #aaa;
        cursor: default;
      }
    }
    .error-message {
      top: 15px;
      left: 330px;
    }
    .form-item-content input{
      width: 50%;
      height: 28px;
      background: rgba(255,255,255,1);
      border-radius: 1px;
      border: 1px solid rgba(204,204,204,1);
    }
    .mgL50{
      margin-left:50px;
    }
  }
</style>
