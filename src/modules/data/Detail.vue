<template>
  <div>
    <!--面包屑导航-->
    <div class="breadCrumbNav clearfix">
      <span class="col3">/</span>
      <router-link tag="span" :to="{ name: 'home' }">
        <a href="javascript:;">首页</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <router-link tag="span" :to="{ name: 'data' }">
        <a href="javascript:;">文件</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">详情</a>
    </div>
    <div>
      <div class="detail_panel">
        <el-row>
          <el-col :span="4" class="detailTop_left">
            <div class="detail_img">
              <img :src="detail.dataPic" alt="">
            </div>
            <div class="isAttention" v-if="detail.attentionFlag" @click="follow"><img src="../../assets/images/icons/ico_02.svg" alt="">已关注</div>
            <div class="isAttention" v-else @click="follow"><img src="../../assets/images/icons/ico_attention_sel.svg" alt="">关注</div>
          </el-col>
          <el-col :span="20" class="pr20">
            <div class="detailTop_right">
              <div style="height: 22px;">
                <div class="detail_title">{{detail.name}}</div>
                <div class="detail_look">
                  <img src="../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 24px">{{detail.viewCount||0}}</span>
                  <img src="../../assets/images/icons/ico_02.svg" alt=""><span style="margin-right: 24px">{{detail.attentionCount||0}}</span>
                  <img src="../../assets/images/icons/ico_03.svg" alt=""><span>{{detail.downloadCount||0}}</span>
                </div>
              </div>
              <div class="identify">
                <div class="identify_label">{{detail.depName}}</div>
              </div>
              <div class="detail_content">
                <div class="label_group">
                  <el-col :span="7">
                    <label for="">联系人:</label>
                    <span>{{detail.createdBy}}</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">联系方式:</label>
                    <span>{{detail.telephone}}</span>
                  </el-col>
                  <el-col :span="7">
                    <label for="">发布时间:</label>
                    <span>{{detail.publishDate|dateformat('YYYY年MM月DD日')}}</span>
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
                    <label for="">更新周期:</label>
                    <span v-if="detail.updateRate==='1'">每日</span>
                    <span v-if="detail.updateRate==='2'">每周</span>
                    <span v-if="detail.updateRate==='3'">每月</span>
                    <span v-if="detail.updateRate==='4'">每季度</span>
                    <span v-if="detail.updateRate==='5'">每半年</span>
                    <span v-if="detail.updateRate==='6'">每年</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="24">
                    <label for="">关联目录:</label>
                    <span v-if="detail.cataName===''">无</span>
                    <span v-if="detail.cataName!==''">{{detail.cataName}}</span>
                  </el-col>
                </div>
                <div class="label_group">
                  <el-col :span="24">
                    <label for="">共享条件:</label>
                    <span style="line-height: 25px;">{{detail.shareCond}}</span>
                  </el-col>
                </div>
                <div class="label_group InfoAbstract">
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
            <el-table :data="detail.catas" style="width: 100%">
              <el-table-column prop="name" label="名称">
              </el-table-column>
              <el-table-column prop="code" label="编码">
              </el-table-column>
              <el-table-column prop="dept_name" label="提供单位">
              </el-table-column>
              <el-table-column prop="share_type" label="共享类型" :formatter="formatterShareType">
              </el-table-column>
              <el-table-column prop="publish_time" label="发布日期">
                <template slot-scope="scope">
                  {{ scope.row.publish_time | dateformat('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <el-table-column prop="update_cycle" label="更新周期" :formatter="formatterUpdateCycleType">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="文件清单" name="second">
            <el-table :data="fileTableData" style="width: 100%">
              <el-table-column prop="fileName" label="名称">
              </el-table-column>
              <el-table-column prop="fileType" label="格式" width="100">
              </el-table-column>
              <el-table-column prop="fileSize" label="大小" width="150">
              </el-table-column>
              <el-table-column v-if="detail.canDownload" width="100">
                <el-button size="mini" @click="download()">下载</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!--<div class="goApply" @click="applyClick">
          <span>立即申请</span>
          <img src="../../assets/images/icons/ico_to_green.svg" alt="">
        </div>-->
      </div>
    </div>
    <Apply-Box v-show="showApplyBox" @handleSubmit="handleSubmit" @handleClose="handleClose" :submitFlag="submitFlag" :clearFlag="clearFlag" :type="type" :serviceId="id" ref="applyBox" id="applyBox"></Apply-Box>
    <el-button :plain="true" @click="openCenter" style="display: none"></el-button>
  </div>
</template>
<script>
import '@/assets/less/common.less'
import '@/assets/less/variables.less'
import ApplyBox from '@/components/applyBox'
import API from '@/common/api'

require('@/assets/css/markdown.css')
export default {
  data() {
    return {
      id: '',
      detail: '',
      user: { 'userId': true },
      activeName: 'first',
      fileTableData: [],
      type: 'data',
      showApplyBox: false,
      submitFlag: false,
      clearFlag: false,
      applyStatus0: false,
      applyStatus1: false,
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
    this.initInfo()
    // API.Common.getLoginInfo().then((res) => {
    //   if (res.result) {
    //     this.user = res.result
    //   }
    // })
  },
  destroyed: function () {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer)
    this.timer = null
  },
  watch: {
    downloadNodeHelper(val, oldVal) {
      var _this = this
      if (val.indexOf('http') !== -1) {
        _this.startDownload(val)
      } else if (val !== '' && val !== oldVal && oldVal === 'ok') {
        _this.openCenter(val)
      }
    }
  },
  methods: {
    setTimer() {
      var _this = this
      if (_this.timer == null) {
        _this.timer = setInterval(() => {
          _this.downloadNodeHelper = document.getElementById('dcDownloadHelper') ? window.frames['dcDownloadHelper'].contentWindow.document.body.innerText : ''
        }, 1000)
      }
    },
    getDetail() {
      API.Data.getDataDetail({
        dataId: this.id
      }).then((res) => {
        this.detail = res.result;
        this.fileTableData.push({
          'fileName': res.result.fileName,
          'fileType': res.result.fileType,
          'fileSize': res.result.fileSize,
        })
      })
    },
    formatterShareType: function (row, column, cellValue) {
      if (cellValue == '1') {
        return '无条件共享'
      } else if (cellValue == '2') {
        return '有条件共享'
      } else if (cellValue == '3') {
        return ' 不予共享'
      }
    },
    formatterUpdateCycleType: function (row, column, cellValue) {
      if (cellValue == '1') {
        return '每日'
      } else if (cellValue == '2') {
        return '每周'
      } else if (cellValue == '3') {
        return ' 每月'
      } else if (cellValue == '4') {
        return '每季度'
      } else if (cellValue == '5') {
        return ' 每半年'
      } else if (cellValue == '6') {
        return '每年'
      }
    },
    follow() {
      if (this.detail.attentionFlag) {
        // 取消关注
        API.Data.unFollowData({
          dataId: this.detail.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.attentionFlag = false
            this.detail.attentionCount = this.detail.attentionCount - 1
          }
        })
      } else {
        // 关注
        API.Data.followData({
          dataId: this.detail.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.attentionFlag = true
            this.detail.attentionCount = this.detail.attentionCount + 1
          }
        })
      }
    },
    initInfo() {
      API.Data.checkApplyUndoStatus({
        dataId: this.id
      }).then((res) => {
        if (res.result <= 0) {
          this.applyStatus0 = true
        }
      });
      API.Data.checkDownload({ dataId: this.id }).then(res => {
        if (res.result <= 0) {
          this.applyStatus1 = true
        }
      })
    },
    applyClick() {
      if (!this.applyStatus0) {
        layer.msg('您已申请该数据，请勿重复提交');
        return
      }
      if (!this.applyStatus1) {
        layer.msg('您已申请过该数据，可直接使用');
        return
      }
      this.apply();
    },
    apply() {
      if (!this.user.userId) {
        this.$router.push({ name: 'login', query: { service: window.location.href } })
        return
      }
      // 无条件共享申请
      if (this.detail.shareType === '01') {
        API.Common.applyData({
          busId: this.id,
          busType: '02',
          shareType: '01'
        }).then((res) => {
          if (res.status === 'OK') {
            layer.msg('申请成功！')
          } else {
            layer.msg(res.message);
          }
        })
      } else {
        // 有条件共享申请
        this.$router.push({
          name: 'resApply', params: {
            id: this.id, type: 'data', name: this.detail.name,
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
    openCenter(val) {
      if (val !== '') {
        this.$message({
          message: val,
          center: true
        })
      }
    },
    download() {
      this.startDownload('')
    },
    startDownload(val) {
      // const downloadNodeHelper = document.getElementById('dcDownloadHelper')
      // if (downloadNodeHelper) {
      //   document.body.removeChild(downloadNodeHelper)
      // }
      // const iframe = document.createElement('iframe')
      // iframe.id = 'dcDownloadHelper'
      // iframe.style.display = 'none'
      // if (val === '') {
      //   iframe.src = location.protocol + '//' + location.host + '/ro/share-data-api/' + 'data/downloadFromGateway.do?dataId=' + this.id
      //   this.downloadNodeHelper = 'ok'
      // } else {
      //   iframe.src = val
      // }
      // document.body.appendChild(iframe)

      API.Data.getDownloadFile({
        dataId: this.id,
      }).then((res) => {
        const downloadNodeHelper = document.getElementById('dcDownloadHelper')
        if (downloadNodeHelper) {
          document.body.removeChild(downloadNodeHelper)
        }
        const iframe = document.createElement('iframe')
        iframe.id = 'dcDownloadHelper'
        iframe.style.display = 'none'
        if (val === '') {
          iframe.src = res
          this.downloadNodeHelper = 'ok'
        } else {
          iframe.src = val
        }
        document.body.appendChild(iframe)
      })

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
  font-size: 15px;
  width: 80%;
  float: left;
  padding-left: 60px;
  border-left: 1px solid #eee;
  .btn-test {
    color: #20a0ff;
    border: 1px solid #20a0ff;
    background: #ffffff;
    cursor: pointer;
  }
}
</style>
