<template>
  <!--FOOTER-->
  <div class="footer">
    <div style="height: 308px;position: relative;">
      <div style="margin-botttom:47px">
        <img class="left_img" src="../../assets/images/icons/footer_pic.png" alt="">
        <div class="footer_right">
          <div class="footer_help">
            <router-link :to="{name:'help',params:{name:'first'}}">关于我们</router-link>
            <span>|</span>
            <router-link :to="{name:'help',params:{name:'second'}}">版权声明</router-link>
            <span>|</span>
            <router-link :to="{name:'help',params:{name:'fifth'}}">意见反馈</router-link>
            <span>|</span>
            <router-link :to="{name:'help',params:{name:'fourth'}}">帮助中心</router-link>
          </div>
          <div class="footer_unit">
            <div class="unit_info">
              <img class="icon_img" src="../../assets/images/icons/ico_footer_01.svg" alt="">
              <div class="unit_name">主管单位</div>
              <span>唐山市人民政府办公室</span>
            </div>
            <div class="unit_info">
              <img class="icon_img" src="../../assets/images/icons/ico_footer_02.svg" alt="">
              <div class="unit_name">技术支持单位</div>
              <span>唐山智慧城市科技发展有限公司</span>
            </div>
            <div class="unit_info">
              <img class="icon_img" src="../../assets/images/icons/ico_footer_03.svg" alt="">
              <div class="unit_name">支持群</div>
              <span>GXPTZCQ</span>
            </div>
            <div class="unit_info">
              <img class="icon_img" src="../../assets/images/icons/ico_footer_04.svg" alt="">
              <div class="unit_name">支持热线</div>
              <span>010-88990987</span>
            </div>
            <div class="unit_info">
              <img class="icon_img" src="../../assets/images/icons/ico_footer_05.svg" alt="">
              <span>建议使用IE8以上、Google Chrome或其他兼容浏览器访问本站</span>
            </div>

          </div>

        </div>
        <!-- <div class="x_code">
          <img src="../../assets/images/icons/x_code.svg" alt="">
          <div>扫码关注公众号</div>
        </div> -->
      </div>

      <div class="bottom_info">
        <span>备案号：京ICP备案031234568</span>
        <span>公安机关备案号：101098093872</span>
        <span>网站标识码：101038924701</span>
      </div>

    </div>


  </div>
</template>
<style>
  /*FOOT*/
  .footer {
    width: 100%;
    /*height:434px;*/
  }

  .footer .left_img {
    width: 341px;
    height: 181px;
    margin-top: 48px;
    margin-right: 44px;
    float: left;
  }

  .footer_right {
    float: left;

  }

  .footer_help span {
    margin-right: 10px;
    margin-left: 10px;

  }

  .footer_help {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 13px;

  }

  .footer_help {
    margin-top: 48px;
    margin-bottom: 28px;
  }

  .footer_unit div {
    /*margin-top:24px;*/
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 10px;

  }

  .unit_info {
    margin-bottom: 10px;
  }

  .unit_name {
    width: 84px;
    height: 14px;
    display: inline-block;
  }

  .bottom_info {
    /*margin-bottom: 32px;*/
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 14px;
  }

  .bottom_info span {
    margin-left: 72px;
    float: left;
    margin-top: 40px;
  }

  .icon_img {
    width: 16px;
    height: 16px;
    margin-right:12px;
  }
  .x_code{
    position: absolute;
    right: 0;
    bottom: 100px;
    text-align: center;
  }
  .x_code div{
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:14px;
    margin-top:22px;
  }
  .x_code img{
    width:84px;
    height:84px;
  }


</style>
