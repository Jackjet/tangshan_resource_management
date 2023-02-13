<template>
  <div>
    <el-row :gutter="8">
        <el-col :span="24">
              <div class="bg_fl pd user_default_catalog">
              <div class="user_default_title">我的目录</div>
                <el-col :span="8">

                    <div class="attentMenu">
                      <div class="title" style="left: 75px;">关注</div>
                      <div class="count">{{resdocCount?resdocCount:0}}</div>
                      <div class="menuIcon"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="attentRes">
                      <div class="title" style="70px">提出异议</div>
                      <div class="count">{{giveObjCnt?giveObjCnt:0}}</div>
                      <div class="resIcon"></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="applyRes">
                      <div class="title">待处理异议</div>
                      <div class="count">{{waitObjCnt?waitObjCnt:0}}</div>
                      <div class="applyResIcon"></div>
                    </div>
                  </el-col>
            </div>
        </el-col>
        <!--<el-col :span="8">
            <div class=" pd user_default_demand">
            <div class="user_default_title" style="margin-bottom: 20px;">我的需求</div>
            <el-col :span="12">
              <div class="demand_account">
                 <div>{{reqTotal?reqTotal:0}}</div>
                <div class="title">提出需求</div>
              </div>
            </el-col>
            <el-col :span="12">
                <div class="demand_completed">
                 <div>{{reqfinal?reqfinal:0}}</div>
                <div class="title">已完成</div>
              </div>
            </el-col>
          </div>

        </el-col>-->
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
          <div class="bg_fl pd user_default_data">
            <div class="user_default_title mb34">我的文件</div>
            <div class="rightRngle">
              <span class="account_num">{{dataCount?dataCount:0}}</span>
              <span class="account_label">下载</span>
            </div>
            <div class="leftRngle">
              <span class="account_num">{{dataDLoad?dataDLoad:0}}</span>
              <span class="account_label">关注</span>
            </div>
          </div>
      </el-col>
      <el-col :span="12">
          <div class="bg_fl pd user_default_data">
            <div class="user_default_title mb34">我的接口</div>
            <div class="rightRngle">
              <span class="account_num">{{focusApi?focusApi:0}}</span>
              <span class="account_label">接入</span>
            </div>
            <div class="leftRngle">
              <span class="account_num">{{applyApi?applyApi:0}}</span>
              <span class="account_label">关注</span>
            </div>
          </div>
      </el-col>
      <!--<el-col :span="8">
          <div class="bg_fl pd user_default_data">
            <div class="user_default_title mb34">我的云服务</div>
            <div class="rightRngle">
              <span class="account_num">{{focusApp?focusApp:0}}</span>
              <span class="account_label">接入</span>
            </div>
            <div class="leftRngle">
              <span class="account_num">{{applyApp?applyApp:0}}</span>
              <span class="account_label">关注</span>
            </div>
          </div>
      </el-col>-->
      <!-- <div class="bg_fl pd user_default_api">
        <div class="user_default_title mb34">我的云接口</div>
        <div class="mb28">
          <span class="account_num">{{focusApi?focusApi:0}}</span>
          <span class="account_label">关注</span>
        </div>
        <div>
          <span class="account_num">{{applyApi?applyApi:0}}</span>
          <span class="account_label">接入</span>
        </div>
      </div>
      <div class="bg_fl pd user_default_service">
        <div class="user_default_title mb34">我的云服务</div>
        <div class="mb28">
          <span class="account_num">{{focusApp?focusApp:0}}</span>
          <span class="account_label">关注</span>
        </div>
        <div>
          <span class="account_num">{{applyApp?applyApp:0}}</span>
          <span class="account_label">接入</span>
        </div>
      </div> -->
    </el-row>
  </div>
</template>
<script>
  import API from '@/common/api'
  import ApiItem from '@/components/apiItem'
  import AppItem from '@/components/appItem'

  export default {
    data() {
      return {
        resdocCount: '0',
        dataCount: '0',
        dataDLoad: '0',
        focusApi: '0',
        focusApp: '0',
        applyApi: '0',
        applyApp: '0',
        type: '',
        status: '',
        giveObjCnt: '0',
        reqTotal: '0',
        reqfinal: '0',
        reqPer: 0,
        reqWait: '0',
        waitObjCnt: '0'
      }
    },
    created() {
      API.Resdoc.getMyAttentionCnt().then((res) => {
        this.resdocCount = res.result
      });
      API.Data.getMyAttentionCnt().then((res) => {
        console.log(res);
        this.dataCount = res.result
      });
      API.Data.getMyDownLoadCnt().then((res) => {
        this.dataDLoad = res.result
      });
      API.Api.getMyAttentionCnt().then((res) => {
        this.focusApi = res.result
      });
      API.App.getMyAttentionCnt().then((res) => {
        this.focusApp = res.result
      });
      API.Api.getMyApplyCnt().then((res) => {
        this.applyApi = res.result.totalSize
      });
      API.App.getMyUseCount().then((res) => {
        this.applyApp = res.result.totalSize
      });
      API.Objection.getGiveObjCount({'type':this.type = '', 'status':this.status = ''}).then((res) => {
        this.giveObjCnt = res.result
      });
      API.Objection.getGiveObjCount({'type':this.type = '', 'status':this.status = '20'}).then((res) => {
        this.waitObjCnt = res.result
      });
      API.Demand.queryUserTotal().then(res => {
        this.reqTotal = res.result.total;
        this.reqfinal = res.result.final;
        this.reqPer = res.result.per;
        this.reqWait = res.result.waitCount;
      })

    },
    methods: {},
    components: {
      ApiItem, AppItem
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';

  /*  .user-default-account {
      background: #fff;
      .default-top {
        height: 65px;
        line-height: 65px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0 30px 0 40px;
        h3 {
          float: left;
          margin: 0;
        }
      }
      .default-bottom {
        padding: 25px 35px;
        overflow: hidden;
        ul {
          overflow: hidden;
          width: 100%;
        }
        li {
          float: left;
          height: 200px;
          width: 25%;
          box-sizing: border-box;
          text-align: center;
          padding: 15px 0;
          &:last-child {
            border-right: 0;
          }
          p {
            margin-top: 15px;
            color: #999;
          }
          h2 {
            margin: 0;
          }
        }
      }
    }

    .user-default-api {
      margin-top: 25px;
      overflow: hidden;
      .default-api-title {
        overflow: hidden;
        h2 {
          float: left;
          margin: 0;
        }
        a {
          float: right;
          color: @linkColor;
          &:hover {
            color: @linkColorHover;
          }
        }
      }
      .default-api-content {
        margin-top: 20px;
      }
    }

    .user-default-service {
      margin-top: 25px;
      overflow: hidden;
      .default-service-title {
        overflow: hidden;
        h2 {
          float: left;
          margin: 0;
        }
        a {
          float: right;
          color: @linkColor;
          &:hover {
            color: @linkColorHover;
          }
        }
      }
      .default-service-content {
        margin-top: 20px;
      }
    }

    .default-not-found {
      padding: 25px 0;
      min-height: 170px;
      background: #fff;
      text-align: center;
      h2 {
        margin: 10px 0;
      }
    }*/
  /*new css*/
  .bg_fl {
    background-color: #fff;
    // float: left;
  }

  .pd {
    padding: 12px 12px;
  }

  .user_default_catalog {
    // width: 65%;
    height: 200px;
    border: 1px solid rgba(226,226,226,1);
    opacity: 1;
  }

  .user_default_demand {
    // width: 30%;
    height: 200px;
    background: #fff;
    border: 1px solid #e2e2e2;
    opacity: 1;
  }

  .user_default_data, .user_default_api, .user_default_service {
    // width: 31%;
    height: 208px
  }

  .user_default_data, .user_default_api {
    background: rgba(255,255,255,1);
    border: 1px solid rgba(226,226,226,1);
    opacity: 1;
  }

  .user_default_title {
    background: #ffffff;
    border-radius: 3px;
    font-size: 20px;
  }



  .catalog_account {
    float: left;
  }

  .mb34 {
    margin-bottom: 30px;
  }

  .mb28 {
    margin-bottom: 28px;
  }

  // new
  .attentMenu{
  background: url(../../assets/images/icons/polygon_a.svg) no-repeat;
  }
.attentRes{
  background: url(../../assets/images/icons/polygon_b.svg) no-repeat;
  }
.applyRes{
  background: url(../../assets/images/icons/polygon_c.svg) no-repeat;
  }
.downMenu{
  background: url(../../assets/images/icons/polygon_d.svg) no-repeat;
  }
.attentMenu,
.attentRes,
.applyRes,
.downMenu {
  height: 170px;
  background-position: center;
  // position: relative;
}
.attentMenu .title,
.attentRes .title,
.applyRes .title{
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
          text-align: center;
          // position: absolute;
          top: 45px;
          // left: 55px;
              left: 75px;
          text-align: center;
          padding-top: 45px;
}
.downMenu .title{
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
          text-align: center;
          position: absolute;
          top: 50px;
          left: 85px;
}
.attentMenu .count,
.attentRes .count,
.applyRes .count,
.downMenu .count{
    // position: absolute;
    font-size: 25px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255,255,255,1);
    opacity: 1;
    top: 80px;
    left:83px;
    padding-top: 13px;
    text-align: center;
}
.attentMenu .menuIcon{
     background: url(../../assets/images/icons/icon_b.svg) no-repeat;
}
.attentRes .resIcon{
     background: url(../../assets/images/icons/icon_a.svg) no-repeat;
}
.applyRes .applyResIcon{
     background: url(../../assets/images/icons/icon_c.svg) no-repeat;
}
.downMenu .downloadIcon{
     background: url(../../assets/images/icons/icon_d.svg) no-repeat;
}
.attentMenu .menuIcon,
.attentRes .resIcon,
.applyRes .applyResIcon,
.downMenu .downloadIcon{
    //  position: absolute;
     background-position: center;
     bottom: 35px;
     left: 85px;
     width: 14px;
     height: 14px;
    text-align: center;
    margin: 0 auto;
    padding-top: 50px;
}
.demand_account{
    border:1px solid rgba(255,175,113,1);
    color: rgba(255,175,113,1);
    opacity:1;
}
.demand_completed{
    border:1px solid rgba(88,219,132,1);
    opacity:1;
    color: rgba(88,219,132,1);
}
.demand_account,
.demand_completed{
      width: 97%;
      height: 130px;
      text-align: center;
      padding: 30px 20px;
      .title{
        margin-top: 15px;
      }
}
.rightRngle{
   -webkit-clip-path: polygon(0 0 ,80% 0,85% 25%,100% 100%,0 100% );
    height: 55px;
    background: red;
    background: rgba(243,243,243,1);
    opacity: 1;
    padding: 15px;
    position: relative;
    margin-bottom: 10px;
    .account_num{
      font-size: 30px;
      position: absolute;
      left: 15px;
      top: 18px;
    }
    .account_label{
     top: 35px;
      position: absolute;
      left: 48px;
    }
}
.leftRngle{
   -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 100%, 25% 85%);
    height: 55px;
    background: red;
    background: rgba(243,243,243,1);
    opacity: 1;
    padding: 15px;
    position: relative;
    .account_num{
      font-size: 30px;
      position: absolute;
      right: 15px;
      top: 18px;
    }
    .account_label{
         top: 35px;
    position: absolute;
    right: 60px;
    }
}
</style>
