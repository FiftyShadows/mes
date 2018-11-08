<template>
  <el-dialog title="修改" :visible.sync="dialogAddSingleFormVisible">
    <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm demo-form-inline">
      <el-form-item label="净重" prop="netWeight" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.netWeight" placeholder="请输入净重"></el-input>
      </el-form-item>
      <el-form-item label="毛重" prop="grossWeight" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.grossWeight" placeholder="请输入毛重"></el-input>
      </el-form-item>
      <el-form-item label="入库日期" prop="budat" :label-width="formLabelWidth">
        <el-date-picker class="floatLeft" v-model="addForm.budat" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班次" prop="packageClassId" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.packageClassId" placeholder="请选择班次">
          <el-option v-for="packageClass in packageClasses" :label="packageClass.name" :value="packageClass.id" :key="packageClass.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包装时间" prop="createDateTime" :label-width="formLabelWidth">
        <el-date-picker class="floatLeft" v-model="addForm.createDateTime" type="date" placeholder="选择日期" disabled>
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok('addForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      formLabelWidth: '100px',
      dialogAddSingleFormVisible: false,
      addForm: {
        id: '',
        packageClassId: '', // 班次
        budat: '', // 入库日期
        netWeight: '', // 净重
        grossWeight: '', // 毛重
        createDateTime: ''
      },
      packageClasses: [],
      rules: {
        packageClassId: {required: true, message: '请选择班次', trigger: 'change'},
        budat: {required: true, message: '请选择入库日期', trigger: 'change'},
        netWeight: {required: true, message: '请选择净重', trigger: 'blur'},
        grossWeight: {required: true, message: '请选择毛重', trigger: 'blur'}
      }
    }
  },
  created () {},
  methods: {
    show (row, packageClasses) {
      this.packageClasses = packageClasses
      this.id = row.id
      this.addForm.packageClassId = row.budatClass.id
      this.addForm.budat = row.budat
      this.addForm.netWeight = row.netWeight
      this.addForm.grossWeight = row.grossWeight
      this.addForm.createDateTime = row.createDateTime
      this.dialogAddSingleFormVisible = true
    },
    ok (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.updatePackageBoxes(this.addForm).then(res => {
            this.dialogAddSingleFormVisible = false
          })
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
  width: 200px;
}
</style>
