import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/'

var searchAPI = {
  // 获取关键词匹配
  matchWords: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'home/matchWords.do',
      params: _.pick(options, ['keyword'])
    })
  }
}

export default searchAPI
