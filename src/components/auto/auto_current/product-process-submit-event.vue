<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span style="float: left;">
      <span style="font-weight: bold; font-size: 17px; color: #409EFF;">{{eventSource.operator.name}}</span>
      <span style="font-weight: bold;">{{eventSource.operator.hrId}}</span>
      <br>
      <i>{{eventSource.firstTime}}</i>
      </span>
      <el-button style="float: right;" type="warning" size="mini">{{eventSource.productProcess.name}}</el-button>
      </div>
      <div class="silkRuntimes" v-if="eventSource.silkRuntimes&&eventSource.silkRuntimes.length>0">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭</el-tag>
      <el-button size="mini" class="btn silkbtn" v-for="runtimes in eventSource.silkRuntimes" plain :key="runtimes.id">
      {{runtimes.sideType}}面 —— {{runtimes.row}} —— {{runtimes.col}}
      </el-button>
      </div>
      <div class="silkExceptions" v-if="eventSource.silkExceptions&&eventSource.silkExceptions.length>0">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭异常</el-tag>
      <el-button size="mini" class="btn" type="danger" v-for="exception in eventSource.silkExceptions" round :key="exception.id">{{exception.name}}</el-button>
      </div>
      <div class="notes" style="margin-top: 10px;" v-if="eventSource.silkNotes&&eventSource.silkNotes.length>0">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭备注</el-tag>
      <el-button size="mini" class="btn" type="info" v-for="notes in eventSource.silkNotes" plain round :key="notes.id">{{notes.name}}</el-button>
      </div>
      <div class="silkform" style="margin-top: 10px;" v-if="eventSource.formConfig">
      <el-tag type="info" style="float: left; width: 100%;text-align: left;">{{eventSource.formConfig.name}}</el-tag>
      <div v-for="config in eventSource.formConfig.formFieldConfigs" :key="config.id">
      <el-tag class="btn">{{config.name}}</el-tag>
      <el-tag v-if="config.value" class="btn">{{config.value}}</el-tag>
      </div>
      </div>
    </el-card>
</template>

<script>
export default {
  name: 'ProductProcessSubmitEvent',
  props: ['eventSource'],
  data () {
    return {
    }
  },
  watch: {
  },
  created () {
    this.getProcess()
  },
  methods: {
    getProcess () {
      // 操作员信息
      this.$api.getOperators(this.eventSource.operator.id).then(res => {
        this.eventSource.operator = res.data
      })
      // 时间
      let date = new Date(this.eventSource.fireDateTime) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let H = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let S = date.getSeconds() + ' '
      this.eventSource.firstTime = Y + M + D + H + m + S
      // 工序信息
      if (this.eventSource.productProcess) { // productProcess中存在空的 所以需要判断之后在进行 要不然会报错
        this.$api.productProcesses(this.eventSource.productProcess.id).then(res => {
          this.eventSource.productProcess = res.data
        })
      }
      // 丝锭异常
      if (this.eventSource.silkExceptions) {
        for (let j = 0; j < this.eventSource.silkExceptions.length; j++) {
          this.$api.getSilkExceptions(this.eventSource.silkExceptions[j].id).then(res => {
            this.eventSource.silkExceptions[j] = res.data
          })
        }
      }
      // 丝锭备注
      if (this.eventSource.silkNotes) {
        for (let j = 0; j < this.eventSource.silkNotes.length; j++) {
          this.$api.getSilkNotes(this.eventSource.silkNotes[j].id).then(res => {
            this.eventSource.silkNotes[j] = res.data
          })
        }
      }
      // 表单
      if (this.eventSource.formConfig) {
        let config = this.eventSource.formConfig // 要取的数据名
        if (this.eventSource.formConfigValueData) {
          let value = this.eventSource.formConfigValueData // 对应数据值
          let key = Object.keys(value)
          for (let j = 0; j < config.formFieldConfigs.length; j++) { // 取id值判断数据
            for (let t = 0; t < key.length; t++) {
              if (key[t] === config.formFieldConfigs[j].id) {
                let keyt = key[t]
                if (value[keyt] === true) {
                  value[keyt] = '是'
                } else if (value[keyt] === false) {
                  value[keyt] = '否'
                }
                this.eventSource.formConfig.formFieldConfigs[j].value = value[keyt]
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }
  .eventSource {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 10px;
  }
  .silkbtn {
    display: block;
    margin-left: 10px;
  }
  .Form {
    float: left;
    margin-top: 10px;
  }
</style>
