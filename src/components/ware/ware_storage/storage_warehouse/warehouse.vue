<template>
  <div class="warehouse">
    <el-button type="primary" icon="el-icon-plus" @click="openAdd()" style="float: right;margin-bottom: 10px;" circle></el-button>
    <el-table :data="tableData" border style="width: 100%" height="500" stripe>
      <el-table-column prop="" label="编号">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="houseName" label="仓库名称" min-width="100">
      </el-table-column>
      <el-table-column prop="houseType" label="仓库类型" min-width="100">
      </el-table-column>
      <el-table-column prop="lgort" label="SAP仓库点" min-width="150">
        <!-- <template slot-scope="scope">
          <span v-for="item in scope.row.lgort" :key="item">{{item}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="houseLocation" label="车间" min-width="100">
      </el-table-column>
      <el-table-column prop="storageRow" label="库位行数" min-width="100">
      </el-table-column>
      <el-table-column prop="storageColumn" label="库位列数" min-width="100">
      </el-table-column>
      <el-table-column prop="storageCount" label="库位数" min-width="100">
      </el-table-column>
      <el-table-column prop="poyCount" label="全POY库容(箱)" min-width="150">
      </el-table-column>
      <el-table-column prop="fdyCount" label="全FDY库容(箱)" min-width="150">
      </el-table-column>
      <el-table-column prop="type" label="全切片库容(包)" min-width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteWarehouse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
    <el-dialog title="新 增" :visible.sync="dialogAddFormVisible" width="40%">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库名称" prop="warehouseName" :label-width="formLabelWidth">
          <el-input v-model="addForm.warehouseName" placeholder="请输入仓库名称" class="floatLeft"></el-input>
        </el-form-item>
        <el-form-item label="仓库类型" prop="warehouseType" :label-width="formLabelWidth">
          <el-select v-model="addForm.warehouseType" placeholder="请选择仓库类型" class="floatLeft">
            <el-option v-for="item in warehouseType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SAP仓库点" prop="lgort" :label-width="formLabelWidth">
          <el-select v-model="addForm.lgort" multiple placeholder="请选择SAP仓库点" class="floatLeft">
            <el-option v-for="item in sapStorageData" :key="item.id" :label="item.lgobe" :value="item.lgobe"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="workshop" :label-width="formLabelWidth">
          <el-select v-model="addForm.workshop" placeholder="请选择车间" class="floatLeft">
            <el-option v-for="item in workShopData" :key="item.id" :label="item.workshop" :value="item.workshop"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位行数" prop="storageRow" :label-width="formLabelWidth">
          <el-input-number v-model="addForm.storageRow" :min="1" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="库位列数" prop="storageColumn" :label-width="formLabelWidth">
          <el-input-number v-model="addForm.storageColumn" :min="1" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="库位数" prop="storageCount" :label-width="formLabelWidth">
          <el-input-number v-model="addForm.storageCount" :min="1" style="float: left;"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addWarehouse('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Pagination from './../../common/pagination.vue'
export default {
  components: {
    'pagination': Pagination
  },
  data () {
    return {
      addForm: {
        warehouseName: '',
        warehouseType: '',
        workshop: '',
        storageCount: '',
        storageRow: '',
        storageColumn: '',
        lgort: [],
        fdyCount: '',
        poyCount: '',
        userId: 1
      },
      workShopData: [], // 车间
      sapStorageData: [], // sap库位点
      warehouseType: this.$store.state.warehouseType, // 仓库类型
      dialogAddFormVisible: false,
      formLabelWidth: '140px',
      rules: { // 规则
        warehouseName: { required: true, message: '请输入仓库名称', trigger: 'blur' },
        warehouseType: { required: true, message: '请选择仓库类型', trigger: 'change' },
        workshop: { required: true, message: '请选择车间', trigger: 'change' },
        lgort: { required: true, message: '请选择SAP仓库点', trigger: 'change' },
        storageCount: { required: true, message: '请选择库位数', trigger: 'change' },
        storageRow: { required: true, message: '请选择库位行数', trigger: 'change' },
        storageColumn: { required: true, message: '请选择库位列数', trigger: 'change' }
      },
      batchNoOptions: [], // 批号选择列表
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0 // 总数
    }
  },
  computed: {
    ...mapGetters(['workshop', 'sapStorage'])
  },
  created () {
    this.getTableData()
  },
  mounted () {
    this.getSelectWorkshop()
    this.getselectSapStorage()
  },
  methods: {
    ...mapActions(['getSelectWorkshop', 'getselectSapStorage']),
    getTableData () {
      this.$api.getSelectWarehouse({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$notify.error({
            title: '失败',
            message: res.data.msg
          })
        }
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.getTableData()
    },
    openAdd () {
      this.workShopData = this.$store.state.workshop.workshop
      this.sapStorageData = this.$store.state.sapStorage.sapStorage
      this.dialogAddFormVisible = true
    },
    addWarehouse (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          this.$api.addWarehouse(this.addForm).then(res => {
            console.log(res)
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            })
            this.getTableData()
            this.dialogAddFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    deleteWarehouse (row) {
      this.$confirm('此操作将删除该仓库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteWarehouse({
          id: row.id,
          userId: 1
        }).then(res => {
          this.$notify({
            title: '成功',
            message: res.data.msg,
            type: 'success'
          })
          this.getTableData()
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
