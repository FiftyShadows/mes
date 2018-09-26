<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="dialogAddFormVisible = true" style="float: right;margin-bottom: 10px;" circle></el-button>
    <el-table :data="tableData" border style="width: 100%" height="500" stripe>
      <el-table-column prop="mandt" label="集团" width="120">
      </el-table-column>
      <el-table-column prop="factoryCode" label="工厂" width="120">
      </el-table-column>
      <el-table-column prop="lgort" label="SAP仓库点标识" width="200">
      </el-table-column>
      <el-table-column prop="lgobe" label="SAP仓库点名称" min-width="250">
      </el-table-column>
      <el-table-column prop="type" label="销售类型">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openSave(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteLocation(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
    <el-dialog title="新 增" :visible.sync="dialogAddFormVisible" width="40%">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="集团" prop="mandt" :label-width="formLabelWidth">
          <el-input v-model="addForm.mandt" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="工厂" prop="factoryCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.factoryCode" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="SAP仓库点标识" prop="lgort" :label-width="formLabelWidth">
          <el-input v-model="addForm.lgort" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="SAP仓库点名称" prop="lgobe" :label-width="formLabelWidth">
          <el-input v-model="addForm.lgobe" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="销售类型" prop="type" :label-width="formLabelWidth">
          <el-select v-model="addForm.type" placeholder="请选择销售类型" class="floatLeft">
            <el-option label="内销" value="内销"></el-option>
            <el-option label="外贸" value="外贸"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addLocation('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修 改" :visible.sync="dialogSaveFormVisible">
      <el-form :model="saveForm" :rules="rules" ref="saveForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="集团" prop="mandt" :label-width="formLabelWidth">
          <el-input v-model="saveForm.mandt" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="工厂" prop="factoryCode" :label-width="formLabelWidth">
          <el-input v-model="saveForm.factoryCode" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="SAP仓库点标识" prop="lgort" :label-width="formLabelWidth">
          <el-input v-model="saveForm.lgort" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="SAP仓库点名称" prop="lgobe" :label-width="formLabelWidth">
          <el-input v-model="saveForm.lgobe" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="销售类型" prop="type" :label-width="formLabelWidth">
          <el-select v-model="saveForm.type" placeholder="请选择销售类型" class="floatLeft">
            <el-option label="内销" value="内销"></el-option>
            <el-option label="外贸" value="外贸"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updarteLocation('saveForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from './../../common/pagination.vue'
export default {
  components: {
    'pagination': Pagination
  },
  data () {
    return {
      addForm: {
        mandt: '',
        factoryCode: '',
        lgort: '',
        lgobe: '',
        type: '',
        userId: 1
      },
      saveForm: {
        id: '',
        mandt: '',
        factoryCode: '',
        lgort: '',
        lgobe: '',
        type: '',
        userId: 1
      },
      dialogAddFormVisible: false,
      dialogSaveFormVisible: false,
      formLabelWidth: '140px',
      rules: { // 规则
        mandt: { required: true, message: '请输入集团', trigger: 'blur' },
        factoryCode: { required: true, message: '请输入工厂', trigger: 'blur' },
        lgort: { required: true, message: '请输入仓库标识', trigger: 'blur' },
        lgobe: { required: true, message: '请输入仓库名称', trigger: 'blur' },
        type: { required: true, message: '请选择销售类型', trigger: 'change' }
      },
      batchNoOptions: [], // 批号选择列表
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0 // 总数
    }
  },
  created () {
    this.seachTableData()
  },
  methods: {
    seachTableData () {
      this.$api.getSapStorage({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    addLocation (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.addSapStorage(this.addForm).then(res => {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            })
            this.dialogAddFormVisible = false
            this.seachTableData()
          })
        } else {
          // return
        }
      })
    },
    openSave (row) {
      this.saveForm.mandt = row.mandt
      this.saveForm.factoryCode = row.factoryCode
      this.saveForm.lgort = row.lgort
      this.saveForm.lgobe = row.lgobe
      this.saveForm.type = row.type
      this.saveForm.id = row.id
      this.dialogSaveFormVisible = true
    },
    updarteLocation (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.updateSapStorage(this.saveForm).then(res => {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            })
            this.dialogSaveFormVisible = false
            this.seachTableData()
          })
        } else {
          // return
        }
      })
    },
    deleteLocation (row) {
      this.$confirm('此操作将删除sap库位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteSapStorage({
          id: row.id,
          userId: 1
        }).then(res => {
          this.$notify({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
          this.seachTableData()
        })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.floatLeft {
  float: left;
  width: 80%;
}
</style>
