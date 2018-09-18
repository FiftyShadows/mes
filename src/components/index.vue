<template>
  <div class="main">
    <el-container>
      <el-header height="50px">
        <router-link to="/"><img class="logo" src="../assets/logo.png" alt="hengyi"></router-link>
        <!-- <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
          <i class="head_out el-icon-circle-close" @click="outLogin()"></i>
        </el-tooltip> -->
        <router-link to="/help">
          <i class="head_help el-icon-question"></i>
        </router-link>
      </el-header>
      <el-container>
        <el-menu class="el-menu-vertical-demo" router :default-active="$route.path" @open="handleOpen" @close="handleClose" :unique-opened="true" :collapse="isCollapse" style="overflow-y: auto;">
          <div class="radio" @click="radio()">
            <el-tooltip class="item" effect="dark" content="缩放" placement="right-start">
              <img class="radio_img" v-if="!isCollapse" src="../assets/radio2.png" alt="">
              <img class="radio_img radio_img_pickup" v-else src="../assets/radio2.png" alt="">
            </el-tooltip>
          </div>
          <el-menu-item index="1" disabled>
            <i class="el-icon-d-caret"></i>
            <span slot="title">自动化</span>
          </el-menu-item>
          <el-menu-item index="/current/index">
            <i class="el-icon-search"></i>
            <span slot="title">当前</span>
          </el-menu-item>
          <el-menu-item index="/history">
            <i class="el-icon-tickets"></i>
            <span slot="title">历史</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员 </span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/user"><i class="el-icon-location"></i>用户</el-menu-item>
              <el-menu-item index="/admin/userGroups"><i class="el-icon-location"></i>用户组</el-menu-item>
              <el-menu-item index="/admin/perminssions"><i class="el-icon-location"></i>权限</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">生产计划</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/productPlan/WorkPlan"><i class="el-icon-document"></i>车间生产计划</el-menu-item>
              <el-menu-item index="/productPlan/Notice"><i class="el-icon-document"></i>通知单</el-menu-item>
              <el-menu-item index="/productPlan/Batch"><i class="el-icon-document"></i>批号管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">染判</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dye/dyeing"><i class="el-icon-document"></i>待染判</el-menu-item>
              <el-menu-item index="/dye/dyed"><i class="el-icon-document"></i>已染判</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">自动化配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/configuration/WorkshopManage"><i class="el-icon-setting"></i>车间管理</el-menu-item>
              <el-menu-item index="/configuration/LineControl"><i class="el-icon-setting"></i>线别控制</el-menu-item>
              <el-menu-item index="/configuration/Machine"><i class="el-icon-setting"></i>机台管理</el-menu-item>
              <el-menu-item index="/configuration/Product"><i class="el-icon-setting"></i>产品管理</el-menu-item>
              <el-menu-item index="/configuration/SlikCar"><i class="el-icon-setting"></i>丝车管理</el-menu-item>
              <el-menu-item index="/configuration/Grade"><i class="el-icon-setting"></i>等级管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="6" disabled>
            <i class="el-icon-d-caret"></i>
            <span slot="title">仓储</span>
          </el-menu-item>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">包装计量</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/measurement/autoPackage"><i class="el-icon-setting"></i>自动打包唛头</el-menu-item>
              <el-menu-item index="/measurement/artificial"><i class="el-icon-setting"></i>人工唛头</el-menu-item>
              <el-menu-item index="/measurement/smallPackage"><i class="el-icon-setting"></i>小包装唛头</el-menu-item>
              <el-menu-item index="/measurement/BoxManagement"><i class="el-icon-setting"></i>暂存箱管理</el-menu-item>
              <el-menu-item index="/measurement/PackagingRecords"><i class="el-icon-setting"></i>包装记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">库位库存</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/storage/view"><i class="el-icon-setting"></i>库位视图</el-menu-item>
              <el-menu-item index="/storage/plan"><i class="el-icon-setting"></i>库位计划</el-menu-item>
              <el-menu-item index="/storage/detail"><i class="el-icon-setting"></i>库存明细</el-menu-item>
              <el-menu-item index="/storage/trace"><i class="el-icon-setting"></i>箱包追溯</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
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
          <el-submenu index="10">
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
          <el-submenu index="11">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">盘点SAP</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1"><i class="el-icon-setting"></i>盘点</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-container>
          <el-main>
            <!-- main路由出口 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
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
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
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

/* 路由出口 */
.child_router {
  color: #303133;
}

/* 公共样式 */
</style>
