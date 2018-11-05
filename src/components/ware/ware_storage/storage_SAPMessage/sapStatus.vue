<template>
  <div>
    <el-form :model="seachForm" :rules='rules' ref="seachForm" label-width="10px">
      <!-- <el-form-item label="" prop="Batch" style="float: left;width: 150px;">
        <el-select v-model="seachForm.batchNo" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="" prop="deliveryBill" style="float: left;">
        <el-input v-model="seachForm.deliveryBill" clearable placeholder="请输入交货编码"></el-input>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" height="500">
      <!-- <el-table-column prop="id" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="SAP">
        <el-table-column prop="lprio" label="调拨">
        </el-table-column>
        <el-table-column prop="pickup" label="拣配">
        </el-table-column>
        <el-table-column prop="post" label="过账">
        </el-table-column>
        <el-table-column prop="invoice" label="开票">
        </el-table-column>
      </el-table-column>
      <el-table-column label="系统">
        <el-table-column prop="currentStatus" label="当前状态">
        </el-table-column>
        <el-table-column prop="vtwegList" label="分销渠道">
        </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">计量</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination> -->
  </div>
</template>
<script>
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    'pagination': Pagination
  },
  data () {
    return {
      seachForm: { // 搜索列表数据
        deliveryBill: '' // 交货编码
      },
      loading: false,
      tableData: [], // 列表数据
      // pageNum: 1, // 当前页数
      // pageSize: 10, // 默认每页显示条数
      // total: 0, // 总数
      rules: {
        deliveryBill: {required: true, message: '请输入物料号', trigger: 'blur'}
      }
    }
  },
  created () {
    this.$api.getBatchList().then(res => {
      this.batchNoOptions = res.data.data
    })
  },
  mounted () {
  },
  methods: {
    seachTableData (formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.selectSapAllocationStatus({
            deliveryBill: this.seachForm.deliveryBill
          }).then(res => {
            console.log(res)
            this.loading = false
            if (res.data.status === '200') {
              if (res.data.data) {
                this.tableData = res.data.data.list
                console.log(this.tableData)
                // this.total = res.data.data.total
              } else {
                this.tableData = []
                // this.total = 0
                this.$message.error(res.data.msg)
              }
            } else {
              this.tableData = []
              // this.total = 0
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false
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
