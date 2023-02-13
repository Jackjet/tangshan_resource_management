import Axios from '../http'
import _ from 'lodash'

const baseUrl = location.protocol + '//' + location.host + '/ro/share-zzfrk-api/'
// const testUrl = location.protocol + '//' + location.host + '/'
const statisticsAPI = {
  // 获取企业基本信息
  getBaisiceInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'enterprise/getBaisiceInfo.do',
      params: _.pick(options, ['id'])
    })
  },
  // 获取企业基本信息列表
  findEnterpriseBaisiceInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'enterprise/findEnterpriseBaisiceInfo.do',
      params: _.pick(options, ['keyWord', 'pageIndex', 'pageSize'])
    })
  },
  // 根据工商注册号企业经营异常名录
  findAbnormalOperation: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'enterprise/findAbnormalOperation.do',
      params: _.pick(options, ['gszch'])
    })
  },
  // 根据统一社会信用代码查询企业股东
  findShareholderInformation: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'enterprise/findShareholderInformation.do',
      params: _.pick(options, ['tyshxydm'])
    })
  },
  // 根据统一社会信用代码查询企业主要员工
  findStaffInformation: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'enterprise/findStaffInformation.do',
      params: _.pick(options, ['tyshxydm'])
    })
  }
}

export default statisticsAPI
