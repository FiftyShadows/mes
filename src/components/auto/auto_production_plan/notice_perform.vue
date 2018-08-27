<template>
  <div class="noticePerform">
    <h2 style="text-align: left;">{{notice.name}}</h2>
    <el-card class="box-card">
      <div class="text item">类型: {{notice.type}}</div>
      <div class="text item">批号: {{notice.batch.batchNo}}</div>
      <div class="text item">开始日期: {{startDate}}</div>
    </el-card>
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
      console.log(this.noticeId)
      this.$api.getPerforms(this.noticeId).then(res => {
        console.log(res)
        this.notice = res.data.productPlanNotify
        this.tableData = res.data.lineMachineProductPlans
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

