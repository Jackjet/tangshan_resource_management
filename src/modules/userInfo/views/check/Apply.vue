<template>
  <div class="rightBlock" id="userMyAPIRight">
    <div class="query-box">
      <div class="row">
        <el-row style="width: 820px;">
          <el-col :span="8">
            <div class="formLabel">资源名称</div>
            <input type="text" class="base-imput" v-model="params.serviceName" placeholder="请输入资源名称" style="padding-left: 10px;"/>
          </el-col>
          <el-col :span="8">
            <div class="formLabel">提供方</div>
            <input type="text" class="base-imput" v-model="params.deptName" placeholder="请输入提供方" style="padding-left: 10px;"/>
          </el-col>
          <el-col :span="8">
            <div class="formLabel">申请部门</div>
            <input type="text" class="base-imput" v-model="params.applyDeptName" placeholder="请输入申请部门" style="padding-left: 10px;"/>
          </el-col>
          <el-col :span="8">
            <div class="formLabel">状态</div>
            <select class="base-imput" v-model="params.reviewedStatus">
              <option value="">全部</option>
              <option value="0" v-if="user.account=='zhhb'">未受理</option>
              <option value="1" v-if="user.account!='zhhb'">未审核</option>
              <option value="1" v-if="user.account=='zhhb'">已受理</option>
              <option value="4" v-if="user.account=='zhhb'">受理驳回</option>
              <option value="2">审核通过</option>
              <option value="3">审核驳回</option>
            </select>
          </el-col>
        </el-row>
      </div>
    </div>
    <table class="table" id="applyApiTable">
      <tr>
        <th >提供方</th>
        <th width="20%">资源名称</th>
        <th >申请部门</th>
        <th >申请人</th>
        <th>申请时间</th>
        <th>受理时间</th>
        <th>审核时间</th>
        <th width="8%" v-if="user.account=='zhhb'">受理状态</th>
        <th width="8%" v-if="user.account!='zhhb'">审核状态</th>
        <th>操作</th>
      </tr>
      <tbody>
      <template v-if="list.length > 0">
        <tr v-for="(item, index) in list">
          <td>{{ item.deptName }}</td>
          <td>{{ cutString(item.serviceName,18) }}</td>
          <td>{{ cutString(item.applyDeptName,18) }}</td>
          <td>{{ cutString(item.applyUserName,18) }}</td>
          <td>{{ item.applyTime | formatTime }}</td>
          <td>{{ item.checkTime | formatTime }}</td>
          <td>{{ item.checkTimeFinal | formatTime }}</td>
          <td v-if="item.reviewedStatus === 0">未受理</td>
          <td v-if="item.reviewedStatus === 1 && user.account=='zhhb'">已受理</td>
          <td v-if="item.reviewedStatus === 1 && user.account!='zhhb'">未审核</td>
          <td v-if="item.reviewedStatus === 2">审核通过</td>
          <td v-if="item.reviewedStatus === 3">审核驳回</td>
          <td v-if="item.reviewedStatus === 4">受理驳回</td>
          <td>
            <a href="javascript:;" @click="showView(item.id, item.serviceId, item.serviceName)">查看</a>
            <a href="javascript:;" v-if="item.reviewedStatus === 0 && user.account=='zhhb'" @click="apply(item)">受理</a>
            <a href="javascript:;" v-if="item.reviewedStatus === 1 && user.account!='zhhb'" @click="apply(item)">审核</a>
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
        <div v-if="show">
          <div class="pt28 detailFormItem">
            <label>受理状态:</label>
            <div class="detailInput">
            <span v-if="commonInfo.reviewedStatus==='0'">未受理</span>
            <span v-if="commonInfo.reviewedStatus==='1' && user.account=='zhhb'">已受理</span>
            <span v-if="commonInfo.reviewedStatus==='1' && user.account!='zhhb'">未审核</span>
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
          <div class="pt28 detailFormItem">
            <label>审核意见:</label>
            <div class="detailInput">
            <span v-if="commonInfo.checkContentFinal!==null">{{commonInfo.checkContentFinal}}</span>
            <span v-else>无</span>
            </div>
          </div>
        </div>
        <div v-if="!show">
          <div class="pt28 detailFormItem" style="width: 100%;    height: 120px;">
            <label>意见:</label>
            <div class="detailInput">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入意见"
                v-model="content">
              </el-input>
            </div>
          </div>
          <div class="pt28 detailFormItem"  style="width: 100%;padding-top: 5px;">
            <div class="control-group" id="type2" style="margin-bottom: 0px;">
              <div class="detailS" style="line-height: 30px;font-size: 15px;float: left;">
                <em class="red pd8">*</em><input type="checkbox" name="vehicle" id="second" style="margin-top: -3px;margin-left: 2px;">
                我已阅读并同意<a style="color: blue;" @click="downloadAgreement(commonInfo.id)">《保密承诺书》</a>
              </div>
            </div>
          </div>
          <div class="pt28 detailFormItem"  style="padding-top: 5px;width: 100%" v-if="user.account=='zhhb'">
            <div class="control-group" id="type1" style="width: 100%">
              <div class="detailS" style="line-height: 30px;font-size: 15px;float: left;">
                <em class="red pd8">*</em><input type="checkbox" name="vehicle" id="first" style="margin-top: -3px;margin-left: 2px;">
                我已阅读并同意<a style="color: blue;" @click="showAgreement()">《唐山市政府数据共享网站声明》</a>
              </div>
            </div>
            <div id="agreement" style="display: none;">
              <div style="line-height: 20px;margin: 25px;"><h4 style="text-align: center;"> 第一项    网站使用条款</h4>
                <p>在您授权用户使用唐山市政府数据共享网站（以下简称本网站）前，请认真阅读本声明。如使用本网站，您必须完全接受本声明中所包含的条款、条件和网站即时刊登的通告，并且遵守中华人民共和国关于政务网的相关法律、规定与规则。</p>
                <p>本网站有权不经提前通知随时修改本声明。本声明一经变动，将在相关页面提示修改内容；用户如果不同意本声明的修改，可以放弃使用或者访问本网站或取消已经获得的服务；如果用户选择在本声明修改后继续使用本网站，则视为用户已经接受本声明的修改。</p>
                                                     <h4 style="text-align: center;">第二项    用户接受条款</h4>
                <p>用户在访问或使用本网站过程中，必须遵循以下原则：</p>
                <p>（一）遵守中华人民共和国有关政务网管理的相关法律、法规和规章；</p>
                <p>（二）遵守所有与网络服务有关的网络协议、规定和程序；</p>
                <p>（三）禁止对网站进行技术性破坏，不得干扰或妨害本网站提供正常的政务网服务；</p>
                <p>（四）不得利用本网站进行任何可能对政务网的正常运转造成不利影响的行为；</p>
                <p>（五）不得为任何非法目的而使用、利用本网站；</p>
                <p>（六）不得利用本网站散布广告以及其它商业化的宣传；</p>
                <p>（七）不得利用本网站发布或传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的、可能产生不良后果的信息资料，不得发布任何包含种族、性别、宗教有歧视性和攻击性的信息内容；</p>
                <p>（八）用户发现任何非法使用用户帐号或安全漏洞的情况，应当立即告知本网站运营管理方。</p>
                                                        <h4 style="text-align: center;">第三项    网站服务内容</h4>
                <p> 本网站主要提供数据下载、API开发服务、APP应用程序上传与下载等功能。网站数据涉及了表格、文本、图片、地图、多媒体等各类实时与非实时的政府可公开数据。</p>
                                                     <h4 style="text-align: center;">第四项    用户的权利与义务</h4>
                <p> （一）用户的权利与义务
                <p> 1．现阶段，用户有权免费获取本网站所提供的所有政府数据资源，享有数据资源的非排他使用权。用户不得有偿或无偿转让在本网站中获取的各种数据资源。</p>
                <p> 2．用户应在应用本网站政府数据资源所产生的成果中注明政府数据资源来源为"唐山市政府数据共享平台"，及时将应用情况通过网站进行备案，并应积极配合有关的用户需求调查和数据资源调查。</p>
                <p> 3．用户在发布基于本网站获取的政府数据资源开发的APP应用时，应确保其发布内容不会侵犯任何第三方的合法权益（包括但不限于著作权、商标权、专利权等），不会违反任何法律、法规、条例或规章，如造成法律纠纷及事故，由用户承担相应法律责任。</p>
                <p> （二）“唐山政府数据共享平台”的权利与义务
                <p> 1、本网站包含的所有内容（包括但不限于：文本、图形、图片、地图、LOGO标识，版面设计，专栏目录与名称、内容分类）的所有权归唐山市大数据资源管理中心所有。</p>
                <p> 2、在任何情况下，本网站有合理理由怀疑用户的行为违反法律、法规、规章以及本声明的，本网站有权在任何时候，随时终止向该用户提供服务。</p>
                <p> 3、本网站提供的各项网络服务目前均为免费，但我们保留收费浏览及收费下载的权利。</p>
                <p> 4、本通过平台成功注册的用户，不受歧视的享有免费访问、获取、使用、传播分享和利用及再利用数据资源的权利 ，但不得有偿转让在本网站中获取的各种数据资源。</p>
                                                         <h4 style="text-align: center;">第五项    免责声明</h4>
                <p>（一）本网站所有数据资源均为政府部门在履行政府职能过程中所采集和提供，本网站数据资源提供者对所提供数据的完整性、准确性、及时性不作任何承诺或担保；</p>
                <p>（二）用户因使用本网站所提供数据、APP应用而造成的任何损失，由用户自行承担；</p>
                <p>（三）本网站包含到其他网站的链接，这些网站内容和隐私策略可能与本网站不同，本网站不对由于这些网站内容和隐私策略造成的后果承担责任；</p>
                <p>（四）本网站保留由于法律、法规、规章或政策调整等原因而修订、中止、终止部分或全部网站、网络服务的权利。</p>
                <p>（五）本网站不对任何因使用数据或任何衍生的分析和应用程序而造成的直接或间接损失承担责任。</p>
                                                    <h4 style="text-align: center;">第六项    隐私保护声明</h4>
                <p>本网站尊重并保护所有网站用户的个人隐私权，未经用户许可或根据相关法律、法规的强制性规定，本网站不主动将用户个人信息泄露给任何第三方。</p>
                                                  <h4 style="text-align: center;">第七项    条款说明</h4>
                <p>本网站服务条款的最终解释权归唐山市智慧办所有。</p></div>
            </div>
          </div>
        </div>
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
        content:'',
        show:true,
        activeName: 'first',
        list: [],
        pageInfo: {
          totalPage: 0
        },
        params: {
          page: 1,
          pageSize: 10,
          serviceName:'',
          reviewedStatus: '',
          applyDeptName:'',
          deptName:''
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
      // 获取用户信息
      API.Common.getLoginInfo().then((res) => {
        if (res.result) {
          this.user = res.result
        }
      })
      this.queryList()
    },
    methods: {
      queryList() {
        API.Api.getCheckMyUseApiList(this.params).then((res) => {
          this.list = res.result.apiApplyList
          this.pageInfo = res.result.page
        })
      },
      jumpPage(page) {
        this.params.page = page
      },
      apply(item) {
        this.commmonParam.id = item.id;
        this.serviceId = item.serviceId;
        this.serviceName=item.serviceName
        this.getUserCommon();
        this.viewFlag = true;
        this.show=false;
        var status='1'
        var nostatus='4'
        var pageType='1'
        var title='受理';
        if(item.reviewedStatus===1){
          title='审批';
          status='2';
          nostatus='3';
          pageType='2'
        }
        this.layerIndex = layer.open({
          type: 1,
          btn: ['通过','驳回','取消'],
          title: title,
          shadeClose: false,
          area: ['854px', '624px'],
          content: $('#viewShow'),
          btn1: (index) => {
            let isChecked=false;
            if(this.user.account=='zhhb'){
              isChecked = $("#first").is(":checked");
              if(!$("#second").is(":checked")){
                layer.msg('请阅读声明并同意');
                return false;
              }
            }else if(this.user.account!='zhhb'){
              isChecked = $("#second").is(":checked");
            }
            if(!isChecked){
              layer.msg('请阅读声明并同意');
              return false;
            }
              let temp=this.content;
              if(!temp){
                  temp='通过';
              }
            let data={checkContent:temp,checkStatus:status,applyId:this.commmonParam.id,pageType:pageType}
            API.Api.doApplyCheck(data).then((res) => {
              if (res.status === 'OK') {
                layer.msg('通过成功！')
                this.queryList()
              }
            })
            layer.closeAll()
            this.viewFlag = false;
            this.detail = '';
            this.commonInfo = '';
          },
          btn2: (index) => {
            if(this.content){
              let isChecked=false;
              if(this.user.account=='zhhb'){
                isChecked = $("#first").is(":checked");
                if(!$("#second").is(":checked")){
                  layer.msg('请阅读声明并同意');
                  return false;
                }
              }else if(this.user.account!='zhhb'){
                isChecked = $("#second").is(":checked");
              }
              if(!isChecked){
                layer.msg('请阅读声明并同意');
                return false;
              }
              let data={checkContent:this.content,checkStatus:nostatus,applyId:this.commmonParam.id,pageType:pageType}
              API.Api.doApplyCheck(data).then((res) => {
                if (res.status === 'OK') {
                  layer.msg('驳回成功！')
                  this.queryList()
                }
              })
              layer.closeAll()
              this.viewFlag = false;
              this.detail = '';
              this.commonInfo = '';
            }else{
              layer.msg('请输入意见！')
              return false;
            }
            return false;
          },
          end: () => {
            this.viewFlag = false;
            this.detail = '';
            this.commonInfo = '';
          }
        })
      },
      showAgreement(){
        layer.open({
          type: 1,
          title: '共享声明',
          btn:['同意','关闭'],
          area: ['720px', '450px'],
          content: $('#agreement').html(),
          btn1: function (index){
            $("input[name='vehicle']").prop('checked',true);
            layer.close(index);
          },
          btn2: function (index){
            layer.close(index);
          }
        });
      },
      downloadAgreement(id) {
        API.Api.downloadAgreement({applyId:id}).then(res => {
          if(res.code=="000000"){
            if(res.result){
              window.open(res.result)
            }else{
              layer.msg("该部门未提交保密声明");
            }
          }else{
            layer.msg(res.message);
            return false;
          }
        })
      },
      showView(id, serviceId,name) {
        this.commmonParam.id = id;
        this.serviceId = serviceId;
        this.serviceName=name
//        this.getDetail();
        this.getUserCommon();
        this.viewFlag = true;
        this.show=true;
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
</style>
