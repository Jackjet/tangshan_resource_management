import Axios from '../http'
import _ from 'lodash'

const baseUrl = location.protocol + '//' + location.host + '/ro/share-resdoc-api/'
// const testUrl = location.protocol + '//' + location.host + '/'
const resdocAPI = {


  // 查询类型数据
  getTypeList: (options = {}) => {
  return Axios({
    method: 'GET',
    url: baseUrl + 'cataType/getAllList.do',
    params: _.pick(options, ['name','type'])
   })
  },
  // 根据目录ID查询信息项数据
  getItemList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/getItemList.do',
      params: _.pick(options, ['cataId','pageSize','page'])
    })
  },
  // 查询类型数据（首页）
  getTypeListForHome: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cataType/getAllList.do',
      params: _.pick(options, [])
    })
  },
 // 获取数据详情
  getDataDetail: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/getById.do',
      params: _.pick(options, ['id'])
    })
  },
  // 查询目录数据
  getDataList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/list.do',
      params: _.pick(options, ['baseIds','topicIds','deptIds','shareType','order','pageSize','page','hasRes','name'])
    })
  },
  // 关注
  followCata: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userAttention/add.do',
      params: _.pick(options, ['cataId'])
    })
  },
  // 取消关注
  unFollowCata: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userAttention/remove.do',
      params: _.pick(options, ['cataId'])
    })
  },
  // 获取目录关联资源
  getResById: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/getResById.do',
      params: _.pick(options, ['id','type'])
    })
  },
  // 搜索
  globalSearch: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/list.do',
      params: _.pick(options, ['name', 'page', 'pageSize'])
    })
  },
  //关注的目录列表
  getMyAttentionCata: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/findMyAttentionCataList.do',
      params: _.pick(options, ['name', 'page', 'pageSize'])
    })
  },
  // 我关注的目录的数量
  getMyAttentionCnt: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'userAttention/getMyAttentionCnt.do'
    })
  },
  //最新上线的资源目录（首页）
  getNewCataList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'cata/findNewCataList.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  }
}

export default resdocAPI
