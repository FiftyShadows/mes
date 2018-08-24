<!-- 用户组 -->
<template>
<div class="usergroups">
  <div style="float: left; margin-bottom: 10px;">
    <el-input v-model.trim="seacrhUsergroup" placeholder="请输入内容..." style="width: 200px;"></el-input>
    <el-button type="primary" icon="el-icon-search" circle @click="seach()" ></el-button>
  </div>
  <el-button type="primary" @click="openAddgroup()" style="float: right; margin-bottom: 10px;">新 增</el-button>
  <el-table :data="tableData" border :stripe="true" style="width: 100%" height="500">
    <el-table-column fixed prop="name" label="名称">
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button @click="openSavegroups(scope.row)" type="text" size="small">修 改</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="新 建" :visible.sync="dialogFormVisibleADD">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name" required>
        <el-input v-model="form.name" auto-complete="off" required></el-input>
      </el-form-item>
      <el-form-item label="roles" :label-width="formLabelWidth" prop="roles" required>
        <el-select v-model="form.roles" multiple placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <hr>
    <el-button type="info" style="margin-left: 20px;" disabled>添加权限</el-button>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange" style="width: 80%; margin:auto;">
      <el-checkbox v-for="item in options2" :label="item" :key="item" border>{{item}}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleADD = false">取 消</el-button>
      <el-button type="primary" @click="addUserGroups()">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog title="修 改" :visible.sync="dialogFormVisibleSave">
    <el-form :model="form2" :rules="rules" ref="form2">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name" required>
        <el-input v-model="form2.name" auto-complete="off" required></el-input>
      </el-form-item>
      <!-- <el-form-item label="roles" :label-width="formLabelWidth" prop="roles" required>
        <el-select v-model="form2.roles" multiple placeholder="请选择" style="width: 100%;">
          <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <el-button type="info" style="margin-left: 20px;" disabled>roles</el-button>
    <div style="margin: 15px 0;"></div>
    <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
    <el-checkbox-group v-model="checkedOptions1" @change="handleCheckedOptionsChange1" style="width: 80%; margin:auto;">
      <el-checkbox v-for="item in options" :label="item.value" :key="item.value" border>{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <hr>
    <el-button type="info" style="margin-left: 20px;" disabled>添加权限</el-button>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange" style="width: 80%; margin:auto;">
      <el-checkbox v-for="item in options2" :label="item" :key="item" border>{{item}}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleSave = false">取 消</el-button>
      <el-button type="primary" @click="saveUserGroups()">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>
<script>
export default {
  name: 'usergroups',
  data () {
    return {
      seacrhUsergroup: '',
      tableData: [],
      dialogFormVisibleADD: false,
      dialogFormVisibleSave: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        roles: [],
        permissions: []
      },
      form2: {
        name: '',
        roles: [],
        permissions: []
      },
      // roles
      options: [
        {name: '落丝', value: 'DOFFING'},
        {name: '待染判', value: 'SUBMIT_DYEING_PREPARE'},
        {name: '染判', value: 'SUBMIT_DYEING_RESULT'},
        {name: '等级确认', value: 'SUBMIT_GRADE'},
        {name: '标样丝', value: 'SUBMIT_DYEING_SAMPLE'}
      ],
      options3: [],
      checkAll1: false,
      checkedOptions1: [],
      isIndeterminate1: true,
      // 权限
      options2: [],
      checkedOptions: [],
      isIndeterminate: true,
      checkAll: false,
      totalData: [],
      rules: {
        name: { required: true, message: '必输项...', trigger: 'blur' },
        code: { required: true, message: '必选项...', trigger: 'change' }
      }
    }
  },
  created () {
    this.getUsergroups()
    this.getOptions2()
  },
  methods: {
    getUsergroups () {
      this.$api.getUsergroups().then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    seach () {
      
    },
    openAddgroup () {
      this.options2 = this.totalData.map(item => {
        return item.name
      })
      this.dialogFormVisibleADD = true
    },
    addUserGroups () {
      let item = []
      for (let j = 0; j < this.form.roles.length; j++) {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].name === this.form.roles[j]) {
            item.push(this.options[i].value)
          }
        }
      }
      this.form.roles = item
      console.log(this.checkedOptions)
      for (let j = 0; j < this.checkedOptions.length; j++) {
        for (let i = 0; i < this.totalData.length; i++) {
          if (this.totalData[i].name === this.checkedOptions[j]) {
            this.form.permissions.push(this.totalData[i])
          }
        }
      }
      this.form.createDateTime = new Date().getTime()
      this.form.modifyDateTime = new Date().getTime()
      // console.log(this.form)
      this.$api.addUsergroups(this.form).then(res => {
        console.log(res)
        this.getUsergroups()
        this.dialogFormVisibleADD = false
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
      })
    },
    openSavegroups (row) {
      console.log(row)
      console.log(this.options)
      this.form2 = row
      this.options2 = this.totalData.map(item => {
        return item.name
      })
      this.options3 = this.options.map(item => {
        return item.value
      })
      this.checkedOptions = this.form2.permissions.map(item => {
        return item.name
      })
      this.checkedOptions1 = this.form2.roles
      console.log(this.options2)
      console.log(this.checkedOptions1)
      // var item = []
      // if(this.checkedOptions1) {
      //   for (let j = 0; j < this.checkedOptions1.length; j++) {
      //     for (let i = 0; i < this.options.length; i++) {
      //       if (this.options[i].value === this.checkedOptions1[j]) {
      //         item.push(this.options[i].name)
      //       }
      //     }
      //   }
      //   this.checkedOptions1 = item
      // console.log(this.checkedOptions1)
      // }
      this.dialogFormVisibleSave = true
    },
    saveUserGroups () {
      this.form2.modifyDateTime = new Date().getTime()
      // let item = []
      // for (let j = 0; j < this.checkedOptions1.length; j++) {
      //   for (let i = 0; i < this.options.length; i++) {
      //     if (this.options[i].name === this.checkedOptions1[j]) {
      //       item.push(this.options[i].value)
      //     }
      //   }
      // }
      this.form2.roles = this.checkedOptions1
      console.log(this.form2.roles)
      this.$api.saveUsergroups(this.form2).then(res => {
        console.log(res)
        this.getUsergroups()
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.dialogFormVisibleSave = false
      })
    },
    getOptions2 () {
      this.$api.getAdmins().then(res => {
        this.totalData = res.data
        console.log(this.totalData)
      })
    },
    handleCheckAllChange (val) {
      this.checkedOptions = val ? this.options2 : [];
      this.isIndeterminate = false;
    },
    handleCheckedOptionsChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options2.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options2.length;
    },
    handleCheckAllChange1 (val) {
      console.log(this.options3)
      this.checkedOptions1 = val ? this.options3 : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedOptionsChange1 (value) {
      console.log(value)
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.options3.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.options3.length;
    }
  }
}
</script>

