import {withParams} from 'vuelidate/lib/validators/common'

var urlRegex = /^(\w|[-_\+=#\$\&\@\*\(\)\[\]\{\}<>:\?]){6,32}$/

export default withParams({type: 'password'}, function (value) {
  return urlRegex.test(value)
})
