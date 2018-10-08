<!--已染判丝车组件-->
<template>
  <div class="silkCar">
    <el-row type="flex" :gutter="20" v-for="row in rows" :key="row">
      <el-col :span="24/cols" class="span" v-for="col in cols " :key="col">
        <span>{{row}}×{{col}}</span>

        <el-tooltip placement="left">
          <div slot="content">普染<br/>第二行信息</div>
          <el-button>普染</el-button>
        </el-tooltip>

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
