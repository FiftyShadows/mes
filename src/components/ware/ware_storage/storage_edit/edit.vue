<template>
  <div class="edit">
    <el-button type="primary" class="add" @click="openAdd()" icon="el-icon-plus" circle></el-button>
    <el-table :data="tableData" border style="width: 100%" height="500" stripe>
      <el-table-column prop="id" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="warehouseName" label="仓库名称">
      </el-table-column>
      <el-table-column prop="storageCode" label="库位">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openSave(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteWarehouse(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
    <el-dialog title="新 增" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库名称" prop="warehouseName" :label-width="formLabelWidth">
          <el-select v-model="addForm.warehouseName" clearable placeholder="请选择仓库点" class="floatLeft">
            <el-option v-for="item in warehouse" :key="item.id" :label="item.houseName" :value="item.houseName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位" prop="storageCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.storageCode" class="floatLeft"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStorage('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修 改" :visible.sync="dialogSaveFormVisible">
      <el-form :model="saveForm" :rules="rules" ref="saveForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库名称" prop="warehouseName" :label-width="formLabelWidth">
          <el-select v-model="saveForm.warehouseName" clearable disabled placeholder="请选择仓库点" class="floatLeft">
            <el-option v-for="item in warehouse" :key="item.id" :label="item.houseName" :value="item.houseName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位" prop="storageCode" :label-width="formLabelWidth">
          <el-input v-model="saveForm.storageCode" class="floatLeft"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveStorage('saveForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    'pagination': Pagination
  },
  data () {
    return {
      addForm: {
        houseId: '',
        warehouseName: '',
        storageCode: '',
        userId: 1
      },
      saveForm: {
        warehouseName: '',
        storageId: '',
        storageCode: '',
        userId: 1
      },
      warehouse: [], // 仓库列表
      formLabelWidth: '120px',
      dialogAddFormVisible: false, // 新增弹框
      dialogSaveFormVisible: false, // 修改弹框
      rules: { // 规则
        warehouseName: { required: true, message: '请输入仓库名称', trigger: 'blur' },
        storageCode: { required: true, message: '请输入库位', trigger: 'change' }
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
  mounted () {
    this.getSelectWarehouseList()
  },
  computed: {
    ...mapGetters(['warehouseList'])
  },
  methods: {
    ...mapActions(['getSelectWarehouseList']),
    seachTableData () {
      this.$api.getWarehouseStorageList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    openAdd () {
      this.warehouse = this.$store.state.warehouseList.warehouseList
      this.dialogAddFormVisible = true
    },
    addStorage (formName) {
      // console.log(this.warehouse)
      for (let i = 0; i < this.warehouse.length; i++) {
        if (this.addForm.warehouseName === this.warehouse[i].houseName) {
          this.addForm.houseId = this.warehouse[i].id
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addStorage(this.addForm).then(res => {
            if (res.data.status === '200') {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              })
              this.dialogAddFormVisible = false
              this.seachTableData()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    deleteWarehouse (row) {
      console.log(row)
      this.$confirm('此操作将删除该库位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteStorage({
          storageId: row.storageId,
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
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    openSave (row) {
      this.saveForm.storageId = row.storageId
      this.saveForm.storageCode = row.storageCode
      this.saveForm.warehouseName = row.warehouseName
      this.warehouse = this.$store.state.warehouseList.warehouseList
      this.dialogSaveFormVisible = true
    },
    saveStorage (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.updateStorage(this.saveForm).then(res => {
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
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  float: right;
  margin-bottom: 10px;
}
.floatLeft {
  float: left;
  width: 80%;
}
</style>
