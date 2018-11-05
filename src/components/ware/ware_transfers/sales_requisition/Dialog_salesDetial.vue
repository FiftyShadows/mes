<template>
  <el-dialog title="调拨单明细" :visible.sync="dialogTableVisible" width="80%">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="label">发货日期</span>
          <el-tag v-if="hyRequisition.requisitionId" size="mini" class="tag">{{hyRequisition.requisitionId}}</el-tag>
          <!-- <el-tag v-if="nowDate.outboundDate" size="mini" class="tag">{{nowDate.hyRequisition.outboundDate}}</el-tag> -->
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <span class="label">发货仓库</span>
          <el-tag v-if="lgort" size="mini" class="tag">{{lgort}}</el-tag>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="label">车牌号</span>
          <el-tag v-if="hyRequisition.plateNumber" size="mini" class="tag">{{hyRequisition.plateNumber}}</el-tag>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <span class="label">共享托盘</span>
          <el-checkbox v-model="nowDate.isUseSharedPallet" class="tag"></el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="label">装运点</span>
          <el-tag v-if="hyRequisition.loading_spot" size="mini" class="tag">{{hyRequisition.loading_spot}}</el-tag>
          <!-- <span style="color: red;font-size: 12px;">(必选项)</span> -->
          <!-- <el-select v-model="value" clearable placeholder="装运点" size="mini" class="tag">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select> -->
        </div>
      </el-col>
      <!-- <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <span class="label">发货分配</span>
          <el-tag type="info" size="mini" class="tag">888899faihfluiawhfluhalwfehawiue9</el-tag>
        </div>
      </el-col> -->
    </el-row>
    <el-table :data="gridData" tooltip-effect="dark" border>
      <el-table-column property="productName" label="成品名称"></el-table-column>
      <el-table-column property="productType" label="成品类型"></el-table-column>
      <el-table-column property="batchNo" label="批号" width="120"></el-table-column>
      <el-table-column property="special" label="规格" width="120"></el-table-column>
      <el-table-column property="level" label="等级"></el-table-column>
      <el-table-column property="netWeight" label="净重"></el-table-column>
      <el-table-column property="count" label="数量"></el-table-column>
      <el-table-column property="salesMan" label="销售员"></el-table-column>
      <el-table-column property="lgort" label="仓储点"></el-table-column>
      <el-table-column property="material" label="物料号" min-width="180"></el-table-column>
      <el-table-column property="order_type" label="订单类型" width="120"></el-table-column>
      <el-table-column property="createTime" :formatter="dateFormat" label="同步时间" min-width="200"></el-table-column>
      <el-table-column property="modifiedTime" :formatter="dateFormat" label="修改时间" min-width="200"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saleAllotPrint()">打印调拨单</el-button>
      <el-button type="primary">提 交</el-button>
    </span>
    <Dialogprint ref="dialogSaleAllotPrint"></Dialogprint>
  </el-dialog>
</template>
<script>
import Dialogprint from './dialog-print-sale-allot' // 调拨单打印
import moment from 'moment' // 处理时间
export default {
  components: {
    Dialogprint
  },
  props: [],
  data () {
    return {
      nowDate: {
        isUseSharedPallet: false // 共享托盘
      },
      hyRequisition: {},
      lgort: '', // 发货仓库
      gridData: [],
      dialogTableVisible: false,
      options: [], // 装运点列表
      value: '',
      printData: []
    }
  },
  methods: {
    show (row) {
      console.log(row)
      this.nowDate = row
      this.nowDate.hyRequisition.outboundDate = moment(this.nowDate.hyRequisition.outboundDate).format('YYYY-MM-DD')
      this.lgort = row.hyRequisitionDetailList[0].lgort // 发货仓库
      this.gridData = row.hyRequisitionDetailList
      this.hyRequisition = this.nowDate.hyRequisition
      this.dialogTableVisible = true
    },
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === null) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    saleAllotPrint () {
      this.$api.stampAllocation({
        id: this.nowDate.hyRequisition.id,
        type: 'ALLOTTED'
      }).then(res => {
        console.log(res)
        this.printData.push(this.nowDate)
        this.$refs.dialogSaleAllotPrint.print(this.printData)
        this.printData = []
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.label {
  font-weight: bolder;
}
.tag {
  margin-left: 20px;
}
</style>
