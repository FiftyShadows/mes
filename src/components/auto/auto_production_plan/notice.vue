<!-- 通知单 -->
<template>
<div class="notice">
  <div style="float: left; margin-bottom: 10px;">
    <el-input v-model="q" placeholder="请输入内容..." style="width: 200px;"></el-input>
    <el-button type="primary" icon="el-icon-search" circle @click="getNotice()" ></el-button>
  </div>
  <el-button type="primary" @click="openAddNotice()" style="float: right; margin-bottom: 10px;">新 增</el-button>
  <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
    <el-table-column fixed prop="type" label="类型">
    </el-table-column>
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="batch.batchNo" label="批号">
    </el-table-column>
    <el-table-column prop="startDate" label="开始日期">
    </el-table-column>
    <el-table-column prop="endDate" label="结束日期">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button @click="openSaveNotice(scope.row)" type="text" size="small">修 改</el-button>
        <el-button @click="perform(scope.row)" type="text" size="small">执行情况</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" 
    :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
  </el-pagination>
</div>
</template>
<script>
export default {
  name: 'notice',
  data () {
    return {
      tableData: [],
      pageSize: 20,
      first: 0,
      q: '',
      total: 0,
      currentPage: 5
    }
  },
  created () {
    this.getNotice()
  },
  methods: {
    getNotice () {
      this.$api.getNotices({
        pageSize: this.pageSize,
        first: this.first,
        q: this.q
      }).then(res => {
        this.total = res.data.count
        this.tableData = res.data.productPlanNotifies
        for (let i = 0; i < this.tableData.length; i++) {
          let sdate = new Date(this.tableData[i].startDate);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = sdate.getFullYear() + '-';
          let M = (sdate.getMonth()+1 < 10 ? '0'+(sdate.getMonth()+1) : sdate.getMonth()+1);
          let D = '-' + sdate.getDate();
          this.tableData[i].startDate = Y + M + D

          let edate = new Date(this.tableData[i].endDate);
          let eY = edate.getFullYear() + '-';
          let eM = (edate.getMonth()+1 < 10 ? '0'+(edate.getMonth()+1) : edate.getMonth()+1);
          let eD = '-' + edate.getDate();
          this.tableData[i].endDate = eY + eM + eD

          if (this.tableData[i].type === 'CHANGE_BATCH') {
            this.tableData[i].type = '改批'
          } else if (this.tableData[i].type === 'SAMPLE') {
            this.tableData[i].type = '样品'
          }

          // let str = this.tableData[i].name
          // let pat = /[A-Za-z0-9]+$/
          // this.tableData[i].spec = str.match(pat)
        }
      })
    },
    openAddNotice () {},
    openSaveNotice (row) {},
    perform (row) {
      console.log(row)
      this.$router.push({path: '/productPlan/Notice-perform', query: {id: row.id, startDate: row.startDate}})
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getNotice (this.pageSize, this.first, this.q)
    },
    handleCurrentChange(val) {
      this.first = (--val)*this.pageSize
      this.getNotice (this.pageSize, this.first, this.q)
    }
  }
}
</script>
