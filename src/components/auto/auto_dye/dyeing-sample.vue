<!-- 标样丝管理界面 -->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item style="float:left;">
        <el-select v-model="searchForm.batchId" filterable remote reserve-keyword placeholder="请输入批号" :remote-method="remoteMethod" :loading="loading" style="float:left;">
          <el-option v-for="batch in batches" :key="batch.id" :label="batch.batchNo" :value="batch.batchNo"></el-option>
        </el-select>
        <el-input v-model="batchNo" placeholder="请输入批号"></el-input>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="silk.batch.batchNo" label="批号" width="180"></el-table-column>
      <el-table-column prop="silk.batch.spec" label="规格" width="180"></el-table-column>
      <el-table-column prop="silk.batch.tubeColor" label="管色" width="180"></el-table-column>
      <el-table-column prop="silk.lineMachine.line.name" label="线别" width="180"></el-table-column>
      <el-table-column prop="silk.lineMachine.item" label="位号"></el-table-column>
      <el-table-column prop="silk.lineMachine.spindleNum" label="总锭数"></el-table-column>
      <el-table-column prop="silk.lineMachine.spindleNum" label="剩余锭数"></el-table-column>
      <el-table-column prop="createDateTime" label="日期" width="180"></el-table-column>
    </el-table>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
  </div>
</template>
<script>
import Pagination from '../../common/pagination.vue'
export default {
  name: 'dyeingSample',
  components: {
    'Pagination': Pagination
  },
  data () {
    return {
      total: 0,
      pageSize: 50,
      pageNum: 1,
      batchNo: '',
      batches: [],
      loading: false
    }
  },
  created () {
  },
  methods: {
    getSearchData () {
      let params = {}
      this.$api.getDyeingSample(params).then(res => {
        this.tableData = res.data.dyeingSamples
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.$api.getBatches({
          pageSize: 10,
          first: 0,
          q: query
        }).then(res => {
          if (res.errorCode === 'E00000') {
            this.$message.error(res.errorMessage)
          } else {
            this.loading = false
            this.batches = res.data.batches
          }
        })
      } else {
        this.batches = []
      }
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .dyed {
    width: 100%;
    height: 95%;
    .node-sass {
    }
    .card {
      margin-top: 10px;
      border: chocolate;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .span {
      text-align: right;
      background: #eef2f6;
      border: 1px solid #d9dfe5;
    }
    .value {
      text-align: left;
      border: 1px solid #d9dfe5;
    }
    .silkCar {
      margin-top: -10px;
      text-align: center;
      .span {
        /*margin-left: 10px;*/
        padding: 10px;
      }
    }
    .checkbox{
      border: 1px solid #d9dfe5;
      background: white;
      margin-top: 10px;
    }
    .checkAll{
      margin-top: 10px;
    }
  };
  .tag{
    position: absolute;
    top: 10px;
    left: 0;
    width: 0;
    height: 0;
    color: #fff;
    border: 15px solid #ff0000;
    border-bottom-color: transparent;
    border-right-color: transparent;
    span{
      width: 24px;
      display: block;
      font-size: 12px;
      margin-left: -15px;
      margin-top: -15px;
      transform: rotateZ(-45deg);
    }
  }
</style>
