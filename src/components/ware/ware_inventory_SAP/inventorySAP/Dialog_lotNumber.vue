<template>
  <div class="detail">
    <el-dialog title="码单详情" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData" v-loading="loading" border height="400">
        <el-table-column property="lotNumber" label="码单号"></el-table-column>
        <el-table-column property="transDate" :formatter="dateFormat" label="扫码时间"></el-table-column>
        <el-table-column property="productTime" :formatter="dateFormat" label="生产时间"></el-table-column>
        <el-table-column property="transType" label="出入库类型" width="150"></el-table-column>
        <el-table-column property="transOperator" label="操作员" width="120"></el-table-column>
        <el-table-column property="netWeight" label="净重" width="120"></el-table-column>
      </el-table>
      <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment' // 处理时间
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      loading: false,
      lotNum: '',
      houseName: '',
      seachData: {

      },
      gridData: [],
      dialogTableVisible: false,
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
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
    changePage (value) {
      // this.pageNum = value.pageNum
      // this.pageSize = value.pageSize
      this.seachData.pageNum = value.pageNum
      this.seachData.pageSize = value.pageSize
      this.seachTableData(this.seachData)
    },
    show (row, value) {
      console.log(row, value)
      this.dialogTableVisible = true
      this.seachData.batchNo = row.sublotNumber
      this.seachData.houseName = row.houseName
      this.seachData.level = row.level
      this.seachData.class = value.classes
      this.seachData.storageCode = row.storageCode
      this.seachData.packageType = row.packageType
      this.seachData.yoke = row.yoke
      this.seachData.startDate = value.startDate
      this.seachData.endDate = value.endDate
      this.seachData.pageNum = this.pageNum
      this.seachData.pageSize = this.pageSize
      this.seachTableData(this.seachData)
    },
    seachTableData (value) {
      this.loading = true
      this.$api.selectStocktakingDetail(value).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.loading = false
          this.gridData = res.data.data.list
          this.total = res.data.data.total
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
