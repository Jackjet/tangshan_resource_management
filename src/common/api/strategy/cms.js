import Axios from '../http'
import constantValues from '@/common/utils/constant'

var baseUrl = location.protocol + '//' + location.host + '/'
var areaCode = constantValues.areaCode
var cityAbbr = constantValues.cityAbbr
if (window.sessionStorage) {
  areaCode = window.sessionStorage.getItem('areaCode') ? window.sessionStorage.getItem('areaCode') : constantValues.areaCode
  cityAbbr = window.sessionStorage.getItem('cityAbbr') ? window.sessionStorage.getItem('cityAbbr') : constantValues.cityAbbr
}
console.log('areaCode:' + areaCode + '--cityAbbr:' + cityAbbr)
var cmsAPI = {
  getPolicyReading: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'static_html/datainfo/' + cityAbbr + '_pc_policy/index.html',
      params: {
        t: +new Date()
      }
    }).then((response) => {
      return response.map((policy) => {
        policy.url = baseUrl + 'static_html/datainfo/' + cityAbbr + '_pc_policy/' + policy.id + '.html'
        policy.showDetail = false
        return policy
      })
    })
  },
  getPolicyNoticeByPage: (options) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'static_html/datainfo/' + cityAbbr + options.code +'/index' + options.index + '.html',
      params: {
        t: +new Date()
      }
    }).then((response) => {
      var list = response.list;
      list = list.map((policy) => {
        policy.url = baseUrl + 'static_html/datainfo/' + cityAbbr + options.code + '/' + policy.id + '.html'
        policy.showDetail = false
        return policy
      })
      response.list = list
      return response

    })
  },
  getSeachListByPage: (options) => {
    options.code = cityAbbr + '_' + options.code
    return Axios({
      method: 'GET',
      url: baseUrl + 'api/cms/getNewsListByKeywordAndCode.json',
      params: options
    }).then((response) => {
      var list = response.result.content;
      list = list.map((policy) => {
        policy.url = baseUrl + 'static_html/datainfo/' + options.code + '/' + policy.id + '.html'
        policy.showDetail = false
        return policy
      })
      response.list = list
      return response

    })
  },
  getNoticePublic: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'static_html/datainfo/' + cityAbbr + '_pc_notice/index.html',
      params: {
        t: +new Date()
      }
    }).then((response) => {
      return response.map((policy) => {
        policy.url = baseUrl + 'static_html/datainfo/' + cityAbbr + '_pc_notice/' + policy.id + '.html'
        return policy
      })
    })
  },
  getBannerInfo: (options = {}) => {
    return Axios({
      method: 'GET',
      url: baseUrl + 'static_html/datainfo/' + cityAbbr + '_bannerpic/index.html',
      params: {
        t: +new Date()
      }
    })
  }
}

export default cmsAPI
