<template>
  <div class="detail">
    <el-dialog title="开始盘点" :visible.sync="dialogFormVisible">
      <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="10px" class="demo-ruleForm">
        <!-- <el-form-item label="" prop="Batch">
          <el-select v-model="form.batchNo" filterable clearable placeholder="请选择仓库">
            <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="Batch">
          <el-select v-model="form.batchNo" filterable clearable placeholder="请选择批号">
            <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="Batch">
          <el-select v-model="form.batchNo" filterable clearable placeholder="请选择班次">
            <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="grade">
          <el-input v-model="form.material" placeholder="请输入盘点人"></el-input>
        </el-form-item>
        <el-form-item label="" prop="grade">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="开始入库日期" v-model="form.date1" style="width: 190px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="" prop="grade">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="结束入库日期" v-model="form.date1" style="width: 190px;"></el-date-picker>
          </el-form-item>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      form: {},
      dialogFormVisible: false,
      rules: {}
    }
  },
  methods: {
    show () {
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
