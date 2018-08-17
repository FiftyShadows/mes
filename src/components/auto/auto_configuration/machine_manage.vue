<!-- 机台管理 -->
<template>
  <div class="machine">
    <el-select v-model="name" clearable placeholder="请选择" style="float:left;">
      <el-option v-for="item in arrLineName" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-button type="primary" style="float:right;" @click="dialogVisibleAdd = true">批量新增</el-button>
    <el-button type="primary" @click="dialogVisibleSingleAdd = true" style="float: right; margin-right: 10px;">新增</el-button>

    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="线别">
      </el-table-column>
      <el-table-column prop="item" label="机台位号">
      </el-table-column>
      <el-table-column prop="spindleNum" label="锭数">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'machine',
  data () {
    return {
      name: '',
      arrLineName: [],
      tableData: [],
      dialogVisibleAdd: false,
      dialogVisibleSingleAdd: false
    }
  },
  created () {
    this.getSelected()
  },
  methods: {
    getSelected () { // 获取selet
      this.$api.getSelected().then(res => {
        // this.tableData = res.data
        // console.log(this.tableData.lines)
        // this.arrLineName = this.tableData.lines.map(line => {
        //   return line.name
        // })
        // this.arrLineName = Array.from(new Set(this.arrLineName))
        // console.log(this.arrLineName)
        this.arrLineName = res.data.lines
        console.log(this.arrLineName)
      })
    },
    getMachine () {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
