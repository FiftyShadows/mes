<template>
  <div>
    <el-form :model="seachForm" :rules="rules" ref="seachForm" label-width="10px" class="demo-ruleForm">
      <el-form-item label="" class="floatLeft" prop="workshop">
        <el-select v-model="seachForm.workshop" placeholder="请选择车间">
          <el-option label="A" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="lines" class="floatLeft">
        <el-select v-model="seachForm.lines" placeholder="请选择线别">
          <el-option label="A" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="shift" class="floatLeft">
        <el-select v-model="seachForm.shift" placeholder="请选择班次">
          <el-option label="A" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="Batch" class="floatLeft">
        <el-select v-model="seachForm.Batch" filterable placeholder="请输入批号">
          <el-option v-for="item in BatchOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="spec" class="floatLeft">
        <el-select v-model="seachForm.spec" filterable placeholder="请输入规格">
          <el-option v-for="item in BatchOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="grade" class="floatLeft">
        <el-input v-model="seachForm.grade" placeholder="请输入等级"></el-input>
      </el-form-item>
      <el-form-item label="" required style="float: left; width: 300px;">
        <el-col :span="12">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="seachForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="10">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="seachForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
        <el-button type="success" icon="el-icon-printer" circle @click="batchPrint()"></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%" height="1000"
      stripe
      border
      ref="multipleTable"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column fixed prop="code" label="码单号">
      </el-table-column>
      <el-table-column prop="name" label="成品">
      </el-table-column>
      <el-table-column prop="batch" label="批号">
      </el-table-column>
      <el-table-column prop="spec" label="规格">
      </el-table-column>
      <el-table-column prop="grade" label="等级" width="100">
      </el-table-column>
      <el-table-column prop="color" label="管色" width="120">
      </el-table-column>
      <el-table-column prop="netWeight" label="净重" width="100">
      </el-table-column>
      <el-table-column prop="roughWeight" label="毛重" width="100">
      </el-table-column>
      <el-table-column prop="silkNum" label="丝锭数" width="100">
      </el-table-column>
      <el-table-column prop="class" label="班次" width="100">
      </el-table-column>
      <el-table-column prop="date" label="包装时间">
      </el-table-column>
    </el-table>
    <print-marks :printData="printData"></print-marks>
  </div>
</template>
<script>
import printMarks from '../../../common/print_marks'
export default {
  name: 'have_to_print',
  components: {
    'print-marks': printMarks
  },
  data () {
    return {
      seachForm: { // 搜索列表数据
        workshop: '', // 车间
        lines: '', // 线别
        shift: '', // 班次
        Batch: '', // 批号
        spec: '', // 规格
        grade: '', // 等级
        date1: '',
        date2: ''
      },
      BatchOptions: [], // 批号选择列表
      tableData: [
        {
          code: '020320180621000C71017C22005',
          name: 'POY',
          batch: 'C71017',
          spec: '185dtex*144mm',
          grade: 'AA',
          color: '黑色',
          netWeight: '744',
          roughWeight: '780',
          silkNum: '',
          class: '乙',
          date: '2018-06-22 13:44'
        },
        {
          code: '020320180621000C71017C22006',
          name: 'POY',
          batch: 'C71017',
          spec: '185dtex*144mm',
          grade: 'AA',
          color: '黑色',
          netWeight: '744',
          roughWeight: '780',
          silkNum: '',
          class: '乙',
          date: '2018-06-22 13:44'
        },
        {
          code: '020320180621000C71017C22007',
          name: 'POY',
          batch: 'C71017',
          spec: '185dtex*144mm',
          grade: 'AA',
          color: '黑色',
          netWeight: '744',
          roughWeight: '780',
          silkNum: '',
          class: '乙',
          date: '2018-06-22 13:44'
        }
      ], // 列表数据
      printData: [],
      multipleSelection: [],
      rules: {
        workshop: { required: true, message: '请选择车间', trigger: 'change' },
        lines: { required: true, message: '请选择线别', trigger: 'change' },
        shift: { required: true, message: '请选择班次', trigger: 'change' },
        Batch: { required: true, message: '请选择批号', trigger: 'change' },
        spec: { required: true, message: '请选择规格', trigger: 'change' },
        grade: { required: true, message: '请选择等级', trigger: 'change' },
        date1: { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
        date2: { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      }
    }
  },
  methods: {
    seachTableData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    batchPrint () {
      let selection = this.util.deepClone(this.multipleSelection)
      this.$nextTick(() => {
        this.printData = selection
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.floatLeft {
  float: left;
  width: 150px;
}
</style>
