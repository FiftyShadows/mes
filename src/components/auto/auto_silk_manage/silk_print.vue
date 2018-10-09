<template>
  <div>
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-input v-model="formInline.line" placeholder="请选择线别"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.batch" placeholder="请选择批号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.class" placeholder="请选择班次"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.dateTime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
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
      <el-table-column prop="batch" label="批号" width="180"></el-table-column>
      <el-table-column prop="spec" label="规格" width="180"></el-table-column>
      <el-table-column prop="lineMachine" label="机台位号" width="180"></el-table-column>
      <el-table-column prop="line" label="线别" width="180"></el-table-column>
      <el-table-column prop="doffingType" label="落筒方式" width="180"></el-table-column>
      <el-table-column prop="fallOrder" label="落次" width="180"></el-table-column>
      <el-table-column prop="class" label="班次" width="180"></el-table-column>
      <el-table-column prop="spindleNum" label="锭数" width="180"></el-table-column>
      <el-table-column prop="totalNum" label="总锭数" width="180"></el-table-column>
      <el-table-column prop="silkWeight" label="锭重" width="180"></el-table-column>
      <el-table-column prop="printStatus" label="打印状态" width="180"></el-table-column>
      <el-table-column prop="productTime" label="打印时间" width="180"></el-table-column>
    </el-table>
    <create-barcode-dialog :dialogVisible.sync="dialogVisible"></create-barcode-dialog>
  </div>
</template>
<script>
import CreateBarcodeDialog from './create-barcode-dialog'

export default {
  components: {CreateBarcodeDialog},
  name: 'silkPrint',
  data () {
    return {
      formInline: {
        line: '',
        batch: '',
        class: '',
        dateTime: ''
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
      tableData: [
        {
          batch: '1',
          spec: '1',
          lineMachine: '1',
          line: '1',
          doffingType: '',
          fallOrder: '',
          class: '',
          spindleNum: '',
          totalNum: '',
          silkWeight: '',
          printStatus: '',
          productTime: ''
        }
      ],
      multipleSelection: [],
      dialogVisible: false
    }
  },
  created () {
  },
  methods: {
    search () {
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    createBar () {
      this.dialogVisible = true
    },
    print () {}
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
