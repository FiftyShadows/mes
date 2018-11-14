<template>
  <!-- 拣配调拨单 -->
  <div class="sales_requisition">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px; margin-top: 10px; font-weight: bolder;">
      <el-breadcrumb-item>仓储</el-breadcrumb-item>
      <el-breadcrumb-item>调拨处理</el-breadcrumb-item>
      <el-breadcrumb-item>拣配调拨单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单获取 -->
    <el-form :inline="true" :rules="rules" ref="salesForm" :model="salesForm" label-width="10px" class="demo-form-inline demo-ruleForm form">
      <el-form-item label="" prop="requisitionId" class="iptfloat">
        <el-input v-model="salesForm.requisitionId" clearable placeholder="调拨单号"></el-input>
      </el-form-item>
      <el-form-item label="" class="iptfloat">
        <el-input v-model="salesForm.plateNumber" clearable placeholder="车牌号"></el-input>
      </el-form-item>
      <el-form-item class="iptfloat">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" tooltip-effect="dark" border @selection-change="handleSelectionChange" style="width: 100%" height="500" stripe>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="requisitionId" label="调拨单号" min-width="120">
      </el-table-column>
      <el-table-column prop="requisitionType" label="调拨单类型" min-width="120">
      </el-table-column>
      <el-table-column prop="customerId" label="客户编号" min-width="120">
      </el-table-column>
      <el-table-column prop="customerName" label="客户名称" min-width="200">
      </el-table-column>
      <el-table-column prop="outboundDate" :formatter="dateFormat" label="出库日期" min-width="150">
      </el-table-column>
      <el-table-column prop="plateNumber" label="车牌号" min-width="150">
      </el-table-column>
      <el-table-column prop="isInnersale" label="是否内销">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="loading_spot" label="装载点/接收点" min-width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="openDetil(scope.row)" size="small">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <DialogDetil ref="DialogDetil"></DialogDetil>
  </div>
</template>
<script>
import Pagination from '../../../common/pagination.vue'
import DialogDetil from './Dialog_detil'
import moment from 'moment' // 处理时间
export default {
  components: {
    Pagination,
    DialogDetil
  },
  name: 'sales_requisition',
  data () {
    return {
      sametimeForm: {
        factory: '',
        deliveryBill: '',
        date: '',
        loadingSpot: ''
      },
      salesForm: {
        plateNumber: '',
        requisitionId: '',
        customerName: '',
        batchNo: '',
        createTime: ''
      },
      tableData: [],
      batchNoOptions: [],
      loading: false,
      pageNum: 0,
      pageSize: 10,
      total: 0,
      rules: {}
    }
  },
  created () {
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    seachTableData () {
      if (this.salesForm.requisitionId === '' && this.salesForm.plateNumber === '') {
        this.$message.error('搜索条件必填其中一个，否则无法搜索！')
        return
      }
      this.loading = true
      this.$api.selectDelivery({
        requisitionId: this.salesForm.requisitionId,
        plateNumber: this.salesForm.plateNumber,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.loading = false
        if (res.data.status === '200') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    openDetil (row) {
      console.log(row)
      this.$refs.DialogDetil.show(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.iptfloat {
  float: left;
}
.form {
  margin-top: 20px;
}
</style>
