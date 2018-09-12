<template>
  <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="AllList">
      </el-pagination>
    </div>
</template>
<script>
export default {
  name: 'pagination',
  props: ['AllList'],
  data () {
    return {
      currentPage: 1,
      pageSize: 15
    }
  },
  computed: {
    // tableData: function () {
    //   return this.AllList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    // }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 20px;
  }
</style>
