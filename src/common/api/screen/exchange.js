import Axios from '../http';

var baseUrl = location.protocol + '//' + location.host + '/ro/share-requirement-api/';

var exchangeApi = {
    // 头部今日数据统计查询
    dataCurrentExchangeTotal: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataCurrentExchangeTotal.do'
        })
    },
    // 数据大厅-交换页面-头部统计接口
    dataExchangeTotal: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataExchangeTotal.do'
        })
    },
    // 数据大厅-交换页面-数据提供部门top10接口
    dataProvideDepTop10: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataProvideDepTop10.do'
        })
    },
    // 数据大厅-交换页面-数据使用部门top10接口
    dataUseDepTop10: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataUseDepTop10.do'
        })
    },
    // 数据大厅-交换页面-数据交换明细列表接口
    dataExchangeList: (options = {}) => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataExchangeList.do',
            params: _.pick(options, ['currentPage', 'pageSize'])
        })
    },
    // 数据交换总览
    getData30sjjrList: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'getData30sjjrList.do',
        })
    },
    // 热门资源
    getRmzyList: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'getRmzyList.do',
        })
    },
    // 热门应用场景
    getRmyycjList: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'getRmyycjList.do',
        })
    },
}

export default exchangeApi;