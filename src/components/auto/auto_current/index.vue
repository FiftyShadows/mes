<template>
  <div class="current">
    <div style="height: 50px;">
      <el-select v-model="code" filterable clearable remote reserve-keyword placeholder="请输入丝车号" :remote-method="remoteMethod" @change="getSearchData" style="float:left;">
        <el-option v-for="item in options" :key="item.id" :label="item.code" :value="item.number"></el-option>
      </el-select>
      <el-radio-group v-model="order" style="float: right;" @change="changeOrder">
        <el-radio-button label="正序"></el-radio-button>
        <el-radio-button label="逆序"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="current-main" v-if="ifShow" v-loading="fullscreenLoading">
      <div class="left">
        <div class="silkCarRecord" v-if="silkCarRecord">
            <h3>丝车条码：{{silkCarRecord.silkCar.code}} — {{silkCarRecord.silkCar.number}} — {{silkCarRecord.batch.spec}}</h3>
            <h4>丝车车次：{{silkCarRecord.id}} <el-tag size="mini">{{doffingType}}</el-tag></h4>
          <!--<el-select v-model="process" placeholder="请选择" clearable class="selected" @change="productProcess">-->
            <!--<el-option v-for="item in selected" :key="item.id" :label="item.name" :value="item.name"></el-option>-->
          <!--</el-select>-->
          <el-dropdown class="selected" @command="productProcess">
            <span class="el-dropdown-link">
              工序操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 100px">
              <el-dropdown-item v-for="item in selected" :key="item.id" :command="item.name">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="checkBoxA">
          <el-checkbox :indeterminateA="isIndeterminateA" v-model="checkAllA" class="checkAll">A面--全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <div v-for="col in cols" :key="col" style="display: inline-block">
            <div v-for="row in rows" :key="row" >
              <check-box :row="row" :col="col" :silkRuntimes="silkRuntimes" :sideType="'A'" :checkAll="checkAllA"></check-box>
            </div>
          </div>
        </div>
        <div class="checkBoxB">
          <el-checkbox :indeterminateB="isIndeterminateB" v-model="checkAllB" class="checkAll">B面--全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <div v-for="col in cols" :key="col" style="display: inline-block">
            <div v-for="row in rows" :key="row">
              <check-box :row="row" :col="col" :silkRuntimes="silkRuntimes" :sideType="'B'" :checkAll="checkAllB"></check-box>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <event-source-list :eventSources='eventSources'></event-source-list>
      </div>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisibleEvents" :before-close="handleClose">
      <el-form :model="EventsForm" :label-width="formLabelWidth">
        <el-form-item label="条码">
          <el-input style="width: 40%;float: left;" v-model="EventsForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="车次">
          <el-input style="width: 60%;float: left;" v-model="EventsForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="丝锭异常" v-if="!isDyeing" :label-width="formLabelWidth">
          <el-select style="float: left;" v-model="EventsForm.silkExceptions" multiple placeholder="请选择">
            <el-option v-for="item in silkOptions" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="丝锭备注" v-if="!isDyeing" :label-width="formLabelWidth">
          <el-select style="float: left;" v-model="EventsForm.silkNotes" multiple placeholder="请选择">
            <el-option v-for="item in notesOptions" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单名称" v-if="EventsForm.formConfig && !isDyeing" :label-width="formLabelWidth">
          <el-tag type="primary" style="width: 100%;text-align: left;float: left;">
            {{EventsForm.formConfig.name}}
          </el-tag>
          <div v-for="item in EventsForm.formConfig.formFieldConfigs" :key="item.id">
            <el-tag type="info" style="float: left;">{{item.name}}</el-tag>
            <el-input-number v-model="item.valueConfig" v-if="item.valueType === 'NUMBER' && item.inputType !== 'SELECTION'" label="请输入" style="float: left;"></el-input-number>
            <el-input v-model="item.valueConfig" v-if="item.valueType === 'STRING' && item.inputType !== 'SELECTION'" placeholder="请输入内容" style="width: 60%;float: left;"></el-input>
            <el-select v-model="item.valueConfig" v-if="item.valueType !== 'BOOLEAN' && item.inputType === 'SELECTION'" placeholder="请选择" style="float: left;">
              <el-option v-for="item in item.selectOptions" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="item.valueConfig" v-if="item.valueType === 'BOOLEAN'" placeholder="请选择" style="float: left;">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="丝锭" v-if="isDyeing" :label-width="formLabelWidth">
          <ul class="item">
             <li v-for="item in DyeingSample.silkRuntimes" :key="item.id">{{item.sideType + '面—' + item.row + '—' + item.col + '—' + item.silk.code + '——' + item.silk.lineMachine.line.name + '/' + item.silk.lineMachine.item}}</li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isDyeing" @click="submitEvents()">确 定</el-button>
        <el-button type="primary" v-else @click="DyeingSampleSubmitEvents()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import EventSourceList from './event-source-list.vue'
import checkBox from './checkBox'
export default {
  name: 'current',
  components: {
    'event-source-list': EventSourceList,
    'check-box': checkBox
  },
  data () {
    return {
      fullscreenLoading: false, // loading
      code: '',
      order: '正序', // 操作员显示顺序
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
      checkedSilkCarA: [], // A
      isIndeterminateA: true,
      silkRuntimes: [],
      checkAllA: false,
      rows: '', // 丝车行数
      cols: '', // 丝车列数
      checkedSilkCarB: [], // B
      isIndeterminateB: true,
      checkAllB: false,
      DyeingSample: {}, // 标佯丝
      isDyeing: false, // 是否是标佯丝操作
      EventsForm: { // 操作数据 // 提交事件数据
        name: '', // 批号
        id: '', // 车次
        valueConfig: '', // 绑定表单数据
        silkExceptions: [], // 上传异常
        productProcess: {}, // 上传工序
        silkCarRecord: {}, // 单号情况
        silkNotes: null, // 备注
        silkRuntimes: [],
        formConfig: null, // 表单
        formConfigValueData: {} // 表单value
      },
      formLabelWidth: '120px',
      silkOptions: [], // 丝锭异常列表
      notesOptions: [], // 丝锭备注列表
      dialogFormVisibleEvents: false,
      dialogName: ''
    }
  },
  methods: {
    changeOrder (val) {
      if (val === '正序') {
        this.eventSources.sort(function (a, b) {
          return a.fireDateTime - b.fireDateTime
        })
      } else {
        this.eventSources.sort(function (a, b) {
          return b.fireDateTime - a.fireDateTime
        })
      }
    },
    getProcesses () {
      this.productsId = this.searchData.silkCarRecord.batch.product.id
      this.DyeingSample.name = '标样丝'
      this.$api.getProcesses(this.productsId).then(res => {
        this.selected = res.data
        this.selected.push(this.DyeingSample)
      })
    },
    getSearchData (val) {
      this.fullscreenLoading = true
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].number === val) {
          this.value = this.options[i].code
        }
      }
      this.$api.getSearchData(this.value).then(res => {
        this.searchData = res.data
        this.ifShow = true
        this.silkCarRecord = this.searchData.silkCarRecord // 丝车信息
        this.eventSources = this.searchData.eventSources // 获取该车所有时间源
        if (this.eventSources) {
          // 对事件源进行排序
          this.eventSources.forEach(item => {
            item.silkRuntimes.forEach(silkRuntime => {
              let index = this.silkCarRecord.initSilks.findIndex(it => it.silk.id === silkRuntime.silk.id)
              silkRuntime.code = this.silkCarRecord.initSilks[index].silk.code
            })
            item.silkRuntimes
              .sort((a, b) => {
                if (a.sideType === b.sideType) {
                  if (a.row === b.row) {
                    return a.col - b.col
                  }
                  return a.row - b.row
                }
                return a.sideType - b.sideType
              }
              )
          })
        }
        // 操作员操作
        if (this.silkCarRecord) {
          if (this.silkCarRecord.doffingType === 'MANUAL') {
            this.doffingType = '手动落桶'
          } else {
            this.doffingType = '自动落桶'
          }
          // 获取丝车的行列规格
          this.rows = this.searchData.silkCarRecord.silkCar.row
          this.cols = this.searchData.silkCarRecord.silkCar.col
          this.silkRuntimes = this.searchData.silkRuntimes
          this.getProcesses()
        } else {
          this.rows = []
          this.cols = []
        }
        this.fullscreenLoading = false
      })
    },
    productProcess (val) { // 打开event弹框
      console.log(val)
      this.process = val
      this.dialogName = val
      this.EventsForm.name = this.silkCarRecord.silkCar.code
      this.EventsForm.id = this.silkCarRecord.id
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].name === this.dialogName) {
          this.silkOptions = this.selected[i].exceptions
          this.notesOptions = this.selected[i].notes
        }
      }
      for (let i in this.selected) { // 分辨操作工序
        if (this.selected[i].name === this.process) {
          this.EventsForm.productProcess = this.selected[i]
          this.EventsForm.formConfig = this.selected[i].formConfig
        }
      }
      this.EventsForm.silkCarRecord = this.silkCarRecord
      this.EventsForm.silkRuntimes = this.$store.state.checkedSilkRuntimes
      this.DyeingSample.silkCarRecord = this.searchData.silkCarRecord // 标样丝
      this.DyeingSample.silkRuntimes = this.EventsForm.silkRuntimes // 标样丝
      if (this.dialogName === '标样丝') {
        this.isDyeing = true
      }
      this.dialogFormVisibleEvents = true
    },
    handleClose (done) { // 工序修改弹窗关闭事件
      this.isDyeing = false
      done()
    },
    DyeingSampleSubmitEvents () { // 标样丝提交
      this.$api.DyeingSampleSubmitEvents(this.DyeingSample).then(res => {
        this.$notify({
          title: '成功',
          message: '标样丝-提交成功',
          type: 'success'
        })
        this.EventsForm = { // 清空数据
          name: '',
          valueConfig: '',
          silkExceptions: [],
          productProcess: {},
          silkCarRecord: {},
          silkNotes: null,
          silkRuntimes: [],
          formConfig: null,
          formConfigValueData: {}
        }
        this.checkedSilkCarA = []
        this.checkedSilkCarB = []
        this.isDyeing = false
        this.getSearchData()
        this.dialogFormVisibleEvents = false
      })
    },
    submitEvents () { // 工序操作提交
      for (let i in this.EventsForm.silkExceptions) { // 获取异常
        for (let j in this.silkOptions) {
          if (this.silkOptions[j].name === this.EventsForm.silkExceptions[i]) {
            this.EventsForm.silkExceptions[i] = this.silkOptions[j]
          }
        }
      }
      if (this.EventsForm.formConfig) {
        for (let i in this.EventsForm.formConfig.formFieldConfigs) {
          let value = this.EventsForm.formConfig.formFieldConfigs[i]
          this.EventsForm.formConfigValueData[value.id] = value.valueConfig
          if (this.EventsForm.formConfigValueData[value.id] === 'true') {
            this.EventsForm.formConfigValueData[value.id] = true
          } else if (value.valueConfig === 'false') {
            this.EventsForm.formConfigValueData[value.id] = false
          }
        }
      }
      this.$api.ProductProcessSubmitEvents(this.EventsForm).then(res => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success'
        })
        this.dialogFormVisibleEvents = false
        this.EventsForm = { // 清空数据
          name: '',
          valueConfig: '',
          silkExceptions: [],
          productProcess: {},
          silkCarRecord: {},
          silkNotes: null,
          silkRuntimes: [],
          formConfig: null,
          formConfigValueData: {}
        }
        this.getSearchData()
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        // query = '44011'
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
        .selected {
          position: absolute;
          right: 20px;
          top: 10px;
          width: 100px;
        }
        .el-dropdown-link {
          cursor: pointer;
          color: #409EFF;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
    .right {
      position: absolute;
      width: 50%;
      height: 100%;
      right: 0;
      overflow-y: auto;
    }
    .el-checkbox {
      font-weight: bold;
    }
    .silk {
      width:84px;
      height:35px;
      border:1px solid #dcdfe6;
      font-size: 1px;
      margin-top: -6px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }
}
.From {
  float: left;
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
  width: auto;
}
.el-checkbox.is-bordered {
  height: 40px;
  width: 86px;
  background-color: white;
  margin-left: 10px;
}
.item {
  float: left;
  list-style: none;
  width: 400px;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
  border: 1px solid #409EFF;
  border-radius: 5px;
}
  ul {
    width: 50px;
  }
</style>
