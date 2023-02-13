<template>
  <div>
    <!--header-->
    <el-row>
      <el-col :span="2" class="main_layout"></el-col>
      <el-col :span="20">
        <Headers @getUser="getUser"></Headers>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
    <!--content-->

    <el-row>
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20" style="position: relative;">
        <div @keyup.enter="keySearch" class="seach-btn-box">
          <p class="home_logo">资 源 管 理 中 心</p>
          <!-- <img src="../../assets/images/logo1.svg" class="banner-logo"> -->
          <!--<el-input class="searchInput" placeholder="请输入内容" v-model="keyword" v-model.trim="keyword">
            <template slot="append">
              <el-button @click="keySearch" icon="el-icon-search"></el-button>
            </template>
          </el-input>-->
        </div>
        <div class="home_resCatalog">
          <div class="home_message">
            <img class="message_title" src="../../assets/images/icons/tittle.svg" alt="">
            <div class="message_detail" @click="openPolicy(latestNotice[0].url)" style="text-decoration: underline;">{{latestNotice[0].title}}</div>
            <div class="message_detail tongzhi1" @click="openPolicy(latestNotice[1].url)" style="text-decoration: underline;">{{latestNotice[1].title}}</div>
            <img class="message_more" src="../../assets/images/icons/ico_more.svg" alt="" @click="openPolicyNotParams()">
          </div>
          <div style="margin-top: 15px">
            <div v-for="v,k in applyList" class="apply" :key="k">
              <span>{{v.name}}
                <span v-if="v.type==2">
                  <span v-if="v.reviewed_status=='0'">
                    还未受理该申请
                  </span>
                  <span v-if="v.reviewed_status=='1'">
                    还未审核该申请
                  </span>
                </span>
                <span v-if="v.type==1">
                  <span v-if="v.reviewed_status=='1'">
                    {{v.check_time | formatTime }} 受理成功
                  </span>
                  <span v-if="v.reviewed_status=='2'">
                    {{v.check_time_final | formatTime }} 审核成功
                  </span>
                  <span v-if="v.reviewed_status=='3'">
                    {{v.check_time?v.check_time:v.check_time_final | formatTime }} 已被驳回
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div class="home_resContent">
            <!-- <div class="home_resContent_title">政务信息资源目录</div> -->
            <template>
              <el-tabs v-model="infoResCatalog" @tab-click="handleClick">
                <el-tab-pane label="主题信息资源" name="topic">
                  <div class="home_base_resource" v-for="v,k in topicList" :key="k">
                    <router-link :to="{ name: 'resCatalog', params: {id:v.id,type:'topicList'}}">
                      <img v-if="v.image" :src="v.image" alt="">
                      <img v-else src="../../../static/images/icons/gh.png" alt="">
                      <div class="home_baseRes_name">{{v.name}}</div>
                    </router-link>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="基础信息资源" name="base">
                  <div class="home_base_resource" v-for="v,k in baseList" :key="k">
                    <router-link :to="{ name: 'resCatalog', params: { id:v.id, type:'baseList' }}">
                      <img v-if="v.image" :src="v.image" alt="">
                      <img v-else src="../../../static/images/icons/gh.png" alt="">
                      <div class="home_baseRes_name">{{v.name}}</div>
                    </router-link>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="部门信息资源" name="depart">
                  <div class="home_depart_resource" v-for="v,k in departList" :key="k">
                    <router-link :to="{ name: 'resCatalog', params: {id:v.dep_id,type:'departList'}}">
                      <div class="depart_res_center">
                        <div class="home_departRes_img">
                          <!-- <img v-if="v.image && v.image!='null'" :src="v.image" alt=""> -->
                          <img src="../../../static/images/icons/guohui.svg" alt="">
                        </div>
                        <div class="home_departInfo_name">
                          <div class="home_baseRes_title">{{v.name}}</div>
                          <div class="home_baseRes_count">{{v.cata_count}}</div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>

          </div>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
      <el-col :span="24">
        <div class="home_data_aggregation">
          <el-col :span="20" :offset="2" class="home_data_converge">
            <el-row :gutter="20">
              <div class="home_resContent_title">数据汇聚</div>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(112,112,128,1)">
                  <div class="data_value">{{counts.depCount}}</div>
                  <div class="data_name">入驻部门</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(48,185,94,1)">
                  <div class="data_value">{{counts.cataCount}}</div>
                  <div class="data_name">资源目录</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(74,136,217,1)">
                  <div class="data_value">{{counts.cataShareCount}}</div>
                  <div class="data_name">共享目录</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(74,136,217,1)">
                  <div class="data_value">{{counts.dataCount}}</div>
                  <div class="data_name">文件</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(0,170,113,1)">
                  <div class="data_value">{{counts.apiCount}}</div>
                  <div class="data_name">接口</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(74,136,217,1)">
                  <div class="data_value">{{counts.appCount}}</div>
                  <div class="data_name">资源使用总数</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(48,185,94,1)">
                  <div class="data_value">{{counts.reqCount}}</div>
                  <div class="data_name">资源申请</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home_data_item" style="background:rgba(112,112,128,1)">
                  <div class="data_value">{{counts.objCount}}</div>
                  <div class="data_name">目录反馈</div>
                  <img src="../../assets/images/bg_div.png">
                </div>
              </el-col>
            </el-row>
          </el-col>
        </div>
        <div class="home_new_online">
          <div class="online_title">最新上线</div>
          <template>
            <el-tabs v-model="newOnline" @tab-click="onlineHandleClick" class="online_tabs">
              <el-tab-pane label="资源目录" name="resCatalog">
                <el-col :span="24" :offset="2" class="offsetWidth">
                  <div class="resOnlineItem" v-for="v,k in newCataList" @mouseover="mouseOverResCatalog('cata_'+v.id)" @mouseleave="mouseLeaveResCatalog('cata_'+v.id)" :key="k">
                    <div class="resInfoBlock" :id="'cata_'+v.id">
                      <img :src="v.image_uri">
                      <!-- <svg t="1620869179450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3406" width="200" height="200"><path d="M45.119595 282.097789A45.092581 45.092581 0 0 1 0.027014 236.789969V45.119594A45.092581 45.092581 0 0 1 45.119595 0.027013H236.78997a45.146391 45.146391 0 0 1 0 90.238972H90.265986V236.789969a45.092581 45.092581 0 0 1-45.146391 45.30782z" fill="#192E7A" p-id="3407"></path><path d="M236.78997 1023.972987H45.119595A45.092581 45.092581 0 0 1 0.027014 978.880406v-191.831804a45.146391 45.146391 0 1 1 90.238972 0v146.685413H236.78997a45.146391 45.146391 0 0 1 0 90.238972z" fill="#040000" p-id="3408"></path><path d="M978.880408 1023.972987h-191.831804a45.146391 45.146391 0 1 1 0-90.238972h146.685413v-146.685413a45.146391 45.146391 0 1 1 90.238972 0v191.831804a45.092581 45.092581 0 0 1-45.092581 45.092581zM978.880408 282.097789a45.146391 45.146391 0 0 1-45.146391-45.30782V90.265985h-146.685413a45.146391 45.146391 0 1 1 0-90.238972h191.831804a45.092581 45.092581 0 0 1 45.092581 45.092581V236.789969a45.092581 45.092581 0 0 1-45.092581 45.30782z" fill="#192E7A" p-id="3409"></path><path d="M845.109338 527.793165a62.473135 62.473135 0 0 0-25.559638-50.688796l-271.577872-201.248513a62.742183 62.742183 0 0 0-75.333668 0L201.275527 477.104369a63.065042 63.065042 0 0 0 0 101.323783l11.13862 8.125274-11.13862 8.232894a63.118852 63.118852 0 0 0 0 101.377593l271.631682 201.194703a62.688374 62.688374 0 0 0 75.333668 0l271.308823-201.033274a63.065042 63.065042 0 0 0 0-101.377593l-11.138621-8.394323 11.138621-8.286703a62.365515 62.365515 0 0 0 25.559638-50.473558z m-334.696725-201.248512l271.631683 201.248512-271.577873 201.248513-271.631682-201.248513zM782.044296 645.744165l-271.631683 201.248513L238.834741 645.744165l26.582023-19.694373 207.490445 153.734492a62.688374 62.688374 0 0 0 75.333668 0l207.490445-153.734492 26.582023 19.694373z" fill="#27A665" p-id="3410"></path><path d="M854.364617 355.171447l-306.28517-228.637682a62.742183 62.742183 0 0 0-75.333667 0L169.689196 353.019056a31.532521 31.532521 0 0 0 37.666834 50.527367l303.056583-226.377672 306.23136 228.476253a31.532521 31.532521 0 1 0 37.666834-50.527367z" fill="#27A665" p-id="3411"></path></svg> -->
                      <div class="resName">{{v.name}}</div>
                      <div class="data">{{v.create_time}}</div>
                      <div class="resTypeLabel">
                        <div class="shareType">{{v.share_type}}</div>
                        <div class="resServiceType">{{v.topicName}}</div>
                      </div>
                      <div class="resDepart">{{v.dept_name}}</div>
                    </div>
                    <div class="home_left_resCount" :id="'cata_'+v.id+'test'" style="display: none;">
                      <router-link :to="{ name: 'resCatalogDetail', params: { id: v.id }}">
                        <div class="resInfo">
                          <div class="res_label">更新频率:</div><span>{{v.update_cycle}}</span>
                        </div>
                        <div class="resInfo">
                          <div class="res_label">数据量:</div><span>{{v.cata_info_item_count}}条</span>
                        </div>
                        <div class="resInfo">
                          <div class="res_label">文件数:</div><span>{{v.data_count}}</span>
                        </div>
                        <div class="resInfo">
                          <div class="res_label">接口数:</div><span>{{v.api_count}}</span>
                        </div>
                        <div class="resInfo">
                          <div class="res_label">应用数:</div><span>{{v.app_count}}</span>
                        </div>
                        <div class="applyEntry">
                          了解详情 <img src="../../assets/images/icons/ico_to_green.svg" alt="">
                        </div>
                      </router-link>
                    </div>

                  </div>
                </el-col>
              </el-tab-pane>
              <el-tab-pane label="共享资源" name="shareRes">
                <el-col :span="24" :offset="2" class="offsetWidth">
                  <div class="resOnlineItem" v-for="v,k in resList" @mouseover="mouseOvershareRes('res_'+v.id)" @mouseleave="mouseLeaveshareRes('res_'+v.id)" :key="k">
                    <div class="resInfoBlock" :id="'res_'+v.id">
                      <!-- <img :src="v.image"> -->
                      <svg t="1620869336570" class="icon" viewBox="0 0 1598 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8627" width="200" height="200">
                        <path d="M1448.585366 99.902439a189.689756 189.689756 0 0 0-3.87122-19.480976c-2.622439-12.487805-7.492683-14.73561-18.107317-21.978536A49.95122 49.95122 0 0 0 1398.634146 49.95122H199.804878a49.95122 49.95122 0 0 0-49.951219 49.951219v749.268293h1298.731707zM984.413659 899.121951c-8.99122 12.487805-21.479024 24.97561-35.340488 24.97561H649.365854a49.95122 49.95122 0 0 1-43.082927-24.97561H53.198049c6.868293 29.845854 28.347317 74.926829 96.405853 74.926829H1448.585366c68.058537 0 89.537561-45.080976 96.405854-74.926829z" fill="#FFFFFF" p-id="8628"></path>
                        <path d="M1048.97561 624.390244h199.804878v99.902439H1048.97561z" fill="#F79A6F" p-id="8629"></path>
                        <path d="M1048.97561 249.756098h199.804878v299.707317H1048.97561z" fill="#86AEDD" p-id="8630"></path>
                        <path d="M349.658537 249.756098h624.390243v474.536585H349.658537z" fill="#85AB70" p-id="8631"></path>
                        <path d="M199.804878 99.902439v749.268293h24.97561V124.878049h1148.878049v724.292683h24.975609V99.902439z m599.414634-12.487805a12.487805 12.487805 0 1 0-12.487805-12.487805 12.487805 12.487805 0 0 0 12.487805 12.487805z" fill="#313E4B" opacity=".15" p-id="8632"></path>
                        <path d="M424.585366 249.756098h-24.97561v24.975609h24.97561z m-74.926829 0v24.975609h24.975609v-24.975609z m124.878048 0h-24.975609v24.975609h24.975609z m-49.951219 99.902439h24.97561v-24.97561h-24.97561z m24.97561-24.97561h24.975609v-24.97561h-24.975609z m-99.902439-24.97561v24.97561h24.975609v-24.97561z m49.951219 24.97561h-24.97561v24.97561h24.97561z m24.97561-24.97561h-24.97561v24.97561h24.97561z m24.97561 0v-24.97561h-24.97561v24.97561z m-49.95122-24.97561h-24.97561v24.97561h24.97561z m24.97561 124.878049h-24.97561v24.97561h24.97561z m0 0h24.97561v-24.97561h-24.97561z m24.97561-24.97561h24.975609v-24.975609h-24.975609z m-99.902439 24.97561v24.97561h24.975609v-24.97561z m49.951219-24.97561h-24.97561v24.97561h24.97561z m24.97561-24.975609h-24.97561v24.975609h24.97561z m24.97561 74.926829h24.975609v-24.97561h-24.975609z m-99.902439-74.926829v24.975609h24.975609v-24.975609z m74.926829 149.853658h24.97561v-24.97561h-24.97561z m24.97561-24.97561h24.975609v-24.975609h-24.975609z m-99.902439-24.975609v24.975609h24.975609v-24.975609z m49.951219 24.975609h-24.97561v24.97561h24.97561z m24.97561-24.975609h-24.97561v24.975609h24.97561z m0 0h24.97561v-24.97561h-24.97561z m-24.97561-24.97561h-24.97561v24.97561h24.97561z m24.97561 124.878049h-24.97561v24.975609h24.97561z m0 0h24.97561v-24.97561h-24.97561z m24.97561-24.97561h24.975609v-24.97561h-24.975609z m-99.902439 24.97561v24.975609h24.975609v-24.975609z m49.951219-24.97561h-24.97561v24.97561h24.97561z m24.97561-24.97561h-24.97561v24.97561h24.97561z m24.97561 74.926829h24.975609v-24.975609h-24.975609z m-99.902439-74.926829v24.97561h24.975609v-24.97561z m74.926829 149.853659h24.97561v-24.97561h-24.97561z m24.97561-24.97561h24.975609v-24.97561h-24.975609z m-99.902439-24.97561v24.97561h24.975609v-24.97561z m49.951219 24.97561h-24.97561v24.97561h24.97561z m24.97561-24.97561h-24.97561v24.97561h24.97561z m0 0h24.97561v-24.97561h-24.97561z m-24.97561-24.97561h-24.97561v24.97561h24.97561z m0 149.853659h24.97561v-24.97561h-24.97561z m24.97561-49.95122v24.97561h24.97561v-24.97561z m24.97561 0h24.975609v-24.975609h-24.975609z m-99.902439 49.95122h24.975609v-24.97561h-24.975609z m24.975609-49.95122v24.97561h24.97561v-24.97561z m24.97561-24.975609v24.975609h24.97561v-24.975609z m49.95122 74.926829h24.975609v-24.97561h-24.975609z m-99.902439-74.926829v24.975609h24.975609v-24.975609z m174.829268-399.609756h-24.97561v24.975609h24.97561z m-49.95122 99.902439h24.97561v-24.97561h-24.97561z m49.95122-24.97561v-24.97561h-24.97561v24.97561z m-49.95122-49.95122v24.97561h24.97561v-24.97561z m0 124.878049h24.97561v-24.97561h-24.97561z m49.95122-24.97561v-24.975609h-24.97561v24.975609z m0 49.95122v-24.97561h-24.97561v24.97561z m-49.95122 74.926829h24.97561v-24.97561h-24.97561z m49.95122-24.97561v-24.975609h-24.97561v24.975609z m-49.95122-24.975609h24.97561v-24.97561h-24.97561z m0 99.902439h24.97561v-24.97561h-24.97561z m49.95122-24.97561v-24.97561h-24.97561v24.97561z m0 49.951219v-24.975609h-24.97561v24.975609z m-49.95122 74.92683h24.97561v-24.97561h-24.97561z m49.95122-24.97561v-24.97561h-24.97561v24.97561z m-49.95122-24.97561h24.97561v-24.97561h-24.97561z m0 99.902439h24.97561v-24.97561h-24.97561z m49.95122-24.97561v-24.975609h-24.97561v24.975609z m0 49.95122v-24.97561h-24.97561v24.97561z" opacity=".1" p-id="8633"></path>
                        <path d="M1598.439024 874.146341a24.97561 24.97561 0 0 0-24.975609-24.975609h-74.92683V99.902439a99.902439 99.902439 0 0 0-99.902439-99.902439H199.804878a99.902439 99.902439 0 0 0-99.902439 99.902439v749.268293H24.97561a24.97561 24.97561 0 0 0-24.97561 24.975609c0 51.82439 31.34439 149.853659 149.853659 149.853659h1298.731707c118.509268 0 149.853659-97.90439 149.853658-149.853659zM149.853659 99.902439a49.95122 49.95122 0 0 1 49.951219-49.951219h1198.829268a49.95122 49.95122 0 0 1 49.95122 49.951219v749.268293H149.853659z m1298.731707 874.146341H149.853659c-68.058537 0-89.537561-45.080976-96.405854-74.926829h553.209756A49.95122 49.95122 0 0 0 649.365854 924.097561h299.707317c13.736585 0 26.22439-12.487805 35.340488-24.97561h560.827317c-6.868293 29.845854-28.347317 74.926829-96.65561 74.926829z" opacity=".85" p-id="8634"></path>
                      </svg>
                      <div class="shareResBlock">
                        <div class="shareName">{{v.NAME}}
                        </div>
                        <div class="shareType">{{v.res_type==='api'?'接口':v.res_type==='data'?'文件':'服务'}}</div>
                      </div>
                      <div class="data">{{formatPublishDate}}</div>
                      <div class="resTypeLabel">
                        <div class="shareType">{{v.share_type==='01'?'无条件共享':'有条件共享'}}</div>
                        <div class="resServiceType">{{v.res_type==='api'?'接口':v.res_type==='data'?'文件':'服务'}}</div>
                      </div>
                      <div class="resDepart">{{v.dep_name}}</div>
                    </div>
                    <router-link :to="{ name: v.res_type+'Detail', params: { id: v.id }}">
                      <div class="home_left_resCount" :id="'res_'+v.id+'test'" style="display: none;">
                        <div class="resShareDescript">
                          {{v.description}}
                        </div>
                        <div class="applyEntry">
                          了解详情 <img src="../../assets/images/icons/ico_to_green.svg" alt="">
                        </div>

                      </div>
                    </router-link>
                  </div>
                </el-col>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
      </el-col>
      <el-col :span="24" style="height:503px;background-color: #fbfbfb;">
        <el-col :span="20" :offset="2" class="policyInfo">
          <div class="policyInfo_title">政策资讯</div>
          <div style="margin:0 auto;height: 274px;">
            <div class="policyInfo_item" v-for="(item,index) in policyNoticeList" :key="index">
              <img class="titleImg" src="../../assets/images/icons/ico_doc.svg" alt="">
              <div class="policyItem_right">
                <div class="policyTitleBlock">
                  <div class="home_policy_title">{{item.title}}</div>
                  <div class="showHideDate" @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)">
                    <div v-show="!item.showDetail" class="policy_date">{{item.publishDate}}</div>
                    <div v-show="item.showDetail" class="policyDetailExport" @click="openPolicy(item.url)">
                      查看详情 <img src="../../assets/images/icons/ico_to_green.svg" alt="">
                    </div>
                  </div>
                </div>
                <div :title="item.description" class="policy_content">
                  {{item.description}}
                </div>
              </div>

            </div>
          </div>
          <div class="policy_btn">
            <router-link :to="{name:'policy'}">
              <el-button type="success">更多资源 <img src="../../assets/images/icons/ico_to_white.svg" alt=""></el-button>
            </router-link>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <!--footer-->
    <el-row class="footer_background">
      <el-col :span="2" class="main_layout">
      </el-col>
      <el-col :span="20">
        <div>
          <Footers></Footers>
        </div>
      </el-col>
      <el-col :span="2" class="main_layout"></el-col>
    </el-row>
    <div class="slide">
      <img style="cursor: pointer" src="../../assets/images/icons/float_button.svg" alt="返回顶部" title="返回顶部" href="#" @click="scrollTop">
    </div>
  </div>
</template>

<script>
import Headers from '@/components/header/Header'
import Footers from '@/components/footer/Footer'
import constantValues from '@/common/utils/constant'
import cityStation from '@/common/json/cityStation'
import API from '@/common/api'
import moment from 'moment'

export default {
  data() {
    return {
      keyword: '',
      user: {},
      infoResCatalog: 'topic',
      newOnline: 'resCatalog',
      isShowResCatalogItem: true,
      isShowShareResItem: true,
      infoResCatalogs: {},
      newOnlineData: [],
      baseList: [],
      topicList: [],
      departList: [],
      newCataList: [],
      policyNoticeList: [],
      applyList: [],
      latestNotice: [{
        id: '',
        title: '【关于资源目录更新的通知 2019-03-02】请各部门按.....',
        description: '【关于资源目录更新的通知 2019-03-02】请各部门按《攀枝花政务信息资源目录管理办法》在2019年12月31日前检查并更新资源及.....',
        publishDate: '',
        url: ''
      }, {
        id: '',
        title: '【关于资源目录更新的通知 2019-03-02】请各部门按.....',
        description: '【关于资源目录更新的通知 2019-03-02】请各部门按《攀枝花政务信息资源目录管理办法》在2019年12月31日前检查并更新资源及.....',
        publishDate: '',
        url: ''
      }],
      resList: [],
      counts: {}
    }
  },
  created() {
    /*政策资讯*/
    API.Cms.getPolicyReading().then((res) => {
      this.policyNoticeList = res;
    }).catch(err => {
      console.log(err, "-----------")
    })
    //最新的通知公告
    API.Cms.getPolicyNoticeByPage({
      "code": "_pc_notice_page",
      "index": ""
    }).then((res) => {
      if (res.list.length > 0) {
        this.latestNotice = res.list
      }
    })
    API.Resdoc.getTypeList({
    }).then((res) => {
      this.baseList = res.result.baseList;
      this.topicList = res.result.topicList;
      this.departList = res.result.departList;
    })
    API.Resdoc.getNewCataList({
      pageSize: 5
    }).then((res) => {
      this.newCataList = res.result;
    })
    API.Common.getShareResList({
      pageSize: 5
    }).then((res) => {
      this.resList = res.result.list;
    })
    API.Common.getCountForHome().then((res) => {
      this.counts = res.result;
    })
    API.App.getInfoResCatalog().then((res) => {
      this.infoResCatalogs = res.result
    })
    /*最新上线*/
    API.App.getNewOnline().then((res) => {
      this.newOnlineData = res.result
    })
    API.Statistics.getDeptDownloadNum().then((res) => {
      var resultData = res.result
      var count = 0
      for (var i = 0; i < resultData.length; i++) {
        count += resultData[i].apiNum
        count += resultData[i].dataNum
      }
      this.counts.appCount = count
    })
    API.Demand.getDemandList().then((res) => {
      this.applyList = res.result.list
      //        this.pageInfo = res.result.page
    })
  },
  watch: {
    keyword: {
      //        handler () {
      //          if(this.keyword ==''){
      //            this.$router.push({'name': 'search', 'params': {'keyword': this.keyword}})
      //          }
      //        }
    },
    deep: true
  },
  methods: {
    keySearch() {
      this.handleSelect()

    },
    handleSelect() {
      this.$router.push({ 'name': 'search', 'params': { 'keyword': this.keyword } })
    },
    openPolicy(url) {
      if (url)
        //          window.open(url)
        this.$router.push({ name: 'policyDetail', params: { url: url } })
    },
    openPolicyNotParams() {
      this.$router.push({ name: 'policy' })
    },
    getUser(user) {
      this.user = user
    },
    scrollTop() {
      if (document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop = 0
      }
      if (document.body.scrollTop !== 0) {
        document.body.scrollTop = 0
      }
    },
    aboutUs() {
      this.$router.push({ 'name': 'aboutus' })
    },
    switchCity() {
      location.href = 'http://share-portal2.hanlnk.com:82/'
    },
    switchCity1() {
      let _this = this
      _this.checkChangeAreaCode('123456')
      API.Common.switchCity({
        'areaCode': '123456',
        'callback': function () {
          // _this.$router.go(0)
          window.location.reload()
        }
      })
    },
    checkChangeAreaCode(newAreaCode) {
      if (newAreaCode && newAreaCode.toString() !== constantValues.areaCode.toString()) {
        constantValues.areaCode = newAreaCode.toString()
        let currentCity = cityStation.cities.filter(function (item) {
          return item.code === newAreaCode.toString()
        })
        constantValues.cityAbbr = currentCity[0].abbr
        // cityStation.test = 'qqqq'
        // alert('constantValues.cityAbbr:' + constantValues.cityAbbr + 'currentCity[0].abbr:' + currentCity[0].abbr)
        console.log('constantValues.areaCode:' + constantValues.areaCode)
        console.log('constantValues.cityAbbr:' + constantValues.cityAbbr)
        window.sessionStorage.setItem('areaCode', newAreaCode.toString())
        window.sessionStorage.setItem('cityAbbr', currentCity[0].abbr)
      }
    },
    handleClick(tab, event) {
    },
    onlineHandleClick(tab, event) {
      $('#aatest').css('display', 'none')
      $('#aaatest').css('display', 'none')
    },
    /*移入*/
    mouseOver(index) {
      this.policyNoticeList[index].showDetail = true
    },
    /*移出*/
    mouseLeave(index) {
      this.policyNoticeList[index].showDetail = false
    },
    /*资源目录移入*/
    mouseOverResCatalog(param) {
      $('#' + param).css('display', 'none')
      $('#' + param + 'test').css('display', 'block')
    },
    /*资源目录移出*/
    mouseLeaveResCatalog(param) {
      $('#' + param).css('display', 'block')
      $('#' + param + 'test').css('display', 'none')
    },
    /*共享资源移入*/
    mouseOvershareRes(param) {
      $('#' + param).css('display', 'none')
      $('#' + param + 'test').css('display', 'block')
    },
    /*共享资源移出*/
    mouseLeaveshareRes(param) {
      $('#' + param).css('display', 'block')
      $('#' + param + 'test').css('display', 'none')
    }
  },
  computed: {
    formatPublishDate() {
      return moment(this.resList.updated_time).format('YYYY-MM-DD')
    }
  },
  components: {
    Headers,
    Footers
  }
}
</script>

<style>
.home_logo {
  color: #ffffff;
  font-size: 44px;
  position: absolute;
  left: 60px;
  top: 120px;
  font-weight: 600;
  font-style: italic;
}
.searchInput .el-input__prefix {
  left: 95%;
}
.searchInput .el-input__inner {
  background: #ffffff;
  border: #6f6f78;
  color: #000;
  padding: 0 15px !important;
}
</style>
<style type="less" scoped>
@import "../../assets/css/home.css";

.main_layout {
  min-height: 20px;
}

.slide {
  position: fixed;
  right: 50px;
  bottom: 0;
  z-index: 100;
  width: 40px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
}

.theme1 {
  width: 100%;
  display: inline-block;
  height: 40px;
  border: 1px solid #dadee7;
  background: url("../../assets/images/data_image.png") no-repeat center center;
  cursor: pointer;
  margin-bottom: 10px;
}

.theme1:hover {
  border: 2px solid #5cb981;
}

.first {
  background-position: 0px 0px;
}

.second {
  background-position: 0px -42px;
}

.third {
  background-position: 0px -82px;
}

.fourth {
  background-position: 0px -124px;
}

.five {
  background-position: 0px -168px;
}

.footer_background {
  background-image: url("../../assets/images/icons/footer_background.png");
  background-repeat: no-repeat;
  background-size: 100% 434px;
  -moz-background-size: 100% 434px;
  background-color: rgb(251, 251, 251);
}
.apply {
  margin-top: 10px;
  margin-left: 110px;
  color: red;
  font-size: 18px;
  font-weight: 700;
}
</style>
