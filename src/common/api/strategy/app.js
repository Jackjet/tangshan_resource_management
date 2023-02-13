import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-app-api/'

var appAPI = {
  // 判断当前app是否申请未处理，避免重复申请
  checkApplyUndoStatus: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'userApply/checkApplyUndoStatus.do',
      data: _.pick(options, ['appId'])
    })
  },
  // 列表页-查询微服务列表
  getAppList: (options = {}) => {
    options = options || {}
    return Axios({
      method: 'GET',
      url: baseUrl + 'list.do',
      params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'topicId', 'tagId', 'page', 'pageSize', 'shareType', 'depNo','baseId'])
    })
  },
  // 获取微服务详情
  getAppDetail: (options = {}) => {
    options = options || {}
    return Axios({
      method: 'GET',
      url: baseUrl + 'get.do',
      params: _.pick(options, ['id'])
    })
  },
  // 关注API
  followApp: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'attention/add.do',
      params: _.pick(options, ['id'])
    })
  },
  // 取消关注API
  unFollowApp: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'attention/delete.do',
      params: _.pick(options, ['id'])
    })
  },
  //首页-基础/主题/部门信息资源
  getInfoResCatalog: (options = {}) => {
    return Axios({
      method: 'GET',
      url: '/ro/share-resdoc-api/cataType/getAllList.do ',
      params: _.pick(options, [])
    })
  },
    //首页-基础/主题/部门信息资源
  getNewOnline: (options = {}) => {
    return Axios({
      method: 'GET',
      url: '/ro/share-resdoc-api/cata/findNewCataList.do',
      params: _.pick(options, [])
    })
  },

  // 获取最热申请APP
  getHotAppList: (options = {}) => {
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
  // 我的申请
  showApplyApp: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/showApplyApp.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 我关注的API列表
  getMyAttentionApi: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'attention/list.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 我关注的微应用数量
  getMyAttentionCnt: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'attention/count.do',
      params: _.pick(options, [])
    })
  },
  // 申请微应用统计
  getMyUseCount: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userApply/getMyUseCount.do',
      params: _.pick(options, [])
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
  countAppByStrategy: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'statistics/countAppByStrategy.do',
      params: _.pick(options, [])
    })
  },
  getAppCount: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getAppCount.do',
      params: _.pick(options, [])
    })
  }
}

export default appAPI
