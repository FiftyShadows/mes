<!-- 批号管理 -->
<template>
  <div class="batchManage">
    <div style="float: left; margin-bottom: 10px;">
      <el-input v-model="seacrhBatch" placeholder="请输入批号..." style="width: 200px;"></el-input>
      <el-button type="primary" icon="el-icon-search" circle @click="seach()" ></el-button>
    </div>
    <el-button type="primary" @click="openAddBatch()" style="float: right; margin-bottom: 10px;">新 增</el-button>
    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="workshop.name" label="车间">
      </el-table-column>
      <el-table-column prop="product.name" label="产品">
      </el-table-column>
      <el-table-column prop="batchNo" label="批号">
      </el-table-column>
      <el-table-column prop="spec" label="规格">
      </el-table-column>
      <el-table-column prop="silkWeight" label="锭重(kg)">
      </el-table-column>
      <el-table-column prop="tubeColor" label="纸管颜色">
      </el-table-column>
      <el-table-column prop="note" label="备注">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="openSaveBatch(scope.row)" type="text" size="small">修 改</el-button>
          <!-- <el-button @click="deleteBatch(scope.row)" type="text" size="small">删 除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
    </el-pagination>

    <el-dialog title="新 增" :visible.sync="dialogVisibleAdd" width="40%">
      <el-form :model="form" ref="form" :rules="rules" class="demo-ruleForm">
        <el-form-item label="车间" :label-width="formLabelWidth" prop="workshopId">
          <el-select v-model="form.workshopId" clearable placeholder="请选择" style="float: left;">
            <el-option v-for="workshop in workshops" :key="workshop.name" :label="workshop.name" :value="workshop.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品" :label-width="formLabelWidth" prop="productId">
          <el-select v-model="form.productId" clearable placeholder="请选择" style="float: left;">
            <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批号" :label-width="formLabelWidth" prop="batchNo" required>
          <el-input v-model="form.batchNo" auto-complete="off" style="float: left; width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth" prop="spec" required>
          <el-input v-model="form.spec" auto-complete="off" style="float: left; width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="锭重(kg)" :label-width="formLabelWidth" prop="silkWeight" required>
          <el-input-number v-model="form.silkWeight" :min="0" label="锭重(kg)" style="float: left;"></el-input-number>( kg )
        </el-form-item>
        <el-form-item label="中间值" :label-width="formLabelWidth" prop="centralValue" required>
          <el-input-number v-model="form.centralValue" :min="0" label="中间值" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="孔数" :label-width="formLabelWidth" prop="holeNum" required>
          <el-input-number v-model="form.holeNum" :min="0" label="孔数" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="纸管颜色" :label-width="formLabelWidth" prop="tubeColor" required>
          <el-input v-model="form.tubeColor" auto-complete="off" style="float: left; width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
          <el-input v-model="form.note" type="textarea" autosize auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddBatch('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogVisibleSave" width="40%" @close="closeDialog()">
      <el-form :model="form2" :rules="rules" ref="form2" class="demo-ruleForm">
        <el-form-item label="车间" :label-width="formLabelWidth" prop="workshopId">
          <el-select v-model="form2.workshopId" clearable placeholder="请选择" style="float: left;">
            <el-option v-for="workshop in workshops" :key="workshop.name" :label="workshop.name" :value="workshop.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品" :label-width="formLabelWidth" proholeNump="productId">
          <el-select v-model="form2.productId" clearable placeholder="请选择" style="float: left;">
            <el-option v-for="product in products" :key="product.id" :label="product.name" :value="product.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批号" :label-width="formLabelWidth" prop="batchNo">
          <el-input v-model="form2.batchNo" auto-complete="off" style="float: left; width: 200px;" required></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth" prop="spec">
          <el-input v-model="form2.spec" auto-complete="off" style="float: left; width: 200px;" required></el-input>
        </el-form-item>
        <el-form-item label="锭重(kg)" :label-width="formLabelWidth" prop="silkWeight" required>
          <el-input-number v-model="form2.silkWeight" :min="0" label="锭重(kg)" style="float: left;"></el-input-number>( kg )
        </el-form-item>
        <el-form-item label="中间值" :label-width="formLabelWidth" prop="centralValue" required>
          <el-input-number v-model="form2.centralValue" :min="0" label="中间值" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="孔数" :label-width="formLabelWidth" prop="holeNum" required>
          <el-input-number v-model="form2.holeNum" :min="0" label="孔数" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="纸管颜色" :label-width="formLabelWidth" prop="tubeColor" required>
          <el-input v-model="form2.tubeColor" auto-complete="off" style="float: left; width: 200px;" required></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
          <el-input v-model="form2.note" type="textarea" autosize auto-complete="off" required></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="SaveBatch('form2')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'batchManage',
  data () {
    return {
      loading: false,
      isADD: true,
      currentPage2: 5,
      tableData: [],
      seacrhBatch: '',
      total: 0,
      dialogVisibleAdd: false,
      dialogVisibleSave: false,
      formLabelWidth: '120px',
      pageSize: '20',
      first: '0',
      products: [],
      workshops: [],
      form: {
        workshopId: '',
        productId: '',
        batchNo: '',
        spec: '',
        silkWeight: '',
        tubeColor: '',
        holeNum: '', // 孔数
        centralValue: '', // 中间值
        note: ''
      },
      form2: {
        workshopId: '',
        productId: '',
        batchNo: '',
        spec: '',
        silkWeight: '',
        tubeColor: '',
        holeNum: '',
        centralValue: '',
        note: ''
      },
      rules: {
        workshopId: [{ required: true, message: '必输项...', trigger: 'change' }],
        productId: [{ required: true, message: '必输项...', trigger: 'change' }],
        batchNo: [{ required: true, message: '必输项...', trigger: 'blur' }],
        spec: [{ required: true, message: '必输项...', trigger: 'blur' }],
        silkWeight: [{ required: true, message: '必输项...', trigger: 'blur' }],
        centralValue: [{ required: true, message: '必输项...', trigger: 'blur' }],
        holeNum: [{ required: true, message: '必输项...', trigger: 'blur' }],
        tubeColor: [{ required: true, message: '必输项...', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.$api.getBatches({
      pageSize: 50,
      first: 0,
      q: ''
    }).then(res => {
      this.total = res.data.batches.length
    })
    this.getBatch(this.pageSize, this.first, this.seacrhBatch)
    this.$api.getWorkShopsLine().then(res => { // 获取select
      this.workshops = res.data
    })
    this.$api.getProduct().then(res => {
      this.products = res.data
    })
  },
  methods: {
    getBatch (pageSize, first, q) {
      this.loading = true
      this.$api.getBatches({
        pageSize: pageSize,
        first: first,
        q: q
      }).then(res => {
        this.tableData = res.data.batches
        this.loading = false
      })
    },
    seach () {
      this.$api.getBatches({
        pageSize: this.pageSize,
        first: this.first,
        q: this.seacrhBatch
      }).then(res => {
        this.tableData = res.data.batches
        this.total = this.tableData.length
      })
    },
    closeDialog () {
      this.getBatch(this.pageSize, this.first, this.seacrhBatch)
    },
    openSaveBatch (row) {
      this.form2 = row
      this.form2.workshopId = row.workshop.id
      this.form2.productId = row.product.id
      this.dialogVisibleSave = true
    },
    SaveBatch (formName) {
      this.form2.workshop = {
        id: this.form2.workshopId
      }
      this.form2.product = {
        id: this.form2.productId
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.SaveBatches(this.form2).then(res => {
            this.getBatch(this.pageSize, this.first, this.seacrhBatch)
            this.dialogVisibleSave = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    openAddBatch () {
      this.dialogVisibleAdd = true
    },
    deleteBatch (row) {
      this.$api.deleteBatch(row.id).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
      })
    },
    AddBatch (formName) {
      this.form.workshop = {
        id: this.form.workshopId
      }
      this.form.product = {
        id: this.form.productId
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addBatch(this.form).then(res => {
            this.getBatch(this.pageSize, this.first, this.seacrhBatch)
            this.dialogVisibleAdd = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getBatch(this.pageSize, this.first, this.seacrhBatch)
    },
    handleCurrentChange (val) {
      this.first = (--val) * this.pageSize
      this.getBatch(this.pageSize, this.first, this.seacrhBatch)
    }
  }
}
</script>
