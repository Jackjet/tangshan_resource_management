import Axios from '../http'
import _ from 'lodash'

const baseUrl = location.protocol + '//' + location.host + '/ro/share-statistics-api/'
const commonUrl = location.protocol + '//' + location.host + '/ro/share-common-api/'
// const testUrl = location.protocol + '//' + location.host + '/'
const statisticsAPI = {
  // 获取基础信息库统计
  getBaseInfoStatistics: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'statistics/getBaseInfoStatistics.do'
    })
  },
  // 获取数据汇聚、数据共享:部门、数据项 、数据量统计
  getDataStatistics: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'statistics/getDataStatistics.do',
      params: _.pick(options, ['name'])
    })
  },
  // 数据汇聚统计
  getDeptConvergeStatistics: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'statistics/getDeptConvergeStatistics.do'
    })
  },
  // 数据共享统计
  getDeptShareStatistics: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'statistics/getDeptShareStatistics.do',
      params: _.pick(options, ['startPublishTime', 'endPublishTime'])
    })
  },
  getCountResByTopic: (options = {}) => {
    return Axios({
      method: 'GET',
      url: commonUrl + 'statistics/countResByTopic.do'
    })
  },
  getCountResByShareType: (options = {}) => {
    return Axios({
      method: 'GET',
      url: commonUrl + 'statistics/countResByShareType.do'
    })
  },
  // 获取部门下载和调用量
  getDeptDownloadNum: (options = {}) => {
    return Axios({
      method: 'GET',
      url: commonUrl + 'statistics/countDeptResNum.do'
    })
  },
  getFlowToDept: (options = {}) => {
    return Axios({
      method: 'GET',
      url: commonUrl + 'statistics/getFlowToDept.do'
    })
  }
}

export default statisticsAPI
