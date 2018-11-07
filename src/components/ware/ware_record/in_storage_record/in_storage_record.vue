<template>
  <div class="prepare">
    <el-form :model="seachForm" :rules="rules" ref="seachForm" label-width="10px" class="demo-ruleForm">
      <el-form-item label="" prop="houseName" class="floatLeft">
        <el-select v-model="seachForm.houseName" filterable clearable placeholder="请选择仓库">
          <el-option v-for="item in houseNameList" :key="item.houseName" :label="item.houseName" :value="item.houseName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="Batch" class="floatLeft">
        <el-select v-model="seachForm.batchNo" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="productName" class="floatLeft">
        <el-select v-model="seachForm.productName" filterable clearable placeholder="请选择品名">
          <el-option v-for="item in productOptions" :key="item.productName" :label="item.productName" :value="item.productName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="classes" class="floatLeft">
        <el-select v-model="seachForm.classes" filterable clearable placeholder="请选择班次">
          <el-option v-for="item in classesOptions" :key="item.id" :label="item.classes" :value="item.classes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="level" class="floatLeft">
        <el-select v-model="seachForm.level" filterable clearable placeholder="请选择等级">
          <el-option v-for="item in levelOptions" :key="item.id" :label="item.level" :value="item.level"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="" prop="lotNumber" class="floatLeft">
        <el-input v-model="seachForm.lotNumber" placeholder="请输入码单号"></el-input>
      </el-form-item> -->
      <el-form-item label="" class="floatLeft">
        <el-date-picker v-model="seachForm.productTime" type="date" placeholder="选择生产日期" style="width: 190px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="" prop="startTime" class="floatLeft">
        <el-date-picker v-model="seachForm.startTime" type="date" placeholder="选择开始入库时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 190px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="" prop="endTime" class="floatLeft">
        <el-date-picker v-model="seachForm.endTime" type="date" placeholder="选择结束入库时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 190px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData('seachForm')" circle></el-button>
        <!-- <el-button type="primary">入库</el-button>
        <el-button type="warning">修改</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" tooltip-effect="dark" border @selection-change="handleSelectionChange" style="width: 100%" height="500" stripe>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="houseName" label="仓库" width="120">
      </el-table-column>
      <!-- <el-table-column prop="lotNumber" label="码单" width="80">
      </el-table-column> -->
      <el-table-column prop="sublotNumber" label="批号" width="150">
      </el-table-column>
      <el-table-column prop="spec" label="规格" min-width="150">
      </el-table-column>
      <el-table-column prop="count" label="箱数" width="100">
      </el-table-column>
      <el-table-column prop="storageName" label="库位号" width="120">
      </el-table-column>
      <el-table-column prop="sumWeight" label="总重量" width="120">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="150">
      </el-table-column>
      <el-table-column prop="yoke" label="托盘类型" width="150">
      </el-table-column>
      <el-table-column prop="packageType" label="包装类型" width="150">
      </el-table-column>
      <!-- <el-table-column prop="spec" label="打包时间" width="150">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="primary" @click="openDetil(scope.row)" size="small">码单明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <DialogMX ref="detail"></DialogMX>
  </div>
</template>
<script>
// import {mapActions, mapGetters} from 'vuex'
import DialogMX from './dialog_MX'
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    Pagination,
    DialogMX
  },
  data () {
    return {
      loading: false,
      seachForm: { // 搜索列表数据
        batchNo: '', // 批次
        houseName: '', // 仓库
        productName: '', // 品名
        classes: '', // 班次
        level: '', // 等级
        productTime: '', // 生产日期
        startTime: '',
        endTime: '',
        lotNumber: '' // 码单号
      },
      batchNoOptions: [], // 批号选择列表
      houseNameList: [], // 仓库列表
      productOptions: [], // 品名列表
      classesOptions: [], // 班次列表
      levelOptions: [], // 等级列表
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
      rules: {
        // startTime: {required: true, message: '必输项', trigger: 'change'},
        // endTime: {required: true, message: '必输项', trigger: 'change'}
      }
    }
  },
  computed: {
  },
  created () {
    this.getHouseNameList()
    this.getSelectBatchNoList()
    this.getSelectProductList()
    this.getSelectClassesList()
    this.getSelectLevelList()
  },
  mounted () {
  },
  methods: {
    getHouseNameList () {
      this.$api.getHouseNameList().then(res => {
        if (res.data.status === '200') {
          this.houseNameList = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    getSelectBatchNoList () {
      this.$api.selectBatchNoList().then(res => {
        if (res.data.status === '200') {
          console.log(res)
          this.batchNoOptions = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    getSelectProductList () {
      this.$api.selectProductList().then(res => {
        if (res.data.status === '200') {
          this.productOptions = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    getSelectClassesList () {
      this.$api.selectClassesList().then(res => {
        if (res.data.status === '200') {
          console.log(res)
          this.classesOptions = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    getSelectLevelList () {
      this.$api.selectLevelList().then(res => {
        if (res.data.status === '200') {
          console.log(res)
          this.levelOptions = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    seachTableData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.getPageInroundRecordList({
            classes: this.seachForm.classes,
            houseName: this.seachForm.houseName,
            sublotNumber: this.seachForm.batchNo,
            productName: this.seachForm.productName,
            startTime: this.seachForm.startTime,
            endTime: this.seachForm.endTime,
            productTime: this.seachForm.productTime,
            level: this.seachForm.level,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            synSap: 'Y' // 待入库为N，已入库为Y
          }).then(res => {
            console.log(res)
            this.loading = false
            if (res.data.status === '200') {
              // console.log(res.data.data.data)
              if (!res.data.data.data) {
                this.$notify({
                  type: 'warning',
                  title: '提示',
                  message: res.data.data.message
                })
              } else {
                this.tableData = res.data.data.data.list
                this.total = res.data.data.data.total
              }
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
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData('seachForm')
    },
    openDetil (row) { // 打开码单明细
      this.$refs.detail.show(row.sublotNumber)
    },
    handleSelectionChange (val) {
      console.log(val)
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
