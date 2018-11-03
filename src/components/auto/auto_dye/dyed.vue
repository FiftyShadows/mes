<template>
<div class="dyed">
  <el-row type="flex" :gutter="20">
    <el-col :span="3">
      <el-select v-model="workshop" clearable placeholder="请选择车间">
        <el-option v-for="workshop in workshops" :key="workshop.id" :label="workshop.name" :value="workshop.id"></el-option>
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-input v-model="userId" placeholder="请输入丝车编号" class="userId"></el-input>
    </el-col>
    <el-col :span="5">
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="请选择染判开始日期"
        align="right"
        :picker-options="pickerOptions1"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-col>
    <el-col :span="5">
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="请选择染判结束日期"
        align="right"
        :picker-options="pickerOptions1"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-col>
    <el-button icon="el-icon-search" type="primary" @click="search()"></el-button>
  </el-row>
  <div v-for="(dyeingResult, index) in dyeingResults" :key="index">
    <dyeing-result-component
      :index="index"
      :key="index"
      v-loading="loading"
      :dyeingResult="dyeingResult"
      style="margin-top: 10px">
    </dyeing-result-component>
  </div>
</div>
</template>
<script>
import dyeingResult from './dyeing-result-component'
export default {
  name: 'dyed',
  components: {
    'dyeing-result-component': dyeingResult
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
      workshops: [],
      workshop: '',
      userId: '',
      startDate: this.util.getNowFormatDate(),
      endDate: this.util.getNowFormatDate(),
      dyeingResults: []
    }
  },
  created () {
    this.getWorkShops()
  },
  methods: {
    search () {
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        first: 0,
        pageSize: 50
      }
      this.$api.getDyeingResults(params).then(res => {
        this.dyeingResults = res.data
      })
    },
    // 获取车间
    getWorkShops () {
      this.$api.getWorkShopsLine().then(res => {
        this.workshops = res.data
        this.workshop = this.workshops[0].id
      })
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
  .tag{
    position: absolute;
    top: 10px;
    left: 0;
    width: 0;
    height: 0;
    color: #fff;
    border: 15px solid #ff0000;
    border-bottom-color: transparent;
    border-right-color: transparent;
    span{
      width: 24px;
      display: block;
      font-size: 12px;
      margin-left: -15px;
      margin-top: -15px;
      transform: rotateZ(-45deg);
    }
  }
</style>
