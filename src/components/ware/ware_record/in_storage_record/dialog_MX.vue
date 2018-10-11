<template>
  <el-dialog title="开始盘点" :visible.sync="dialogFormVisible" width="80%">
    <el-form :model="form" :inline="true" ref="form" label-width="10px">
      <el-form-item>
        <el-select v-model="form.transType" filterable clearable placeholder="出入库类型">
          <el-option v-for="item in transTypeOptions" :key="item.id" :label="item.transType" :value="item.transType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.lineName" placeholder="请输入线别"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.lotNumber" placeholder="请输入码单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getGridData()" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table :data="gridData" v-loading="loading" height="400">
      <el-table-column property="lotNumber" label="码单号"></el-table-column>
      <el-table-column property="productTime" :formatter="dateFormat" label="生产日期"></el-table-column>
      <el-table-column property="transDate" :formatter="dateFormat" label="入库日期"></el-table-column>
      <el-table-column property="transType" label="出入库类型"></el-table-column>
      <el-table-column property="transDperator" label="入库员"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div> -->
  </el-dialog>
</template>
<script>
import moment from 'moment' // 处理时间
import Pagination from './../../common/pagination.vue'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      sublotNumber: '',
      form: {
        transType: '',
        lineName: '',
        lotNumber: ''
      },
      rules: {},
      gridData: [],
      transTypeOptions: [],
      dialogFormVisible: false,
      pageNum: 1, // 当前页数
      pageSize: 10, // 默认每页显示条数
      total: 0, // 总数
      loading: false
    }
  },
  methods: {
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.getGridData()
    },
    show (batchNo) {
      console.log(batchNo)
      this.sublotNumber = batchNo
      this.dialogFormVisible = true
      this.selectTransTypeList()
      this.getGridData()
    },
    selectTransTypeList () {
      this.$api.selectTransTypeList({
        sublotNumber: this.sublotNumber
      }).then(res => {
        if (res.data.status === '200') {
          console.log(res)
          this.transTypeOptions = res.data.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    getGridData () {
      this.$api.selectInStorageDetailList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sublotNumber: this.sublotNumber,
        transType: this.form.transType,
        lineName: this.form.lineName,
        lotNumber: this.form.lotNumber
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          // console.log(res.data.data.data)
          if (!res.data.data.data) {
            this.$notify({
              type: 'warning',
              title: '提示',
              message: res.data.data.message
            })
          } else {
            this.gridData = res.data.data.data.list
            this.total = res.data.data.data.total
            console.log(this.gridData)
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: res.data.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
