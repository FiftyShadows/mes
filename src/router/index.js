import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Help from '@/components/help'
// 当前
import Current from '@/components/auto/auto-current/index'
// 历史
import History from '@/components/auto/aut_history/history'
// 染判
import Dyed from '@/components/auto/aut_dye/dyed'
import Dyeing from '@/components/auto/aut_dye/dyeing'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
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
