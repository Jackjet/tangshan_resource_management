<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix">
      <span class="col3">/</span>
      <router-link tag="span" :to="{ name: 'home' }">
        <a href="javascript:;">首页</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <router-link tag="span" :to="{ name: 'resCatalog' }">
        <a href="javascript:;">云服务</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">详情</a>
    </div>
    <div>
      <div class="detail_panel">
        <el-row>
          <el-col :span="4" class="detailTop_left">
            <div class="detail_img">
              <img :src="detail.imageUri" alt="">
            </div>
            <div class="isAttention" style="cursor: pointer;" @click="follow">
              <img v-if="detail.attentionFlag===false" src="../../assets/images/icons/ico_attention_sel.svg" alt="">
              <img v-if="detail.attentionFlag===true" src="../../assets/images/icons/ico_02.svg" alt="">
              {{detail.attentionFlag===false?'未关注':'已关注'}}
            </div>
          </el-col>
          <el-col :span="20" class="pr20">
            <div class="detailTop_right">
              <div style="height: 22px;">
                <div class="detail_title">{{detail.name}}</div>
                <div class="detail_look">
                  <img src="../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 24px">{{detail.viewCount}}</span>
                  <img src="../../assets/images/icons/ico_02.svg" alt=""><span style="margin-right: 24px">{{detail.attentionCount}}</span>
                  <img src="../../assets/images/icons/ico_04.svg" alt=""><span>{{detail.applyCount}}</span>
                </div>
              </div>
              <div class="identify">
                <div class="condition_label" style="float: left">
                  <div v-for="item in getTag(detail.tagNames)">
                    <el-tag>{{item}}</el-tag>
                  </div>
                </div>
                <div class="identify_label">{{detail.depName}}</div>
              </div>
              <div class="detail_content">
                <div class="label_group">
                  <el-col :span="7">
                    <label for="">提供单位:</label>
                    <span>{{detail.depName}}</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">联系人:</label>
                    <span>{{detail.linkman}}</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">联系方式:</label>
                    <span>{{detail.telephone}}</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="7">
                    <label for="">发布时间:</label>
                    <span>{{formatUpdatedTime}}</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">共享类型:</label>
                    <span v-if="detail.shareType==='01'">无条件共享</span>
                    <span v-if="detail.shareType==='02'">有条件共享</span>
                    <span v-if="detail.shareType==='03'">不允共享</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="24">
                    <label for="">共享条件:</label>
                    <span style="line-height: 25px;">{{detail.shareCondition}}</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="24">
                    <label for="">描述:</label>
                    <span style="line-height: 25px;">{{detail.description}}</span>
                  </el-col>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="detail_tabs">
        <el-tabs v-model="activeName" class="detail_table">
          <el-tab-pane label="关联目录" name="first">
            <template>
              <el-table class="infoTable" :data="detail.cataList" border :header-cell-style="{
                        'text-align':'center',
                        'background':'rgba(250,250,250,1)',
                        'font-weight': 'bold',
                        'font-size': '15px'
                         }">
                <el-table-column align='center' prop="name" label="名称">
                  <template slot-scope="scope">
                    <el-tag style="cursor: pointer;" @click="goDetail(scope.row.id)">{{scope.row.name}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align='center' prop="code" label="编号"></el-table-column>
                <el-table-column align='center' prop="dept_name" label="提供单位"></el-table-column>
                <el-table-column align='center' prop="share_type" label="共享类型"></el-table-column>
                <el-table-column align='center' prop="publish_time" label="发布日期"></el-table-column>
                <el-table-column align='center' prop="update_cycle" label="更新周期"></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="详情" name="second">
            <template>
              <div class="right-main">
                <p>服务方式：{{detail.serviceType}}</p>
                <p>服务渠道：{{detail.serviceChannel}}</p>
                <p>演示URL：{{detail.demoUri}}</p>
                <p>正式URL：{{detail.uri}}</p>
                <p>服务范围：{{detail.scope}}</p>
                <p>服务概览图：
                  <img :src="detail.demoImage1" />
                  <img :src="detail.demoImage2" />
                  <img :src="detail.demoImage3" />
                </p>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
        <div class="goApply" @click="applyClick">
          <span>立即申请</span>
          <img src="../../assets/images/icons/ico_to_green.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/less/common.less'
import '@/assets/less/variables.less'
import showdown from 'showdown'
import API from '@/common/api'
import moment from 'moment'
require('@/assets/css/markdown.css')
export default {
  data() {
    return {
      id: '',
      detail: '',
      user: { 'userId': true },
      activeName: 'first',
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
    // API.Common.getLoginInfo().then((res) => {
    //   if (res.result) {
    //     this.user = res.result
    //   }
    // })
  },
  methods: {
    follow() {
      if (this.detail.attentionFlag) {
        // 取消关注
        API.App.unFollowApp({
          id: this.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.attentionFlag = false
            this.detail.attentionCount = this.detail.attentionCount - 1
          }
        })
      } else {
        // 关注
        API.App.followApp({
          id: this.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.attentionFlag = true
            this.detail.attentionCount = this.detail.attentionCount + 1
          }
        })
      }
    },
    goDetail(id) {
      this.$router.push({ name: 'resCatalogDetail', params: { id: id } });
    },
    getDetail() {
      API.App.getAppDetail({
        id: this.id
      }).then((res) => {
        this.detail = res.result;
        this.handleMarkdown()
      })
    },
    getTag(tagStr) {
      return tagStr.split(",");
    },
    handleMarkdown() {
      let converter = new showdown.Converter({
        omitExtraWLInCodeBlocks: true,
        noHeaderId: false,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: false,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        prefixHeaderId: false,
        disableForced4SpacesIndentedSublists: false
      });
      this.detail.apiList.forEach((item) => {
        item.testPacket = converter.makeHtml(item.testPacket)
        item.directions = converter.makeHtml(item.directions)
      });
      this.detail.rtnCode = converter.makeHtml(this.detail.rtnCode)
    },
    applyClick() {
      API.App.checkApplyUndoStatus({
        appId: this.id
      }).then((res) => {
        if (res.result > 0) {
          layer.msg('该数据申请中请勿重复申请')
        } else {
          this.apply()
        }
      })
    },
    apply() {
      if (!this.user.userId) {
        this.$router.push({ name: 'login', query: { service: window.location.href } });
        return
      }
      if (this.detail.shareType === '01') {
        // 无条件共享
        API.Common.applyApp({
          busId: this.id,
          busType: '03',
          shareType: '01'
        }).then((res) => {
          if (res.status === 'OK') {
            layer.msg('申请成功！')
          } else {
            layer.msg(res.message);
          }
        })
      } else {
        this.$router.push({
          name: 'resApply', params: {
            id: this.id, type: 'app', name: this.detail.name,
            depName: this.detail.depName, description: this.detail.description
          }
        })
      }
    },
    debug() {
      var baseUrl = location.protocol + '//' + location.host + '/'
      let index = layer.open({
        type: 2,
        title: 'API测试工具',
        shadeClose: false,
        shade: 0.8,
        maxmin: true,
        area: ['100%', '100%'],
        content: baseUrl + 'apitest' + '?userId=' + this.user.userId + '&apiServiceId=' + this.id
      })
      layer.full(index)
    }
  },
  computed: {
    formatUpdatedTime() {
      return moment(this.detail.updatedTime).format('YYYY-MM-DD')
    }
  },
  // watch: {
  //   '$route'(to, from) {
  //     this.id = this.$route.params.id
  //     this.getDetail()
  //   }
  // },
}
</script>
<style lang="less" scoped>
@import "../../assets/css/detail.css";
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f8f8f8;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f8f8f8;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: rgba(222, 222, 222, 0.3);
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(21, 166, 255, 0.6);
}

.reviewedStatus {
  display: inline-block;
  width: 95px;
  height: 30px;
  text-align: center;
  line-height: 28px;
  border: 1px solid #20a0ff;
  background: #0f92f3;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  font-size: 15px;
  cursor: pointer;
}

.right-main {
  font-size: 14px;
  width: 80%;
  float: left;
  line-height: 15px;
  padding-left: 10px;
  border-left: 1px solid #eee;
  .btn-test {
    color: #20a0ff;
    border: 1px solid #20a0ff;
    background: #ffffff;
    cursor: pointer;
  }
}
.condition_label {
  /*display: flex;*/
}
.condition_label .el-tag {
  height: 22px;
  line-height: 18px;
  background: rgba(0, 170, 113, 0.05);
  border-radius: 2px;
  border: 1px solid rgba(0, 170, 113, 1);
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 170, 113, 1);
  margin-right: 11px;
  margin-bottom: 5px;
}
</style>
