<!-- 车间生产计划 -->
<template>
  <div class="workshopPlan">
    <el-select v-model="seachName" clearable placeholder="请选择" @change="getLinePlans()" style="float: left;margin-bottom: 10px;">
      <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
        <template itemscope>
          <span :key="machine" v-for="machine in machines"><br/>{{machine}}aaa</span>
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
      seachName: 'A车间',
      seachId: '',
      LinesTable: [],
      tableData: [],
      lineMachines: {}, // 机台数
      MachinesNum: [],
      allData: {},
      options: {}
    }
  },
  created () {
    this.getPlan()
    this.getLinePlans()
  },
  methods: {
    getPlan () { // 获取select数据
      this.$api.getWorkShopsLine().then(res => {
        this.LinesTable = res.data
        this.options = res.data.map(item => {
          return {name: item.name}
        })
      })
    },
    getLinePlans () {
      this.loading = true
      for (let i = 0; i < this.options.length; i++) {
        if (this.LinesTable[i].name === this.seachName) {
          this.seachId = this.LinesTable[i].id
        }
      }
      this.$api.getLinePlans(this.seachId).then(res => {
        this.allData = res.data
        this.tableData = res.data.items.sort((x, y) => { return x.id - y.id })
        console.log(this.tableData)
        console.log(this.util.divideArray(this.tableData[0].lineMachines.sort((x, y) => { return x.item - y.item })))
        for (let j = 0; j < this.tableData.length; j++) {
          this.tableData[j].machines = this.util.divideArray(this.tableData[j].lineMachines.sort((x, y) => { return x.item - y.item }))
        }
        this.loading = false
      })
    }
  }
}
</script>
