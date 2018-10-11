<template>
  <el-dialog title="修改" :visible.sync="dialogAddSingleFormVisible">
    <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm demo-form-inline">
      <!--<el-form-item label="销售类型" prop="type" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.type" placeholder="请选择销售类型">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="车间" prop="workshop" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.workshop" placeholder="请选择车间">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="线别" prop="lines" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.lines" placeholder="请选择线别">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="成品" prop="finish" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.finish" placeholder="请选择成品">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="成品种类" prop="productType" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.productType" placeholder="请选择成品">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="批号" prop="batch" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.batch" placeholder="请选择销售类型" disabled>-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="等级" prop="grade" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.grade" placeholder="请选择等级" disabled>-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="规格/管色" :label-width="formLabelWidth">-->
        <!--<el-input class="floatLeft" v-model="addForm.spec" disabled></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="丝锭数量" prop="silkNum" :label-width="formLabelWidth">-->
        <!--<el-input-number class="floatLeft" v-model="addForm.silkNum" :min="1" label=""></el-input-number>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="生产日期" prop="startData" :label-width="formLabelWidth">-->
        <!--<el-date-picker class="floatLeft" v-model="addForm.startData" type="date" placeholder="选择日期">-->
        <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <el-form-item label="净重" prop="net" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.net" placeholder="请输入净重"></el-input>
      </el-form-item>
      <el-form-item label="毛重" prop="gross" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.gross" placeholder="请输入毛重"></el-input>
      </el-form-item>
      <el-form-item label="入库日期" prop="storageData" :label-width="formLabelWidth">
        <el-date-picker class="floatLeft" v-model="addForm.storageData" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班次" prop="class" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.class" placeholder="请选择班次">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="sap库位" prop="sapStorage" :label-width="formLabelWidth">-->
        <!--<el-input class="floatLeft" v-model="addForm.sapStorage" placeholder="请输入sap库位"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="预设库位" prop="readyStorage" :label-width="formLabelWidth">-->
        <!--<el-select class="floatLeft" v-model="addForm.readyStorage" placeholder="请选择预设库位">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!-- <el-form-item label="唛头数量" prop="marksNum" :label-width="formLabelWidth">
        <el-input-number class="floatLeft" v-model="addForm.marksNum" :min="1" label=""></el-input-number>
      </el-form-item> -->
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
        // type: '', // 销售类型
        // workshop: '', // 车间
        // lines: '', // 线别
        class: '', // 班次
        // finish: '', // 成品
        // productType: '', // 成品种类
        // batch: '', // 批号
        // grade: '', // 等级,
        // spec: '', // 规格管色
        // silkNum: '', // 丝锭数量
        // startData: '', // 生产日期
        storageData: '', // 入库日期
        net: '', // 净重
        gross: '' // 毛重
        // sapStorage: '', // sap库位
        // readyStorage: '' // 预设库位
        // marksNum: '' // 唛头数量
      },
      rules: {
        // type: {required: true, message: '请选择销售类型', trigger: 'change'},
        class: {required: true, message: '请选择班次', trigger: 'change'},
        // workshop: {required: true, message: '请选择车间', trigger: 'change'},
        // lines: {required: true, message: '请选择线别', trigger: 'change'},
        // finish: {required: true, message: '请选择成品', trigger: 'change'},
        // productType: {required: true, message: '请选择成品种类', trigger: 'change'},
        // batch: {required: true, message: '请选择批号', trigger: 'change'},
        // grade: {required: true, message: '请选择等级', trigger: 'change'},
        // silkNum: {required: true, message: '请输入丝锭数量', trigger: 'change'},
        // startData: {required: true, message: '请选择生产日期', trigger: 'change'},
        storageData: {required: true, message: '请选择入库日期', trigger: 'change'},
        net: {required: true, message: '请选择净重', trigger: 'blur'},
        gross: {required: true, message: '请选择毛重', trigger: 'blur'}
        // sapStorage: {required: true, message: '请选择sap库位', trigger: 'blur'},
        // readyStorage: {required: true, message: '请选择预设库位', trigger: 'change'},
        // marksNum: {required: true, message: '请选择唛头数量', trigger: 'change'}
      }
    }
  },
  created () {},
  methods: {
    show (row) {
      this.addForm.class = row.class
      this.addForm.storageData = row.storageData
      this.addForm.net = row.netWeight
      this.addForm.gross = row.roughWeight
      this.dialogAddSingleFormVisible = true
    },
    ok (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
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
