<template>
  <!-- 暂存箱管理 -->
  <div class="boxManagement">
    <el-form :model="seachForm" :rules="rules" ref="seachForm" label-width="10px" class="demo-ruleForm">
      <el-form-item label="" class="floatLeft" prop="workshop">
        <el-select v-model="seachForm.workshop" placeholder="请选择车间">
          <el-option label="A" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" class="floatLeft" prop="lines">
        <el-select v-model="seachForm.code" placeholder="请选择暂存箱号">
          <el-option label="A" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" class="floatLeft" prop="Batch">
        <el-select v-model="seachForm.Batch" filterable placeholder="请输入批号">
          <el-option v-for="item in BatchOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
        <el-button type="success" icon="el-icon-printer" circle></el-button>
        <el-button type="warning" icon="el-icon-plus" @click="addbox()" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" height="500" stripe>
      <el-table-column fixed prop="workshop" label="车间">
      </el-table-column>
      <el-table-column prop="code" label="暂存箱号">
      </el-table-column>
      <el-table-column prop="name" label="成品">
      </el-table-column>
      <el-table-column prop="batch" label="批号">
      </el-table-column>
      <el-table-column prop="grade" label="等级" width="100">
      </el-table-column>
      <el-table-column prop="color" label="数量" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-add ref="add_dialog"></dialog-add>
  </div>
</template>
<script>
import Dialogadd from './dialog-add-boxManagement.vue'
export default {
  name: 'boxManagement',
  components: {
    'dialog-add': Dialogadd
  },
  data () {
    return {
      seachForm: { // 搜索列表数据
        code: '', // 暂存箱号
        workshop: '', // 车间
        Batch: '' // 批号
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
        date2: { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      }
    }
  },
  methods: {
    addbox () {
      this.$refs.add_dialog.show()
    },
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
  width: 180px;
}
</style>
