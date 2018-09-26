<template>
  <h5>已然染判的页面</h5>
</template>
<script>
export default {
  name: 'current',
  data () {
    return {
    }
  },
  created () {},
  methods: {

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
      .silkCarRecord {
        width: 100%;
        height: 60px;
        background: white;
        position: relative;
        left: 10px;
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
