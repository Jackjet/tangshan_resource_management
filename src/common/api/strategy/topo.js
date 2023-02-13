import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-topology-api/'

var topoAPI = {
  // 获取API列表
  list: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'restopology/list.do',
      params: _.pick(options, ['serviceProvider', 'categoryType'])
    })
  }
}
export default topoAPI
