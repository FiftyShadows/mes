<template>
<div class="dyed">
  <el-row type="flex" :gutter="20">
    <el-col :span="1" class="checkAll">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    </el-col>
    <el-col :span="3">
      <el-input v-model="userId" placeholder="请输入丝车编号" class="userId"></el-input>
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
  <template scope="" v-for="silkCar in silkCars">
    <el-row type="flex" :gutter="20" :key="silkCar">
      <el-col :span="1" class="checkbox">
        <el-checkbox v-model="silkCar.checkFlag" @change="handleCheckedSilkCarsChange" style="margin-top: 150px"></el-checkbox>
      </el-col>
      <el-col :span="22" style="margin-left: -10px">
        <el-card  class="card">
          <div slot="header" class="clearfix">
            <el-row type="flex" :gutter="20">
              <el-col :span="6" class="span">
                <span>落筒时间</span>
              </el-col>
              <el-col :span="6" class="value">
                <div>{{silkCar.doffingTime}}</div>
              </el-col>
              <el-col :span="6" class="span">
                <span>织袜时间</span>
              </el-col>
              <el-col :span="6" class="value">
                <span>{{silkCar.StockingTime}}</span>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="span">
                <span>批号</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.batchNumber}}</span>
              </el-col>
              <el-col :span="3" class="span">
                <span>线别</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.line}}</span>
              </el-col>
              <el-col :span="3" class="span">
                <span>位号</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.item}}</span>
              </el-col>
              <el-col :span="3" class="span">
                <span>落次</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.fallOrder}}</span>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="span">
                <span>织袜类型</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.StockingType}}</span>
              </el-col>
              <el-col :span="3" class="span">
                <span>织袜工号</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.userId}}</span>
              </el-col>
              <el-col :span="3" class="span">
                <span>落筒方式</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.doffingType}}</span>
              </el-col>
              <el-col :span="3" class="span">
                <span>丝车号</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.silkCarCode}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="silkCar">
            <el-row type="flex" :gutter="20">
              <el-col :span="1" class="span">
                <span>A</span>
              </el-col>
              <el-col :span="11" class="span">
                <silckcode-com :rows="rows" :cols="cols" :silkDetail="silkDetail"></silckcode-com>
              </el-col>
              <el-col :span="1" class="span">
                <span>B</span>
              </el-col>
              <el-col :span="11" class="span">
                <silckcode-com :rows="rows" :cols="cols" :silkDetail="silkDetail"></silckcode-com>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </template>
</div>
</template>
<script>
import silckcode from './silckcode'
export default {
  name: 'dyed',
  components: {
    'silckcode-com': silckcode
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
      rows: 4, // 丝车行数
      cols: 4, // 丝车列数
      isIndeterminate: false,
      silkCars: [
        {
          silkCarCode: '3000F2202',
          StockingTime: this.util.getCurrentFormatDateSE().startTime,
          batchNumber: 'D30111',
          line: 'D1',
          item: '1',
          fallOrder: 'C1',
          StockingType: '一次织袜',
          userId: '1000',
          doffingType: '',
          doffingTime: this.util.getCurrentFormatDateSE().startTime,
          value: '车1',
          checkFlag: false
        },
        {
          silkCarCode: '3000F2221',
          StockingTime: this.util.getCurrentFormatDateSE().startTime,
          batchNumber: 'D30112',
          line: 'D2',
          item: '2',
          fallOrder: 'C2',
          StockingType: '二次织袜',
          userId: '1000',
          doffingType: '',
          doffingTime: this.util.getCurrentFormatDateSE().startTime,
          value: '车1',
          checkFlag: false
        }],
      silkDetail: {
        note: '测试'
      },
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
      console.log('提交')
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
    handleCheckedSilkCarsChange (val) {
      let countChecked = 0
      this.silkCars.forEach((item) => {
        if (item.checkFlag) {
          countChecked++
        }
      })
      if (countChecked === this.silkCars.length) {
        this.checkAll = true
        this.isIndeterminate = false
      } else if (countChecked === 0) {
        this.checkAll = false
        this.isIndeterminate = false
      } else {
        this.isIndeterminate = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .dyed {
    width: 100%;
    height: 95%;
    .node-sass {
    }
    .card {
      margin-top: 10px;
      border: chocolate;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .span {
      text-align: right;
      background: #eef2f6;
      border: 1px solid #d9dfe5;
    }
    .value {
      text-align: left;
      border: 1px solid #d9dfe5;
    }
    .silkCar {
      margin-top: -10px;
      text-align: center;
      .span {
        /*margin-left: 10px;*/
        padding: 10px;
      }
    }
    .checkbox{
      border: 1px solid #d9dfe5;
      background: white;
      margin-top: 10px;
    }
    .checkAll{
      margin-top: 10px;
    }
  };
</style>
