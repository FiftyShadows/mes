<template>
  <div class="packaging_records">
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
        <el-select v-model="seachForm.comefrom" placeholder="请选择来源">
          <el-option label="A" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" required style="float: left; width: 300px;">
        <el-col :span="12">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="开始日期" v-model="seachForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col class="line" :span="2">-</el-col> -->
        <el-col :span="12">
          <el-form-item prop="date2">
            <el-date-picker type="date" placeholder="结束日期" v-model="seachForm.date2" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
        <!-- <el-button type="success" icon="el-icon-printer" circle></el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" height="500" stripe>
      <el-table-column fixed prop="code" label="码单号">
      </el-table-column>
      <el-table-column prop="workshop" label="车间">
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
      <el-table-column prop="name" label="净重" width="100">
      </el-table-column>
      <el-table-column prop="name" label="毛重" width="100">
      </el-table-column>
      <el-table-column prop="silkNum" label="丝锭数" width="100">
      </el-table-column>
      <el-table-column prop="name" label="包装班次" width="100">
      </el-table-column>
      <el-table-column prop="" label="托盘类型" width="100">
      </el-table-column>
      <el-table-column prop="" label="包装来源" width="100">
      </el-table-column>
      <el-table-column prop="date" label="包装时间">
      </el-table-column>
      <el-table-column prop="" label="包装工">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'packaging_records',
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
        date2: '',
        comefrom: '' // 包装来源
      },
      BatchOptions: [], // 批号选择列表
      tableData: [], // 列表数据
      rules: {
        workshop: { required: true, message: '请选择车间', trigger: 'change' },
        lines: { required: true, message: '请选择线别', trigger: 'change' },
        shift: { required: true, message: '请选择班次', trigger: 'change' },
        Batch: { required: true, message: '请选择批号', trigger: 'change' },
        spec: { required: true, message: '请选择规格', trigger: 'change' },
        grade: { required: true, message: '请选择等级', trigger: 'change' },
        date1: { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
        date2: { type: 'date', required: true, message: '请选择时间', trigger: 'change' },
        comefrom: { required: true, message: '请选择包装来源', trigger: 'change' }
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
