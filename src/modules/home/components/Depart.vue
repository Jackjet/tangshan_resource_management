<template>
  <div class="floor">
    <div class="floorTit">业务部门</div>
    <div class="dept">
      <a href="javascript:;" class="deptItem" v-for="item in departsList" @click="altType(item.depCode)">
        <i class="icon">
          <img :src="item.icon" :alt="item.name">
        </i>
        <i class="num">{{ item.num }}</i>
        <span class="deptName">{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'

  export default {
    data () {
      return {
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
        departsList: [],
        layerIndex: '',
        depCode: 0
      }
    },
    created () {
      this.getReduceDeptNum()
    },
    methods: {
      altType (id) {
        /* this.showTypeBox = true
        this.depCode = id
        this.layerIndex = layer.open(
          {
            type: 1,
            title: '选择资源类型',
            shadeClose: true,
            area: ['500px'],
            content: $('#typeBox1'),
            end: () => {
              this.showTypeBox = false
            }
          }
        ) */
        this.$router.push({'name': 'resCatalog', 'params': {'deptId': id}})
      },
      go (t) {
        if (t === 'data') {
          return this.$router.push({name: 'data', params: {depCode: this.depCode}})
        }
        if (t === 'api') {
          return this.$router.push({name: 'api', params: {depCode: this.depCode}})
        }
        if (t === 'app') {
          return this.$router.push({name: 'service', params: {depCode: this.depCode}})
        }
      },
      getReduceDeptNum () {
        API.Resdoc.getInstutinonCount().then((res) => {
          let departsList = []
          let rs = res.result
          for (let i = 0; i < rs.length; i++) {
            let dept = {
              name: rs[i].deptName,
              num: rs[i].count,
              depCode: rs[i].id
            }
            if (rs[i].deptName === '市工商局') {
              dept.icon = require('../images/deptLogo/gongShangJu.png')
            } else if (rs[i].deptName === '市公安局') {
              dept.icon = require('../images/deptLogo/gongAnJu.png')
            } else if (rs[i].deptName === '市国土局') {
              dept.icon = require('../images/deptLogo/guoTuJu.png')
            } else if (rs[i].deptName === '市海洋与渔业局') {
              dept.icon = require('../images/deptLogo/haiYangYuYeJu.png')
            } else if (rs[i].deptName === '市环保局') {
              dept.icon = require('../images/deptLogo/huanBaoJu.png')
            } else if (rs[i].deptName === '市交通局') {
              dept.icon = require('../images/deptLogo/jiaoTongJu.png')
            } else if (rs[i].deptName === '市食药监局') {
              dept.icon = require('../images/deptLogo/shiYaoJianJu.png')
            } else if (rs[i].deptName === '市水利局') {
              dept.icon = require('../images/deptLogo/shuiLiJu.png')
            } else if (rs[i].deptName === '市司法局') {
              dept.icon = require('../images/deptLogo/siFaJu.png')
            } else if (rs[i].deptName === '市统计局') {
              dept.icon = require('../images/deptLogo/tongJiJu.png')
            } else if (rs[i].deptName === '市质监局') {
              dept.icon = require('../images/deptLogo/zhiJianJu.png')
            } else {
              dept.icon = require('../images/deptLogo/default.png')
            }
            departsList.push(dept)
          }
          this.departsList = departsList
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .dept {
    margin-top: -10px;
    margin-left: -15px;
  }

  .dept .deptItem {
    float: left;
    display: block;
    width: 188px;
    margin-left: 15px;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .dept .deptItem:hover {
    padding-bottom: 10px;
    background: #edf6fb;
    border-bottom: 0;
    transition: background .3s;
  }

  .dept .icon {
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .dept .icon img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .dept .num {
    float: right;
    display: inline-block;
    max-width: 40px;
    min-width: 12px;
    height: 24px;
    margin-top: 8px;
    padding: 0 4px;
    background: #d6f2fd;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #008fe4;
    text-align: center;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dept .deptName {
    display: block;
    font-size: 16px;
    color: #333;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dept .deptItem:hover .num {
    background: #15a6fc;
    color: #fff;
  }

  .dept .deptItem:hover .deptName {
    color: #15a6fc;
  }
</style>
