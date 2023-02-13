<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix" style="margin-top: 17px;margin-bottom: 28px;padding-left: 15px;">
      <span class="col3">/</span>
      <router-link tag="span" :to="{ name: 'home' }">
        <a href="javascript:;">首页</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">资源目录</a>
      <el-input type="text" placeholder="请输入目录名称" @keyup.enter="keySearch" v-model="name" v-model.trim="name" style="width: 300px;margin-left: 62%;">
        <template slot="append">
          <el-button v-on:click="keySearch" icon="el-icon-search"></el-button>
        </template>
      </el-input>
      <!--<span class="" id="showGlobalSearch" style="height: 35px" @keyup.enter="keySearch">
        <el-input
          id="globalSearch"
          placeholder="请输入关键字"
          v-model="name"
          v-model.trim="name">
        </el-input>
        <span class="searchBtn" style="height: 27px;" v-on:click="handleSelect"></span>
      </span>-->
      <!-- <div class="goSearchDiv">
           <span  id="goSearch" @click="goGlobalSearch"></span>
         </div>-->
    </div>

    <div id="resource_view">
      <div class="demo">
        <div class="demo-warp">
          <div class="demo-flex">
            <div class="demo-title">资源共享类型：</div>
            <div class="demo-content">
              <div class="demo-tab" style="z-index:3">
                <!--<span @click="tabClick(0,0,'baseList')" name="baseList" id="baseList_0" :class="{'demo-active': true}">不限</span>-->
                <span v-for="(v,k) in shareTypeList" :key="k" name="shareType" :id="'shareType_'+v.id" :class="{'demo-active': v.active }" @click="tabClick(v,k,'shareType')">{{v.name}}</span>
              </div>
              <div class="" v-show="isLongContent">
                <el-input type="text" placeholder="部门搜索" v-model="deptName" v-model.trim="deptName">
                  <template slot="append">
                    <el-button @click="deptNameSearch" icon="el-icon-search"></el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </div>

          <div class="demo-flex">
            <div class="demo-title">基础类别：</div>
            <div class="demo-content">
              <div class="demo-tab" style="z-index:2">
                <!--<span @click="tabClick(0,0,'shareType')" name="shareType" id="shareType_0"-->
                <!--:class="{'demo-active': true}">不限</span>-->
                <span v-for="(v,k) in baseList" :key="k" @click="tabClick(v,k,'baseList')" :class="{'demo-active': v.active }" name="baseList" :id="'baseList_'+v.id">{{v.name}}</span>
                <!--<span @click="tabClick('2','','shareType')" name="shareType" :id="'shareType_2'">有条件共享</span>-->
                <!--<span @click="tabClick('3','','shareType')" name="shareType" :id="'shareType_3'">不予共享</span>-->
              </div>
            </div>
          </div>

          <div class="demo-flex">
            <div class="demo-title">主题领域：</div>
            <div class="demo-content">
              <div class="demo-tab" id="topicId" style="z-index:1">
                <!--<span @click="tabClick(0,0,'topicList')" name="topicList" id="topicList_0"-->
                <!--:class="{'demo-active': true}">不限</span>-->
                <span v-for="(v,k) in topicList" :key="k" name="topicList" :id="'topicList_'+v.id" :class="{'demo-active': v.active }" @click="tabClick(v,1,'topicList')">{{v.name}}</span>
              </div>
              <div class="control" v-show="isLongContentTopic" :class="{'show-more' : showMoreTopic}">
                <el-button type="text" @click="_toggleShowMore('1')">{{ showMoreTopic ? '收起' : '展开'}}</el-button>
              </div>
            </div>
          </div>

          <div class="demo-flex">
            <div class="demo-title">所属部门：</div>
            <div class="demo-content" id="depart">
              <div class="demo-tab" id="departId">
                <!--<span @click="tabClick(0,0,'departList')" name="departList" id="departList_0"-->
                <!--:class="{'demo-active': true}">不限</span>-->
                <!--<cascaderMulti v-for="(v,k) in departList" :key="k" @handleChangeEndCode="array => end_code = array" :data="end_codes" :placeholder="v.name"></cascaderMulti>-->
                <span v-for="(v,k) in departList" :key="k" name="departList" :id="'departList_'+v.dep_id" :class="{'demo-active': v.active }" @click="tabClick(v,1,'departList')">{{v.name}}
                </span>
              </div>
              <div class="control departMore" v-show="isLongContent" :class="{'show-more' : showMore}">
                <el-button type="text" @click="_toggleShowMore('2')">{{ showMore ? '收起' : '展开'}}</el-button>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
      <div class="res_position">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="listTabs">
          <div class="tag_group">
            <el-tag v-for="tag in tags" :key="tag.name" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
          </div>
          <el-tab-pane label="最新上线" name="update_time">
            <view-layout :view-data="viewList" :view-time="viewTime"></view-layout>
            <div class="bottom_pagination">
            </div>
          </el-tab-pane>
          <el-tab-pane label="关注量" name="attention_count">
            <view-layout :view-data="viewList" :view-time="viewTime"></view-layout>
            <div class="bottom_pagination">
            </div>
          </el-tab-pane>
          <el-tab-pane label="浏览量" name="view_count">
            <view-layout :view-data="viewList" :view-time="viewTime"></view-layout>
            <div class="bottom_pagination">
            </div>
          </el-tab-pane>

        </el-tabs>
        <div class="isHasRes">
          <el-checkbox v-model="isHasResourceChecked" class="checkboxIsHasRes">有资源</el-checkbox>
          <!-- <div class="res_pageTurn">
            <div class="rescatalog_prev" @click="jumpPageRes(param.page-1)">
              <img src="../../assets/images/icons/ico_left_sel.svg" alt="">
            </div>
            <div class="rescatalog_next" @click="jumpPageRes(param.page+1)">
              <img src="../../assets/images/icons/ico_right_sel.svg" alt="">
            </div>
          </div> -->

        </div>
      </div>

      <paginate v-show="pageInfo.totalPage > 0" :page-count="pageInfo.totalPage" :click-handler="jumpPage" :prev-text="'上一页'" :next-text="'下一页'" :container-class="'pagination'">
      </paginate>
    </div>
  </div>
</template>
<script>
import viewLayout from '@/components/resCataItem'
import API from '@/common/api'
import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
export default {
  name: 'resCatalog',
  components: {
    ElInput,
    viewLayout
  },
  data() {
    return {
      name: '',
      departIdActive: true,
      brandFold: true,
      showMore: false,
      showMoreTopic: false,
      isLongContent: false,
      isLongContentTopic: false,
      isShow: false,
      oldArray: [],
      newArray: [],
      deptName: '',
      shareTypeList: [
        {
          id: 0,
          name: "不限",
          active: true
        },
        {
          id: 1,
          name: "无条件共享",
          active: false
        },
        {
          id: 2,
          name: "有条件共享",
          active: false
        },
        {
          id: 3,
          name: "不予共享",
          active: false
        }
      ],
      baseList: [{
        id: 0,
        name: "不限",
        active: true
      }],
      topicList: [{
        id: 0,
        name: "不限",
        active: true
      }],
      departList: [
        {
          dep_id: 0,
          name: "不限",
          active: true
        }
      ],
      depList: [],
      activeName: 'update_time',
      hasRes: false,
      tags: [],
      viewList: [],
      viewTime: {
        time: true,
        msg: '数据拼命加载中...'
      },
      pageInfo: {
        totalSize: 4,
        totalPage: 1,
        currentPage: 1
      },
      param: {
        page: 1,
        pageSize: 20
      },
      isHasResourceChecked: false,
      end_codes: [
        {
          value: 1000,
          label: "1",
          children: [{
            label: "11",
            value: 1100,
            children: [{
              label: "111",
              value: 1100,
              children: [],
              multiple: true //可忽略项，当为true时该项为多选
            }, {
              label: "112",
              value: 1100,
              children: [],
              multiple: true //可忽略项，当为true时该项为多选
            }],
            multiple: true //可忽略项，当为true时该项为多选
          }, {
            label: "12",
            value: 1100,
            children: [],
            multiple: true //可忽略项，当为true时该项为多选
          }]
        },
        {
          value: 1000,
          label: "2",
          children: [{
            label: "21",
            value: 1100,
            children: [],
            multiple: true //可忽略项，当为true时该项为多选
          }]
        }
      ],
      end_code: []
    }
  },
  created() {
    API.Resdoc.getTypeList({}).then((res) => {
      this.baseList = this.baseList.concat(res.result.baseList);
      this.topicList = this.topicList.concat(res.result.topicList);
      this.departList = this.departList.concat(res.result.departList);
      this.depList = this.depList.concat(res.result.departList);
      for (var i = 1; i < this.baseList.length; i++) {
        if (this.$route.params.type === 'baseList' && this.baseList[i]['id'] === this.$route.params.id) {
          this.baseList[i]['active'] = true;
          this.tags.push(this.baseList[i].name)
        } else {
          this.baseList[i]['active'] = false;
        }
      }
      for (var i = 1; i < this.topicList.length; i++) {
        if (this.$route.params.type === 'topicList' && this.topicList[i]['id'] === this.$route.params.id) {
          this.topicList[i]['active'] = true;
          this.tags.push(this.topicList[i].name)
        } else {
          this.topicList[i]['active'] = false;
        }
      }
      for (var i = 1; i < this.departList.length; i++) {
        if (this.$route.params.type === 'departList' && this.departList[i]['dep_id'] === this.$route.params.id) {
          this.departList[i]['active'] = true;
          this.tags.push(this.departList[i].name)
        } else {
          this.departList[i]['active'] = false;
        }
      }
      if (this.$route.params.type === 'baseList') {
        this.baseList[0]['active'] = false;
      } else if (this.$route.params.type === 'topicList') {
        this.topicList[0]['active'] = false;
      } else if (this.$route.params.type === 'departList') {
        this.departList[0]['active'] = false;
      }
      this.getDataList();
      this._calculateHeight()
    })
  },
  mounted() {
    this.setTime(1000, 0, false)
  },
  watch: {
    param: {
      handler() {
        this.getDataList()
      },
      deep: true
    },
    isHasResourceChecked: {
      handler() {
        this.getDataList()
      },
      deep: true
    }
  },
  methods: {
    keySearch() {
      this.getDataList()
    },
    changeFoldState() {
      this.brandFold = !this.brandFold
    },
    _calculateHeight() {
      // $nextTick()，等待内容获取完毕再计算高度，异步处理
      this.$nextTick().then(() => {
        let contentHeight = $('#departId').height()
        let contentHeightTopic = $('#topicId').height()
        if (contentHeight > 30) {
          document.getElementById("departId").style.height = "30px"
          this.isLongContent = true
        } else {
          this.isLongContent = false
        }
        if (contentHeightTopic > 40) {
          document.getElementById("topicId").style.height = "40px"
          this.isLongContentTopic = true
        } else {
          this.isLongContentTopic = false
        }
      })
    },
    _toggleShowMore(val) {
      if (val === '1') {
        if (this.showMoreTopic == false) {
          document.getElementById("topicId").style.height = "auto"
          this.showMoreTopic = !this.showMoreTopic
        } else {
          document.getElementById("topicId").style.height = "40px"
          this.showMoreTopic = !this.showMoreTopic
        }
      } else {
        if (this.showMore == false) {
          document.getElementById("departId").style.height = "auto"
          this.showMore = !this.showMore
        } else {
          document.getElementById("departId").style.height = "30px"
          this.showMore = !this.showMore
        }
      }

    },
    tabClick(obj, k, type) {
      if (type == 'baseList' || type == 'topicList' || type == 'shareType') {
        if (obj !== 0 && obj.id !== 0) {
          this.addClass(type, obj.id);
        } else {
          this.removeClass(type);
        }
      } else if (type == 'departList') {
        if (obj !== 0 && obj.dep_id !== 0) {
          this.addClass(type, obj.dep_id);
        } else {
          this.removeClass(type);
        }
      }
      this.getDataList();
    },
    getDataList() {
      var baseIds = '', topicIds = '', deptIds = '', shareType = '';
      for (var i = 1; i < this.baseList.length; i++) {
        if (this.baseList[i].active === true) {
          baseIds += this.baseList[i].id + ",";
        }
      }
      for (var i = 1; i < this.topicList.length; i++) {
        if (this.topicList[i].active === true) {
          topicIds += this.topicList[i].id + ",";
        }
      }
      for (var i = 1; i < this.shareTypeList.length; i++) {
        if (this.shareTypeList[i].active === true) {
          shareType += "0" + this.shareTypeList[i].id + ",";
        }
      }
      for (var i = 1; i < this.departList.length; i++) {
        if (this.departList[i].active === true) {
          deptIds += this.departList[i].dep_id + ",";
        }
      }
      API.Resdoc.getDataList({
        "name": this.name,
        "baseIds": baseIds,
        "topicIds": topicIds,
        "deptIds": deptIds,
        "shareType": shareType,
        "order": this.activeName,
        "hasRes": this.isHasResourceChecked,
        "pageSize": this.param.pageSize,
        "page": this.param.page
      }).then((res) => {
        this.viewList = res.result.records
        this.pageInfo.totalSize = res.result.total
        this.pageInfo.totalPage = res.result.pages
        this.pageInfo.currentPage = res.result.current
      })
    },
    addClass(type, id) {
      var count = 0;
      if (type == 'baseList') {
        for (var i = 1; i < this.baseList.length; i++) {
          if (this.baseList[i].id === id) {
            if (this.baseList[i].active === true) {
              this.baseList[i]['active'] = false;
              this.tags.splice(this.tags.indexOf(this.baseList[i].name), 1);
            } else {
              this.baseList[i]['active'] = true;
              this.tags.push(this.baseList[i].name);
            }
          }
          if (this.baseList[i].active === true) {
            count++;
          }
        }
        if (count === 0) {
          this.baseList[0]['active'] = true;
        } else {
          this.baseList[0]['active'] = false;
        }
      } else if (type == 'shareType') {
        for (var i = 1; i < this.shareTypeList.length; i++) {
          if (this.shareTypeList[i].id === id) {
            if (this.shareTypeList[i].active === true) {
              this.shareTypeList[i]['active'] = false;
              this.tags.splice(this.tags.indexOf(this.shareTypeList[i].name), 1);
            } else {
              this.shareTypeList[i]['active'] = true;
              this.tags.push(this.shareTypeList[i].name);
            }
          }
          if (this.shareTypeList[i].active === true) {
            count++;
          }
        }
        if (count === 0) {
          this.shareTypeList[0]['active'] = true;
        } else {
          this.shareTypeList[0]['active'] = false;
        }
      } else if (type == 'topicList') {
        for (var i = 1; i < this.topicList.length; i++) {
          if (this.topicList[i].id === id) {
            if (this.topicList[i].active === true) {
              this.topicList[i]['active'] = false;
              this.tags.splice(this.tags.indexOf(this.topicList[i].name), 1);
            } else {
              this.topicList[i]['active'] = true;
              this.tags.push(this.topicList[i].name);
            }
          }
          if (this.topicList[i].active === true) {
            count++;
          }
        }
        if (count === 0) {
          this.topicList[0]['active'] = true;
        } else {
          this.topicList[0]['active'] = false;
        }
      } else if (type == 'departList') {
        for (var i = 1; i < this.departList.length; i++) {
          if (this.departList[i].dep_id === id) {
            if (this.departList[i].active === true) {
              this.departList[i]['active'] = false;
              this.tags.splice(this.tags.indexOf(this.departList[i].name), 1);
            } else {
              this.departList[i]['active'] = true;
              this.tags.push(this.departList[i].name);
            }
          }
          if (this.departList[i].active === true) {
            count++;
          }
        }
        if (count === 0) {
          this.departList[0]['active'] = true;
        } else {
          this.departList[0]['active'] = false;
        }
      }
    },
    removeClass(type) {
      if (type == 'baseList') {
        this.baseList[0]['active'] = true;
        for (var i = 1; i < this.baseList.length; i++) {
          this.baseList[i]['active'] = false;
          this.tags.splice(this.tags.indexOf(this.baseList[i].name), 1);
        }
      } else if (type == 'shareType') {
        this.shareTypeList[0]['active'] = true;
        for (var i = 1; i < this.shareTypeList.length; i++) {
          this.shareTypeList[i]['active'] = false;
          this.tags.splice(this.tags.indexOf(this.shareTypeList[i].name), 1);
        }
      } else if (type == 'topicList') {
        this.topicList[0]['active'] = true;
        for (var i = 1; i < this.topicList.length; i++) {
          this.topicList[i]['active'] = false;
          this.tags.splice(this.tags.indexOf(this.topicList[i].name), 1);
        }
      } else if (type == 'departList') {
        this.departList[0]['active'] = true;
        for (var i = 1; i < this.departList.length; i++) {
          this.departList[i]['active'] = false;
          this.tags.splice(this.tags.indexOf(this.departList[i].name), 1);
        }
      }
    },
    deptNameSearch() {
      var deptList = [{
        dep_id: 0,
        name: "不限",
        active: true
      }];
      for (var i = 1; i < this.depList.length; i++) {
        this.depList[i]['active'] = false;
        this.tags.splice(this.tags.indexOf(this.depList[i].name), 1);
        if (this.deptName == '' || this.depList[i].name.indexOf(this.deptName) != -1) {
          deptList.push(this.depList[i])
        }
      }
      this.departList = deptList;
      this.getDataList();
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      var count = 0;
      for (var i = 1; i < this.baseList.length; i++) {
        if (this.baseList[i].name === tag) {
          this.baseList[i]['active'] = false;
        }
        if (this.baseList[i].active === true) {
          count++;
        }
      }
      if (count === 0) {
        this.baseList[0]['active'] = true;
      }
      count = 0;
      for (var i = 1; i < this.topicList.length; i++) {
        if (this.topicList[i].name === tag) {
          this.topicList[i]['active'] = false;
        }
        if (this.topicList[i].active === true) {
          count++;
        }
      }
      if (count === 0) {
        this.topicList[0]['active'] = true;
      }
      count = 0;
      for (var i = 1; i < this.shareTypeList.length; i++) {
        if (this.shareTypeList[i].name === tag) {
          this.shareTypeList[i]['active'] = false;
        }
        if (this.shareTypeList[i].active === true) {
          count++;
        }
      }
      if (count === 0) {
        this.shareTypeList[0]['active'] = true;
      }
      count = 0;
      for (var i = 1; i < this.departList.length; i++) {
        if (this.departList[i].name === tag) {
          this.departList[i]['active'] = false;
        }
        if (this.departList[i].active === true) {
          count++;
        }
      }
      if (count === 0) {
        this.departList[0]['active'] = true;
      }
      this.getDataList();
    },
    handleClick(tab, event) {
      this.getDataList();
    },
    jumpPageRes(page) {
      if (this.pageInfo.totalPage >= page && page > 0) {
        var arr = document.getElementsByClassName("pagination");
        for (var i = 0; i < arr.length; i++) {
          var temp = arr[i].children;
          temp[page].children[0].click();
        }
      }
    },
    jumpPage(page) {
      this.param.page = page;
    },

    // 模拟延时显示数据视图
    setTime(startTime, endTime, bool) {
      setTimeout(() => {
        this.viewTime.time = bool
        setTimeout(() => {
          this.viewTime.time = false
        }, endTime)
      }, startTime)
    }
  }
}
</script>
<style>
.listTabs .el-tabs__active-bar {
  background-color: transparent !important;
}
.listTabs .el-tabs__nav {
  float: right !important;
  margin-right: 130px !important;
}
.listTabs .el-tabs__item {
  line-height: 48px;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#resource_view {
  font-size: 14px;
}
.res_position .el-tabs__item {
  font-size: 10px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.tag_group .el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 5px;
}
.tag_group .el-tag {
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  padding: 0px 5px;
}
.tag_group .el-tag {
  /*width:122px;*/
  /*height:40px;*/
  background: rgba(0, 170, 113, 0.05);
  border-radius: 2px;
  border: 1px solid rgba(0, 170, 113, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 170, 113, 1);
}
.tag_group .el-tag .el-icon-close {
  color: rgba(0, 170, 113, 1);
  right: 1px;
}
.tag_group .el-tag .el-icon-close:hover {
  background-color: rgba(0, 170, 113, 0.05);
}
.bottom_pagination {
  text-align: center;
}
.bottom_pagination
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background: rgba(0, 170, 113, 1);
  border-radius: 6px;
  font-size: 14px;
  font-family: HelveticaNeue;
  color: rgba(255, 255, 255, 1);
}
.bottom_pagination
  .el-pagination.is-background
  .el-pager
  li:not(.disabled):hover {
  font-size: 14px;
  font-family: HelveticaNeue;
  color: rgba(51, 51, 51, 1);
}
/* 过滤列表:start */
.demo {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  min-height: 140px;
  height: auto !important;
  height: 140px;
  background-color: #fff;
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  padding: 0 16px;
}

.demo-warp {
  display: flex;
  max-width: 1200px;
  /*margin: auto;*/
  height: 100%;
  flex-direction: column;
  padding: 15px 0;
}

.demo-flex {
  /*display: flex;*/
  margin-bottom: 15px;
}

.demo-flex:last-of-type {
  margin-bottom: 0;
}

.demo-title {
  margin-top: 5px;
  width: 100px;
  float: left;
  font-size: 14px;
}

.demo-content {
  display: flex;
  /*flex: 1;*/
  position: relative;
}
.demo-tab {
  flex: 1;
  margin-right: 15px;
  min-height: 35px;
  overflow: hidden;
}

.demo-tab span {
  display: inline-block;
  margin: 0 5px 2px 5px;
  cursor: pointer;
  padding: 4px 5px;
  font-size: 14px;
  color: #999999;
}

.demo-more {
  margin-top: 5px;
  cursor: pointer;
}
.demo-active {
  color: #00ab6e !important;
  border-radius: 3px;
  border: 1px solid #00ab6e;
}
.demo-hide {
  min-height: 35px;
  height: auto !important;
}
.res_position {
  position: relative;
}
.isHasRes {
  position: absolute;
  top: 9px;
  right: 0;
}
.res_pageTurn {
  float: right;
  margin-top: 5px;
}
.rescatalog_prev {
  float: left;
  width: 17px;
  height: 17px;
  background: rgba(237, 237, 237, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  text-align: center;
  line-height: 17px;
  margin-right: 1px;
  cursor: pointer;
}
.rescatalog_next {
  float: left;
  width: 17px;
  height: 17px;
  background: rgba(0, 170, 113, 0.05);
  border: 1px solid rgba(0, 170, 113, 1);
  text-align: center;
  line-height: 17px;
  cursor: pointer;
}
</style>
<style lang="less">
.isHasRes .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #00ac75;
  border-color: #00ac75;
}
.isHasRes .el-checkbox__inner:hover {
  border-color: #00ac75;
}
.isHasRes .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #00ac75;
}
.isHasRes label {
  margin-right: 17px;
}
.el-tabs__item.is-active {
  color: rgba(0, 170, 113, 1);
}
.el-tabs__active-bar {
  background-color: rgba(0, 170, 113, 1);
}
.el-tabs__item:hover {
  color: rgba(0, 170, 113, 1);
}
.control {
  position: absolute;
  bottom: 0;
  width: 100%;
  // padding-top: 160px;
  text-align: right;
  // background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
  &.show-more {
    padding-top: 0;
    background: none;
  }
}

.departIdActive {
  overflow: hidden;
}
.departMore {
  width: auto;
  right: 0;
  bottom: 10px;
}
.searchBtn {
  width: 11px;
  height: 11px;
  background: url(../../assets/images/icons/ico_search.svg) no-repeat center
    center;
  position: absolute;
  top: 7px;
  cursor: pointer;
  left: 5px;
  background-size: 11px 11px;
}
</style>
