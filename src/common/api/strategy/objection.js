import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-objection-api/'

var objectionAPI = {
  // 删除上传的文件
  deleteFile: (options = {}) => {
    let params = _.pick(options, ['fileKey'])
    return Axios({
      method: 'POST',
      url: baseUrl + 'deleteFile.do',
      params: params
    })
  },
  // 提交
  commit: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'publishObjection.do',
      data: _.pick(options, ['name', 'description', 'type', 'supplyDepCode', 'resId', 'resName', 'resCatId', 'resCatName', 'resType', 'resDescription', 'supplyDepName', 'referUrl', 'contractPerson', 'contractPhone', 'contractEmail', 'expectTime', 'fileList'])
    })
  },
  // 个人中心查询
  getMyObjectionList: (options = {}) => {
    let params = _.pick(options, ['page', 'pageSize', 'supplyDepCode', 'resName', 'type', 'reqStatus', 'publishTimeStart', 'publishTimeEnd'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'queryObjection.do',
      params: params
    })
  },

  // 需求详情
  getDetailForUC: (options = {}) => {
    let params = _.pick(options, ['id'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDetailForUC.do',
      params: params
    })
  },
  // 发布需求排行榜TOP10
  listDepartRelReqTop10: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'listDepartRelReqTop10.do',
      params: _.pick(options, [])
    })
  },
  // 供给需求排行榜TOP10
  listDepartRecReqTop10: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'listDepartRecReqTop10.do',
      params: _.pick(options, [])
    })
  },
  //用户异议数量统计
  getGiveObjCount: (options = {}) => {
    let param = _.pick(options, ['type', 'status']);
    return Axios({
      method: 'GET',
      url: baseUrl + "getGiveObjCount.do",
      params: param
    })
  }
}

export default objectionAPI
