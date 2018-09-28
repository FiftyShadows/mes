<template>
  <div class="plan">
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
      <el-table-column prop="storageStatus" label="当前状态">
      </el-table-column>
      <el-table-column prop="planBatchNoList" label="批号" min-width="400">
        <template slot-scope="scope">
          <span v-for="item in scope.row.planBatchNoList" :key="item" class="planBatchNoList">{{item}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="成品类型">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openSave(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
    <el-dialog title="新增计划" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库名称" prop="warehouseName" :label-width="formLabelWidth">
          <el-select v-model="addForm.warehouseName" clearable placeholder="请选择仓库点" @change="choseStorage()" class="floatLeft">
            <el-option v-for="item in warehouse" :key="item.id" :label="item.houseName" :value="item.houseName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位" prop="storageCode" :label-width="formLabelWidth">
          <el-select v-model="addForm.storageCode" clearable placeholder="请选择仓库点" class="floatLeft">
            <el-option v-for="item in storage" :key="item.id" :label="item.storageCode" :value="item.storageCode"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="当前状态" prop="storageCode" :label-width="formLabelWidth">
          <el-radio v-model="addForm.storageCode" label="1" border style="float: left;">使用中</el-radio>
          <el-radio v-model="addForm.storageCode" label="2" border style="float: left;">未使用</el-radio>
        </el-form-item> -->
        <el-form-item label="批号" prop="batchNo" :label-width="formLabelWidth">
          <el-select v-model="addForm.batchNo" clearable multiple placeholder="请选择批号" class="floatLeft">
            <el-option v-for="item in batchNo" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPlan('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改计划" :visible.sync="dialogSaveFormVisible">
      <el-form :model="saveForm" :rules="rules" ref="saveForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="仓库名称" prop="warehouseName" :label-width="formLabelWidth">
          <el-select v-model="saveForm.warehouseName" disabled placeholder="请选择仓库点" @change="choseStorage()" class="floatLeft">
            <el-option v-for="item in warehouse" :key="item.id" :label="item.houseName" :value="item.houseName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库位" prop="storageCode" :label-width="formLabelWidth">
          <el-select v-model="saveForm.storageCode" disabled placeholder="请选择仓库点" class="floatLeft">
            <el-option v-for="item in storage" :key="item.id" :label="item.storageCode" :value="item.storageCode"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="当前状态" prop="storageCode" :label-width="formLabelWidth">
          <el-radio v-model="addForm.storageCode" label="1" border style="float: left;">使用中</el-radio>
          <el-radio v-model="addForm.storageCode" label="2" border style="float: left;">未使用</el-radio>
        </el-form-item> -->
        <el-form-item label="批号" :label-width="formLabelWidth">
          <el-select v-model="saveForm.batchNo" clearable multiple placeholder="请选择批号" class="floatLeft">
            <el-option v-for="item in batchNo" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePlan('saveForm')">确 定</el-button>
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
        houseId: '',
        warehouseName: '',
        storageCode: '',
        storageId: '',
        batchNo: '',
        batchNoIds: [], // 批次ID
        userId: 1
      },
      saveForm: {
        warehouseName: '',
        storageId: '',
        storageCode: '',
        batchNo: '',
        batchNoIds: '',
        userId: 1
      },
      warehouse: [], // 仓库列表
      storage: [], // 库位列表
      batchNo: [], // 批次
      formLabelWidth: '120px',
      dialogAddFormVisible: false, // 新增弹框
      dialogSaveFormVisible: false, // 修改弹框
      rules: { // 规则
        warehouseName: { required: true, message: '请选择仓库名称', trigger: 'change' },
        storageCode: { required: true, message: '请选择库位', trigger: 'change' },
        batchNo: { required: true, message: '请选择批次', trigger: 'change' }
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
    this.getBatchList()
    this.getSelectWarehouseList()
  },
  computed: {
    ...mapGetters(['batchList', 'warehouseList'])
  },
  methods: {
    ...mapActions(['getSelectWarehouseList', 'getBatchList']),
    seachTableData () {
      this.$api.getWarehouseStoragePlanList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    selectWarehouseList () {
      this.warehouse = this.$store.state.warehouseList.warehouseList
      this.batchNo = this.$store.state.batchList.batchList
      console.log(this.warehouse)
      console.log(this.batchNo)
    },
    choseStorage () {
      for (let i = 0; i < this.warehouse.length; i++) {
        if (this.addForm.warehouseName === this.warehouse[i].houseName) {
          this.addForm.houseId = this.warehouse[i].id
        }
      }
      this.$api.getSelectStorageList({
        houseId: this.addForm.houseId
      }).then(res => {
        this.storage = res.data.data
        console.log(this.storage)
      })
    },
    openAdd () {
      this.dialogAddFormVisible = true
      this.selectWarehouseList()
    },
    addPlan (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.storage.length; i++) {
            if (this.addForm.storageCode === this.storage[i].storageCode) {
              this.addForm.storageId = this.storage[i].id
            }
          }
          let arr = []
          for (let i = 0; i < this.addForm.batchNo.length; i++) {
            for (let j = 0; j < this.batchNo.length; j++) {
              if (this.addForm.batchNo[i] === this.batchNo[j].batchNo) {
                arr.push(this.batchNo[j].id)
              }
            }
          }
          this.addForm.batchNoIds = arr
          console.log(this.addForm)
          this.$api.addStorageBatchNo(this.addForm).then(res => {
            console.log(res)
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
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    openSave (row) {
      console.log(row)
      this.saveForm.storageId = row.storageId
      this.saveForm.storageCode = row.storageCode
      this.saveForm.warehouseName = row.warehouseName
      this.saveForm.batchNo = row.planBatchNoList
      this.selectWarehouseList()
      this.dialogSaveFormVisible = true
    },
    savePlan (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = []
          for (let i = 0; i < this.saveForm.batchNo.length; i++) {
            for (let j = 0; j < this.batchNo.length; j++) {
              if (this.saveForm.batchNo[i] === this.batchNo[j].batchNo) {
                arr.push(this.batchNo[j].id)
              }
            }
          }
          this.saveForm.batchNoIds = arr
          this.$api.updateStorageBatchNo(this.saveForm).then(res => {
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
.planBatchNoList {
  display: inline-block;
  margin: auto;
  width: 120px;
  background-color: rgb(73, 71, 82);
  margin-bottom: 2px;
  margin-left: 2px;
  color: rgb(219, 216, 216);
  border-radius: 10px;
}
</style>
