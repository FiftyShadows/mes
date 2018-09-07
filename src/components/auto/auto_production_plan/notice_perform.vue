<template>
  <div class="noticePerform">
    <h2 style="text-align: left;">{{notice.name}}</h2>
    <el-button type="danger" class="closeBth" @click="finishNotice()">结 束</el-button>
    <!-- <el-button type="primary" class="performNotice" @click="finishNotice()">查看已执行</el-button> -->
    <el-card class="box-card">
      <div class="text item">类型: {{notice.type}}</div>
      <div class="text item">批号: {{batchNo}}</div>
      <div class="text item">开始日期: {{startDate}}</div>
    </el-card>
    <el-table :data="tableData" border :stripe="true" @selection-change="handleSelectionChange" style="width: 100%" height="500">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="line.workshop.name" label="车间">
      </el-table-column>
      <el-table-column prop="line.name" label="线别">
      </el-table-column>
      <el-table-column prop="item" label="机台">
      </el-table-column>
      <el-table-column prop="name" label="当前生产通知单">
      </el-table-column>
      <el-table-column prop="startDate" label="开始执行时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.startDate" type="primary" @click="perform(scope.row)" size="small">执行</el-button>
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
      tableData: [],
      batchNo: ''

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
        this.performNotices = res.data.lineMachineProductPlans // 已执行
        this.tableData = res.data.productPlanNotify.lineMachines // 未执行
        this.notice = res.data.productPlanNotify
        this.batchNo = this.notice.batch.batchNo

        if (this.notice.type === 'CHANGE_BATCH') {
          this.notice.type = '改批'
        } else if (this.notice.type === 'SAMPLE') {
          this.notice.type = '样品'
        }

        for (let i = 0; i < this.performNotices.length; i++) {
          for (let j = 0; j < this.tableData.length; j++) {
            if (this.performNotices[i].lineMachine.id === this.tableData[j].id) {
              this.tableData[j].startDate = this.performNotices[i].startDate
              this.tableData[j].name = this.performNotices[i].productPlanNotify.name
            }
          }
        }

        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].startDate) {
            let date = new Date(this.tableData[i].startDate)
            let Y = date.getFullYear() + '-'
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            let D = date.getDate() + ' '
            let H = date.getHours() + ':'
            let m = date.getMinutes() + ' '
            this.tableData[i].startDate = Y + M + D + H + m
          }
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
      }).catch(() => {})
    },
    perform (row) {
      console.log(row)
      row.extra = {
        canExe: true
      }
      let form = {}
      form.lineMachine = row
      form.id = this.notice.id
      this.$api.exeNotices(form).then(res => {
        console.log(res)
        if (res.errorCode !== 'E00000') {
          this.$notify({
            title: '成功',
            message: '开始执行',
            type: 'success'
          })
          this.getPerform()
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
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
 .performNotice {
   position: absolute;
   top: 70px;
   right: 100px;
 }
</style>
