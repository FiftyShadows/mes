<template>
  <div class="current">
    <div style="height: 50px;">
      <el-select v-model="code" filterable clearable remote reserve-keyword placeholder="请输入批号" :remote-method="remoteMethod" @change="getSearchData" style="float:left;">
        <el-option v-for="item in options" :key="item.id" :label="item.code" :value="item.number"></el-option>
      </el-select>
      <el-radio-group v-model="order" style="float: right;" @change="changeOrder">
        <el-radio-button label="正序"></el-radio-button>
        <el-radio-button label="逆序"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="current-main" v-if="ifShow">
      <div class="left">
        <div class="silkCarRecord">
          <h3>丝车条码：{{silkCarRecord.silkCar.code}} — {{silkCarRecord.silkCar.number}} — {{silkCarRecord.batch.spec}}</h3>
          <h4>丝车车次：{{silkCarRecord.id}} <el-tag size="mini">{{doffingType}}</el-tag></h4>
          <el-select v-model="process" placeholder="请选择" class="selected" @change="productProcess">
            <el-option v-for="item in selected" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="checkBoxA">
          <el-checkbox :indeterminateA="isIndeterminateA" v-model="checkAllA" class="checkAll" @change="handleCheckAllAChange">A面--全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedSilkCarA" @change="handleCheckedSilkCarAChange" size="small">
          <el-checkbox v-for="(checkOption,index) in checkOptions" :key="index" :label="checkOption" style="overflow:hidden;" border>
            {{checkOption.row + 1}}×{{checkOption.col + 1}}
          <br>
            <template v-for="(batch,index) in batchOptions">
              <span style="color: #E6A23C; font-weight: bolder;" v-if="batch.sideType === 'A'&&batch.row===checkOption.row+1&&batch.col===checkOption.col+1">
                {{batch.silk.lineMachine.line.name}}-{{index}}/{{batch.silk.lineMachine.item}}
              </span>
            </template>
          </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="checkBoxB">
          <!--<el-checkbox :indeterminateB="isIndeterminateB" v-model="checkAllB" class="checkAll" @change="handleCheckAllBChange">B面&#45;&#45;全选</el-checkbox>-->
          <!--<div style="margin: 15px 0;"></div>-->
          <!--<el-checkbox-group v-model="checkedSilkCarB" @change="handleCheckedSilkCarBChange" size="small">-->
            <!--<el-checkbox v-if="batch.sideType === 'B'" v-for="(batch,index) in batchOptions" :label="batch" :key="index" style="overflow:hidden;" border>-->
              <!--{{batch.sideType}}-{{batch.row}}-{{batch.col}}-->
              <!--<br>-->
              <!--<span style="color: #F56C6C; font-weight: bolder;">{{batch.silk.lineMachine.line.name}}-{{index}}/{{batch.silk.lineMachine.item}}</span>-->
            <!--</el-checkbox>-->
          <!--</el-checkbox-group>-->
          <el-checkbox :indeterminateA="isIndeterminateB" v-model="checkAllB" class="checkAll" @change="handleCheckAllBChange">B面--全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedSilkCarB" @change="handleCheckedSilkCarBChange" size="small">
            <el-checkbox v-for="(checkOption,index) in checkOptions" :key="index" :label="checkOption" style="overflow:hidden;" border>
              {{checkOption.row + 1}}×{{checkOption.col + 1}}
              <br>
              <template v-for="(batch,index) in batchOptions">
              <span style="color: #F56C6C; font-weight: bolder;" v-if="batch.sideType === 'B'&&batch.row===checkOption.row+1&&batch.col===checkOption.col+1">
                {{batch.silk.lineMachine.line.name}}-{{index}}/{{batch.silk.lineMachine.item}}
              </span>
              </template>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <current-operator :eventSources='eventSources'></current-operator>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisibleEvents">
      <el-form :model="EventsForm" :label-width="formLabelWidth">
        <el-form-item label="条码">
          <el-input style="width: 40%;float: left;" v-model="EventsForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="车次">
          <el-input style="width: 40%;float: left;" v-model="EventsForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="丝锭异常" :label-width="formLabelWidth">
          <el-select style="float: left;" v-model="EventsForm.silkExceptions" multiple placeholder="请选择">
            <el-option v-for="item in silkOptions" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="丝锭备注" v-if="EventsForm.silkNotes || EventsForm.silkNotes.length !== 0" :label-width="formLabelWidth">
          <el-select style="float: left;" v-model="EventsForm.silkNotes" multiple placeholder="请选择">
            <el-option v-for="item in notesOptions" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表单名称" v-if="EventsForm.formConfig" :label-width="formLabelWidth">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEvents()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CurrentOperator from './current-operator.vue'
export default {
  name: 'current',
  components: {
    'current-operator': CurrentOperator
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
      checkedSilkCarA: [1], // A
      isIndeterminateA: true,
      batchOptions: [],
      checkOptions: [],
      checkAllA: false,
      rows: '', // 丝车行数
      cols: '', // 丝车列数
      checkedSilkCarB: [], // B
      isIndeterminateB: true,
      checkAllB: false,
      EventsForm: { // 操作数据 // 提交事件数据
        name: '', // 批号
        id: '', // 车次
        valueConfig: '', // 绑定表单数据
        silkExceptions: [], // 上传异常
        productProcess: {}, // 上传工序
        silkCarRecord: {}, // 单号情况
        silkNotes: [], // 备注
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
  created () {},
  methods: {
    changeOrder (val) {
      console.log(val);
      if (val === '正序') {
        this.eventSources.sort(function (a, b) {
          return a.fireDateTime - b.fireDateTime
        })
      } else {
        this.eventSources.sort(function (a, b) {
          return b.fireDateTime - a.fireDateTime
        })
      }
      console.log(this.eventSources)
    },
    getProcesses () {
      this.productsId = this.searchData.silkCarRecord.batch.product.id;
      this.$api.getProcesses(this.productsId).then(res => {
        this.selected = res.data
      })
    },
    getSearchData (val) {
      this.fullscreenLoading = true;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].number === val) {
          this.value = this.options[i].code
        }
      }
      this.$api.getSearchData(this.value).then(res => {
        this.searchData = res.data;
        console.log(this.searchData.silkCarRecord.silkCar);
        this.ifShow = true;
        this.silkCarRecord = this.searchData.silkCarRecord; // 丝车信息
        this.eventSources = this.searchData.eventSources; // 操作员操作
        if (this.silkCarRecord.doffingType === 'MANUAL') {
          this.doffingType = '手动落桶'
        } else {
          this.doffingType = '自动落桶'
        }
        for (let i = 0; i < this.eventSources.length; i++) {
          // 操作员信息
          this.$api.getOperators(this.eventSources[i].operator.id).then(res => {
            this.eventSources[i].operator = res.data
          });
          // 时间
          let date = new Date(this.eventSources[i].fireDateTime); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let D = date.getDate() + ' ';
          let H = date.getHours() + ':';
          let m = date.getMinutes() + ':';
          let S = date.getSeconds() + ' ';
          this.eventSources[i].firstTime = Y + M + D + H + m + S;
          // 工序信息
          if (this.eventSources[i].productProcess) { // productProcess中存在空的 所以需要判断之后在进行 要不然会报错
            this.$api.productProcesses(this.eventSources[i].productProcess.id).then(res => {
              this.eventSources[i].productProcess = res.data
            })
          }
          // 丝锭异常
          if (this.eventSources[i].silkExceptions) {
            for (let j = 0; j < this.eventSources[i].silkExceptions.length; j++) {
              this.$api.getSilkExceptions(this.eventSources[i].silkExceptions[j].id).then(res => {
                this.eventSources[i].silkExceptions[j] = res.data
              })
            }
          }
          // 丝锭备注
          if (this.eventSources[i].silkNotes) {
            for (let j = 0; j < this.eventSources[i].silkNotes.length; j++) {
              this.$api.getSilkNotes(this.eventSources[i].silkNotes[j].id).then(res => {
                this.eventSources[i].silkNotes[j] = res.data
              })
            }
          }
          // 表单
          if (this.eventSources[i].formConfig) {
            let config = this.eventSources[i].formConfig; // 要取的数据名
            console.log(this.eventSources[i]);
            if (this.eventSources[i].formConfigValueData) {
              let value = this.eventSources[i].formConfigValueData; // 对应数据值
              let key = Object.keys(value);
              // console.log(key)
              for (let j = 0; j < config.formFieldConfigs.length; j++) { // 取id值判断数据
                for (let t = 0; t < key.length; t++) {
                  if (key[t] === config.formFieldConfigs[j].id) {
                    let keyt = key[t];
                    // console.log(keyt,value[keyt])
                    if (value[keyt] === true) {
                      value[keyt] = '是'
                    } else if (value[keyt] === false) {
                      value[keyt] = '否'
                    }
                    this.eventSources[i].formConfig.formFieldConfigs[j].value = value[keyt]
                  }
                }
              }
            }
            // console.log(this.eventSources[i].formConfig.formFieldConfigs)
          }
        }
        //获取丝车的行列规格
        this.rows = this.searchData.silkCarRecord.silkCar.row;
        this.cols = this.searchData.silkCarRecord.silkCar.col;
        this.checkOptions = [];
        for (let i=0;i<this.rows;i++) {
          for (let j=0;j<this.cols;j++) {
            this.checkOptions.push({row: i,col: j})
          }
        }
        this.batchOptions = this.searchData.silkRuntimes.sort(function (a, b) {
          return a.row - b.row
        });
        console.log(this.batchOptions);
        // this.fullscreenLoading = false
        this.getProcesses()
      })
    },
    productProcess (val) { // 打开event弹框
      // console.log(val)
      this.dialogName = val;
      this.EventsForm.name = this.silkCarRecord.silkCar.code;
      this.EventsForm.id = this.silkCarRecord.id;
      console.log(this.selected);
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].name === this.dialogName) {
          this.silkOptions = this.selected[i].exceptions;
          this.notesOptions = this.selected[i].notes
        }
      }
      for (let i in this.selected) { // 分辨操作工序
        if (this.selected[i].name === this.process) {
          this.EventsForm.productProcess = this.selected[i];
          this.EventsForm.formConfig = this.selected[i].formConfig
        }
      }
      this.EventsForm.silkCarRecord = this.silkCarRecord;
      this.EventsForm.silkRuntimes = this.checkedSilkCarA.concat(this.checkedSilkCarB);
      this.dialogFormVisibleEvents = true
    },
    submitEvents () { // 提交操作按钮
      for (let i in this.EventsForm.silkExceptions) { // 获取异常
        // console.log(this.EventsForm.exceptions[i])
        for (let j in this.silkOptions) {
        // console.log(this.silkOptions[j].name)
          if (this.silkOptions[j].name === this.EventsForm.silkExceptions[i]) {
            this.EventsForm.silkExceptions[i] = this.silkOptions[j]
            // console.log(this.silkOptions[j])
          }
        }
      }
      // for (let i in this.selected) { // 分辨操作工序
      //   if (this.selected[i].name === this.process) {
      //     this.EventsForm.productProcess = this.selected[i]
      //     this.EventsForm.formConfig = this.selected[i].formConfig
      //   }
      // }
      // this.EventsForm.silkCarRecord = this.silkCarRecord
      // this.EventsForm.silkRuntimes = this.checkedSilkCarA.concat(this.checkedSilkCarB)
      // console.log(this.EventsForm.formConfig.formFieldConfigs) // 数组
      // console.log(this.EventsForm.formConfig.formFieldConfigs.valueConfig)
      // if (this.valueConfig === 'true') {
      //   this.valueConfig = true
      // } else if (this.valueConfig === 'false') {
      //   this.valueConfig = false
      // }
      if (this.EventsForm.formConfig) {
        for (let i in this.EventsForm.formConfig.formFieldConfigs) {
          let value = this.EventsForm.formConfig.formFieldConfigs[i];
          this.EventsForm.formConfigValueData[value.id] = value.valueConfig;
          if (this.EventsForm.formConfigValueData[value.id] === 'true') {
            this.EventsForm.formConfigValueData[value.id] = true
          } else if (value.valueConfig === 'false') {
            this.EventsForm.formConfigValueData[value.id] = false
          }
        }
      }
      console.log(this.EventsForm);
      // if (this.EventsForm.formConfig.formFieldConfigs.required) {
      // }
      this.$api.ProductProcessSubmitEvents(this.EventsForm).then(res => {
        console.log(res);
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success'
        });
        this.dialogFormVisibleEvents = false;
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
        };
        this.getSearchData()
      })
      // this.EventsForm.silkExceptions = []
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true;
        this.$api.getCurrentSelect(query).then(res => {
          if (res.errorCode === 'E00000') {
            this.$message.error(res.errorMessage)
          } else {
            this.loading = false;
            this.options = res.data
          }
        })
      } else {
        this.options = []
      }
    },
    handleCheckAllAChange (val) {
      // this.checkedSilkCarA = val ? this.rows : []
      this.checkedSilkCarA = val ? this.checkOptions : [];
      console.log(this.checkedSilkCarA);
      this.isIndeterminate = false
    },
    handleCheckedSilkCarAChange (value) {
      let checkedCount = value.length;
      this.checkAllA = checkedCount === this.checkOptions.length;
      this.isIndeterminateA = checkedCount > 0 && checkedCount < this.checkOptions.length
    },
    handleCheckAllBChange (val) {
      this.checkedSilkCarB = val ? this.checkOptions : [];
      this.isIndeterminate = false
    },
    handleCheckedSilkCarBChange (value) {
      let checkedCount = value.length;
      this.checkAllB = checkedCount === this.checkOptions.length;
      this.isIndeterminateB = checkedCount > 0 && checkedCount < this.checkOptions.length
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
          right: 10px;
          top: 10px;
          width: 100px;
        }
      }
    }
    .el-checkbox {
      font-weight: bold;
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
  // color: white;
  margin-bottom: 10px;
  margin-left: 10px;
}
.el-checkbox.is-bordered {
  height: auto;
  width: 22%;
}

</style>
