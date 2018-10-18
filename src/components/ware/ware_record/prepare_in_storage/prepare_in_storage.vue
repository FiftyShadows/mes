<template>
  <div class="prepare">
    <el-form :model="seachForm" ref="seachForm" label-width="10px">
      <el-form-item label="" prop="houseName" class="floatLeft">
        <el-select v-model="seachForm.houseName" filterable clearable placeholder="请选择仓库">
          <el-option v-for="item in houseNameList" :key="item.houseName" :label="item.houseName" :value="item.houseName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="Batch" class="floatLeft">
        <el-select v-model="seachForm.sublotNumber" filterable clearable placeholder="请选择批号">
          <el-option v-for="item in batchNoOptions" :key="item.batchNo" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="productName" class="floatLeft">
        <el-select v-model="seachForm.productName" filterable clearable placeholder="请选择品名">
          <el-option v-for="item in productOptions" :key="item.productName" :label="item.productName" :value="item.productName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="lotNumber" class="floatLeft">
        <el-input v-model="seachForm.lotNumber" placeholder="请输入码单号"></el-input>
      </el-form-item>
      <el-form-item label="" class="floatLeft">
        <el-form-item prop="startTime">
          <el-date-picker type="date" placeholder="开始日期" v-model="seachForm.startTime" style="width: 190px;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="" class="floatLeft">
        <el-form-item prop="endTime">
          <el-date-picker type="date" placeholder="结束日期" v-model="seachForm.endTime" style="width: 190px;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button type="primary" icon="el-icon-search" @click="seachTableData()" circle></el-button>
        <el-button type="primary" @click="openStorage()">入库</el-button>
        <el-button type="warning">修改</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" tooltip-effect="dark" border @selection-change="handleSelectionChange" style="width: 100%" height="500" stripe>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="houseName" label="仓库" width="120">
      </el-table-column>
      <el-table-column prop="lotNumber" label="码单" width="80">
      </el-table-column>
      <el-table-column prop="sublotNumber" label="批号" width="250">
      </el-table-column>
      <el-table-column prop="materialtext" label="规格" min-width="300">
      </el-table-column>
      <el-table-column prop="productType" label="成品类型" width="100">
      </el-table-column>
      <el-table-column prop="level" label="等级" width="150">
      </el-table-column>
      <el-table-column prop="yoke" label="托盘类型" width="150">
      </el-table-column>
      <el-table-column prop="packageType" label="包装类型" width="150">
      </el-table-column>
      <el-table-column prop="spec" label="打包时间" width="150">
      </el-table-column>
    </el-table>
    <DialogStorage ref="dialog_storage"></DialogStorage>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
  </div>
</template>
<script>
// import {mapActions, mapGetters} from 'vuex'
import DialogStorage from './Dialog_in_storage'
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    Pagination,
    DialogStorage
  },
  data () {
    return {
      loading: false,
      seachForm: { // 搜索列表数据
        sublotNumber: '', // 批次
        houseName: '', // 仓库
        productName: '', // 品名
        startTime: '',
        endTime: '',
        lotNumber: '' // 码单号
      },
      batchNoOptions: [], // 批号选择列表
      houseNameList: [], // 仓库列表
      productOptions: [], // 品名列表
      tableData: [], // 列表数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0 // 总数
    }
  },
  created () {
    this.getHouseNameList()
    this.getSelectOublotNumberList()
    this.getSelectProductNameList()
    this.seachTableData()
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
    getSelectOublotNumberList () {
      this.$api.getSelectOublotNumberList({
        houseName: this.seachForm.houseName
      }).then(res => {
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
    getSelectProductNameList () {
      this.$api.getSelectProductNameList({
        houseName: this.seachForm.houseName,
        sublotNumber: this.seachForm.sublotNumber
      }).then(res => {
        if (res.data.status === '200') {
          this.productOptions = res.data.data
          // console.log()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    seachTableData () {
      this.loading = true
      this.$api.getPageInroundRecordList({
        sublotNumber: this.seachForm.sublotNumber,
        houseName: this.seachForm.houseName,
        lotNumber: this.seachForm.lotNumber,
        startTime: this.seachForm.startTime,
        endTime: this.seachForm.endTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.loading = false
        if (res.data.status === '200') {
          this.tableData = res.data.data.data.list
          this.total = res.data.data.data.total
          // console.log(this.tableData)
        } else {
          this.$notify.error({
            title: '失败',
            message: res.data.msg
          })
        }
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData()
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    openStorage () {
      this.$refs.dialog_storage.show()
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
