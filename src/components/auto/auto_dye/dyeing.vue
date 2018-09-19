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
      <el-button icon="el-icon-search" @click="search()"></el-button>
    </el-row>
          <template scope="" v-for="silkCar in silkCars">
              <el-row type="flex" :gutter="20" :key="silkCar">
                <el-col :span="1" class="checkbox">
                  <el-checkbox v-model="silkCar.checkFlag" style="margin-top: 150px"></el-checkbox>
                </el-col>
                <el-col :span="22" style="margin-left: -10px">
                  <el-card  class="card">
                    <div slot="header" class="clearfix">
                      <el-row type="flex" :gutter="20">
                        <el-col :span="6" class="span">
                          <span>丝车号</span>
                        </el-col>
                        <el-col :span="6" class="value">
                          <div>111</div>
                        </el-col>
                        <el-col :span="6" class="span">
                          <span>织袜时间</span>
                        </el-col>
                        <el-col :span="6" class="value">
                          <span>11</span>
                        </el-col>
                      </el-row>
                      <el-row type="flex" :gutter="20">
                        <el-col :span="3" class="span">
                          <span>批号</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                        <el-col :span="3" class="span">
                          <span>线别</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                        <el-col :span="3" class="span">
                          <span>位号</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                        <el-col :span="3" class="span">
                          <span>落次</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                      </el-row>
                      <el-row type="flex" :gutter="20">
                        <el-col :span="3" class="span">
                          <span>织袜类型</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                        <el-col :span="3" class="span">
                          <span>织袜工号</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                        <el-col :span="3" class="span">
                          <span>落筒方式</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                        <el-col :span="3" class="span">
                          <span>落筒时间</span>
                        </el-col>
                        <el-col :span="3" class="value">
                          <span>22</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="silkCar">
                      <el-row type="flex" :gutter="20">
                        <el-col :span="1" class="span">
                          <span>A</span>
                        </el-col>
                        <el-col :span="11">
                          <el-row type="flex" :gutter="20" v-for="row in rows" :key="row">
                            <el-col :span="24/cols" class="span" v-for="col in cols " :key="col">
                              <span>{{row}}×{{col}}</span>
                              <el-button></el-button>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="1" class="span">
                          <span>B</span>
                        </el-col>
                        <el-col :span="11">
                          <el-row type="flex" :gutter="20" v-for="row in rows" :key="row">
                            <el-col :span="24/cols" class="span" v-for="col in cols " :key="col">
                              <span>{{row}}×{{col}}</span>
                              <el-button></el-button>
                            </el-col>
                          </el-row>
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
export default {
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
      isIndeterminate: true,
      silkCars: [
        {
          value: '车1',
          checkFlag: false
        },
        {
          value: '车2',
          checkFlag: false
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
    handleCheckAllChange (val) {
      if (val) {
        this.silkCars.forEach((item, index) => {
          item.checkFlag = true
        })
        this.isIndeterminate = false
      } else {
        this.silkCars.forEach((item, index) => {
          item.checkFlag = false
        })
      }
    },
    handleCheckedSilkCarsChange () {
    }
  }
}
</script>
<style lang="scss" scoped>
  .dyeing {
    width: 100%;
    height: 95%;
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
