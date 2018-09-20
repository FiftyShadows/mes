<template>
  <div class="registered">
    <el-dialog title="注  册" :visible.sync="dialogRegisteredFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm demo-form-inline">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass" :label-width="formLabelWidth">
          <el-input v-model="form.checkpass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegisteredFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'registered',
  data () {
    return {
      dialogRegisteredFormVisible: false,
      formLabelWidth: '100px',
      form: {
        username: '',
        password: '',
        checkpass: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        checkpass: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  created () {},
  methods: {
    show () {
      this.dialogRegisteredFormVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('成功')
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
