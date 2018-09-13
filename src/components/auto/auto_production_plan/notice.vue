<!-- 通知单 -->
<template>
<div class="notice">
  <div style="float: left; margin-bottom: 10px;">
    <el-input v-model="q" placeholder="请输入内容..." style="width: 200px;"></el-input>
    <el-button type="primary" icon="el-icon-search" circle @click="getNotice()" ></el-button>
  </div>
  <el-button type="primary" @click="openAddNotice()" style="float: right; margin-bottom: 10px;">新 增</el-button>
  <el-table :data="tableData" border v-loading="tableLoading" :stripe="true" style="width: 100%" height="500">
    <el-table-column fixed prop="type" label="类型">
    </el-table-column>
    <el-table-column prop="name" label="名称">
    </el-table-column>
    <el-table-column prop="batch.batchNo" label="批号">
    </el-table-column>
    <el-table-column prop="startDate" label="开始日期">
    </el-table-column>
    <el-table-column prop="endDate" label="结束日期">
      <template slot-scope="scope">
        <span v-if="scope.row.endDate">{{scope.row.endDate}}</span>
        <el-button v-else type="danger" @click="finish(scope.row)" size="mini">结束</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button @click="openSaveNotice(scope.row)" type="text" size="small">修 改</el-button>
        <el-button @click="perform(scope.row)" type="text" size="small">执行情况</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[20, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 10px;">
  </el-pagination>
  <!-- 第一层 -->
  <el-dialog title="新 增" :visible.sync="dialogFormVisibleAdd" width="50%">
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth" required>
        <el-input v-model="form.name" auto-complete="off" style="width: 60%; float: left;"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type" style="float: left;">
          <el-radio-button label="样品"></el-radio-button>
          <el-radio-button label="改批"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="批号" prop="batch" :label-width="formLabelWidth" required>
        <!-- <el-input v-model="form.batchNo" auto-complete="off" style="width: 60%; float: left;"></el-input> -->
        <el-select v-model="form.batch" filterable remote reserve-keyword placeholder="请输入批号" :remote-method="remoteMethod" :loading="loading" style="float:left;">
          <el-option v-for="item in optionsItem" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate" :label-width="formLabelWidth" required>
        <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp" style="float: left;"></el-date-picker>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth" required>
        <el-tag type="info" style="float: left; width: 80%;text-align: left;">
          机台 *
          <el-button size="mini" type="danger" icon="el-icon-edit" circle style="float: right;" @click="saveWorkshops()"></el-button>
        </el-tag>
        <ul class="item">
          <li v-for="item in form.lineMachines" :key="item.id">{{item.line.workshop.name}}--{{item.line.name}}--{{item.item}}</li>
        </ul>
      </el-form-item>
    </el-form>
    <!-- 第二层 -->
    <el-dialog width="50%" title="* 选择机台" :visible.sync="innerVisible" tooltip-effect="dark" append-to-body>
      <!-- 第三层 -->
      <el-dialog width="50%" title="新增机台" :visible.sync="addLine" append-to-body>
        <el-form :model="Lines" :rules="rules" ref="Lines" class="demo-ruleForm">
          <el-form-item label="线别" :label-width="formLabelWidth" required>
            <!-- <el-input v-model="Lines.name" auto-complete="off" style="width: 60%; float: left;"></el-input> -->
            <el-select v-model="Lines.name" clearable placeholder="请选择" style="float: left;">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机台位号" :label-width="formLabelWidth" required>
            <el-input-number v-model="Lines.item" :min="1" label="输入位号..."></el-input-number>
          </el-form-item>
          <el-form-item label="锭数" :label-width="formLabelWidth" required>
            <el-input-number v-model="Lines.spindleNum" :min="1" label="输入锭数..." @change="setSpindleSeq"></el-input-number>
          </el-form-item>
          <el-form-item label="人工落筒锭位顺序" :label-width="formLabelWidth" prop="spindleSeq" required>
            <el-tag title="" type="info" v-model="Lines.spindleSeq" v-for="(item,index) in Lines.spindleSeq" :key="index" :closable="false" style="float: left; width: 60%; text-align: left; margin-bottom: 5px;">
              <el-tag type="danger" style="font-weight: bold;">{{item}}</el-tag>
              <div style="float: right;">
                <el-button icon="el-icon-upload2 icon" size="mini" type="primary" v-if="Lines.spindleSeq.indexOf(item) != 0" @click="up(index)" circle></el-button>
                <el-button type="danger" icon="el-icon-download icon" size="mini" v-if="Lines.spindleSeq.indexOf(item) != Lines.spindleNum-1" @click="down(index)" circle></el-button>
              </div>
            </el-tag>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addLine = false">取 消</el-button>
          <el-button type="primary" @click="addLines()">确 定</el-button>
        </span>
      </el-dialog>

      <el-button type="primary" @click="createLines()">新 增</el-button>
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
        <el-button type="primary" @click="selectItem()">确 定</el-button>
      </span>
    </el-dialog>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      <el-button type="primary" @click="addNotice('form')">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="修 改" :visible.sync="dialogFormVisibleSave" width="50%">
    <el-form :model="form1" :rules="rules" ref="form1" class="demo-ruleForm">
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth" required>
        <el-input v-model="form1.name" auto-complete="off" style="width: 60%; float: left;"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form1.type" style="float: left;">
          <el-radio-button label="样品"></el-radio-button>
          <el-radio-button label="改批"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="批号" :label-width="formLabelWidth" required>
        <!-- <el-input v-model="form.batchNo" auto-complete="off" style="width: 60%; float: left;"></el-input> -->
        <el-select v-model="form1.batch.batchNo" filterable remote reserve-keyword placeholder="请输入位号" :remote-method="remoteMethod" :loading="loading" style="float:left;">
          <el-option v-for="item in optionsItem" :key="item.id" :label="item.batchNo" :value="item.batchNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期" prop="startDate" :label-width="formLabelWidth" required>
        <el-date-picker v-model="form1.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="float: left;"></el-date-picker>
      </el-form-item>
      <el-form-item label="" prop="lineMachines" :label-width="formLabelWidth" required>
        <el-tag type="info" style="float: left; width: 80%;text-align: left;">
          机台 *
          <el-button size="mini" type="danger" icon="el-icon-edit" circle style="float: right;" @click="saveWorkshops()"></el-button>
        </el-tag>
        <ul class="item">
          <li v-for="item in form1.lineMachines" :key="item.id">{{item.line.workshop.name}}--{{item.line.name}}--{{item.item}}</li>
        </ul>
      </el-form-item>
    </el-form>
    <!-- 第二层 -->
    <el-dialog width="50%" title="* 选择机台" :visible.sync="innerVisible" tooltip-effect="dark" :before-close="closeChoseItem" append-to-body>
      <!-- 第三层 -->
      <el-dialog width="50%" title="新增机台" :visible.sync="addLine" append-to-body>
        <el-form :model="Lines" :rules="rules" ref="Lines" class="demo-ruleForm">
          <el-form-item label="线别" :label-width="formLabelWidth" required>
            <!-- <el-input v-model="Lines.name" auto-complete="off" style="width: 60%; float: left;"></el-input> -->
            <el-select v-model="Lines.name" clearable placeholder="请选择" style="float: left;">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机台位号" :label-width="formLabelWidth" required>
            <el-input-number v-model="Lines.item" :min="1" label="输入位号..."></el-input-number>
          </el-form-item>
          <el-form-item label="锭数" :label-width="formLabelWidth" required>
            <el-input-number v-model="Lines.spindleNum" :min="1" label="输入锭数..." @change="setSpindleSeq"></el-input-number>
          </el-form-item>
          <el-form-item label="人工落筒锭位顺序" :label-width="formLabelWidth" prop="spindleSeq" required>
            <el-tag title="" type="info" v-model="Lines.spindleSeq" v-for="(item,index) in Lines.spindleSeq" :key="index" :closable="false" style="float: left; width: 60%; text-align: left; margin-bottom: 5px;">
              <el-tag type="danger" style="font-weight: bold;">{{item}}</el-tag>
              <div style="float: right;">
                <el-button icon="el-icon-upload2 icon" size="mini" type="primary" v-if="Lines.spindleSeq.indexOf(item) != 0" @click="up(index)" circle></el-button>
                <el-button type="danger" icon="el-icon-download icon" size="mini" v-if="Lines.spindleSeq.indexOf(item) != Lines.spindleNum-1" @click="down(index)" circle></el-button>
              </div>
            </el-tag>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addLine = false">取 消</el-button>
          <el-button type="primary" @click="addLines()">确 定</el-button>
        </span>
      </el-dialog>
      <div style="float: left;">
        <el-select v-model="seachLine" filterable remote reserve-keyword placeholder="请输入位号" :remote-method="getLinesList" @change="getLinesData()" :loading="lineLoading">
          <el-option v-for="item in linesOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <!-- <el-input v-model="seachLine" multiple filterable remote reserve-keyword :remote-method="remoteMethod" :loading="lineLoading" placeholder="线别..." style="width: 60%;"></el-input> -->
        <!-- <el-button type="success" class="el-icon-search" @click="getLinesData()" circle></el-button> -->
      </div>
      <el-button type="primary" @click="createLines()" style="float: right;">新 增</el-button>
      <el-table ref="multipleTable1" :data="data" style="width: 100%" @selection-change="handleSelectionChange" height="300">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="line.workshop.name" label="车间">
        </el-table-column>
        <el-table-column prop="line.name" label="线别">
        </el-table-column>
        <el-table-column prop="item" label="机台">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveItem()">确 定</el-button>
      </span>
    </el-dialog>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      <el-button type="primary" @click="saveNotice('form1')">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>
<script>
export default {
  name: 'notice',
  data () {
    return {
      tableLoading: false, // 表格加载
      lineLoading: false, // 列表加载
      data: [], // 添加表格 数据
      options: [], // workshop数据
      options2: [],
      renderFunc (h, option) {
        return <span>{ option.key } - { option.label }</span>
      },
      tableData: [], // 主表格数据
      pageSize: 20,
      first: 0,
      q: '',
      total: 0,
      currentPage: 5,
      optionsItem: [], // 输入机台号搜索列表
      list: [],
      loading: false,
      states: [],
      form: {
        name: '',
        type: '改批',
        batch: {},
        startDate: '',
        lineMachines: []
      },
      Lines: {
        name: '',
        item: '',
        spindleNum: 0,
        spindleSeq: [],
        line: {}
      },
      // 弹窗控制
      dialogFormVisibleAdd: false,
      innerVisible: false,
      addLine: false,
      seachLine: '', // 线别搜索
      linesOptions: [], // 获得的线别列表
      formLabelWidth: '180px',
      rules: {
        name: [{ required: true, message: '必输项...', trigger: 'blur' }],
        batchNo: [{ required: true, message: '必输项...', trigger: 'change' }],
        type: [{ required: true, message: '必输项...', trigger: 'change' }],
        startDate: [{ required: true, message: '必输项...', trigger: 'change' }]
      },
      // 修改
      dialogFormVisibleSave: false,
      form1: {
        name: '',
        type: '改批',
        batch: {},
        startDate: '',
        lineMachines: []
      }
    }
  },
  created () {
    this.getNotice()
  },
  methods: {
    // 获取列表数据
    getNotice () {
      this.tableLoading = true
      this.$api.getNotices({
        pageSize: this.pageSize,
        first: this.first,
        q: this.q
      }).then(res => {
        this.total = res.data.count
        this.tableData = res.data.productPlanNotifies
        for (let i = 0; i < this.tableData.length; i++) {
          let sdate = new Date(this.tableData[i].startDate) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = sdate.getFullYear() + '-'
          let M = (sdate.getMonth() + 1 < 10 ? '0' + (sdate.getMonth() + 1) : sdate.getMonth() + 1)
          let D = '-' + sdate.getDate()
          this.tableData[i].startDate = Y + M + D
          if (this.tableData[i].endDate) {
            let edate = new Date(this.tableData[i].endDate)
            let eY = edate.getFullYear() + '-'
            let eM = (edate.getMonth() + 1 < 10 ? '0' + (edate.getMonth() + 1) : edate.getMonth() + 1)
            let eD = '-' + edate.getDate()
            this.tableData[i].endDate = eY + eM + eD
          }

          if (this.tableData[i].type === 'CHANGE_BATCH') {
            this.tableData[i].type = '改批'
          } else if (this.tableData[i].type === 'SAMPLE') {
            this.tableData[i].type = '样品'
          }
          // let str = this.tableData[i].name
          // let pat = /[A-Za-z0-9]+$/
          // this.tableData[i].spec = str.match(pat)
        }
        this.tableLoading = false
      })
    },
    finish (row) {
      this.$confirm('确认结束？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        this.$api.finishNotice(row.id).then(res => {
          this.$notify({
            title: '成功',
            message: '结束',
            type: 'success'
          })
          this.getNotice()
        })
      }).catch(_ => {})
    },
    // 打开新增弹窗
    openAddNotice () {
      this.dialogFormVisibleAdd = true
      this.data = []
      this.form = {}
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        console.log(this.form.batch)
        this.$api.getBatches({
          pageSize: 10,
          first: 0,
          q: query
        }).then(res => {
          if (res.errorCode === 'E00000') {
            this.$message.error(res.errorMessage)
          } else {
            this.loading = false
            this.optionsItem = res.data.batches
          }
        })
      } else {
        this.optionsItem = []
      }
    },
    saveWorkshops () { // 修改机台
      this.innerVisible = true
      this.data = this.data.concat(this.form1.lineMachines)
      this.multipleSelection = this.data
      // console.log(this.$refs)
      // this.multipleSelection.forEach(row => {
      //   console.log(row)
      //   this.$refs.multipleTable1.toggleRowSelection(row)
      // })
    },
    createLines () {
      this.$api.getSelected().then(res => {
        this.options = res.data.lines
      })
      this.addLine = true
    },
    handleSelectionChange (val) { // 勾选的机台列表
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    closeChoseItem (done) { // 关闭选择机台弹框
      console.log(this.data)
      this.data = []
      done()
    },
    selectItem () { // 选择机台并确认
      this.form.lineMachines = this.multipleSelection
      this.innerVisible = false
    },
    setSpindleSeq (val) {
      this.Lines.spindleSeq = []
      for (let i = 1; i < val + 1; i++) {
        this.Lines.spindleSeq.push(i)
      }
    },
    addNotice (formName) { // 新增通知单
      if (this.form.type === '改批') {
        this.form.type = 'CHANGE_BATCH'
      } else if (this.form.type === '样品') {
        this.form.type = 'SAMPLE'
      }
      console.log(this.optionsItem)
      for (let i = 0; i < this.optionsItem.length; i++) {
        if (this.optionsItem[i].batchNo === this.form.batch) {
          this.form.batch = this.optionsItem[i]
        }
      }
      console.log(this.form)
      if (this.form.lineMachines !== undefined) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.addNotices(this.form).then(res => {
              console.log(res)
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              this.dialogFormVisibleAdd = false
              this.getNotice()
            })
          } else {
            return false
          }
        })
      } else {
        this.$message.error('请配置机台，否者无法提交！')
      }
    },
    getLinesList (query) { // 线别列表
      if (query !== '') {
        this.lineLoading = true
        this.$api.getLinesList({
          pageSize: 10,
          q: query
        }).then(res => {
          this.linesOptions = res.data.lines
          console.log(this.linesOptions)
          this.lineLoading = false
        })
      } else {
        this.linesOptions = []
      }
    },
    getLinesData () { // 搜索线别
      console.log(this.seachLine, this.linesOptions)
      let id
      for (let item of this.linesOptions) {
        if (item.name === this.seachLine) {
          id = item.id
        }
      }
      // console.log(id)
      this.$api.getLinesData(id).then(res => {
        console.log(res)
        console.log(res.data.length)
        if (res.data.length !== 0) {
          this.data = this.data.concat(res.data)
        } else {
          console.log('无搜索值')
        }
      })
      console.log(this.data)
    },
    addLines () { // 新增线别
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name === this.Lines.name) {
          this.Lines.line = this.options[i]
        }
      }
      console.log(this.Lines)
      this.$api.AddMachine(this.Lines).then(res => {
        console.log(res)
        this.data.push(res.data)
        this.addLine = false
      })
    },
    up (i) {
      let arr = this.Lines.spindleSeq
      this.Lines.spindleSeq = []
      let temp = arr[i]
      arr[i] = arr[i - 1]
      arr[i - 1] = temp
      // this.form.spindleSeq = arr
      for (let j = 0; j < arr.length; j++) {
        this.Lines.spindleSeq.push(arr[j])
      }
      console.log(this.Lines.spindleSeq)
    },
    down (i) {
      let arr = this.Lines.spindleSeq
      this.Lines.spindleSeq = []
      let temp = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = temp
      for (let j = 0; j < arr.length; j++) {
        this.Lines.spindleSeq.push(arr[j])
      }
      // console.log(this.form.spindleSeq)
    },
    // 打开修改弹窗
    openSaveNotice (row) {
      console.log(row)
      this.dialogFormVisibleSave = true
      this.form1.id = row.id
      this.form1.name = row.name
      this.form1.type = row.type
      this.form1.batch = row.batch
      this.form1.startDate = row.startDate
      this.form1.lineMachines = row.lineMachines
      console.log(this.form1)
      // this.data = this.form1.lineMachines
    },
    perform (row) {
      console.log(row)
      this.$router.push({path: '/productPlan/Notice-perform', query: {id: row.id, startDate: row.startDate}})
    },
    saveItem () {
      this.data = []
      this.form1.lineMachines = this.multipleSelection
      this.innerVisible = false
    },
    saveNotice (formName) {
      if (this.form1.type === '改批') {
        this.form1.type = 'CHANGE_BATCH'
      } else if (this.form1.type === '样品') {
        this.form1.type = 'SAMPLE'
      }
      for (let i = 0; i < this.optionsItem.length; i++) {
        if (this.optionsItem[i].batchNo === this.form1.batch) {
          this.form1.batch = this.optionsItem[i]
        }
      }
      if (this.form1.lineMachines !== undefined) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.saveNotice(this.form1).then(res => {
              console.log(res)
              if (res.errorCode !== 'E00000') {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                })
                this.dialogFormVisibleSave = false
                this.getNotice()
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          } else {
            return false
          }
        })
      } else {
        this.$message.error('请配置机台，否者无法提交！')
      }
    },
    // 分页配置
    handleSizeChange (val) {
      this.pageSize = val
      this.getNotice(this.pageSize, this.first, this.q)
    },
    handleCurrentChange (val) {
      this.first = (--val) * this.pageSize
      this.getNotice(this.pageSize, this.first, this.q)
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>
<style lang="scss" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  .item {
    float: left;
    list-style: none;
    width: 200px;
    max-height: 150px;
    overflow-y: auto;
    padding: 0;
    border: 1px solid #409EFF;
    border-radius: 5px;
  }
</style>
