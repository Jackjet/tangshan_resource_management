import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-uc-api/'

var ucAPI = {
  // 修改密码
  changePassword: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'change/password.do',
      data: _.pick(options, ['oldPassword', 'password', 'passwordConfirm'])
    })
  },
  // 修改用户基本信息
  updateUserInfo: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'register/updateShareUcInfo.do',
      data: _.pick(options, ['email', 'phone'])
    })
  },
  getUserInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'user/info.do',
      params: _.pick(options, ['userId'])
    })
  }
}

export default ucAPI
