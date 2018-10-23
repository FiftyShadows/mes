<template>
  <div class="main">
    <el-container>
      <el-header height="50px">
        <router-link to="/"><img class="logo" src="../assets/logo.png" alt="hengyi"></router-link>
        <!-- <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
          <i class="head_out el-icon-circle-close" @click="outLogin()"></i>
        </el-tooltip> -->
        <!-- <router-link to="/help">
          <i class="head_help el-icon-question"></i>
        </router-link> -->
        <!-- <router-link to="/ware/login">
          <el-button class="login" type="text" v-if="!$store.state.isWareLogin">未登录</el-button>
        </router-link> -->
        <!-- <el-button class="login" icon="el-icon-success" type="success" plain size="mini">已登陆</el-button> -->
        <el-dropdown class="login" @command="handleCommand" v-if="!$store.state.isWareLogin">
          <el-button type="primary">
            未登录
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login">登陆</el-dropdown-item>
            <el-dropdown-item command="registered">注册</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="others" @command="download">
          <el-button type="primary">
            文档介绍
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userBook">用户手册</el-dropdown-item>
            <el-dropdown-item command="flowChart">流程图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="login" v-if="$store.state.isWareLogin">
          <el-button type="primary">
            已登陆
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-menu class="el-menu-vertical-demo" router :default-active="$route.path" @open="handleOpen" @close="handleClose" :unique-opened="true" :collapse="isCollapse" style="overflow-y: auto;">
          <div class="radio" @click="radio()">
            <el-tooltip class="item" effect="dark" content="缩放" placement="right-start">
              <img class="radio_img" v-if="!isCollapse" src="../assets/radio2.png" alt="">
              <img class="radio_img radio_img_pickup" v-else src="../assets/radio2.png" alt="">
            </el-tooltip>
          </div>
          <!-- <el-menu-item index="1" disabled>
            <i class="el-icon-d-caret"></i>
            <span slot="title">自动化</span>
          </el-menu-item> -->
            <li v-for="(router, index) in routers" :key="index">
              <el-menu-item :index="router.path" v-if="index === 0 || index === 1">
              <i :class="router.class"></i>
              <span slot="title">{{router.name}}</span>
              </el-menu-item>
              <el-submenu :index="index.toString()" v-if="index != 0 && index != 1">
                <template slot="title">
                  <i :class="router.class"></i>
                  <span>{{router.name}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(child, index2) in router.children" :index="router.path + '/' + child.path" :key="index2">
                    <i :class="child.class"></i>
                    <span>{{child.name}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </li>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">包装计量</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/measurement/artificial"><i class="el-icon-setting"></i>包装唛头打印</el-menu-item>
              <el-menu-item index="/measurement/shortSilk"><i class="el-icon-setting"></i>短丝唛头</el-menu-item>
              <el-menu-item index="/measurement/smallPackage"><i class="el-icon-setting"></i>小包装唛头</el-menu-item>
              <el-menu-item index="/measurement/BoxManagement"><i class="el-icon-setting"></i>暂存箱管理</el-menu-item>
              <el-menu-item index="/measurement/PackagingRecords"><i class="el-icon-setting"></i>包装记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">库位库存</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/storage/warehouse"><i class="el-icon-setting"></i>仓库</el-menu-item>
              <el-menu-item index="/storage/edit"><i class="el-icon-setting"></i>库位维护</el-menu-item>
              <el-menu-item index="/storage/view"><i class="el-icon-setting"></i>库位视图</el-menu-item>
              <el-menu-item index="/storage/plan"><i class="el-icon-setting"></i>库位计划</el-menu-item>
              <el-menu-item index="/storage/detail"><i class="el-icon-setting"></i>库存明细</el-menu-item>
              <el-menu-item index="/storage/trace"><i class="el-icon-setting"></i>箱包追溯</el-menu-item>
              <el-menu-item index="/storage/SAPMessage"><i class="el-icon-setting"></i>SAP信息</el-menu-item>
              <el-menu-item index="/storage/FBreason"><i class="el-icon-setting"></i>翻包原因</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">仓储记录</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/record/PrepareInStorage"><i class="el-icon-setting"></i>待入库</el-menu-item>
              <el-menu-item index="/record/instorage"><i class="el-icon-setting"></i>入库记录</el-menu-item>
              <el-menu-item index="/record/OutStorage"><i class="el-icon-setting"></i>出库记录</el-menu-item>
              <el-menu-item index="/record/Returngoods"><i class="el-icon-setting"></i>退货记录</el-menu-item>
              <el-menu-item index="/record/OnceAgainPackage"><i class="el-icon-setting"></i>翻包记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="11">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">调拨处理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/record/SalesRequisition"><i class="el-icon-setting"></i>销售调拨单</el-menu-item>
              <el-menu-item index="/record/ReturngoodsRequisition"><i class="el-icon-setting"></i>退货调拨单</el-menu-item>
              <el-menu-item index="/record/SilkCarShipped"><i class="el-icon-setting"></i>丝车发运调拨单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="12">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">盘点SAP</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/inventory/InventorySAP"><i class="el-icon-setting"></i>盘点</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-container>
          <el-main>
            <!-- main路由出口 -->
              <router-view ></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <dialog-login ref="login"></dialog-login>
    <dialog-registered ref="registered"></dialog-registered>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './ware_login/login.vue'
import Registered from './ware_login/registered.vue'
export default {
  name: 'index',
  components: {
    'dialog-login': Login,
    'dialog-registered': Registered
  },
  computed: {
    ...mapGetters({
      routers: 'routers'
    })
  },
  created () {
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    radio () {
      this.isCollapse = !this.isCollapse
    },
    outLogin () {
      this.$confirm('是否确定退出登陆?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then().catch()
    },
    handleCommand (command) {
      if (command === 'login') {
        this.$refs.login.show()
      } else if (command === 'registered') {
        this.$refs.registered.show()
      }
    },
    download (command) {
      if (command === 'userBook') {
        window.open('static/introduction/自动化操作手册.html')
      }
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>

<style lang='scss' scoped>

.logo {
  position: absolute;
  top: 10px;
  left: 12px;
  z-index: 999;
}

/* 整体框架 */
.head_out {
  font-size: 22px;
  position: absolute;
  right: 55px;
  top: 14px;
  cursor: pointer;
}
.head_help {
  font-size: 22px;
  position: absolute;
  right: 15px;
  top: 14px;
  cursor: pointer;
}
.login {
   position: absolute;
   right: 130px;
   top: 4px;
   color: #fff;
 }
.others{
  position: absolute;
  right: 10px;
  top: 4px;
  color: #fff;
}
.main {
  width: 100%;
  height: 100%;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header, .el-footer {
  background-color: #3B9DD8;
  color: #eee;
  text-align: center;
}

.el-aside {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #eff2f7;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/* 导航栏 */

.radio {
  height: 40px;
  text-align: right;
}
.radio_img {
  width: 20px;
  margin-top: 10px;
  margin-right: 20px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}
.radio_img_pickup {
  transform: rotate(-90deg);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-submenu {
  // width: 180px;
  .el-menu-item {
    min-width: 160px;
  }
}
.el-menu-item, .el-submenu__title {
  height: 40px;
  line-height: 40px;
}
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}
/* 路由出口 */
.child_router {
  color: #303133;
}

/* 公共样式 */
</style>
