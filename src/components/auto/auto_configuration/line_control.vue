<!-- 线别控制 -->
<template>
  <div class="LineControl">
    <el-select v-model="value" placeholder="请选择车间" clearable style="float:left;margin-bottom: 10px;" @change="getLine(value)">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-button type="primary" style="float:right;" @click="dialogVisibleAdd = true">批量新增</el-button>
    <el-button type="primary" @click="dialogVisibleSingleAdd = true" style="float: right; margin-right: 10px;">新增</el-button>

    <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
      <el-table-column fixed prop="workshop.name" label="车间">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="doffingType" label="落桶方式">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增" :visible.sync="dialogVisibleSingleAdd" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="车间">
          <el-select v-model="ruleForm.value" placeholder="请选择车间" clearable style="float:left;">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="落桶" prop="resource">
          <el-radio-group v-model="ruleForm.resource" style="float:left;">
            <el-radio label="自动落桶" border></el-radio>
            <el-radio label="手动落桶" border></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSingleAdd = false">取 消</el-button>
        <el-button type="primary" @click="createSingleLine()">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="批量新增" :visible.sync="dialogVisibleAdd" width="40%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="车间">
          <el-select v-model="ruleForm.value" placeholder="请选择车间" clearable style="float:left;">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="落桶" prop="resource">
          <el-radio-group v-model="ruleForm.resource" style="float:left;">
            <el-radio label="自动落桶" border></el-radio>
            <el-radio label="手动落桶" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 100px; margin-bottom: 10px; float: left;" placeholder="起始名称"></el-input>
          <el-input-number v-model="num" :min="1" label="创建" style="float:left; margin-left:10px;"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="createLines()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogVisibleSave" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="车间">
          <el-select v-model="ruleForm.value" placeholder="请选择车间" clearable style="float:left;">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="落桶" prop="resource">
          <el-radio-group v-model="ruleForm.resource" style="float:left;">
            <el-radio label="自动落桶" border></el-radio>
            <el-radio label="手动落桶" border></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="SaveLineForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'LineControl',
  data () {
    return {
      options: [],
      value: '',
      tableData: [],
      keyId: '',
      doffingType: '',
      dialogVisibleSingleAdd: false, // 新增单个
      dialogVisibleAdd: false, // 批量新增
      dialogVisibleSave: false, // 修改
      formLabelWidth: '120px',
      num: 1,
      AddNum: 0, // 计算
      str: '', // 提取字符串
      ruleForm: {
        value: '',
        name: '',
        resource: '自动落桶',
        id: ''
      },
      workshop: {}, // 创建车间的的参数
      rules: {
        name: [
          { required: true, message: '必输项', trigger: 'blur' },
          { min: 1, trigger: 'blur'  }
        ],
        resource: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.options = this.$store.state.workShops.map(workShop => {
      return {
        id: workShop.id,
        name: workShop.name
      }
    })
    console.log(this.options)
    // this.getLine (this.value)
  },
  methods: {
    getLine (value) {
      for (let i=0; i<this.options.length; i++) {
        if (this.options[i].name === value) {
          this.keyId = this.options[i].id
        }
      }
      this.$api.getLines(this.keyId).then(res => {
        console.log(res)
        this.tableData = res.data
        this.$store.state.Lines = res.data
        for (let i=0; i<this.tableData.length; i++) {
          if (this.tableData[i].doffingType === 'AUTO') {
            this.tableData[i].doffingType = '自动落桶'
          } else {
            this.tableData[i].doffingType = '手动落桶'
          }
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    createSingleLine () {
      console.log(this.ruleForm)
      if (this.ruleForm.resource === '自动落桶') {
        this.ruleForm.resource = 'AUTO'
      } else {
        this.ruleForm.resource = 'MANUAL'
      }
      for (let i=0; i<this.options.length; i++) {
        if (this.$store.state.workShops[i].name === this.ruleForm.value) {
          this.workshop = this.$store.state.workShops[i]
          this.workshop.createDateTime = new Date().getTime()
          this.workshop.modifyDateTime = this.workshop.createDateTime
        }
      }
      console.log(this.workshop)
      this.$api.creatSingleLine({
        doffingType: this.ruleForm.resource,
        id: null,
        name: this.ruleForm.name,
        workshop: this.workshop
      }).then(res => {
        this.$notify({
          title: '成功',
          message: '新建成功',
          type: 'success'
        });
        this.getLine(this.ruleForm.value)
        this.dialogVisibleSingleAdd = false
      })
    },
    handleClick (row) {
      console.log(row)
      this.ruleForm.value = row.workshop.name
      this.ruleForm.name = row.name
      this.ruleForm.resource = row.doffingType
      this.ruleForm.id = row.id
      this.workshop = row.workshop
      this.dialogVisibleSave = true
    },
    SaveLineForm () {
      if (this.ruleForm.resource === '自动落桶') {
        this.ruleForm.resource = 'AUTO'
      } else {
        this.ruleForm.resource = 'MANUAL'
      }
      this.$api.saveLine({
        doffingType: this.ruleForm.resource,
        id: this.ruleForm.id,
        name: this.ruleForm.name,
        workshop: this.workshop
      }).then(res => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
        this.getLine(this.ruleForm.value)
        this.dialogVisibleSave = false
      })
    },
    createLines () { // 还未完成
      if (this.ruleForm.resource === '自动落桶') {
        this.ruleForm.resource = 'AUTO'
      } else {
        this.ruleForm.resource = 'MANUAL'
      }
      for (let i=0; i<this.options.length; i++) {
        if (this.$store.state.workShops[i].name === this.ruleForm.value) {
          this.workshop = this.$store.state.workShops[i]
          this.workshop.createDateTime = new Date().getTime()
          this.workshop.modifyDateTime = this.workshop.createDateTime
        }
      }
      this.AddNum = this.ruleForm.name
      this.str = this.ruleForm.name.match(/\w+/)
      for (let i=0; i<this.num; i++) {
        this.AddNum = toString(parseInt(this.AddNum)+1)
        console.log(this.str, this.AddNum)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

