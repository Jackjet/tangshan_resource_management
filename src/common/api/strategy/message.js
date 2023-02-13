import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-message-api/'

var messageAPI = {
    // 获取API列表
  getAnnouncement: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'msg/getAnnouncement.do',
      params: _.pick(options, [])
    })
  }
}

export default messageAPI
