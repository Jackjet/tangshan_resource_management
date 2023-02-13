<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab" style="margin-top:20px;margin-left: 25px;">
    <el-tab-pane label="按部门" name="first">
    <div style="margin-left: 10px;margin-top: 0px;">
      <div class="header">
        <el-button  size="mini"  type="info" disabled style=" width:160px;">部门</el-button>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in departs" style="margin-top: 15px;margin-bottom: 15px;">
            <el-button size="mini" :title="item.dep_name" style=" width:160px;"
                      @click="handleButtonClick(item.dep_code,item.dep_name)">{{item.dep_name}}</el-button>
          </li>
        </ul>
      </div>
    </div>
    </el-tab-pane>
    <el-tab-pane label="按主题" name="second">
    <div style="margin-left: 10px;margin-top: 0px;">
      <div class="header">
        <el-button  size="mini"  type="info" disabled style=" width:160px;">主题</el-button>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in category" style="margin-top: 15px;margin-bottom: 15px;">
            <el-button size="mini"  :title="item.categoryName" style=" width:160px;"
                       @click="handleButtonClick(item.categoryId,item.categoryName)">{{item.categoryName}}</el-button>
          </li>
        </ul>
      </div>
    </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
//  import Axios from 'axios'
//  import API from '@/common/api'
  export default {
    name: 'DeptAndTheme',
    props: {
      departs: {
        type: Array,
        required: true
      },
      category: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
//        departs: [],
//        category: [],
        activeName: 'first'
      }
    },
    created () {
//      Axios.all([
//        API.Dict.getDepsByNode(),
//        API.Dict.getCategory({ parentId: 2 })]).then(Axios.spread((departs, category) => {
//          this.departs = departs.result
//          this.category = category.result
//        }
//      ))
    },
    methods: {
      handleButtonClick (id, name) {
        this.$emit('my-handleButtonClick', {'id': id, 'name': name})
      },
      handleClickTab () {
        this.$emit('my-handleClickTab', this.activeName + '')
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
