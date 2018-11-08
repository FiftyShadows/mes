<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="float: left;">
      <span class="operator">{{eventSource.operator.name}}</span>
      <span class="operator">{{eventSource.operator.hrId}}</span>
      <br>
      <i>{{this.util.formatDate(eventSource.fireDateTime, 'yyyy-MM-dd hh:mm:ss')}}</i>
      </span>
      <el-button style="float: right;" type="warning" size="mini">标样丝提交</el-button>
    </div>
    <div class="silkRuntimes" v-if="eventSource.silkRuntimes&&eventSource.silkRuntimes.length>0">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭信息</el-tag>
      <el-table :data="eventSource.silkRuntimes" style="width: 100%" border>
        <el-table-column label="位置" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.sideType}}-{{scope.row.row}}-{{scope.row.col}}</span>
          </template>
        </el-table-column>
        <el-table-column label="丝锭条码">
          <template slot-scope="scope">
            <span>{{scope.row.silk.id}}</span>
          </template>
        </el-table-column>
      </el-table>
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
  created () {
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
