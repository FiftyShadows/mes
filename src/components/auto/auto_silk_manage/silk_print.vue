<template>
  <div>
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-select v-model="formInline.lineId" placeholder="请选择线别" clearable @change="getMachines">
          <el-option v-for="line in lines" :key="line.id" :label="line.name" :value="line.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.lineMachineId" placeholder="请选择机台">
          <el-option v-for="lineMachine in lineMachines" :key="lineMachine.id" :label="lineMachine.line.workshop.name + '-' + lineMachine.line.name + '-' +lineMachine.item" :value="lineMachine.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.doffingNum" placeholder="请输入落次"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.dateTime"
          type="datetime"
          placeholder="选择日期"
          align="right"
          :picker-options="pickerOptions"
          vue-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
        <el-button type="primary" @click="createBar()">生成条码</el-button>
        <el-button type="primary" @click="print()">打印</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="batch.batchNo" label="批号" width="180"></el-table-column>
      <el-table-column prop="batch.spec" label="规格" width="180"></el-table-column>
      <el-table-column prop="lineMachine.item" label="机台位号" width="180"></el-table-column>
      <el-table-column prop="lineMachine.line.name" label="线别" width="180"></el-table-column>
      <el-table-column prop="lineMachine.line.autoDoffing" label="落筒方式" width="180"></el-table-column>
      <el-table-column prop="doffingNum" label="落次" width="180"></el-table-column>
      <el-table-column prop="class" label="班次" width="180"></el-table-column>
      <el-table-column prop="lineMachine.spindleNum" label="锭数" width="180"></el-table-column>
      <!--<el-table-column prop="totalNum" label="总锭数" width="180"></el-table-column>-->
      <el-table-column prop="batch.silkWeight" label="锭重" width="180"></el-table-column>
      <!--<el-table-column prop="printStatus" label="打印状态" width="180"></el-table-column>-->
      <el-table-column prop="codeDate" :formatter="dateFormat" label="日期" width="180"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[20, 50, 100]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
    </el-pagination>
    <create-barcode-dialog :dialogVisible.sync="dialogVisible"></create-barcode-dialog>
  </div>
</template>
<script>
import CreateBarcodeDialog from './create-barcode-dialog'
import moment from 'moment'

export default {
  components: {CreateBarcodeDialog},
  name: 'silkPrint',
  data () {
    return {
      formInline: {
        lineId: '',
        lineMachineId: '',
        doffingNum: '',
        codeTime: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      lines: [],
      lineMachines: [],
      tableData: [],
      currentPage: 5,
      total: 0,
      multipleSelection: [],
      dialogVisible: false
    }
  },
  created () {
    this.getSelected()
  },
  methods: {
    getSelected () { // 获取selet
      this.$api.getSelected().then(res => {
        this.lines = res.data.lines
        this.formInline.lineId = this.lines[0].id
        this.getMachines()
      })
    },
    getMachines () {
      this.$api.getMachines(this.formInline.lineId).then(res => {
        this.lineMachines = res.data
        this.loading = false
      })
    },
    search () {
      console.log(this.formInline)
      let params = {
        lineMachineId: this.formInline.lineMachineId,
        doffingNum: this.formInline.doffingNum,
        codeTime: this.formInline.codeTime
      }
      this.$api.getSilkBarCodes(params).then(res => {
        this.tableData = res.data.silkBarcodes.sort()
        this.total = res.data.count
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    createBar () {
      this.dialogVisible = true
    },
    print () {
      console.log(this.multipleSelection)
    },
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="scss" scoped>
  .form-inline {
    margin-left: -160px;
  }
  .el-input-number {
    width: 130px;
  }
</style>
