# share-portal-frontend

> 共享平台前端门户

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录说明

```bash
--build                 # 构建脚本相关（webpack）
--config                # 构建配置文件
--dist                  # 构建结果文件夹
--src                   # 源代码
    |__assets             # 资源文件夹
    |__common             # 公共文件
    |     |__api            # 定义接口
    |     |__filters        # 过滤器
    |     |__utils          # 工具函数
    |     |__validation     # 自定义表单参数验证
    |__components         # 公共组件
    |     |__apiItem        # API item
    |     |__applyBox       # 资源申请弹窗
    |     |__filters        # 列表左侧筛选
    |     |__filterTags     # 列表筛选上部标签集合
    |     |__footer         # 底部组件
    |     |__header         # 头部组件
    |     |__swiper         # 首页swiper组件
    |__lib                # 第三方插件
    |     |__showdown.js    # markdown转换器
    |__modules
    |     |__api            # 门户云接口
    |     |__data           # 门户云数据
    |     |__demand         # 门户需求
    |     |__home           # 门户首页
    |     |__userInfo       # 用户中心
    |     |__Index.vue      # 门户外层包装页面
    |     |__Login.vue      # 门户登录页面
    |__router             # 路由
    |__main.js            # 入口文件
```

## 业务组件的一些说明

 ` layui-layer ` 弹层

  文档地址：http://layer.layui.com/

  示例参考：http://gitlab.dctech.club:81/mscx/share-portal-frontend/blob/master/src/modules/api/Detail.vue#L188

` vue-datepicker-local ` 日期控件

  文档地址：https://github.com/weifeiyue/vue-datepicker-local

  示例参考：http://gitlab.dctech.club:81/mscx/share-portal-frontend/blob/master/src/components/applyBox/index.vue#L15

` vuejs-paginate ` 列表分页

  文档地址：https://github.com/lokyoung/vuejs-paginate

  示例参考：http://gitlab.dctech.club:81/mscx/share-portal-frontend/blob/master/src/modules/api/Index.vue#L21

` vuelidate ` 表单验证

  文档地址：https://monterail.github.io/vuelidate/

  示例参考：http://gitlab.dctech.club:81/mscx/share-portal-frontend/blob/master/src/modules/Login.vue#L57


## 开发环境配置

 开发调试需要手动在hosts文件中加入以下配置,开发调试需要手动在hosts文件中加入以下配置
```
101.200.52.215 share-portal.hanlnk.com
101.200.52.215 share-portal-master.hanlnk.com
101.200.52.215 mscx-micro.hanlnk.com
101.200.52.215 mscx-message-mgr.hanlnk.com
101.200.52.215 mscx-point-mgr.hanlnk.com
101.200.52.215 mscx-cache-mgr.hanlnk.com
101.200.52.215 zmy.hanlnk.com
101.200.52.215 share-requirement-mgr.hanlnk.com
101.200.52.215 share-data-mgr.hanlnk.com
101.200.52.215 share-log-mgr.hanlnk.com
101.200.52.215 share-rescollector-mgr.hanlnk.com
101.200.52.215 share-api-mgr.hanlnk.com
101.200.52.215 share-app-mgr.hanlnk.com
101.200.52.215 mscx-distribute-api.hanlnk.com
101.200.52.215 mscx-dict-api.hanlnk.com
101.200.52.215 mscxupms.hanlnk.com
101.200.52.215 share-uc-api.hanlnk.com
101.200.52.215 share-order-api.hanlnk.com
101.200.52.215 share-api-api.hanlnk.com
101.200.52.215 share-app-api.hanlnk.com
101.200.52.215 share-data-api.hanlnk.com
101.200.52.215 share-requirement-api.hanlnk.com
101.200.52.215 share-rescollector-api.hanlnk.com
101.200.52.215 mscx-eureka.hanlnk.com
101.200.52.215 mscx-eureka-2.hanlnk.com
101.200.52.215 mcplatform.hanlnk.com
101.200.52.215 share-dict-mgr.hanlnk.com
101.200.52.215 share-distribute-mgr.hanlnk.com
101.200.52.215 pzh-api.hanlnk.com
101.200.52.215 pzh-api.zz.hanlnk.com
101.200.52.215 pzh-service.hanlnk.com
101.200.52.215 share-topology-mgr.hanlnk.com
101.200.52.215 share-message-mgr.hanlnk.com
```
