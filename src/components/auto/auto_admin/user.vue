<!-- 用户 -->
<template>
  <div class="users">
    <div style="float: left; margin-bottom: 10px;">
      <el-input v-model.trim="seacrhUsers" placeholder="请输入内容..." style="width: 200px;"></el-input>
      <el-button type="primary" icon="el-icon-search" circle @click="seach()" ></el-button>
    </div>
    <el-button type="primary" @click="opendialog()" style="float: right; margin-bottom: 10px;">新 增</el-button>
    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="name" label="名称">
      </el-table-column>
      <el-table-column fixed prop="hrId" label="hrId">
      </el-table-column>
      <el-table-column fixed prop="oaId" label="oaId">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="openSavegroups(scope.row)" type="text" size="small">权 限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogSeach">
      <el-input v-model.trim="seacrhAll" @input="seachAllUsers()" placeholder="请输入..." style="width: 60%;"></el-input>
      <el-table ref="singleTable" :data="tableData2" highlight-current-row @current-change="handleChange" style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="name" label="名字">
        </el-table-column>
        <el-table-column property="hrId" label="hrId">
        </el-table-column>
        <el-table-column property="oaId" label="oaId">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="addUser()">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="`${form.name}——权限设置`" :visible.sync="dialogSetAdmin">
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width: 200px;float: left;" required></el-input>
        </el-form-item>
        <el-form-item label="isAdmin" prop="admin" :label-width="formLabelWidth">
          <el-checkbox v-model="form.admin" style="float: left;" border required>admin</el-checkbox>
        </el-form-item>
      </el-form>
      <div style="width: 80%; margin: auto;">
        <hr>
        <el-button type="info" style="margin-left: 20px;" disabled>用户组</el-button>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedOperators" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in operatorOptions" :label="item" :key="item" border>{{item}}</el-checkbox>
        </el-checkbox-group>
        <hr>
        <el-button type="info" style="margin-left: 20px;" disabled>roles</el-button>
        <!-- <el-checkbox :indeterminate="isIndeterminate1" v-model="workersCheckAll" @change="workersCheckAllChange">全选</el-checkbox> -->
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedWorkers" @change="handleCheckedWorkersChange">
          <el-checkbox v-for="item in workersOptions" :label="item.value" :key="item.value" border>{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <hr>
        <el-button type="info" style="margin-left: 20px;" disabled>添加权限</el-button>
        <el-checkbox :indeterminate="isIndeterminate2" v-model="permissionsCheckAll" @change="permissionsCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedPermissions" @change="handleCheckedPermissionsChange">
          <el-checkbox v-for="item in permissions" :label="item" :key="item" border>{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" style="margin-top: 20px">
        <el-button type="primary" @click="setAdmin()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      loading: false,
      seacrhUsers: '',
      tableData: [],
      tableData2: [],
      totalData: {},
      pageSize: '20',
      first: '0',
      total: 0,
      currentPage2: 5,
      dialogSeach: false,
      seacrhAll: '',
      multipleSelection: {},
      form: {},
      formLabelWidth: '120px',
      dialogSetAdmin: false,
      rules: {
        name: { required: true, message: '必输项...', trigger: 'blur' }
      },
      // Operators
      checkAll: false,
      checkedOperators: [],
      operatorOptions: [],
      isIndeterminate: true,
      adminOptions: [],
      usergroups: {},
      // workers
      workersOptions: [
        {name: '落丝', value: 'DOFFING'},
        {name: '待染判', value: 'SUBMIT_DYEING_PREPARE'},
        {name: '染判', value: 'SUBMIT_DYEING_RESULT'},
        {name: '等级确认', value: 'SUBMIT_GRADE'},
        {name: '标样丝', value: 'SUBMIT_DYEING_SAMPLE'}
      ],
      workersCheckAll: false,
      checkedWorkers: [],
      isIndeterminate1: true,
      // permissions
      adminPermissions: {},
      permissions: [],
      permissionsCheckAll: false,
      isIndeterminate2: true,
      checkedPermissions: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.loading = true
      this.$api.getUser({
        pageSize: '',
        first: '',
        q: ''
      }).then(res => {
        this.total = res.data.operators.length
      })
      this.$api.getUser({
        pageSize: this.pageSize,
        first: this.first,
        q: ''
      }).then(res => {
        console.log(res)
        this.totalData = res.data
        this.tableData = res.data.operators
        this.loading = false
      })
    },
    seach () {
      this.loading = true
      this.$api.getUser({
        pageSize: this.pageSize,
        first: this.first,
        q: this.seacrhUsers
      }).then(res => {
        this.totalData = res.data
        this.tableData = res.data.operators
        this.loading = false
      })
    },
    addUser () {
      this.$api.addUser(this.multipleSelection).then(res => {
        console.log(res)
        this.dialogSeach = false
        this.getUsers()
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
      })
    },
    opendialog () {
      this.dialogSeach = true
    },
    seachAllUsers () {
      this.$api.getAllUsers(this.seacrhAll).then(res => {
        console.log(res)
        this.tableData2 = res.data
      })
    },
    handleChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    openSavegroups (val) {
      console.log(val)
      this.form = val
      this.$api.getUsergroups().then(res => {
        this.usergroups = res.data
        this.operatorOptions = res.data.map(item => {
          return item.name
        })
      })
      this.$api.getAdmins().then(res => {
        this.adminPermissions = res.data
        this.permissions = res.data.map(item => {
          return item.name
        })
      })
      this.dialogSetAdmin = true
    },
    setAdmin () {
      this.form.groups = this.checkedOperators
      this.form.roles = this.checkedWorkers
      this.form.permissions = this.checkedPermissions
      for (let j = 0; j < this.form.groups.length; j++) {
        for (let i = 0; i < this.usergroups.length; i++) {
          if (this.usergroups[i].name === this.form.groups[j]) {
            this.form.groups[j] = this.usergroups[i]
          }
        }
      }
      for (let j = 0; j < this.form.permissions.length; j++) {
        for (let i = 0; i < this.adminPermissions.length; i++) {
          if (this.adminPermissions[i].name === this.form.permissions[j]) {
            this.form.permissions[j] = this.adminPermissions[i]
          }
        }
      }
      console.log(this.form)
      this.$api.saveUserpermissions(this.form).then(res => {
        console.log(res)
        this.getUsers()
        this.$notify({
          title: '成功',
          message: '权限设置成功',
          type: 'success'
        })
        this.dialogSetAdmin = false
      })
    },

    // operator
    handleCheckAllChange (val) {
      this.checkedOperators = val ? this.operatorOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.operatorOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.operatorOptions.length
    },

    // workers
    // workersCheckAllChange(val) {
    //   this.checkedWorkers = val ? this.workersOptions : [];
    //   this.isIndeterminate1 = false;
    //   console.log(this.checkedWorkers)
    // },
    handleCheckedWorkersChange (value) {
      let checkedCount = value.length
      // this.workersCheckAll = checkedCount === this.workersOptions.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.workersOptions.length
    },

    // permissions
    permissionsCheckAllChange (val) {
      this.checkedPermissions = val ? this.permissions : []
      this.isIndeterminate2 = false
    },
    handleCheckedPermissionsChange (value) {
      let checkedCount = value.length
      this.permissionsCheckAll = checkedCount === this.permissions.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.permissions.length
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getUsers(this.pageSize, this.first, this.seacrhUsers)
    },
    handleCurrentChange (val) {
      this.first = (--val) * this.pageSize
      console.log(`当前页: ${this.first}`)
      this.getUsers(this.pageSize, this.first, this.seacrhUsers)
    }
  }
}
</script>
