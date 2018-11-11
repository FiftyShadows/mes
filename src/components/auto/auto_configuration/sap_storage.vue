<!-- 班次管理 -->
<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible = true;addSapStorage()" style="float: left"></el-button>
    <el-table v-loading="loading" :data="tableData" min-height="500" border style="width: 100%">
      <el-table-column prop="lgort" label="lgort" width="500">
      </el-table-column>
      <el-table-column prop="lgobe" label="lgobe" width="500">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true;updateSapStorage(scope.row)" type="text" size="small">修改</el-button>
          <!--<el-button @click="deleteSapStorage(scope.row)" type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="operate + 'SAP库存地'" width="25%">
      <el-form :model="dialogForm" label-width="110px" :lable-posision="'left'">
        <el-form-item label="sap编码">
          <el-input v-model="dialogForm.lgort"></el-input>
        </el-form-item>
        <el-form-item label="sap名称">
          <el-input v-model="dialogForm.lgobe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;ok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'sap-storage',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      operate: '',
      dialogForm: {},
      tableData: []
    }
  },
  created () {
    this.getSapStorages()
  },
  methods: {
    getSapStorages () {
      this.$api.getSapStorages().then(res => {
        this.tableData = res.data
      })
    },
    addSapStorage () {
      this.dialogForm = {}
    },
    updateSapStorage (row) {
      this.dialogForm.lgort = row.lgort
      this.dialogForm.lgobe = row.lgobe
    },
    // deleteSapStorage (row) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //       console.log('删除')
    //     })
    //     .catch(_ => {})
    // },
    ok () {
      let params = {
        lgort: this.dialogForm.lgort,
        lgobe: this.dialogForm.lgobe
      }
      this.$api.createSapStorage(params).then(res => {
        this.getSapStorages()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
