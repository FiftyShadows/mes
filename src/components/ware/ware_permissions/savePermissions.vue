<template>
  <!-- 新增用户 -->
  <div class="save">
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="40%">
      <el-form :model="registeredForm" :rules="rules" ref="registeredForm" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="登陆名" prop="loginname">
          <el-input v-model="registeredForm.loginname" class="input" clearable placeholder="请输入用户名" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registeredForm.pass" class="input" clearable placeholder="请输入密码" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registeredForm.name" class="input" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="registeredForm.roleId" filterable clearable placeholder="请选择角色" class="input">
            <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次" prop="class">
          <el-select v-model="registeredForm.class" filterable clearable placeholder="请选择班次" class="input">
            <el-option v-for="item in classOptions" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="registeredForm.status" filterable clearable placeholder="请选择状态" class="input">
            <el-option v-for="item in statusOptions" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="registeredForm.type" filterable clearable placeholder="请选择类型" class="input">
            <el-option v-for="item in typeOptions" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="registeredForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('registeredForm')">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registeredForm.pass !== '') {
          this.$refs.registeredForm.validateField('checkpass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registeredForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '100px',
      registeredForm: {
        name: '',
        loginname: '',
        pass: '',
        checkpass: '',
        roleId: '',
        class: '',
        status: '',
        type: '',
        remark: '',
        userId: ''
      },
      dialogVisible: false,
      roleOptions: [],
      classOptions: [],
      statusOptions: [],
      typeOptions: [],
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        loginname: { required: true, message: '请输入用户名', trigger: 'blur' },
        pass: { validator: validatePass, trigger: 'blur' },
        checkpass: { validator: validatePass2, trigger: 'blur' },
        roleId: { required: true, message: '请输入角色', trigger: 'change' }
        // class: { required: true, message: '请输入班次', trigger: 'change' },
        // status: { required: true, message: '请输入状态', trigger: 'change' },
        // type: { required: true, message: '请输入类型', trigger: 'change' },
      }
    }
  },
  created () {
    this.$api.getDict({key: '班次'}).then(res => {
      console.log(res)
      this.classOptions = res.data.data
    })
    this.$api.getDict({key: '状态'}).then(res => {
      console.log(res)
      this.statusOptions = res.data.data
    })
    this.$api.getDict({key: '类型'}).then(res => {
      console.log(res)
      this.typeOptions = res.data.data
    })
    this.$api.getSelectRole().then(res => {
      console.log(res)
      this.roleOptions = res.data.data
    })
    this.registeredForm.userId = window.localStorage.userId
  },
  methods: {
    show (row) {
      console.log(row)
      this.registeredForm.name = row.name
      this.registeredForm.roleId = row.roleId
      this.registeredForm.class = row.classes
      this.registeredForm.status = row.status
      this.registeredForm.type = row.type
      this.registeredForm.remark = row.remark
      console.log(this.registeredForm)
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.registeredForm)
          this.$api.updateUser(this.registeredForm).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.data.msg
              })
              this.dialogVisible = false
              // this.$refs[formName].resetFields()
              this.$emit('refreach')
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
.input {
  width: 200px;
  float: left;
}
</style>
