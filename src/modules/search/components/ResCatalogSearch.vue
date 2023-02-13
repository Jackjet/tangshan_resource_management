<template>
  <div>
    <div class="resultList">
        <div v-if="viewList.length==0">暂无数据</div>
        <div class="search_result-item" v-for="v,k in viewList">
          <router-link :to="{ name: 'resCatalogDetail', params: { id: v.id }}">
          <div class="search_item-icon">
                <img class="appItemImg" :src="v.image_uri"/>
          </div>
          <div class="search-item_detail">
            <div class="title_info">
              <div class="detail_name">
                  {{v.name}}
              </div>
              <div class="detail_attention">
                <img src="../../../assets/images/icons/ico_01.svg" title="浏览量">
                  <span>{{v.view_count}}</span>
                <img src="../../../assets/images/icons/ico_02.svg" title="关注量">
                  <span>{{v.attention_count}}</span>
              </div>
            </div>
            <div class="condition_label">
              <div class="depart_label">
                  {{v.dept_name}}
              </div>
            </div>
            <div class="detail_info">
              <el-row>
                <div class="lineHeight">
                  <el-col :span="8">
                      <div >代码：{{v.cata_code}}</div>
                  </el-col>
                  <el-col :span="8">
                      更新周期：{{v.update_cycle}}
                  </el-col>
                  <el-col :span="8">
                      发布日期：{{v.publish_time | formatDate}}
                  </el-col>
                </div>
                <div class="lineHeight">
                  <el-col :span="8">
                      共享类型：{{v.share_type}}
                  </el-col>
                  <el-col :span="8">
                      信息资源格式：{{v.info_format_type}}
                  </el-col>
                  <el-col :span="8">
                      共享方式：{{v.share_mode_type}}
                  </el-col>
                </div>
                <div class="lineHeight">
                  <el-col :span="24" >
                    <div style="float:left">
                      信息资源摘要：
                    </div>
                    <div class="fileDes">
                        {{v.remark}}
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
  import Axios from 'axios'
  import API from '@/common/api'
  import moment from 'moment'

  export default {
    props: {
      cataList: []
    },
    data () {
      return {
        viewList: []
      }
    },
    watch: {
      cataList:{
        handler () {
          this.viewList=this.cataList;
    },
        deep: true
        }
    },
    created () {
      this.viewList=this.cataList;
    },
    filters: {
      formatDate: function(time) {
        if(time!=null&&time!="")
        {
          var date = new Date(time);
          let formatStr = 'YYYY-MM-DD'
          return moment(time).format(formatStr)
        }else{
          return "";
                }
      }
      },
    methods: {
    }
  }
</script>

<style scoped>
</style>
