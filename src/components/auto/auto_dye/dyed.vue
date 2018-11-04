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
  <div v-for="(dyedResult, index) in dyedResults" :key="index">
    <dyed-result-component
      :key="index"
      :dyedResult="dyedResult"
      :dyedResults="dyedResults"
      v-loading="loading"
      style="margin-top: 10px">
    </dyed-result-component>
  </div>
  <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
</div>
</template>
<script>
import dyedResult from './dyed-result-component'
import Pagination from '../../common/pagination.vue'

export default {
  name: 'dyed',
  components: {
    'Pagination': Pagination,
    'dyed-result-component': dyedResult
  },
  data () {
    return {
      total: 0,
      pageSize: 50,
      pageNum: 1,
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
      dyedResults: [],
      loading: false
    }
  },
  created () {
    this.getWorkShops()
  },
  methods: {
    search () {
      this.loading = true
      let params = {
        startDate: this.startDate,
        endDate: this.endDate,
        first: (this.pageNum - 1) * this.pageSize,
        pageSize: this.pageSize
      }
      this.$api.getDyedResults(params).then(res => {
        this.dyedResults = res.data.dyeingPrepares
        this.total = res.data.dyeingPrepares.length
        this.loading = false
      })
    },
    // 获取车间
    getWorkShops () {
      this.$api.getWorkShopsLine().then(res => {
        this.workshops = res.data
        this.workshop = this.workshops[0].id
      })
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData('seachForm')
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
