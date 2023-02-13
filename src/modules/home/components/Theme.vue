<template>
  <div class="floor">
    <ul class="floorTabNav">
      <li class="tabBtn leftBtn" @click="floorTab=true" :class="{'selected':floorTab}">按主题</li>
      <li class="tabBtn rightBtn"  @click="floorTab=false" :class="{'selected':!floorTab}">按部门</li>
    </ul>
    <div class="sort clearfix" v-show="floorTab">
      <a href="javascript:;" class="sortItem" v-for="item in itemList" @click="topicAltType(item.categoryId)">
        <div class="icon">
          <img :src="item.icon" />
        </div>
        <p class="text">{{ item.name }}</p>
      </a>
    </div>
    <div class="dept clearfix" v-show="!floorTab">
      <a href="javascript:;" class="deptItem"  v-for="item in departsList" @click="departAltType(item.depCode)">
        <i class="icon">
          <img :src="item.icon" :alt="item.name">
        </i>
        <i class="num">{{ item.num }}</i>
        <span class="deptName">{{ item.name }}</span>
      </a>
    </div>
    <div class="resourceType-list" v-show="showTypeBox" id="typeBox">
      <ul >
        <li v-for="tl in typeList" @click="go(tl.type)">
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
        floorTab: true,
        showTypeBox: false,
        typeList: [
          {
            name: '文件',
            icon: require('../images/theme1.png'),
            type: 'data'
          }, {
            name: '接口',
            icon: require('../images/theme2.png'),
            type: 'api'
          }, {
            name: '云服务',
            icon: require('../images/theme3.png'),
            type: 'app'
          }
        ],
        itemList: [
          {
            name: '公共服务',
            icon: require('../images/categoryIcon/gongGongFuWu.png'),
            categoryId: '24999'
          }, {
            name: '健康保障',
            icon: require('../images/categoryIcon/jianKangBaoZhang.png'),
            categoryId: 25000
          }, {
            name: '社会保障',
            icon: require('../images/categoryIcon/sheHuiBaoZhang.png'),
            categoryId: 25001
          }, {
            name: '食品药品安全',
            icon: require('../images/categoryIcon/shiPinYaoPinAnQuan.png'),
            categoryId: 25002
          }, {
            name: '安全生产',
            icon: require('../images/categoryIcon/anQuanShengChan.png'),
            categoryId: 25003
          }, {
            name: '价格监督',
            icon: require('../images/categoryIcon/jiaGeJianGuan.png'),
            categoryId: 25004
          }, {
            name: '能源安全',
            icon: require('../images/categoryIcon/nengYuanAnQuan.png'),
            categoryId: 25005
          }, {
            name: '信用体系',
            icon: require('../images/categoryIcon/xinYongTiXi.png'),
            categoryId: 25006
          }, {
            name: '城乡建设',
            icon: require('../images/categoryIcon/chengXiangJianShe.png'),
            categoryId: 25007
          }, {
            name: '社区治理',
            icon: require('../images/categoryIcon/sheQuZhiLi.png'),
            categoryId: 25008
          }, {
            name: '生态环保',
            icon: require('../images/categoryIcon/shengTaiHuanBao.png'),
            categoryId: 25009
          }, {
            name: '应急维稳',
            icon: require('../images/categoryIcon/yingJiWeiWen.png'),
            categoryId: 25010
          }
        ],
        layerIndex: '',
        categoryId: 0,
        departsList: [],
        depCode: 0
      }
    },
    created () {
      this.getCategory()
      this.getReduceDeptNum()
    },
    methods: {
      getCategory () {
        API.Dict.getCategory({'parentId': 2, 'deleteFlag': 'N'}).then((res) => {
          let catArr = res.result
          let newCatArr = []
          for (let i = 0; i < (catArr.length > 12 ? 12 : catArr.length); i++) {
            newCatArr.push({
              name: catArr[i].categoryName,
              icon: require('../images/theme' + (i + 1) + '.png'),
              categoryId: catArr[i].categoryId
            })
          }
          this.itemList = newCatArr
        })
      },
      altType (id) {
        this.showTypeBox = true
        this.categoryId = id
        this.layerIndex = layer.open(
          {
            type: 1,
            title: '选择资源类型',
            shadeClose: true,
            area: ['500px'],
            content: $('#typeBox'),
            end: () => {
              this.showTypeBox = false
            }
          }
        )
      },
      go (t) {
        if (t === 'data') {
          return this.$router.push({name: 'data', params: {categoryId: this.categoryId}})
        }
        if (t === 'api') {
          return this.$router.push({name: 'api', params: {categoryId: this.categoryId}})
        }
        if (t === 'app') {
          return this.$router.push({name: 'service', params: {categoryId: this.categoryId}})
        }
      },
      departAltType (id) {
        this.$router.push({'name': 'resCatalog', 'params': {'deptId': id}})
      },
      topicAltType (id) {
        this.$router.push({'name': 'resCatalog', 'params': {'topicId': id}})
      },
      getReduceDeptNum () {
        API.Resdoc.getInstutinonCount().then((res) => {
          let departsList = []
          let rs = res.result
          for (let i = 0; i < rs.length; i++) {
            let dept = {
              name: rs[i].deptName,
              num: rs[i].count,
              depCode: rs[i].id,
              icon: rs[i].img
            }
            if (dept.icon == null) {
              dept.icon = require('../images/deptLogo/default.png')
            }
//            if (rs[i].deptName === '市工商局') {
//              dept.icon = require('../images/deptLogo/gongShangJu.png')
//            } else if (rs[i].deptName === '市公安局') {
//              dept.icon = require('../images/deptLogo/gongAnJu.png')
//            } else if (rs[i].deptName === '市国土局') {
//              dept.icon = require('../images/deptLogo/guoTuJu.png')
//            } else if (rs[i].deptName === '市海洋与渔业局') {
//              dept.icon = require('../images/deptLogo/haiYangYuYeJu.png')
//            } else if (rs[i].deptName === '市环保局') {
//              dept.icon = require('../images/deptLogo/huanBaoJu.png')
//            } else if (rs[i].deptName === '市交通局') {
//              dept.icon = require('../images/deptLogo/jiaoTongJu.png')
//            } else if (rs[i].deptName === '市食药监局') {
//              dept.icon = require('../images/deptLogo/shiYaoJianJu.png')
//            } else if (rs[i].deptName === '市水利局') {
//              dept.icon = require('../images/deptLogo/shuiLiJu.png')
//            } else if (rs[i].deptName === '市司法局') {
//              dept.icon = require('../images/deptLogo/siFaJu.png')
//            } else if (rs[i].deptName === '市统计局') {
//              dept.icon = require('../images/deptLogo/tongJiJu.png')
//            } else if (rs[i].deptName === '市质监局') {
//              dept.icon = require('../images/deptLogo/zhiJianJu.png')
//            } else {
//              dept.icon = require('../images/deptLogo/default.png')
//              dept.icon = '../images/deptLogo/default.png'
//            }
            departsList.push(dept)
          }
          this.departsList = departsList
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .resourceType-list{
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

  .sort {
    margin-left: -16px;
    margin-top: -16px;
  }

  .sort .sortItem {
    float: left;
    display: block;
    width: 183px;
    margin-left: 16px;
    margin-top: 16px;
    padding: 15px 0;
    border: 1px solid #e5e5e5;
    box-sizing: content-box;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
  }

  .sort .sortItem .icon {
    display: inline-block;
    width: 50px;
    height: 50px;
  }

  .sort .sortItem .icon img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .sort .sortItem .text {
    width: 100%;
    margin-top: 10px;
    font-size: 16px;
    color: #333;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sort .sortItem:hover {
    position: relative;
    top: -1px;
    background: #edf6fb;
    border-color: #c7eaff;
    -webkit-box-shadow: 0 0 10px 0 rgba(0, 147, 234, .5);
    box-shadow: 0 0 10px 0 rgba(0, 147, 234, .5);
    transition: all .3s;
  }

  .sort .sortItem:hover .text {
    color: #15a6fc;
  }
</style>
