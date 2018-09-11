<!-- 权限 -->
<template>
  <div class="admin">
    <el-button type="primary" @click="openAdd()" style="float: right; margin-bottom: 10px;">新 建</el-button>
    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="name" label="名称" width="200">
      </el-table-column>
      <el-table-column prop="code" label="权限CODE">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="openSave(scope.row)" type="text" size="small">修 改</el-button>
          <!-- <el-button @click="deleteAdmin(scope.row)" type="text" size="small">删 除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog title="新 建" :visible.sync="dialogFormVisibleADD">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限CODE" :label-width="formLabelWidth" prop="code" required>
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleADD = false">取 消</el-button>
        <el-button type="primary" v-if="isAdd" @click="addAdmin()">确 定</el-button>
        <el-button type="primary" v-else @click="SaveAdmin()">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="新 建" :visible.sync="dialogFormVisibleADD">
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限CODE" :label-width="formLabelWidth" prop="code" required>
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleADD = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修 改" :visible.sync="dialogFormVisibleSave">
      <el-form :model="form2" :rules="rules" ref="form2" class="demo-ruleForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限CODE" :label-width="formLabelWidth" prop="code" required>
          <el-input v-model="form2.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="SaveAdmin('form2')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'admin',
  data () {
    return {
      loading: false,
      tableData: [],
      isAdd: true,
      formLabelWidth: '120px',
      dialogFormVisibleADD: false,
      dialogFormVisibleSave: false,
      form: {
        name: '',
        code: ''
      },
      form2: {
        name: '',
        code: ''
      },
      rules: {
        name: { required: true, message: '必输项...', trigger: 'blur' },
        code: { required: true, message: '必输项...', trigger: 'blur' }
      }
    }
  },
  created () {
    this.getAdmin()
  },
  methods: {
    getAdmin () {
      this.loading = true
      this.$api.getAdmins().then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    openAdd () {
      this.form.name = ''
      this.form.code = ''
      this.dialogFormVisibleADD = true
    },
    openSave (row) {
      console.log(row)
      this.form2.name = row.name
      this.form2.code = row.code
      this.dialogFormVisibleSave = true
    },
    SaveAdmin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.saveAdmin(this.form2).then(res => {
            console.log(res)
            this.getAdmin()
            this.dialogFormVisibleSave = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    deleteAdmin (row) {
      this.$api.deleteAdmin(row.id).then(res => {
        console.log(res)
        this.getAdmin()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
      })
    },
    addAdmin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addAdmins(this.form).then(res => {
            this.getAdmin()
            this.dialogFormVisibleADD = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
