<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <!-- <el-form-item label="登陆名" prop="loginname" :label-width="formLabelWidth">
        <el-input v-model="form.loginname" clearable style="width: 80%;"></el-input>
      </el-form-item> -->
      <el-form-item label="老密码" prop="oldPassword" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.oldPassword" clearable style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.newPassword" clearable style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="确定密码" prop="checkpass" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.checkpass" clearable style="width: 80%;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('form')">重置</el-button>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'savePass',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.newPassword !== '') {
          this.$refs.form.validateField('checkpass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        // loginname: '',
        oldPassword: '',
        newPassword: '',
        checkpass: '',
        userId: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        oldPassword: { required: true, message: '请输入密码', trigger: 'blur' },
        loginname: { required: true, message: '请输入用户名', trigger: 'blur' },
        newPassword: { validator: validatePass, trigger: 'blur' },
        checkpass: { validator: validatePass2, trigger: 'blur' }
      }
    }
  },
  created () {
    this.form.userId = window.localStorage.userId
  },
  methods: {
    show () {
      this.dialogFormVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.updatePassword(this.form).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.data.msg
              })
              this.dialogFormVisible = false
              this.$refs[formName].resetFields()
              // history.go()
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
