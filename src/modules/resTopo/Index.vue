<template>
  <el-container class="wrapper">
    <el-aside width="250px" style="margin-right: 10px;background-color: #ffffff;margin-top: 10px">
      <DeptAndTheme :departs="departs" :category="categorys"  v-on:my-handleClickTab="handleClick" v-on:my-handleButtonClick="handleNodeClick"></DeptAndTheme>
    </el-aside>
    <el-container>
      <el-header style="background-color: #ffffff;margin: 10px 0px;display: flex;align-items: center;position: relative">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="float: left;width: 80%">
          <el-breadcrumb-item  v-for="(item, index) in items" :key="index">
            <a v-if="index === 0" @click="back">{{item.name}}</a>
            <a v-else="index === 0">{{item.name}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-button id="switchBtn" size="small" round @click="switchView">资源查看</el-button>
      </el-header>
      <el-main   style="background-color: #ffffff">
        <AllView v-if="isTopo" ref="allView" :currentId='currentId' :showType='showType' :topoSvgId="topoSvgId" :allResBtnId="allResBtnId" :partResBtnId="partResBtnId"></AllView>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import AllView from '@/components/allView/AllView'
  import DeptAndTheme from '@/modules/count/components/DeptAndTheme'
  import Axios from 'axios'
  import API from '@/common/api'
  export default {
    data () {
      return {
        showType: 'first',
        topoSvgId: 'topoSvgId1',
        allResBtnId: 'allResBtnId1',
        partResBtnId: 'partResBtnId1',
        departs: [],
        categorys: [],
        currentId: '',
        items: [{'name': '按部门'}],
        isTopo: true
      }
    },
    created () {
      if (this.$route.params.currentId) {
        this.currentId = this.$route.params.currentId
      }
      if (this.$route.params.showType) {
        this.showType = this.$route.params.showType
      }
      this.getDepartCategry()
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      switchView () {
        /* if (this.isTopo) {
          $('#switchBtn').text('查看图谱')
        } else {
          $('#switchBtn').text('查看资源')
        }
        this.isTopo = !this.isTopo */
        this.$router.push({name: 'resList'})
      },
      getDepartCategry () {
        let _this = this
        Axios.all([
          API.Dict.getDepsByNode(),
          API.Dict.getCategory({ parentId: 2 }),
          API.Topo.list()])
          .then(Axios.spread((departs, category, list) => {
            _this.departs = departs.result
            _this.categorys = category.result
            var allData = list
            var count = 0
            _this.departs.forEach(function (depart) {
              count = 0
              allData.forEach(function (res) {
                if (depart.dep_code === res.department.typeId) {
                  count++
                }
              })
              depart.dep_name = depart.dep_name + '(' + count + ')'
            })
            _this.categorys.forEach(function (category) {
              count = 0
              allData.forEach(function (res) {
                if ((category.categoryId + '') === res.serviceCategory.typeId) {
                  count++
                }
              })
              category.categoryName = category.categoryName + '(' + count + ')'
            })
          }
        ))
      },
      back () {
        this.currentId = ''
        if (this.showType === 'first') {
          this.items[0] = {'name': '按部门'}
        } else {
          this.items[0] = {'name': '按主题'}
        }
        this.items.splice(1, 1)
      },
      handleClick (active) {
        this.showType = active
        this.currentId = ''
        if (this.showType === 'first') {
          this.items[0] = {'name': '按部门'}
        } else {
          this.items[0] = {'name': '按主题'}
        }
        this.items.splice(1, 1)
      },
      handleNodeClick (node) {
        this.currentId = node.id
        this.items[1] = {'name': node.name}
      }
    },
    components: {
      AllView,
      DeptAndTheme
    }
  }
</script>
<style lang='less' scoped>

</style>
