<template>
  <div>
      <el-form :model="form">
        <el-form-item label="灰卡级别">
          <!--<el-select></el-select>-->
        </el-form-item>
        <el-form-item label="是否异常">
          <el-radio v-model="form.radio1" label="1">是</el-radio>
          <el-radio v-model="form.radio1" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="染判类型">
          <el-radio v-model="form.radio2" label="1">普染</el-radio>
          <el-radio v-model="form.radio2" label="2">敏染</el-radio>
        </el-form-item>
        <el-form-item label="判降等级">
          <el-radio v-model="form.radio3" label="F">F</el-radio>
          <el-radio v-model="form.radio3" label="D">D</el-radio>
          <el-radio v-model="form.radio3" label="L">L</el-radio>
          <el-radio v-model="form.radio3" label="OF">OF</el-radio>
          <el-radio v-model="form.radio3" label="OD">OD</el-radio>
          <el-radio v-model="form.radio3" label="OL">OL</el-radio>
        </el-form-item>
        <el-form-item label="丝锭等级">
          <!--<el-select></el-select>-->
        </el-form-item>
        <el-form-item label="降等原因">
          <!--<el-select></el-select>-->
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data () {
    return {
      form: {
        radio1: '1',
        radio2: '2',
        radio3: 'F'
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style>
  .font {
    line-height: 0.5px;
    /*color: #00BFFF;*/
    font-weight: 100;
    width: 10px;
  }
  .buttonColor {
    background-color: cornflowerblue;
  }
</style>
