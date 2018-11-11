<!-- 车间生产计划 -->
<template>
  <div class="workshopPlan">
    <el-select v-model="workshopId" clearable placeholder="请选择" @change="getLinePlans()" style="float: left;margin-bottom: 10px;">
      <el-option v-for="workshop in workshops" :key="workshop.name" :label="workshop.name" :value="workshop.id"></el-option>
    </el-select>

    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="line.name" label="线别">
      </el-table-column>
      <el-table-column prop="batch.batchNo" label="批号">
      </el-table-column>
      <el-table-column prop="batch.spec" label="规格">
      </el-table-column>
      <el-table-column prop="batch.tubeColor" label="纸管颜色">
      </el-table-column>
      <el-table-column label="机台">
        <template slot-scope="scope">
          <p :key="machine" v-for="machine in scope.row.machines">{{machine}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="lineMachines.length" label="机台数">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'workshopPlan',
  data () {
    return {
      loading: false,
      workshopId: '',
      tableData: [],
      lineMachines: {}, // 机台数
      MachinesNum: [],
      allData: {},
      workshops: []
    }
  },
  created () {
    this.getPlan()
    this.getLinePlans()
  },
  methods: {
    getPlan () { // 获取select数据
      this.$api.getWorkShopsLine().then(res => {
        this.workshops = res.data
        if (this.workshops.length > 0) {
          this.workshopId = this.workshops[0].id
        }
      })
    },
    getLinePlans () {
      this.loading = true
      this.$api.getLinePlans(this.workshopId).then(res => {
        this.allData = res.data
        this.tableData = res.data.items.sort((x, y) => { return this.util.getNum(x.line.name) - this.util.getNum(y.line.name) })
        for (let j = 0; j < this.tableData.length; j++) {
          this.tableData[j].machines = this.util.divideArray(this.tableData[j].lineMachines.sort((x, y) => { return x.item - y.item }))
        }
        this.loading = false
      })
    }
  }
}
</script>
