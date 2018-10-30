<!--待染判记录组件-->
<template>
  <div>
    <div slot="header" class="clearfix">
      <el-row type="flex" :gutter="20">
        <el-col :span="6" class="span">
          <span>落筒(拼车)时间</span>
        </el-col>
        <el-col :span="6" class="value">
          <span>{{silkCarRecord.doffingDateTime}}</span>
          <!--<span v-if="!!silkCarRecord.carpoolDateTime">{{silkCarRecord.carpoolDateTime}}</span>-->
        </el-col>
        <el-col :span="6" class="span">
          <span>织袜时间</span>
        </el-col>
        <el-col :span="6" class="value">
          <span>{{dyeingPrepare.cdt}}</span>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="span">
          <span>批号</span>
        </el-col>
        <el-col :span="3" class="value">
          <span>{{silkCarRecord.batch.batchNo}}</span>
        </el-col>
        <!--<el-col :span="3" class="span">-->
          <!--<span>线别</span>-->
        <!--</el-col>-->
        <!--<el-col :span="3" class="value">-->
          <!--<span>{{silkCarRecord.line}}</span>-->
        <!--</el-col>-->
        <!--<el-col :span="6" class="span">-->
          <!--<span>位号/落次</span>-->
        <!--</el-col>-->
        <!--<el-col :span="6" class="value">-->
          <!--<template v-for="(itemFallOrder,index) in dyeingPrepare.itemFallOrders" v-if="dyeingPrepare.num == 1">-->
                    <!--<span :key="index">-->
                      <!--<span>{{itemFallOrder}}</span>-->
                      <!--<span v-if="index != dyeingPrepare.itemFallOrders.length-1">, </span>-->
                    <!--</span>-->
          <!--</template>-->
          <!--<div v-if="dyeingPrepare.num != 1">\</div>-->
        <!--</el-col>-->
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="span">
          <span>织袜类型</span>
        </el-col>
        <el-col :span="3" class="value">
          <span>{{dyeingPrepare.type}}</span>
        </el-col>
        <el-col :span="3" class="span">
          <span>织袜工号</span>
        </el-col>
        <el-col :span="3" class="value">
          <span>{{dyeingPrepare.creator.oaId}}</span>
        </el-col>
        <el-col :span="3" class="span">
          <span>丝锭来源</span>
        </el-col>
        <el-col :span="3" class="value">
          <span>{{silkCarRecord.doffingType}}</span>
          <!--<span v-if="!!silkCarRecord.doffingType">拼车</span>-->
        </el-col>
        <el-col :span="3" class="span">
          <span>丝车号</span>
        </el-col>
        <el-col :span="3" class="value">
          <span>{{silkCarRecord.code}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="position">
      <el-row type="flex" :gutter="20">
        <el-col :span="1" class="span">
          <span>A</span>
        </el-col>
        <el-col :span="11" class="span">
          <el-row type="flex" :gutter="20" v-for="row in dyeingPrepare.silkCarRecord.silkCar.row" :key="row">
            <el-col :span="24/dyeingPrepare.silkCarRecord.silkCar.col" class="span" v-for="col in dyeingPrepare.silkCarRecord.silkCar.col" :key="col">
              <div v-for="silk in silks" :key="silk.id">
                <span style="font-size: 13px;font-weight: bolder">D3-11/22</span>
              </div>
              <Buttons :resetFlag="resetFlag" :register="register" :allFlag="allFlag" :row="row" :col="col" :face="'A'"></Buttons>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1" class="span">
          <span>B</span>
        </el-col>
        <el-col :span="11" class="span">
          <el-row type="flex" :gutter="20" v-for="row in dyeingPrepare.silkCarRecord.silkCar.row" :key="row">
            <el-col :span="24/dyeingPrepare.silkCarRecord.silkCar.col" class="span" v-for="col in dyeingPrepare.silkCarRecord.silkCar.col" :key="col">
              <div v-for="silk in silks" :key="silk.id">
                <span style="font-size: 13px;font-weight: bolder">D3-11/22</span>
              </div>
              <Buttons :product="dyeingPrepare.silkCarRecord.batch.product" :resetFlag="resetFlag" :register="register" :allFlag="allFlag" :row="row" :col="col" :face="'B'"></Buttons>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Buttons from './button'
import Form from './form'
export default {
  props: ['dyeingPrepares', 'dyeingPrepare', 'index', 'checkAll', 'silkCarRecord', 'silks', 'silkDyeingSample'],
  components: {
    'Buttons': Buttons,
    'Form': Form
  },
  watch: {
    checkAll (data) {
      if (data) {
        this.checkFlag = true
      } else {
        this.checkFlag = false
      }
    }
  },
  data () {
    return {
      checkFlag: false,
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
      let params = {}
      this.$api.submitDyeingPrepares(params).then(res => {
        console.log(res.data)
      })
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
      if (val) {
        let checkedDyeingPrepares = [...this.$store.state.checkedDyeingPrepares]
        checkedDyeingPrepares.push(this.dyeingPrepare)
        this.$store.commit('CheckedDyeingPrepares', checkedDyeingPrepares)
      } else {
        let checkedDyeingPrepares = [...this.$store.state.checkedDyeingPrepares]
        checkedDyeingPrepares.splice(checkedDyeingPrepares.findIndex(item => item === this.dyeingPrepare), 1)
        this.$store.commit('CheckedDyeingPrepares', checkedDyeingPrepares)
      }
      if (this.$store.state.checkedDyeingPrepares.length === this.dyeingPrepares.length) {
        this.$emit('changeCheckAll', true)
        this.$emit('changeIsIndeterminate', false)
      } else if (this.$store.state.checkedDyeingPrepares.length < this.dyeingPrepares.length && this.$store.state.checkedDyeingPrepares.length !== 0) {
        this.$emit('changeIsIndeterminate', true)
      } else {
        this.$emit('changeCheckAll', false)
        this.$emit('changeIsIndeterminate', false)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-button {
    padding: 10px 20px;
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
</style>
