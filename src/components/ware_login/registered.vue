<template>
    <!-- 注册 -->
    <div class="registered">
      <div class="main">
        <img class="loginLogo" src="../../assets/logo1.png" alt="恒逸石化">
        <el-form :model="registeredForm" status-icon :rules="rules" ref="registeredForm" label-width="100px" class="demo-ruleForm form">
          <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
            <el-input v-model="registeredForm.username" class="input" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
            <el-input type="password" v-model="registeredForm.pass" class="input" clearable placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass" :label-width="formLabelWidth">
            <el-input type="password" v-model="registeredForm.checkpass" class="input" clearable placeholder="请再次确认密码"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="checkpass" :label-width="formLabelWidth">
            <el-select v-model="registeredForm.roleName" filterable clearable placeholder="请选择角色">
              <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.roleName" class="input"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button>返 回</el-button>
          <el-button type="primary" @click="registered('registeredForm')">完 成</el-button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'registered',
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
        username: '',
        pass: '',
        checkpass: '',
        roleName: ''
      },
      roleOptions: [],
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        pass: { validator: validatePass, trigger: 'blur' },
        checkpass: { validator: validatePass2, trigger: 'blur' },
        roleName: { required: true, message: '请输入角色', trigger: 'change' }
      }
    }
  },
  created () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.registered {
  width: 100%;
  height: 100%;
  background: rgb(32, 135, 196);
  position: relative;
  background-image: url('../../assets/banner.png');
  // background-position-y: 50px;
  background-size: 120% 100%;
  .main {
    width: 40%;
    height: 600px;
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    margin: auto;
    background: rgba(252, 252, 252, .7);
    border-radius: 20px;
  }
  .loginLogo {
    position: absolute;
    width: 150px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .form {
    // border: 1px solid black;
    width: 80%;
    height: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 80px;
    .input {
      width: 80%;
    }
  }
  .footer {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
