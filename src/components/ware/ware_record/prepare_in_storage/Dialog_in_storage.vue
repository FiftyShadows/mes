<template>
  <div class="inStorage">
    <el-dialog title="入库" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="库位:" prop="pre_storage" :label-width="formLabelWidth">
          <el-input v-model="form.pre_storage" clearable class="input"></el-input>
        </el-form-item>
        <el-form-item label="码单号(1):" prop="lot_number1" :label-width="formLabelWidth">
          <el-input v-model="form.lot_number1" clearable class="input"></el-input>
        </el-form-item>
        <el-form-item label="码单号(2):" prop="lot_number2" :label-width="formLabelWidth">
          <el-input v-model="form.lot_number2" clearable class="input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInbound('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'inStorage',
  props: [],
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        pre_storage: '',
        lot_number1: '',
        lot_number2: '',
        userId: 1
      },
      rules: {
        pre_storage: {required: true, message: '必输项', trigger: 'blur'},
        lot_number1: {required: true, message: '必输项', trigger: 'blur'}
        // lot_number2: {required: true, message: '必输项', trigger: 'blur'}
      }
    }
  },
  methods: {
    show () {
      this.dialogFormVisible = true
    },
    addInbound (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.$api.addInbound(this.form).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                title: '成功',
                type: 'success',
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
.input {
  float: left;
  width: 80%;
}
</style>
