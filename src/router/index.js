import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Help from '@/components/help'
import api from '../../src/api'
import store from '../store/store'
// import Login from '@/components/login' // 仓储登陆
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

Vue.use(Router)
let route = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      beforeEnter: (to, from, next) => {
        api.getAuth().then(res => {
          let userInfo = res.data
          store.commit('UserInfo', userInfo)
        })
        next()
      },
      // beforeEnter: (to, from, next) => {
      //   api.getAuth().then(res => {
      //     let userInfo = res.data
      //     store.commit('UserInfo', userInfo)
      //     console.log()
      //     next()
      //   })
      // },
      children: [
        // ================================自动化===============================
        ...store.state.routers,
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
  next()
})
export default route

// 路由从定向
// ...
