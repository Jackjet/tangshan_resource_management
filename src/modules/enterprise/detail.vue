<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix">
      <span class="col3">/</span>
      <a href="javascript:;">首页</a>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">企业基本信息</a>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">企业详情</a>
    </div>

    <!--WRAPPER-->
    <div class="wrapper clearfix">
      <div class="menuDetailTitle">{{ baseInfo.name }}</div>

      <div class="menuDetailNavs disflex" id="menuDetailNavs">
        <div class="menuDetailNav menu1 selected fl"><span>基本信息</span></div>
        <div class="menuDetailNav menu2 fl"><span>股东信息</span></div>
        <div class="menuDetailNav menu3 fl"><span>列入经营异常名录信息</span></div>
      </div>

      <div class="menuDetailCont">
        <div class="menuDetailTable">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
              <th scope="row" align="right" width="20%">企业名称</th>
              <td width="30%">{{ baseInfo.cnname }}</td>
              <th scope="row" align="right" width="20%">统一社会信用代码</th>
              <td width="30%">{{ baseInfo.tyshxydm }}</td>
            </tr>
            <tr>
              <th scope="row" align="right" width="20%">企业类型</th>
              <td width="30%">{{ baseInfo.companytype }}</td>
              <th scope="row" align="right" width="20%">工商注册号</th>
              <td width="30%">{{ baseInfo.gszch }}</td>
            </tr>
            <tr>
              <th scope="row" align="right" width="20%">登记机关</th>
              <td width="30%">{{ baseInfo.proveins }}</td>
              <th scope="row" align="right" width="20%">登记状态</th>
              <td width="30%">{{baseInfo.registerstate}}</td>
            </tr>
            <tr>
              <th scope="row" align="right" width="20%">成立日期</th>
              <td width="30%">{{ baseInfo.establishdate }}</td>
              <th scope="row" align="right" width="20%">核准日期</th>
              <td width="30%">{{baseInfo.approvedate}}</td>
            </tr>
            <tr>
              <th scope="row" align="right" width="20%">主要经营场所</th>
              <td colspan="3">{{ baseInfo.regaddress }}</td>
            </tr>
            <tr>
              <th scope="row" align="right" width="20%">经营范围</th>
              <td colspan="3">{{ baseInfo.managerange }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="menuDetailCont" style="display: none;">
        <div class="menuDetailTable" style="min-height: 350px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <th scope="col" align="center">序号</th>
              <th scope="col" align="center">姓名</th>
              <th scope="col" align="center">股东类型</th>
              <th scope="col" align="center">证件类型</th>
              <th scope="col" align="center">证件号码</th>
            </tr>
            <tbody>
            <template v-if="shareholderList.length > 0">
              <tr v-for="(item, index) in shareholderList">
                <td align="center">{{ index + 1 }}</td>
                <td align="center">{{ item.name }}</td>
                <td align="center">{{ item.holdertype ? item.holdertype : "-" }}</td>
                <td align="center">{{ item.identificationtype }}</td>
                <td align="center">{{ item.identificationcode }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="11" style="text-align: center;">暂无数据</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="menuDetailCont" style="display: none;">
        <div class="menuDetailTable" style="min-height: 350px;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <th scope="col" align="center">序号</th>
              <th scope="col" align="center">列入事由</th>
              <th scope="col" align="center">列入日期</th>
              <th scope="col" align="center">列入审批机关</th>
              <th scope="col" align="center">移出事由</th>
              <th scope="col" align="center">移出日期</th>
              <th scope="col" align="center">移出审批机关</th>
            </tr>
            <tbody>
            <template v-if="abnormalOperationList.length > 0">
              <tr v-for="(item, index) in abnormalOperationList">
                <td align="center">{{ index + 1 }}</td>
                <td align="center">{{ item.lrsy }}</td>
                <td align="center">{{ item.lrrq }}</td>
                <td align="center">{{ item.lrspjg }}</td>
                <td align="center">{{ item.ycsy }}</td>
                <td align="center">{{ item.ycrq }}</td>
                <td align="center">{{ item.ycspjg }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="11" style="text-align: center;">暂无数据</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
  import API from '@/common/api'

  export default {
    data () {
      return {
        id: '',
        baseInfo: {},
        shareholderList: [],
        abnormalOperationList: []
      }
    },
    created () {
      this.id = this.$route.params.id
      this.initData()
    },
    mounted () {
      this.navTab({
        'btn': $('#menuDetailNavs').find('.menuDetailNav'),
        'con': '.menuDetailCont'
      })
    },
    methods: {
      navTab (o) {
        let obj = o || {}
        obj.btn.on('click', function () {
          let _index = $(this).index()
          $(this).addClass('selected').siblings().removeClass('selected')
          $(obj.con).eq(_index).show().siblings(obj.con).hide()
        })
      },
      initData () {
        API.Enterprise.getBaisiceInfo({ id: this.id })
          .then((response) => {
            this.baseInfo = response.result
            API.Enterprise.findShareholderInformation({ tyshxydm: this.baseInfo.tyshxydm })
              .then((response) => {
                this.shareholderList = response.result
              })
            API.Enterprise.findAbnormalOperation({ gszch: this.baseInfo.gszch })
              .then((response) => {
                this.abnormalOperationList = response.result
              })
          })
      }
    }
  }
</script>

<style scoped>
  @import './css/detail.css';
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 10px;
    height: 10px;
    background-color: #F8F8F8;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.1);
    border-radius: 10px;
    background-color: #f8f8f8;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
    background-color: rgba(222,222,222,.3);
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb:hover
  {
    background-color: rgba(21,166,255,.6);
  }
</style>
