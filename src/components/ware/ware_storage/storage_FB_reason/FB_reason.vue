<template>
  <div class="FB_reason">
    <el-button type="primary" class="addReason" @click="dialogAddFormVisible = true" icon="el-icon-plus" circle></el-button>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%" height="500" stripe>
      <el-table-column prop="id" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="批号">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openSave(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteReason(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
    <el-dialog title="新 增" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="翻包原因" prop="reason" :label-width="formLabelWidth">
          <el-input v-model="addForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addReason('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修 改" :visible.sync="dialogSaveFormVisible">
      <el-form :model="saveForm" :rules="rules" ref="saveForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="翻包原因" prop="reason" :label-width="formLabelWidth">
          <el-input v-model="saveForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveReason('saveForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    'pagination': Pagination
  },
  data () {
    return {
      loading: false,
      addForm: {
        reason: '',
        userId: 1
      },
      saveForm: {
        reason: '',
        userId: 1
      },
      formLabelWidth: '120px',
      dialogAddFormVisible: false, // 新增弹框
      dialogSaveFormVisible: false, // 修改弹框
      rules: { // 规则
        reason: { required: true, message: '请输入原因', trigger: 'blur' }
      },
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 10 // 总数
    }
  },
  created () {
    this.seachTableData()
  },
  methods: {
    seachTableData () {
      this.loading = true
      this.$api.getReasonList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.loading = false
        if (res.data.status === '200') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    addReason (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.addReason(this.addForm).then(res => {
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
      this.saveForm.reason = row.reason
      this.saveForm.id = row.id
      this.saveForm.userId = 1
      this.dialogSaveFormVisible = true
    },
    saveReason (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.updateReason({
            id: this.saveForm.id,
            reason: this.saveForm.reason,
            userId: 1
          }).then(res => {
            console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              })
              this.dialogSaveFormVisible = false
              this.seachTableData()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              })
            }
          })
        } else {
          // return
        }
      })
    },
    deleteReason (row) {
      this.$confirm('此操作将删除翻包原因, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteReason({id: row.id}).then(res => {
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
.addReason {
  float: right;
  margin-bottom: 10px;
}
</style>
