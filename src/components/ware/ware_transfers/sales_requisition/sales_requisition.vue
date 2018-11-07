<template>
  <!-- 销售调拨单 -->
  <div class="sales_requisition">
    <!-- 同步调拨单 -->
    <el-card class="box-card">
      <el-form :inline="true" :rules="rules" ref="sametimeForm" :model="sametimeForm" label-width="10px" class="demo-form-inline demo-ruleForm" style="float: left;">
        <el-form-item label="" prop="factory">
          <el-input v-model="sametimeForm.factory" clearable placeholder="工厂编号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="sametimeForm.deliveryBill" clearable placeholder="调拨单号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker v-model="sametimeForm.date" clearable type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="sametimeForm.loadingSpot" clearable placeholder="装运点/接收点"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="sameTime('sametimeForm')">同步调拨单</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表单获取 -->
    <el-form :inline="true" :rules="rules" ref="salesForm" :model="salesForm" label-width="10px" class="demo-form-inline demo-ruleForm form">
      <el-form-item label="" class="iptfloat">
        <el-input v-model="salesForm.plateNumber" clearable placeholder="车牌号"></el-input>
      </el-form-item>
      <el-form-item label="" class="iptfloat">
        <el-input v-model="salesForm.requisitionId" clearable placeholder="调拨单号"></el-input>
      </el-form-item>
      <el-form-item label="" class="iptfloat">
        <el-input v-model="salesForm.customerName" clearable placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item label="" prop="Batch" class="iptfloat">
        <el-select v-model="salesForm.batchNo" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" class="iptfloat">
        <el-date-picker v-model="salesForm.createTime" clearable type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="同步日期"></el-date-picker>
      </el-form-item>
      <el-form-item class="iptfloat">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" tooltip-effect="dark" border @selection-change="handleSelectionChange" style="width: 100%" height="500" stripe>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="hyRequisition.requisitionId" label="调拨单号" min-width="120">
      </el-table-column>
      <el-table-column prop="hyRequisition.requisitionType" label="调拨单类型" min-width="120">
      </el-table-column>
      <el-table-column prop="hyRequisition.customerId" label="客户编号" min-width="120">
      </el-table-column>
      <el-table-column prop="hyRequisition.customerName" label="客户名称" min-width="200">
      </el-table-column>
      <el-table-column prop="hyRequisition.outboundDate" :formatter="dateFormat" label="出库日期" min-width="150">
      </el-table-column>
      <el-table-column prop="hyRequisition.plateNumber" label="车牌号" min-width="150">
      </el-table-column>
      <el-table-column prop="hyRequisition.isInnersale" label="是否内销">
      </el-table-column>
      <el-table-column prop="hyRequisition.status" label="状态">
      </el-table-column>
      <el-table-column prop="hyRequisition.loading_spot" label="装载点/接收点" min-width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.hyRequisition.status === '已过账'" @click="cancelPosting(scope.row)" size="small">取消过账</el-button>
          <el-button type="text" v-if="scope.row.hyRequisition.status === '已拣配'" @click="posting(scope.row)" size="small">过账</el-button>
          <el-button type="text" v-if="scope.row.hyRequisition.status === '已调拨'" @click="openDetil(scope.row)" size="small">调拨单明细</el-button>
          <el-button type="text" v-if="scope.row.hyRequisition.status === '未处理'" @click="openDetil(scope.row)" size="small">出货安排</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DialogDetials ref="showDetail"></DialogDetials>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
  </div>
</template>
<script>
import Pagination from '../../../common/pagination.vue'
import DialogDetials from './Dialog_salesDetial'
import moment from 'moment' // 处理时间
export default {
  components: {
    Pagination,
    DialogDetials
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
      rules: {
        factory: {required: true, message: '必输项', trigger: 'blur'}
        // date: {required: true, message: '必输项', trigger: 'change'},
        // requisitionId: {required: true, message: '必输项', trigger: 'blur'},
        // customerName: {required: true, message: '必输项', trigger: 'blur'},
        // batchNo: {required: true, message: '必输项', trigger: 'change'},
        // createTime: {required: true, message: '必输项', trigger: 'change'}
      }
    }
  },
  created () {
    this.getSelectBatchNoList()
  },
  methods: {
    dateFormat (row, column) {
      var date = row.hyRequisition.outboundDate
      if (date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    sameTime (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.saynAllocationBySap(this.sametimeForm).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.data.msg
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    seachTableData () {
      this.loading = true
      this.$api.selectAllocation(this.salesForm).then(res => {
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
    getSelectBatchNoList () {
      this.$api.selectBatchNoList().then(res => {
        if (res.data.status === '200') {
          console.log(res)
          this.batchNoOptions = res.data.data
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
      this.$refs.showDetail.show(row)
    },
    posting (row) {
      console.log(row)
      this.$confirm('此操作将过账, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deliveryOrderPost({
          id: row.hyRequisition.id,
          type: 'POST' // 过账
        }).then(res => {
          console.log(res)
          if (res.data.status === '200') {
            this.$notify({
              type: 'success',
              title: '成功',
              msg: res.data.msg
            })
            this.seachTableData()
          }
        })
      }).catch(_ => {})
    },
    cancelPosting (row) {
      console.log(row)
      this.$confirm('此操作将取消过账, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deliveryOrderPost({
          id: row.hyRequisition.id,
          type: 'CANCELPOST' // 取消过账
        }).then(res => {
          console.log(res)
          if (res.data.status === '200') {
            this.$notify({
              type: 'success',
              title: '成功',
              msg: res.data.msg
            })
            this.seachTableData()
          }
        })
      }).catch(_ => {})
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
