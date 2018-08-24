<!-- 产品管理 -->
<template>
  <div class="product">
    <el-button type="primary" @click="openAdd()" style="float: right; margin-right: 10px;margin-bottom: 10px;">新增</el-button>
    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addProducts()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogVisibleSave">
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名 称" :label-width="formLabelWidth" prop="name" required>
          <el-input v-model="form1.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="saveProduct()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'product',
  data () {
    return {
      tableData: [],
      form: {
        name: ''
      },
      form1: {
        name: ''
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
      this.$api.getProduct().then(res => {
        this.tableData = res.data
        console.log(res)
      })
    },
    openSave (row) {
      this.form1.name = row.name
      this.form1.createDateTime = row.createDateTime
      this.form1.modifyDateTime = row.modifyDateTime
      this.form1.id = row.id
      this.dialogVisibleSave = true
    },
    saveProduct () {
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
    },
    openAdd () {
      this.dialogVisibleAdd = true
    },
    addProducts () {
      this.$api.addProduct(this.form).then(res => {
        this.getProduct()
        this.dialogVisibleAdd = false
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
      })
    },
    setting (row) {
      console.log(row)
      this.$router.push({path: '/configuration/Product/configurat', query: row})
    }
  }
}
</script>
