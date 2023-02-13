<template>
  <div class="user-content">
    <div class="query-box">
      <div class="row">
        <el-row>
        <el-col :span="7">
          <div class="formLabel">受理单位</div>
          <select class="base-imput" v-model="params.supplyDepCode">
            <!--<option value="">全部</option>-->
            <option v-for="dep in deptList" :value="dep.dep_code">{{dep.dep_name}}</option>
          </select>
        </el-col>
        <el-col :span="7">
          <div class="formLabel">资源名称</div>
          <input type="text" class="base-imput" v-model="params.resName" placeholder="请输入资源名称" style="padding-left: 10px;"/>
        </el-col>
       <el-col :span="7">
         <div class="formLabel">异议类型</div>
         <select class="base-imput" v-model="params.type">
           <option v-for='rt in typeList' :value='rt.code'>
             {{ rt.name }}
           </option>
         </select>
       </el-col>
        <el-col :span="7">
          <div class="formLabel">状态</div>
          <select class="base-imput" v-model="params.status">
            <option value="">全部</option>
            <!--<option value="0">暂存</option>-->
            <option value="10">待受理</option>
            <option value="20">待处理</option>
            <option value="30">处理中</option>
            <option value="40">已办结</option>
            <option value="90">不予受理</option>
          </select>
        </el-col>
        <el-col :span="7">
          <div class="formLabel">提交时间</div>
          <vue-datepicker-local
            id="publishTimeStart"
            inputClass="datePickerInput"
            v-model="params.publishTimeStart"
            placeholder="提交时间" />
        </el-col>
        <el-col :span="7">
          <div class="formLabel">至</div>
          <vue-datepicker-local
            id="publishTimeEnd"
            inputClass="datePickerInput"
            v-model="params.publishTimeEnd"
            :disabled-date="disabledStart"
            placeholder="至" />
        </el-col>
        <el-col :span="3">
          <el-button href="javascript:;" class="btn_query" @click="query">查询</el-button></el-col>
    </el-row>
    </div>
    </div>
    <div class="center-content">
      <table class="table" id="objectionTable">
      <tr>
        <th>问题描述</th>
        <th>异议类型</th>
        <th>提出时间</th>
        <th>受理单位</th>
        <th>状态</th>
        <th>最新进展</th>
        <th>操作</th>
      </tr>
      <tbody>
        <template v-if="list.length > 0">
          <tr v-for="(item, index) in list">
            <td>{{ item.description}}</td>
            <td>{{ item.typeDesc }}</td>
            <td>{{ item.createdTime | formatTime }}</td>
            <td>{{ item.supplyDepName }}</td>
            <td>{{ item.statusDesc }}</td>
            <td>{{ item.updatedComment }}</td>
            <td>
              <a href="javascript:;" @click="checkDetail(item.id)">查看</a> &nbsp;
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="8">暂无数据</td>
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
    </div>
    <div class="demand-detail" v-show="showDetail" id="demand_detail">
      <div class="section">
        <div class="section-title">
          <span>结果反馈</span>
        </div>
        <div>
          <template v-if="demand.history != null && demand.history.length!=0">
            <div class="demanHistoryItem">
              <el-col :span="2">
                <div class="user_demand_step1">
                  <img src="../../../../assets/images/icons/demand_jgfk_sel.svg" alt="">
                </div>
                <p class="user_demand_step_title">已办结</p>
                <div class="step1_line"></div>
                <div class="user_demand_step1">
                  <img src="../../../../assets/images/icons/demand_xycl_sel.svg" alt="">
                </div>
                <p class="user_demand_step_title">处理中</p>
                <div class="step2_line"></div>
                <div class="user_demand_step1">
                  <img src="../../../../assets/images/icons/demand_tjxq_sel.svg" alt="">
                </div>
                <p class="user_demand_step_title">待受理</p>

              </el-col>
              <el-col :span="20" class="feedbackList" v-for="history in demand.historyList" :key="index">
                <el-col :span="3">
                  <p class="dateD">06日</p>
                </el-col>
                <el-col :span="20" style="margin-left: 14px;">
                  <div class="dateYM">
                    {{history.updatedTime | formatTime}}
                  </div>
                  <div class="demandState">
                    您的需求{{history.statusAfterDesc}}
                  </div>
                  <div class="demandReply">
                    回复:{{history.updatedComment}}
                  </div>
                </el-col>

              </el-col>
            </div>
          </template>
          <template v-else="">
            <span>暂无进展</span>
          </template>
        </div>

      </div>
      <div class="section">
        <div class="section-title">
          <span>需求详情</span>
        </div>
        <div class="section-body">
          <ul>
            <li>
              <span class="property">资源名称：</span>
              <span>{{demand.resName}}</span>
            </li>
            <li>
              <span class="property">提供单位：</span>
              <span>{{demand.supplyDepName}}</span>
            </li>
            <li>
              <span class="property">资源描述：</span>
              <span>{{demand.resDescription}}</span>
            </li>
            <li>
              <span class="property">问题类型：</span>
              <span>{{demand.typeDesc}}</span>
            </li>
            <li>
              <span class="property">问题描述：</span>
              <span>{{demand.description}}</span>
            </li>
            <!--<li>
              <span class="property">参考链接：</span>
              <span>{{demand.referUrl}}</span>
            </li>
            <li>
              <span class="property">期望解决日期：</span>
              <span>{{demand.expectTime | formatTime}}</span>
            </li>-->
            <li>
              <span class="property">联系人：</span>
              <span>{{demand.contractPerson}}</span>
            </li>
            <li>
              <span class="property">联系电话：</span>
              <span>{{demand.contractPhone}}</span>
            </li>
            <li>
              <span class="property">电子邮箱：</span>
              <span>{{demand.contractEmail}}</span>
            </li>
            <li>
              <span class="property">附件：</span>
              <span style="margin-right: 20px" v-for="file in demand.fileList"><a style="color: rgba(0,170,113,1)" :href="file.fileUrl">{{file.fileName}}</a></span>
            </li>
            <li>
              <span class="property">提交人：</span>
              <span>{{demand.publishName}}</span>
            </li>
            <li>
              <span class="property">提交时间：</span>
              <span>{{demand.publishTime | formatTime}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/common/api'
  import VueDatepickerLocal from 'vue-datepicker-local'
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'
  import name from '@/common/validation/name'
  import mobile from '@/common/validation/mobile'
  import moment from 'moment'
  import {formatDate} from "element-ui/src/utils/date-util";
  export default {
    data () {
      return {
        showDetail: false,
        showEdit: false,
        uploadFileUrl:"/ro/share-requirement-api/uploadFile.do",
        uploadFiles:[],
        typeList: [
            { code: '01', name: '信息项缺失' },
            { code: '02', name: '信息项描述错误/不准确' },
            { code: '03', name: '共享资源不能正常使用' },
            { code: '04', name: '共享资源与目录不匹配' },
            { code: '05', name: '资源目录基本信息不准确' },
            { code: '06', name: '更新频率不符' },
            { code: '07', name: '其他' }
          ],
        list: [],
        deptList: [],
        pageInfo: {
          totalPage: 0
        },
        params: {
          page: 1,
          pageSize: 10,
          supplyDepCode: '',
          supplyDepName: '',
          resName: '',
          type: '',
          status: '',
          publishTimeStart:'',
          publishTimeEnd:''
        },
        layerIndex: '',
        demand: {}
      }
    },
    validations: {
      demand: {
        name: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(20),
          name
        },
        description: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200)
        },
        contractPerson: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200)
        },
        contractPhone: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(200),
          mobile
        }

      }
    },
    watch: {
      params: {
        handler (val) {
          this.queryList()
        }
      }
    },
    created () {
      this.queryList()
      this.getDeptList()
    },
    methods: {
      reset(){
        this.params.supplyDepCode = ''
        this.params.supplyDepName = ''
        this.params.resName = ''
        this.params.type = ''
        this.params.status = ''
        this.params.publishTimeStart =''
        this.params.publishTimeEnd =''
      },
      disabledStart(time){
        return new Date(this.params.publishTimeStart) >= time
      },
      disabledDate (time) {
        return new Date() >= time
      },
      getDeptList () {
        this.deptList = []
        API.Dict.getDepsByNode().then((res) => {
          this.deptList = res.result
        })
      },
      queryList () {
        this.list = []
        this.params.publishTimeStart = formatDate(this.params.publishTimeStart,"yyyy-MM-dd")
        this.params.publishTimeEnd = formatDate(this.params.publishTimeEnd,"yyyy-MM-dd")
        API.Objection.getMyObjectionList(this.params).then((res) => {
          this.list = res.result.list
          this.pageInfo = res.result.page
        })
      },
      jumpPage (page) {
        this.params.page = page
        this.queryList()
      },
      query () {
        this.params.page = 1
        this.queryList()
      },
      checkDetail (id) {
        this.showDetail = true
        this.demand = {}
        API.Objection.getDetailForUC({id: id}).then((res) => {
          this.demand = res.result
        })
        this.layerIndex = layer.open({
          type: 1,
          btn: [],
          title: '查看详情',
          shadeClose: true,
          area: ['860px', '620px'],
          content: $('#demand_detail'),
          btn1: (index) => {
            layer.closeAll()
            this.showDetail = false
          },
          end: () => {
            this.showDetail = false
          }
        })
      }
    },
    components: {
      VueDatepickerLocal
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
  @import "../../../../assets/css/user_common.css";
  .user-content {
    background: #fff;
    padding:28px;
  }
  .query-box {
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    .row {
      display: table-row;
      height: 36px;
      line-height: 36px;
      .formLabel{
        float: left;
        width: 26%;
        text-align: right;
        margin-right: 5px;
      }
      .base-imput {
        height: 28px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        /*border: 1px solid rgba(204,204,204,1);*/
        width: 60%
      }
      .btn_query{
        width: 57px;
        height: 23px;
        background: rgba(0,170,113,1);
        border-radius: 1px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        vertical-align: middle;
        line-height: 0px;
        margin-top: 10px;
      }
      .center-content {
        .el-table td div{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(0,0,0,0.65);
          line-height:15px;
        }
        .el-table thead{
          color:rgba(0,0,0,0.65);
        }
      }
      #publishTimeStart{
        width: 60%;
      }
      #publishTimeEnd{
        width: 60%;
      }
      .datepicker{
        input{
          height: 28px;
          font-size:12px;
          font-family:PingFangSC-Regular ;
          font-weight:400;
          color:rgba(153,153,153,1);
        }
      }



    }
  }
  .center-content {
    padding: 30px 0;
    color: #666;
  }
  .section {
    padding: 28px;
    .section-title {
      border-bottom: 1px solid #ccc;
      span {
        display: inline-block;
        padding: 5px;
        border-bottom: 2px solid @linkColor;
      }
    }
    .section-body {
      color: #5a5a5a;
      margin-top: 28px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51,51,51,1);
      ul {
        li {
          line-height: 40px;
          position: relative;
          .property {
            display: inline-block;
            min-width: 100px;
            vertical-align: top;
            text-align: right;
          }
          span:last-child {
            display: inline-block;
            word-break: break-all;
          }
        }
      }
      .user_demand_step1 img {
        width:14px;
        height:14px;
      }
      .user_demand_step1{
        width:34px;
        height:34px;
        background:rgba(0,170,113,1);
        border:3px solid rgba(255,255,255,1);
        text-align: center;
        line-height: 34px;
        border-radius: 17px;
      }
      .user_demand_step_title{
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,170,113,1);
        line-height:10px;
      }
      .step1_line{
        width:1px;
        height:55px;
        background:rgba(134,219,162,1);
        margin-left: 25%;
        margin-top: 6px;
        margin-bottom: 6px;
      }
      .step2_line{
        width:1px;
        height:148px;
        background:rgba(134,219,162,1);
        margin-left: 25%;
        margin-top: 6px;
        margin-bottom: 6px;
      }
      .dateD{
        font-size: 17px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0,170,113,1);
        line-height: 17px;
        text-align: right;
      }
      .dateYM{
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 10px;
        margin-bottom:4px;
        border-bottom:1px solid rgba(237,237,237,1);;
      }
      .demandState{

        font-size:13px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:13px;
        margin-top:11px;
        margin-bottom:17px;
      }
      .demandReply{
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:10px;
      }
      .demanHistoryItem{
        height: 360px; margin-top: 28px;
      }
      .feedbackList {
        margin-bottom:28px
      }
    }
  }
  form{
      .form-item{
        .not-null{
          color: red;
          margin-right: 2px;
        }
        .form-item-content{
          input{
            width: 100%
          }
          .demand-type{
            width: 100%;
            height: 36px;
          }
          .tag{
            position: relative;
            background-color: rgba(241, 241, 241, 1);
            height:36px;
            display:inline-block;
            min-width:60px;
            *display:inline;
            *zoom:1;
            border: 1px solid #ccc;
            line-height:36px;
            text-align: center;
            a {
              cursor: pointer;
              line-height:12px;
              font-size:9px;
              color: #ccc;
              position: absolute;
              top: 2px;
              right: 2px;
            }
            a:hover{
              color: #999;
            }
          }
        }
        .btn-save{
          text-align: center;
          a {
            display: inline-block;
            width: 95px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            border: 1px solid @textlightColor;
            background: @textlightColor;
            color: #fff;
            border-radius: 5px;
            transition: all .3s;
            &:hover {
              background: @textlightColor;
            }
            &:last-child {
              margin-left: 25px;
            }
          }
        }
        .table {
          tr {
            td {
              border-left: 1px solid #ccc;
            }
          }
        }
      }
    }

  .datePickerBlock{
    width:60%;
    font-size:12px ;
  }
  .datePickerBlock .datepicker-popup{
    padding:0;
    width:200px;
  }

  .selectInput{
    width:60%;
  }
  .selectInput .el-input{
    font-size: 10px;
  }
  .selectInput .el-input--suffix .el-input__inner{
    font-size: 10px;
  }
  .layui-layer-btn .layui-layer-btn0{
    border-color: @textlightColor;
    background-color: @textlightColor;
  }
  .layui-layer-page .layui-layer-btn, .layui-layer-iframe .layui-layer-btn{
    text-align: center
  }
</style>
<style>
  .datePickerInput{
    font-size:12px!important;
    font-family:PingFangSC-Regular ;
    font-weight:400;
    color:rgba(153,153,153,1);
    height: 28px!important;
  }
  .btn_query span{
    margin-left:-4px;
  }
</style>
