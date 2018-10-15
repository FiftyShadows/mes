<!-- 暂存箱管理 -->
<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item style="float: left">
        <el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible = true;addTemporaryBox"></el-button>
      </el-form-item>
      <el-form-item style="float: left">
        <el-button type="success" icon="el-icon-printer" @click="batchPrint()" circle></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="600"
      stripe
      border
      ref="multipleTable"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="code" label="暂存箱码" width="180">
      </el-table-column>
      <el-table-column prop="batch.batchNo" label="批号">
      </el-table-column>
      <el-table-column prop="grade.name" label="等级" width="180">
      </el-table-column>
      <el-table-column prop="silkCount" label="暂存数量" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true;updateTemporaryBox(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="operate + '暂存箱'" width="25%">
      <el-form :model="dialogForm" label-width="110px" :lable-posision="'left'">
        <el-form-item label="暂存箱码">
          <el-input v-model="dialogForm.code"></el-input>
        </el-form-item>
        <el-form-item label="批号">
          <el-select v-model="dialogForm.batch" placeholder="请选择批号" filterable clearable remote reserve-keyword :remote-method="getBatches">
            <el-option v-for="batch in batches" :key="batch.id" :label="batch.batchNo" :value="batch"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="dialogForm.gradeId" placeholder="请选择等级">
            <el-option v-for="grade in grades" :key="grade.id" :label="grade.name" :value="grade.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;ok()">确 定</el-button>
      </div>
    </el-dialog>
    <div v-show="false">
      <print-temporary-box :printData="printData"></print-temporary-box>
    </div>
  </div>
</template>
<script>
import printTemporaryBox from '../../common/print_temporary_box'
export default {
  name: 'temporaryBox',
  components: {
    'print-temporary-box': printTemporaryBox
  },
  data () {
    return {
      loading: true,
      dialogVisible: false,
      batches: [],
      grades: [],
      operate: '',
      dialogForm: {},
      multipleSelection: [],
      printData: [],
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
    this.getTemporaryBoxs()
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
    getTemporaryBoxs () {
      this.$api.getTemporaryBoxs().then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    addTemporaryBox () {
      this.operate = '增加'
      this.dialogForm = {}
    },
    updateTemporaryBox (row) {
      this.operate = '修改'
      this.dialogForm.code = row.code
      this.dialogForm.batch = row.batch
      this.dialogForm.gradeId = row.grade.id
      this.dialogForm.id = row.id
    },
    ok () {
      let params = {
        id: this.dialogForm.id,
        code: this.dialogForm.code,
        batch: {
          id: this.dialogForm.batch.id
        },
        grade: {
          id: this.dialogForm.gradeId
        }
      }
      if (!params.id) {
        this.$api.addTemporaryBox(params).then(res => {
          this.getTemporaryBoxs()
        })
      } else {
        this.$api.updateTemporaryBox(params).then(res => {
          this.getTemporaryBoxs()
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    batchPrint () {
      let selection = this.util.deepClone(this.multipleSelection)
      this.$nextTick(() => {
        this.printData = selection
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
