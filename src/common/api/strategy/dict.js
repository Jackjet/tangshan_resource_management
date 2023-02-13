import Axios from '../http'
import _ from 'lodash'

const baseUrl = location.protocol + '//' + location.host + '/ro/share-dict-api/'

const ucAPI = {
  // 获取共享类型
  getShareType: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'dict/getShareType.do'
    })
  },
  // 获取分类
  getDictInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'dict/getDictInfo.do',
      params: _.pick(options, ['categoryId', 'dictCode'])
    })
  },
  // 获取分类
  getCategory: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'category/getResourceCategoryInfo.do',
      params: _.pick(options, ['parentId', 'deleteFlag'])
    })
  },
  // 获取标签
  getTags: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'tag/getTagsInfo.do',
      params: _.pick(options, ['name'])
    })
  },
  // ADD标签
  addTagInfo: (options = {}) => {
    return Axios({
      method: 'POST',
      url: baseUrl + 'tag/addTagInfo.do',
      data: _.pick(options, ['name'])
    })
  },
  // 获取部门
  getDepsByNode: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'getDepsByNode.do',
      params: {
        // apiKey: '7be5499f37034ef5bdc387f5382cd6be',
        node: 130200
      }
    })
  }
}

export default ucAPI
