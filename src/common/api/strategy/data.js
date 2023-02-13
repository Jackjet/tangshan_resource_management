import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-data-api/'

var apiAPI = {
  // 获取数据列表
  getDataList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDataList.do',
      params: _.pick(options, ['depNo', 'topicId', 'tagId', 'shareType', 'keyword', 'orderBy', 'page', 'pageSize','baseId'])
    })
  },
  // 获取数据详情
  getDataDetail: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDataDetail.do',
      params: _.pick(options, ['dataId'])
    })
  },
  // 获取下载量最多的数据列表
  getMostDownloadList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDataListForMostDownloads.do'
    })
  },
  // 获取数据下载地址
  getDownloadUrl: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'data/download.do',
      params: _.pick(options, ['dataId'])
    })
  },
  // 我关注的数据列表
  getMyAttentionData: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getAttentionDatum.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 待审批数据列表
  getMyApplyDataList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getMyApplyList.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 申请的数据列表
  getMyUseDataList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getMyUseList.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 审批申请的DATA列表
  getCheckMyUseDataList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'apply/applyList.do',
      params: _.pick(options, ['serviceName','reviewedStatus','startTime','endTime','pageType','page', 'pageSize','applyDeptName','deptName'])
    })
  },
  // 审批申请的DATA
  doApplyCheck: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'doApplyCheck.do',
      params: _.pick(options, ['checkStatus','comments','id','pageType'])
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
  // 关注
  followData: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'addUserDataAttention.do',
      data: _.pick(options, ['dataId'])
    })
  },
  // 取消关注
  unFollowData: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'removeUserDataAttention.do',
      params: _.pick(options, ['dataId'])
    })
  },
  // 我关注的数据的数量
  getMyAttentionCnt: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDataAttentionCountByUser.do',
    })
  },
  // 我下载量数量
  getMyDownLoadCnt: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getMyDownLoadCnt.do'
    })
  },
  // 判断当前数据是否可以申请
  checkDownload: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'userApply/getApplyStatusById.do',
      data: _.pick(options, ['dataId'])
    })
  },
  // 判断当前数据是否申请未处理，避免重复申请
  checkApplyUndoStatus: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'userApply/checkApplyUndoStatus.do',
      data: _.pick(options, ['dataId'])
    })
  },
  matchWords: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'listKeyWord.do',
      params: _.pick(options, ['keyword'])
    })
  },
  globalSearch: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'globalSearch.do',
      params: _.pick(options, ['keyword', 'page', 'pageSize'])
    })
  },
  countDataSum: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'countDataSum.do',
      params: _.pick(options, [])
    })
  },
  countDataByStrategy: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'countDataByStrategy.do',
      params: _.pick(options, [])
    })
  },
  getDataCount: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDataCount.do',
      params: _.pick(options, [])
    })
  },
    //文件下载
  getDownloadFile: (options = {}) => {
      return Axios({
        method: 'GET',
        url: location.protocol + '//' + location.host + '/ro/share-data-api/' + 'data/downloadFromGateway.do',
        params: _.pick(options, ['dataId'])
      })
    },
}

export default apiAPI
