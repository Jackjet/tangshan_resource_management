import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-feedback-api/'

var aboutAPI = {
  // 查询问题列表
  getQuestInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getQuestInfo.do',
      params: _.pick(options, ['page', 'pageSize', 'search'])
    })
  },
  // 查询意见反馈列表
  getFeedInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getFeedInfo.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
};

export default aboutAPI
