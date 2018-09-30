<template>
  <div class="detail">
    <el-dialog title="盘点明细" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" v-loading="loading" height="400">
        <el-table-column property="lotNumber" label="码单号"></el-table-column>
        <el-table-column property="createTime" :formatter="dateFormat" label="扫码时间"></el-table-column>
        <el-table-column property="username" label="入库人"></el-table-column>
      </el-table>
      <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment' // 处理时间
import Pagination from './../../common/pagination.vue'
export default {
  components: {
    Pagination
  },
  props: ['stocktakingRecordId'],
  data () {
    return {
      loading: false,
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
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    show (id) {
      this.dialogTableVisible = true
      this.loading = true
      console.log(id)
      this.$api.getStocktakingDetail({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        stocktakingRecordId: id,
        lotNumber: this.lotNumber
      }).then(res => {
        console.log(res)
        this.loading = false
        if (res.data.status === '200') {
          this.gridData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$notify.error({
            title: '失败',
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
