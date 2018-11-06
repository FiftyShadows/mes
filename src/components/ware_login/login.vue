<template>
  <div class="login">
    <div class="main">
      <img class="loginLogo" src="../../assets/logo1.png" alt="恒逸石化">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" class="input" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" class="input" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button>注 册</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      formLabelWidth: '100px',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  created () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.wareLogin({
            loginname: this.form.username,
            password: this.form.password
          }).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$api.axios.defaults.headers.common['Authorization'] = window.localStorage.token = 'Bearer ' + res.data.token
              this.$notify.success({
                title: '欢迎',
                message: '已登录'
              })
              this.$store.state.isWareLogin = true
              this.$store.state.userId = res.data.data.userId
              this.$router.replace('/') // 跳home页
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
.login{
  width: 100%;
  height: 100%;
  // background: white;
  position: relative;
  background-image: url('../../assets/login_bg.jpg');
  background-size: cover;
  .main {
    width: 500px;
    height: 300px;
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    margin: auto;
    background: rgba(252, 252, 252, .9);
    border-radius: 20px;
    // border: 1px solid black;
    .loginLogo {
      position: absolute;
      width: 150px;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    .form {
      width: 500px;
      height: 200px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
      .input {
        width: 300px;
      }
      .el-form-item__label {
        color: white;
      }
    }
    .footer {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
