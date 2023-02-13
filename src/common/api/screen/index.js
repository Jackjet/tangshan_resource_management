import Axios from '../http';

var baseUrl = location.protocol + '//' + location.host + '/ro/share-requirement-api/';

var screenApi = {
    // 数据大厅-入驻总览头部统计接口
    settedHeader: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'settedHeader.do',
        })
    },
    // 数据大厅首页 头部 统计接口
    dataHallHeaderTotal: (options = {}) => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataHallHeaderTotal.do',
            params: _.pick(options, ['groupType'])
        })
    },
    // 数据大厅首页 单位列表接口
    dataHallDeptList: (options = {}) => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataHallDeptList.do',
            params: _.pick(options, ['groupType'])
        })
    },
    // 数据大厅首页 单位详情接口
    dataHallDeptInfo: (options = {}) => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataHallDeptInfo.do',
            params: _.pick(options, ['depId'])
        })
    },
    // 数据大厅首页分页组别列表查询
    dataDepGroupTypeList: () => {
        return Axios({
            method: 'POST',
            url: baseUrl + 'dataDepGroupTypeList.do',
        })
    },
}

export default screenApi;