<template>
<div class="right">
  <el-card v-for="(item,index) in eventSources" v-if="item.productProcess" :key="index" class="box-card">
    <div slot="header" class="clearfix">
      <span style="float: left;">
        <span style="font-weight: bold; font-size: 17px; color: #409EFF;">{{item.operator.name}}</span>
        <span style="font-weight: bold;">{{item.operator.hrId}}</span>
        <br>
        <i>{{item.firstTime}}</i>
      </span>
      <el-button style="float: right;" type="warning" size="mini">{{item.productProcess.name}}</el-button>
    </div>
    <div class="silkRuntimes" v-if="item.silkRuntimes[0]">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭</el-tag>
      <el-button size="mini" class="btn silkbtn" v-for="runtimes in item.silkRuntimes" plain :key="runtimes.id">
        {{runtimes.sideType}}面 —— {{runtimes.row}} —— {{runtimes.col}}
      </el-button>
    </div>
    <div class="silkExceptions" v-if="item.silkExceptions">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭异常</el-tag>
      <el-button size="mini" class="btn" type="danger" v-for="exceptions in item.silkExceptions" plain round :key="exceptions.id">{{exceptions.name}}</el-button>
    </div>
    <div class="notes" style="margin-top: 10px;" v-if="item.silkNotes">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭备注</el-tag>
      <el-button size="mini" class="btn" type="info" v-for="notes in item.silkNotes" plain round :key="notes.id">{{notes.name}}</el-button>
    </div>
    <div class="silkform" style="margin-top: 10px;" v-if="item.formConfig">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">{{item.formConfig.name}}</el-tag>
      <div v-for="config in item.formConfig.formFieldConfigs" :key="config.id">
        <el-tag class="btn">{{config.name}}</el-tag>
        <el-tag v-if="config.value" class="btn">{{config.value}}</el-tag>
      </div>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  props: ['eventSources']
}
</script>
<style lang="scss" scoped>
.right {
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0;
  overflow-y: auto;
}
// 人员操作
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 100%;
  margin-bottom: 10px;
}
.btn {
  margin-top: 10px;
}
.silkbtn {
  display: block;
  margin-left: 10px;
}
.Form {
  float: left;
  margin-top: 10px;
}
</style>
