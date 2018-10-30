<!--待染判记录组件-->
<template>
  <div>
    <el-row type="flex" :gutter="10" :key="index1">
      <el-col :span="1" class="checkbox">
        <el-checkbox v-model="checkFlag" @change="handleCheckedSilkCarsChange" style="margin-top: 400%" v-if="dyeingPrepare.type !== 'CROSS_LINEMACHINE_LINEMACHINE'"></el-checkbox>
        <el-checkbox v-model="checkFlag" @change="handleCheckedSilkCarsChange" style="margin-top: 600%" v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'"></el-checkbox>
      </el-col>
      <el-col :span="22" style="margin-left: -10px">
        <el-card  class="card">
          <el-col :span="21">
            <!--非位于与位织袜的情况，一条记录一车-->
          <div v-if="dyeingPrepare.type !== 'CROSS_LINEMACHINE_LINEMACHINE'">
            <silk-car-component :silkCarRecord="dyeingPrepare.silkCarRecord" :silks="dyeingPrepare.silks" :silkDyeingSample="dyeingPrepare.silkDyeingSample" :dyeingPrepares="dyeingPrepares1" :dyeingPrepare="dyeingPrepare1" :index="index1" :checkAll="checkAll1"></silk-car-component>
          </div>
            <!--位与位交织，一条记录两车-->
          <div v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <silk-car-component :silkCarRecord="dyeingPrepare.silkCarRecord1" :silks="dyeingPrepare.silks1" :silkDyeingSample="dyeingPrepare.silkDyeingSample" :dyeingPrepares="dyeingPrepares1" :dyeingPrepare="dyeingPrepare1" :index="index1" :checkAll="checkAll1"></silk-car-component>
          </div>
          <div v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <silk-car-component :silkCarRecord="dyeingPrepare.silkCarRecord2" :silks="dyeingPrepare.silks2" :silkDyeingSample="dyeingPrepare.silkDyeingSample" :dyeingPrepares="dyeingPrepares1" :dyeingPrepare="dyeingPrepare1" :index="index1" :checkAll="checkAll1"></silk-car-component>
          </div>
          </el-col>
          <el-col :span="2" class="register" style="margin-left: 20px;margin-top: 5%" v-if="dyeingPrepare.type !== 'CROSS_LINEMACHINE_LINEMACHINE'">
            <el-button @click="batchRegister()" type="primary" style="margin-left: -9px;margin-top: 50%">批量登记</el-button>
            <el-button @click="allRegister()" type="primary" style="margin-left: -9px;margin-top: 10%">整车登记</el-button>
            <el-button @click="submit()" type="primary" style="margin-left: -9px;margin-top: 10%">提交</el-button>
            <el-button @click="reset()" type="primary" style="margin-left: -9px;margin-top: 10%">重置</el-button>
          </el-col>
          <el-col :span="2" class="register" style="margin-left: 20px;margin-top: 15%" v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <el-button @click="batchRegister()" type="primary" style="margin-left: -9px;margin-top: 50%">批量登记</el-button>
            <el-button @click="allRegister()" type="primary" style="margin-left: -9px;margin-top: 10%">整车登记</el-button>
            <el-button @click="submit()" type="primary" style="margin-left: -9px;margin-top: 10%">提交</el-button>
            <el-button @click="reset()" type="primary" style="margin-left: -9px;margin-top: 10%">重置</el-button>
          </el-col>
          <div class="tag">
            <span>一次</span>
          </div>
          <el-dialog title="批量登记" :visible.sync="dialogFormVisible" width="400">
            <el-form :model="form">
              <el-form-item></el-form-item>
            </el-form>
            <!--<el-form :model="form">-->
              <!--<el-form-item label="灰卡级别">-->
                <!--&lt;!&ndash;<el-select></el-select>&ndash;&gt;-->
              <!--</el-form-item>-->
              <!--<el-form-item label="是否异常">-->
                <!--<el-radio v-model="form.radio1" label="1">是</el-radio>-->
                <!--<el-radio v-model="form.radio1" label="2">否</el-radio>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="染判类型">-->
                <!--<el-radio v-model="form.radio2" label="1">普染</el-radio>-->
                <!--<el-radio v-model="form.radio2" label="2">敏染</el-radio>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="判降等级">-->
                <!--<el-radio v-model="form.radio3" label="F">F</el-radio>-->
                <!--<el-radio v-model="form.radio3" label="D">D</el-radio>-->
                <!--<el-radio v-model="form.radio3" label="L">L</el-radio>-->
                <!--<el-radio v-model="form.radio3" label="OF">OF</el-radio>-->
                <!--<el-radio v-model="form.radio3" label="OD">OD</el-radio>-->
                <!--<el-radio v-model="form.radio3" label="OL">OL</el-radio>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="丝锭等级">-->
                <!--&lt;!&ndash;<el-select></el-select>&ndash;&gt;-->
              <!--</el-form-item>-->
              <!--<el-form-item label="降等原因">-->
                <!--&lt;!&ndash;<el-select></el-select>&ndash;&gt;-->
              <!--</el-form-item>-->
            <!--</el-form>-->
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="ok()">确定</el-button>
              <el-button @click="cancel()">取消</el-button>
            </div>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import silkCarComponent from './silk-car-component'
export default {
  props: ['dyeingPrepares', 'dyeingPrepare', 'index', 'checkAll'],
  components: {
    'silk-car-component': silkCarComponent
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
      dyeingPrepares1: this.dyeingPrepares,
      dyeingPrepare1: this.dyeingPrepare,
      index1: this.index,
      checkAll1: this.checkAll,
      checkFlag: false,
      register: true,
      dialogFormVisible: false,
      allFlag: false,
      resetFlag: false,
      form: {}
    }
  },
  created () {
    this.getDyeingInfo()
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
    },
    getDyeingInfo () {
      this.$api.getDyeingInfo(this.dyeingPrepare.silkCarRecord.batch.product).then(res => {
        this.form = res.data
        console.log(this.form)
      })
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
