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
            <el-checkbox v-if="batch.sideType === 'A'" v-for="(batch,index) in batchOptions" :label="batch" :key="batch" border>
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
            <el-checkbox v-if="batch.sideType === 'B'" v-for="(batch,index) in batchOptions" :label="batch" :key="batch" border>
              {{batch.sideType}}-{{batch.row}}-{{batch.col}}
              <br>
              <span style="color: #F56C6C; font-weight: bolder;">{{batch.silk.lineMachine.line.name}}-{{index}}/{{batch.silk.lineMachine.item}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="right">
        <ul>
          <li v-for="i in 100" :key="i">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </li>
        </ul>
      </div>
    </div>
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
        this.silkCarRecord = this.searchData.silkCarRecord
        this.eventSources = this.searchData.eventSources
        if (this.silkCarRecord.doffingType === 'MANUAL') {
          this.doffingType = '手动落桶'
        } else {
          this.doffingType = '自动落桶'
        }
        for (let i = 0; i < this.eventSources.length; i++) {
          this.$api.getOperators(this.eventSources[i].operator.id).then(res => {
            console.log(res.data)
            this.eventSources[i].operator = res.data
          })
        }
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
        this.options = [];
      }
    },
    handleCheckAllAChange(val) {
      this.checkedBatchA = val ? this.batchOptions : []
      this.isIndeterminate = false
    },
    handleCheckedBatchAChange(value) {
      let checkedCount = value.length
      this.checkAllA = checkedCount === this.batchOptions.length
      this.isIndeterminateA = checkedCount > 0 && checkedCount < this.batchOptions.length
    },
    handleCheckAllBChange(val) {
      this.checkedBatchB = val ? this.batchOptions : [];
      this.isIndeterminate = false
    },
    handleCheckedBatchBChange(value) {
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
  width: 480px;
}
</style>
