<template>
<div>
  <el-dialog title="调拨单明细" :visible.sync="dialogTableVisible" width="80%">
    <el-table :data="gridData">
      <el-table-column property="batchNo" label="批号"></el-table-column>
      <el-table-column property="special" label="规格"></el-table-column>
      <el-table-column property="level" label="等级"></el-table-column>
      <el-table-column property="material" label="物料号" width="150"></el-table-column>
      <el-table-column property="deliveryWeight" label="应扫"></el-table-column>
      <el-table-column property="actualWeight" label="实扫"></el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="start()">开始拣配</el-button>
      <el-button type="success" v-if="pickFinish" @click="finish()">完成拣配</el-button>
    </div>
  </el-dialog>
  <DialogStart ref="DialogStart" @seachtabledata="seachTableData"></DialogStart>
</div>
</template>
<script>
import DialogStart from './Dialog_startPick'
import Pagination from '../../../common/pagination.vue'
export default {
  components: {
    Pagination,
    DialogStart
  },
  data () {
    return {
      gridData: [],
      dialogTableVisible: false,
      loading: false,
      pageNum: 0,
      pageSize: 10,
      total: 0,
      requisitionId: '',
      pickFinish: false
    }
  },
  methods: {
    show (row) {
      this.pickFinish = false
      this.requisitionId = row.requisitionId
      this.seachTableData(this.requisitionId)
      this.dialogTableVisible = true
    },
    start () {
      this.$refs.DialogStart.start(this.requisitionId)
    },
    finish () {
      this.$api.pickFinish({
        deliveryBill: this.requisitionId,
        type: 'PICKUP'
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.$notify({
            type: 'success',
            title: '成功',
            message: res.data.msg
          })
          this.dialogTableVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    seachTableData (value) {
      this.$api.selectDeliveryDetail({
        requisitionId: value,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.data.status === '200') {
          this.gridData = res.data.data.list
          this.total = res.data.data.total
          for (let i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].deliveryWeight === this.gridData[i].actualWeight) {
              this.pickFinish = true
            }
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData(this.requisitionId)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
