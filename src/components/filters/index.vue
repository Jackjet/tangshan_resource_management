<template>
  <div>
    <div class="filter-type">
      <div class="header">
        <div class="icon_left"></div>
        <span>共享类型</span>
        <div class="hideFlex" @click="hideShowFilter('filter-type')"></div>
      </div>
      <div class="list">
        <ul>
          <li @click="selectCondition({dictCode:'-1',dictName:'不限',id:-1}, 'types')">
            <span :class="{'active': !conditions.types || conditions.types.id === -1}">不限</span>
          </li>
          <li @click="selectCondition({dictCode:'01',dictName:'无条件共享',id:1}, 'types')">
            <span :class="{'active': conditions.types.id === 1}">无条件共享</span>
          </li>
          <li @click="selectCondition({dictCode:'02',dictName:'有条件共享',id:2}, 'types')">
            <span :class="{'active': conditions.types.id === 2}">有条件共享</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-base">
      <div class="header">
        <div class="icon_left"></div>
        <span>基础类别</span>
        <div class="hideFlex" @click="hideShowFilter('filter-base')"></div>
      </div>

      <div class="list">
        <ul>
          <li @click="selectCondition({id: -1}, 'base')">
            <span :class="{'active': !conditions.base || conditions.base.id === -1}">不限</span>
          </li>
          <li v-for="item in baseList" @click="selectCondition(item, 'base')">
            <span :class="{'active': conditions.base.id === item.id}" :title="item.name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-depart">
      <div class="header">
        <div class="icon_left"></div>
        <span>部门</span>
        <div class="hideFlex" @click="hideShowFilter('filter-depart')"></div>
      </div>
      <div class="list">
        <div class="input_search">
          <img src="../../assets/images/icons/ico_search.svg" alt="" @click="searchKeywordDep(this.keywordInputDep)">
          <input type="text" v-model="keywordInputDep" id="keywordInputDep" class="input_back" placeholder="请输入部门...">
        </div>

        <ul>
          <li @click="selectCondition({id: -1}, 'deps')">
            <span :class="{'active': !conditions.deps || conditions.deps.dep_code === -1}">不限</span>
          </li>
          <li v-for="item in departs" @click="selectCondition(item, 'deps')">
            <span :class="{'active': conditions.deps.dep_code === item.dep_code}" :title="item.name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-topic">
      <div class="header">
        <div class="icon_left"></div>
        <span>主题领域</span>
        <div class="hideFlex" @click="hideShowFilter('filter-topic')"></div>
      </div>
      <div class="list">
        <ul>
          <li @click="selectCondition({id: -1}, 'topic')">
            <span :class="{'active': !conditions.topic || conditions.topic.id === -1}">不限</span>
          </li>
          <li v-for="item in topicList" @click="selectCondition(item, 'topic')">
            <span :class="{'active': +conditions.topic.id === item.id}" :title="item.name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-tag">
      <div class="header">
        <div class="icon_left"></div>
        <span>关键字</span>
        <div class="hideFlex" @click="hideShowFilter('filter-tag')"></div>
      </div>
      <div :class="[{'expand': moreTagsFlag}, 'list']">
        <div class="input_search">
          <img src="../../assets/images/icons/ico_search.svg" alt="" @click="searchKeyword(this.keywordInput)">
          <input type="text" v-model="keywordInput" id="keywordInput" class="input_back" placeholder="请输入关键字...">
        </div>
        <ul :class="{'scroll': moreTagsFlag}">
          <li @click="selectCondition({id: -1}, 'tag')">
            <span :class="{'active': !conditions.tag || conditions.tag.tagId === -1}">不限</span>
          </li>
          <li v-for="item in tags" @click="selectCondition(item, 'tag')">
            <span :class="{'active': conditions.tag.tagId === item.tagId}" :title="item.name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import Axios from 'axios'
  import API from '@/common/api'

  export default {
    props: ['params'],
    data() {
      return {
        moreTagsFlag: false,
        conditions: this.params,
        topicList: '',
        departs: '',
        baseList: '',
        tags: '',
        keywordInput:'',
        keywordInputDep:''
      }
    },
    created() {
      Axios.all([
        API.Resdoc.getTypeList(),
        API.Dict.getTags()]).then(Axios.spread((item, tags) => {
        this.topicList = item.result.topicList;
        this.departs = item.result.departList;
        this.baseList = item.result.baseList;
        this.tags = tags.result;
      }));
      this.handleDefaultCondition();
    },
    methods: {
      selectCondition(item, type) {
        this.conditions[type] = item;
        this.$emit('conditions', this.conditions)
      },
      handleDefaultCondition() {
        Object.keys(this.conditions).forEach((item) => {
          if (this.conditions[item]) {
            switch (item) {
              case 'topic':
                let defaultVal = _.find(this.topicList, (cate) => {
                  return cate.id === this.conditions[item].id
                });
                defaultVal && this.selectCondition(defaultVal, 'topic');
                break;
              case 'tag':
                break;
              case 'deps':
                let defaultVal2 = _.find(this.departs, (cate2) => {
                  return cate2.id === this.conditions[item].dep_code
                });
                defaultVal2 && this.selectCondition(defaultVal2, 'deps');
                break;
              case 'base':
                let defaultVal3 = _.find(this.baseList, (cate3) => {
                  return cate3.id === this.conditions[item].id
                });
                defaultVal3 && this.selectCondition(defaultVal3, 'base');
                break;
              case 'types':
                break
            }
          }
        })
      },
      hideShowFilter(param){
        if ( $('.'+param+' .list').is(":hidden")){
          $('.'+param+' .header .hideFlex').css('transform','rotate(0)');
          $('.'+param+' .list').fadeIn(500);

        }else{
          $('.'+param+' .header .hideFlex').css('transform','rotate(180deg)');
          $('.'+param+' .list').fadeOut(500);
        }
      },
      searchKeyword(name){
        var nameValue = name.value
        API.Dict.getTags({name:nameValue}).then(res => {
          this.tags = res.result;
        });
      },
      searchKeywordDep(name){
        var nameValue = name.value
        API.Resdoc.getTypeList({name:nameValue,type:3}).then(res => {
          this.departs = res.result.departList;
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/common.less';
  @import '~@/assets/less/variables.less';

  .header {
    padding: 0 20px;
    height: 46px;
    line-height: 46px;
    span {
      color: #000000;
      font-size: 16px;
    }
  }

  .filter-depart {
    width: 165px;
    background: #fff;
    margin-bottom: 16px;
    overflow: auto;
    .header {
      height: 46px;
      background: url(../../assets/images/tittle_bg.svg) no-repeat;
      .icon_left {
        background: url(../../assets/images/ico_bmlx.svg) left center no-repeat;
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 17px;
        margin-right: 8px;
      }
      .hideFlex {
        background: url(../../assets/images/icons/ico_up.svg) left center no-repeat;
        display: inline-block;
        width: 13px;
        height: 6px;
        float: right;
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .list {
      min-height: 100px;
      padding: 15px 10px;
      max-height: 425px;
      li {
        &:not(:first-child) {
          float: left;
        }
        span {
          border: 1px solid #fff;
          padding: 0 10px;
          // height: 32px;
          line-height: 32px;
          display: inline-block;
          cursor: pointer;
          font-size: 12px;
          &:hover,
          &.active {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 170, 113, 1);
          }
        }

      }
    }
    .input_back{
      padding-left: 3px;
      width: 140px;
      height: 30px;
      border: 1px solid #fff;
      border-bottom: 1px solid rgba(204,204,204,1);
      padding-right: 18px;
      font-size: 12px;
    }
  .input_search{
    position: relative;
    margin-bottom: 20px;
  }
  .input_search img{
    position: absolute;
    top: 6px;
    right: 7px;
    cursor: pointer;
  }
  }

  .filter-base {
    width: 165px;
    background: #fff;
    margin-bottom: 16px;
    overflow: auto;
    .header {
      height: 46px;
      background: url(../../assets/images/tittle_bg.svg) no-repeat;
      .icon_left {
        background: url(../../assets/images/ico_jclb.svg) left center no-repeat;
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 17px;
        margin-right: 8px;
      }
      .hideFlex {
        background: url(../../assets/images/icons/ico_up.svg) left center no-repeat;
        display: inline-block;
        width: 13px;
        height: 6px;
        float: right;
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .list {
      min-height: 200px;
      padding: 15px 10px;
      max-height: 425px;
      li {
        &:not(:first-child) {
          float: left;
        }
        span {
          border: 1px solid #fff;
          padding: 0 5px;
          // height: 32px;
          line-height: 32px;
          display: inline-block;
          cursor: pointer;
          font-size: 12px;
          &:hover,
          &.active {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 170, 113, 1);
          }
        }

      }
    }
  }

  .filter-type {
    width: 165px;
    background: #fff;
    margin-bottom: 16px;
    .header {
      height: 46px;
      background: url(../../assets/images/tittle_bg.svg) no-repeat;
      .icon_left {
        background: url(../../assets/images/ico_gxzy.svg) left center no-repeat;
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 17px;
        margin-right: 8px;
      }
      .hideFlex {
        background: url(../../assets/images/icons/ico_up.svg) left center no-repeat;
        display: inline-block;
        width: 13px;
        height: 6px;
        float: right;
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .list {
      min-height: 50px;
      padding: 15px 10px;
      // height: 60px;
      ul {
        overflow: hidden;
      }
      li {
        &:nth-child(3n) {
          margin-left: 5%;
        }
        &:not(:first-child) {
          float: left;
        }
        span {
          border: 1px solid #fff;
          height: 32px;
          display: inline-block;
          cursor: pointer;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          &:hover,
          &.active {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 170, 113, 1);
          }
        }
      }
    }
  }

  .filter-topic{
    width: 165px;
    background: #fff;
    margin-bottom: 16px;
    .header {
      height: 46px;
      background: url(../../assets/images/tittle_bg.svg) no-repeat;
      .icon_left {
        background: url(../../assets/images/ico_ztly.svg) left center no-repeat;
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 17px;
        margin-right: 8px;
      }
      .hideFlex {
        background: url(../../assets/images/icons/ico_up.svg) left center no-repeat;
        display: inline-block;
        width: 13px;
        height: 6px;
        float: right;
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .list {
      padding: 15px 10px;
      // max-height: 60px;
      ul {
        overflow: hidden;
      }
      li {
        &:not(:first-child) {
          float: left;
        }
        span {
          width: 100%;
          border: 1px solid #fff;
          padding: 0 10px;
          height: 32px;
          line-height: 32px;
          display: inline-block;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size:12px;
          &:hover,
          &.active {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 170, 113, 1);
          }
        }
      }
    }
  }

  .filter-tag {
    margin-top: 12px;
    width: 165px;
    background: #fff;
    margin-bottom: 16px;
    .header {
      height: 46px;
      background: url(../../assets/images/tittle_bg.svg) no-repeat;
      .icon_left {
        background: url(../../assets/images/ico_gxzy.svg) left center no-repeat;
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 17px;
        margin-right: 8px;
      }
      .hideFlex {
        background: url(../../assets/images/icons/ico_up.svg) left center no-repeat;
        display: inline-block;
        width: 13px;
        height: 6px;
        float: right;
        margin-top: 20px;
        cursor: pointer;
      }
    }
    .input_back{
      padding-left: 3px;
      width: 140px;
      height: 30px;
      border: 1px solid #fff;
      border-bottom: 1px solid rgba(204,204,204,1);
      padding-right: 18px;
      font-size: 12px;
    }
    .input_search{
      position: relative;
      margin-bottom: 20px;
    }
    .input_search img{
      position: absolute;
      top: 6px;
      right: 7px;
      cursor: pointer;
    }
    .list {
      padding: 15px 10px;
      min-height: 220px;
      // padding-bottom: 30px;
      overflow: hidden;
      position: relative;
      &.expand {
        height: 550px;
      }
      .tags-more {
        position: absolute;
        right: 10px;
        bottom: 10px;
        a {
          color: @linkColor;
        }
      }
      ul {
        overflow: hidden;
        max-height: 175px;
        &.scroll {
          height: auto;
          max-height: 500px;
          overflow: auto;
        }
      }
      li {
        &:not(:first-child) {
          float: left;
        }
        span {
          width: 100%;
          border: 1px solid #fff;
          padding: 0 10px;
          height: 32px;
          line-height: 32px;
          display: inline-block;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          &:hover,
          &.active {
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(0, 170, 113, 1);
          }
        }
      }
    }
  }
</style>
