<template>
  <div>
    <div class="resultList">
      <div v-if="viewList.length==0">暂无数据</div>
      <div class="search_result-item" v-for="v,k in viewList">
        <router-link :to="{ name: 'dataDetail', params: { id: v.id }}">
        <div class="search_item-icon">
              <img class="appItemImg" :src="v.dataPic"/>
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
              <img src="../../../assets/images/icons/ico_03.svg" title="下载量">
                <span>{{v.downloadCount}}</span>
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
                <el-col :span="8">
                    共享类型：{{v.shareTypeDesc}}
                </el-col>
                <el-col :span="8">
                    更新周期：{{getUpdateRateDesc(v.updateRate)}}
                </el-col>
                <el-col :span="8">
                    发布日期：{{v.publishDate|dateformat('YYYY年MM月DD日')}}
                </el-col>
              </div>
              <div class="lineHeight">
                <el-col :span="24">
                    关联目录：{{v.cataName}}
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
      dataList: []
    },
    data () {
      return {
        viewList: []
        }
    },
    watch: {
      dataList:{
        handler () {
          this.viewList=this.dataList;
    },
        deep: true
      }
    },
    created () {
      this.viewList=this.dataList;
    },
    methods: {
      getTag(tagStr){
        return tagStr.split(",");
      },
      getUpdateRateDesc(str){
          if(str==='1'){
              return '日'
          }else if(str==='2'){
            return '周'
          }else if(str==='3'){
            return '月'
          }else if(str==='4'){
            return '季度'
          }else if(str==='5'){
            return '半年'
          }else if(str==='6'){
            return '年'
          }
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
