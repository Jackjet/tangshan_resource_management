<template>
  <div  class="rightBlock" id="userMyServiceRight">
    <table class="table" id="applyServiceTable">
      <tr>
        <th>云服务名称</th>
        <th>共享类型</th>
        <th width="27%">云服务描述</th>
        <th>申请时间</th>
        <th>截止时间</th>
        <th>使用次数</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tbody>
      <template v-if="list.length > 0">
        <tr v-for="(item, index) in list">
          <td>{{ item.appName }}</td>
          <td>{{ item.shareType === '01' ? '无条件共享' : '有条件共享' }}</td>
          <td class="serviceDescript" :title=item.description>{{ item.description }}</td>
          <td>{{ item.applyTime | formatTime }}</td>
          <td>{{ item.endTime | formatTime }}</td>
          <td>{{ item.useCount || 0 }}</td>
          <td v-if="item.reviewedStatus === 0">未审核</td>
          <td v-if="item.reviewedStatus === 1">初审通过</td>
          <td v-if="item.reviewedStatus === 2">终审通过</td>
          <td v-if="item.reviewedStatus === 3">审核拒绝</td>
          <td>
            <a href="javascript:;" @click="showView(item.id, item.appId)">查看</a>
            <a href="javascript:;" v-if="item.shareType !== '01' || (item.shareType !== '02' && !compareDate(item.endTime))" @click="apply(item)">再次申请</a>
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
        <div  class="pt28 detailFormItem">
          <label for="">资源用途:</label>
          <div class="detailInput">
            <span v-if="commonInfo.purpose!==null">{{commonInfo.purpose}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">使用期限:</label>
          <div class="detailInput">
            <span v-if="commonInfo.useDate!==null">{{commonInfo.useDate}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">申请时间:</label>
          <div class="detailInput">
            <span v-if="commonInfo.applyTime!==null">{{commonInfo.applyTime}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">说明:</label>
          <div class="detailInput">
            <span v-if="commonInfo.explains!==null">{{commonInfo.explains}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">申请依据文件:</label>
          <div class="detailInput">
             <a v-if="commonInfo.fileKey!=null"  :href="commonInfo.fileKey">{{commonInfo.fileName}}.{{commonInfo.fileType}}</a>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">审核状态:</label>
          <div class="detailInput">
            <span v-if="commonInfo.reviewedStatus==='0'">未审核</span>
            <span v-if="commonInfo.reviewedStatus==='1'">初审通过</span>
            <span v-if="commonInfo.reviewedStatus==='2'">终审通过</span>
            <span v-if="commonInfo.reviewedStatus==='3'">审核拒绝</span>
            <span v-if="commonInfo.reviewedStatus===null">无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">初审时间:</label>
          <div class="detailInput">
            <span v-if="commonInfo.checkTime!==null">{{commonInfo.checkTime}}</span>
            <span v-else>无</span>
          </div>
        </div>
        <div  class="pt28 detailFormItem">
          <label for="">初审意见:</label>
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
              <img :src="detail.imageUri" alt="">
            </div>
            <div class="isAttention"  @click="follow">
              <img v-if="detail.attentionFlag===false" src="../../../../assets/images/icons/user_attention.svg"
                   alt="">
              <img v-if="detail.attentionFlag===true" src="../../../../assets/images/icons/user_attention.svg" alt="">
              {{detail.attentionFlag===false?'未关注':'已关注'}}
            </div>
          <!--  <div class="feedback_idea" style="cursor: pointer;" @click="apply1">申请</div>-->
          </el-col>
          <el-col :span="20">
            <div class="detail_right">
              <div style="height: 22px;">
                <div class="detail_title">{{detail.name}}</div>
                <div class="detail_look">
                  <img src="../../../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 17px">{{detail.viewCount}}</span>
                  <img src="../../../../assets/images/icons/ico_02.svg" alt=""><span style="margin-right: 17px">{{detail.attentionCount}}</span>
                  <img src="../../../../assets/images/icons/ico_04.svg" alt=""><span>{{detail.applyCount}}</span>
                </div>
              </div>
              <div class="identify">
                  <div v-for="item in getTag(detail.tagNames)" class="identifyTag">
                    <el-tag>{{item}}</el-tag>
                </div>
                <div class="identify_label">{{detail.depName}}</div>
              </div>
              <div  class="detail_content">
                  <el-col :span="6" class="tl">
                    <label for="">提供单位:</label>
                    <span>{{detail.depName}}</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">联系人:</label>
                    <span>{{detail.linkman}}</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">联系方式:</label>
                    <span>{{detail.telephone}}</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">发布时间:</label>
                    <span>{{formatUpdatedTime}}</span>
                  </el-col>
                  <el-col :span="6" class="tl">
                    <label for="">共享类型:</label>
                    <span v-if="detail.shareType==='01'">无条件共享</span>
                    <span v-if="detail.shareType==='02'">有条件共享</span>
                    <span v-if="detail.shareType==='03'">不允共享</span>
                  </el-col>
                  <el-col :span="18" class="tl">
                    <label for="">共享条件:</label>
                    <span style="line-height: 25px;">{{detail.shareCondition}}</span>
                  </el-col>
                  <el-col :span="24" class="tl">
                    <label for="">描述:</label>
                    <span style="line-height: 25px;">{{detail.description}}</span>
                  </el-col>
              </div>
            </div>
          </el-col>
          </el-row>
        </div>
      <div class="dialog_tabs">
          <el-tabs v-model="activeName">
            <el-tab-pane label="关联目录" name="first">
              <template>
                <el-table :data="detail.cataList" border
                          :header-cell-style="{
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
                    <img :src="detail.demoImage1"/>
                    <img :src="detail.demoImage2"/>
                    <img :src="detail.demoImage3"/>
                  </p>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
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
        list: [],
        pageInfo: {
          totalPage: 0
        },
        user: {'userId': true},
        params: {
          page: 1,
          pageSize: 5
        },
        layerIndex: '',
        type: 'app',
        serviceId: '',
        appId: '',
        viewFlag: false,
        commonInfo: '',
        commmonParam: {
          id: 0
        },
        detail: '',
        activeName: 'first',
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
      this.queryList();
    },
    methods: {
      queryList() {
        API.App.getMyUseApiList(this.params).then((res) => {
          this.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      showView(id, appId) {
        this.commmonParam.id = id;
        this.appId = appId;
        this.getDetail();
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
      apply1() {
        if (!this.user.userId) {
          this.$router.push({name: 'login', query: {service: window.location.href}});
          return
        }
        if (this.detail.shareType === '01') {
          // 无条件共享
          API.Common.applyApp({
            busId: this.appId,
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
              id: this.appId, type: 'app', name: this.detail.name,
              depName: this.detail.depName, description: this.detail.description
            }
          })
        }
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
      getTag(tagStr) {
        var tag;
        try {
          tag = tagStr.split(",");
          return tag;
        } catch (e) {
          return tag;
        }
      },
      getDetail() {
        API.App.getAppDetail({
          id: this.appId
        }).then((res) => {
          this.detail = res.result;
          this.handleMarkdown()
        })
      },
      follow() {
        if (this.detail.attentionFlag) {
          // 取消关注
          API.App.unFollowApp({
            id: this.appId
          }).then((res) => {
            if (res.status === 'OK') {
              this.detail.attentionFlag = false
              this.detail.attentionCount = this.detail.attentionCount - 1
            }
          })
        } else {
          // 关注
          API.App.followApp({
            id: this.appId
          }).then((res) => {
            if (res.status === 'OK') {
              this.detail.attentionFlag = true
              this.detail.attentionCount = this.detail.attentionCount + 1
            }
          })
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
          item.testPacket = converter.makeHtml(item.testPacket)
          item.directions = converter.makeHtml(item.directions)
        });
        this.detail.rtnCode = converter.makeHtml(this.detail.rtnCode)
      },
      getUserCommon() {
        //this.commmonParam.busId = this.appId;
        API.Common.querydetail(this.commmonParam).then(res => {
          this.commonInfo = res.result
        })
      },
      jumpPage(page) {
        this.params.page = page
      },
      apply(item) {
          this.$router.push({name: 'serviceDetail',params:{id:item.appId}})

        // if (item.shareType === '01') {
        //   // 无条件共享
        //   API.Common.applyApp({
        //     busId: item.appId,
        //     busType: '03',
        //     shareType: '01'
        //   }).then((res) => {
        //     if (res.status === 'OK') {
        //       layer.msg('申请成功！')
        //     } else {
        //       layer.msg(res.message);
        //     }
        //   })
        // } else {
        //   this.$router.push({
        //     name: 'resApply', params: {
        //       id: item.appId, type: 'app', name: item.appName,
        //       depName: item.depName, description: item.description
        //     }
        //   })
        // }
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
  .serviceDescript {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
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

</style>
