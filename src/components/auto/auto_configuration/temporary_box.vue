<!-- 暂存箱管理 -->
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'temporaryBox',
  data () {
    return {
      dialogVisible: false,
      tableData: []
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
