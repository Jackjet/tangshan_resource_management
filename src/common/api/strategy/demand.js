import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-requirement-api/'

var demandAPI = {
  // 需求列表页
  getDemandList: (options = {}) => {
    let params = _.pick(options, ['page', 'pageSize', 'keywords'])
    if (options.beginTime) {
      params.beginTime = options.beginTime
    }
    if (options.endTime) {
      params.endTime = options.endTime
    }
    return Axios({
      method: 'GET',
      url: baseUrl + 'queryAllReq.do',
      params: params
    })
  },
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
      url: baseUrl + 'publishReq.do',
      data: _.pick(options, ['name', 'description', 'resourceTypeList', 'supplyDepCode', 'supplyDepName', 'reasonType', 'reason', 'contractPerson', 'contractPhone', 'contractEmail', 'expectTime', 'fileList'])
    })
  },
  remove1: (options = {}) => {
    const { currentPage, pageSize, applyTimeOrder, applyStatusOrder, urlNmae } = options;
    let url = baseUrl + `${urlNmae}.do?currentPage=${currentPage}&pageSize=${pageSize}`
    if (applyTimeOrder) {
      url = url + `&applyTimeOrder=${applyTimeOrder}`
    }
    if (applyStatusOrder) {
      url = url + `&applyStatusOrder=${applyStatusOrder}`
    }
    return Axios({
      method: 'POST',
      url,
      data: _.pick(options, ['currentPage', 'pageSize', 'applyTimeOrder', 'applyStatusOrder'])
    })
  },
  modify1: (options = {}) => {
    const { currentPage, pageSize } = options;
    return Axios({
      method: 'POST',
      url: baseUrl + `modifyReq.do?currentPage=${currentPage}&pageSize=${pageSize}`,
      data: _.pick(options, ['id', 'mscx-area-code', 'currentPage', 'pageSize', 'resourceTypeList', 'supplyDepCode', 'supplyDepName', 'reasonType', 'reason', 'contractPerson', 'contractPhone', 'contractEmail', 'expectTime', 'fileList'])
    })
  },
  // 修改
  modify: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'modifyReq.do',
      data: _.pick(options, ['id', 'reqStatus', 'name', 'description', 'resourceTypeList', 'supplyDepCode', 'supplyDepName', 'reasonType', 'reason', 'contractPerson', 'contractPhone', 'contractEmail', 'expectTime', 'fileList'])
    })
  }, // 修改
  modify1: (options = {}) => {
    const { currentPage, pageSize } = options;
    return Axios({
      method: 'POST',
      url: baseUrl + `modifyReq.do?currentPage=${currentPage}&pageSize=${pageSize}`,
      data: _.pick(options, ['id', 'mscx-area-code', 'currentPage', 'pageSize', 'resourceTypeList', 'supplyDepCode', 'supplyDepName', 'reasonType', 'reason', 'contractPerson', 'contractPhone', 'contractEmail', 'expectTime', 'fileList'])
    })
  },
  // 暂存
  save: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'holdReq.do',
      data: _.pick(options, ['name', 'description', 'resourceTypeList', 'supplyDepCode', 'supplyDepName', 'reasonType', 'reason', 'contractPerson', 'contractPhone', 'contractEmail', 'expectTime', 'fileList'])
    })
  },
  // 个人中心查询
  getMyDemandList: (options = {}) => {
    let params = _.pick(options, ['page', 'pageSize', 'supplyDepCode', 'name', 'resourceTypeListStr', 'reqStatus', 'publishTimeStart', 'publishTimeEnd'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'queryReq.do',
      params: params
    })
  },
  // 需求详情
  getDetail: (options = {}) => {
    let params = _.pick(options, ['id'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'reqDetail.do',
      params: params
    })
  },
  // 需求详情
  getDetailForUC: (options = {}) => {
    let params = _.pick(options, ['id'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'reqDetailForUC.do',
      params: params
    })
  },
  // 需求详情
  getModifyReqDetail: (options = {}) => {
    let params = _.pick(options, ['id'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'reqDetailForUC.do',
      params: params
    })
  },
  // 删除
  remove: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'deleteReq.do',
      data: _.pick(options, ['id'])
    })
  },
  // 删除TODO 看不明白，不敢乱改，先复制一份吧
  remove1: (options = {}) => {
    const { currentPage, pageSize, applyTimeOrder, applyStatusOrder, urlNmae } = options;
    let url = baseUrl + `${urlNmae}.do?currentPage=${currentPage}&pageSize=${pageSize}`
    if (applyTimeOrder) {
      url = url + `&applyTimeOrder=${applyTimeOrder}`
    }
    if (applyStatusOrder) {
      url = url + `&applyStatusOrder=${applyStatusOrder}`
    }
    return Axios({
      method: 'POST',
      url,
      data: _.pick(options, ['currentPage', 'pageSize', 'applyTimeOrder', 'applyStatusOrder'])
    })
  },
  // 反馈详情
  selectFeedbackDetail: (options = {}) => {
    let params = _.pick(options, ['id'])
    return Axios({
      method: 'GET',
      url: baseUrl + 'selectFeedbackDetail.do',
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
  //个人中心查询个人需求数量统计
  queryUserTotal: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'queryUserTotal.do',
      params: _.pick(options, [])
    })
  }
}

export default demandAPI
