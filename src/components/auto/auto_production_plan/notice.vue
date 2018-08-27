<!-- 通知单 -->
<template>
<div class="notice">
  <div style="float: left; margin-bottom: 10px;">
    <el-input v-model="q" placeholder="请输入内容..." style="width: 200px;"></el-input>
    <el-button type="primary" icon="el-icon-search" circle @click="getNotice()" ></el-button>
  </div>
  <el-button type="primary" @click="openAddNotice()" style="float: right; margin-bottom: 10px;">新 增</el-button>
  <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
    <el-table-column fixed prop="type" label="类型">
    </el-table-column>
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="batch.batchNo" label="批号">
    </el-table-column>
    <el-table-column prop="startDate" label="开始日期">
    </el-table-column>
    <el-table-column prop="endDate" label="结束日期">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button @click="openSaveNotice(scope.row)" type="text" size="small">修 改</el-button>
        <el-button @click="perform(scope.row)" type="text" size="small">执行情况</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" 
    :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
  </el-pagination>

  <el-dialog title="新 增" :visible.sync="dialogFormVisibleAdd" width="35%">
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
      <el-form-item label="名称" :label-width="formLabelWidth" required>
        <el-input v-model="form.name" auto-complete="off" style="width: 60%; float: left;"></el-input>
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type" style="float: left;">
          <el-radio-button label="样品"></el-radio-button>
          <el-radio-button label="改批"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="批号" :label-width="formLabelWidth" required>
        <el-input v-model="form.batchNo" auto-complete="off" style="width: 60%; float: left;"></el-input>
      </el-form-item>
      <el-form-item label="开始日期" :label-width="formLabelWidth" required>
        <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期" style="float: left;"></el-date-picker>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth" required>
        <el-tag type="info" style="float: left; width: 80%;text-align: left;">
          机台 *
          <el-button size="mini" type="danger" icon="el-icon-edit" circle style="float: right;" @click="saveWorkshops()"></el-button>
        </el-tag>
      </el-form-item>
    </el-form>

    <el-dialog width="50%" title="* 选择机台" :visible.sync="innerVisible" tooltip-effect="dark" append-to-body>

      <el-dialog width="50%" title="新增机台" :visible.sync="addLine" append-to-body>
        <el-form :model="Lines" :rules="rules" ref="Lines" class="demo-ruleForm">
          <el-form-item label="线别" :label-width="formLabelWidth" required>
            <el-input v-model="Lines.name" auto-complete="off" style="width: 60%; float: left;"></el-input>
          </el-form-item>
          <el-form-item label="机台位号" :label-width="formLabelWidth" required>
            <el-input-number v-model="Lines.item" :min="1" :max="10" label="输入位号..."></el-input-number>
          </el-form-item>
          <el-form-item label="锭数" :label-width="formLabelWidth" required>
            <el-input-number v-model="Lines.num" :min="1" :max="10" label="输入锭数..."></el-input-number>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-button type="primary" @click="addLine = true">新 增</el-button>
      <el-table ref="multipleTable" :data="data" style="width: 100%" @selection-change="handleSelectionChange" height="300">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="line.workshop.name" label="车间" width="180">
        </el-table-column>
        <el-table-column prop="line.name" label="线别" width="180">
        </el-table-column>
        <el-table-column prop="item" label="机台">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisibleAdd = false">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>
<script>
export default {
  name: 'notice',
  data () {
    return {
      data: [],
      transferData: [],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>;
      },
      tableData: [],
      pageSize: 20,
      first: 0,
      q: '',
      total: 0,
      currentPage: 5,
      form: {
        name: '',
        type: '改批',
        batchNo: '',
        startDate: '',
        line: []
      },
      Lines: {},
      dialogFormVisibleAdd: false,
      innerVisible: false,
      addLine: false,
      formLabelWidth: '120px',
      rules: {
        name: [{ required: true, message: '必输项...', trigger: 'blur' }],
        batchNo: [{ required: true, message: '必输项...', trigger: 'blur' }],
        startDate: [{ required: true, message: '必输项...', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getNotice()
  },
  methods: {
    getNotice () {
      this.$api.getNotices({
        pageSize: this.pageSize,
        first: this.first,
        q: this.q
      }).then(res => {
        this.total = res.data.count
        this.tableData = res.data.productPlanNotifies
        for (let i = 0; i < this.tableData.length-1; i++) {
          let sdate = new Date(this.tableData[i].startDate)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = sdate.getFullYear() + '-'
          let M = (sdate.getMonth() + 1 < 10 ? '0' + (sdate.getMonth() + 1) : sdate.getMonth() + 1)
          let D = '-' + sdate.getDate()
          this.tableData[i].startDate = Y + M + D

          let edate = new Date(this.tableData[i].endDate)
          let eY = edate.getFullYear() + '-'
          let eM = (edate.getMonth() + 1 < 10 ? '0' + (edate.getMonth() + 1) : edate.getMonth() + 1)
          let eD = '-' + edate.getDate()
          this.tableData[i].endDate = eY + eM + eD

          if (this.tableData[i].type === 'CHANGE_BATCH') {
            this.tableData[i].type = '改批'
          } else if (this.tableData[i].type === 'SAMPLE') {
            this.tableData[i].type = '样品'
          }
          // let str = this.tableData[i].name
          // let pat = /[A-Za-z0-9]+$/
          // this.tableData[i].spec = str.match(pat)
        }
      })
    },
    openAddNotice () {
      this.dialogFormVisibleAdd = true
    },
    saveWorkshops () {
      this.innerVisible = true
      this.data = []
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    openSaveNotice (row) {
      console.log(row)
    },
    perform (row) {
      console.log(row)
      this.$router.push({path: '/productPlan/Notice-perform', query: {id: row.id, startDate: row.startDate}})
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getNotice (this.pageSize, this.first, this.q)
    },
    handleCurrentChange(val) {
      this.first = (--val)*this.pageSize
      this.getNotice (this.pageSize, this.first, this.q)
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    }
  }
}
</script>
<style lang="scss" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>

