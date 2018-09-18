<template>
  <div class="login">
    <div class="main_login">
      <img class="logo" src="./../assets/login_logo.png" alt="">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini" class="loginForm demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="输入用户名..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="输入密码..."></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="form.checkpass" placeholder="确认密码..."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登陆</el-button>
          <el-button type="warning" @click="exitLogin()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        checkpass: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        checkpass: { required: true, message: '请再次输入密码', trigger: 'blur' }
      }
    }
  },
  created () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.password === this.form.checkpass) {

          } else {
            this.$message.error('两次密码输入不同！')
          }
        } else {
          return false
        }
      })
    },
    exitLogin () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('./../assets/login_bg.jpg');
  background-repeat:no-repeat;
  background-size: cover;
  .main_login {
    position: absolute;
    left: 0;top: 0;right: 0;bottom: 0;
    margin: auto;
    width: 600px;
    height: 350px;
    background-color: #fff;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    color: #fff;
    .logo {
      width: 70px;
      position: absolute;
      left: 50%;
      top: 20px;
      transform: translateX(-50%);
    }
    .loginForm {
      width: 60%;
      margin: auto;
      margin-top: 120px;
    }
  }
}
</style>
