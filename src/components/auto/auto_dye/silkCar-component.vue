<template>
  <div class="silkCar">
    <el-row type="flex" :gutter="20" v-for="row in rows" :key="row">
      <el-col :span="24/cols" class="span" v-for="col in cols " :key="col">
        <span>{{row}}×{{col}}</span>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <el-form :model="silkDetail">
            <el-form-item label="灰卡级别">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="是否异常">
              <el-radio v-model="radio1" label="1">是</el-radio>
              <el-radio v-model="radio1" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="染判类型">
              <el-radio v-model="radio2" label="1">普染</el-radio>
              <el-radio v-model="radio2" label="2">敏染</el-radio>
            </el-form-item>
            <el-form-item label="判降等级">
              <el-radio v-model="radio3" label="1">F</el-radio>
              <el-radio v-model="radio3" label="2">D</el-radio>
              <el-radio v-model="radio3" label="3">L</el-radio>
              <el-radio v-model="radio3" label="4">OF</el-radio>
              <el-radio v-model="radio3" label="5">OD</el-radio>
              <el-radio v-model="radio3" label="6">OL</el-radio>
            </el-form-item>
            <el-form-item label="丝锭等级">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="降等原因">
              <el-select></el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference"></el-button>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  props: ['rows', 'cols', 'silkDetail'],
  data () {
    return {
      radio1: '1',
      radio2: '2',
      radio3: '3'
    }
  },
  created () {},
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .span {
    text-align: right;
    background: #eef2f6;
    border: 1px solid #d9dfe5;
  }
  .silkCar {
    margin-top: -10px;
    text-align: center;
    .span {
      /*margin-left: 10px;*/
      padding: 10px;
    }
  }
  .el-radio {
    width: 20px;
  }
</style>
