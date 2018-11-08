<template>
  <el-card class="box-card event-source">
    <div slot="header" class="clearfix">
    <span style="float: left;">
    <span class="operator">{{eventSource.operator.name}}</span>
    <span class="operator">{{eventSource.operator.hrId}}</span>
    <br>
    <i>{{this.util.formatDate(eventSource.fireDateTime, 'yyyy-MM-dd hh:mm:ss')}}</i>
    </span>
      <el-button style="float: right;" type="warning" size="mini">位与位交叉织袜</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['eventSource'],
  data () {
    return {
    }
  },
  watch: {
    eventSource (value) {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // 操作员信息
      this.$api.getOperators(this.eventSource.operator.id).then(res => {
        this.eventSource.operator = res.data
      })
    }
  }
}
</script>
<style>
</style>
