<!-- 车间生产计划 -->
<template>
  <div class="workshopPlan">
    <el-select v-model="seachName" clearable placeholder="请选择" @change="getLinePlans()" style="float: left;margin-bottom: 10px;">
      <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name"></el-option>
    </el-select>

    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="line.name" label="线别">
      </el-table-column>
      <el-table-column prop="batch.batchNo" label="批号">
      </el-table-column>
      <el-table-column prop="batch.spec" label="规格">
      </el-table-column>
      <el-table-column prop="batch.tubeColor" label="纸管颜色">
      </el-table-column>
      <el-table-column prop="" label="机台">
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
      seachName: '',
      seachId: '',
      LinesTable: [],
      tableData: [],
      lineMachines: {}, // 机台数
      MachinesNum: '',
      allData: {},
      options: {}
    }
  },
  created () {
    this.getPlan()
  },
  methods: {
    getPlan () { // 获取select数据
      this.$api.getWorkShopsLine().then(res => {
        console.log(res)
        this.LinesTable = res.data
        this.options = res.data.map(item => {
          return {name: item.name}
        })
        console.log(this.options)
      })
    },
    getLinePlans () {
      for (let i = 0; i < this.options.length; i++) {
        if (this.LinesTable[i].name === this.seachName) {
          this.seachId = this.LinesTable[i].id
        }
      }
      this.$api.getLinePlans(this.seachId).then(res => {
        // console.log(res)
        this.allData = res.data
        this.tableData = res.data.items
        this.tableData.MachinesNum = this.tableData.lineMachines

        // this.lineMachines = this.tableData.map(machine => {
        //   return machine.lineMachines
        // })
        // console.log(this.lineMachines)
      })
    }
  }
}
</script>
