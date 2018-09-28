<template>
  <div>
    <el-form :model="seachForm" ref="seachForm" label-width="10px">
      <el-form-item label="" prop="Batch" style="float: left;width: 150px;">
        <el-select v-model="seachForm.batchNo" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="grade" style="float: left;width: 150px;">
        <el-input v-model="seachForm.material" placeholder="请输入物料"></el-input>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" height="500" stripe>
      <el-table-column prop="id" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="batchno" label="批号" width="120">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="80">
      </el-table-column>
      <el-table-column prop="material" label="物料" width="250">
      </el-table-column>
      <el-table-column prop="materialtext" label="描述" min-width="300">
      </el-table-column>
      <el-table-column prop="productName" label="产品名" width="100">
      </el-table-column>
      <el-table-column prop="spec" label="规格" width="150">
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">计量</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Pagination from './../../common/pagination.vue'
export default {
  components: {
    'pagination': Pagination
  },
  data () {
    return {
      seachForm: { // 搜索列表数据
        batchNo: '', // 批次
        material: '' // 物料
      },
      batchNoOptions: [], // 批号选择列表
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0 // 总数
    }
  },
  computed: {
    ...mapGetters(['batchList'])
  },
  created () {
    this.getBatchList()
    this.batchNoOptions = this.$store.state.batchList.batchList
  },
  mounted () {
  },
  methods: {
    ...mapActions(['getBatchList']),
    seachTableData () {
      this.$api.getMaterialList({
        batchNo: this.seachForm.batchNo,
        material: this.seachForm.material,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          if (res.data.data) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.tableData = []
            this.total = 0
            this.$message.error(res.data.msg)
          }
        }
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
