<template>
  <div class="inventory">
    <el-form :model="seachForm" :rules="rules" ref="seachForm" label-width="10px" class="demo-ruleForm">
      <el-form-item label="" prop="houseId" class="floatLeft">
        <el-select v-model="seachForm.houseId" filterable clearable placeholder="请选择仓库">
          <el-option v-for="item in warehouseOptions" :key="item.houseName" :label="item.houseName" :value="item.houseName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="Batch" class="floatLeft">
        <el-select v-model="seachForm.batchNo" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOptions" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="username" class="floatLeft">
        <el-input v-model="seachForm.username" placeholder="请输入盘点人"></el-input>
      </el-form-item>
      <el-form-item label="" prop="startDate" class="floatLeft">
        <el-form-item prop="startDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="seachForm.startDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="" prop="endDate" class="floatLeft">
        <el-form-item prop="endDate">
          <el-date-picker type="date" placeholder="结束日期" v-model="seachForm.endDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
        <!-- <el-button @click="startInventory()" type="primary">开始盘点</el-button> -->
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="500">
      <el-table-column prop="warehouseName" label="仓库" width="100">
      </el-table-column>
      <el-table-column prop="storageCode" label="库位" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.storageCode || scope.row.storageCode === ''">所有</span>
          <span v-else>{{scope.row.storageCode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="batchNo" label="批号" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.batchNo || scope.row.batchNo === ''">所有</span>
          <span v-else>{{scope.row.batchNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="等级" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.level || scope.row.level === ''">所有</span>
          <span v-else>{{scope.row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="盘点时间" :formatter="dateFormat" min-width="200">
      </el-table-column>
      <el-table-column prop="username" label="盘点人" width="120">
      </el-table-column>
      <el-table-column prop="totalQuantity" label="箱数" width="100">
      </el-table-column>
      <el-table-column prop="totalWeight" label="重量" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="openDetail(scope.row)" type="text" size="small">查看明细</el-button>
          <el-button type="text" size="small">打印确认单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <DialogDetail ref="detail"></DialogDetail>
    <!-- <DialogStart ref="start"></DialogStart> -->
  </div>
</template>
<script>
import moment from 'moment' // 处理时间
import Pagination from '../../../common/pagination.vue'
import DialogDetail from './Dialog_detail'
export default {
  components: {
    Pagination,
    DialogDetail
  },
  data () {
    return {
      loading: false,
      seachForm: { // 搜索列表数据
        batchNo: '', // 批次
        houseId: '', // 仓库id
        username: '', // 盘点人
        startDate: '', // 开始日期
        endDate: '' // 结束日期
      },
      batchNoOptions: [], // 批号选择列表
      warehouseOptions: [], // 仓库列表
      stocktakingRecordId: '',
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
      rules: {}
    }
  },
  created () {
    this.getBatchList()
    this.getSelectWarehouseList()
    this.seachTableData()
  },
  methods: {
    getBatchList () {
      this.$api.getBatchList().then(res => {
        this.batchNoOptions = res.data.data
        console.log(this.batchNoOptions)
      })
    },
    getSelectWarehouseList () {
      this.$api.getSelectWarehouseList().then(res => {
        this.warehouseOptions = res.data.data
      })
    },
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    seachTableData () {
      this.tableData = []
      this.loading = true
      this.$api.getStocktakingRecord({
        batchNo: this.seachForm.batchNo,
        houseId: this.seachForm.houseId,
        username: this.seachForm.username,
        startDate: this.seachForm.startDate,
        endDate: this.seachForm.endDate,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.loading = false
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
      this.seachTableData()
    },
    openDetail (row) {
      this.stocktakingRecordId = row.stocktakingRecordId
      console.log(this.stocktakingRecordId)
      this.$refs.detail.show(this.stocktakingRecordId)
    }
  }
}
</script>
<style lang="scss" scoped>
.floatLeft {
  float: left;
  width: 200px;
}
</style>
