<template>
  <div class="noticePerform">
    <h2 style="text-align: left;">{{notice.name}}</h2>
    <el-button type="danger" class="closeBth" @click="finishNotice()">结 束</el-button>
    <el-card class="box-card">
      <div class="text item">类型: {{notice.type}}</div>
      <div class="text item">批号: {{notice.batch.batchNo}}</div>
      <div class="text item">开始日期: {{startDate}}</div>
    </el-card>
    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
      <el-table-column prop="batch.workshop.name" label="车间">
      </el-table-column>
      <el-table-column prop="lineMachine.line.name" label="线别">
      </el-table-column>
      <el-table-column prop="lineMachine.item" label="机台">
      </el-table-column>
      <el-table-column prop="productPlanNotify.name" label="当前生产通知单">
      </el-table-column>
      <el-table-column prop="startDate" label="开始执行时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <!-- <el-button @click="openSaveNotice(scope.row)" type="text" size="small">修 改</el-button> -->
          <!-- <el-button @click="perform(scope.row)" type="text" size="small">执行情况</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'noticePerform',
  data () {
    return {
      noticeId: this.$route.query.id,
      startDate: this.$route.query.startDate,
      notice: {},
      tableData: []
    }
  },
  created () {
    console.log(this.$route.query)
    this.getPerform()
  },
  methods: {
    getPerform () {
      // console.log(this.noticeId)
      this.$api.getPerforms(this.noticeId).then(res => {
        console.log(res)
        this.notice = res.data.productPlanNotify
        this.tableData = res.data.lineMachineProductPlans
        for (let i = 0; i < this.tableData.length; i++) {
          let date = new Date(this.tableData[i].startDate);
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
          let D = date.getDate() + ' '
          let H = date.getHours() + ':'
          let m = date.getMinutes() + ' '
          this.tableData[i].startDate = Y + M + D + H + m
        }
      })
    },
    finishNotice () {
      this.$confirm('此操作将结束执行计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.finishNotice(this.noticeId).then(res => {
          console.log(res)
          this.$notify({
            title: '成功',
            message: '执行已结束',
            type: 'success'
          })
          this.$router.back()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .text {
    margin-top: 10px;
    font-size: 18px;
    text-align: left;
 }
 .closeBth {
   position: absolute; 
   top: 70px; 
   right: 20px;
 }
</style>

