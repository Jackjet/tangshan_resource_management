import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-reduce-api/'

var reduceAPI = {
  // 获取首页统计数据
  getReduceIndexOverview: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'reduceIndexOverview.do'
    })
  },
  // 获取每个部门的数量按照降序排列
  getReduceDeptNum: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'reduceDeptNum.do'
    })
  },
  // 获取每个部门的数量按照降序排列
  getReduceResDeptNum: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'reduceDeptResNum.do'
    })
  },
  // 获取Res列表
  getResList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'reduceResList.do',
      params: _.pick(options, ['depCode', 'categoryId', 'page', 'pageSize'])
    })
  }
}

export default reduceAPI
