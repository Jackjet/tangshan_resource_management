<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix" style="width: 1100px; margin: 20px auto 10px">
      <span class="col3">/</span>
      <router-link tag="span" :to="{ name: 'home' }">
        <a href="">首页</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <span>企业信息查询</span>
    </div>
    <div class="wrapper clearfix">
      <div class="legalSearch mt20">
        <div class="legalTitle">企业信息查询</div>
        <div class="legalSearchBox">
          <div class="searchFont fl">
            <input type="text" value="" v-model="keyWord" placeholder="企业名称、统一社会信用代码" />
          </div>
          <div class="searchBtn fl" v-on:click="search">搜索</div>
        </div>
      </div>

      <div class="detailTableTitle"></div>
      <div class="result-body">
        <p v-if="list.length < 1">暂无数据</p>
        <div class="menuDetailTable" v-if="list.length > 0">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <th scope="col">序号</th>
                <th scope="col">企业名称</th>
                <th scope="col">统一社会信用代码</th>
                <th scope="col">企业类型</th>
                <th scope="col">法定代表人</th>
                <th scope="col">成立日期</th>
              </tr>
              <tr v-for="(item,index) in list">
                <td>{{index + 1}}</td>
                <td width="300">
                  <router-link :to="{ name: 'enterpriseDetail', params: { id: item.rowkey }}" :title="item.cnname">
                    {{item.cnname}}
                  </router-link>
                </td>
                <td>{{item.tyshxydm}}</td>
                <td>{{item.companytype}}</td>
                <td>{{item.legalpersonname}}</td>
                <td>{{item.establishdate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <paginate v-show="pageInfo.totalPage > 0" :page-count="pageInfo.totalPage" :force-page="pageInfo.currentPage - 1" :click-handler="jumpPage" :prev-text="'上一页'" :next-text="'下一页'" :container-class="'pagination'">
        </paginate>
      </div>

    </div>
  </div>
</template>

<script>
import API from '@/common/api'
import SearchItem from '@/components/searchItem'
export default {
  data() {
    return {
      keyWord: '',
      list: [],
      pageInfo: {
        totalPage: 1,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  components: {
    SearchItem
  },
  watch: {
    'pageInfo.currentPage': 'exchangeData'
  },
  methods: {
    search() {
      this.pageInfo.currentPage = 1
      this.exchangeData()
    },
    exchangeData: function () {
      let _this = this
      API.Enterprise.findEnterpriseBaisiceInfo({
        'keyWord': _this.keyWord,
        'pageIndex': _this.pageInfo.currentPage,
        'pageSize': _this.pageInfo.pageSize
      }).then((res) => {
        _this.list = res.result.content
        _this.pageInfo.totalPage = res.result.totalPages
      })
    },
    jumpPage(page) {
      this.pageInfo.currentPage = page
    },
    init: function () {
      this.exchangeData()
    }
  },
  mounted: function () {
    this.init()
  }
}
</script>

<style scoped>
.echartContainer {
  margin-left: -15px;
  overflow: hidden;
}
.echartInner {
  width: 33.33%;
  padding-left: 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.echartBox {
  width: 100%;
  height: 330px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
}
.echartBoxTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: #333333;
  text-align: center;
}
.echartBoxTip {
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #666666;
  text-align: center;
}
.legalSearch {
  width: 100%;
  padding: 20px 35px 15px;
  box-sizing: border-box;
  background: url(images/searchBg.png);
  background-size: cover;
  overflow: hidden;
}
.legalTitle {
  width: 100%;
  line-height: 30px;
  font-size: 20px;
  color: #000000;
  text-align: center;
  overflow: hidden;
}
.legalSearchBox {
  width: 480px;
  margin: 15px auto;
  height: 40px;
  font-size: 14px;
  border: 2px solid #1f6ead;
  background: #ffffff;
  box-sizing: border-box;
  overflow: hidden;
}
.legalSearchBox .searchFont {
  width: 396px;
  padding: 0 20px 0 35px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  background: url(images/searchBg1.png) no-repeat 15px center;
  box-sizing: border-box;
  overflow: hidden;
}
.legalSearchBox .searchFont:hover,
.legalSearchBox .searchFont:active {
  background: url(images/searchBg2.png) no-repeat 15px center;
}
.legalSearchBox .searchFont input {
  width: 100%;
  height: 34px;
  line-height: 34px;
  padding: 0;
  font-size: 14px;
  color: #000000;
  border: none;
  overflow: hidden;
}
.legalSearchBox .searchBtn {
  width: 80px;
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  background: #1f6ead;
  cursor: pointer;
  overflow: hidden;
}
.legalTips {
  width: 100%;
  overflow: hidden;
}
.legalTips div {
  width: 100%;
  padding: 5px 0;
  line-height: 22px;
  font-size: 14px;
  color: #333333;
  overflow: hidden;
}

.detailTableTitle {
  width: 100%;
  padding: 20px 0 10px;
  line-height: 30px;
  font-size: 20px;
  color: #333333;
  text-align: center;
  overflow: hidden;
}
.menuDetailTable {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
}
.menuDetailTable table {
  width: 100%;
  border: 1px solid #e5e5e5;
}
.menuDetailTable table tr {
  border-bottom: 1px solid #e5e5e5;
}
.menuDetailTable table tr th {
  vertical-align: middle;
  padding: 7px 15px;
  line-height: 24px;
  font-size: 14px;
  color: #888888;
  white-space: nowrap;
  background: #f4f6f8;
  border-right: 1px solid #e5e5e5;
}
.menuDetailTable table tr td {
  vertical-align: middle;
  padding: 7px 15px;
  line-height: 24px;
  font-size: 14px;
  color: #333333;
  text-align: center;
  word-break: break-all;
  border-right: 1px solid #e5e5e5;
}
.menuDetailTable table tr:hover {
  background: #ebf8ff;
  cursor: default;
}
.menuDetailTable a {
  color: #15a6fc;
}
.menuDetailTable a:hover {
  text-decoration: underline;
}
</style>
