<template>
  <div>
    <form class="form">
      <div class="form-item">
        <label><span class="required">*</span>资源用途：</label>
        <div class="form-item-content" :class="{ 'error': $v.form.purpose.$error }">
          <textarea name="purpose" rows="10" cols="30" placeholder="请填写资源用途" v-model.trim="form.purpose"
                    @input="$v.form.purpose.$touch()"></textarea>
          <div class="error-message" v-if="!$v.form.purpose.required">请填写资源用途</div>
          <div class="error-message" v-if="!$v.form.purpose.maxLength">资源用途超出长度200</div>
        </div>
      </div>
      <div class="form-item">
        <label>使用期限：</label>
        <div class="form-item-content" :class="{ 'error': $v.form.endTime.$error }">
          <vue-datepicker-local v-model="form.endTime" :disabled-date="disabledDate" placeholder="请选择使用期限"/>
          <!--<input :class="{ 'error': $v.endTime.$error }" v-model.trim="endTime" @input="$v.endTime.$touch()" type="text" name="endTime" id="endTime" placeholder="请选择使用期限" />-->
        </div>
        <div class="error-message" v-if="!$v.form.endTime.required">请选择使用期限</div>
      </div>
    </form>
  </div>
</template>
<script>
  import {required, maxLength} from 'vuelidate/lib/validators'
  import VueDatepickerLocal from 'vue-datepicker-local'
  import moment from 'moment'
  import API from '@/common/api'

  const MAP = {
    'api': 'Api',
    'data': 'Data',
    'app': 'App'
  };
  export default {
    props: ['submitFlag', 'clearFlag', 'serviceId', 'type'],
    data() {
      return {
        form: {
          purpose: '',
          endTime: '',
          shareType: '02'
        }
      }
    },
    validations: {
      form: {
        purpose: {
          required,
          maxLength: maxLength(200)
        },
        endTime: {
          required
        }
      }
    },
    watch: {
      submitFlag() {
        if (!this.$v.form.purpose.required) {
          layer.msg('请填写资源用途');
          this.$emit('handleSubmit');
          return
        }
        if (!this.$v.form.purpose.maxLength) {
          layer.msg('资源用途超出长度200');
          this.$emit('handleSubmit');
          return
        }
        if (!this.$v.form.endTime.required) {
          layer.msg('请选择使用期限');
          this.$emit('handleSubmit');
          return
        }
        if (this.submitFlag && !this.$v.form.$invalid) {
          this.form.endTime = moment(this.form.endTime).format('YYYY-MM-DD');
          this.form.dataId = this.serviceId;
          this.form.serviceId = this.serviceId;
          this.form.appId = this.serviceId;
          API[MAP[this.type]].apply(this.form).then((res) => {
            if (res.status === 'OK') {
              this.$emit('handleClose');
              this.resetForm();
              layer.msg(res.result)
            }
          });
          this.$emit('handleSubmit')
        } else {
          this.$emit('handleSubmit')
        }
      },
      clearFlag() {
        if (this.clearFlag) {
          this.resetForm()
        }
      }
    },
    methods: {
      disabledDate(time) {
        // TODO 包含当天
        return new Date() >= time
      },
      resetForm() {
        this.form.purpose = '';
        this.form.endTime = ''
      }
    },
    components: {
      VueDatepickerLocal
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';

</style>
