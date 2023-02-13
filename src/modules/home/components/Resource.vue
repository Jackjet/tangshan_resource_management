<template>
  <div class="fragment">
    <div class="title">热点资源</div>
    <div class="wrapper">
      <div class="left">
        <div class="hot-api">
          <div class="hot-title">
            <span>最热申请接口</span>
            <hr/>
            <a href="#"><router-link tag="li" :to="{ name: 'api' }">更多>></router-link></a>
          </div>
          <div class="hot-api-item" v-for="hotApi in hotApiList">
            <div class="item-icon">
              <router-link :to="{ name: 'apiDetail', params: { id: hotApi.serviceId }}">
                <img :src="hotApi.image">
                <!--<div class="item-name">{{ hotApi.serviceName }}</div>-->
                <!--<div class="item-depart">{{ hotApi.description }}</div>-->
              </router-link>
            </div>
            <div class="item-desc">
              <p class="item-name">{{hotApi.serviceName}}</p>
              <div class="item-depart">{{hotApi.applyDeptName}}</div>
            </div>
          </div>
        </div>
        <div class="hot-service">
          <div class="hot-title">
            <span>最热申请云服务</span>
            <hr/>
            <a href="#"><router-link tag="li" :to="{ name: 'service' }">更多>></router-link></a>
          </div>
          <div class="hot-service-item" v-for="hotApp in hotAppList">
            <router-link :to="{ name: 'serviceDetail', params: { id: hotApp.appId }}">
            <div class="hot-service-icon">
              <img :src="hotApp.image">
            </div>
            <div class="hot-service-content">
              <div class="service-title">{{hotApp.appName}}</div>
              <div class="service-desc">
                <span class="desc-item">服务方式：{{hotApp.serviceType}}</span>
                <span class="desc-item">服务渠道：{{hotApp.serviceChannel}}</span>
                <br/>
                <span class="desc-item">共享类型：{{hotApp.shareType}}</span>
                <span class="desc-item">所属部门：{{hotApp.belongDepName}}</span>
                <p>{{hotApp.description}}</p>
              </div>
            </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="hot-right-title depart">
          <span>部门提供资源前五名</span>
          <!--<a href="javascipt:window.alert('跳转至资源页面')">更多>></a>-->
        </div>
        <div class="hot-right-content">
          <ul>
            <li v-for="(dept, index) in departsList">
              <span>{{index + 1}}</span>
              <a @click="altType(dept.depCode)" style="cursor:pointer;">{{dept.deptName}}（{{dept.num}}）</a>
            </li>
          </ul>
        </div>
        <div class="hot-right-title data">
          <span>最热下载文件</span>
          <!--<a href="#">更多>></a>-->
          <router-link :to="{name: 'data', params: {orderBy: 2}}">更多>></router-link>
        </div>
        <div class="hot-right-content">
          <ul>
            <li v-for="(most, index) in mostDownload">
              <span>{{index + 1}}</span>
              <router-link :to="{name: 'dataDetail', params: {id: most.id}}">{{most.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="resourceType-list-res" v-show="showTypeBoxRes" id="typeBox1Res">
      <ul >
        <li v-for="tl in typeListRes" @click="goRes(tl.type)">
          <div class="icon">
            <img :src="tl.icon" />
          </div>
          <p>{{ tl.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  export default {
    data () {
      return {
        hotApiList: [],
        mostDownload: [],
        hotAppList: [],
        departsList: [],
        params: {
          pageSize: 3
        },
        showTypeBoxRes: false,
        typeListRes: [
          {
            name: '文件',
            icon: require('../images/theme1.png'),
            type: 'data'
          }, {
            name: '接口',
            icon: require('../images/theme2.png'),
            type: 'api'
//          }, {
//            name: '云服务',
//            icon: require('../images/theme3.png'),
//            type: 'app'
          }
        ],
        layerIndex: '',
        depCode: 0
      }
    },
    created () {
      this.getHotList()
      this.getMostDownload()
      this.getHotAppList()
      this.getReduceDeptNum()
    },
    methods: {
      getHotList () {
        API.Api.getHotApiList(this.params).then((res) => {
          this.hotApiList = res.result.list
        })
      },
      getMostDownload () {
        API.Data.getMostDownloadList().then((res) => {
          this.mostDownload = res.result
        })
      },
      getHotAppList () {
        API.App.getHotAppList({pageSize: 2}).then((res) => {
          this.hotAppList = res.result.list
        })
      },
      getReduceDeptNum () {
        API.Reduce.getReduceDeptNum().then((res) => {
          var departsList = []
          var rs = res.result
          for (var i = 0; i < (rs.length > 5 ? 5 : rs.length); i++) {
            departsList.push({
              deptName: rs[i].deptName,
              depCode: rs[i].deptCode,
              num: rs[i].num
            })
          }
          this.departsList = departsList
        })
      },
      altType (id) {
        this.showTypeBoxRes = true
        this.depCode = id
        this.layerIndex = layer.open(
          {
            type: 1,
            title: '选择资源类型',
            shadeClose: true,
            area: ['500px'],
            content: $('#typeBox1Res'),
            end: () => {
              this.showTypeBoxRes = false
            }
          }
        )
      },
      goRes (t) {
        if (t === 'data') {
          return this.$router.push({name: 'data', params: {depCode: this.depCode}})
        }
        if (t === 'api') {
          return this.$router.push({name: 'api', params: {depCode: this.depCode}})
        }
        if (t === 'app') {
          return this.$router.push({name: 'service', params: {depCode: this.depCode}})
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  .resourceType-list-res{
      ul {
        list-style: none;
        padding: 0;
        overflow: hidden;
          li{
              img{
                max-width:90px;
                height:90px;
              }
              p {
                margin: 0;
                vertical-align: middle;
                text-align: center;
              }
              div{
                vertical-align: middle;
                text-align: center;
              }
              float: left;
              width: 33.3%;
              height: 160px;
          }
      }
  }
  .wrapper {
    margin-top: 35px;
    overflow: hidden;
    .left {
      width: 66%;
      margin-right: 2%;
      float: left;
      .hot-title {
        height: 50px;
        line-height: 50px;
        position: relative;
        span {
          font-size: 18px;
          color: @linkColor;
          padding-right: 10px;
          position: relative;
          &:after {
            border: 7px solid transparent;
            border-left: 10px solid #20a0ff;
            width: 0;
            height: 0;
            top: 3px;
            right: -18px;
            position: absolute;
            content: ' ';
          }
        }
        hr {
          width: 400px;
          position: absolute;
          top: 20px;
          left: 31%;
          border: 0;
          background-color: #ccc;
          height: 1px;
        }
        a {
          float: right;
          color: @linkColor;
        }
      }
      .hot-api {
        height: 260px;
        width: 100%;
        border: 1px solid #ccc;
        background: #fff;
        padding: 0 18px 18px 18px;
        .hot-api-item {
          width: 32%;
          height: 192px;
          margin-right: 2%;
          float: left;
          position: relative;
          text-align: center;
          overflow: hidden;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            box-shadow: 0 2px 10px rgba(0,0,0,1);
          }
          .item-name {
            position: absolute;
            top: 100px;
            font-size: 16px;
            color: #000;
            width: 100%;
          }
          .item-depart {
            position: absolute;
            top: 150px;
            color: #333;
            width: 100%;
          }
          img {
            vertical-align: middle;
            width: 110px;
            height: 110px;
          }
          /*.item-desc {*/
            /*text-align: center;*/
            /*p {*/
              /*color: #333;*/
              /*font-size: 16px;*/
            /*}*/
            /*div {*/
              /*color: #666;*/
            /*}*/
          /*}*/
        }
      }
      .hot-service {
        margin-top: 11px;
        height: 415px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 0 18px 18px 18px;
        .hot-service-item {
          height: 170px;
          //background: #f0f0f0;
          //border: 1px solid #ccc;
          padding: 20px 0 20px 20px;
          margin-bottom: 10px;
          overflow: hidden;
          &:last-child {
            margin-bottom: 0;
          }
          .hot-service-icon {
            float: left;
            img {
              height: 110px;
              width: 110px;
            }
          }
          .hot-service-content {
            float: left;
            margin-left: 25px;
            .service-title {
              font-size: 16px;
              color: @linkColor;
            }
            .service-desc {
              margin-top: 20px;
              color: @textColor;
              p {
                color: #666;
              }
            }
            .desc-item {
              min-width: 175px;
              height: 30px;
              line-height: 30px;
              display: inline-block;
            }
          }
          &:hover {
            box-shadow: 0 2px 10px rgba(0,0,0,1);
          }
        }
      }
    }
    .right {
      width: 32%;
      float: left;
      .hot-right-title {
        height: 45px;
        line-height: 45px;
        background: @linkColor;
        padding: 0 15px;
        span {
          padding-left: 35px;
          font-size: 16px;
          color: #fff;
          height: 45px;
          line-height: 45px;
          display: block;
          float: left;
          width: 195px;
        }
        a {
          float: right;
          color: #fff;
          font-size: 12px;
        }
        &.depart span {
          background: url(../../../assets/images/ico_bmlx.svg) left center no-repeat;
        }
        &.data {
          margin-top: 20px;
          span {
            background: url(../../../assets/images/icon-data.png) left center no-repeat;
          }
        }
      }
      .hot-right-content {
        margin-top: 13px;
        height: 275px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px dashed #aaa;
            position: relative;
            padding-left: 35px;
            &:last-child {
              border-bottom: 0;
            }
            &:before {
              width: 17px;
              height: 17px;
              border-radius: 2px;
              background: #9a9a9a;
              transform: rotate(45deg);
              top: 18px;
              left: 5px;
              position: absolute;
              content: ' ';
              z-index: 1;
            }
            &:first-child:before {
              background: #ff0000;
            }
            &:nth-child(2):before {
              background: #ee9700;
            }
            &:nth-child(3):before {
              background: #20a8ff;
            }
            span {
              color: #fff;
              position: absolute;
              top: 1px;
              left: 10px;
              z-index: 2;
            }
            a {
              color: #333;
              &:hover {
                color: @linkColorHover;
              }
            }
          }
        }
      }
    }
  }
</style>
