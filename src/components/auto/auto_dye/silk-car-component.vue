<!--丝车组件-->
<template>
  <div>
    <div slot="header" class="clearfix">
      <el-row type="flex" :gutter="20">
        <el-col :span="6" class="span">
          <span>落筒(拼车)时间</span>
        </el-col>
        <el-col :span="6" class="value">
          <span>{{this.util.formatDate(silkCarRecord.doffingDateTime)}}</span>
          <span v-if="!!silkCarRecord.carpoolDateTime">{{this.util.formatDate(silkCarRecord.carpoolDateTime)}}</span>
        </el-col>
        <el-col :span="6" class="span">
          <span>织袜时间</span>
        </el-col>
        <el-col :span="6" class="value">
          <span>{{this.util.formatDate(dyeingPrepare.createDateTime)}}</span>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col :span="6" class="span">
          <span>批号</span>
        </el-col>
        <el-col :span="6" class="value">
          <span>{{silkCarRecord.batch.batchNo}}</span>
        </el-col>
        <el-col :span="6" class="span">
          <span>落次</span>
        </el-col>
        <el-col :span="6" class="value">
          <span>{{silks[0].doffingNum}}</span>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="span">
          <span>织袜类型</span>
        </el-col>
        <el-col :span="3" class="value">
          <span>{{dyeingPrepare.type}}</span>
        </el-col>
        <el-col :span="2" class="span">
          <span>织袜工</span>
        </el-col>
        <el-col :span="4" class="value">
          <span>{{dyeingPrepare.creator.name + '[' + dyeingPrepare.creator.hrId + ']'}}</span>
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
          <span>{{silkCarRecord.silkCar.code}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="position">
      <el-row type="flex" :gutter="20">
        <el-col :span="1" class="span">
          <span>A</span>
        </el-col>
        <el-col :span="11" class="span">
          <el-row type="flex" :gutter="20" v-for="row in silkCarRecord.silkCar.row" :key="row" class="row">
            <el-col :span="24/silkCarRecord.silkCar.col" class="span" v-for="col in silkCarRecord.silkCar.col" :key="col">
              <div>
                <span>{{row}}×{{col}}</span>
              </div>
              <div v-for="silk in silks" :key="silk.id">
                <div v-for="initSilk in silkCarRecord.initSilks" :key="initSilk.silk.id">
                  <span style="font-size: 13px;font-weight: bolder" v-if="silk.id === initSilk.silk.id && initSilk.sideType === 'A' && initSilk.row === row && initSilk.col === col">
                    <Buttons :allFlag="allFlag1" :register="register1" :dyeingPrepare="dyeingPrepare1" :silk="silk" :product="silkCarRecord.batch.product" :resetFlag="resetFlag" :row="row" :col="col" :face="'A'"></Buttons>
                    {{initSilk.silk.lineMachine.line.name}}-{{initSilk.silk.spindle}}/{{initSilk.silk.lineMachine.item}}
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1" class="span">
          <span>B</span>
        </el-col>
        <el-col :span="11" class="span">
          <el-row type="flex" :gutter="20" v-for="row in silkCarRecord.silkCar.row" :key="row" class="row">
            <el-col :span="24/silkCarRecord.silkCar.col" class="span" v-for="col in silkCarRecord.silkCar.col" :key="col">
              <div>
                <span>{{row}}×{{col}}</span>
              </div>
              <div v-for="silk in silks" :key="silk.id">
                <div v-for="initSilk in silkCarRecord.initSilks" :key="initSilk.silk.id">
                  <span style="font-size: 13px;font-weight: bolder" v-if="silk.id === initSilk.silk.id && initSilk.sideType === 'B' && initSilk.row === row && initSilk.col === col">
                    <Buttons :allFlag="allFlag1" :register="register1" :dyeingPrepare="dyeingPrepare1" :silk="silk" :product="silkCarRecord.batch.product" :resetFlag="resetFlag" :row="row" :col="col" :face="'B'"></Buttons>
                    {{initSilk.silk.lineMachine.line.name}}-{{initSilk.silk.spindle}}/{{initSilk.silk.lineMachine.item}}
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Buttons from './button'
export default {
  props: ['dyeingPrepares', 'dyeingPrepare', 'index', 'checkAll', 'silkCarRecord', 'silks', 'silkDyeingSample', 'register', 'allFlag'],
  components: {
    'Buttons': Buttons
  },
  watch: {
    checkAll (data) {
      if (data) {
        this.checkFlag = true
      } else {
        this.checkFlag = false
      }
    },
    register (register) {
      this.register1 = register
    }
  },
  data () {
    return {
      dyeingPrepare1: this.dyeingPrepare,
      checkFlag: false,
      register1: '',
      dialogFormVisible: false,
      allFlag1: this.allFlag,
      resetFlag: false,
      form: {}
    }
  },
  created () {
  },
  methods: {
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
  }
  .row {
    height: 75px;
  }
</style>
