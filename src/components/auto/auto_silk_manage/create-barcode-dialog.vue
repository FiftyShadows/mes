<template>
  <div>
    <el-dialog
      title="生成条码"
      :visible.sync="dialogVisible"
      :before-close="cancel"
      width="30%"
      center>
      <el-form :model="dialogForm" label-width="80px">
        <el-form-item label="机台">
          <el-tag type="info" style="float: left; width: 80%;text-align: left;">
            机台 *
            <el-button size="mini" type="danger" icon="el-icon-edit" circle style="float: right;" @click="selectMachines()"></el-button>
          </el-tag>
          <ul class="item">
            <li v-for="item in dialogForm.lineMachines" :key="item.id">{{item.line.workshop.name}}--{{item.line.name}}--{{item.item}}</li>
          </ul>
        </el-form-item>
        <el-form-item label="落次">
          <el-input v-model="dialogForm.fallOrder" class="fallOrder"></el-input>
          <span>-</span>
          <el-input v-model="dialogForm.fallOrder" class="fallOrder"></el-input>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="dialogForm.productTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </span>
      <!--内嵌dialog选择某线别下的机台-->
      <el-dialog width="40%" title="* 选择机台" :visible.sync="machineVisible" tooltip-effect="dark" append-to-body>
        <!--再内嵌新增线别对话框-->
        <el-dialog width="40%" title="新增机台" :visible.sync="addMachineVisible" append-to-body>
          <el-form :model="Lines" :rules="rules" ref="Lines" class="demo-ruleForm">
            <el-form-item label="线别" :label-width="'180px'" required>
              <!-- <el-input v-model="Lines.name" auto-complete="off" style="width: 60%; float: left;"></el-input> -->
              <el-select v-model="Lines.name" clearable placeholder="请选择" style="float: left;">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机台位号" :label-width="'180px'" required>
              <el-input-number v-model="Lines.item" :min="1" label="输入位号..."></el-input-number>
            </el-form-item>
            <el-form-item label="锭数" :label-width="'180px'" required>
              <el-input-number v-model="Lines.spindleNum" :min="1" label="输入锭数..." @change="setSpindleSeq"></el-input-number>
            </el-form-item>
            <el-form-item label="人工落筒锭位顺序" :label-width="'180px'" prop="spindleSeq" required>
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
          <el-button type="primary" @click="addLines()">确 定</el-button>
        </span>
        </el-dialog>
        <div style="float: left;">
          <el-select v-model="seachLine" filterable clearable remote reserve-keyword placeholder="请输入线别" :remote-method="getLinesList" @change="getLinesData()" :loading="lineLoading">
            <el-option v-for="item in linesOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <el-button type="primary" @click="createLines()" style="float: right;">新 增</el-button>
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
          <el-button type="primary" @click="selectItem()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialogVisible'],
  name: 'create-barcode-dialog',
  data () {
    return {
      machineVisible: false,
      addMachineVisible: false,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      dialogForm: {
        lineMachines: [],
        productTime: ''
      },
      seachLine: '', // 线别搜索
      linesOptions: [], // 获得的线别列表
      lineLoading: false, // 列表加载
      data: [], // 添加表格 数据
      options: [], // workshop数据
      multipleSelection: [],
      Lines: {
        name: '',
        item: '',
        spindleNum: 0,
        spindleSeq: [1],
        line: {}
      },
      rules: {
        name: [{ required: true, message: '必输项...', trigger: 'blur' }],
        batchNo: [{ required: true, message: '必输项...', trigger: 'change' }],
        type: [{ required: true, message: '必输项...', trigger: 'change' }],
        startDate: [{ required: true, message: '必输项...', trigger: 'change' }]
      }
    }
  },
  methods: {
    cancel (done) {
      this.$emit('update:dialogVisible', false)
    },
    ok () {
      this.$emit('update:dialogVisible', false)
    },
    selectMachines () {
      this.machineVisible = true
      this.multipleSelection = this.dialogForm.lineMachines
    },
    // 获取线别列表
    getLinesList (query) {
      if (query !== '') {
        this.lineLoading = true
        this.$api.getLinesList({
          pageSize: 10,
          q: query
        }).then(res => {
          this.linesOptions = res.data.lines
          this.lineLoading = false
        })
      } else {
        this.linesOptions = []
      }
    },
    getLinesData () { // 搜索线别
      let id
      for (let item of this.linesOptions) {
        if (item.name === this.seachLine) {
          id = item.id
        }
      }
      this.$api.getLinesData(id).then(res => {
        if (res.data.length !== 0) {
          for (let i of res.data) { // 此处如果使用concat multipleSelection会变为【】
            this.data.push(i)
          }
        }
      })
    },
    selectItem () { // 选择机台并确认
      this.dialogForm.lineMachines = this.multipleSelection
      this.machineVisible = false
    },
    handleSelectionChange (val) { // 勾选的机台列表
      this.multipleSelection = val
    },
    createLines () {
      this.$api.getSelected().then(res => {
        this.options = res.data.lines
      })
      this.addMachineVisible = true
    },
    setSpindleSeq (val) {
      this.Lines.spindleSeq = []
      for (let i = 1; i < val + 1; i++) {
        this.Lines.spindleSeq.push(i)
      }
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
        this.Lines = {}
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
    }
  }
}
</script>

<style scoped>
  .fallOrder {
    width: 40%;
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
