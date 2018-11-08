<template>
  <div>
    <el-form :model="searchForm" ref="searchForm" label-width="10px" class="demo-ruleForm">
      <el-form-item style="float: left;width: 150px;">
        <el-select v-model="searchForm.packageBoxType" placeholder="打包类型">
          <el-option v-for="packageBoxType in packageBoxTypes" :label="packageBoxType.name" :value="packageBoxType.value" :key="packageBoxType.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="workshop" style="float: left;width: 150px;">
        <el-select v-model="searchForm.workshopId" placeholder="请选择车间">
          <el-option v-for="workshop in workshops" :label="workshop.name" :value="workshop.id" :key="workshop.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="packageClassId" style="float: left;width: 150px;">
        <el-select v-model="searchForm.packageClassId" placeholder="请选择班次">
          <el-option v-for="packageClass in packageClasses" :label="packageClass.name" :value="packageClass.id" :key="packageClass.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="batchId" style="float: left;width: 150px;">
        <el-select v-model="searchForm.batchId" filterable remote reserve-keyword placeholder="请输入批号" :remote-method="remoteMethod" :loading="loading" style="float:left;">
          <el-option v-for="batch in batches" :key="batch.id" :label="batch.batchNo" :value="batch.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="gradeId" style="float: left;width: 150px;">
        <el-input v-model="searchForm.gradeId" placeholder="请输入等级"></el-input>
      </el-form-item>
      <el-form-item label="" required style="float: left; width: 300px;">
        <el-col :span="11">
          <el-form-item prop="startDate">
            <el-date-picker type="date" placeholder="开始日期" value-format="yyyy-MM-dd" v-model="searchForm.startDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker type="date" placeholder="结束日期" value-format="yyyy-MM-dd" v-model="searchForm.endDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="searchTableData()" circle></el-button>
        <el-button type="warning" icon="el-icon-edit" size="small" @click="batchEdit()">批量</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%" height="500"
      stripe
      border
      ref="multipleTable"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column fixed prop="code" label="码单号">
      </el-table-column>
      <el-table-column prop="batch.product.name" label="成品">
      </el-table-column>
      <el-table-column prop="batch.batchNo" label="批号">
      </el-table-column>
      <el-table-column prop="batch.spec" label="规格">
      </el-table-column>
      <el-table-column prop="grade.name" label="等级" width="100">
      </el-table-column>
      <el-table-column prop="batch.tubeColor" label="管色" width="100">
      </el-table-column>
      <el-table-column prop="netWeight" label="净重" width="100">
      </el-table-column>
      <el-table-column prop="grossWeight" label="毛重" width="100">
      </el-table-column>
      <el-table-column prop="silkCount" label="丝锭数" width="100">
      </el-table-column>
      <el-table-column prop="budatClass.name" label="班次" width="100">
      </el-table-column>
      <el-table-column prop="budat" label="入库日期">
      </el-table-column>
      <el-table-column prop="createDateTime" label="包装时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope)">计量</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></pagination>
    <edit-dialog ref="edit_dialog"></edit-dialog>
    <edit-more-dialog ref="edit_more_dialog"></edit-more-dialog>
  </div>
</template>
<script>
import Pagination from '../../common/pagination'
import PackageEditDialog from './package_edit_dialog.vue'
import PackageEditMoreDialog from './package_edit_more_dialog.vue'
export default {
  name: 'package_have_to_print',
  components: {
    'pagination': Pagination,
    'edit-dialog': PackageEditDialog,
    'edit-more-dialog': PackageEditMoreDialog
  },
  created () {
    this.$api.getWorkShopsLine().then(res => { this.workshops = res.data })
    this.$api.getPackageClasses().then(res => {
      this.packageClasses = res.data
      this.packageClasses.sort((a, b) => a.riambCode - b.riambCode)
    })
  },
  data () {
    return {
      searchForm: { // 搜索列表数据
        first: 0,
        pageSize: 50,
        packageClassId: '', // 班次
        packageBoxType: 'AUTO', // 箱包类型
        startDate: this.util.getNowFormatDate(), // 开始日期
        endDate: this.util.getNowFormatDate(), // 结束日期
        batchId: '', // 批号
        gradeId: '', // 等级
        workshopId: '' // 车间
      },
      packageBoxTypes: [
        {name: '自动打包', value: 'AUTO'},
        {name: '人工打包', value: 'MANUAL'},
        {name: '外贸打包', value: 'FOREIGN'}
      ],
      loading: false,
      total: 0,
      pageSize: 50,
      pageNum: 1,
      workshops: [],
      packageClasses: [],
      batches: [],
      tableData: [], // 列表数据
      multipleSelection: [],
      printData: [],
      dialogAddSingleFormVisible: false
    }
  },
  methods: {
    edit (scope) {
      this.$refs.edit_dialog.show(scope.row, this.packageClasses)
    },
    batchEdit () {
      if (this.multipleSelection.length === 0) {
        this.$message('请至少选择一条记录')
      } else {
        this.$refs.edit_more_dialog.show(this.multipleSelection, this.packageClasses)
      }
    },
    searchTableData () {
      this.loading = true
      this.searchForm.first = (this.pageNum - 1) * this.pageSize
      this.searchForm.pageSize = this.pageSize
      let params = this.searchForm
      this.$api.getPackageBoxes(params).then(res => {
        this.tableData = res.data.packageBoxes
        this.loading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.$api.getBatches({
          pageSize: 10,
          first: 0,
          q: query
        }).then(res => {
          if (res.errorCode === 'E00000') {
            this.$message.error(res.errorMessage)
          } else {
            this.loading = false
            this.batches = res.data.batches
          }
        })
      } else {
        this.batches = []
      }
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.searchTableData()
    }
  }
}
</script>
<style lang="scss" scoped>
edit-dialog {
  width: 10px;
}
</style>
