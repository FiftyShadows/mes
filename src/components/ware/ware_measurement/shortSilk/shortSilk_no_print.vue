<template>
  <div>
    <el-form :model="seachForm" ref="seachForm" label-width="10px">
      <el-form-item label="" prop="workshop" style="float: left;width: 150px;">
        <el-select v-model="seachForm.workshop" clearable placeholder="请选择车间">
          <el-option v-for="item in workshopOption" :key="item.id" :label="item.workshop" :value="item.workshop"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="line" style="float: left;width: 150px;">
        <el-select v-model="seachForm.line" clearable placeholder="请选择线别">
          <el-option v-for="item in lineOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="classes" style="float: left;width: 150px;">
        <el-select v-model="seachForm.classes" clearable placeholder="请选择班次">
          <el-option v-for="item in classesOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="level" style="float: left;width: 150px;">
        <el-select v-model="seachForm.level" filterable clearable placeholder="请输入等级">
          <el-option v-for="item in levelOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="Batch" style="float: left;width: 150px;">
        <el-select v-model="seachForm.Batch" filterable clearable placeholder="请输入批号">
          <el-option v-for="item in BatchOption" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" required style="float: left; width: 300px;">
        <el-col :span="12">
          <el-form-item prop="startDate">
            <el-date-picker type="date" placeholder="开始日期" v-model="seachForm.startDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="endDate">
            <el-date-picker type="date" placeholder="结束日期" v-model="seachForm.endDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
        <el-button type="success" icon="el-icon-printer" @click="batchPrint()" circle></el-button>
        <el-button type="warning" icon="el-icon-plus" @click="addSingle()" circle></el-button>
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
      <el-table-column prop="lotNumber" label="码单号" min-width="180">
      </el-table-column>
      <el-table-column prop="sublotNumber" label="批号" min-width="120">
      </el-table-column>
      <el-table-column prop="productName" label="品名" width="100">
      </el-table-column>
      <el-table-column prop="productType" label="种类" width="100">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="100">
      </el-table-column>
      <el-table-column prop="classes" label="班次" width="100">
      </el-table-column>
      <el-table-column prop="netWeight" label="净重" width="100">
      </el-table-column>
      <el-table-column prop="productTime" :formatter="dateFormat" label="入库时间" min-width="120">
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope)">计量</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <add-dialog ref="add_dialog"></add-dialog>
    <DialogPrint :printData="printData"></DialogPrint>
  </div>
</template>
<script>
import DialogAddShourtSilk from './Dialog-addShourtSilk'
import DialogPrint from './Dialog-staple-fiber-print'
import Pagination from '../../../common/pagination'
import moment from 'moment' // 处理时间
export default {
  name: 'artificial_have_to_print',
  components: {
    'add-dialog': DialogAddShourtSilk,
    Pagination,
    DialogPrint
  },
  data () {
    return {
      seachForm: { // 搜索列表数据
        printFlag: 'N',
        workshop: '', // 车间
        line: '', // 线别
        classes: '', // 班次
        batchNo: '', // 批号
        // spec: '', // 规格
        level: '', // 等级
        startDate: '',
        endDate: '',
        page: '',
        pageSize: ''
      },
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
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
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
        console.log(res)
        this.lineOption = res.data.data
      })
    },
    seachTableData () {
      console.log(this.seachForm)
      this.seachForm.page = this.pageNum
      this.seachForm.pageSize = this.pageSize
      this.$api.getSelectCode(this.seachForm).then(res => {
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
    addSingle () {
      this.$refs.add_dialog.show()
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
