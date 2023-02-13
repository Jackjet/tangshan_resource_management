import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
  //  mode: 'history',
  routes: [
    {
      path: '/index',
      component: resolve => require(['../modules/Index.vue'], resolve),
      children: [
        {
          path: '/resList',
          name: 'resList',
          component: resolve => require(['../modules/count/ResShareList.vue'], resolve)
        }, {
          path: '/resCatalog',
          name: 'resCatalog',
          component: resolve => require(['../modules/resCatalog/index.vue'], resolve)
        }, {
          path: '/resCatalog/:id',
          name: 'resCatalogDetail',
          component: resolve => require(['../modules/resCatalog/detail.vue'], resolve)
        }, {
          path: '/search/:keyword',
          name: 'search',
          component: resolve => require(['../modules/search/Index.vue'], resolve)
        }, {
          path: '/shareInfo',
          name: 'shareInfo',
          component: resolve => require(['../modules/shareInfo/Index.vue'], resolve)
        }, {
          path: '/resTopo',
          name: 'resTopo',
          component: resolve => require(['../modules/resTopo/Index.vue'], resolve)
        }, {
          path: '/aboutus',
          name: 'aboutus',
          component: resolve => require(['../modules/contactUs/AboutUs.vue'], resolve)
        }, {
          path: '/data',
          name: 'data',
          component: resolve => require(['../modules/data/Index.vue'], resolve)
        }, {
          path: '/data/categoryId=:categoryId',
          name: 'data',
          component: resolve => require(['../modules/data/Index.vue'], resolve)
        }, {
          path: '/data/depCode=:depCode',
          name: 'data',
          component: resolve => require(['../modules/data/Index.vue'], resolve)
        }, {
          path: '/data/:id',
          name: 'dataDetail',
          component: resolve => require(['../modules/data/Detail.vue'], resolve)
        }, {
          path: '/api',
          name: 'api',
          component: resolve => require(['../modules/api/Index.vue'], resolve)
        }, {
          path: '/api/categoryId=:categoryId',
          name: 'api',
          component: resolve => require(['../modules/api/Index.vue'], resolve)
        }, {
          path: '/api/depCode=:depCode',
          name: 'api',
          component: resolve => require(['../modules/api/Index.vue'], resolve)
        }, {
          path: '/api/:id',
          name: 'apiDetail',
          component: resolve => require(['../modules/api/Detail.vue'], resolve)
        }, {
          path: '/service',
          name: 'service',
          component: resolve => require(['../modules/service/Index.vue'], resolve)
        }, {
          path: '/service/categoryId=:categoryId',
          name: 'service',
          component: resolve => require(['../modules/service/Index.vue'], resolve)
        }, {
          path: '/service/depCode=:depCode',
          name: 'service',
          component: resolve => require(['../modules/service/Index.vue'], resolve)
        }, {
          path: '/service/:id',
          name: 'serviceDetail',
          component: resolve => require(['../modules/service/Detail.vue'], resolve)
        }, {
          path: '/user',
          component: resolve => require(['../modules/userInfo/Index.vue'], resolve),
          children: [
            {
              path: '',
              name: 'userIndex',
              component: resolve => require(['../modules/userInfo/Default.vue'], resolve)
            }, {
              path: 'info',
              component: resolve => require(['../modules/userInfo/views/info/Index.vue'], resolve),
              children: [
                {
                  path: '',
                  name: 'userBasic',
                  component: resolve => require(['../modules/userInfo/views/info/Basic.vue'], resolve)
                }, {
                  path: 'password',
                  name: 'userPassword',
                  component: resolve => require(['../modules/userInfo/views/info/Password.vue'], resolve)
                }
              ]
            }, {
              path: 'demand',
              name: 'userDemand',
              component: resolve => require(['../modules/userInfo/views/demand/Index.vue'], resolve)
            },
            {
              path: '',
              name: 'checkApiApply',
              component: resolve => require(['../modules/userInfo/views/check/Apply.vue'], resolve)
            },
            {
              path: '',
              name: 'checkDataApply',
              component: resolve => require(['../modules/userInfo/views/check/DataApply.vue'], resolve)
            }, {
              path: 'objection',
              name: 'userObjection',
              component: resolve => require(['../modules/userInfo/views/objection/Index.vue'], resolve)
            }, {
              path: 'data',
              component: resolve => require(['../modules/userInfo/views/data/Index.vue'], resolve),
              children: [
                {
                  path: '',
                  name: 'userDataApply',
                  component: resolve => require(['../modules/userInfo/views/data/Apply.vue'], resolve)
                }, {
                  path: 'follow',
                  name: 'userDataFollow',
                  component: resolve => require(['../modules/userInfo/views/data/Follow.vue'], resolve)
                }
              ]
            }, {
              path: 'api',
              component: resolve => require(['../modules/userInfo/views/api/Index.vue'], resolve),
              children: [
                {
                  path: '',
                  name: 'userApiApply',
                  component: resolve => require(['../modules/userInfo/views/api/Apply.vue'], resolve)
                }, {
                  path: 'follow',
                  name: 'userApiFollow',
                  component: resolve => require(['../modules/userInfo/views/api/Follow.vue'], resolve)
                }
              ]
            }, {
              path: 'cata',
              name: 'userCata',
              component: resolve => require(['../modules/userInfo/views/cata/Index.vue'], resolve)
            }, {
              path: 'service',
              component: resolve => require(['../modules/userInfo/views/service/Index.vue'], resolve),
              children: [
                {
                  path: '',
                  name: 'userServiceApply',
                  component: resolve => require(['../modules/userInfo/views/service/Apply.vue'], resolve)
                }, {
                  path: 'follow',
                  name: 'userServiceFollow',
                  component: resolve => require(['../modules/userInfo/views/service/Follow.vue'], resolve)
                }
              ]
            }
          ]
        }, {
          path: '/dataBaseCompany',
          name: 'dataBaseCompany',
          component: resolve => require(['../modules/home/components/dataBase/DetailCompany.vue'], resolve)
        }, {
          path: '/dataBaseCredit',
          name: 'dataBaseCredit',
          component: resolve => require(['../modules/home/components/dataBase/DetailCredit.vue'], resolve)
        }, {
          path: '/dataBaseLicense',
          name: 'dataBaseLicense',
          component: resolve => require(['../modules/home/components/dataBase/DetailLicense.vue'], resolve)
        }, {
          path: '/dataBasePerson',
          name: 'dataBasePerson',
          component: resolve => require(['../modules/home/components/dataBase/DetailPerson.vue'], resolve)
        }, {
          path: '/aggregationDataList',
          name: 'aggregationDataList',
          component: resolve => require(['../modules/home/components/dataBase/aggregationDataList.vue'], resolve)
        }, {
          path: '/shareDataList',
          name: 'shareDataList',
          component: resolve => require(['../modules/home/components/dataBase/shareDataList.vue'], resolve)
        }, {
          path: '/enterpriseList',
          name: 'enterpriseList',
          component: resolve => require(['../modules/enterprise/enterpriseList.vue'], resolve)
        }, {
          path: '/enterprise/:id',
          name: 'enterpriseDetail',
          component: resolve => require(['../modules/enterprise/detail.vue'], resolve)
        },
        {
          path: '/policyDetail/:url',
          name: 'policyDetail',
          component: resolve => require(['../modules/policyInfo/policyDetail.vue'], resolve)
        }
      ]
    },
    {
      path: '/',
      name: 'screen',
      component: resolve => require(['../modules/screen/index.vue'], resolve)
    },
    {
      path: '/handle',
      name: 'handle',
      component: resolve => require(['../modules/screen/handle.vue'], resolve)
    },
    {
      path: '/handleList',
      name: 'handleList',
      component: resolve => require(['../modules/screen/handle_list.vue'], resolve)
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: resolve => require(['../modules/screen/exchange.vue'], resolve)
    },
    {
      path: '/exchangeList',
      name: 'exchangeList',
      component: resolve => require(['../modules/screen/exchange_list.vue'], resolve)
    },
    {
      path: '/dataHall',
      name: 'dataHall',
      component: resolve => require(['../modules/dataHall/index.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../modules/home/Home.vue'], resolve)
    },
    {
      path: '/policy',
      name: 'policy',
      component: resolve => require(['../modules/policyInfo/Index.vue'], resolve)
    },
    {
      path: '/docDownload',
      name: 'docDownload',
      component: resolve => require(['../modules/docDownload/Index.vue'], resolve)
    },
    {
      path: '/demand/create',
      name: 'demandCreate',
      component: resolve => require(['../modules/demand/Create.vue'], resolve)
    },
    {
      path: '/demand',
      name: 'demand',
      component: resolve => require(['../modules/demand/Index.vue'], resolve)
    },
    {
      path: '/objection/create',
      name: 'objectionCreate',
      component: resolve => require(['../modules/objection/Create.vue'], resolve)
    },
    {
      path: '/help/:name',
      name: 'help',
      component: resolve => require(['../modules/help/Index.vue'], resolve)
    },
    {
      path: '/demand-/:id',
      name: 'demandDetail',
      component: resolve => require(['../modules/demand/Detail.vue'], resolve)
    },
    {
      path: '/resApply',
      name: 'resApply',
      component: resolve => require(['../modules/resApply/index.vue'], resolve)
    },
    {
      path: '/resApply/update',
      name: 'resApplyUpdate',
      component: resolve => require(['../modules/resApply/update.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../modules/Login.vue'], resolve)
    }, {
      path: '*', redirect: '/'
    }, {
      path: '/dataHall',
      name: 'dataHall',
      component: resolve => require(['../modules/dataHall/index.vue'], resolve)
    }, {
      path: '/inventory',
      name: 'inventory',
      component: resolve => require(['../modules/inventory/index.vue'], resolve)
    },

  ]
})

router.beforeEach((to, from, next) => {
  layer.closeAll()
  next()
})

router.afterEach(() => {
})

export default router
