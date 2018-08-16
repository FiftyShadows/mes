import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Help from '@/components/help'
// 管理员
import Permissions from '@/components/auto/auto_admin/admin_permissions'
import User from '@/components/auto/auto_admin/user'
import UserGroups from '@/components/auto/auto_admin/user_groups'
// 生产计划
import Batch from '@/components/auto/auto_production_plan/Batch_manage'
import Notice from '@/components/auto/auto_production_plan/notice'
import WorkPlan from '@/components/auto/auto_production_plan/workshop_product_plan'
// 自动化配置
import Grade from '@/components/auto/auto_configuration/grade_manage'
import LineControl from '@/components/auto/auto_configuration/line_control'
import Machine from '@/components/auto/auto_configuration/machine_manage'
import Product from '@/components/auto/auto_configuration/product_manage'
import SlikCar from '@/components/auto/auto_configuration/silkCar_manage'
import WorkshopManage from '@/components/auto/auto_configuration/workshop_manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
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
        }, {// 丝车管理
          path: '/configuration/SlikCar',
          name: 'SlikCar',
          component: SlikCar
        }, {// 车间管理
          path: '/configuration/WorkshopManage',
          name: 'WorkshopManage',
          component: WorkshopManage
        }
      ]
    },
    {// 帮助页面
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
})

// 路由从定向
// ...
