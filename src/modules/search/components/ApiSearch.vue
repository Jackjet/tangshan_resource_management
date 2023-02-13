<template>
  <div>
    <div class="resultList">
      <div v-if="viewList.length==0">暂无数据</div>
      <div class="search_result-item" v-for="v,k in viewList">
        <router-link :to="{ name: 'apiDetail', params: { id: v.apiServiceId }}">
        <div class="search_item-icon">
              <img class="appItemImg" :src="v.iconUrl"/>
        </div>
        <div class="search-item_detail">
          <div class="title_info">
            <div class="detail_name">
                {{v.apiServiceName}}
            </div>
            <div class="detail_attention">
              <img src="../../../assets/images/icons/ico_01.svg" title="浏览量">
                <span>{{v.viewCount}}</span>
              <img src="../../../assets/images/icons/ico_02.svg" title="关注量">
                <span>{{v.attentionCount}}</span>
              <img src="../../../assets/images/icons/ico_04.svg" title="接入量">
                <span>{{v.applyCount}}</span>
            </div>
          </div>
          <div class="condition_label">
            <div v-for="(item,index) in getTag(v.tagStr)">
                <el-tag>{{item}}</el-tag>
            </div>
            <div class="depart_label">
                {{v.depName}}
            </div>
          </div>
          <div class="detail_info">
            <el-row>
                <div class="lineHeight">
                  <el-col :span="8">
                      共享类型：{{v.shareType==='01'?'无条件共享':v.shareType==='02'?'有条件共享':'不予共享'}}
                  </el-col>
                  <el-col :span="8">
                      发布日期：{{v.updatedTimeFormat}}
                  </el-col>
                </div>
                <div class="lineHeight">
                  <el-col :span="24">
                      关联目录：{{v.strRes}}
                  </el-col>
                </div>
                <div class="lineHeight">
                  <el-col :span="24" >
                    <div style="float:left">
                      信息资源摘要：
                    </div>
                    <div class="fileDes">
                        {{v.description}}
                    </div>
                  </el-col>
                </div>
            </el-row>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  export default {
    props: {
      apiList: []
    },
    data () {
      return {
        viewList: []
      }
    },
    watch: {
      apiList:{
        handler () {
          this.viewList=this.apiList;
    },
        deep: true
        }
      },
    created () {
      this.viewList=this.apiList;
      },
    methods: {
      getTag(tagStr){
        return tagStr.split(",");
      }
    }
  }
</script>
<style scoped>
  .main-content {
    width: 95%;
    margin: 0 auto;
  }
</style>
