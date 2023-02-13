import {withParams} from 'vuelidate/lib/validators/common'

var urlRegex = /^1(3|4|5|6|7|8|9)\d{9}$/
var tel = /^(0315)([\w\W]{1})\d{7}$/

export default withParams({type: 'mobile'}, function (value) {
  return urlRegex.test(value) || tel.test(value)
})
