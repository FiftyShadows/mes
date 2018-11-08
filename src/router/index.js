import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Help from '@/components/help'
// import mainLayout from '../../src/components/main_layout'
// import Login from '@/components/login' // 仓储登陆
// ================================自动化===============================
// 当前
// import Current from '@/components/auto/auto_current/index'
// // 历史
// import History from '@/components/auto/auto_history/history'
// // 丝锭管理
// import silkPrint from '@/components/auto/auto_silk_manage/silk_print'
// // 染判
// import Dyed from '@/components/auto/auto_dye/dyed'
// import Dyeing from '@/components/auto/auto_dye/dyeing'
// // 管理员
// import Permissions from '@/components/auto/auto_admin/admin_permissions'
// import User from '@/components/auto/auto_admin/user'
// import UserGroups from '@/components/auto/auto_admin/user_groups'
// // 生产计划
// import Batch from '@/components/auto/auto_production_plan/Batch_manage'
// import Notice from '@/components/auto/auto_production_plan/notice'
// import NoticePerform from '@/components/auto/auto_production_plan/notice_perform'
// import WorkPlan from '@/components/auto/auto_production_plan/workshop_product_plan'
// // 自动化配置
// import Grade from '@/components/auto/auto_configuration/grade_manage'
// import LineControl from '@/components/auto/auto_configuration/line_control'
// import Machine from '@/components/auto/auto_configuration/machine_manage'
// import Product from '@/components/auto/auto_configuration/product_manage'
// import Configurat from '@/components/auto/auto_configuration/product_configurat'
// import SlikCar from '@/components/auto/auto_configuration/silkCar_manage'
// import WorkshopManage from '@/components/auto/auto_configuration/workshop_manage'
// import PackageClass from '@/components/auto/auto_configuration/package_class'
// import TemporaryBox from '@/components/auto/auto_configuration/temporary_box'
// ================================仓储=================================
// 包装计量
import ShortSilk from '@/components/ware/ware_measurement/shortSilk/shortSilkPrint'
import Artificial from '@/components/ware/ware_measurement/artificial/artificial'
import SmallPackage from '@/components/ware/ware_measurement/smallPackage/smallPackage'
import BoxManagement from '@/components/ware/ware_measurement/boxManagement/boxManagement'
import PackagingRecords from '@/components/ware/ware_measurement/packaging_records/packaging_records'
// 库位库存
import Warehouse from '@/components/ware/ware_storage/storage_warehouse/warehouse'
import StorageView from '@/components/ware/ware_storage/storage_view/view'
import StoragePlan from '@/components/ware/ware_storage/storage_plan/plan'
import StorageDetail from '@/components/ware/ware_storage/storage_detail/detail'
import StorageTrace from '@/components/ware/ware_storage/storage_trace/trace'
import SAPMessage from '@/components/ware/ware_storage/storage_SAPMessage/SAPMessage'
import FBreason from '@/components/ware/ware_storage/storage_FB_reason/FB_reason'
import Edit from '@/components/ware/ware_storage/storage_edit/edit'
// 仓储记录
import InStorage from '@/components/ware/ware_record/in_storage_record/in_storage_record'
import OutStorage from '@/components/ware/ware_record/out_storage_record/out_storage_record'
import Returngoods from '@/components/ware/ware_record/returngoods_record/returngoods_record'
import PrepareInStorage from '@/components/ware/ware_record/prepare_in_storage/prepare_in_storage'
import OnceAgain from '@/components/ware/ware_record/onceAgain_record/onceAgain_record'
// 调拨处理
import SilkCarShipped from '@/components/ware/ware_transfers/silkCarShipped/silkCarShipped'
import SalesRequisition from '@/components/ware/ware_transfers/sales_requisition/sales_requisition'
import ReturngoodsRequisition from '@/components/ware/ware_transfers/returngoods_requisition/returngoods_requisition'
// 盘点SAP
import InventorySAP from '@/components/ware/ware_inventory_SAP/inventorySAP/index'
import api from '../api'
import store from '../store/store'

Vue.use(Router)
let route = new Router({
  routes: [
    {
      path: '/',
      name: 'index1',
      component: Index,
      children: [
        // ================================自动化===============================

        // {// 当前
        //   path: '/current/index',
        //   name: '当前',
        //   component: Current,
        //   class: 'el-icon-search',
        //   permissions: ''
        // },
        // {// 历史
        //   path: '/history',
        //   name: '历史',
        //   component: History,
        //   class: 'el-icon-search'
        // },
        // {// 管理员
        //   path: '/admin',
        //   component: mainLayout,
        //   name: '管理员',
        //   class: 'el-icon-setting',
        //   children: [
        //     {// 权限
        //       path: 'perminssions',
        //       name: '权限',
        //       component: Permissions,
        //       class: 'el-icon-location'
        //     }, {// 用户
        //       path: 'user',
        //       name: '用户',
        //       component: User,
        //       class: 'el-icon-location'
        //     }, {// 用户组
        //       path: 'userGroups',
        //       name: '用户组',
        //       component: UserGroups,
        //       class: 'el-icon-location'
        //     }
        //   ]
        // },
        // {// 自动化配置
        //   path: '/configuration',
        //   name: '自动化配置',
        //   component: mainLayout,
        //   class: 'el-icon-setting',
        //   children: [
        //     {// 等级管理
        //       path: 'Grade',
        //       name: '等级管理',
        //       component: Grade,
        //       class: 'el-icon-location'
        //     }, {// 线别控制
        //       path: 'LineControl',
        //       name: '线别管理',
        //       component: LineControl,
        //       class: 'el-icon-location'
        //     }, {// 机台管理
        //       path: 'Machine',
        //       name: '机台管理',
        //       component: Machine,
        //       class: 'el-icon-location'
        //     }, {// 产品管理
        //       path: 'Product',
        //       name: '产品管理',
        //       component: Product,
        //       class: 'el-icon-location',
        //       children: [
        //         {// 产品管理--配置
        //           path: 'configurat',
        //           name: '产品管理--配置',
        //           component: Configurat
        //         }
        //       ]
        //     }, {// 丝车管理
        //       path: 'SlikCar',
        //       name: '丝车管理',
        //       component: SlikCar,
        //       class: 'el-icon-location'
        //     }, {// 车间管理
        //       path: 'WorkshopManage',
        //       name: '车间管理',
        //       component: WorkshopManage,
        //       class: 'el-icon-location'
        //     }, {// 打包班次管理
        //       path: 'PackageClass',
        //       name: '打包班次管理',
        //       component: PackageClass,
        //       class: 'el-icon-location'
        //     }, {// 暂存箱管理
        //       path: 'TemporaryBox',
        //       name: '暂存箱管理',
        //       component: TemporaryBox,
        //       class: 'el-icon-location'
        //     }
        //   ]
        // },
        // {// 丝锭打印
        //   path: '/silkManage',
        //   name: '丝锭管理',
        //   component: mainLayout,
        //   class: 'el-icon-setting',
        //   children: [
        //     {
        //       path: 'silkPrint',
        //       name: '丝锭打印',
        //       component: silkPrint,
        //       class: 'el-icon-location'
        //     },
        //     {// 包装计量--人工唛头
        //       path: 'boxPrint',
        //       name: '包装唛头打印',
        //       component: Artificial
        //     }
        //   ]
        // },
        // {// 染判
        //   path: '/dye',
        //   name: '染判',
        //   component: mainLayout,
        //   class: 'el-icon-setting',
        //   children: [
        //     {// 待染判
        //       path: 'dyeing',
        //       name: '待染判',
        //       component: Dyeing,
        //       class: 'el-icon-location'
        //     },
        //     {// 已染判
        //       path: 'dyed',
        //       name: '已染判',
        //       component: Dyed,
        //       class: 'el-icon-location'
        //     }
        //   ]
        // },
        // {// 生产计划
        //   path: '/productPlan',
        //   name: '生产计划',
        //   component: mainLayout,
        //   class: 'el-icon-setting',
        //   children: [
        //     {// 批号管理
        //       path: 'Batch',
        //       name: '批号管理',
        //       component: Batch,
        //       class: 'el-icon-location'
        //     }, {// 通知单
        //       path: 'Notice',
        //       name: '通知单',
        //       component: Notice,
        //       class: 'el-icon-location',
        //       children: [
        //         {// 通知单--执行情况
        //           path: 'Notice-perform',
        //           name: '执行情况',
        //           component: NoticePerform
        //         }
        //       ]
        //     }, {// 车间生产计划
        //       path: 'WorkPlan',
        //       name: '车间生产计划',
        //       component: WorkPlan,
        //       class: 'el-icon-location'
        //     }
        //   ]
        // },
        // {// 历史
        //   path: '/report',
        //   name: '报表',
        //   component: History,
        //   class: 'el-icon-search'
        // },
        // ================================仓储===============================
        {// 包装计量--自动打唛头
          path: '/measurement/ShortSilk',
          name: 'ShortSilk',
          component: ShortSilk
        }, {// 包装计量--人工唛头
          path: '/measurement/artificial',
          name: 'Artificial',
          component: Artificial
        }, {// 包装计量--小包装唛头
          path: '/measurement/smallPackage',
          name: 'SmallPackage',
          component: SmallPackage
        }, {// 包装计量--暂存箱管理
          path: '/measurement/BoxManagement',
          name: 'BoxManagement',
          component: BoxManagement
        }, {// 包装计量--包装记录
          path: '/measurement/PackagingRecords',
          name: 'PackagingRecords',
          component: PackagingRecords
        }, { // 库位库存--仓库
          path: '/storage/warehouse',
          name: 'Warehouse',
          component: Warehouse
        }, { // 库位库存--库位维护
          path: '/storage/edit',
          name: 'Edit',
          component: Edit
        }, { // 库位库存--库位视图
          path: '/storage/view',
          name: 'StorageView',
          component: StorageView
        }, { // 库位库存--库位计划
          path: '/storage/plan',
          name: 'StoragePlan',
          component: StoragePlan
        }, { // 库位库存--库位明细
          path: '/storage/detail',
          name: 'StorageDetail',
          component: StorageDetail
        }, { // 库位库存--箱包追溯
          path: '/storage/trace',
          name: 'StorageTrace',
          component: StorageTrace
        }, { // 库位库存--SAP信息
          path: '/storage/SAPMessage',
          name: 'SAPMessage',
          component: SAPMessage
        }, { // 库位库存--翻包原因
          path: '/storage/FBreason',
          name: 'FBreason',
          component: FBreason
        }, { // 仓储记录--入库记录
          path: '/record/instorage',
          name: 'InStorage',
          component: InStorage
        }, { // 仓储记录--待入库
          path: '/record/PrepareInStorage',
          name: 'PrepareInStorage',
          component: PrepareInStorage
        }, { // 仓储记录--出库记录
          path: '/record/OutStorage',
          name: 'OutStorage',
          component: OutStorage
        }, { // 仓储记录--退货记录
          path: '/record/Returngoods',
          name: 'Returngoods',
          component: Returngoods
        }, { // 仓储记录--翻包记录
          path: '/record/OnceAgainPackage',
          name: 'OnceAgain',
          component: OnceAgain
        }, { // 调拨处理--销售调拨单
          path: '/record/SalesRequisition',
          name: 'SalesRequisition',
          component: SalesRequisition
        }, { // 调拨处理--退货调拨单
          path: '/record/ReturngoodsRequisition',
          name: 'ReturngoodsRequisition',
          component: ReturngoodsRequisition
        }, { // 调拨处理--丝车发运调拨单
          path: '/record/SilkCarShipped',
          name: 'SilkCarShipped',
          component: SilkCarShipped
        }, { // 盘点SAP
          path: '/inventory/InventorySAP',
          name: 'InventorySAP',
          component: InventorySAP
        }
      ]
    },
    {// 帮助页面
      path: '/help',
      name: 'help',
      component: Help
    }
    // {// login
    //   path: '/ware/login',
    //   name: 'login',
    //   component: Login
    // }
  ]
})
route.beforeEach((to, from, next) => {
  // console.log(store.state.routers)
  if (store.state.routers.length === 0) {
    api.getAuth().then(res => {
      let userInfo = res.data
      store.commit('UserInfo', userInfo)
      route.addRoutes(store.state.routers)
      next()
    })
  }
  next()
})
export default route

// 路由从定向
// ...
