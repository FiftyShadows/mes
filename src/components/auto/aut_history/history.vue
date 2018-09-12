<template>
  <div class="history">
    <div style="height: 50px">
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="选择日期时间" style="float: left">
      </el-date-picker>
      <span style="float: left;margin-top: 10px">至</span>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="选择日期时间" style="float: left">
      </el-date-picker>
      <!--<el-select v-model="code" placeholder="请输入批号" style="float: left;margin-left: 10px">-->
        <!--<el-option v-for="item in options" :key="item.id" :label="item.code" :value="item.number"></el-option>-->
      <!--</el-select>-->
      <el-button type="primary" icon="el-icon-search" style="float: left;margin-left: 10px"></el-button>
      <el-radio-group v-model="order" style="float: right;" @change="changeOrder">
        <el-radio-button label="正序"></el-radio-button>
        <el-radio-button label="逆序"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="current-main">
      <el-card>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'history',
  data () {
    return {
      options: [],
      order: '正序',
      tableData: [],
      startTime: this.util.getCurrentFormatDateSE().startTime,
      endTime: this.util.getCurrentFormatDateSE().endTime
    }
  },
  created () {
    this.getSilkCarRecords()
  },
  methods: {
    getSilkCarRecords () {
      this.$api.getSilkCarRecords().then(res => {
        console.log(res.data);
        this.tableData = res.data.silkCarRecords
      })
    },
    changeOrder (val) {
      if (val === '正序') {
        this.eventSources.sort(function (a, b) {
          return a - b
        })
      } else {
        this.eventSources.sort(function (a, b) {
          return b - a
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
