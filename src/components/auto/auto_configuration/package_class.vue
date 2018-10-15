<!-- 班次管理 -->
<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible = true;addPackageClass()" style="float: left"></el-button>
    <el-table v-loading="loading" :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column prop="name" label="打包班次" width="180">
      </el-table-column>
      <el-table-column prop="packageCode" label="箱包唛头" width="180">
      </el-table-column>
      <el-table-column prop="sortBy" label="权重" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true;updatePackageClass(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="operate + '打包班次'" width="25%">
      <el-form :model="dialogForm" label-width="110px" :lable-posision="'left'">
        <el-form-item label="打包班次">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="箱包唛头">
          <el-input v-model="dialogForm.packageCode"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="dialogForm.sortBy"></el-input>
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
  name: 'temporaryBox',
  data () {
    return {
      loading: true,
      dialogVisible: false,
      batches: [],
      grades: [],
      operate: '',
      dialogForm: {},
      tableData: []
    }
  },
  watch: {
    dialogVisible (oldVal, newVal) {
      if (!newVal && oldVal) {
        this.getGrades()
      }
    }
  },
  created () {
    this.getPackageClasses()
  },
  methods: {
    getBatches (val) {
      let params = {
        q: val
      }
      this.$api.getBatches(params).then(res => {
        this.batches = res.data.batches
      })
    },
    getGrades () {
      this.$api.getGrades().then(res => {
        this.grades = res.data
      })
    },
    getPackageClasses () {
      this.$api.getPackageClasses().then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    addPackageClass () {
      this.operate = '增加'
      this.dialogForm = {}
    },
    updatePackageClass (row) {
      this.operate = '修改'
      this.dialogForm.name = row.name
      this.dialogForm.packageCode = row.packageCode
      this.dialogForm.sortBy = row.sortBy
      this.dialogForm.id = row.id
    },
    ok () {
      let params = {
        id: this.dialogForm.id,
        name: this.dialogForm.name,
        packageCode: this.dialogForm.packageCode,
        sortBy: this.dialogForm.sortBy
      }
      if (!params.id) {
        this.$api.addPackageClass(params).then(res => {
          this.getPackageClasses()
        })
      } else {
        this.$api.updatePackageClass(params).then(res => {
          this.getPackageClasses()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
