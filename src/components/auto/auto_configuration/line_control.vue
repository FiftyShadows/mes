<!-- 线别控制 -->
<template>
  <div class="LineControl">
    <el-select v-model="value" placeholder="请选择车间" clearable style="float:left;margin-bottom: 10px;" @change="getLine(value)">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-button type="primary" style="float:right;" @click="dialogVisibleAdd = true">批量新增</el-button>
    <el-button type="primary" @click="dialogVisibleSingleAdd = true" style="float: right; margin-right: 10px;">新增</el-button>

    <el-table :data="tableData" v-loading="loading" border :stripe="true" style="width: 100%" height="500">
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

    <el-dialog title="新增" :visible.sync="dialogVisibleSingleAdd" width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="车间" prop="value">
          <el-select v-model="ruleForm.value" placeholder="请选择车间" clearable style="float:left;">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:50%;float: left;"></el-input>
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
        <el-button type="primary" @click="createSingleLine('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量新增" :visible.sync="dialogVisibleAdd" width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="车间" prop="value">
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
        <el-form-item label="批量名称" prop="name">
          <el-input v-model="ruleForm.startItem" auto-complete="off" style="width: 80px;float: left;"></el-input>
          <span style="float: left;"> —— </span>
          <el-input v-model="ruleForm.endItem" auto-complete="off" style="width: 80px;float: left;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="createLines('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogVisibleSave" width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="车间" prop="value">
          <el-select v-model="ruleForm.value" placeholder="请选择车间" clearable style="float:left;">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:50%;float: left;"></el-input>
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
        <el-button type="primary" @click="SaveLineForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'LineControl',
  data () {
    return {
      loading: false,
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
        id: '',
        startItem: '',
        endItem: ''
      },
      workshop: {}, // 创建车间的的参数
      rules: {
        value: [{ required: true, message: '必输项', trigger: 'change' }],
        name: [{ required: true, message: '必输项', trigger: 'blur' }],
        resource: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  created () {
    // this.options = this.$store.state.workShops.map(workShop => {
    //   return {
    //     id: workShop.id,
    //     name: workShop.name
    //   }
    // })
    this.$api.getWorkShopsLine().then(res => {
      this.options = res.data
      this.value = this.options[0].name
      this.getLine(this.options[0].name)
      console.log(this.options)
    })
  },
  methods: {
    getLine (value) {
      this.loading = true
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name === value) {
          this.keyId = this.options[i].id
        }
      }
      this.$api.getLines(this.keyId).then(res => {
        console.log(res)
        this.tableData = res.data
        this.$store.state.Lines = res.data
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].doffingType === 'AUTO') {
            this.tableData[i].doffingType = '自动落桶'
          } else {
            this.tableData[i].doffingType = '手动落桶'
          }
        }
        this.loading = false
      })
    },
    createSingleLine (formName) {
      console.log(this.ruleForm)
      if (this.ruleForm.resource === '自动落桶') {
        this.ruleForm.resource = 'AUTO'
      } else {
        this.ruleForm.resource = 'MANUAL'
      }
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name === this.ruleForm.value) {
          this.workshop = this.options[i]
          this.workshop.createDateTime = new Date().getTime()
          this.workshop.modifyDateTime = this.workshop.createDateTime
        }
      }
      console.log(this.workshop)
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
            })
            this.getLine(this.ruleForm.value)
            this.dialogVisibleSingleAdd = false
          })
        } else {
          return false
        }
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
    SaveLineForm (formName) {
      if (this.ruleForm.resource === '自动落桶') {
        this.ruleForm.resource = 'AUTO'
      } else {
        this.ruleForm.resource = 'MANUAL'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
            })
            this.getLine(this.ruleForm.value)
            this.dialogVisibleSave = false
          })
        } else {
          return false
        }
      })
    },
    createLines (formName) { // 还未完成
      if (this.ruleForm.resource === '自动落桶') {
        this.ruleForm.resource = 'AUTO'
      } else {
        this.ruleForm.resource = 'MANUAL'
      }
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name === this.ruleForm.value) {
          this.workshop = this.options[i]
          this.workshop.createDateTime = new Date().getTime()
          this.workshop.modifyDateTime = this.workshop.createDateTime
        }
      }
      // console.log(this.workshop)
      // 处理批量
      let reg1 = /[0-9]+$/g
      let reg2 = /^[a-zA-Z]+/g
      let startword = this.ruleForm.startItem.match(reg2)
      let startnum = this.ruleForm.startItem.match(reg1)
      // console.log(startword, startnum)

      let endword = this.ruleForm.endItem.match(reg2)
      let endnum = this.ruleForm.endItem.match(reg1)
      // console.log(endword, endnum)
      if (startword || endword) {
        if ((startword == null && endword != null) || (startword != null && endword == null) || (startword[0] !== endword[0])) {
          this.$message.error('批量输入错误，前缀不同！')
          return
        }
      } else {
        this.$message.error('批量输入错误，请输入前缀！')
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (let i = 0; i <= Number(endnum[0]) - Number(startnum[0]); i++) {
            let num = Number(startnum[0]) + i
            this.ruleForm.name = startword[0] + num.toString()
            this.$api.creatSingleLine({
              doffingType: this.ruleForm.resource,
              name: this.ruleForm.name,
              workshop: this.workshop
            }).then(res => {
              // console.log(res)
              this.dialogVisibleAdd = false
              this.value = this.workshop.name
              this.getLine(this.workshop.name)
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
