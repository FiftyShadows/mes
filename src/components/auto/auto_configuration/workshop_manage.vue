<!-- 车间管理 -->
<template>
  <div>
    <el-button class="createLine" type="primary">新增</el-button>
    <el-table :data="tableData" border :stripe="true" style="width: 100%">
      <el-table-column fixed prop="corporation.name" label="公司">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'workshops',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.WorkShopLine()
  },
  methods: {
    WorkShopLine () { // 获取数据
      this.$api.getWorkShopsLine().then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.createLine {
  position: absolute;
  top: 70px;
  right: 20px;
}
.el-table {
  margin-top: 50px;
}
</style>
