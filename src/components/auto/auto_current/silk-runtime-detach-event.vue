<template>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
    </el-card>
</template>

<script>
export default {
  name: 'SilkRuntimeDetachEvent',
  props: ['row', 'col', 'batchOptions', 'sideType', 'checkAll'],
  data () {
    return {
      checked: false
    }
  },
  watch: {
    checkAll (data) {
      if (data) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },
  methods: {
  }
}
</script>
<style>
  .silk {
    width:84px;
    height:80px;
    border:1px solid #dcdfe6;
    font-size: 1px;
    margin-top: -6px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .el-checkbox.is-bordered.el-checkbox--small {
    background: white;
    width: auto;
  }
  .el-checkbox.is-bordered {
    height: 30px;
    width: 86px;
    background-color: white;
    margin-left: 10px;
  }
</style>
