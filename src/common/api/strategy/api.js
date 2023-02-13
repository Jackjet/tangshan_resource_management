import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-api-api/'

var apiAPI = {
    // 获取API列表
  getApiList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'service/queryApiList.do',
      params: _.pick(options, ['depNo', 'categoryId', 'tagId', 'shareType', 'keyword', 'orderBy', 'page', 'pageSize','baseId'])
    })
  },
  // 获取API详情
  getApiDetail: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'service/getApiServiceDetailById.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取最热申请API
  getHotApiList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getCountTop.do',
      params: _.pick(options, ['pageSize'])
    })
  },
  // 待审批API列表
  getMyApplyApiList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getMyApplyList.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 申请的API列表
  getMyUseApiList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getMyUseList.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 审批申请的API列表
  getCheckMyUseApiList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'apply/applyList.do',
      params: _.pick(options, ['serviceName','reviewedStatus','startTime','endTime','pageType','page', 'pageSize','applyDeptName','deptName'])
    })
  },
  // 审批申请的API
  doApplyCheck: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'doApplyCheck.do',
      params: _.pick(options, ['checkStatus','checkContent','applyId','pageType'])
    })
  },
  //下载协议
  downloadAgreement: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'downloadAgreement.do',
      params: _.pick(options, ['applyId'])
    })
  },
  // 我关注的API列表
  getMyAttentionApi: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'service/getMyAttentionApi.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 关注API
  followApi: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userAttention/add.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 取消关注API
  unFollowApi: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userAttention/remove.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 我关注的API的数量
  getMyAttentionCnt: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userAttention/getMyAttentionCnt.do'
    })
  },
  // 我申请的API的数量
  getMyApplyCnt: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getMyUseCount.do'
    })
  },
  matchWords: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'service/listKeyWord.do',
      params: _.pick(options, ['keyword'])
    })
  },
  globalSearch: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'service/globalSearch.do',
      params: _.pick(options, ['keyword', 'page', 'pageSize'])
    })
  },
  countApiByStrategy: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'statistics/countApiByStrategy.do',
      params: _.pick(options, [])
    })
  },
  getApiCount: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getApiCount.do',
      params: _.pick(options, [])
    })
  },
  getFlowToDept: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getFlowToDept.do',
      params: _.pick(options, [])
    })
  },
  getUseDept: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getUseDept.do',
      params: _.pick(options, [])
    })
  },
  holdReq:(options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'holdReq',
      params: _.pick(options, [])
    })
  }
}

export default apiAPI
