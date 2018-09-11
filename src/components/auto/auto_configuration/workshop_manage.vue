<!-- 车间管理 -->
<template>
  <div>
    <el-button class="createLine" type="primary" @click="dialogVisibleAdd = true" style="float: right; margin-bottom: 10px;">新 增</el-button>
    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="corporation.name" label="公司">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新 增" :visible.sync="dialogVisibleAdd" width="30%">
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" prop="company" :label-width="formLabelWidth" required>
          <el-input v-model="form1.company" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth" required>
          <el-input v-model="form1.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addWorkshop('form1')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修 改" :visible.sync="dialogVisibleSave" width="30%">
      <el-form :model="form2" :rules="rules" ref="form2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" prop="company" :label-width="formLabelWidth" required>
          <el-input v-model="form2.company" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth" required>
          <el-input v-model="form2.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="SaveWorkShop('form2')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'workshops',
  data () {
    return {
      loading: false,
      tableData: [],
      dialogVisibleAdd: false,
      dialogVisibleSave: false,
      formLabelWidth: '80px',
      form1: {
        company: '高新',
        name: ''
      },
      form2: {
        company: '',
        name: '',
        id: '',
        corporation: {}
      },
      workshop: {},
      rules: {
        name: [{ required: true, message: '必输项...', trigger: 'blur' }],
        company: [{ required: true, message: '必输项...', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.WorkShopLine()
  },
  methods: {
    WorkShopLine () { // 获取数据
      this.loading = true
      this.$api.getWorkShopsLine().then(res => {
        console.log(res)
        this.tableData = res.data
        this.$store.state.workShops = res.data
        console.log(this.$store.state.workShops)
        this.loading = false
      })
    },
    addWorkshop (formName) {
      this.workshop = this.tableData[1].corporation
      this.workshop.createTime = new Date().getTime() // 创建时间戳
      this.workshop.modifyDateTime = this.workshop.createTime
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.createWorkshop({
            id: null,
            name: this.form1.name,
            note: null,
            corporation: this.workshop
          }).then(res => {
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
            this.WorkShopLine()
            this.dialogVisibleAdd = false
          })
        } else {
          return false
        }
      })
    },
    handleClick (row) {
      console.log(row)
      this.dialogVisibleSave = true
      this.form2.company = row.corporation.name
      this.form2.name = row.name
      this.form2.id = row.id
      this.form2.corporation = row.corporation
    },
    SaveWorkShop (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.updateWorkshop({
            id: this.form2.id,
            name: this.form2.name,
            note: null,
            corporation: this.form2.corporation
          }).then(res => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.WorkShopLine()
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
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>
