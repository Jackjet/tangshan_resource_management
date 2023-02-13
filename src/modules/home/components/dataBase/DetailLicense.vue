<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix" style="width: 1100px; margin: 20px auto 10px">
      <span class="col3">/</span>
      <router-link tag="span" :to="{ name: 'home' }">
        <a href="">首页</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <span>证照</span>
    </div>
    <div class="wrapper clearfix">
      <!--
      <div class="echartContainer">
        <div class="echartInner fl">
          <div class="echartBox">
            <div class="echartBoxTitle">企业类型</div>
            <ResShareCont></ResShareCont>
          </div>
        </div>
        <div class="echartInner fl">
          <div class="echartBox">
            <div class="echartBoxTitle">新增与注销企业</div>
            <ResShareBar></ResShareBar>
          </div>
        </div>
        <div class="echartInner fl">
          <div class="echartBox">
            <div class="echartBoxTitle">企业规模</div>
            <div class="echartBoxTip">
              <span>小微型(小于1千万)</span>
              <span>中型(1千万到1亿)</span>
              <span>大型(大于1亿)</span>
            </div>
            <ResShareRing></ResShareRing>
          </div>
        </div>
      </div>
      -->
      <div class="legalSearch mt20">
        <div class="legalTitle">证照信息资源目录查询</div>
        <div class="legalSearchBox">
          <div class="searchFont fl"><input type="text" value="" placeholder="请输入查询关键词" /></div>
          <div class="searchBtn fl">搜索</div>
        </div>
        <!--
        <div class="legalTips">
          <div>
            <span><span class="fb">法人名称：</span>福州福大经纬信息科技有限公司</span>
            <span><span class="fb ml30">统一信用代码：</span>913501027416979093</span>
          </div>
          <div>
            <span><span class="fb">法人代表信息姓名：</span>李雪山</span>
            <span><span class="fb ml30">企业注册资本_总额：</span>400,000000万元</span>
            <span><span class="fb ml30">成立日期：</span>2002-10-06</span>
            <span><span class="fb ml30">登记状态：</span>确立 注册</span>
          </div>
          <div>
            <span><span class="fb">机构/住所/生产经营地址：</span>福州鼓楼区软件大道89号福州软件园产业基地11号楼一层</span>
          </div>
          <div>
            <span><span class="fb">经营访问：</span>信息数据生成、软件开发及研究、系统集成、信息网络工程及技术咨询服务；计算机硬件、科学科研仪器设备批发、代购代销。（以上经营范围涉及许可经营项目的，应在取得有关部门的许可后方可经营）</span>
          </div>
        </div>
        -->
      </div>

      <div class="detailTableTitle"></div>
      <div class="menuDetailTable">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <th scope="col">序号</th>
              <th scope="col">业务信息名称</th>
              <th scope="col">单位名</th>
              <th scope="col">记录数</th>
              <th scope="col">操作</th>
            </tr>
            <tr>
              <td>1</td>
              <td width="400">二级建造师增项、变更、延续、注销注册</td>
              <td>市法院</td>
              <td>12345678</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td width="400">医疗机构有效期延续</td>
              <td>市地税局</td>
              <td>4790</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td width="400">木材运输证核发</td>
              <td>市工商局</td>
              <td>85631</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td width="400">森林植物调运检疫</td>
              <td>市质监局</td>
              <td>235723</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td width="400">危险化学品经营许可证（零售、贸易经营）变更</td>
              <td>市法院</td>
              <td>30442</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td width="400">木材运输证核发（非珍贵树种）</td>
              <td>市地税局</td>
              <td>73238</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td width="400">木材运输证核发</td>
              <td>市工商局</td>
              <td>323546</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td width="400">省内调运植物和植物产品检疫证书核发（检验后核发）</td>
              <td>市质监局</td>
              <td>125672</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td width="400">个体工商户变更登记</td>
              <td>市法院</td>
              <td>4378423</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td width="400">个体工商户设立、变更、注销登记</td>
              <td>市地税局</td>
              <td>257323</td>
              <td>
                <router-link tag="span" :to="{ name: 'resCatalogDetail', params: { id: '00C7212A927D490F8BBBD93B4D083CF2'}}">
                  <a href="">查看详情</a>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--Pages-->
      <div class="pages mt20">
        <a href="javascript:;" class="prevPage">上一页</a>
        <a href="javascript:;" class="current">1</a>
        <a href="javascript:;">2</a>
        <a href="javascript:;">3</a>
        <a>...</a>
        <a href="javascript:;" class="nextPage">下一页</a>
      </div>

    </div>
  </div>
</template>

<script>
import ResShareCont from './ResShareCont.vue'
import ResShareBar from './ResShareBar.vue'
import ResShareRing from './ResShareRing.vue'
export default {
  name: 'Detail',
  components: {
    ResShareCont,
    ResShareBar,
    ResShareRing
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
