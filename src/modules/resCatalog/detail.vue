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
        <a href="javascript:;">资源目录</a>
      </router-link>
      <span class="col9"> &gt; </span>
      <a href="javascript:;">目录详情</a>
    </div>

    <div class="detail_panel">
      <el-row>
        <el-col :span="4" class="detailTop_left">
          <div class="detail_img">
            <img :src="detail.image_uri" alt="">
          </div>
          <div class="isAttention" style="cursor: pointer;" @click="follow">
            <img v-if="detail.isAttention== 0" src="../../assets/images/icons/ico_attention_sel.svg" alt="">
            <img v-if="detail.isAttention!=0" src="../../assets/images/icons/ico_02.svg" alt="">
            {{detail.isAttention==0?'关注':'已关注'}}
          </div>
          <router-link :to="{ name: 'objectionCreate', params: {resInfo:{resId:detail.id,resName:detail.name,resType:0,resDescription:detail.remark,resCatId:detail.id,resCatName:detail.name,supplyDepId:detail.dept_id?detail.dept_id:'',supplyDepCode:detail.dept_code,supplyDepName:detail.dept_name} }}">
            <div class="feedback_idea" style="cursor: pointer;background-color: #0048ff;color: #fff;">异议反馈</div>
          </router-link>
        </el-col>
        <el-col :span="20" class="pr20">
          <div class="detailTop_right">
            <div style="height: 16px;">
              <div class="detail_title">{{detail.name}}</div>
              <el-button style="margin-left: 15px;" size="mini" class="apply" @click="apply(detail,0,'cata')">{{'数据申请'}}</el-button>
              <div class="detail_look">
                <img src="../../assets/images/icons/ico_01.svg" alt=""><span style="margin-right: 17px">{{detail.view_count?detail.view_count:0}}</span>
                <img src="../../assets/images/icons/ico_02.svg" alt=""><span>{{detail.attention_count?detail.attention_count:0}}</span>
              </div>
            </div>
            <div class="identify">
              <div class="identify_label">{{detail.dept_name}}</div>
            </div>
            <div class="detail_content">
              <div class="label_group">
                <el-col :span="7">
                  <label for="">资源代码:</label>
                  <span>{{detail.cata_code}}</span>
                </el-col>
                <el-col :span="5">
                  <label for="">更新周期:</label>
                  <span>{{detail.update_cycle}}</span>
                </el-col>
                <el-col :span="6">
                  <label for="">发布日期:</label>
                  <span>{{formatPublishDate}}</span>
                </el-col>
                <el-col :span="6">
                  <label for="">信息资源格式:</label>
                  <span>{{detail.info_format_type}}</span>
                </el-col>
              </div>
              <div class="label_group">
                <el-col :span="7">
                  <label for="">关联资源代码:</label>
                  <span>{{detail.code}}</span>
                </el-col>
                <el-col :span="5">
                  <label for="">共享类型:</label>
                  <span>{{detail.share_type}}</span>
                </el-col>
                <!--<el-col :span="6">
                    <label for="">共享方式:</label>
                    <span>{{detail.share_mode_type}}</span>
                  </el-col>
                  -->
                <el-col :span="6">
                  <label for="">是否向社会开放:</label>
                  <span>{{detail.is_open_soc}}</span>
                </el-col>
              </div>
              <div class="label_group">
                <el-col :span="24">
                  <label for="">共享条件:</label>
                  <span>{{detail.share_condition}}</span>
                </el-col>
              </div>
              <div class="label_group">
                <el-col :span="24">
                  <label for="">开放条件:</label>
                  <span>{{detail.open_condition}}</span>
                </el-col>
              </div>
              <div class="label_group">
                <el-col :span="24">
                  <label for="">资源描述:</label>
                  <span style="line-height: 25px;">{{detail.remark}}</span>
                </el-col>
              </div>
              <div class="label_group">
                <el-col :span="24">
                  <label for="">信息资源提供方:</label>
                  <span style="line-height: 25px;margin-right: 15px;">{{detail.institution_name}}</span>
                  <!--
                    <label for="">地址:</label>
                    <span style="line-height: 25px;margin-right: 15px;">{{detail.address?detail.address:'无'}}</span>
                    -->
                </el-col>
              </div>

            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="detail_tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="detail_table">
        <el-tab-pane label="信息项" name="cata">
          <template>
            <el-table class="infoTable" :data="tableCataData" border :header-cell-style="{
                        'text-align':'center',
                        'background':'rgba(250,250,250,1)',
                        'font-weight': 'bold',
                        'font-size': '15px'
                         }">
              <el-table-column align='center' prop="itemName" label="信息项名称"></el-table-column>
              <el-table-column align='center' prop="itemMark" label="信息项标识"></el-table-column>
              <el-table-column align='center' prop="itemType" label="数据类型"></el-table-column>
              <el-table-column align='center' prop="itemLength" label="长度"></el-table-column>
            </el-table>
            <paginate v-show="pageInfo.totalPage > 0" :page-count="pageInfo.totalPage" :click-handler="jumpPage" :prev-text="'上一页'" :next-text="'下一页'" :container-class="'pagination'">
            </paginate>
          </template>
        </el-tab-pane>
        <el-tab-pane v-if="detail.share_type!=='不予共享'" label="文件" name="data">
          <template>
            <el-table class="infoTable" :data="tableDataData" border :header-cell-style="{
                        'text-align':'center',
                        'background':'rgba(250,250,250,1)',
                        'font-weight': 'bold',
                        'font-size': '15px'
                         }">
              <el-table-column align='center' prop="name" label="名称">
                <template slot-scope="scope">
                  <el-tag style="cursor: pointer;" @click="goDetail(scope.row.id,'data')">{{scope.row.name}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align='center' prop="description" label="描述"></el-table-column>
              <el-table-column align='center' prop="updated_time" label="发布日期"></el-table-column>
              <!--<el-table-column align='center' prop="isApply" label="申请">
                  <template slot-scope="scope">
                    <el-button
                      size="mini" :class="scope.row.isApply===0?'apply':'unApply'"
                      @click="apply(scope.row,scope.row.isApply,'data')">{{scope.row.isApply===0?'立即申请':'已申请'}}</el-button>
                  </template>
                </el-table-column>-->
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane v-if="detail.share_type!=='不予共享'" label="接口" name="api">
          <template>
            <el-table class="infoTable" :data="tableApiData" border :header-cell-style="{
                        'text-align':'center',
                        'background':'rgba(250,250,250,1)',
                        'font-weight': 'bold',
                        'font-size': '15px'
                         }">
              <el-table-column align='center' prop="name" label="名称">
                <template slot-scope="scope">
                  <el-tag style="cursor: pointer;" @click="goDetail(scope.row.id,'api')">{{scope.row.name}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align='center' prop="description" label="描述"></el-table-column>
              <el-table-column align='center' prop="updated_time" label="发布日期"></el-table-column>
              <!--<el-table-column align='center' prop="isApply" label="申请">
                  <template slot-scope="scope">
                    <el-button
                      size="mini" :class="scope.row.isApply===0?'apply':'unApply'"
                      @click="apply(scope.row,scope.row.isApply,'api')">{{scope.row.isApply===0?'立即申请':'已申请'}}</el-button>
                  </template>
                </el-table-column>-->
            </el-table>
          </template>
        </el-tab-pane>
        <!--<el-tab-pane v-if="detail.share_type!=='不予共享'" label="云服务" name="app">
            <template>
              <el-table class="infoTable" :data="tableAppData" border
                        :header-cell-style="{
                        'text-align':'center',
                        'background':'rgba(250,250,250,1)',
                        'font-weight': 'bold',
                        'font-size': '15px'
                         }" >
                <el-table-column align='center' prop="name" label="名称">
                  <template slot-scope="scope">
                    <el-tag style="cursor: pointer;" @click="goDetail(scope.row.id,'app')">{{scope.row.name}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align='center' prop="description" label="描述" ></el-table-column>
                <el-table-column align='center' prop="updated_time" label="发布日期"></el-table-column>
                <el-table-column align='center' prop="isApply" label="申请">
                  <template slot-scope="scope">
                    <el-button
                      size="mini" :class="scope.row.isApply===0?'apply':'unApply'"
                      @click="apply(scope.row,scope.row.isApply,'app')">{{scope.row.isApply===0?'立即申请':'已申请'}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>-->
      </el-tabs>
    </div>
  </div>

</template>

<script>
import Axios from 'axios'
import API from '@/common/api'
import moment from 'moment'
//  import DataDetail from './components/dataDetail'
//  import ApiDetail from './components/apiDetail'

export default {
  props: ['user'],
  /*  components: {
      DataDetail, ApiDetail
    },*/
  data() {
    return {
      id: '',
      pageInfo: {
        totalSize: 10,
        totalPage: 1,
        currentPage: 1
      },
      param: {
        page: 1,
        pageSize: 10
      },
      activeName: 'cata',
      tableCataData: [
        {
          "id": 1,
          "infoId": 1,
          "itemName": "许可证编号",
          "itemMark": "XKZBM",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 2,
          "infoId": 1,
          "itemName": "机构名称",
          "itemMark": "JGMC",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 3,
          "infoId": 1,
          "itemName": "负责人",
          "itemMark": "FZR",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 4,
          "infoId": 1,
          "itemName": "机构地址",
          "itemMark": "JGDZ",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 5,
          "infoId": 1,
          "itemName": "许可证编号",
          "itemMark": "XKZBM",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 7,
          "infoId": 1,
          "itemName": "机构名称",
          "itemMark": "JGMC",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 9,
          "infoId": 1,
          "itemName": "负责人",
          "itemMark": "FZR",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 11,
          "infoId": 1,
          "itemName": "机构地址",
          "itemMark": "JGDZ",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 13,
          "infoId": 1,
          "itemName": "许可证编号",
          "itemMark": "XKZBM",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 15,
          "infoId": 1,
          "itemName": "负责人",
          "itemMark": "FZR",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 17,
          "infoId": 1,
          "itemName": "机构名称",
          "itemMark": "JGMC",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        },
        {
          "id": 19,
          "infoId": 1,
          "itemName": "机构地址",
          "itemMark": "JGDZ",
          "itemType": "字符串型C",
          "itemLength": "20",
          "updateCycle": "1",
          "shareType": "1",
          "shareCondition": "这是共享条件",
          "shareModeClassify": "这是共享分类",
          "shareModeType": "这是共享方式类型",
          "isOpenSoc": "1",
          "openCondition": "这是开放条件",
          "dataSenMark": "数据敏感标示test",
          "isDesen": "0",
          "desenWay": "托米方式",
          "sourceTable": null,
          "sourceAttr": null,
          "orderNum": 1,
          "createTime": null,
          "updateTime": null
        }
      ],
      tableDataData: [{
        id: 1,
        publish_date: '2016-05-02',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1518 弄',
        isApply: 0
      }, {
        id: 2,
        publish_date: '2016-05-04',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1517 弄',
        isApply: 1
      }],
      tableApiData: [],
      tableAppData: [],
      detail: {
        "update_id": "USER_50043",
        "synch_type": "删除",
        "business_uri": "http://www.baidu.com",
        "depart_id": 12,
        "type": "A",
        "update_name": "共享平台节点管理员",
        "institution_id": "37",
        "share_mode_type": "这是共享方式",
        "unify_SC_code": "710000",
        "publish_time": 1557221758000,
        "synch_time": 1558920285000,
        "cataInfoItemList": [],
        "id": 1,
        "fax": "88888888",
        "cata_classic": "这是资源分类",
        "area": "510400",
        "open_condition": "这是开放条件",
        "create_time": "2019-05-29",
        "image_uri": "https://www.baidu.com/img/bd_logo1.png?where=super",
        "is_open_soc": "不开放",
        "attention_count": 1,
        "telephone": "15339111111",
        "share_condition": "这是共享条件",
        "linkman": "张三",
        "isAttention": 1,
        "pinyin": "czj",
        "datasources": "接口接入",
        "parent_id": 0,
        "name": "测试1",
        "short_name": "市财政局",
        "info_type": "1",
        "code": "这是信息资源代码",
        "insert_time": 1558182461000,
        "remark": "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
        "institution_name": "市质量技术监督局这是资源提供方",
        "update_time": "2019-05-27",
        "is_dep": "0",
        "recorde_total": 1,
        "info_format_type": "Word文档",
        "topic_id": 9,
        "publish_status": "已发布",
        "item_updatetime": 1558920285000,
        "email": "123@163.com",
        "address": "西安",
        "base_id": 5,
        "synch_status": "已同步",
        "dept_name": "测试部门",
        "dept_code": "510400001",
        "cata_code": "这是目录code",
        "institution_code": "这是信息资源提供方代码",
        "update_cycle": "每周",
        "share_type": "无条件共享",
        "linkman_org_name": "市财政局",
        "dept_id": "37",
        "view_count": 10
      }
    }
  },
  watch: {
    param: {
      handler() {
        this.getItemList()
      },
      deep: true
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail();
    this.getItemList();
  },
  methods: {
    goDetail(id, type) {
      if (type === 'app') {
        this.$router.push({ name: 'serviceDetail', params: { id: id } });
      } else {
        this.$router.push({ name: type + 'Detail', params: { id: id } });
      }
    },
    jumpPage(page) {
      this.param.page = page
    },
    getItemList() {
      API.Resdoc.getItemList({
        "cataId": this.id, "pageSize": this.param.pageSize, "page": this.param.page
      }).then((res) => {
        if (res.status === 'OK') {
          this.tableCataData = res.result.records;
          this.pageInfo.totalSize = res.result.total
          this.pageInfo.totalPage = res.result.pages
          this.pageInfo.currentPage = res.result.current
        }
      })
    },
    handleClick(tab, event) {
      if (tab.name !== 'cata') {
        API.Resdoc.getResById({
          id: this.id,
          type: tab.name
        }).then((res) => {
          if (tab.name === 'data') {
            this.tableDataData = res.result;
          } else if (tab.name === 'api') {
            this.tableApiData = res.result;
          } else if (tab.name === 'app') {
            this.tableAppData = res.result;
          }
        })
      }
    },
    apply(obj, isApply, type) {
      if (isApply === 0) {
        this.$router.push({
          name: 'resApply', params: {
            id: obj.id, type: type, name: obj.name,
            depName: obj.dept_name, description: obj.remark
          }
        })
      }
    },
    getDetail() {
      API.Resdoc.getDataDetail({
        id: this.id
      }).then((res) => {
        this.detail = res.result;
      })
    },
    follow() {
      if (this.detail.isAttention) {
        // 取消关注
        API.Resdoc.unFollowCata({
          cataId: this.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.isAttention = 0
            this.detail.attention_count = this.detail.attention_count - 1
          }
        })
      } else {
        // 关注
        API.Resdoc.followCata({
          cataId: this.id
        }).then((res) => {
          if (res.status === 'OK') {
            this.detail.isAttention = 1
            this.detail.attention_count = this.detail.attention_count + 1
          }
        })
      }
    }
  },
  computed: {
    formatPublishDate() {
      return moment(this.detail.publish_time).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>
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
.apply {
  background: rgba(0, 170, 113, 1);
  color: #ffffff;
}
.unApply {
  background: rgba(204, 204, 204, 1);
  cursor: not-allowed;
}
</style>
