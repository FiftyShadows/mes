<template>
  <div class="current">
    <div style="height: 50px;">
      <el-select v-model="code" filterable clearable remote reserve-keyword placeholder="请输入批号" :remote-method="remoteMethod" @change="getSearchData" :loading="loading" style="float:left;">
        <el-option v-for="item in options" :key="item.id" :label="item.code" :value="item.number"></el-option>
      </el-select>
    </div>
    <div class="current-main" v-if="ifShow">
      <div class="left">
        <div class="silkCarRecord">
          <h3>丝车条码：{{silkCarRecord.silkCar.code}} — {{silkCarRecord.silkCar.number}} — {{silkCarRecord.batch.spec}}</h3>
          <h4>丝车车次：{{silkCarRecord.id}} <el-tag size="mini">{{doffingType}}</el-tag></h4>
          <el-select v-model="process" clearable placeholder="请选择" class="selected">
            <el-option v-for="item in selected" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="checkBoxA">
          <el-checkbox :indeterminateA="isIndeterminateA" v-model="checkAllA" class="checkAll" @change="handleCheckAllAChange">A面--全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedBatchA" @change="handleCheckedBatchAChange" size="small">
            <el-checkbox v-if="batch.sideType === 'A'" v-for="(batch,index) in batchOptions" :key="index" :label="batch" style="overflow:hidden;" border>
              {{batch.sideType}}-{{batch.row}}-{{batch.col}}
              <br>
              <span style="color: #E6A23C; font-weight: bolder;">{{batch.silk.lineMachine.line.name}}-{{index}}/{{batch.silk.lineMachine.item}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="checkBoxB">
          <el-checkbox :indeterminateB="isIndeterminateB" v-model="checkAllB" class="checkAll" @change="handleCheckAllBChange">B面--全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedBatchB" @change="handleCheckedBatchBChange" size="small">
            <el-checkbox v-if="batch.sideType === 'B'" v-for="(batch,index) in batchOptions" :label="batch" :key="index" style="overflow:hidden;" border>
              {{batch.sideType}}-{{batch.row}}-{{batch.col}}
              <br>
              <span style="color: #F56C6C; font-weight: bolder;">{{batch.silk.lineMachine.line.name}}-{{index}}/{{batch.silk.lineMachine.item}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="right">
        <el-card v-for="(item,index) in eventSources" v-if="item.productProcess" :key="index" class="box-card">
          <div slot="header" class="clearfix">
            <span style="float: left;">
              <span style="font-weight: bold; font-size: 17px; color: #409EFF;">{{item.operator.name}}</span>
              <i>{{item.fireDateTime}}</i>
            </span>
            <el-button style="float: right;" type="warning" size="mini">{{item.productProcess.name}}</el-button>
          </div>
          <div class="silk" v-if="item.silkExceptions">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭异常</el-tag>
            <el-button size="mini" type="danger" v-for="exceptions in item.silkExceptions" plain round :key="exceptions.id">{{exceptions.name}}</el-button>
          </div>
          <div class="notes" v-if="item.silkNotes">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">丝锭备注</el-tag>
            <el-button size="mini" type="info" v-for="notes in item.silkNotes" plain round :key="notes.id">{{notes.name}}</el-button>
          </div>
          <div class="silkform" v-if="item.formConfig">
            <el-tag type="info" style="float: left; width: 100%;text-align: left;">{{item.formConfig.name}}</el-tag>
            <!-- <label>{{}}</label> -->
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleEvents">
      <el-form :model="EventsForm">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="EventsForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="EventsForm.exceptions" multiple placeholder="请选择">
            <el-option v-for="item in silkOptions" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'current',
  data () {
    return {
      loading: false,
      code: '',
      searchData: {}, // 返回的总数据
      ifShow: false, // 是否显示数据
      options: [],
      value: '', // 搜索数据的参数
      silkCarRecord: {}, // 丝车信息
      doffingType: '', // 落桶方式
      eventSources: [], // 操作员
      selected: [], // 选择器数据
      process: '',
      productsId: [], // 产品id
       // 多选框
      checkedBatchA: [], // A
      isIndeterminateA: true,
      batchOptions: [],
      checkAllA: false,
      checkedBatchB: [], // B
      isIndeterminateB: true,
      checkAllB: false,
      EventsForm: {
        name: '',
        exceptions: []
      }, // 提交事件数据
      formLabelWidth: '120px',
      silkOptions: [], //丝锭异常列表
      dialogFormVisibleEvents: false,
    }
  },
  created () {},
  methods: {
    getProcesses () {
      this.productsId = this.searchData.silkCarRecord.batch.product.id
      this.$api.getProcesses(this.productsId).then(res => {
        this.selected = res.data
      })
    },
    getSearchData (val) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].number === val) {
          this.value = this.options[i].code
        }
      }
      this.$api.getSearchData(this.value).then(res => {
        console.log(res)
        this.searchData = res.data
        this.ifShow = true
        this.silkCarRecord = this.searchData.silkCarRecord // 丝车信息
        this.eventSources = this.searchData.eventSources // 操作员操作
        if (this.silkCarRecord.doffingType === 'MANUAL') {
          this.doffingType = '手动落桶'
        } else {
          this.doffingType = '自动落桶'
        }
        for (let i = 0; i < this.eventSources.length; i++) {
           // 操作员信息
          this.$api.getOperators(this.eventSources[i].operator.id).then(res => {
            this.eventSources[i].operator = res.data
          })
          // 时间
          let date = new Date(this.eventSources[i].fireDateTime)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          let D = date.getDate() + ' '
          let H = date.getHours() + ':'
          let m = date.getMinutes() + ' '
          this.eventSources[i].fireDateTime = Y + M + D + H + m
          // 工序信息
          if (this.eventSources[i].productProcess) {// productProcess中存在空的 所以需要判断之后在进行 要不然会报错
            this.$api.productProcesses(this.eventSources[i].productProcess.id).then(res => {
              this.eventSources[i].productProcess = res.data
            })
          }
          // 丝锭异常
          if (this.eventSources[i].silkExceptions) {
            for (let j = 0; j < this.eventSources[i].silkExceptions.length; j++) {
              this.$api.getSilkExceptions(this.eventSources[i].silkExceptions[j].id).then(res => {
                // console.log(res.data)
                this.eventSources[i].silkExceptions[j] = res.data
              })
            }
          }
          // 丝锭备注
          if (this.eventSources[i].silkNotes) {
            for (let j = 0; j < this.eventSources[i].silkNotes.length; j++) {
              this.$api.getSilkNotes(this.eventSources[i].silkNotes[j].id).then(res => {
                console.log(res.data)
                this.eventSources[i].silkNotes[j] = res.data
              })
            }
          }
          // 表单
          if (this.eventSources[i].formConfig) {

          }
        }
        console.log('eventSources', this.eventSources)
        this.batchOptions = this.searchData.silkRuntimes
        this.getProcesses()
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.$api.getCurrentSelect(query).then(res => {
          if (res.errorCode === "E00000") {
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
    handleCheckAllAChange (val) {
      this.checkedBatchA = val ? this.batchOptions : []
      this.isIndeterminate = false
    },
    handleCheckedBatchAChange (value) {
      let checkedCount = value.length
      this.checkAllA = checkedCount === this.batchOptions.length
      this.isIndeterminateA = checkedCount > 0 && checkedCount < this.batchOptions.length
    },
    handleCheckAllBChange (val) {
      this.checkedBatchB = val ? this.batchOptions : []
      this.isIndeterminate = false
    },
    handleCheckedBatchBChange (value) {
      let checkedCount = value.length
      this.checkAllB = checkedCount === this.batchOptions.length
      this.isIndeterminateB = checkedCount > 0 && checkedCount < this.batchOptions.length
    }
  }
}
</script>
<style lang="scss" scoped>
.current {
  width: 100%;
  height: 95%;
  .current-main {
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
        height: 60px;
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
        .selected {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 100px;
        }
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
}
</style>
