<template>
  <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>
</template>
<script>
export default {
  name: 'pagination',
  props: ['total', 'pageNum', 'pageSize'],
  data () {
    return {
      currentPage: this.pageNum,
      size: this.pageSize,
      totalNum: this.total
    }
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      let data = {
        pageSize: this.size,
        pageNum: this.currentPage
      }
      // console.log(data)
      this.$emit('changePage', data)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      let data = {
        pageSize: this.size,
        pageNum: this.currentPage
      }
      // console.log(data)
      this.$emit('changePage', data)
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 20px;
  }
</style>
