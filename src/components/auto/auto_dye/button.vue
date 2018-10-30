<template>
  <div>
    <el-popover
      placement="right"
      width="400"
      trigger="manual"
      v-model="visible">
      <el-form :model="form">
        <!--<el-form-item v-for="formItem in from" :label="formItem.name" :key="formItem.id">-->
          <!--<el-select v-model="formItem.value" placeholder="请选择">-->
            <!--<el-option v-for="option in formItem.selectOptions" :key="option" :label="option" :value="option"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="灰卡级别">
          <!--<el-select></el-select>-->
        </el-form-item>
        <el-form-item label="是否异常">
          <el-radio v-model="radio1" label="1">是</el-radio>
          <el-radio v-model="radio1" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="染判类型">
          <el-radio v-model="radio2" label="1">普染</el-radio>
          <el-radio v-model="radio2" label="2">敏染</el-radio>
        </el-form-item>
        <el-form-item label="判降等级">
          <el-radio v-model="radio3" label="F">F</el-radio>
          <el-radio v-model="radio3" label="D">D</el-radio>
          <el-radio v-model="radio3" label="L">L</el-radio>
          <el-radio v-model="radio3" label="OF">OF</el-radio>
          <el-radio v-model="radio3" label="OD">OD</el-radio>
          <el-radio v-model="radio3" label="OL">OL</el-radio>
        </el-form-item>
        <el-form-item label="丝锭等级">
          <!--<el-select></el-select>-->
        </el-form-item>
        <el-form-item label="降等原因">
          <!--<el-select></el-select>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="visible=false;ok()">确定</el-button>
          <el-button @click="visible=false;cancel()">取消</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference"  @click="singleClick(face,row,col)" @dblclick.native="doubleClick()" class="font">{{dyeLevel}}</el-button>
    </el-popover>
    <!--<el-popover placement="right" width="400" trigger="click">-->
      <!--我是内容-->
      <!--<Button slot="reference">popover按钮{{item}}</Button>-->
    <!--</el-popover>-->
  </div>
</template>

<script>
let time = null
export default {
  props: ['face', 'row', 'col', 'register', 'allFlag', 'resetFlag', 'product'],
  name: 'Buttons',
  data () {
    return {
      form: {},
      radio1: '1',
      radio2: '2',
      radio3: 'F',
      dyeLevel: '',
      visible: false,
      buttonColorFlag: false,
      checkFlag: false
    }
  },
  created () {
    // this.$api.getDyeingInfo(this.product).then(res => {
    //   this.form = res.data.config
    //   this.form.forEach((item, i) => {
    //     item.value = ''
    //   })
    // })
  },
  watch: {
    register: {
      handler (newVal, oldValue) {
        if (this.allFlag) {
          this.dyeLevel = this.radio3
        } else {
          if (this.checkFlag) {
            this.dyeLevel = this.radio3
          }
        }
      },
      deep: true
    },
    resetFlag: {
      handler (newValue, oldValue) {
        this.dyeLevel = ''
        this.$store.state.silks = []
        this.checkFlag = false
      }
    }
  },
  methods: {
    singleClick (face, row, col) {
      clearTimeout(time)
      time = setTimeout(() => {
        // 选中的丝锭
        if (!this.checkFlag) {
          this.checkFlag = true
          this.dyeLevel = '√'
          this.$store.state.silks.push({face: face, row: row, col: col, dyeLevel: this.dyeLevel})
        } else {
          this.checkFlag = false
          this.dyeLevel = ''
          this.$store.state.silks.splice(this.$store.state.silks.indexOf({face: face, row: row, col: col}), 1)
        }
        console.log('单击')
      }, 300)
    },
    doubleClick () {
      clearTimeout(time)
      this.visible = true
      console.log('双击')
    },
    ok () {
      this.dyeLevel = this.radio3
      this.visible = false
      // this.visible = false
    },
    cancel (val) {
      this.visible = false
      // this.visible = false
    }
  }
}
</script>
<style>
  .font {
    line-height: 0.5px;
    /*color: #00BFFF;*/
    font-weight: 100;
    width: 10px;
  }
  .buttonColor {
    background-color: cornflowerblue;
  }
</style>
