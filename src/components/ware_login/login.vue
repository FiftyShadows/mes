<template>
  <div class="login">
    <!-- 登录 -->
    <div class="main">
      <img class="loginLogo" src="../../assets/logo1.png" alt="恒逸石化">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" class="input" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="loginForm.password" clearable class="input" placeholder="请输入密码" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <!-- <el-button @click="registered()">注 册</el-button> -->
        <el-button type="primary" style="width: 100px;border-radius: 30px;" @click="submitForm('loginForm')">登 陆</el-button>
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
      loginForm: {
        username: '',
        password: ''
      },
      waremenu: [], // 返回的仓储菜单
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
            loginname: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$api.axios.defaults.headers.common['Authorization'] = window.sessionStorage.token = 'Bearer ' + res.data.token
              this.$notify.success({
                title: '欢迎',
                message: '已登录'
              })
              window.sessionStorage.loginname = this.loginForm.username
              this.$store.state.isWareLogin = true
              // 处理返回菜单
              this.waremenu = res.data.data.menu
              let index = [] // 主目录
              for (let i = 0; i < this.waremenu.length; i++) { // 获取所有主目录
                if (this.waremenu[i].remark === '主') {
                  this.waremenu[i].children = [] // 存储子菜单
                  index.push(this.waremenu[i])
                }
              }
              for (let i = 0; i < this.waremenu.length; i++) {
                for (let j = 0; j < index.length; j++) { // 获取所有子目录
                  if (Number(this.waremenu[i].remark) === index[j].id) {
                    index[j].children.push(this.waremenu[i])
                  }
                }
              }
              console.log(index)
              window.sessionStorage.wareRouters = JSON.stringify(index)

              window.sessionStorage.userId = res.data.data.userId
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
    },
    registered () {
      this.$router.replace('/registered')
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background: rgb(32, 135, 196);
  position: relative;
  background-image: url('../../assets/login_bg.jpg');
  // background-position-y: 50px;
  // background-size: 120% 100%;
  background-size: cover;
  .main {
    width: 500px;
    height: 300px;
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    margin: auto;
    // margin-left: 12%;
    background: rgba(252, 252, 252, .7);
    border-radius: 20px;
    // border: 1px solid black;
  }
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
</style>
