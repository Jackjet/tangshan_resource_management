import {withParams} from 'vuelidate/lib/validators/common'

var urlRegex = /^([A-Za-z0-9\u4e00-\u9fa5]+，)*[A-Za-z0-9\u4e00-\u9fa5]+$/
// var urlRegex = new RegExp('^[[\u4e00-\u9fa5]+，]*[\u4e00-\u9fa5]+$')
export default withParams({type: 'resourceItem'}, function (value) {
  return urlRegex.test(value)
})
