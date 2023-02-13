import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/share-dict-api/'

var aboutAPI = {
  // 资料列表列表
  getDocList: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'sysStorage/list.do',
      params: _.pick(options, ['page', 'pageSize', 'busType'])
    })
  },

};

export default aboutAPI
