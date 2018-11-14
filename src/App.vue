<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
html,body,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a {
  text-decoration: none;
  color: aliceblue;
}
/* 控制表格样式 */
.el-submenu__title {
  height: 45px;
  line-height: 45px;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-table td, .el-table th {
  padding: 6px 0;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding: 0 45px;
  min-width: 200px;
}
.el-table th {
  background-color: #409EFF;
  color: #fff;
}
</style>
