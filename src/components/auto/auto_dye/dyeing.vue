<template>
  <div class="dyeing">
    <el-row type="flex" :gutter="20">
      <el-col :span="1" class="checkAll">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </el-col>
      <el-col :span="3">
        <el-input v-model="userId" placeholder="请输入织袜工号" class="userId"></el-input>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="请选择织袜开始时间"
          align="right"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="请选择织袜结束时间"
          align="right"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-col>
      <el-button icon="el-icon-search" type="primary" @click="search()"></el-button>
      <el-button @click="batchSubmit()" type="primary">提交</el-button>
    </el-row>
    <template v-for="(silkCar, index) in silkCars">
      <silk-car-component @changeIsIndeterminate="changeIsIndeterminate" :silkCars="silkCars" :index="index" :silkCar="silkCar" :key="index" style="margin-top: 10px"></silk-car-component>
    </template>
  </div>
</template>
<script>
import silkCarComponent from './silkCar-component'
export default {
  name: 'dyeing',
  components: {
    'silk-car-component': silkCarComponent
  },
  data () {
    return {
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      userId: '',
      startTime: this.util.getCurrentFormatDateSE().startTime,
      endTime: this.util.getCurrentFormatDateSE().endTime,
      isIndeterminate: false,
      silkCars: [
        {// 1次织袜一车一位的demo
          id: 1,
          rows: 4, // 丝车行数
          cols: 4, // 丝车列数
          silkCarCode: '3000F2200',
          StockingTime: this.util.getCurrentFormatDateSE().startTime,
          batchNumber: 'D30111',
          line: 'D1',
          itemFallOrders: ['1/C1'],
          StockingType: '单织',
          userId: '1000',
          doffingType: '自动落筒',
          doffingTime: this.util.getCurrentFormatDateSE().startTime,
          value: '车1',
          checkFlag: false,
          num: 1,
          silkDetail: {
            note: '测试'
          }
        },
        {// 1次织袜一车多位的demo
          id: 2,
          rows: 4, // 丝车行数
          cols: 6, // 丝车列数
          silkCarCode: '3000F2201',
          StockingTime: this.util.getCurrentFormatDateSE().startTime,
          batchNumber: 'D30112',
          line: 'D2',
          itemFallOrders: ['1/C1', '2/C2', '3/C3', '4/C4'],
          StockingType: '位与位',
          userId: '1000',
          doffingType: '自动落筒',
          doffingTime: this.util.getCurrentFormatDateSE().startTime,
          value: '车1',
          checkFlag: false,
          num: 1,
          silkDetail: {
            note: '测试'
          }
        },
        {// 多次织袜（拼车）
          id: 3,
          rows: 4, // 丝车行数
          cols: 6, // 丝车列数
          silkCarCode: '3000F2201',
          StockingTime: this.util.getCurrentFormatDateSE().startTime,
          batchNumber: 'D30112',
          line: 'D2',
          itemFallOrders: ['1/C1'],
          StockingType: '单织',
          userId: '1000',
          doffingType: '自动落筒',
          doffingTime: this.util.getCurrentFormatDateSE().startTime,
          value: '车1',
          checkFlag: false,
          num: 3,
          silkDetail: {
            note: '测试'
          }
        }],
      checkedSilkCars: [],
      checkAll: false
    }
  },
  created () {},
  methods: {
    search () {
      console.log('搜索')
    },
    batchSubmit () {
      console.log('批次提交')
    },
    handleCheckAllChange (val) {
      if (val) {
        this.silkCars.forEach((item) => {
          item.checkFlag = true
        })
        this.isIndeterminate = false
      } else {
        this.silkCars.forEach((item) => {
          item.checkFlag = false
        })
      }
    },
    changeIsIndeterminate (val) {
      this.isIndeterminate = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .dyeing {
    width: 105%;
    height: 95%;
  }
</style>
