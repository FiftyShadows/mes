<!-- 车间管理 -->
<template>
  <div>
    <el-button class="createLine" type="primary" @click="dialogVisibleAdd = true">新 增</el-button>
    <el-table :data="tableData" border :stripe="true" style="width: 100%">
      <el-table-column fixed prop="corporation.name" label="公司">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修 改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :AllList='tableData.length'></Pagination>
    <el-dialog title="新 增" :visible.sync="dialogVisibleAdd" width="30%" :before-close="handleClose">
      <el-form :model="form1">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form1.company" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form1.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="createWorkshop()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修 改" :visible.sync="dialogVisibleSave" width="30%" :before-close="handleClose">
      <el-form :model="form2">
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="form2.company" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form2.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSave = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleSave = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../pagination.vue'
export default {
  name: 'workshops',
  components: {
    'Pagination': Pagination
  },
  data () {
    return {
      tableData: [],
      dialogVisibleAdd: false,
      dialogVisibleSave: false,
      formLabelWidth: '120px',
      form1: {
        company: '',
        name: ''
      },
      form2: {
        company: '',
        name: ''
      },
      create: {
        corporation: {
          code: '3000',
          createTime: '',

        }
      }
      
    }
  },
  created () {
    this.WorkShopLine()
  },
  methods: {
    WorkShopLine () { // 获取数据
      this.$api.getWorkShopsLine().then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    createWorkshop () {
      this.create.corporation.createTime = new Date().getTime() // 创建时间戳

      this.$api.createWorkshop({

      }).then(res => {

      })
      dialogVisibleAdd = false
    },
    handleClick (row) {
      console.log(row)
      this.dialogVisibleSave = true
      this.form2.company = row.corporation.name
      this.form2.name = row.name
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.createLine {
  position: absolute;
  top: 70px;
  right: 20px;
}
.el-table {
  margin-top: 50px;
}
</style>
