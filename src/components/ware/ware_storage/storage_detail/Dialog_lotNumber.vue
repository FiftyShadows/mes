<template>
  <el-dialog title="查看码单" :visible.sync="dialogTableVisible" width="80%">
    <el-table :data="gridData" v-loading="loading" stripe border>
      <el-table-column property="lotNumber" label="码单" min-width="200"></el-table-column>
      <el-table-column property="createTime" :formatter="dateFormat" label="生产日期" width="200"></el-table-column>
      <el-table-column property="inBoundTime" :formatter="dateFormat" label="入库日期" width="200"></el-table-column>
      <el-table-column property="transDate" :formatter="dateFormat" label="扫码时间" width="200"></el-table-column>
      <el-table-column property="inBoundUser" label="操作员"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
      <el-table-column property="lgort" label="sap库存点"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small">移库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
  </el-dialog>
</template>
<script>
import moment from 'moment' // 处理时间
import Pagination from '../../../common/pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      gridData: [],
      dialogTableVisible: false,
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
      loading: false,
      seachData: {}
    }
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.getData()
    },
    show (row) {
      row.pageNum = this.pageNum
      row.pageSize = this.pageSize
      this.loading = true
      this.seachData = row
      this.getData()
      this.dialogTableVisible = true
    },
    getData () {
      this.$api.selectInbouneDetail(this.seachData).then(res => {
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
