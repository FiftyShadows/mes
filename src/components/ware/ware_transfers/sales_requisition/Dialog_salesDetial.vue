<template>
  <el-dialog title="调拨单明细" :visible.sync="dialogTableVisible" width="80%" @closed="gridData = []">
    <el-table :data="gridData" tooltip-effect="dark" border>
      <el-table-column property="productName" label="成品名称"></el-table-column>
      <el-table-column property="productType" label="成品类型"></el-table-column>
      <el-table-column property="batchNo" label="批号" width="120"></el-table-column>
      <el-table-column property="special" label="规格" width="120"></el-table-column>
      <el-table-column property="level" label="等级"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
      <el-table-column property="count" label="数量"></el-table-column>
      <el-table-column property="salesMan" label="销售员"></el-table-column>
      <el-table-column property="lgort" label="仓储点"></el-table-column>
      <el-table-column property="material" label="物料号" min-width="180"></el-table-column>
      <el-table-column property="createTime" :formatter="dateFormat" label="同步时间" min-width="200"></el-table-column>
      <el-table-column property="modifiedTime" label="修改时间"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import moment from 'moment' // 处理时间
export default {
  props: [],
  data () {
    return {
      gridData: [],
      dialogTableVisible: false
    }
  },
  methods: {
    show (row) {
      console.log(row)
      this.gridData.push(row)
      this.dialogTableVisible = true
    },
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
