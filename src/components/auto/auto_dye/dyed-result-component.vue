<!--已染判记录组件-->
<template>
  <div>
    <el-row type="flex" :gutter="10">
      <el-col :span="22" style="margin-left: -10px">
        <el-card  class="card">
          <el-col :span="24">
            <!--非位于与位织袜的情况，一条记录一车-->
          <div v-if="dyedResult.type !== 'CROSS_LINEMACHINE_LINEMACHINE'">
            <dyed-silk-car-component :dyedResults="dyedResults1" :dyedResult="dyedResult1" :silks="dyedResult.silks" :silkCarRecord="dyedResult.silkCarRecord"></dyed-silk-car-component>
          </div>
            <!--位与位交织，一条记录两车-->
          <div v-if="dyedResult.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <dyed-silk-car-component :dyedResults="dyedResults1" :dyedResult="dyedResult1" :silks="dyedResult.silks1" :silkCarRecord="dyedResult.silkCarRecord1"></dyed-silk-car-component>
          </div>
          <div v-if="dyedResult.type === 'CROSS_LINEMACHINE_LINEMACHINE'">
            <dyed-silk-car-component :dyedResults="dyedResults1" :dyedResult="dyedResult1" :silks="dyedResult.silks2" :silkCarRecord="dyedResult.silkCarRecord2"></dyed-silk-car-component>
          </div>
          </el-col>
          <div class="tag">
            <span v-if="dyedResult.type === 'FIRST'">一次</span>
            <span v-if="dyedResult.type === 'CROSS_LINEMACHINE_SPINDLE'">位锭</span>
            <span v-if="dyedResult.type === 'CROSS_LINEMACHINE_LINEMACHINE'">位位</span>
            <span v-if="dyedResult.type === 'SECOND'">二次</span>
            <span v-if="dyedResult.type === 'THIRD'">三次</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import dyedSilkCarComponent from './dyed-silk-car-component'
export default {
  props: ['dyedResult', 'dyedResults'],
  components: {
    'dyed-silk-car-component': dyedSilkCarComponent
  },
  data () {
    return {
      dyedResult1: this.dyedResult,
      dyedResults1: this.dyedResults
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .el-radio {
    width: 20px;
  }
  .el-button {
    padding: 10px 20px;
  }
  .select {
    background-color: cornflowerblue;
  }
  .card {
    margin-top: 10px;
    border: chocolate;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .span {
    text-align: right;
    background: #eef2f6;
    border: 1px solid #d9dfe5;
  }
  .value {
    text-align: left;
    border: 1px solid #d9dfe5;
  }
  .position {
    text-align: center;
    .span {
      text-align: center;
      padding: 10px;
    }
    .register {
      text-align: center;
      background: #eef2f6;
      border: 1px solid #d9dfe5;
    }
  }
  .checkbox{
    border: 1px solid #d9dfe5;
    background: white;
    margin-top: 10px;
  }
  .checkAll{
    margin-top: 10px;
  }
  .tag{
    position: absolute;
    top: 10px;
    left: 0;
    width: 0;
    height: 0;
    color: #fff;
    border: 15px solid #ff0000;
    border-bottom-color: transparent;
    border-right-color: transparent;
    span{
      width: 24px;
      display: block;
      font-size: 12px;
      margin-left: -15px;
      margin-top: -15px;
      transform: rotateZ(-45deg);
    }
  }
</style>
