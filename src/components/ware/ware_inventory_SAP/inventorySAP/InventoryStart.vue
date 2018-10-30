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
      <el-form-item label="" prop="level" class="floatLeft">
        <el-select v-model="seachForm.level" filterable clearable placeholder="请选择等级">
          <el-option v-for="item in levelOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="classes" class="floatLeft">
        <el-select v-model="seachForm.classes" filterable clearable placeholder="请选择班次">
          <el-option v-for="item in classesOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="startDate" class="floatLeft">
        <el-form-item prop="startDate">
          <el-date-picker type="date" placeholder="开始入库日期" v-model="seachForm.startDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="" prop="endDate" class="floatLeft">
        <el-form-item prop="endDate">
          <el-date-picker type="date" placeholder="结束入库日期" v-model="seachForm.endDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
        <!-- <el-button type="warning">开始补录</el-button>
        <el-button type="primary">盘点结束</el-button> -->
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" height="500">
      <el-table-column prop="id" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="batchNo" label="批号" min-width="120">
      </el-table-column>
      <el-table-column prop="spec" label="规格" min-width="120">
      </el-table-column>
      <el-table-column prop="warehouseName" label="仓库" width="100">
      </el-table-column>
      <el-table-column prop="storageCode" label="库位" width="120">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="100">
      </el-table-column>
      <!-- <el-table-column prop="level" label="包装来源" width="150">
      </el-table-column> -->
      <el-table-column prop="packageType" label="包装类型" width="150">
      </el-table-column>
      <el-table-column prop="yoke" label="托盘类型" width="150">
      </el-table-column>
      <!-- <el-table-column prop="singleWeight" label="单包净重" width="120">
      </el-table-column> -->
      <el-table-column prop="totalWeight" label="总净重" width="120">
      </el-table-column>
      <el-table-column prop="totalQuantity" label="箱数" width="100">
      </el-table-column>
      <el-table-column prop="autoTotalCount" label="实际箱数" width="100">
      </el-table-column>
      <!-- <el-table-column prop="totalQuantity" label="实际箱数" width="100">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="reading(scope.row)" type="primary" size="small">查看码单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>

    <el-button type="danger" disabled style="float: left;margin-bottom: 20px;">>>漏扫码单</el-button>
    <el-button type="success" style="float: left;margin-bottom: 20px;" @click="addLotNumber()">补入码单</el-button>

    <el-table v-loading="loading1" ref="multipleTable" :data="gridData" border tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%" height="500">
      <!-- <el-table-column prop="id" label="编号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(10*(pageNum-1))}}</span>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="lotNumber" label="码单号" min-width="200">
      </el-table-column>
      <el-table-column prop="batchNo" label="批号" min-width="120">
      </el-table-column>
      <el-table-column prop="spec" label="规格" min-width="120">
      </el-table-column>
      <el-table-column prop="warehouseName" label="仓库" width="100">
      </el-table-column>
      <el-table-column prop="storageCode" label="库位" width="120">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="80">
      </el-table-column>
      <el-table-column prop="packageType" label="包装类型" width="120">
      </el-table-column>
      <el-table-column prop="yoke" label="托盘类型" width="100">
      </el-table-column>
      <el-table-column prop="totalWeight" label="总净重" width="100">
      </el-table-column>
      <el-table-column prop="autoSingleCount" label="箱数" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="readingWaitStocktak(scope.row)" type="primary" size="small">查看码单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LotNumber ref="lotnum"></LotNumber>
    <WaitStocktak ref="WaitStocktak"></WaitStocktak>
  </div>
</template>
<script>
// import {mapActions, mapGetters} from 'vuex'
import moment from 'moment' // 处理时间
import Pagination from '../../../common/pagination'
import LotNumber from './Dialog_lotNumber'
import WaitStocktak from './Dialog_WaitStocktak'
// import menu from './../../common/menuList'
export default {
  components: {
    Pagination,
    LotNumber,
    WaitStocktak
  },
  data () {
    return {
      loading: false,
      loading1: false,
      multipleSelection: [],
      seachForm: { // 搜索列表数据
        batchNo: '', // 批次
        houseId: '', // 仓库id
        level: '',
        classes: '',
        username: '', // 盘点人
        startDate: '', // 开始日期
        endDate: '' // 结束日期
      },
      batchNoOptions: [], // 批号选择列表
      warehouseOptions: [], // 仓库列表
      levelOption: [], // 等级列表
      classesOption: [], // 班次列表
      stocktakingRecordId: '',
      tableData: [], // 列表数据
      gridData: [], // 漏扫列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
      rules: {
        houseId: {required: true, message: '必输项', trigger: 'change'},
        startDate: {required: true, message: '必输项', trigger: 'change'},
        endDate: {required: true, message: '必输项', trigger: 'change'}
      }
    }
  },
  created () {
    // this.getBatchList()
    // this.getSelectWarehouseList()
    this.$api.getBatchList().then(res => {
      this.batchNoOptions = res.data.data
    })
    this.$api.getSelectWarehouseList().then(res => {
      this.warehouseOptions = res.data.data
    })
    this.$api.getDict({key: '班次'}).then(res => {
      console.log(this.classesOption)
      this.classesOption = res.data.data
    })
    this.$api.getDict({key: '等级'}).then(res => {
      console.log(res)
      this.levelOption = res.data.data
    })
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // getBatchList () {
    //   this.$api.getBatchList().then(res => {
    //     this.batchNoOptions = res.data.data
    //   })
    // },
    // getSelectWarehouseList () {
    //   this.$api.getSelectWarehouseList().then(res => {
    //     this.warehouseOptions = res.data.data
    //   })
    // },
    seachTableData (formName) {
      console.log(this.warehouseOptions)
      // this.loading = true
      let houseId
      for (let i = 0; i < this.warehouseOptions.length; i++) {
        if (this.warehouseOptions[i].houseName === this.seachForm.houseId) {
          houseId = this.warehouseOptions[i].id
        }
      }
      console.log(this.seachForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 已扫数据
          this.loading = true
          this.$api.selectStocktakingInfo({
            batchNo: this.seachForm.batchNo,
            houseId: houseId,
            level: this.seachForm.level,
            classes: this.seachForm.classes,
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
          // 漏扫数据
          this.loading1 = true
          this.$api.getWaitStocktakingRecord({
            batchNo: this.seachForm.batchNo,
            houseId: houseId,
            level: this.seachForm.level,
            classes: this.seachForm.classes,
            startDate: this.seachForm.startDate,
            endDate: this.seachForm.endDate,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }).then(res => {
            console.log(res)
            this.loading1 = false
            this.gridData = res.data.data
          })
        } else {
          return false
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData('seachForm')
    },
    reading (row) {
      console.log(row)
      this.$refs.lotnum.show(row.batchNo, row.warehouseName)
    },
    readingWaitStocktak (row) {
      console.log(row)
      this.$refs.WaitStocktak.show(row.warehouseName, row.lotNumber)
    },
    addLotNumber () {
      if (this.multipleSelection.length !== 0) {
        let lotNumber = ''
        this.multipleSelection.forEach(function (v, i) {
          if (i === 0) {
            lotNumber = v.lotNumber
          } else {
            lotNumber = lotNumber + ',' + v.lotNumber
          }
        })
        this.$api.getLotNumberIdInboundList({
          lotNumbers: lotNumber,
          userId: 1
        }).then(res => {
          if (res.data.status === '201') {
            this.$notify({
              type: 'success',
              title: '成功',
              message: res.data.msg
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: res.data.msg
            })
          }
        })
      } else {
        this.$notify({
          type: 'warning',
          title: '错误',
          message: '没有选择补入的码单'
        })
      }
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
