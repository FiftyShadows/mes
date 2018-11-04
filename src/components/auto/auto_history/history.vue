<template>
  <div class="history">
    <div style="height: 50px">
      <el-date-picker
        style="float: left;"
        v-model="date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select placeholder="请输入丝车号" v-model="silkCarCode" style="float: left;width: auto;margin-left: 10px" filterable clearable remote reserve-keyword :remote-method="remoteMethod" @change="getSilkCarRecords">
        <el-option v-for="item in options" :key="item.id" :label="item.code" :value="item.code"></el-option>
      </el-select>
      <!--<el-button type="primary" icon="el-icon-search" style="float: left;margin-left: 10px" circle @click="getSilkCarRecords()"></el-button>-->
      <el-radio-group v-model="order" style="float: right;" @change="changeOrder">
        <el-radio-button label="正序"></el-radio-button>
        <el-radio-button label="逆序"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="history-main">
      <div class="left">
        <!--<el-collapse v-model="activeColapse" accordion>-->
          <!--<el-collapse-item v-for="(item,index) in silkCarRecords" :key="item.id" :title="item.name">-->
          <!--</el-collapse-item>-->
        <!--</el-collapse>-->
        <div class="silkCarRecord">
          <el-card v-if="silkCarRecords.length === 0">
            暂无数据
          </el-card>
          <el-card v-for="silkCarRecord in silkCarRecords" :key="silkCarRecord.id" shadow="hover">
            <div class="text item">
              <h3>开始时间：{{silkCarRecord.startDateTime|formatDate}} 结束时间：{{silkCarRecord.endDateTime|formatDate}}</h3>
              <h3>丝车车次：{{silkCarRecord.id}}  丝车条码：{{silkCarRecord.silkCar.code}}</h3>
              <h3>
                丝车规格(行×列)：{{silkCarRecord.silkCar.row}}×{{silkCarRecord.silkCar.col}}
                <!--车间：{{silkCarRecord.batch.workshop.corporation.name}}{{silkCarRecord.batch.workshop.name}}-->
              </h3>
              <h4>
                <el-tag size="mini" v-if="silkCarRecord.doffingType != ''">{{silkCarRecord.doffingType === 'MANUAL'? '手动落筒': '自动落筒'}}</el-tag>
                <!--<el-tag size="mini">{{silkCarRecord.batch.product.name}}-{{silkCarRecord.batch.spec}}-{{silkCarRecord.batch.batchNo}}</el-tag>-->
              </h4>
              <el-button @click="getDetail()">查看详情</el-button>
            </div>
          </el-card>
        </div>
      </div>
      <div class="right">
        <el-card v-if="silkCarRecords.length === 0">
          暂无数据
        </el-card>
        <el-card v-for="(item,index) in eventSources" v-if="item.productProcess" :key="index" class="box-card">
          <div slot="header" class="clearfix">
            <span style="float: left;">
              <span style="font-weight: bold; font-size: 17px; color: #409EFF;">{{item.operator.name}}</span>
              <span style="font-weight: bold;">{{item.operator.hrId}}</span>
              <br>
              <i>{{item.firstTime}}</i>
            </span>
            <el-button style="float: right;" type="warning" size="mini">{{item.productProcess.name}}</el-button>
          </div>
          <div class="silkRuntimes" v-if="item.silkRuntimes[0]">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭</el-tag>
            <el-button size="mini" class="btn silkbtn" v-for="runtimes in item.silkRuntimes" plain :key="runtimes.id">
              {{runtimes.sideType}}面 —— {{runtimes.row}} —— {{runtimes.col}}
            </el-button>
          </div>
          <div class="silkExceptions" v-if="item.silkExceptions">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭异常</el-tag>
            <el-button size="mini" class="btn" type="danger" v-for="exceptions in item.silkExceptions" plain round :key="exceptions.id">{{exceptions.name}}</el-button>
          </div>
          <div class="notes" style="margin-top: 10px;" v-if="item.silkNotes">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭备注</el-tag>
            <el-button size="mini" class="btn" type="info" v-for="notes in item.silkNotes" plain round :key="notes.id">{{notes.name}}</el-button>
          </div>
          <div class="silkform" style="margin-top: 10px;" v-if="item.formConfig">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">{{item.formConfig.name}}</el-tag>
            <div v-for="config in item.formConfig.formFieldConfigs" :key="config.id">
              <el-tag class="btn">{{config.name}}</el-tag>
              <el-tag v-if="config.value" class="btn">{{config.value}}</el-tag>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import util from '../../../util.js'
export default {
  name: 'history',
  filters: {
    formatDate (time) {
      return util.formatDate(time, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data () {
    return {
      activeColapse: ['1'],
      initEvent: [], // 初始化事件（落筒或拼车）
      initSilks: [], // 初始化丝锭
      eventSources: [], // 事件源（每一步操作）
      options: [],
      silkCarCode: '',
      first: 0,
      pageSize: 50,
      loading: false,
      order: '正序',
      silkCarRecords: [],
      date: [this.util.getNowFormatDate(), this.util.getNowFormatDate()],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.$api.getCurrentSelect(query).then(res => {
          if (res.errorCode === 'E00000') {
            this.$message.error(res.errorMessage)
          } else {
            this.loading = false
            this.options = res.data
          }
        })
      } else {
        this.options = []
      }
    },
    getSilkCarRecords (val) {
      let params = {
        first: 0,
        pageSize: 50,
        silkCarCode: this.silkCarCode,
        startDate: this.date[0],
        endDate: this.date[1]
      }
      this.$api.getSilkCarRecords(params).then(res => {
        this.silkCarRecords = res.data
        console.log(this.silkCarRecords)
      })
    },
    getDetail () {
      console.log('测试')
    },
    changeOrder (val) {
      if (val === '正序') {
        this.silkCarRecords.sort(function (a, b) {
          return a.startDateTime - b.startDateTime
        })
      } else {
        this.silkCarRecords.sort(function (a, b) {
          return b.startDateTime - a.startDateTime
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.history {
  width: 100%;
  height: 95%;
  .history-main {
    height: 100%;
    position: relative;
    .left {
      position: absolute;
      width: 50%;
      height: 100%;
      // border: 1px solid black;
      left: 0;
      overflow-y: auto;
      .silkCarRecord {
        width: 100%;
        height: 40px;
        background: white;
        position: relative;
        h3 {
          margin: 0px;
          text-align: left;
          padding-left: 5px;
          padding-top: 10px;
        }
        h4 {
          margin: 0px;
          text-align: left;
          padding-left: 5px;
          color: #aaa;
        }
        // .el-tag {
        //   position: absolute;
        //   left: 60%;
        //   bottom: 10px;
        // }
      }
    }
    .el-checkbox {
      font-weight: bold;
    }
    .right {
      position: absolute;
      width: 50%;
      height: 100%;
      // border: 1px solid black;
      right: 0;
      overflow-y: auto;
    }
  }
}
// 多选框
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}
.checkAll {
  width: 100%;
  background: #e8e3e3;
  height: 30px;
  text-align: left;
  line-height: 30px;
  /* color: white; */
  padding-left: 10px;
}
.el-checkbox.is-bordered.el-checkbox--small {
  background: white;
  // color: white;
  margin-bottom: 10px;
  margin-left: 10px;
}
.el-checkbox.is-bordered {
  height: auto;
  width: 22%;
}
// 人员操作
.text {
  font-size: 14px;
}
.item {
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
