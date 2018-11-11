<!-- 丝车管理 -->
<template>
  <div class="silkCar">
    <div style="float: left; margin-bottom: 10px;">
      <el-input v-model.trim="silk" placeholder="请输入..." style="width: 200px;"></el-input>
      <el-button type="primary" icon="el-icon-search" circle @click="getSilks()" ></el-button>
    </div>
    <el-button type="primary" @click="dialogVisibleBatchAdd = true" style="float: right;margin-bottom: 10px;">批量新增</el-button>
    <el-button type="primary" @click="dialogFormVisibleAdd = true" style="float: right;margin-bottom: 10px;margin-right: 10px;">新 增</el-button>

    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed label="丝车条码">
        <template slot-scope="scope">
          <span @dblclick="showQrCode(scope.row.code)">{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="丝车编号">
      </el-table-column>
      <el-table-column label="行×列" width="60">
        <template slot-scope="scope">
          {{scope.row.row}}×{{scope.row.col}}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="丝车类型">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openSaveSilk(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
    </el-pagination>

    <el-dialog title="新 增" :visible.sync="dialogFormVisibleAdd" @close="getSilks()" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="number" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off" @input="changeCode()"  style="width: 60%; float: left;" ></el-input>
        </el-form-item>
        <el-form-item label="条码" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="行" prop="row" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.row" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="列" prop="col" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.col" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type" style="width: 60%; float: left;">
            <el-radio-button label="普通丝车"></el-radio-button>
            <el-radio-button label="大 丝 车"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="addSilks('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量新增" :visible.sync="dialogVisibleBatchAdd" @close="getSilks()" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width: 60%;float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="行" prop="row" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.row" style="width: 120px;float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="列" prop="col" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form.col" style="width: 120px;float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type" style="width: 60%; float: left;">
            <el-radio-button label="普通丝车"></el-radio-button>
            <el-radio-button label="大 丝 车"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="批量" :label-width="formLabelWidth" required>
          <el-input v-model="form.items.startItem" auto-complete="off" style="width: 80px;float:left;"></el-input>
          <span style="float: left;"> —— </span>
          <el-input v-model="form.items.endItem" auto-complete="off" style="width: 80px;float:left;"></el-input>
          <!-- <span style="color: red;">*首字母需要相同</span> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="AddBatchSilk('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogFormVisibleSave" @close="getSilks()" width="40%">
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form1.name" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="number" :label-width="formLabelWidth" required>
          <el-input v-model="form1.number" auto-complete="off" @input="changeCode()"  style="width: 60%; float: left;" ></el-input>
        </el-form-item>
        <el-form-item label="条码" :label-width="formLabelWidth">
          <el-input v-model="form1.code" auto-complete="off" style="width: 60%; float: left;" disabled></el-input>
        </el-form-item>
        <el-form-item label="行" prop="row" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form1.row" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="列" prop="col" :label-width="formLabelWidth">
          <el-input-number size="small" v-model="form1.col" style="width: 120px; float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-radio-group v-model="form1.type" style="width: 50%; float: left;">
            <el-radio-button label="普通丝车"></el-radio-button>
            <el-radio-button label="大丝车"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="saveSilks('form1')">确 定</el-button>
      </div>
    </el-dialog>
    <qr-code-dialog ref="qrCode"></qr-code-dialog>
  </div>
</template>
<script>
import QrCodeDialog from '../../common/qr-code-dialog'

export default {
  components: {QrCodeDialog},
  name: 'silkCar',
  data () {
    return {
      loading: false,
      tableData: [],
      dialogVisibleBatchAdd: false,
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
        type: '普通丝车',
        items: {
          startItem: '',
          endItem: ''
        }
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
        number: [{ required: true, message: '必输项...', trigger: 'blur' }],
        col: [{ required: true, message: '必输项...', trigger: 'blur' }],
        row: [{ required: true, message: '必输项...', trigger: 'blur' }],
        item: [{ required: true, message: '必输项...', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getSilks()
  },
  methods: {
    getSilks () {
      this.loading = true
      console.log(this.pageSize, this.first, this.silk)
      this.$api.getSilks({
        pageSize: this.pageSize,
        first: this.first,
        q: this.silk
      }).then(res => {
        console.log(res)
        this.total = res.data.count
        this.tableData = res.data.silkCars
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type === 'BIG_SILK_CAR') {
            this.tableData[i].type = '大丝车'
          } else {
            this.tableData[i].type = '普通丝车'
          }
        }
        this.loading = false
      })
    },
    closeDialog () {
      this.dialogFormVisibleAdd = false
      this.dialogFormVisibleSave = false
      this.dialogVisibleBatchAdd = false
      this.getSilks()
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
    addSilks (formName) {
      if (this.form.type === '普通丝车') {
        this.form.type = 'DEFAULT'
      } else {
        this.form.type = 'BIG_SILK_CAR'
      }
      // console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addSilks(this.form).then(res => {
            this.getSilks()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisibleAdd = false
          })
        } else {
          return false
        }
      })
    },
    AddBatchSilk (formName) {
      if (this.form.type === '普通丝车') {
        this.form.type = 'DEFAULT'
      } else {
        this.form.type = 'BIG_SILK_CAR'
      }
      // console.log(this.form)
      let reg1 = /[0-9]+$/g
      let reg2 = /^[a-zA-Z]+/g
      let startword = this.form.items.startItem.match(reg2)
      let startnum = this.form.items.startItem.match(reg1)
      console.log(startword[0])
      console.log(this.form.items.startItem.match(reg1))

      let endword = this.form.items.endItem.match(reg2)
      let endnum = this.form.items.endItem.match(reg1)
      console.log(endword, endnum)
      if (startword || endword) {
        if ((startword == null && endword != null) || (startword != null && endword == null) || (startword[0] !== endword[0])) {
          this.$message.error('批量输入错误，前缀不同！')
          return
        }
      }

      if (startnum && endnum) {
        // if ((startnum == null && endnum != null) || (startnum != null && endnum == null)) {
        //   this.$message.error("批量输入错误，没有数字进行批量操作！");
        // }
        if (Number(endnum) < Number(startnum)) {
          this.$message.error('批量输入错误，后部数字应大于前部数字！')
          return
        } else if (endnum[0].length !== startnum[0].length) {
          this.$message.error('批量输入错误，数字位数不相等！')
          return
        }
      } else {
        this.$message.error('批量输入错误，没有数字进行批量操作！')
        return
      }
      let arr = []
      for (let i = 0; i <= Number(endnum[0]) - Number(startnum[0]); i++) {
        let num = Number(startnum[0]) + i
        let zero = ''
        for (let j = 0; j < startnum[0].length - Number(num).toString().length; j++) {
          zero = zero + '0'
        }
        this.form.item = startword[0] + zero + num.toString()
        if (this.form.item === '') {
          this.form.code = ''
        } else {
          this.form.code = `3000${this.form.item}`
        }
        if (this.form1.item === '') {
          this.form1.code = ''
        } else {
          this.form1.code = `3000${this.form1.item}`
        }
        arr.push({
          code: this.form.code,
          col: this.form.col,
          row: this.form.row,
          number: this.form.item,
          type: this.form.type
        })
      }
      console.log(arr)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            commands: arr
          }
          this.$api.addBatchSilks(obj).then(res => {
            this.getSilks()
            this.dialogVisibleBatchAdd = false
          })
        } else {
          return false
        }
      })
    },
    openSaveSilk (row) {
      console.log(row)
      this.form1 = row
      this.form1.name = '高新'
      this.dialogFormVisibleSave = true
    },
    saveSilks (formName) {
      if (this.form1.type === '普通丝车') {
        this.form1.type = 'DEFAULT'
      } else {
        this.form1.type = 'BIG_SILK_CAR'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.saveSilks(this.form1).then(res => {
            this.getSilks()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisibleSave = false
          })
        } else {
          return false
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getSilks(this.pageSize, this.first, this.silk)
    },
    handleCurrentChange (val) {
      this.first = (--val) * this.pageSize
      console.log(`当前页: ${this.first}`)
      this.getSilks(this.pageSize, this.first, this.silk)
    },
    showQrCode (code) {
      this.$refs.qrCode.showDialog(code)
    }
  }
}
</script>
