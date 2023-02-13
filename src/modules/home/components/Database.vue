<template>
  <!--floor1-->
  <div class="floor">
    <div class="floorTit">基础信息库</div>
    <div class="database clearfix">
      <div class="dataItem">
          <div class="itemTit">法人</div>
          <dl>
            <dt>目录：</dt>
            <dd> <a href="javascript:;" style="color: #00b4c0;" @click="toCataglogList(3407)">{{fr.itemNum}}</a></dd>
          </dl>
          <dl>
            <dt>数据量：</dt>
            <dd><router-link :to="{ name: 'enterpriseList'}" style="color: #00b4c0;">
              {{fr.totalNum}}
            </router-link></dd>
          </dl>
      </div>
      <a class="dataItem zrr" href="javascript:;" @click="toCataglogList(3406)">
          <div class="itemTit">自然人</div>
          <dl>
            <dt>目录：</dt>
            <dd>{{zrr.itemNum}}</dd>
          </dl>
          <dl>
            <dt>数据量：</dt>
            <dd>{{zrr.totalNum}}</dd>
          </dl>
      </a>
      <a class="dataItem xy" href="javascript:;" @click="toCataglogList(3408)">
          <div class="itemTit">信用</div>
          <dl>
            <dt>目录：</dt>
            <dd>{{xy.itemNum}}</dd>
          </dl>
          <dl>
            <dt>数据量：</dt>
            <dd>{{xy.totalNum}}</dd>
          </dl>
      </a>
      <a class="dataItem dzzz" href="javascript:;" @click="toCataglogList(3409)">
          <div class="itemTit">电子证照</div>
          <dl>
            <dt>目录：</dt>
            <dd>{{dzzz.itemNum}}</dd>
          </dl>
          <dl>
            <dt>数据量：</dt>
            <dd>{{dzzz.totalNum}}</dd>
          </dl>
      </a>
    </div>
  </div>
  <!--end floor1-->
</template>

<script>
  import API from '@/common/api'

  export default {
    data () {
      return {
        fr: {},
        zrr: {},
        xy: {},
        dzzz: {}
      }
    },
    created () {
      this.getStatisticsData()
    },
    methods: {
      getStatisticsData () {
        let _this = this
        API.Statistics.getBaseInfoStatistics().then((res) => {
          _this.setCountData(res.result)
        })
      },
      toCataglogList (id) {
        this.$router.push({'name': 'resCatalog', 'params': {'categoryId': id}})
      },
      setCountData: function (array) {
        if (array.length === 0) {
          return
        }
        for (var i = 0; i < array.length; i++) {
          var obj = {}
          obj.itemNum = array[i].itemNum
          obj.totalNum = array[i].totalNum
          if (array[i].type === '法人') {
            this.fr = obj
          } else if (array[i].type === '自然人') {
            this.zrr = obj
          } else if (array[i].type === '信用') {
            this.xy = obj
          } else if (array[i].type === '电子证照') {
            this.dzzz = obj
          }
        }
      }
    }
  }
</script>
<style scoped>
  *{box-sizing: content-box;}
  .database {
  }

  .floor { margin-top: 25px; overflow: hidden; }
  .floor:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }
  .floor .floorTit { margin-bottom: 30px; margin-top: 20px; font-size: 20px; color: #000; text-align: center; line-height: 1; }


  .database .dataItem {
    float: left;
    display: block;
    width: 255px;
    height: 80px;
    margin-left: 16px;
    padding: 15px;
    background: #e6f8fa url(../images/database_faren.png) no-repeat 95% 10px;
    color: #00b4c0;
  }

  .database .dataItem.zrr {
    background: #ffebcc url(../images/database_ziranren.png) no-repeat 95% 10px;
    color: #ff7c06;
  }

  .database .dataItem.xy {
    background: #e6e0fe url(../images/database_xinyong.png) no-repeat 95% 10px;
    color: #8463f9;
  }

  .database .dataItem.dzzz {
    background: #dbf4e3 url(../images/database_zhengzhao.png) no-repeat 95% 10px;
    color: #03b43e;
  }

  .database .dataItem:first-child {
    margin-left: 0;
  }

  .database .dataItem:hover {
    margin-top: -1px;
    -webkit-box-shadow: 0 0 10px 0 rgba(50, 50, 50, .15);
    box-shadow: 0 0 10px 0 rgba(50, 50, 50, .15);
    transition: all .3s;
  }

  .database .dataItem .itemTit {
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
  }

  .database .dataItem dl {
    margin-top: 8px;
    line-height: 20px;
  }

  .database .dataItem dt {
    float: left;
    filter: alpha(opacity=85);
    -moz-opacity: 0.85;
    -khtml-opacity: 0.85;
    opacity: 0.85;
  }

  .database .dataItem dd {
    font-size: 18px;
    font-weight: bold;
  }
</style>
