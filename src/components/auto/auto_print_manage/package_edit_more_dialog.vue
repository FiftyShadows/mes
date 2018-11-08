<template>
  <el-dialog title="批 量 修 改" :visible.sync="dialogAddFormVisible" width="400px">
    <el-form :model="addForm" :rules="rules" ref="addForm">
      <el-form-item label="入库日期" prop="budat" :label-width="formLabelWidth">
        <el-date-picker class="floatLeft" v-model="addForm.budat" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班次" prop="packageClassId" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.packageClassId" placeholder="请选择班次">
          <el-option v-for="packageClass in packageClasses" :label="packageClass.name" :value="packageClass.id" :key="packageClass.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="add('addForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      formLabelWidth: '100px',
      dialogAddFormVisible: false,
      packageClasses: [],
      addForm: {
        packageClassId: '', // 班次
        budat: '' // 入库日期
      },
      selected: [],
      rules: {
        packageClassId: {required: true, message: '请选择班次', trigger: 'change'},
        budat: {required: true, message: '请选择入库日期', trigger: 'change'}
      }
    }
  },
  created () {},
  methods: {
    show (selected, packageClasses) {
      this.packageClasses = packageClasses
      this.selected = selected
      this.dialogAddFormVisible = true
      // this.addForm.packageClassId = row.budatClass.id
      // this.addForm.budat = row.budat
    },
    add (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            packageBoxes: this.selected,
            budat: this.addForm.budat,
            packageClassId: this.packageClassId
          }
          this.$api.batchUpdatePackageBoxes(params).then(res => {
            this.dialogAddFormVisible = false
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
  float: left;
  width: 200px;
}
</style>
