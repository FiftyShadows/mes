<template>
  <div>
    <el-form :model="seachForm" ref="seachForm" label-width="10px" class="demo-ruleForm">
      <el-form-item label="" prop="name" class="floatLeft">
        <el-input v-model="seachForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="loginname" class="floatLeft">
        <el-input v-model="seachForm.loginname" placeholder="请输入登录名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="type" class="floatLeft">
        <el-select v-model="seachForm.type" filterable placeholder="请输入类型">
          <el-option v-for="item in typeOptions" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addUser()" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" style="width: 100%" border height="500">
      <el-table-column prop="" label="编号" width="55">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="loginname" label="登录名">
      </el-table-column>
      <el-table-column prop="password" label="密码">
      </el-table-column>
      <el-table-column prop="roleId" label="角色">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="type" label="类型">
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" min-width="200">
      </el-table-column>
      <el-table-column prop="modifiedTime" :formatter="dateFormat" label="修改时间" min-width="200">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="saveUser(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DialogaddUser ref="DialogaddUser" @refreach="seachTableData"></DialogaddUser>
    <DialogsaveUser ref="DialogsaveUser" @refreach="seachTableData"></DialogsaveUser>
  </div>
</template>
<script>
import DialogaddUser from './newUser'
import DialogsaveUser from './savePermissions'
import moment from 'moment' // 处理时间
export default {
  name: 'warePermissions',
  components: {
    DialogaddUser,
    DialogsaveUser
  },
  data () {
    return {
      seachForm: {
        name: '',
        loginname: '',
        type: ''
      },
      loading: false,
      // formLabelWidth: '120px',
      typeOptions: [],
      tableData: []
    }
  },
  created () {
    this.$api.getDict({key: '类型'}).then(res => {
      console.log(res)
      this.typeOptions = res.data.data
    })
    this.seachTableData()
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    seachTableData () {
      this.loading = true
      this.$api.selectUser(this.seachForm).then(res => {
        console.log(res)
        this.loading = false
        if (res.data.status === '200') {
          this.tableData = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    addUser () {
      this.$refs.DialogaddUser.show()
    },
    saveUser (row) {
      this.$refs.DialogsaveUser.show(row)
    },
    deleteUser (row) {
      this.$confirm('此操作将删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteUser({
          id: row.id,
          userId: 1
        }).then(res => {
          if (res.data.status === '200') {
            this.$notify({
              type: 'success',
              title: '成功',
              message: res.data.msg
            })
            this.seachTableData()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg
            })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.floatLeft {
  float: left;
}
</style>
