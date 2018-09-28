import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Help from '@/components/help'
// import Login from '@/components/login' // 仓储登陆
// ================================自动化===============================
// 当前
import Current from '@/components/auto/auto-current/index'
// 历史
import History from '@/components/auto/auto_history/history'
// 染判
import Dyed from '@/components/auto/auto_dye/dyed'
import Dyeing from '@/components/auto/auto_dye/dyeing'
// 管理员
import Permissions from '@/components/auto/auto_admin/admin_permissions'
import User from '@/components/auto/auto_admin/user'
import UserGroups from '@/components/auto/auto_admin/user_groups'
// 生产计划
import Batch from '@/components/auto/auto_production_plan/Batch_manage'
import Notice from '@/components/auto/auto_production_plan/notice'
import NoticePerform from '@/components/auto/auto_production_plan/notice_perform'
import WorkPlan from '@/components/auto/auto_production_plan/workshop_product_plan'
// 自动化配置
import Grade from '@/components/auto/auto_configuration/grade_manage'
import LineControl from '@/components/auto/auto_configuration/line_control'
import Machine from '@/components/auto/auto_configuration/machine_manage'
import Product from '@/components/auto/auto_configuration/product_manage'
import Configurat from '@/components/auto/auto_configuration/product_configurat'
import SlikCar from '@/components/auto/auto_configuration/silkCar_manage'
import WorkshopManage from '@/components/auto/auto_configuration/workshop_manage'
// ================================仓储=================================
// 包装计量
import AutoPackage from '@/components/ware/ware_measurement/autoPackage/autoPackage'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        // ================================自动化===============================
        {// 当前
          path: '/current/index',
          name: 'current',
          component: Current
        },
        {// 历史
          path: '/history',
          name: 'history',
          component: History
        },
        {// 待染判
          path: '/dye/dyeing',
          name: 'dyeing',
          component: Dyeing
        },
        {// 已染判
          path: '/dye/dyed',
          name: 'dyed',
          component: Dyed
        },
        {// 权限
          path: '/admin/perminssions',
          name: 'permissions',
          component: Permissions
        }, {// 用户
          path: '/admin/user',
          name: 'user',
          component: User
        }, {// 用户组
          path: '/admin/userGroups',
          name: 'UserGroups',
          component: UserGroups
        }, {// 批号管理
          path: '/productPlan/Batch',
          name: 'Batch',
          component: Batch
        }, {// 通知单
          path: '/productPlan/Notice',
          name: 'Notice',
          component: Notice
        }, {// 通知单--执行情况
          path: '/productPlan/Notice-perform',
          name: 'Notice-perform',
          component: NoticePerform
        }, {// 车间生产计划
          path: '/productPlan/WorkPlan',
          name: 'WorkPlan',
          component: WorkPlan
        }, {// 等级管理
          path: '/configuration/Grade',
          name: 'Grade',
          component: Grade
        }, {// 线别控制
          path: '/configuration/LineControl',
          name: 'LineControl',
          component: LineControl
        }, {// 机台管理
          path: '/configuration/Machine',
          name: 'Machine',
          component: Machine
        }, {// 产品管理
          path: '/configuration/Product',
          name: 'Product',
          component: Product
        }, {// 产品管理--配置
          path: '/configuration/Product/configurat',
          name: 'Configurat',
          component: Configurat
        }, {// 丝车管理
          path: '/configuration/SlikCar',
          name: 'SlikCar',
          component: SlikCar
        }, {// 车间管理
          path: '/configuration/WorkshopManage',
          name: 'WorkshopManage',
          component: WorkshopManage
        },
        // ================================仓储===============================
        {// 包装计量--自动打唛头
          path: '/measurement/autoPackage',
          name: 'AutoPackage',
          component: AutoPackage
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

// 路由从定向
// ...
