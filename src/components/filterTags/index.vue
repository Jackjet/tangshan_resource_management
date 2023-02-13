<template>
  <div :class="[{'no-filter': !filterFlag}, 'wrapper']">
    <div v-show="filterFlag" class="filter">
      <ul>
        <li v-for="key in keysInFilterTags" v-if="filterTags[key]">
          <span v-if="key === 'deps'">部门类型：</span>
          <span v-else-if="key === 'types'">共享类型：</span>
          <span v-else-if="key === 'topic'">主题领域：</span>
          <span v-else-if="key === 'tag'">关键字：</span>
          <span v-else="key === 'base'">基础类别：</span>
          <span>{{filterTags[key].dep_name || filterTags[key].dictName || filterTags[key].categoryName || filterTags[key].name}}</span>
          <i class="close" @click="removeFilterTag(key)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['params'],
    data () {
      return {
        filterTags: this.params
      }
    },
    computed: {
      keysInFilterTags () {
        return Object.keys(this.filterTags)
      },
      filterFlag () {
        return this.filterTags.deps || this.filterTags.types || this.filterTags.topic || this.filterTags.tag||this.filterTags.base;
      }
    },
    watch: {
    },
    methods: {
      handleConditions (params) {
        Object.keys(params).forEach((key) => {
          if (params[key].id !== -1) {
            this.filterTags[key] = params[key]
          } else {
            this.filterTags[key] = ''
          }
        })
      },
      removeFilterTag (key) {
        this.filterTags[key] = ''
      }
    }
  }
</script>
<style lang="less" scoped>
  .no-filter {
    margin-bottom: 0;
  }
  .filter {
    height: 75px;
    line-height: 35px;
    padding: 20px 0;
    /*overflow: hidden;*/
    .desc {
      display: inline-block;
      float: left;
    }
    ul {
      float: left;
      overflow: hidden;
      li {
        background:rgba(0,170,113,0.05);
        border-radius:2px;
        border:1px solid rgba(0,170,113,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0,170,113,1);
        float: left;
        padding: 0 25px 0 10px;
        height: 35px;
        margin-left: 20px;
        position: relative;
        .close {
          width: 14px;
          height: 14px;
          display: block;
          position: absolute;
          top: 14px;
          right: 5px;
          cursor: pointer;
          background: url(../../assets/images/icons/ico_close_sel.svg) no-repeat;
        }
      }
    }
  }
</style>
