<template>
  <el-dialog title="货物转移" :visible.sync="dialogTableVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新调拨单号" prop="newDeliveryBill">
        <el-input v-model="ruleForm.newDeliveryBill" clearable placeholder="请输入新调拨单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      nowDate: {},
      ruleForm: {
        newDeliveryBill: ''
      },
      rules: {
        newDeliveryBill: [
          { required: true, message: '请输入新调拨单号', trigger: 'blur' }
        ]
      },
      userId: '',
      dialogTableVisible: false
    }
  },
  methods: {
    show (row, userId) {
      console.log(row)
      this.nowDate = row
      this.userId = userId
      this.dialogTableVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.transfer({
            oldDeliveryBill: this.nowDate.hyRequisition.requisitionId,
            newDeliveryBill: this.ruleForm.newDeliveryBill,
            userId: this.userId
          }).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                type: 'success',
                title: '成功',
                msg: res.data.msg
              })
              this.dialogTableVisible = false
              this.$emit('seachdata')
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
