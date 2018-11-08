<template>
  <div>
    <template v-for="(silkRuntime,index) in silkRuntimes">
      <el-checkbox :key="index" v-if="silkRuntime.sideType === sideType && silkRuntime.row === row && silkRuntime.col === col" style="overflow: hidden" border :label="row + '×' + col" v-model="checked"></el-checkbox>
      <!--<el-checkbox style="overflow: hidden" border :label="row + '×' + col" v-model="checked"></el-checkbox>-->
    </template>
    <div class="silk">
      <template v-for="(silkRuntime,index) in silkRuntimes" style="text-align: center">
        <span :key="index" style="color: #F56C6C; font-weight: bolder;" v-if="silkRuntime && silkRuntime.sideType === sideType && silkRuntime.row === row && silkRuntime.col === col">
        {{silkRuntime.silk.lineMachine.line.name}}-{{silkRuntime.silk.spindle}}/{{silkRuntime.silk.lineMachine.item}}
        <!--{{silkRuntime.silk.id}}-->
          <span v-if="!!silkRuntime.silk.code">{{silkRuntime.silk.code}}</span>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkBox',
  props: ['row', 'col', 'silkRuntimes', 'sideType', 'checkAll'],
  data () {
    return {
      checked: false
    }
  },
  watch: {
    checkAll (data) {
      if (data) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    checked (data) {
      let array = this.$store.state.checkedSilkRuntimes
      if (data) {
        let obj = this.silkRuntimes.find((silkRuntime) => {
          if (silkRuntime && silkRuntime.row === this.row && silkRuntime.col === this.col && silkRuntime.sideType === this.sideType) {
            return true
          } else {
            return false
          }
        })
        array.push(obj)
        this.$store.commit('CheckedSilkRuntimes', array)
      } else {
        let index = array.findIndex((silkRuntime) => {
          if (silkRuntime && silkRuntime.row === this.row && silkRuntime.col === this.col && silkRuntime.sideType === this.sideType) {
            return true
          } else {
            return false
          }
        })
        array.splice(index, 1)
        this.$store.commit('CheckedSilkRuntimes', array)
      }
    }
  },
  methods: {
  }
}
</script>
<style>
  .silk {
    width:84px;
    height:35px;
    border:1px solid #dcdfe6;
    font-size: 12px;
    margin-top: -6px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .silk *{
    vertical-align: middle;
  }s
  .el-checkbox.is-bordered.el-checkbox--small {
    background: white;
    width: auto;
  }
  .el-checkbox.is-bordered {
    height: 30px;
    width: 86px;
    background-color: white;
    margin-left: 10px;
  }
</style>
