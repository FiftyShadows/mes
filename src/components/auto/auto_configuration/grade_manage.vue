<!-- 等级管理 -->
<template>
  <div class="gradeManage">
    <el-button type="primary" @click="dialogVisibleAdd = true" style="float: right; margin-right: 10px;margin-bottom: 10px;">新增</el-button>
    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="name" label="等级">
      </el-table-column>
      <el-table-column prop="sortBy" label="分数">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="Save(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新 增" :visible.sync="dialogVisibleAdd" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="等级" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="分数" :label-width="formLabelWidth" prop="sortBy">
          <el-input v-model="form.sortBy" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddGrade('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogVisibleSave" width="30%">
      <el-form :model="form2" :rules="rules" ref="form2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="等级" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form2.name" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="分数" :label-width="formLabelWidth" prop="sortBy">
          <el-input v-model="form2.sortBy" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="SaveGrade('form2')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'gradeManage',
  data () {
    return {
      tableData: [],
      dialogVisibleAdd: false,
      dialogVisibleSave: false,
      form: {
        id: null,
        name: '',
        sortBy: ''
      },
      form2: {
        id: null,
        name: '',
        sortBy: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sortBy: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getGrade()
  },
  methods: {
    getGrade () {
      this.$api.getGrades().then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    AddGrade (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.AddGrades(this.form).then(res => {
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
            this.getGrade()
            this.dialogVisibleAdd = false
          })
        } else {
          return false
        }
      })
    },
    Save (row) {
      console.log(row)
      this.form2.name = row.name
      this.form2.sortBy = row.sortBy
      this.form2.id = row.id
      this.dialogVisibleSave = true
    },
    SaveGrade (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.SaveGrades(this.form2).then(res => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.getGrade()
            this.dialogVisibleSave = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
