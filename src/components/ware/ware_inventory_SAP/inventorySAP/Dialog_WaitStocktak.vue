<template>
  <div class="detail">
    <el-dialog title="漏扫码单详情" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData" v-loading="loading" border height="400">
        <el-table-column property="lotNumber" label="码单号"></el-table-column>
        <el-table-column property="transDate" :formatter="dateFormat" label="扫码时间"></el-table-column>
        <el-table-column property="productTime" :formatter="dateFormat" label="生产时间"></el-table-column>
        <el-table-column property="transType" label="出入库类型" width="150"></el-table-column>
        <el-table-column property="transOperator" label="操作员" width="120"></el-table-column>
        <el-table-column property="netWeight" label="净重" width="120"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment' // 处理时间
export default {
  data () {
    return {
      loading: false,
      lotNum: '',
      houseName: '',
      gridData: [],
      dialogTableVisible: false,
      lotNumber: '' // 可选,模糊查询条件:箱包码单号
    }
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    show (lotNum, houseName) {
      this.dialogTableVisible = true
      this.lotNum = lotNum
      this.houseName = houseName
      this.seachTableData()
      // console.log(lotNum, houseName)
    },
    seachTableData () {
      this.loading = true
      this.$api.selectAutoStocktakingDetail({
        sublotNumber: this.lotNum,
        houseName: this.houseName
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.loading = false
          this.gridData = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
