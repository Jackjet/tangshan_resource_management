<template>
  <div class="rightBlock" id="userMyDataRight">
    <table class="table" id="dataApply">
      <tr>
        <th>文件名称</th>
        <th>共享类型</th>
        <th>申请时间</th>
        <th>截止时间</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tbody>
      <template v-if="list.length > 0">
        <tr v-for="(item, index) in list">
          <td>
            {{ item.serviceName }}
          </td>
          <td>{{ item.shareType === '01' ? '无条件共享' : '有条件共享' }}</td>
          <td>{{ item.applyTime | formatTime }}</td>
          <td v-if="item.shareType === '02'">{{ item.endTime | formatTime }}</td>
          <td v-else>不限</td>
          <td v-if="item.reviewedStatus == 0">未审核</td>
          <td v-if="item.reviewedStatus == 1">初审通过</td>
          <td v-if="item.reviewedStatus == 2">终审通过</td>
          <td v-if="item.reviewedStatus == 3">审核拒绝</td>
          <td>
            <a href="javascript:;" @click="showView(item.id, item.dataId)">查看</a>
            <a href="javascript:;"
               v-if="item.reviewedStatus == '2' && (item.shareType === '01' || (item.shareType === '02' && compareDate(item.endTime)))"
               @click="download(item.dataId)">再次下载</a>
            <template v-else>
              <a href="javascript:;" @click="apply(item)">再次申请</a>
            </template>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="5">暂无数据</td>
      </tr>
      </tbody>
    </table>
    <paginate
      v-show="pageInfo.totalPage > 0"
      :page-count="pageInfo.totalPage"
      :click-handler="jumpPage"
      :prev-text="'上一页'"
      :next-text="'下一页'"
      :container-class="'pagination'">
    </paginate>
    <div id="viewShow" v-show="viewFlag" class="lookDialog">
      <div class="dialogForm">
        <div  class="pt28 detailFormItem">
          <label>资源用途:</label>
          <div class="detailInput">
            <!--<div v-if="commonInfo.purpose!==null">{{commonInfo.purpose}}</div>-->
            <span v-if="commonInfo.purpose!==null">123456</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>使用期限:</label>
          <div class="detailInput">
            <!--<span v-if="commonInfo.useDate!==null">{{commonInfo.useDate}}</span>-->
            <span v-if="commonInfo.useDate!==null">456789</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>申请时间:</label>
          <div  class="detailInput">
            <span v-if="commonInfo.applyTime!==null">{{commonInfo.applyTime}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>说明:</label>
          <div  class="detailInput">
            <span v-if="commonInfo.explains!==null">{{commonInfo.explains}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>审核依据文件:</label>
          <div  class="detailInput">
            <a v-if="commonInfo.fileKey!=null" :href="commonInfo.fileKey">{{commonInfo.fileName}}.{{commonInfo.fileType}}</a>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>审核状态:</label>
          <div  class="detailInput">
            <span v-if="commonInfo.reviewedStatus==='0'">未审核</span>
            <span v-if="commonInfo.reviewedStatus==='1'">初审通过</span>
            <span v-if="commonInfo.reviewedStatus==='2'">终审通过</span>
            <span v-if="commonInfo.reviewedStatus==='3'">审核拒绝</span>
            <span v-if="commonInfo.reviewedStatus===null">无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>初审时间:</label>
          <div  class="detailInput">
            <span v-if="commonInfo.checkTime!==null">{{commonInfo.checkTime}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label>初审意见:</label>
          <div class="detailInput">
            <span v-if="commonInfo.checkContent!==null">{{commonInfo.checkContent}}</span>
            <span v-else>无</span>
          </div>
        </div>

        <div class="pt28 detailFormItem">
          <label>终审时间:</label>
          <div class="detailInput">
          <span v-if="commonInfo.checkTimeFinal!==null">{{commonInfo.checkTimeFinal}}</span>
          <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>终审意见:</label>
          <div class="detailInput">
          <span v-if="commonInfo.checkContentFinal!==null">{{commonInfo.checkContentFinal}}</span>
          <span v-else>无</span>
          </div>
        </div>
      </div>
      <div class="detailBlock">
        <el-row>
        <el-col :span="3" class="detail_left">
          <div class="user_detail_img">
            <img :src="detail.dataPic" alt="">
          </div>
          <div class="isAttention" v-if="detail.attentionFlag" @click="follow"><img
            src="../../../../assets/images/icons/user_attention.svg" alt="">已关注
          </div>
          <div class="isAttention" v-else @click="follow"><img
            src="../../../../assets/images/icons/user_attention.svg" alt="">未关注
          </div>
        </el-col>
        <el-col :span="20">
          <div class="detail_right">
            <div style="height: 22px;">
              <div class="detail_title">{{detail.name}} <span>文件</span></div>
              <div class="detail_look">
                <img src="../../../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 17px">{{detail.viewCount||0}}</span>
                <img src="../../../../assets/images/icons/ico_02.svg" alt=""><span style="margin-right: 17px">{{detail.attentionCount||0}}</span>
                <img src="../../../../assets/images/icons/ico_03.svg" alt=""><span>{{detail.downloadCount||0}}</span>
              </div>
            </div>
            <div class="identify">
                <!--<div v-for="(item,index) in getTag(apiItem.tagStr)" class="identifyTag">-->
                <div v-for="(item,index) in detail.tagList" :key="index" class="identifyTag">
                  <el-tag>{{item.value}}</el-tag>
                </div>
              <div class="identify_label">{{detail.depName}}</div>
            </div>
            <div class="detail_content">
                <el-col :span="6" class="tl">
                  <label >联系人:</label>
                  <span>{{detail.createdBy}}</span>
                </el-col>
                <el-col :span="6" class="tl">
                  <label >联系方式:</label>
                  <span>{{detail.telephone}}</span>
                </el-col>
                <el-col :span="6" class="tl">
                  <label >发布时间:</label>
                  <span>{{detail.publishDate|dateformat('YYYY年MM月DD日')}}</span>
                </el-col>
                <el-col :span="6" class="tl">
                  <label>共享类型:</label>
                  <span v-if="detail.shareType==='01'">无条件共享</span>
                  <span v-if="detail.shareType==='02'">有条件共享</span>
                  <span v-if="detail.shareType==='03'">不允共享</span>
                </el-col>
              <!--  <el-col :span="7">
                  <label>更新周期:</label>
                  <span v-if="detail.updateRate==='1'">每日</span>
                  <span v-if="detail.updateRate==='2'">每周</span>
                  <span v-if="detail.updateRate==='3'">每月</span>
                  <span v-if="detail.updateRate==='4'">每季度</span>
                  <span v-if="detail.updateRate==='5'">每半年</span>
                  <span v-if="detail.updateRate==='6'">每年</span>
                </el-col>-->
                <el-col :span="24"  class="tl">
                  <label>关联目录:</label>
                  <span v-if="detail.cataName===''">无</span>
                  <span v-if="detail.cataName!==''">{{detail.cataName}}</span>
                </el-col>
                <!--<el-col :span="24">
                  <label>共享条件:</label>
                  <span style="line-height: 25px;">{{detail.shareCond}}</span>
                </el-col>-->
                <el-col :span="24"  class="tl">
                  <label>资源描述:</label>
                  <span >{{detail.description}}</span>
                </el-col>
              </div>
          </div>
        </el-col>
        </el-row>
      </div>
      <div class="dialog_tabs">
          <el-tabs v-model="activeName">
            <el-tab-pane label="关联目录" name="first">
              <el-table
                border
                :data="detail.catas"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="编码">
                </el-table-column>
                <el-table-column
                  prop="dept_name"
                  label="提供单位">
                </el-table-column>
                <el-table-column
                  prop="share_type"
                  label="共享类型" :formatter="formatterShareType">
                </el-table-column>
                <el-table-column
                  prop="publish_time"
                  label="发布日期">
                  <template slot-scope="scope">
                    {{ scope.row.publish_time | dateformat('YYYY-MM-DD') }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="update_cycle"
                  label="更新周期" :formatter="formatterUpdateCycleType">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="文件清单" name="second">
              <el-table
                border
                :data="fileTableData"
                style="width: 100%">
                <el-table-column
                  prop="fileName"
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="fileType"
                  label="格式" width="100">
                </el-table-column>
                <el-table-column
                  prop="fileSize"
                  label="大小" width="150">
                </el-table-column>
                <el-table-column v-if="detail.canDownload" width="100">
                  <el-button
                    size="mini"
                    @click="download1()">下载
                  </el-button>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
      <el-button :plain="true" @click="openCenter" style="display: none"></el-button>
  </div>
</template>
<script>
  import moment from 'moment'
  import API from '@/common/api/index'

  export default {
    data() {
      return {
        id: '',
        list: [],
        pageInfo: {
          totalPage: 0
        },
        params: {
          page: 1,
          pageSize: 5
        },
        type: 'data',
        userDate: '',
        authorizationValue: '',
        downloadNodeHelper: '',

        layerIndex: '',
        viewFlag: false,
        dataId: '',
        fileTableData: [],
        detail: '',
        activeName: 'first',
        commmonParam: {
          id: 0
        },
        commonInfo: '',
        user: {'userId': true},
      }
    },
    watch: {
      params: {
        handler(val) {
          this.queryList()
        },
        deep: true
      },
      downloadNodeHelper(val, oldVal) {
        var _this = this;
        if (val.indexOf('http') !== -1) {
          _this.startDownload({downloadParam: val})
        } else if (val !== '' && val !== oldVal && oldVal === 'ok') {
          _this.openCenter(val)
        }
      }
    },
    created() {
      var _this = this;
      this.queryList();
      // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
      clearInterval(_this.timer);
      _this.timer = null;
      _this.setTimer()
    },
    destroyed: function () {
      // 每次离开当前界面时，清除定时器
      clearInterval(this.timer);
      this.timer = null
    },
    methods: {
      setTimer() {
        var _this = this;
        if (_this.timer == null) {
          _this.timer = setInterval(() => {
            _this.downloadNodeHelper = document.getElementById('dcDownloadHelper') ? window.frames['dcDownloadHelper'].contentWindow.document.body.innerText : ''
          }, 1000)
        }
      },
      openCenter(val) {
        if (val !== '') {
          this.$message({
            message: val,
            center: true
          })
        }
      },
      queryList() {
        API.Data.getMyUseDataList(this.params).then((res) => {
          this.list = res.result.list;
          this.pageInfo = res.result.page
        })
      },
      formatTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      },
      compareDate(time) {
        if (this.parseDate(time) >= this.parseDate(Date.parse(new Date()))) {
          return true
        } else {
          return false
        }
      },
      parseDate(time) {
        return moment(time).format('YYYYMMDD')
      },
      jumpPage(page) {
        this.params.page = page
      },
      download(id) {
        var _this = this;
        var objParam = {
          paramId: id,
          downloadParam: ''
        };
        _this.startDownload(objParam)
      },
      startDownload(obj) {
        const downloadNodeHelper = document.getElementById('dcDownloadHelper')
        if (downloadNodeHelper) {
          document.body.removeChild(downloadNodeHelper)
        }
        const iframe = document.createElement('iframe');
        iframe.id = 'dcDownloadHelper';
        iframe.style.display = 'none';
        if (obj.downloadParam === '') {
          iframe.src = location.protocol + '//' + location.host + '/ro/share-data-api/' + 'data/downloadFromGateway.do?dataId=' + obj.paramId;
          this.downloadNodeHelper = 'ok'
        } else {
          iframe.src = obj.downloadParam
        }
        document.body.appendChild(iframe)
      },
      download1 () {
        this.startDownload1('')
      },
      startDownload1 (val) {
        const downloadNodeHelper = document.getElementById('dcDownloadHelper')
        if (downloadNodeHelper) {
          document.body.removeChild(downloadNodeHelper)
        }
        const iframe = document.createElement('iframe')
        iframe.id = 'dcDownloadHelper'
        iframe.style.display = 'none'
        if (val === '') {
          iframe.src = location.protocol + '//' + location.host + '/ro/share-data-api/' + 'data/downloadFromGateway.do?dataId=' + this.dataId
          this.downloadNodeHelper = 'ok'
        } else {
          iframe.src = val
        }
        document.body.appendChild(iframe)
      },
      apply(item) {
        this.$router.push({name: 'dataDetail',params:{id:item.dataId}})
        // 有条件共享申请
        // 无条件共享申请
        // if (item.shareType === '01') {
        //   API.Common.applyData({
        //     busId: item.dataId,
        //     busType: '02',
        //     shareType: '01'
        //   }).then((res) => {
        //     if (res.status === 'OK') {
        //       layer.msg('申请成功！')
        //     } else {
        //       layer.msg(res.message);
        //     }
        //   })
        // } else {
        //   // 有条件共享申请
        //   this.$router.push({
        //     name: 'resApply', params: {
        //       id: item.dataId, type: 'data', name: item.serviceName,
        //       depName: item.depName, description: item.description
        //     }
        //   })
        // }

      },
      showView(id, dataId) {
        this.commmonParam.id = id;
        this.dataId = dataId;
        this.getDetail();
        this.getUserCommon();
        this.viewFlag = true;
        this.layerIndex = layer.open({
          type: 1,
          title:'详情',
          shadeClose: false,
          area: ['854px', '624px'],
          content: $('#viewShow'),
          end: () => {
            this.viewFlag = false;
            this.detail = '';
            this.commonInfo = '';
          }
        })
      },
      getDetail() {
        API.Data.getDataDetail({
          dataId: this.dataId
        }).then((res) => {
          this.detail = res.result;
          this.fileTableData.push({
            'fileName': res.result.fileName,
            'fileType': res.result.fileType,
            'fileSize': res.result.fileSize,
          })
        })
      },
      getUserCommon() {
        //this.commmonParam.busId = this.dataId;
        API.Common.querydetail(this.commmonParam).then(res => {
          this.commonInfo = res.result
        })
      },
      follow() {
        if (this.detail.attentionFlag) {
          // 取消关注
          API.Data.unFollowData({
            dataId: this.detail.id
          }).then((res) => {
            if (res.status === 'OK') {
              this.detail.attentionFlag = false;
              this.detail.attentionCount = this.detail.attentionCount - 1
            }
          })
        } else {
          // 关注
          API.Data.followData({
            dataId: this.detail.id
          }).then((res) => {
            if (res.status === 'OK') {
              this.detail.attentionFlag = true;
              this.detail.attentionCount = this.detail.attentionCount + 1
            }
          })
        }
      },
      applyClick() {
        API.Data.checkApplyUndoStatus({
          dataId: this.id
        }).then((res) => {
          if (res.result > 0) {
            layer.msg('该数据申请中请勿重复申请')
          } else {
            this.apply1()
          }
        })
      },
      apply1 () {
        if (!this.user.userId) {
          this.$router.push({name: 'login', query: { service: window.location.href }})
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
            }else{
              layer.msg(res.message);
            }
          })
        } else {
          // 有条件共享申请
          this.$router.push({name:'resApply', params: {id: this.id,type:'data',name:this.detail.name,
              depName:this.detail.depName,description:this.detail.description}})
        }
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
    },
    computed: {
      formatUpdatedTime() {
        return moment(this.detail.updatedTime).format('YYYY-MM-DD')
      }
    },
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/css/user_common.css";
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #F8F8F8;
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
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    background-color: rgba(222, 222, 222, .3);
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(21, 166, 255, .6);
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
    transition: all .3s;
    font-size: 15px;
    cursor: pointer;
  }

  .right-main {
    font-size: 10px;
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
</style>
