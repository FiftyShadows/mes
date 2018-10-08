<!--待染判丝车组件-->
<template>
  <div class="silkCar">
    <el-row type="flex" :gutter="10" :key="index">
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
                <div v-if="silkCar.num == 1">{{silkCar.doffingTime}}</div>
                <div v-if="silkCar.num != 1">\</div>
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
              <el-col :span="6" class="span">
                <span>位号/落次</span>
              </el-col>
              <el-col :span="6" class="value">
                <template v-for="(itemFallOrder,index) in silkCar.itemFallOrders" v-if="silkCar.num == 1">
                            <span :key="index">
                              <span>{{itemFallOrder}}</span>
                              <span v-if="index != silkCar.itemFallOrders.length-1">, </span>
                            </span>
                </template>
                <div v-if="silkCar.num != 1">\</div>
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
                <span v-if="silkCar.num == 1">{{silkCar.doffingType}}</span>
                <div v-if="silkCar.num != 1">\</div>
              </el-col>
              <el-col :span="3" class="span">
                <span>丝车号</span>
              </el-col>
              <el-col :span="3" class="value">
                <span>{{silkCar.silkCarCode}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="position">
            <el-row type="flex" :gutter="20">
              <el-col :span="1" class="span">
                <span>A</span>
              </el-col>
              <el-col :span="10" class="span">
                <el-row type="flex" :gutter="20" v-for="row in silkCar.rows" :key="row">
                  <el-col :span="24/silkCar.cols" class="span" v-for="col in silkCar.cols " :key="col">
                    <span>{{row}}×{{col}}</span><br>
                    <Buttons :resetFlag="resetFlag" :register="register" :allFlag="allFlag" :row="row" :col="col" :face="'A'"></Buttons>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="1" class="span">
                <span>B</span>
              </el-col>
              <el-col :span="10" class="span">
                <el-row type="flex" :gutter="20" v-for="row in silkCar.rows" :key="row">
                  <el-col :span="24/silkCar.cols" class="span" v-for="col in silkCar.cols " :key="col">
                    <span>{{row}}×{{col}}</span><br>
                    <Buttons :resetFlag="resetFlag" :register="register" :allFlag="allFlag" :row="row" :col="col" :face="'B'"></Buttons>
                  </el-col>
                </el-row>
                <!--<silk-car-component :register="register" :face="'B'" :rows="silkCar.rows" :cols="silkCar.cols" :silkDetail="silkCar.silkDetail"></silk-car-component>-->
              </el-col>
              <el-col :span="2" class="register">
                <el-button @click="batchRegister()" type="primary" style="margin-left: -9px;margin-top: 50%">批量登记</el-button>
                <el-button @click="allRegister()" type="primary" style="margin-left: -9px;margin-top: 10%">整车登记</el-button>
                <el-button @click="submit()" type="primary" style="margin-left: -9px;margin-top: 10%">提交</el-button>
                <el-button @click="reset()" type="primary" style="margin-left: -9px;margin-top: 10%">重置</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="tag">
            <span>{{silkCar.num}}次</span>
          </div>
          <el-dialog title="批量登记" :visible.sync="dialogFormVisible" width="400">
            <el-form :model="form">
              <el-form-item label="灰卡级别">
                <!--<el-select></el-select>-->
              </el-form-item>
              <el-form-item label="是否异常">
                <el-radio v-model="form.radio1" label="1">是</el-radio>
                <el-radio v-model="form.radio1" label="2">否</el-radio>
              </el-form-item>
              <el-form-item label="染判类型">
                <el-radio v-model="form.radio2" label="1">普染</el-radio>
                <el-radio v-model="form.radio2" label="2">敏染</el-radio>
              </el-form-item>
              <el-form-item label="判降等级">
                <el-radio v-model="form.radio3" label="F">F</el-radio>
                <el-radio v-model="form.radio3" label="D">D</el-radio>
                <el-radio v-model="form.radio3" label="L">L</el-radio>
                <el-radio v-model="form.radio3" label="OF">OF</el-radio>
                <el-radio v-model="form.radio3" label="OD">OD</el-radio>
                <el-radio v-model="form.radio3" label="OL">OL</el-radio>
              </el-form-item>
              <el-form-item label="丝锭等级">
                <!--<el-select></el-select>-->
              </el-form-item>
              <el-form-item label="降等原因">
                <!--<el-select></el-select>-->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ok()">确定</el-button>
                <el-button @click="cancel()">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Buttons from './button'
export default {
  props: ['silkCars', 'silkCar', 'index'],
  components: {
    'Buttons': Buttons
  },
  data () {
    return {
      register: true,
      dialogFormVisible: false,
      allFlag: false,
      resetFlag: false,
      form: {
        radio1: '1',
        radio2: '2',
        radio3: 'F'
      }
      // selectFlag: false
    }
  },
  created () {
  },
  methods: {
    submit () {
      console.log('提交')
    },
    batchRegister () {
      this.dialogFormVisible = true
    },
    allRegister () {
      this.allFlag = true
      this.dialogFormVisible = true
    },
    reset () {
      this.allFlag = false
      this.resetFlag = !this.resetFlag
    },
    ok () {
      this.register = !this.register
      this.dialogFormVisible = false
    },
    cancel () {
      this.dialogFormVisible = false
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
        this.$emit('changeIsIndeterminate', false)
      } else if (countChecked === 0) {
        this.checkAll = false
        this.$emit('changeIsIndeterminate', false)
      } else {
        this.$emit('changeIsIndeterminate', true)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-radio {
    width: 20px;
  }
  .el-button {
    padding: 10px 20px;
  }
  .select {
    background-color: cornflowerblue;
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
  .position {
    margin-top: -10px;
    text-align: center;
    .span {
      text-align: center;
      padding: 10px;
    }
    .register {
      text-align: center;
      background: #eef2f6;
      border: 1px solid #d9dfe5;
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
