<template>
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
</template>
<script>
export default {
  data () {
    return {
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
    start (value) {
      this.submitForm.deliveryBill = value
      this.dialogFormVisible = true
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
              this.$emit('seachTableData')
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
