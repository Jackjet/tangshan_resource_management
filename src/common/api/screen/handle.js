import Axios from '../http';

var baseUrl = location.protocol + '//' + location.host + '/ro/share-requirement-api/';

var handleApi = {
    // 数据大厅-办理页面-头部统计接口
    dataDealHeaderTotal: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataDealHeaderTotal.do'
        })
    },
    // 数据大厅-办理页面-数据申请top10
    listDepartRelReqTop10: () => {
        return Axios({
            method: 'GET',
            url: baseUrl + 'listDepartRelReqTop10.do'
        })
    },
    // 数据大厅-办理页面-数据办理top10
    listDepartRecReqTop10: () => {
        return Axios({
            method: 'GET',
            url: baseUrl + 'listDepartRecReqTop10.do'
        })
    },
    // 数据大厅办理页面-线上办事总览列表
    dataDealList: (options = {}) => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataDealList.do',
            params: _.pick(options, ['currentPage', 'pageSize'])
        })
    },
    // 近30天资源申请办理
    getApply30BeforeList: (options = {}) => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'getApply30BeforeList.do',
        })
    },
}

export default handleApi;