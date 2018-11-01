<template>
  <div>
    <el-popover
      placement="right"
      width="400"
      trigger="manual"
      v-model="visible">
      <el-form :model="form">
        <el-form-item v-for="item in form.formFieldConfigs" :key="item.id" :label="item.name">
          <el-select v-model="item.value" placeholder="请选择">
            <el-option v-for="(option, index) in item.selectOptions" :key="index" :value="option" :label="option"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="visible=false;ok()">确定</el-button>
          <el-button @click="visible=false;cancel()">取消</el-button>
        </el-form-item>
      </el-form>
      <el-button slot="reference"  @click="singleClick()" @dblclick.native="doubleClick()" class="font">{{dyeLevel}}</el-button>
    </el-popover>
  </div>
</template>

<script>
let time = null
export default {
  props: ['register', 'allFlag', 'resetFlag', 'product', 'silk', 'dyeingPrepare'],
  name: 'Buttons',
  data () {
    return {
      form: {},
      formConfigValueData: {},
      visible: false,
      buttonColorFlag: false,
      checkFlag: false
    }
  },
  computed: {
    dyeLevel () {
      return this.$store.state.dyeLevel
    }
  },
  watch: {
    register: {
      handler (newVal, oldValue) {
        if (this.allFlag) {
          this.dyeLevel = newVal
        } else {
          if (this.dyeLevel === '√') {
            this.dyeLevel = newVal
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // 单击事件
    singleClick () {
      clearTimeout(time)
      time = setTimeout(() => {
        if (this.dyeLevel === '') { // 如果未选中单击会选中
          this.dyeLevel = '√'
          this.$store.commit('addSilk', this.silk)
        } else { // 如果已被选中，再次单击会取消选中，并恢复为无异常状态
          this.dyeLevel = ''
          let obj = {
            silk: {
              id: this.silk.id
            }
          }
          let array = this.$store.state.prepareSubmitSilks.find(it => it.id === this.dyeingPrepare.id).allSilks
          let index = array.findIndex(it => it.silk.id === this.silk.id)
          array.splice(index, 1, obj)
          let obj2 = {
            id: this.dyeingPrepare.id,
            allSilks: array
          }
          this.$store.commit('updatePrepareSubmitSilks', obj2)
          if (this.$store.state.silks.findIndex(it => it.id === this.silk.id)) {
            this.$store.commit('removeSilk', this.silk)
          }
        }
      }, 300)
    },
    // 双击事件
    doubleClick () {
      clearTimeout(time)
      this.getDyeingInfo()
      this.visible = true
    },
    ok () {
      let array = this.$store.state.prepareSubmitSilks.find(it => it.id === this.dyeingPrepare.id).allSilks
      this.form.formFieldConfigs.forEach((item, i) => {
        this.formConfigValueData[item.id] = item.value
      })
      let obj = {
        silk: {
          id: this.silk.id
        },
        hasException: true,
        formConfig: this.form,
        formConfigValueData: this.formConfigValueData
      }
      let index = array.findIndex(it => it.silk.id === this.silk.id)
      array.splice(index, 1, obj)
      let obj2 = {
        id: this.dyeingPrepare.id,
        allSilks: array
      }
      this.$store.commit('updatePrepareSubmitSilks', obj2)
      this.dyeLevel = this.form.formFieldConfigs[3].value
      this.visible = false
    },
    cancel (val) {
      this.visible = false
    },
    getDyeingInfo () {
      this.$api.getDyeingInfo(this.product).then(res => {
        this.form = res.data.dyeingFormConfig
        this.form.formFieldConfigs.forEach((item, i) => {
          item.value = item.selectOptions[0]
        })
      })
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
