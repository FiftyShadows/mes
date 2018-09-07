<!-- 机台管理 -->
<template>
  <div class="machine">
    <el-select v-model="name" clearable placeholder="请选择" style="float: left;margin-bottom: 10px;" @change="getMachine()">
      <el-option v-for="item in arrLineName" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-button type="primary" style="float:right;margin-bottom: 10px;" @click="dialogVisibleAdd = true">批量新增</el-button>
    <el-button type="primary" @click="dialogVisibleSingleAdd = true" style="float: right; margin-right: 10px;margin-bottom: 10px;">新增</el-button>
    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="line.name" label="线别">
      </el-table-column>
      <el-table-column prop="item" label="机台位号">
      </el-table-column>
      <el-table-column prop="spindleNum" label="锭数">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openSave(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新 增" :visible.sync="dialogVisibleSingleAdd" width="50%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="线别" :label-width="formLabelWidth" prop="name" required>
          <el-select v-model="form.name" placeholder="选择线别.." style="float: left;" >
            <el-option v-for="item in arrLineName" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机台位号" :label-width="formLabelWidth" prop="item" required>
          <el-input-number v-model="form.item" :min="1" label="输入锭数..." style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="锭数" :label-width="formLabelWidth" prop="spindleNum" required>
          <el-input-number v-model="form.spindleNum" :min="1" label="输入锭数..."  @change="setSpindleSeq" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="人工落筒锭位顺序" :label-width="formLabelWidth" prop="spindleSeq" required>
          <el-tag title="" type="info" v-model="form.spindleSeq" v-for="(item,index) in form.spindleSeq" :key="index" :closable="false" style="float: left; width: 60%; text-align: left; margin-bottom: 5px;">
            <el-tag type="danger" style="font-weight: bold;">{{item}}</el-tag>
            <div style="float: right;">
              <el-button icon="el-icon-upload2 icon" size="mini" type="primary" v-if="form.spindleSeq.indexOf(item) != 0" @click="up(index)" circle></el-button>
              <!-- <i class="el-icon-upload2 icon" v-if="form.spindleSeq.indexOf(item) != 0" @click="up(index)"></i> -->
              <!-- <i class="el-icon-download icon" v-if="form.spindleSeq.indexOf(item) != form.spindleNum-1" @click="down(index)"></i> -->
              <el-button type="danger" icon="el-icon-download icon" size="mini" v-if="form.spindleSeq.indexOf(item) != form.spindleNum-1" @click="down(index)" circle></el-button>
            </div>
          </el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSingleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddMachine()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量新增" :visible.sync="dialogVisibleAdd" width="50%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="线别" :label-width="formLabelWidth" prop="name" required>
          <el-select v-model="form.name" placeholder="选择线别.." style="float: left;" >
            <el-option v-for="item in arrLineName" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="机台位号" :label-width="formLabelWidth" prop="item" required>
          <el-input-number v-model="form.item" :min="1" label="输入锭数..." style="float: left;"></el-input-number>
        </el-form-item> -->
        <el-form-item label="批量机台(num)" :label-width="formLabelWidth" prop="items" required>
          <el-input v-model.number="form.items.startItem" auto-complete="off" style="width: 80px;float: left;"></el-input>
          <span style="float: left;"> —— </span>
          <el-input v-model.number="form.items.endItem" auto-complete="off" style="width: 80px;float: left;"></el-input>
        </el-form-item>
        <el-form-item label="锭数" :label-width="formLabelWidth" prop="spindleNum" required>
          <el-input-number v-model="form.spindleNum" :min="1" label="输入锭数..."  @change="setSpindleSeq" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="人工落筒锭位顺序" :label-width="formLabelWidth" prop="spindleSeq" required>
          <el-tag title="" type="info" v-model="form.spindleSeq" v-for="(item,index) in form.spindleSeq" :key="index" :closable="false" style="float: left; width: 60%; text-align: left; margin-bottom: 5px;">
            <el-tag type="danger" style="font-weight: bold;">{{item}}</el-tag>
            <div style="float: right;">
              <el-button icon="el-icon-upload2 icon" size="mini" type="primary" v-if="form.spindleSeq.indexOf(item) != 0" @click="up(index)" circle></el-button>
              <el-button type="danger" icon="el-icon-download icon" size="mini" v-if="form.spindleSeq.indexOf(item) != form.spindleNum-1" @click="down(index)" circle></el-button>
            </div>
          </el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSingleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddBatchMachine()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogVisibleSave" width="50%">
      <el-form :model="form1" :rules="rules" ref="form">
        <el-form-item label="线别" :label-width="formLabelWidth">
          <el-select v-model="form1.line.name" placeholder="选择线别.." prop="name" style="float: left;" required>
            <el-option v-for="item in arrLineName" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机台位号" :label-width="formLabelWidth" prop="item" required>
          <el-input-number v-model="form1.item" :min="1" label="输入锭数..." style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="锭数" :label-width="formLabelWidth" prop="spindleNum" required>
          <el-input-number v-model="form1.spindleNum" :min="1" label="输入锭数..."  @change="setSpindleSeq" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="人工落筒锭位顺序" :label-width="formLabelWidth" prop="spindleSeq" required>
          <el-tag title="" type="info" v-model="form1.spindleSeq" v-for="(item,index) in form1.spindleSeq" :key="index" :closable="false" style="float: left; width: 60%; text-align: left; margin-bottom: 5px;">
            <el-tag type="danger" style="font-weight: bold;">{{item}}</el-tag>
            <div style="float: right;">
              <i class="el-icon-upload2 icon" v-if="form1.spindleSeq.indexOf(item) != 0" @click="saveUp(index)"></i>
              <i class="el-icon-download icon" v-if="form1.spindleSeq.indexOf(item) != form1.spindleNum-1" @click="saveDown(index)"></i>
            </div>
          </el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="saveMachine()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'machine',
  data () {
    return {
      loading: false,
      name: 'A3',
      arrLineName: [],
      tableData: [],
      dialogVisibleAdd: false,
      dialogVisibleSingleAdd: false,
      dialogVisibleSave: false,
      seachMachine: {},
      form: {
        name: '',
        item: '',
        spindleNum: '',
        spindleSeq: [],
        line: {},
        items: {
          startItem: '',
          endItem: ''
        }
      },
      form1: {
        name: '',
        item: '',
        spindleNum: '',
        spindleSeq: [],
        line: {}
      },
      rules: {
        name: { required: true, message: '请选择线别...', trigger: 'change' },
        item: [
          { required: true, message: '请输入...', trigger: 'change' }
        ],
        spindleNum: [
          { required: true, message: '请输入...', trigger: 'change' },
          { min: 1, message: '不能为空', trigger: 'change' }
        ]
      },
      formLabelWidth: '180px'
    }
  },
  created () {
    this.getSelected()
  },
  computed: {
    // spindleSeq (i) {
    //   let temp = this.form.spindleSeq[i]
    //   this.form.spindleSeq[i] = this.form.spindleSeq[i - 1]
    //   this.form.spindleSeq[i - 1] = temp
    //   return this.form.spindleSeq
    // }
  },
  methods: {
    getSelected () { // 获取selet
      this.$api.getSelected().then(res => {
        // this.tableData = res.data
        // console.log(this.tableData.lines)
        // this.arrLineName = this.tableData.lines.map(line => {
        //   return line.name
        // })
        // this.arrLineName = Array.from(new Set(this.arrLineName))
        // console.log(this.arrLineName)
        this.arrLineName = res.data.lines
        this.startGetMachine()
        console.log(this.arrLineName)
      })
    },
    startGetMachine () {
      this.loading = true
      console.log(this.arrLineName[0])
      this.name = this.arrLineName[0].name
      this.$api.getMachines(this.arrLineName[0].id).then(res => {
        console.log(res)
        this.tableData = res.data
        this.loading = false
      })
    },
    getMachine () {
      this.loading = true
      for (let i = 0; i < this.arrLineName.length; i++) {
        if (this.arrLineName[i].name === this.name) {
          this.seachMachine = this.arrLineName[i]
        }
      }
      this.$api.getMachines(this.seachMachine.id).then(res => {
        console.log(res)
        this.tableData = res.data
        this.loading = false
      })
    },
    AddMachine () {
      for (let j = 0; j < this.arrLineName.length; j++) {
        if (this.form.name === this.arrLineName[j].name) {
          this.form.line = this.arrLineName[j]
        }
      }
      // console.log(this.form)
      this.$api.AddMachine(this.form).then(res => {
        console.log(res)
        this.$notify({
          title: '成功',
          message: '新增成功',
          type: 'success'
        })
        this.dialogVisibleSingleAdd = false
        this.getMachine()
      })
    },
    AddBatchMachine () {
      console.log(this.form.items.endItem, this.form.items.startItem)
      let regPos = /^\d+$/
      if (regPos.test(this.form.items.endItem) && regPos.test(this.form.items.startItem.toString())) {
        for (let i = 0; i <= this.form.items.endItem - this.form.items.startItem; i++) {
          this.form.item = this.form.items.startItem + i
          console.log(this.form.item)
          for (let j = 0; j < this.arrLineName.length; j++) {
            if (this.form.name === this.arrLineName[j].name) {
              this.form.line = this.arrLineName[j]
            }
          }
          this.$api.AddMachine({
            item: this.form.item,
            line: this.form.line,
            spindleNum: this.form.spindleNum,
            spindleSeq: this.form.spindleSeq
          }).then(res => {
            this.dialogVisibleAdd = false
            this.getMachine()
          })
        }
      } else {
        this.$message.error('机台需要输入数字！')
      }
    },
    openSave (row) {
      console.log(row)
      this.form1.id = row.id
      this.form1.name = row.line.name
      this.form1.line = row.line
      this.form1.item = row.item
      this.form1.spindleNum = row.spindleNum
      this.form1.spindleSeq = row.spindleSeq
      this.dialogVisibleSave = true
    },
    saveMachine () {
      console.log(this.form1)
      this.$api.saveMachine(this.form1).then(res => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.dialogVisibleSave = false
        this.getMachine()
      })
    },
    setSpindleSeq (val) {
      this.form.spindleSeq = []
      for (let i = 1; i < val + 1; i++) {
        this.form.spindleSeq.push(i)
      }
    },
    // 添加
    up (i) {
      let arr = this.form.spindleSeq
      this.form.spindleSeq = []
      let temp = arr[i]
      arr[i] = arr[i - 1]
      arr[i - 1] = temp
      // this.form.spindleSeq = arr
      for (let j = 0; j < arr.length; j++) {
        this.form.spindleSeq.push(arr[j])
      }
      // console.log(this.form.spindleSeq)
    },
    down (i) {
      let arr = this.form.spindleSeq
      this.form.spindleSeq = []
      let temp = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = temp
      for (let j = 0; j < arr.length; j++) {
        this.form.spindleSeq.push(arr[j])
      }
      // console.log(this.form.spindleSeq)
    },
    // 修改
    saveUp (i) {
      let arr = this.form1.spindleSeq
      this.form1.spindleSeq = []
      let temp = arr[i]
      arr[i] = arr[i - 1]
      arr[i - 1] = temp
      // this.form.spindleSeq = arr
      for (let j = 0; j < arr.length; j++) {
        this.form1.spindleSeq.push(arr[j])
      }
    },
    saveDown (i) {
      let arr = this.form1.spindleSeq
      this.form1.spindleSeq = []
      let temp = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = temp
      for (let j = 0; j < arr.length; j++) {
        this.form1.spindleSeq.push(arr[j])
      }
      // console.log(this.form.spindleSeq)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-alert--info {
  height: 40px;
}
.el-alert__content {
  width: 100px;
}
.el-alert {
  margin-bottom: 5px;
}
.icon {
  font-size: 20px;
  &:hover{
    cursor: pointer;
    font-size: 24px;
    color: #F56C6C;
  }
}
</style>
