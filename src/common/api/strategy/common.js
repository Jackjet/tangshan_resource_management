import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/'
var baseUrl1 = location.protocol + '//' + location.host + '/ro/share-requirement-api/';

var commonAPI = {
  getLoginInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'briefInfo.do',
      params: {
        t: +new Date()
      }
    })
  },
  switchCity: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'home/switchCity.do',
      params: {
        t: +new Date(),
        areaCode: options.areaCode
      },
      transformResponse: [function (data) {
        if (options.callback) {
          options.callback()
        }
        return data
      }]
    })
  },
  login: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'login.do',
      data: _.pick(options, ['loginName', 'password', 'captcha'])
    })
  },
  logout: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'logout.do'
    })
  },
  // 退出日志
  outLoginByCurrentUser: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl1 + 'outLoginByCurrentUser.do'
    })
  },
  getDefaultBackEndUrl: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDefaultBackEndUrl.do'
    })
  },
  delApply: (options = {}) => {
    return Axios({
      method: 'GET',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/delApply.do',
      params: _.pick(options, ['id'])
    })
  },
  // CATA申请
  applyCata: (options = {}) => {
    return Axios({
      method: 'POST',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/addCataApply.do',
      data: _.pick(options, ['busType', 'busId', 'shareType', 'busName', 'ownerDeptName'])
    })
  },
  // 申请修改
  applyUpdate: (options = {}) => {
    return Axios({
      method: 'POST',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/updateApply.do',
      data: _.pick(options, ['busType', 'busId', 'shareType', 'busName', 'ownerDeptName'])
    })
  },
  // API申请
  applyApi: (options = {}) => {
    return Axios({
      method: 'POST',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/addApiApply.do',
      data: _.pick(options, ['busType', 'busId', 'shareType', 'busName', 'ownerDeptName'])
    })
  },
  // APP申请
  applyApp: (options = {}) => {
    return Axios({
      method: 'POST',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/addAppApply.do',
      data: _.pick(options, ['busType', 'busId', 'shareType', 'busName', 'ownerDeptName'])
    })
  },
  // DATA申请
  applyData: (options = {}) => {
    return Axios({
      method: 'POST',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/addDataApply.do',
      data: _.pick(options, ['busType', 'busId', 'shareType', 'busName', 'ownerDeptName'])
    })
  },
  //检查是否申请
  checkApply: (options = {}) => {
    return Axios({
      method: 'POST',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/checkApply.do',
      data: _.pick(options, ['busType', 'busId', 'shareType'])
    })
  },

  //个人中心查看公共接口
  querydetail: (options = {}) => {
    return Axios({
      method: 'GET',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userCommon/Querydetail.do',
      params: _.pick(options, ['busId', 'busType', 'id'])
    })
  },
  getShareResList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/res/getShareResList.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  getCountForHome: (options = {}) => {
    return Axios({
      method: 'GET',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/statistics/getCountForHome.do'
    })
  },
  checkDeptAgreement: (options = {}) => {
    return Axios({
      method: 'GET',
      url: location.protocol + '//' + location.host + '/ro/share-common-api/userApply/checkDeptAgreement.do'
    })
  }
}

export default commonAPI
