import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index.js'
import mainLayout from '../../src/components/main_layout'
// ================================自动化===============================
// 当前
import Current from '@/components/auto/auto_current/index'
// 历史
import History from '@/components/auto/auto_history/history'
// 丝锭管理
import silkPrint from '@/components/auto/auto_silk_manage/silk_print'
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
import PackageClass from '@/components/auto/auto_configuration/package_class'
import TemporaryBox from '@/components/auto/auto_configuration/temporary_box'

Vue.use(Vuex)
let addRouter = (state) => {
  console.log(state.userInfo.admin)
  let array = []
  if (state.userInfo.admin) {
    array = [
      {// 当前
        path: '/current/index',
        name: '当前',
        component: Current,
        class: 'el-icon-search',
        permissions: ''
      },
      {// 历史
        path: '/history',
        name: '历史',
        component: History,
        class: 'el-icon-search'
      },
      {// 管理员
        path: '/admin',
        component: mainLayout,
        name: '管理员',
        class: 'el-icon-setting',
        children: [
          {// 权限
            path: 'perminssions',
            name: '权限',
            component: Permissions,
            class: 'el-icon-location'
          }, {// 用户
            path: 'user',
            name: '用户',
            component: User,
            class: 'el-icon-location'
          }, {// 用户组
            path: 'userGroups',
            name: '用户组',
            component: UserGroups,
            class: 'el-icon-location'
          }
        ]
      },
      {// 自动化配置
        path: '/configuration',
        name: '自动化配置',
        component: mainLayout,
        class: 'el-icon-setting',
        children: [
          {// 等级管理
            path: 'Grade',
            name: '等级管理',
            component: Grade,
            class: 'el-icon-location'
          }, {// 线别控制
            path: 'LineControl',
            name: '线别管理',
            component: LineControl,
            class: 'el-icon-location'
          }, {// 机台管理
            path: 'Machine',
            name: '机台管理',
            component: Machine,
            class: 'el-icon-location'
          }, {// 产品管理
            path: 'Product',
            name: '产品管理',
            component: Product,
            class: 'el-icon-location',
            children: [
              {// 产品管理--配置
                path: 'configurat',
                name: '产品管理--配置',
                component: Configurat
              }
            ]
          }, {// 丝车管理
            path: 'SlikCar',
            name: '丝车管理',
            component: SlikCar,
            class: 'el-icon-location'
          }, {// 车间管理
            path: 'WorkshopManage',
            name: '车间管理',
            component: WorkshopManage,
            class: 'el-icon-location'
          }, {// 打包班次管理
            path: 'PackageClass',
            name: '打包班次管理',
            component: PackageClass,
            class: 'el-icon-location'
          }, {// 暂存箱管理
            path: 'TemporaryBox',
            name: '暂存箱管理',
            component: TemporaryBox,
            class: 'el-icon-location'
          }
        ]
      }
    ]
  } else {
    array = [
      {// 当前
        path: '/current/index',
        name: '当前',
        component: Current,
        class: 'el-icon-search',
        permissions: ''
      },
      {// 历史
        path: '/history',
        name: '历史',
        component: History,
        class: 'el-icon-search'
      },
      {// 丝锭打印
        path: '/silkManage',
        name: '丝锭管理',
        component: mainLayout,
        class: 'el-icon-setting',
        children: [
          {
            path: 'silkPrint',
            name: '丝锭打印',
            component: silkPrint,
            class: 'el-icon-location'
          }
        ]
      },
      {// 染判
        path: '/dye',
        name: '染判',
        component: mainLayout,
        class: 'el-icon-setting',
        children: [
          {// 待染判
            path: 'dyeing',
            name: '待染判',
            component: Dyeing,
            class: 'el-icon-location'
          },
          {// 已染判
            path: 'dyed',
            name: '已染判',
            component: Dyed,
            class: 'el-icon-location'
          }
        ]
      },
      {// 生产计划
        path: '/productPlan',
        name: '生产计划',
        component: mainLayout,
        class: 'el-icon-setting',
        children: [
          {// 批号管理
            path: 'Batch',
            name: '批号管理',
            component: Batch,
            class: 'el-icon-location'
          }, {// 通知单
            path: 'Notice',
            name: '通知单',
            component: Notice,
            class: 'el-icon-location',
            children: [
              {// 通知单--执行情况
                path: 'Notice-perform',
                name: '执行情况',
                component: NoticePerform
              }
            ]
          }, {// 车间生产计划
            path: 'WorkPlan',
            name: '车间生产计划',
            component: WorkPlan,
            class: 'el-icon-location'
          }
        ]
      }
    ]
  }
  state.routers = [...state.routers, ...array]
}
const store = new Vuex.Store({
  state: {
    // 仓储
    workShops: [],
    Lines: [],
    token: '',
    waremenu: [], // 仓储目录列表
    userId: '',
    isWareLogin: window.localStorage.token, // ware系统登陆
    dict: [], // 班次
    batchList: [], // 批次
    warehouseType: ['固定库', '临时库', '立体库', '车丝库'], // 仓库类型
    workshop: [], // 车间
    sapStorage: [], // sap库存点
    warehouseList: [], // 仓库列表
    silks: [],
    userInfo: {}, // 存储用户信息
    routers: [] // 存储用户角色对应的路由
  },
  getters: {
    batchList: state => state.batchList,
    workshop: state => state.workshop,
    warehouseList: state => state.warehouseList,
    sapStorage: state => state.sapStorage,
    userInfo: state => state.userInfo,
    routers: state => state.routers
  },
  mutations: {
    BatchList (state, batchList) {
      state.batchList = batchList
    },
    Workshop (state, workshop) {
      state.workshop = workshop
    },
    WarehouseList (state, warehouseList) {
      state.warehouseList = warehouseList
    },
    SapStorage (state, sapStorage) {
      state.sapStorage = sapStorage
    },
    UserInfo (state, userInfo) {
      state.userInfo = userInfo
      addRouter(state)
    },
    Routers (state) {
      // state.routers = routers
    }
  },
  actions: {
    getDict (store, key) {
      api.getDict({key: key}).then(res => {
        store.state.dict = res.data.data
      })
    },
    getBatchList ({commit}) {
      api.getBatchList().then(res => {
        commit('BatchList', {batchList: res.data.data})
      })
    },
    getSelectWorkshop ({commit}) {
      api.getSelectWorkshop().then(res => {
        commit('Workshop', {workshop: res.data.data})
      })
    },
    getselectSapStorage ({commit}) {
      api.getselectSapStorage().then(res => {
        commit('SapStorage', {sapStorage: res.data.data})
      })
    },
    getSelectWarehouseList ({commit}) {
      api.getSelectWarehouseList().then(res => {
        commit('WarehouseList', {warehouseList: res.data.data})
      })
    }
  }
})

export default store
