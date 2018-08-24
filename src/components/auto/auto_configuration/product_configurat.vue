<template>
  <div class="Configurat">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.name">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(item,index) in totalData" :key="item.id" :title="item.name" :name="item.name">
            <el-form :model="item" :rules="rules" ref="ChangeData" label-width="100px" class="demo-ruleForm">
              <el-form-item label="权限code" prop="id">
                <el-alert title="" type="info" :closable="false">ProductProcess:{{item.id}}</el-alert>
              </el-form-item>
              <el-form-item label="名称*" prop="name">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="排序*" prop="sortBy">
                <el-input v-model="item.sortBy"></el-input>
              </el-form-item>
              <el-form-item label="relateRoles :" prop="relateRoles">
                <el-checkbox-group v-model="item.relateRoles" style="float: left;" @change="checkbox(index)">
                  <el-checkbox v-for="items in options" :label="items.value" :key="items.value" border>{{items.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="*" prop="exceptions">
                <el-tag type="info" style="float: left; width: 100%;text-align: left;">
                  丝锭异常
                  <el-button size="mini" type="danger" style="float: right;" @click="saveExceptions(index)">修改</el-button>
                </el-tag>
                <el-button size="mini" type="danger" v-for="list in item.exceptions" plain round :key="list.name">{{list.name}}</el-button>
              </el-form-item>
              <el-form-item label="*" prop="exceptions">
                <el-tag type="info" style="float: left; width: 100%;text-align: left;">
                  丝锭备注
                  <el-button size="mini" type="danger" style="float: right;" @click="saveExceptions(index)">修改</el-button>
                </el-tag>
                <el-button size="mini" type="info" v-for="list in item.notes" plain round :key="list.name">{{list.name}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(index)" style="width: 100%;">保存</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'Configurat',
  data () {
    return {
      selectId: '',
      activeName: '',
      tabs: {},
      tabType: '',
      tabData: '',
      totalData: [], // 每个操作的数据
      ChangeData: {},
      rules: {},
      options: [
        {name: '落丝', value: 'DOFFING'},
        {name: '待染判', value: 'SUBMIT_DYEING_PREPARE'},
        {name: '染判', value: 'SUBMIT_DYEING_RESULT'},
        {name: '等级确认', value: 'SUBMIT_GRADE'},
        {name: '标样丝', value: 'SUBMIT_DYEING_SAMPLE'}
      ],
      checkAll: false,
      checked: [],
      isIndeterminate: true,
    }
  },
  created () {
    console.log(this.$route.query)
    this.selectId = this.$route.query.name
    // this.activeName = this.$route.query.name
    this.getTabsTitles()
  },
  methods: {
    checkbox (index) {
      console.log(this.totalData[index].relateRoles)
    },
    getTabsTitles () {
      this.$api.getProduct().then(res => {
        // console.log(res)
        this.tabs = res.data
      })
    },
    handleClick (tab, event) {
      // console.log(tab, event)
      this.tabType = tab.name
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name === this.tabType) {
          this.tabData = this.tabs[i]
        }
      }
      this.$api.getTabData(this.tabData.id).then(res => {
        console.log(res)
        this.totalData = res.data.sort(function (a,b) {
          return a.sortBy - b.sortBy
        })
      })
    },
    submitForm (index) {
      console.log(index)
      console.log(this.totalData[index])
    },
    saveExceptions (index) {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-collapse-item__header {
  text-align: left;
}
</style>

