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
            <silk-car-component :allFlag="allFlag" :register="register" :silkCarRecord="dyeingPrepare.silkCarRecord" :silks="dyeingPrepare.silks" :silkDyeingSample="dyeingPrepare.silkDyeingSample" :dyeingPrepares="dyeingPrepares1" :dyeingPrepare="dyeingPrepare1" :index="index1" :checkAll="checkAll1"></silk-car-component>
          </div>
            <!--位与位交织，一条记录两车-->
          <div v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <silk-car-component :allFlag="allFlag" :register="register" :silkCarRecord="dyeingPrepare.silkCarRecord1" :silks="dyeingPrepare.silks1" :silkDyeingSample="dyeingPrepare.silkDyeingSample" :dyeingPrepares="dyeingPrepares1" :dyeingPrepare="dyeingPrepare1" :index="index1" :checkAll="checkAll1"></silk-car-component>
          </div>
          <div v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <silk-car-component :allFlag="allFlag" :register="register" :silkCarRecord="dyeingPrepare.silkCarRecord2" :silks="dyeingPrepare.silks2" :silkDyeingSample="dyeingPrepare.silkDyeingSample" :dyeingPrepares="dyeingPrepares1" :dyeingPrepare="dyeingPrepare1" :index="index1" :checkAll="checkAll1"></silk-car-component>
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
            <span v-if="dyeingPrepare.type === 'FIRST'">一次</span>
            <span v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_SPINDLE'">位锭</span>
            <span v-if="dyeingPrepare.type === 'CROSS_LINEMACHINE_LINEMACHINE'">位位</span>
            <span v-if="dyeingPrepare.type === 'SECOND'">二次</span>
            <span v-if="dyeingPrepare.type === 'THIRD'">三次</span>
          </div>
          <el-dialog title="批量登记" :visible.sync="dialogFormVisible" width="25%">
            <el-form :model="form">
              <el-form-item v-for="item in form.formFieldConfigs" :key="item.id" :label="item.name">
                <el-select v-model="item.value" placeholder="请选择">
                  <el-option v-for="(option, index) in item.selectOptions" :key="index" :value="option" :label="option"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
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
      value: '',
      dyeingPrepares1: this.dyeingPrepares,
      dyeingPrepare1: this.dyeingPrepare,
      index1: this.index,
      checkAll1: this.checkAll,
      checkFlag: false,
      register: '',
      dialogFormVisible: false,
      allFlag: false,
      allSilks: [],
      prepareSubmitObj: {},
      formConfigValueData: {},
      form: {}
    }
  },
  created () {
    this.setSilks()
  },
  methods: {
    submit () {
      this.prepareSubmitObj = this.$store.state.prepareSubmitSilks.find(it => it.id === this.dyeingPrepare.id)
      let params = {
        items: this.prepareSubmitObj.allSilks,
        id: this.prepareSubmitObj.id
      }
      this.$api.submitDyeingPrepares(params).then(res => {
        this.$emit('getDyeingRecords')
      })
    },
    // 批量登记弹出框
    batchRegister () {
      this.getDyeingInfo()
      this.dialogFormVisible = true
    },
    // 整车登记弹出框
    allRegister () {
      this.getDyeingInfo()
      this.$store.commit('Silks', this.prepareSubmitObj.allSilks)
      this.allFlag = true
    },
    reset () {
      this.$store.commit('updatePrepareSubmitSilks', this.prepareSubmitObj)
      this.$store.commit('DyeLevel', '')
    },
    ok () {
      let array = this.$store.state.prepareSubmitSilks.find(it => it.id === this.dyeingPrepare.id).allSilks
      this.form.formFieldConfigs.forEach((item, i) => {
        this.formConfigValueData[item.id] = item.value
      })
      this.register = this.form.formFieldConfigs[3].value
      this.$store.state.silks.forEach((silk, i) => {
        let obj = {
          silk: {
            id: silk.id
          },
          hasException: true,
          formConfig: this.form,
          formConfigValueData: this.formConfigValueData
        }
        let index = array.findIndex(it => it.silk.id === silk.id)
        array.splice(index, 1, obj)
        let obj2 = {
          id: this.dyeingPrepare.id,
          allSilks: array
        }
        this.$store.commit('updatePrepareSubmitSilks', obj2)
      })
      this.allFlag = false
      this.dialogFormVisible = false
    },
    cancel () {
      this.allFlag = false
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
        this.form = res.data.dyeingFormConfig
        this.form.formFieldConfigs.forEach((item, i) => {
          item.value = item.selectOptions[0]
        })
      })
    },
    // 给染判的丝锭加一个默认的染判结果，即默认染判是正常的
    setSilks () {
      let silks = this.dyeingPrepare.silks
      let silks1 = this.dyeingPrepare.silks1
      let silks2 = this.dyeingPrepare.silks2
      if (silks) {
        silks.forEach((item, i) => {
          let obj = {
            silk: {
              id: item.id
            }
          }
          this.allSilks.push(obj)
        })
      }
      if (silks1) {
        silks1.forEach((item, i) => {
          let obj = {
            silk: {
              id: item.id
            }
          }
          this.allSilks.push(obj)
        })
      }
      if (silks2) {
        silks2.forEach((item, i) => {
          let obj = {
            silk: {
              id: item.id
            }
          }
          this.allSilks.push(obj)
        })
      }
      this.prepareSubmitObj = {
        id: this.dyeingPrepare.id,
        allSilks: this.allSilks
      }
      let array = this.$store.state.prepareSubmitSilks
      array.push(this.prepareSubmitObj)
      this.$store.commit('setPrepareSubmitSilks', array)
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
