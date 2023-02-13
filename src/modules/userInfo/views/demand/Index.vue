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
          <div class="formLabel">标题</div>
          <input type="text" class="base-imput" v-model="params.name" placeholder="请输入需求标题" style="padding-left: 10px;"/>
        </el-col>
        <el-col :span="7">
          <div class="formLabel">需求类型</div>
        <!--  <select class="base-imput" v-model="params.resourceTypeList">
            <option value="" selected>请选择</option>
            <option  v-for='rt in resourceTypeList' :key="rt.code" :value="rt.code">{{rt.name}}</option>
          </select>-->
       <!--   <el-tag  v-for='rt in resourceTypeList'
                   :key="index">{{tag.name}}</el-tag>-->
         <!-- <select class="base-imput" multiple>
            <option :value='rt.code'>
              {{ rt.name }}
            </option>
          </select>-->
          <cascaderMulti size="small" style="width: 60%;display: inline-block" @on-change="array => end_code = array" :data="end_codes" placeholder="请选择"></cascaderMulti>
        </el-col>
        <el-col :span="7">
          <div class="formLabel">需求状态</div>
          <select class="base-imput" v-model="params.reqStatus">
            <option value="">全部</option>
            <option value="0">暂存</option>
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
            v-model="params.publishTimeStart"
            inputClass="datePickerInput"
            placeholder="" class="datePickerBlock"/>
        </el-col>
        <el-col :span="7">
          <div class="formLabel">至</div>
          <vue-datepicker-local
            id="publishTimeEnd"
            inputClass="datePickerInput"
            v-model="params.publishTimeEnd"
            :disabled-date="disabledStart"
            placeholder="" class="datePickerBlock"/>
        </el-col>
        <el-col :span="3"><el-button href="javascript:;" class="btn_query" @click="query">查询</el-button></el-col>
      </el-row>
      </div>
      <div class="center-content">
        <el-table :data="list" class="demand_table" border style="width: 100%;font-size:12px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(0,0,0,0.65);
line-height:15px;margin-top: 28px;">
          <el-table-column
            prop="name"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="提出时间">
          </el-table-column>
          <el-table-column
            prop="resourceTypeDesc"
            label="需求类型">
          </el-table-column>
          <el-table-column
            prop="supplyDepName"
            label="受理单位">
          </el-table-column>
          <el-table-column
            prop="reqStatusDesc"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="updatedComment"
            label="最新进展">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope" v-for="(item, index) in list">
              <el-button  @click="checkDetail(item.id)" type="text" size="small">查看</el-button>
              <el-button  v-if="item.reqStatus=='0' " @click="edit(item.id)" type="text" size="small">编辑</el-button>
              <!--<el-button  @click="edit(item.id)" type="text" size="small">编辑</el-button>-->
              <el-button v-if="item.reqStatus=='0' " @click="remove(item.id,this)" type="text" size="small">删除</el-button>
              <!--<el-button  @click="remove(item.id,this)" type="text" size="small">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
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
                <span class="property">需求标题：</span>
                <span>{{demand.name}}</span>
              </li>
              <li>
                <span class="property">受理单位：</span>
                <span>{{demand.supplyDepName}}</span>
              </li>
              <li>
                <span class="property">缘由：</span>
                <span>{{demand.reasonTypeDesc}}</span>
              </li>
              <li>
                <span class="property">缘由说明：</span>
                <span>{{demand.reason}}</span>
              </li>
              <li>
                <span class="property">需求类型：</span>
                <span>{{demand.resourceTypeDesc}}</span>
              </li>
              <li>
                <span class="property">需求描述：</span>
                <span>{{demand.description}}</span>
              </li>
              <li>
                <span class="property">期望解决日期：</span>
                <span>{{demand.expectTime | formatTime}}</span>
              </li>
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
                <span style="margin-right: 20px" v-for="file in demand.fileList"><a :href="file.fileUrl">{{file.fileName}}</a></span>
              </li>
              <li>
                <span class="property">需求提出部门：</span>
                <span>{{demand.userDepName}}</span>
              </li>
              <li>
                <span class="property">需求提出时间：</span>
                <span>{{demand.publishTime | formatTime}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="demand-edit" v-show="showEdit" id="demand_edit">
       <form class="form">
          <div class="form-item">
            <label><span class="not-null">*</span>需求标题</label>
            <div :class="[{ 'error': $v.demand.name.$error }, 'form-item-content']">
              <input type="text" class="login-name" name="loginName" placeholder="请输入需求名称" v-model.trim="demand.name"
                     @input="$v.demand.name.$touch()"/>
              <div class="error-message" v-if="!$v.demand.name.required">请输入需求名称</div>
              <div class="error-message" v-else-if="!$v.demand.name.maxLength">需求名称不超过20个字符</div>
              <div class="error-message" v-else-if="!$v.demand.name.name">请输入中文、英文和数字组合</div>
            </div>
          </div>
          <div class="form-item">
            <label><span class="not-null">*</span>受理单位</label>
            <div class="form-item-content">
              <select class="demand-type" v-model.trim="demand.supplyDepCode" id="dept">
                <option v-for="(dep, index) in deptList" :value="dep.dep_code">{{dep.dep_name}}</option>
              </select>
            </div>
          </div>
          <div class="form-item">
            <label><span class="not-null">*</span>缘由</label>
            <div class="form-item-content">
              <select class="demand-type" v-model.trim="demand.reasonType">
                <option v-for="rt in reasonTypeList" :value="rt.code">{{rt.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-item">
            <label>缘由说明</label>
            <textarea style="width: 65%;border:1px solid rgba(204,204,204,1);" name="purpose" rows="5" cols="141" placeholder="为便于受理单位处理您的需求，请说明需求提出的缘由"
                      v-model.trim="demand.reason"></textarea>
          </div>
          <div class="form-item">
            <label>需求类型</label>
            <input type="checkbox" value="5" v-model="demand.resourceTypeList"/>新增变更目录
            <input type="checkbox" value="2" v-model="demand.resourceTypeList"/>新增变更数据
            <input type="checkbox" value="1" v-model="demand.resourceTypeList"/>新增变更接口
            <input type="checkbox" value="3" v-model="demand.resourceTypeList"/>新增变更服务
            <input type="checkbox" value="6" v-model="demand.resourceTypeList"/>数据交换
            <input type="checkbox" value="7" v-model="demand.resourceTypeList"/>线下对接
          </div>
          <div class="form-item">
            <label><span class="not-null">*</span>需求描述</label>
            <div :class="[{ 'error': $v.demand.description.$error }, 'form-item-content']">
              <textarea style="width: 78%;border:1px solid rgba(204,204,204,1);" name="purpose" rows="5" cols="141" placeholder="为便于受理单位处理您的需求，请详细描述资源目录或共享资源的需求"
                        v-model.trim="demand.description" @input="$v.demand.description.$touch()"></textarea>
              <div class="error-message" v-if="!$v.demand.description.required">请输入需求描述</div>
              <div class="error-message" v-else-if="!$v.demand.description.maxLength">需求名称不超过200个字符</div>
            </div>
          </div>
          <div class="form-item">
            <label><span class="not-null">*</span>期望解决时间</label>
            <vue-datepicker-local id="expectTime" v-model="demand.expectTime" :disabled-date="disabledDate"
                                  placeholder="期望解决时间"/>
          </div>
          <div class="form-item">
            <label><span class="not-null">*</span>联系人</label>
            <div :class="[{ 'error': $v.demand.contractPerson.$error }, 'form-item-content']">
              <input type="text" class="login-name" name="contractPerson" v-model.trim="demand.contractPerson"
                     @input="$v.demand.contractPerson.$touch()"/>
              <div class="error-message" v-if="!$v.demand.contractPerson.required">请输入联系人名称</div>
              <div class="error-message" v-else-if="!$v.demand.contractPerson.maxLength">名称不超过20个字符</div>
            </div>
          </div>
          <div class="form-item">
            <label><span class="not-null">*</span>联系电话</label>
            <div :class="[{ 'error': $v.demand.contractPhone.$error }, 'form-item-content']">
              <input type="text" class="login-name" name="contractPhone" v-model.trim="demand.contractPhone"
                     @input="$v.demand.contractPhone.$touch()"/>
              <div class="error-message" v-if="!$v.demand.contractPhone.required">请输入联系电话</div>
              <div class="error-message" v-else-if="!$v.demand.contractPhone.maxLength">联系电话不超过20个字符</div>
              <div class="error-message" v-else-if="!$v.demand.contractPhone.mobile">请输入正确的手机号码</div>
            </div>
          </div>
          <div class="form-item">
            <label>电子邮件</label>
            <div :class="[ 'form-item-content']">
              <input type="text" class="login-name" name="contractEmail" v-model.trim="demand.contractEmail"/>
            </div>
          </div>
          <div class="form-item">
            <label>附件</label>

            <el-upload
              :action="uploadFileUrl"
              multiple
              :limit="5"
              :on-exceed="handleExceed"
              :on-success="uploadSuccess"
              :on-remove="onRemoveFile"
              :file-list="uploadFiles" style="height: 200px;">
              <el-button size="small"  class="uploadBtn" style="width: 106px; height: 32px;">
                <img src="../../../../assets/images/icons/ico_upload.svg" alt="">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="font-size: 12px; margin-left: 15%;color:rgba(153,153,153,1);">
                <img src="../../../../assets/images/icons/ico_link.svg" alt="">最多上传5个附件，每个附件不大于10M，支持word、pdf、jpg等文件格式</div>
            </el-upload>
          </div>
        </form>
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
  import { formatDate } from "element-ui/src/utils/date-util";
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    data () {
      return {
        showDetail: false,
        showEdit: false,
        uploadFileUrl: "/ro/share-requirement-api/uploadFile.do",
        uploadFiles: [],
        resourceTypeList: [
          {code: 1, name: '新增变更接口'},
          {code: 2, name: '新增变更数据'},
          {code: 3, name: '新增变更服务'},
          {code: 4, name: 'saas'},
          {code: 5, name: '新增变更目录'},
          {code: 6, name: '数据交换'},
          {code: 7, name: '线下对接'}
        ],
        reasonTypeList: [
          {code: 0, name: '非政策相关'},
          {code: 1, name: '政策相关'}
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
          name: '',
          resourceTypeList: [],
          resourceTypeListStr: '',
          reqStatus: '',
          publishTimeStart: '',
          publishTimeEnd: ''
        },
        layerIndex: '',
        demand: {},
        end_codes: [
          {
            value: 1,
            label: "新增变更接口",
            multiple: true
          },{
            value: 2,
            label: "新增变更数据",
            multiple: true
          },{
            value: 3,
            label: "新增变更服务",
            multiple: true
          },{
            value: 5,
            label: "新增变更目录",
            multiple: true
          },{
            value: 6,
            label: "数据交换",
            multiple: true
          },{
            value: 7,
            label: "线下对接",
            multiple: true
          }
          ],
        end_code:[]
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
        this.params.name = ''
        this.params.resourceTypeList = []
        this.params.resourceTypeListStr = ''
        this.params.reqStatus = ''
        this.params.publishTimeStart = ''
        this.params.publishTimeEnd = ''
      },
      disabledStart(time){
        return new Date(this.params.publishTimeStart) > time
      },
      handleExceed(){
        alert("最多选择5个文件");
      },
      uploadSuccess(response, file, fileList)
      {
        var data = response.result;
        var tmpFile = {};
        tmpFile['fileName'] = data.fileName;
        tmpFile['fileKey'] = data.OSSFileKey;
        tmpFile['uid'] = file.uid;
        this.demand.fileList.push(tmpFile);
      },
      onRemoveFile(file, fileList){
        var fileKey = "";
        var index = -1;
        for (var i = 0; i < this.demand.fileList.length; i++) {
          //uid用来判断新上传，fileKey用来判断旧上传
          if (this.demand.fileList[i].uid == file.uid || this.demand.fileList[i].fileKey == file.fileKey) {
            fileKey = this.demand.fileList[i].fileKey;
            index = i;
          }
        }
        if (index != -1) {
          this.demand.fileList.splice(index, 1);
          API.Demand.deleteFile({"fileKey": fileKey});
        }
      },
      disabledDate (time) {
        // TODO 包含当天
        return new Date() > time
      },
      getDeptList () {
        this.deptList = []
        API.Dict.getDepsByNode().then((res) => {
          this.deptList = res.result
        })
      },
      queryList () {
        this.list = []
        this.params.publishTimeStart = formatDate(this.params.publishTimeStart, "yyyy-MM-dd")
        this.params.publishTimeEnd = formatDate(this.params.publishTimeEnd, "yyyy-MM-dd")
        this.params.resourceTypeListStr = this.end_code.toString()
        API.Demand.getMyDemandList(this.params).then((res) => {
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
      remove (id, p) {
        layer.confirm('确定删除该数据需求?', {btn: ['确定', '取消']}, function () {
          API.Demand.remove({id: id}).then((res) => {
            if (res.status === 'OK') {
              location.reload()
              layer.msg(res.result)
            }
          })
        })
      },
      checkDetail (id) {
        this.showDetail = true
        this.demand = {}
        API.Demand.getDetailForUC({id: id}).then((res) => {
          this.demand = res.result
        })
        this.layerIndex = layer.open({
          type: 1,
          btn: [],
          title: '查看详情',
          shadeClose: true,
          area: ['683px', '620px'],
          content: $('#demand_detail'),
          btn1: (index) => {
            layer.closeAll()
            this.showDetail = false
          },
          end: () => {
            this.showDetail = false
          }
        })
      },
      edit (id) {
        this.showEdit = true
        API.Demand.getModifyReqDetail({id: id}).then((res) => {
          this.demand = res.result
          this.uploadFiles = this.demand.fileList
          for (var i = 0; i < this.uploadFiles.length; i++) {
            this.uploadFiles[i].name = this.demand.fileList[i].fileName
          }
        })
        this.layerIndex = layer.open({
          type: 1,
          btn: ['提交', '暂存'],
          title: '编辑',
          shadeClose: true,
          area: ['683px', '620px'],
          content: $('#demand_edit'),
          btn1: (index) => {
            if (this.demand.supplyDepCode === '') {
              return layer.msg('请选择资源供给部门')
            }
            this.demand.supplyDepName = $('#dept').find('option:selected').text()
            this.demand.reqStatus = '10'
            API.Demand.modify(this.demand).then((res) => {
              if (res.status === 'OK') {
                layer.msg('提交成功！')
                this.queryList()
                this.showEdit = false
              }
            })
            layer.closeAll()
          },
          btn2: (index) => {
            if (this.demand.supplyDepCode === '') {
              return layer.msg('请选择资源供给部门')
            }
            this.demand.supplyDepName = $('#dept').find('option:selected').text()
            this.demand.reqStatus = '0'
            API.Demand.modify(this.demand).then((res) => {
              if (res.status === 'OK') {
                layer.msg('暂存成功！')
                this.queryList()
                this.showEdit = false
              }
            })
            layer.closeAll()
          },
          btn3: (index) => {
            this.showEdit = false
          },
          end: () => {
            this.showEdit = false
          }
        })
      }
    },
    components: {
      ElCol,
      VueDatepickerLocal
    }
  }
</script>
<style lang="less" scoped>
  @import '~@/assets/less/variables.less';
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
        padding: 30px 0;
        color: #666;
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
    }
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
  form {
    .form-item {
      .not-null {
        color: red;
        margin-right: 2px;
      }
      label{
        width: 100px;
        float: left;
        text-align: right;
        margin-top: -15px;
      }
      .form-item-content {
        input {
          width: 100%;
          width: 50%;
          height: 28px;
          background: rgba(255,255,255,1);
          border-radius: 1px;
          border: 1px solid rgba(204,204,204,1);
        }
        textarea{
          width: 65%;
        }
        #expectTime{
            width: 44%;
        }
        .demand-type {
          width: 50%;
          height: 28px;
          background: rgba(255,255,255,1);
          border-radius: 1px;
          border: 1px solid rgba(204,204,204,1);
        }
        .tag {
          position: relative;
          background-color: rgba(241, 241, 241, 1);
          height: 36px;
          display: inline-block;
          min-width: 60px;
          *display: inline;
          *zoom: 1;
          border: 1px solid #ccc;
          line-height: 36px;
          text-align: center;
          a {
            cursor: pointer;
            line-height: 12px;
            font-size: 9px;
            color: #ccc;
            position: absolute;
            top: 2px;
            right: 2px;
          }
          a:hover {
            color: #999;
          }
        }
      }
      .btn-save {
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
  #publishTimeStart>input{
    height: 28px;
    font-size: 10px!important;
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
