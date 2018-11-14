<template>
  <div class="detail">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-weight: bolder;margin-bottom: 20px;margin-top: 10px;">
      <el-breadcrumb-item>仓储</el-breadcrumb-item>
      <el-breadcrumb-item>库位库存</el-breadcrumb-item>
      <el-breadcrumb-item>库位明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="seachForm" ref="seachForm" label-width="10px">
      <el-form-item label="" prop="classes" style="float: left;width: 150px;">
        <el-select v-model="seachForm.classes" clearable placeholder="请选择班次">
          <el-option v-for="item in classesOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="houseName" style="float: left;width: 150px;">
        <el-select v-model="seachForm.houseName" clearable placeholder="请选择仓库">
          <el-option v-for="item in houseNameOption" :key="item.id" :label="item.houseName" :value="item.houseName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="line" style="float: left;width: 150px;">
        <el-select v-model="seachForm.line" clearable placeholder="请选择线别">
          <el-option v-for="item in lineOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="level" style="float: left;width: 150px;">
        <el-select v-model="seachForm.level" filterable clearable placeholder="请选择等级">
          <el-option v-for="item in levelOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="Batch" style="float: left;width: 150px;">
        <el-select v-model="seachForm.sublotNumber" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in BatchOption" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="status" style="float: left;width: 150px;">
        <el-select v-model="seachForm.status" filterable clearable placeholder="盘点状态">
          <el-option v-for="item in statusOption" :key="item.id" :label="item.status" :value="item.status"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="createTime" style="float: left;width: 150px;">
         <el-date-picker type="date" placeholder="生产日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="seachForm.createTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="" required style="float: left; width: 300px;">
        <el-col :span="12">
          <el-form-item prop="startTime">
            <el-date-picker type="date" placeholder="入库开始" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="seachForm.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="endTime">
            <el-date-picker type="date" placeholder="入库结束" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="seachForm.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
        <!-- <el-button type="success" icon="el-icon-printer" @click="batchPrint()" circle></el-button> -->
        <!-- <el-button type="warning" icon="el-icon-plus" @click="addSingle()" circle></el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%" height="500"
      stripe
      border
      ref="multipleTable"
      @selection-change="handleSelectionChange">
      <!-- <el-table-column prop="lotNumber" label="库位号" min-width="180">
      </el-table-column> -->
      <el-table-column prop="sublotNumber" label="批号" min-width="120">
      </el-table-column>
      <el-table-column prop="spec" label="规格" min-width="120">
      </el-table-column>
      <el-table-column prop="houseName" label="仓库名称" min-width="120">
      </el-table-column>
      <el-table-column prop="sumCount" label="箱数" width="100">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="100">
      </el-table-column>
      <el-table-column prop="sumNetWeight" label="总净重" width="100">
      </el-table-column>
      <!-- <el-table-column prop="productName" label="包装来源" width="100">
      </el-table-column> -->
      <el-table-column prop="yoke" label="托盘类型" width="100">
      </el-table-column>
      <el-table-column prop="packageType" label="包装类型" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="lotNumber(scope.row)">查看码单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <Dialoglotnumber ref="Dialoglotnumber"></Dialoglotnumber>
  </div>
</template>
<script>
import Pagination from '../../../common/pagination'
import Dialoglotnumber from './Dialog_lotNumber'
import moment from 'moment' // 处理时间
export default {
  components: {
    Pagination,
    Dialoglotnumber
  },
  name: 'detail',
  data () {
    return {
      seachForm: { // 搜索列表数据
        houseName: '', // 仓库
        // printFlag: 'N',
        workshop: '', // 车间
        line: '', // 线别
        classes: '', // 班次
        sublotNumber: '', // 批号
        spec: '', // 规格
        createTime: '',
        level: '', // 等级
        startTime: '',
        endTime: '',
        status: '', // 盘点状态
        pageNum: '',
        pageSize: ''
      },
      statusOption: [],
      sublotNumberOption: [],
      houseNameOption: [],
      workshopOption: [],
      lineOption: [],
      BatchOption: [], // 批号选择列表
      levelOption: [],
      classesOption: [],
      tableData: [], // 列表数据
      multipleSelection: [],
      printData: [],
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
      dialogAddSingleFormVisible: false
    }
  },
  created () {
    this.getData()
    this.seachTableData()
  },
  methods: {
    dateFormat (row) {
      var date = row
      if (date === null || date === '') {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    getData () {
      this.$api.getSelectWorkshop().then(res => {
        // console.log(res)
        this.workshopOption = res.data.data
      })
      this.$api.getBatchList().then(res => {
        // console.log(res)
        this.BatchOption = res.data.data
      })
      this.$api.getDict({key: '班次'}).then(res => {
        // console.log(res)
        this.classesOption = res.data.data
      })
      this.$api.getDict({key: '等级'}).then(res => {
        // console.log(res)
        this.levelOption = res.data.data
      })
      this.$api.getDict({key: '线别'}).then(res => {
        // console.log(res)
        this.lineOption = res.data.data
      })
      this.$api.getHouseNameList().then(res => {
        // console.log(res)
        this.houseNameOption = res.data.data
      })
    },
    seachTableData () {
      console.log(this.seachForm)
      this.seachForm.pageNum = this.pageNum
      this.seachForm.pageSize = this.pageSize
      this.$api.selectAllInboune(this.seachForm).then(res => {
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
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    lotNumber (row) {
      row.startTime = this.seachForm.startTime
      row.endTime = this.seachForm.endTimew
      row.startTime = this.dateFormat(row.startTime)
      row.endTime = this.dateFormat(row.endTime)
      row.createTime = this.dateFormat(row.createTime)
      row.inBoundTime = this.dateFormat(row.inBoundTime)
      row.transDate = this.dateFormat(row.transDate)
      console.log(row)
      this.$refs.Dialoglotnumber.show(row)
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    batchPrint () {
      this.printData = this.multipleSelection
    }
  }
}
</script>
<style lang="scss" scoped>
edit-dialog {
  width: 10px;
}
</style>
