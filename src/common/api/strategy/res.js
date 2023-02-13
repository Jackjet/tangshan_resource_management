import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-rescollector-api/'

var resAPI = {
  // 修改密码
  getResources: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'resources.do',
      params: _.pick(options, ['keyword'])
    })
  }
}

export default resAPI
