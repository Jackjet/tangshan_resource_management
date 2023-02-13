<template>
  <div>
    <div class="resultList">
      <div v-if="viewList.length==0">暂无数据</div>
      <div class="search_result-item" v-for="v,k in viewList">
        <router-link :to="{ name: 'serviceDetail', params: { id: v.id }}">
        <div class="search_item-icon">
              <img class="appItemImg" :src="v.imageUri"/>
        </div>
        <div class="search-item_detail">
          <div class="title_info">
            <div class="detail_name">
                {{v.name}}
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
              <div v-for="(item,index) in getTag(v.tagNames)">
                <el-tag>{{item}}</el-tag>
            </div>
            <div class="depart_label">
                {{v.depName}}
            </div>
          </div>
          <div class="detail_info">
            <el-row>
              <div class="lineHeight">
                <el-col :span="6">
                    共享类型：{{v.shareTypeDesc}}
                </el-col>
                <el-col :span="6">
                    发布日期：{{v.updatedTimeFormat}}
                </el-col>
                <el-col :span="6">
                    服务方式：{{v.serviceType}}
                </el-col>
                <el-col :span="6">
                    服务渠道：{{v.serviceChannel}}
                </el-col>
              </div>
              <div class="lineHeight">
                <el-col :span="24">
                    关联目录：{{v.businessinfoNames}}
                </el-col>
              </div>
              <div class="lineHeight">
                <el-col :span="24" >
                  <div style="float:left">
                    信息描述：
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
      appList: []
    },
    data () {
      return {
        viewList: []
      }
    },
    watch: {
      appList:{
        handler () {
          this.viewList=this.appList;
    },
        deep: true
        }
      },
    created () {
      this.viewList=this.appList;
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
