<template>
  <el-dialog title="添 加" :visible.sync="dialogAddSingleFormVisible">
    <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm demo-form-inline">
      <el-form-item label="销售类型" prop="salesType" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.salesType" clearable placeholder="请选择销售类型">
          <el-option v-for="item in salesTypeOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批号" prop="batchNo" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.batchNo" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOption" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="sap库位" prop="sapStorage" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.sapStorage" filterable clearable placeholder="请选择sap库位">
          <el-option v-for="item in sapStorageOption" :key="item.id" :label="item.lgobe" :value="item.lgobe"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入库日期" prop="productTime" :label-width="formLabelWidth">
        <el-date-picker class="floatLeft" v-model="addForm.productTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.productName" clearable placeholder="请选择产品名称" @change="choseType()">
          <el-option v-for="item in productNameOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品类型" prop="productType" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.productType" clearable placeholder="请选择产品类型">
          <el-option v-for="item in productTypeOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车间" prop="workshop" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.workshop" clearable placeholder="请选择车间">
          <el-option v-for="item in workshopOption" :key="item.id" :label="item.workshop" :value="item.workshop"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线别" prop="line" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.line" clearable placeholder="请选择线别">
          <el-option v-for="item in lineOption" :key="item.dictValue" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次" prop="classes" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.classes" clearable placeholder="请选择班次">
          <el-option v-for="item in classesOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="level" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.level" clearable placeholder="请选择等级">
          <el-option v-for="item in levelOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="打包方式" prop="packageType" :label-width="formLabelWidth">
        <el-select class="floatLeft" v-model="addForm.packageType" clearable placeholder="请选择打包方式">
          <el-option v-for="item in packageTypeOption" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="净重" prop="netWeight" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.netWeight" clearable placeholder="请输入净重"></el-input>
      </el-form-item>
      <el-form-item label="唛头数量" prop="count" :label-width="formLabelWidth">
        <el-input-number class="floatLeft" v-model="addForm.count" :min="1" label=""></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="规格/管色" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.spec"></el-input>
      </el-form-item>
      <el-form-item label="丝锭数量" prop="silkNum" :label-width="formLabelWidth">
        <el-input-number class="floatLeft" v-model="addForm.silkNum" :min="1" label=""></el-input-number>
      </el-form-item>
      <el-form-item label="生产日期" prop="startData" :label-width="formLabelWidth">
        <el-date-picker class="floatLeft" v-model="addForm.startData" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="毛重" prop="gross" :label-width="formLabelWidth">
        <el-input class="floatLeft" v-model="addForm.gross" placeholder="请输入毛重"></el-input>
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
        salesType: '', // 销售类型
        workshop: '', // 车间
        line: '', // 线别
        classes: '', // 班次
        // finish: '', // 成品
        productType: '', // 成品种类
        productName: '', // 成品名称
        batchNo: '', // 批号
        level: '', // 等级,
        // spec: '', // 规格管色
        // silkNum: '', // 丝锭数量
        // startData: '', // 生产日期
        productTime: '', // 入库日期
        netWeight: '', // 净重
        // gross: '', // 毛重
        packageType: '', // 打包方式
        sapStorage: '', // sap库位
        // readyStorage: '', // 预设库位
        count: '' // 唛头数量
      },
      salesTypeOption: [],
      batchNoOption: [],
      sapStorageOption: [],
      productNameOption: [],
      productTypeOption: [],
      workshopOption: [],
      lineOption: [],
      classesOption: [],
      levelOption: [],
      packageTypeOption: [],
      rules: {
        salesType: {required: true, message: '请选择销售类型', trigger: 'change'},
        classes: {required: true, message: '请选择班次', trigger: 'change'},
        workshop: {required: true, message: '请选择车间', trigger: 'change'},
        line: {required: true, message: '请选择线别', trigger: 'change'},
        productName: {required: true, message: '请选择成品名称', trigger: 'change'},
        productType: {required: true, message: '请选择成品种类', trigger: 'change'},
        productTime: {required: true, message: '请选择入库日期', trigger: 'change'},
        batchNo: {required: true, message: '请选择批号', trigger: 'change'},
        level: {required: true, message: '请选择等级', trigger: 'change'},
        packageType: {required: true, message: '请选择打包方式', trigger: 'change'},
        // startData: {required: true, message: '请选择生产日期', trigger: 'change'},
        // storageData: {required: true, message: '请选择入库日期', trigger: 'change'},
        netWeight: {required: true, message: '请输入净重', trigger: 'blur'},
        // gross: {required: true, message: '请选择毛重', trigger: 'blur'},
        sapStorage: {required: true, message: '请选择sap库位', trigger: 'change'},
        // readyStorage: {required: true, message: '请选择预设库位', trigger: 'change'},
        marksNum: {required: true, message: '请选择唛头数量', trigger: 'change'}
      }
    }
  },
  created () {
    this.getSelectData()
  },
  methods: {
    getSelectData () {
      this.$api.getDict({key: '销售类型'}).then(res => {
        this.salesTypeOption = res.data.data
      })
      this.$api.getDict({key: '产品名称'}).then(res => {
        this.productNameOption = res.data.data
      })
      this.$api.getDict({key: '班次'}).then(res => {
        this.classesOption = res.data.data
      })
      this.$api.getDict({key: '等级'}).then(res => {
        this.levelOption = res.data.data
      })
      this.$api.getDict({key: '打包方式'}).then(res => {
        this.packageTypeOption = res.data.data
      })
      this.$api.getDict({key: '线别'}).then(res => {
        // console.log(res)
        this.lineOption = res.data.data
      })
      this.$api.getBatchList().then(res => {
        // console.log(res)
        this.batchNoOption = res.data.data
      })
      this.$api.getselectSapStorage().then(res => {
        // console.log(res)
        this.sapStorageOption = res.data.data
      })
      this.$api.getSelectWorkshop().then(res => {
        // console.log(res)
        this.workshopOption = res.data.data
      })
    },
    choseType () {
      this.$api.getDict({key: this.addForm.productName}).then(res => {
        // console.log(res)
        this.productTypeOption = res.data.data
      })
    },
    show () {
      this.dialogAddSingleFormVisible = true
    },
    ok (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          this.$api.addBarcode(this.addForm).then(res => {
            // console.log(res)
            if (res.data.status === '200') {
              this.$notify({
                type: 'success',
                title: '成功',
                message: res.data.msg
              })
              this.dialogAddSingleFormVisible = false
            } else {
              this.$notify.error({
                title: '失败',
                message: res.data.msg
              })
            }
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
  // float: left;
  width: 200px;
}
</style>
