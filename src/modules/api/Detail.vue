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
        <a href="javascript:;">接口</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">详情</a>
    </div>
    <div>
      <div class="detail_panel">
        <el-row>
          <el-col :span="4" class="detailTop_left">
            <div class="detail_img">
              <img :src="detail.iconUrl" alt="">
            </div>
            <div class="isAttention" v-if="detail.attentionFlag===true" @click="follow()"><img src="../../assets/images/icons/ico_02.svg" alt="已关注">已关注
            </div>
            <div class="isAttention" v-else @click="follow()"><img src="../../assets/images/icons/ico_attention_sel.svg" alt="未关注">关注</div>
            <!-- <div class="feedback_idea 1"  @click="apply"><a href="javascript:;">{{applyStatusTip}}</a>
              </div>-->
          </el-col>
          <el-col :span="20" class="pr20">
            <div class="detailTop_right">
              <div style="height: 22px;">
                <div class="detail_title">{{detail.apiServiceCName}}</div>
                <div class="detail_look">
                  <img src="../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 24px">{{detail.viewCnt}}</span>
                  <img src="../../assets/images/icons/ico_02.svg" alt=""><span style="margin-right: 24px">{{detail.attentionCnt}}</span>
                  <img src="../../assets/images/icons/ico_04.svg" alt=""><span>{{detail.applyCnt}}</span>
                </div>
              </div>
              <div class="identify">
                <div class="condition_label">
                  <div v-for="item in getTag(detail.tagsName)" style="float: left">
                    <el-tag>{{item}}</el-tag>
                  </div>
                  <div class="identify_label">{{detail.depName}}</div>
                </div>

              </div>
              <div class="detail_content">
                <div class="label_group">
                  <el-col :span="7">
                    <label for="">API状态:</label>
                    <span>{{detail.statusDesc}}</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">主题领域:</label>
                    <span>健康保障</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">所属部门:</label>
                    <span>{{detail.depName}}</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="7">
                    <label for="">共享类型:</label>
                    <span v-if="detail.shareType==='01'">无条件共享</span>
                    <span v-if="detail.shareType==='02'">有条件共享</span>
                    <span v-if="detail.shareType==='03'">不允共享</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">更新时间:</label>
                    <span>{{formatUpdatedTime}}</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="24">
                    <label for="">关联目录:</label>
                    <span v-if="detail.strRes===''">无</span>
                    <span v-if="detail.strRes!==''">{{detail.strRes}}</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="24" class="InfoAbstract">
                    <label for="">信息资源摘要:</label>
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
              <el-table class="infoTable" :data="detail.relList" border :header-cell-style="{
                        'text-align':'center',
                        'background':'rgba(250,250,250,1)',
                        'font-weight': 'bold',
                        'font-size': '15px'
                         }">
                <el-table-column align='center' prop="name" label="名称"></el-table-column>
                <el-table-column align='center' prop="code" label="编号"></el-table-column>
                <el-table-column align='center' prop="deptName" label="提供单位"></el-table-column>
                <el-table-column align='center' prop="shareName" label="共享类型"></el-table-column>
                <el-table-column align='center' prop="publishTime" label="发布日期"></el-table-column>
                <el-table-column align='center' prop="updateCycleName" label="更新周期"></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="API调用" name="second">
            <template>
              <el-collapse accordion v-for="item in detail.apiList" :item="item" :key="item.apiId" v-model="activeCollapses">
                <el-collapse-item :title="item.apiCName" name="1">
                  <div class="right-main">
                    <p>接口地址：{{item.encodeUri}}
                      <button class="btn-test" @click="debug">调试</button>
                    </p>
                    <p>支持格式：{{item.requestType}}</p>
                    <p>请求方式：{{item.requestMethod}}</p>
                    <p>参数和示例：</p>
                    <div class="markdown-body" v-html="item.testPacket"></div>
                    <p>备注信息：</p>
                    <div class="markdown-body" v-html="item.directions"></div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </template>
          </el-tab-pane>
          <el-tab-pane label="返回码" name="third">
            <div class="right-main">
              <div class="markdown-body" v-html="detail.rtnCode"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="接口文档下载" name="fourth">
            <div class="right-main">
              <div class="markdown-body">
                <a href="http://10.15.1.26:10001/API call example.docx" target="_blank">接口文档</a>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!--<div class="goApply" @click="apply">
          <span>{{applyStatusTip}}</span>
          <img src="../../assets/images/icons/ico_to_green.svg" alt="">
        </div>-->
      </div>
    </div>
    <ApplyBox v-show="showApplyBox" @handleSubmit="handleSubmit" @handleClose="handleClose" :submitFlag="submitFlag" :clearFlag="clearFlag" :type="type" :serviceId="id" ref="applyBox" id="applyBox"></ApplyBox>
  </div>
</template>
<script>
import '@/assets/less/common.less'
import '@/assets/less/variables.less'
import ApplyBox from '@/components/applyBox'
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
      showApplyBox: false,
      submitFlag: false,
      clearFlag: false,
      layerIndex: '',
      type: 'api',
      applyStatusTip: '',
      activeCollapses: ['1'],
      msgInfo: ''
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = this.$route.params.id;
      this.getDetail()
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
    API.Common.getLoginInfo().then((res) => {
      if (res.result) {
        this.user = res.result
      }
    })
  },
  methods: {
    getDetail() {
      API.Api.getApiDetail({
        apiServiceId: this.id
      }).then((res) => {
        this.detail = res.result;
        this.handleMarkdown();
        this.applyStatusShow()
      })
    },
    follow() {
      if (this.detail.attentionFlag) {
        // 取消关注
        API.Api.unFollowApi({
          apiServiceId: this.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.attentionFlag = false;
            this.detail.attentionCnt = this.detail.attentionCnt - 1
          }
        })
      } else {
        // 关注
        API.Api.followApi({
          apiServiceId: this.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.attentionFlag = true;
            this.detail.attentionCnt = this.detail.attentionCnt + 1
          }
        })
      }
    },
    getTag(tagStr) {
      var tag;
      try {
        tag = tagStr.split(",");
        return tag;
      } catch (e) {
        return tag;
      }
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
        item.testPacket = converter.makeHtml(item.testPacket);
        item.directions = converter.makeHtml(item.directions)
      });
      this.detail.rtnCode = converter.makeHtml(this.detail.rtnCode)
    },
    applyStatusShow() {
      this.applyStatusTip = '立即申请';
      if (this.detail.applyStatus === 0) {
        this.detail.applyStatus = true;
        this.msgInfo = '您已申请该数据，请勿重复提交';
      } else if (this.detail.applyStatus === 1) {
        this.detail.applyStatus = true;
        this.msgInfo = '您已申请过该数据，可直接使用';
      } else {
        this.detail.applyStatus = false
      }
    },
    apply() {
      if (!this.user.userId) {
        this.$router.push({ name: 'login', query: { service: window.location.href } });
        return
      }
      if (this.detail.applyStatus === true) {
        layer.msg(this.msgInfo);
        return
      }
      if (this.detail.shareType === '01') {
        // 无条件共享
        API.Common.applyApi({
          busId: this.id,
          busType: '01',
          shareType: '01'
        }).then((res) => {
          if (res.status === 'OK') {
            layer.msg('申请成功！')
            this.getDetail();
          } else {
            layer.msg(res.message);
          }
        })
      } else {
        // 有条件共享
        this.$router.push({
          name: 'resApply', params: {
            id: this.id, type: 'api', name: this.detail.apiServiceCName,
            depName: this.detail.depName, description: this.detail.description
          }
        })
      }
    },
    handleSubmit() {
      this.submitFlag = false
    },
    handleClose() {
      layer.close(this.layerIndex)
    },
    debug() {
      var baseUrl = location.protocol + '//' + location.host + '/';
      let index = layer.open({
        type: 2,
        title: 'API测试工具',
        shadeClose: false,
        shade: 0.8,
        maxmin: true,
        area: ['100%', '100%'],
        content: baseUrl + 'apitest' + '?userId=' + this.user.userId + '&apiServiceId=' + this.id
      });
      layer.full(index)
    }
  },
  computed: {
    formatUpdatedTime() {
      return moment(this.detail.updatedTime).format('YYYY-MM-DD')
    }
  },
  components: {
    ApplyBox
  }
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

