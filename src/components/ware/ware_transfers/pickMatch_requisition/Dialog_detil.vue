<template>
<div>
  <el-dialog title="调拨单明细" :visible.sync="dialogTableVisible" width="80%">
    <el-table :data="gridData">
      <el-table-column property="batchNo" label="批号"></el-table-column>
      <el-table-column property="special" label="规格"></el-table-column>
      <el-table-column property="level" label="等级"></el-table-column>
      <el-table-column property="material" label="物料号" width="150"></el-table-column>
      <el-table-column property="deliveryWeight" label="应扫"></el-table-column>
      <el-table-column property="actualWeight" label="实扫"></el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="start()">开始拣配</el-button>
      <el-button type="primary" v-if="pickFinish" @click="finish()">完成拣配</el-button>
    </div>
  </el-dialog>
  <el-dialog title="扫码拣配" :visible.sync="dialogFormVisible">
    <el-form :model="submitForm" :rules="rules" ref="form" class="demo-form-inline demo-ruleForm form">
      <!-- <el-form-item label="调拨单号" prop="requisitionId" :label-width="formLabelWidth">
        <el-input v-model="submitForm.requisitionId" autocomplete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="码单号" prop="lotNumber" :label-width="formLabelWidth">
        <el-input v-model="submitForm.lotNumber" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="pickMatch('form')">确定拣配</el-button>
    </div>
  </el-dialog>
  <DialogStart ref="DialogStart"></DialogStart>
</div>
</template>
<script>
import DialogStart from './Dialog_startPick'
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    Pagination,
    DialogStart
  },
  data () {
    return {
      gridData: [],
      dialogTableVisible: false,
      loading: false,
      pageNum: 0,
      pageSize: 10,
      total: 0,
      requisitionId: '',
      pickFinish: false,
      submitForm: {
        deliveryBill: '',
        lotNumber: '',
        userId: 1
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      rules: {
        deliveryBill: { required: true, message: '请输入调拨单号', trigger: 'blur' },
        lotNumber: { required: true, message: '请输入码单号', trigger: 'blur' }
      }
    }
  },
  methods: {
    show (row) {
      this.pickFinish = false
      this.requisitionId = row.requisitionId
      this.seachTableData(this.requisitionId)
      this.dialogTableVisible = true
    },
    start () {
      this.submitForm.deliveryBill = this.requisitionId
      this.dialogFormVisible = true
    },
    finish () {
      this.$api.pickFinish({
        deliveryBill: this.requisitionId,
        type: 'PICKUP'
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.$notify({
            type: 'success',
            title: '成功',
            message: res.data.msg
          })
          this.dialogTableVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    seachTableData (value) {
      this.$api.selectDeliveryDetail({
        requisitionId: value,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.gridData = res.data.data.list
          this.total = res.data.data.total
          for (let i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].deliveryWeight === this.gridData[i].actualWeight) {
              this.pickFinish = true
            }
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    pickMatch (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addOutbound(this.submitForm).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.data.msg
              })
              this.seachTableData(this.requisitionId)
              this.dialogFormVisible = false
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
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData(this.requisitionId)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
