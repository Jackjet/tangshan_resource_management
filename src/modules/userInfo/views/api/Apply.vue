<template>
  <div class="rightBlock" id="userMyAPIRight">
    <table class="table" id="applyApiTable">
      <tr>
        <th width="20%">资源名称</th>
        <th width="20%">信息项需求</th>
        <th width="20%">业务需求场景</th>
        <th>申请时间</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tbody>
      <template v-if="list.length > 0">
        <tr v-for="(item, index) in list">
          <td>{{ item.serviceName }}</td>
          <td>{{ cutString(item.itemreq,18) }}</td>
          <td>{{ cutString(item.busreq,18) }}</td>
          <td>{{ item.applyTime | formatTime }}</td>
          <td v-if="item.reviewedStatus === 0">未受理</td>
          <td v-if="item.reviewedStatus === 1">已受理</td>
          <td v-if="item.reviewedStatus === 2">审核通过</td>
          <td v-if="item.reviewedStatus === 3">审核驳回</td>
          <td v-if="item.reviewedStatus === 4">受理驳回</td>
          <td>
            <a href="javascript:;" @click="showView(item.id, item.serviceId, item.serviceName)">查看</a>
            <a href="javascript:;" v-if="item.reviewedStatus == 0 || item.reviewedStatus == 3" @click="update(item)">修改</a>
            <a href="javascript:;" v-if="item.shareType !== '01' || (item.shareType !== '02' && !compareDate(item.endTime))" @click="apply(item)">再次申请</a>
            <a href="javascript:;" v-if="item.reviewedStatus == 0" @click="del(item)">删除</a>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="7">暂无数据</td>
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
        <div class="pt28 detailFormItem">
          <label>资源名称:</label>
          <div class="detailInput">
            <span v-if="serviceName!==null">{{serviceName}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>数据提供方式:</label>
          <div class="detailInput">
            <span v-if="commonInfo.purpose!==null">{{commonInfo.purpose}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>使用期限:</label>
          <div class="detailInput">
            <span v-if="commonInfo.useDate!==null">{{commonInfo.useDate}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>申请时间:</label>
          <div class="detailInput">
          <span v-if="commonInfo.applyTime!==null">{{commonInfo.applyTime}}</span>
          <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>联系人:</label>
          <div class="detailInput">
            <span v-if="commonInfo.apply_user_name!==null">{{commonInfo.apply_user_name}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>手机号:</label>
          <div class="detailInput">
            <span v-if="commonInfo.apply_user_phone!==null">{{commonInfo.apply_user_phone}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>办公电话:</label>
          <div class="detailInput">
            <span v-if="commonInfo.apply_user_tel!==null">{{commonInfo.apply_user_tel}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem" style="width: 100%">
          <label>业务需求场景:</label>
          <div class="detailInput"  style="width: 80%;height: auto;">
            <span v-if="commonInfo.busreq!==null">{{commonInfo.busreq}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem" style="width: 100%">
          <label>信息项需求:</label>
          <div class="detailInput" style="width: 80%;height: auto;">
          <span v-if="commonInfo.itemreq!==null">{{commonInfo.itemreq}}</span>
          <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem" style="width: 100%">
          <label>申请依据:</label>
          <div class="detailInput" style="width: 80%;height: auto;">
            <span v-if="commonInfo.explains!==null">{{commonInfo.explains}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem" style="width: 100%">
          <label>申请依据文件:</label>
          <div class="detailInput" style="height: auto;">
            <div v-for="(item,index) in commonInfo.files" :key="index">
          <a v-if="item.fileKey!=null" :href="item.url">{{item.fileName}}.{{item.fileType}}</a>
          <span v-else>无</span>
            </div>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>受理状态:</label>
          <div class="detailInput">
          <span v-if="commonInfo.reviewedStatus==='0'">未受理</span>
          <span v-if="commonInfo.reviewedStatus==='1'">已受理</span>
          <span v-if="commonInfo.reviewedStatus==='2'">审核通过</span>
          <span v-if="commonInfo.reviewedStatus==='3'">审核驳回</span>
          <span v-if="commonInfo.reviewedStatus==='4'">受理驳回</span>
          <span v-if="commonInfo.reviewedStatus===null">无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>受理时间:</label>
          <div class="detailInput">
          <span v-if="commonInfo.checkTime!==null">{{commonInfo.checkTime}}</span>
          <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>受理意见:</label>
          <div class="detailInput">
          <span v-if="commonInfo.checkContent!==null">{{commonInfo.checkContent}}</span>
          <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem">
          <label>审核时间:</label>
          <div class="detailInput">
          <span v-if="commonInfo.checkTimeFinal!==null">{{commonInfo.checkTimeFinal}}</span>
          <span v-else>无</span>
          </div>
        </div>
        <div class="pt28 detailFormItem" style="width: 100%">
          <label>审核意见:</label>
          <div class="detailInput">
          <span v-if="commonInfo.checkContentFinal!==null">{{commonInfo.checkContentFinal}}</span>
          <span v-else>无</span>
          </div>
        </div>
      </div>
     <!--<div class="">
       <el-row>
          <el-col :span="3" class="detail_left">
            <div class="user_detail_img">
              <img :src="detail.iconUrl" alt="">
            </div>
            <div class="isAttention" v-if="detail.attentionFlag" @click="follow()"><img
              src="../../../../assets/images/icons/user_attention.svg" alt="已关注">取消关注
            </div>
            <div class="isAttention" v-else @click="follow()">关注</div>
          </el-col>
          <el-col :span="20">
            <div class="detail_right">
              <div style="height: 22px;">
                <div class="detail_title">{{detail.apiServiceCName}}</div>
                <div class="detail_look">
                  <img src="../../../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 24px">{{detail.viewCnt}}</span>
                  <img src="../../../../assets/images/icons/ico_02.svg" alt=""><span style="margin-right: 24px">{{detail.attentionCnt}}</span>
                  <img src="../../../../assets/images/icons/ico_04.svg" alt=""><span>{{detail.applyCnt}}</span>
                </div>
              </div>
              <div class="identify">
                <div v-for="item in getTag(detail.tagsName)">
                    <el-tag>{{item}}</el-tag>
                </div>
                <div class="identify_label">{{detail.depName}}</div>
              </div>
              <div class="detail_content">
                  <el-col :span="6" class="tl">
                    <label for="">API状态:</label>
                    <span>{{detail.statusDesc}}</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">主题领域:</label>
                    <span>健康保障</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">所属部门:</label>
                    <span>{{detail.depName}}</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">共享类型:</label>
                    <span v-if="detail.shareType==='01'">无条件共享</span>
                    <span v-if="detail.shareType==='02'">有条件共享</span>
                    <span v-if="detail.shareType==='03'">不允共享</span>
                  </el-col>
                 &lt;!&ndash; <el-col :span="7" class="tl">
                    <label for="">更新时间:</label>
                    <span>{{formatUpdatedTime}}</span>
                  </el-col>&ndash;&gt;
                  <el-col :span="24" class="tl">
                    <label for="">关联目录:</label>
                    <span v-if="detail.strRes===''">无</span>
                    <span v-if="detail.strRes!==''">{{detail.strRes}}</span>
                  </el-col>
                  <el-col :span="24" class="tl">
                    <label for="">资源描述:</label>
                    <span style="line-height: 25px;">{{detail.description}}</span>
                  </el-col>
                </div>
            </div>
          </el-col>
          </el-row>
        </div>-->
     <!--<div class="dialog_tabs">
          <el-tabs v-model="activeName">
            <el-tab-pane label="关联目录" name="first">
              <template>
                <el-table :data="detail.relList" border
                          :header-cell-style="{
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
                <el-collapse accordion v-for="item in detail.apiList" :item="item" :key="item.apiId">
                  <el-collapse-item :title="item.apiCName" name="1">
                    <div class="right-main">
                      <p>接口地址：{{item.encodeUri}}
                        &lt;!&ndash;<button class="btn-test" @click="debug">调试</button>&ndash;&gt;
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
          </el-tabs>
        </div>-->
    </div>

  </div>
</template>
<script>
  import API from '@/common/api/index'
  import moment from 'moment'
  import showdown from 'showdown'

  export default {
    data() {
      return {
        activeName: 'first',
        list: [],
        pageInfo: {
          totalPage: 0
        },
        params: {
          page: 1,
          pageSize: 10
        },
        name:'',
        layerIndex: '',
        type: 'api',
        serviceId: '',
        serviceName:'',
        viewFlag: false,
        commonInfo: '',
        commmonParam: {
         // busId: '',
         // busType: '01',
          id: 0
        },
        detail: '',
        user: {'userId': true},
        applyStatusTip: ''
      }
    },
    watch: {
      params: {
        handler(val) {
          this.queryList()
        },
        deep: true
      }
    },
    created() {
      this.queryList()
    },
    methods: {
      queryList() {
        API.Api.getMyUseApiList(this.params).then((res) => {
          this.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage(page) {
        this.params.page = page
      },
      follow() {
        if (this.detail.attentionFlag) {
          // 取消关注
          API.Api.unFollowApi({
            apiServiceId: this.serviceId
          }).then((res) => {
            if (res.status === 'OK') {
              this.detail.attentionFlag = false;
              this.detail.attentionCnt = this.detail.attentionCnt - 1
            }
          })
        } else {
          // 关注
          API.Api.followApi({
            apiServiceId: this.serviceId
          }).then((res) => {
            if (res.status === 'OK') {
              this.detail.attentionFlag = true;
              this.detail.attentionCnt = this.detail.attentionCnt + 1
            }
          })
        }
      },
      apply(item) {
        this.$router.push({name: 'resCatalogDetail',params:{id:item.serviceId}})
        // if (item.shareType === '01') {
        //   // 无条件共享
        //   API.Common.applyApi({
        //     busId: item.serviceId,
        //     busType: '01',
        //     shareType: '01'
        //   }).then((res) => {
        //     if (res.status === 'OK') {
        //       layer.msg('申请成功！')
        //       this.queryList()
        //     } else {
        //       layer.msg(res.message);
        //     }
        //   })
        // } else {
        //   // 有条件共享
        //   this.$router.push({
        //     name: 'resApply', params: {
        //       id: item.serviceId, type: 'api', name: item.serviceName,
        //       depName: item.depName, description: item.description
        //     }
        //   })
        // }
      },
      del(item) {
        API.Common.delApply({id:item.id}).then(res => {
          layer.msg(res.result);
          this.queryList()
        })
      },
      update(item) {
        this.$router.push({name:'resApplyUpdate', params: {id: item.id,type:'cata',name:item.serviceName,
          depName:item.depName,description:item.description}})
      },
      showView(id, serviceId,name) {
        this.commmonParam.id = id;
        this.serviceId = serviceId;
        this.serviceName=name
//        this.getDetail();
        this.getUserCommon();
        this.viewFlag = true;
        this.layerIndex = layer.open({
          type: 1,
          title: '详情',
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
      getDetail() {
        API.Api.getApiDetail({
          apiServiceId: this.serviceId
        }).then((res) => {
          this.detail = res.result;
          this.handleMarkdown();
          this.applyStatusShow()
        })
      },
      getUserCommon() {
        //this.commmonParam.busId = this.serviceId;
        API.Common.querydetail(this.commmonParam).then(res => {
          this.commonInfo = res.result
          if(res.result.purpose){
            this.commonInfo.purpose=res.result.purpose.substring(0,res.result.purpose.length-1)
          }
          if(this.commonInfo.checkTime){
            this.commonInfo.checkTime=this.commonInfo.checkTime.substring(0,10)
          }
          if(this.commonInfo.checkTimeFinal){
            this.commonInfo.checkTimeFinal=this.commonInfo.checkTimeFinal.substring(0,10)
          }
        })
      },
      apply1() {
        if (!this.user.userId) {
          this.$router.push({name: 'login', query: {service: window.location.href}});
          return
        }
        if (this.detail.applyStatus === true) {
          layer.msg("您已经申请过此接口！");
          return
        }
        if (this.detail.shareType === '01') {
          // 无条件共享
          API.Common.applyApi({
            busId: this.serviceId,
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
              id: this.serviceId, type: 'api', name: this.detail.apiServiceCName,
              depName: this.detail.depName, description: this.detail.description
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
      },
      applyStatusShow() {
        if (this.detail.applyStatus === 0) {
          this.applyStatusTip = '待审核';
          this.detail.applyStatus = true
        } else if (this.detail.applyStatus === 1) {
          this.applyStatusTip = '已通过';
          this.detail.applyStatus = true
        } else {
          this.applyStatusTip = '申请';
          this.detail.applyStatus = false
        }
      },
      cutString(str, len) {
        //length属性读出来的汉字长度为1
        if (str==null||str.length * 2 <= len) {
          return str;
        }
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
          s = s + str.charAt(i);
          if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
              return s.substring(0, s.length - 1) + "...";
            }
          } else {
            strlen = strlen + 1;
            if (strlen >= len) {
              return s.substring(0, s.length - 2) + "...";
            }
          }
        }
        return s;
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

  .condition_label {
    display: flex;
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
