<template>
  <div class="main">
    <el-container>
      <el-header height="50px"></el-header>
      <el-container>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened="true" :collapse="isCollapse" style="overflow-y: auto;">
          <div class="radio" @click="radio()">
            <img class="radio_img" src="../assets/radio2.png" alt="">
          </div>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">管理员 </span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><i class="el-icon-location"></i>用户</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-location"></i>用户组</el-menu-item>
              <el-menu-item index="3-3"><i class="el-icon-location"></i>权限</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">生产计划</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><i class="el-icon-document"></i>车间生产计划</el-menu-item>
              <el-menu-item index="4-2"><i class="el-icon-document"></i>通知单</el-menu-item>
              <el-menu-item index="4-3"><i class="el-icon-document"></i>批号管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">自动化配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><i class="el-icon-setting"></i>车间管理</el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-setting"></i>线别控制</el-menu-item>
              <el-menu-item index="1-3"><i class="el-icon-setting"></i>机台管理</el-menu-item>
              <el-menu-item index="1-4"><i class="el-icon-setting"></i>产品管理</el-menu-item>
              <el-menu-item index="1-5"><i class="el-icon-setting"></i>丝车管理</el-menu-item>
              <el-menu-item index="1-6"><i class="el-icon-setting"></i>等级管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">仓储配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">车间管理</el-menu-item>
              <el-menu-item index="2-2">线别控制</el-menu-item>
              <el-menu-item index="2-3">机台管理</el-menu-item>
              <el-menu-item index="2-4">产品管理</el-menu-item>
              <el-menu-item index="2-5">丝车管理</el-menu-item>
              <el-menu-item index="2-6">等级管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-container>
          <el-main>Main</el-main>
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
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style lang='scss' scoped>

/* 整体框架 */

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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-submenu {
  // width: 180px;
}
.el-submenu .el-menu-item {
  min-width: 160px;
}
</style>
