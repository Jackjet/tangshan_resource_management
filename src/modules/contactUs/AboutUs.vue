<template>
  <div class="main-content">
    <h1>关于我们</h1>
    <div class="main-text">
      <h2>神州控股</h2>
      <div class="desc">
        &nbsp; &nbsp; &nbsp; &nbsp;2000年，为顺应互联网时代信息产业的发展，原联想集团一分为二，神州数码控股有限公司由此诞生（以下简称“神州控股”）。2001年，神州控股在香港联合交易所主板上市（股票代码 00861.HK）。目前，神州控股旗下有神州控股（00861.HK）、神州信息（000555.SZ）、鼎捷软件（300378.SZ） 、慧聪网（02280.HK） 四家上市公司，拥有员工上万人。 作为中国最早从事智慧城市业务的公司之一，神州控股经历了最初的以解决方案为主的城市信息化阶段，积累了强大的跨行业数据整合处理能力以及丰富的客户资源及品牌效应。经过长期的实践和投入，公司率先确立了以互联网为渠道，以跨政务部门数据整合、应用、输出为主的信息化平台运营为依托，向政府、企业和市民提供多元化的城市服务这一全新业务模式。截至目前，与全国5个省份（重庆、河北、河南、海南、江苏）、50个城市签署智慧城市战略合作协议，北京、重庆、本溪等26个城市的公共信息服务平台相继投入建设或运营。
      </div>
      <h2 style="color: #1f3a3d" >神州云平台</h2>
      <div class="desc">
        &nbsp; &nbsp; &nbsp; &nbsp;聚合神州控股多年来在智慧城市领域积淀的能力，汇聚政府、 公共、市场大数据资源，形成以API、微应用为承载的资源服务能力，打通智慧城市大数据服务的供需对接，打 造以神州数云平台为核心的智慧城市新生态，助力神州控股成为整个大数据、API的服务商。
      </div>
    </div>
    <div class="contact">
        <table>
          <col width="80px" align="left"/>
          <col width="380px" align="left"/>
          <col width="80px" align="left"/>
          <col width="380px" align="left"/>
          <col width="80px" align="left"/>
          <col width="180px" align="left"/>
           <tr>
             <td><img src="./images/business.png"/></td>
             <td>
               <h1>商务合作（工作日9:00-18:00）</h1>
               <span style="color: #aaa">Business Cooperation</span>
             </td>
             <td><img src="./images/support.png"/></td>
             <td>
               <h1>技术支持</h1>
               <span style="color: #aaa">Technical Support</span>
             </td>
             <td><img src="./images/eye.png"/></td>
             <td>
               <h1>关注我们</h1>
               <span style="color: #aaa">Contact US</span>
             </td>
           </tr>
          <tr>
            <td/>
            <td>
              <span  style="color: #aaa">电话</span>
              <h1 style="font-weight: 400;font-size: 24px;">010-61853361</h1>
            </td>
            <td/>
            <td>
              <span  style="color: #aaa">电话</span>
              <h1 style="font-weight: 400;font-size: 24px;">010-82705480</h1>
            </td>
            <td/>
            <td>
              <img width="100" height="100" src="./images/qrcode.jpg"/>
            </td>
          </tr>
          <tr>
            <td/>
            <td>
              <span  style="color: #aaa">邮箱</span>
              <h1 style="font-weight: 400;font-size: 24px;">zhangglf@dcholdings.com</h1>
            </td>
            <td/>
            <td>
              <span  style="color: #aaa">邮箱</span>
              <h1 style="font-weight: 400;font-size: 24px;">zhangglf@dcholdings.com</h1>
            </td>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
  .main-content {
    width: 1190px;
    margin: 0 auto;
    font-family: 'Microsoft YaHei';
    color: #1f3a3d;
  }
  .main-text {
    background: #f7f8fc;
    width: 1190px;
    height: 450px;
    padding: 10px 30px;
  }
  .desc {
    line-height: 30px;
    margin: 20px 0;
    text-indent: 2em;
    color: #666;
    position: relative;
  }
  .contact {
    width: 1190px;
    height: 340px;
    margin-top: 30px;
    padding: 35px 35px;
    background: url("./images/aboutus_bg.png") no-repeat;
    font-family: "Microsoft YaHei";
  }
  .contact h1 {
    font-size: 20px;
    font-weight: lighter;
    color: #ffffff;
    margin-top: 5px;
  }
  .contact table {
    height: 270px;
  }
</style>
