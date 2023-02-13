import {withParams} from 'vuelidate/lib/validators/common'

var urlRegex = /^[A-Za-z0-9\u4e00-\u9fa5]*$/

export default withParams({type: 'name'}, function (value) {
  return urlRegex.test(value)
})
