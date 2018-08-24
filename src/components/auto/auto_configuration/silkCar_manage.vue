<!-- 丝车管理 -->
<template>
  <div class="silkCar">
    <div style="float: left; margin-bottom: 10px;">
      <el-input v-model.trim="silk" placeholder="请输入..." style="width: 200px;"></el-input>
      <el-button type="primary" icon="el-icon-search" circle @click="getSilks()" ></el-button>
    </div>
    <el-button type="primary" @click="openAddSilk()" style="float: right; margin-bottom: 10px;">新 增</el-button>

    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="code" label="丝车条码">
      </el-table-column>
      <el-table-column prop="number" label="丝车编号">
      </el-table-column>
      <el-table-column prop="row" label="行" width="60">
      </el-table-column>
      <el-table-column  prop="col" label="列" width="60">
      </el-table-column>
      <el-table-column prop="type" label="丝车类型">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openSaveSilk(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" 
      :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
    </el-pagination>

    <el-dialog title="新 增" :visible.sync="dialogFormVisibleAdd" @close="getSilks()" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth" prop="number" required>
          <el-input v-model="form.number" auto-complete="off" @input="changeCode()"  style="width: 60%; float: left;" ></el-input>
        </el-form-item>
        <el-form-item label="条码" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="行" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.row" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="列" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.col" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type" style="width: 60%; float: left;">
            <el-radio-button label="普通丝车"></el-radio-button>
            <el-radio-button label="大 丝 车"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="addSilks()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogFormVisibleSave" @close="getSilks()" width="40%">
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form1.name" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth" prop="number" required>
          <el-input v-model="form1.number" auto-complete="off" @input="changeCode()"  style="width: 60%; float: left;" ></el-input>
        </el-form-item>
        <el-form-item label="条码" :label-width="formLabelWidth">
          <el-input v-model="form1.code" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="行" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form1.row" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="列" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form1.col" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-radio-group v-model="form1.type" style="width: 60%; float: left;">
            <el-radio-button label="普通丝车"></el-radio-button>
            <el-radio-button label="大丝车"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="saveSilks()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'silkCar',
  data () {
    return {
      tableData: [],
      currentPage: 5,
      total: 0,
      silk: '',
      pageSize: '20',
      first: '0',
      form: {
        name: '高新',
        number: '',
        code: '',
        row: 3,
        col: 4,
        type: '普通丝车'
      },
      formLabelWidth: '120px',
      dialogFormVisibleAdd: false,
      form1: {
        name: '高新',
        number: '',
        code: '',
        row: 3,
        col: 4,
        type: '普通丝车'
      },
      dialogFormVisibleSave: false,
      rules: {
        number: [{ required: true, message: '必输项...', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getSilks ()
  },
  methods: {
    getSilks () {
      console.log(this.pageSize, this.first, this.silk)
      this.$api.getSilks({
        pageSize: this.pageSize,
        first: this.first,
        q: this.silk
      }).then(res => {
        console.log(res)
        this.total = res.data.count
        this.tableData = res.data.silkCars
        for (let i = 0 ; i < this.tableData.length ; i++) {
          if (this.tableData[i].type === 'BIG_SILK_CAR') {
            this.tableData[i].type = '大丝车'
          } else {
            this.tableData[i].type = '普通丝车'
          }
        }
      })
    }, 
    closeDialog () {
      this.dialogFormVisibleAdd = false
      this.dialogFormVisibleSave = false
      this.getSilks ()
    },
    seacrhSilk () {},
    changeCode () {
      if (this.form.number === '') {
        this.form.code = ''
      } else {
        this.form.code = `3000${this.form.number}`
      }
      if (this.form1.number === '') {
        this.form1.code = ''
      } else {
        this.form1.code = `3000${this.form1.number}`
      }
    },
    openAddSilk () {
      this.dialogFormVisibleAdd = true
    },
    addSilks () {
      if (this.form.type === '普通丝车') {
        this.form.type = 'DEFAULT'
      } else {
        this.form.type = 'BIG_SILK_CAR'
      }
      console.log(this.form)
      this.$api.addSilks(this.form).then(res => {
        this.getSilks()
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
        this.dialogFormVisibleAdd = false
      })
    },
    openSaveSilk (row) {
      console.log(row)
      this.form1 = row
      this.form1.name = '高新'
      this.dialogFormVisibleSave = true
    },
    saveSilks () {
      if (this.form1.type === '普通丝车') {
        this.form1.type = 'DEFAULT'
      } else {
        this.form1.type = 'BIG_SILK_CAR'
      }
      this.$api.saveSilks(this.form1).then(res => {
        this.getSilks()
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.dialogFormVisibleSave = false
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getSilks (this.pageSize, this.first, this.silk)
    },
    handleCurrentChange(val) {
      this.first = (--val)*this.pageSize
      console.log(`当前页: ${this.first}`);
      this.getSilks (this.pageSize, this.first, this.silk)
    }
  }
}
</script>

