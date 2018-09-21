<template>
  <el-dialog title="新 增" :visible.sync="dialogAddFormVisible">
    <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm demo-form-inline">
      <el-form-item label="暂存箱编号" prop="code" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.code" placeholder="请选择暂存箱编号">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车间" prop="workshop" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.workshop" placeholder="请选择车间">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线别" prop="lines" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.lines" placeholder="请选择线别">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批号" prop="batch" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.batch" placeholder="请选择销售类型">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="grade" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.grade" placeholder="请选择等级">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格/管色" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.spec" disabled></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAddFormVisible = false">取 消</el-button>
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
      addForm: {
        code: '', // 暂存箱编号
        workshop: '', // 车间
        lines: '', // 线别
        batch: '', // 批号
        grade: '', // 等级
        spec: '' // 规格管色
      },
      rules: {
        code: {required: true, message: '请选择暂存箱编号', trigger: 'change'},
        workshop: {required: true, message: '请选择车间', trigger: 'change'},
        lines: {required: true, message: '请选择线别', trigger: 'change'},
        batch: {required: true, message: '请选择批号', trigger: 'change'},
        grade: {required: true, message: '请选择等级', trigger: 'change'}
      }
    }
  },
  created () {},
  methods: {
    show () {
      this.dialogAddFormVisible = true
    },
    add (formName) {
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
  // float: left;
  width: 200px;
}
</style>
