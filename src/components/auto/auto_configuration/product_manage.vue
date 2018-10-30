<!-- 产品管理 -->
<template>
  <div>
    <div class="product" v-if="productVisible">
    <el-button type="primary" @click="openAdd()" style="float: right; margin-right: 10px;margin-bottom: 10px;">新增</el-button>
    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="name" label="等级">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="setting(scope.row)" type="text" size="small">配 置</el-button>
          <el-button @click="openSave(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新 增" :visible.sync="dialogVisibleAdd">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名 称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编 码" :label-width="formLabelWidth" prop="code" required>
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addProducts('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogVisibleSave">
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名 称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form1.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编 码" :label-width="formLabelWidth" prop="code" required>
          <el-input v-model="form1.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="saveProduct('form1')">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'product',
  data () {
    return {
      loading: false,
      productVisible: true,
      tableData: [],
      form: {
        name: '',
        code: ''
      },
      form1: {
        name: '',
        code: ''
      },
      formLabelWidth: '120px',
      dialogVisibleAdd: false,
      dialogVisibleSave: false,
      rules: {
        name: [{ required: true, message: '必输项...', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      this.loading = true
      this.$api.getProduct().then(res => {
        this.tableData = res.data
        console.log(res)
        this.loading = false
      })
    },
    openSave (row) {
      this.form1.name = row.name
      this.form1.code = row.code
      this.form1.createDateTime = row.createDateTime
      this.form1.modifyDateTime = row.modifyDateTime
      this.form1.id = row.id
      this.dialogVisibleSave = true
    },
    saveProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.saveProduct(this.form1).then(res => {
            console.log(res)
            this.getProduct()
            this.dialogVisibleSave = false
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
    openAdd () {
      this.dialogVisibleAdd = true
    },
    addProducts (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addProduct(this.form).then(res => {
            this.getProduct()
            this.dialogVisibleAdd = false
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
    },
    setting (row) {
      this.$router.push({path: '/configuration/Product/configurat', query: row})
      this.productVisible = false
    }
  }
}
</script>
