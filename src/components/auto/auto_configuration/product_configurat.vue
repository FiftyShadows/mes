<template>
  <div class="Configurat">
    <el-tabs type="border-card" v-model="activeTabs" @tab-click="handleClick" v-loading.fullscreen.lock="fullscreenLoading">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.name">
        <el-tag type="success" style="width: 100%;text-align: left;height: 50px;line-height: 50px;">
          生产管理
          <el-button size="mini" type="primary" style="float: right; margin: 10px;" @click="openAdd(tab.name)">新增</el-button>
          <el-button size="mini" type="primary" style="float: right; margin: 10px;" @click="dialogVisibleSort = true">排序</el-button>
        </el-tag>
        <el-collapse v-model="activeColapse" accordion>
          <el-collapse-item v-for="(item,index) in totalData" :key="item.id" :title="item.name">
            <el-form :model="item" :rules="exceptionsRules" ref="item" label-width="100px" class="demo-ruleForm">
              <el-form-item label="权限code" prop="id">
                <el-alert title="" type="info" :closable="false">ProductProcess:{{item.id}}</el-alert>
              </el-form-item>
              <el-form-item label="名称" prop="name" required>
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="sortBy" required>
                <el-input v-model.number="item.sortBy"></el-input>
              </el-form-item>
              <el-form-item label="relateRoles:" prop="relateRoles">
                <el-checkbox-group v-model="item.relateRoles" style="float: left;" @change="checkbox(index)">
                  <el-checkbox v-for="items in options" :label="items.value" :key="items.value" border>{{items.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="" prop="exceptions">
                <el-tag type="info" style="float: left; width: 100%;text-align: left;">
                  丝锭异常
                  <el-button size="mini" type="primary" style="float: right;" @click="saveExceptions(index)">修改</el-button>
                </el-tag>
                <el-button size="mini" type="primary" v-for="list in item.exceptions" plain round :key="list.name">{{list.name}}</el-button>
              </el-form-item>
              <el-form-item label="" prop="exceptions">
                <el-tag type="info" style="float: left; width: 100%;text-align: left;">
                  丝锭备注
                  <el-button size="mini" type="primary" style="float: right;" @click="openNotes(index)">修改</el-button>
                </el-tag>
                <el-button size="mini" type="info" v-for="list in item.notes" plain round :key="list.name">{{list.name}}</el-button>
              </el-form-item>
              <el-form-item label="" prop="formConfig">
                <el-tag type="info" style="float: left; width: 100%;text-align: left;">
                  {{item.formConfig ? item.formConfig.name : '表单模板'}}
                  <el-button size="mini" type="primary" style="float: right;" @click="openForms(index)">修改</el-button>
                  <el-button size="mini" type="danger" style="float: right;" @click="clearForms(index)">清空表单</el-button>
                </el-tag>
                <template v-if="item.formConfig">
                  <div class="Form" v-for="item in item.formConfig.formFieldConfigs" :key="item.id">
                    <el-tag type="info">{{item.name}}</el-tag>
                    <el-input-number v-if="item.valueType === 'NUMBER' && item.inputType !== 'SELECTION'" label="请输入"></el-input-number>
                    <el-input v-if="item.valueType === 'STRING' && item.inputType !== 'SELECTION'" placeholder="请输入内容" style="width: 60%;"></el-input>
                    <el-select v-model="item.val" v-if="item.inputType === 'SELECTION' && item.valueType !== 'BOOLEAN'" placeholder="请选择">
                      <el-option v-for="item in item.selectOptions" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                    <el-select v-model="item.val" v-if="item.valueType === 'BOOLEAN'" placeholder="请选择">
                      <el-option label="是" value="true"></el-option>
                      <el-option label="否" value="false"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(index, 'item')" style="width: 100%;">保存</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-tag type="success" style="width: 100%;text-align: left;height: 50px;line-height: 50px;">
          染判配置
          <el-button size="mini" type="primary" style="float: right; margin: 10px;" @click="openForms()">修改</el-button>
          <el-button size="mini" type="danger" style="float: right; margin: 10px;" @click="clearForms()">清空表单</el-button>
        </el-tag>
        <el-collapse v-model="dyeingCollapse" accordion @change="handleChange(tab)">
          <el-collapse-item title="染判模板">
            <el-form :model="dyeingForm" label-width="100px">
              <el-form-item>
                <template v-if="dyeingForm">
                  <div class="Form" v-for="item in dyeingForm.formFieldConfigs" :key="item.id">
                  <el-tag type="info">{{item.name}}</el-tag>
                  <el-input-number v-if="item.valueType === 'NUMBER' && item.inputType !== 'SELECTION'" label="请输入"></el-input-number>
                  <el-input v-if="item.valueType === 'STRING' && item.inputType !== 'SELECTION'" placeholder="请输入内容" style="width: 60%;"></el-input>
                  <el-select v-model="item.val" v-if="item.inputType === 'SELECTION' && item.valueType !== 'BOOLEAN'" placeholder="请选择">
                  <el-option v-for="item in item.selectOptions" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                  <el-select v-model="item.val" v-if="item.valueType === 'BOOLEAN'" placeholder="请选择">
                  <el-option label="是" value="true"></el-option>
                  <el-option label="否" value="false"></el-option>
                  </el-select>
                  </div>
                </template>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addDyeingForm(tab)" style="width: 100%;">保存</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新增" :visible.sync="dialogVisibleAddProesses">
      <el-form :model="productProesses" :rules="exceptionsRules" ref="productProesses" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品" :label-width="formLabelWidthcode">
          <el-input v-model="productProesses.product.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" :label-width="formLabelWidthcode">
          <el-input v-model="productProesses.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortBy" :label-width="formLabelWidthcode">
          <el-input-number v-model="productProesses.sortBy" :min="0" :step="1000" style="float: left;"></el-input-number>
        </el-form-item>
        <el-form-item label="role" :label-width="formLabelWidthcode">
          <el-checkbox-group v-model="productProesses.relateRoles" style="float: left;">
            <el-checkbox v-for="items in options" :label="items.value" :key="items.value" border>{{items.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidthcode">
          <el-tag type="info" style="float: left; width: 100%;text-align: left;">
            丝锭异常
            <el-button size="mini" type="danger" style="float: right;" @click="addExceptions()">修改</el-button>
          </el-tag>
          <el-button size="mini" type="danger" v-for="list in productProesses.exceptions" plain round :key="list.name">{{list.name}}</el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidthcode">
          <el-tag type="info" style="float: left; width: 100%;text-align: left;">
            丝锭备注
            <el-button size="mini" type="danger" style="float: right;" @click="addNotes()">修改</el-button>
          </el-tag>
          <el-button size="mini" type="info" v-for="list in productProesses.notes" plain round :key="list.name">{{list.name}}</el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidthcode">
          <el-tag type="info" style="float: left; width: 100%;text-align: left;">
            {{productProesses.formConfig.name ? productProesses.formConfig.name : '表单模板'}}
            <el-button size="mini" type="danger" style="float: right;" @click="dialogVisibleForm = true; isNewForm = true">修改</el-button>
          </el-tag>
          <template v-if="productProesses.formConfig">
            <div class="Form" v-for="item in productProesses.formConfig.formFieldConfigs" :key="item.id">
              <el-tag type="info">{{item.name}}</el-tag>
              <el-input-number v-if="item.valueType === 'NUMBER' && item.inputType !== 'SELECTION'" label="请输入"></el-input-number>
              <el-input v-if="item.valueType === 'STRING' && item.inputType !== 'SELECTION'" placeholder="请输入内容" style="width: 60%;"></el-input>
              <el-select v-model="item.val" v-if="item.inputType === 'SELECTION' && item.valueType !== 'BOOLEAN'" placeholder="请选择">
                <el-option v-for="item in item.selectOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select v-model="item.val" v-if="item.valueType === 'BOOLEAN'" placeholder="请选择">
                <el-option label="是" value="true"></el-option>
                <el-option label="否" value="false"></el-option>
              </el-select>
            </div>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="NewForm('productProesses')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="排 序" :visible.sync="dialogVisibleSort" width="50%" :before-close="handleClose">
      <el-tag title="" type="info" v-model="sortData" v-for="(item,index) in totalData" :key="index" :closable="false" style="width: 60%; text-align: left; margin-bottom: 5px;">
        <el-tag type="danger" style="font-weight: bold;">{{item.name}}</el-tag>
        <div style="float: right;">
          <el-button icon="el-icon-upload2 icon" size="mini" type="primary" v-if="totalData.indexOf(item) != 0" @click="up(index)" circle></el-button>
          <el-button type="danger" icon="el-icon-download icon" size="mini" v-if="totalData.indexOf(item) != totalData.length-1" @click="down(index)" circle></el-button>
        </div>
      </el-tag>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sortProesses()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="丝锭异常" :visible.sync="dialogVisibleSilkExceptions" :before-close="handleClose1">
      <el-dialog width="30%" title="新建异常" :visible.sync="innerVisibleSilkExceptions" append-to-body>
        <el-form :model="newSilkExceptions" :rules="exceptionsRules" ref="newSilkExceptions" label-width="100px" class="demo-ruleForm">
          <el-form-item label="异常" prop="name">
            <el-input v-model="newSilkExceptions.name" clearable placeholder="请输入异常..."></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addSilkExceptions('newSilkExceptions')">确 定</el-button>
        </div>
      </el-dialog>
      <el-checkbox :indeterminate="isIndeterminateSilk" v-model="checkAllSilk" @change="handleCheckAllSilkChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedSilks" @change="handleCheckedSilksChange">
        <el-checkbox v-for="item in silkExceptTable" :label="item" :key="item" style="margin:5px;" border>{{item}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="innerVisibleSilkExceptions = true">新 增</el-button>
        <el-button type="primary" v-if="isNewSilk" @click="addSilk()">确 定</el-button>
        <el-button type="primary" v-else @click="saveSilk()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="丝锭备注" :visible.sync="dialogVisibleSilkNotes" :before-close="handleClose2">
      <el-dialog width="30%" title="新建备注" :visible.sync="innerVisibleSilkNotes" append-to-body>
        <el-form :model="newSilkNotes" :rules="exceptionsRules" ref="newSilkNotes" label-width="100px" class="demo-ruleForm">
          <el-form-item label="备注" prop="name">
            <el-input v-model="newSilkNotes.name" clearable placeholder="请输入备注..."></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addSilkNotes('newSilkNotes')">确 定</el-button>
        </div>
      </el-dialog>
      <el-checkbox :indeterminate="isIndeterminateNote" v-model="checkAllNote" @change="handleCheckAllNoteChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedNotes" @change="handleCheckedNoteChange">
        <el-checkbox v-for="item in silkNoteTable" :label="item" :key="item" style="margin:5px;" border>{{item}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="innerVisibleSilkNotes = true">新 增</el-button>
        <el-button type="primary" v-if="isNewNotes" @click="addNewNotes()">确 定</el-button>
        <el-button type="primary" v-else @click="saveNotes()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="表单模板选择" :visible.sync="dialogVisibleForm">
      <el-select v-model="value" v-if="!isNewForm" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" @change="choseForm()">
        <el-option v-for="item in optionsForm" :key="item.id" :label="item.name" :value="item.name">
          {{item.name}}
          <el-button type="primary" icon="el-icon-edit" circle @click="saveOptionsFormItem(item.name)" :change="false" style="float: right;" size="mini"></el-button>
        </el-option>
      </el-select>
      <el-select v-model="value" v-else filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" @change="choseNewForm()">
        <el-option v-for="item in optionsForm" :key="item.id" :label="item.name" :value="item.name">
          {{item.name}}
          <el-button type="primary" icon="el-icon-edit" @click="saveOptionsFormItem(item.name)" style="float: right; z-index: 999;" size="mini"></el-button>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleCreate = true">新建表单</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建模板" :visible.sync="dialogVisibleCreate">
      <el-form :model="createform" :rules="exceptionsRules" ref="createform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="createform.name" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div>
        <h3 class="Formcode">
          表单字段
          <el-button class="addBtn" type="danger" icon="el-icon-edit" @click="dialogVisibleNewCode = true; createCode = {}; showSelectOptions = []" circle size="mini"></el-button>
        </h3>
        <el-table :data="showCode" border style="100%">
          <el-table-column fixed prop="name" label="字段名称"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="saveCode(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deletedCode(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isNewForm" @click="addFormcode()">确 定</el-button>
        <el-button type="primary" v-else @click="addNewFormcode()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建表单字段" :visible.sync="dialogVisibleNewCode">
      <el-form :model="createCode" :rules="exceptionsRules" ref="createCode" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidthcode">
          <el-input v-model="createCode.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否必输" prop="required" :label-width="formLabelWidthcode">
          <el-checkbox v-model="createCode.required" label="必输项" border style="float:left;"></el-checkbox>
        </el-form-item>
        <el-form-item label="值类型" prop="valueType" :label-width="formLabelWidthcode">
          <el-select v-model="createCode.valueType" placeholder="请选择" style="float:left;">
            <el-option v-for="item in optionsCode" :label="item.name" :value="item.valueType" :key="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入类型" prop="inputType" :label-width="formLabelWidthcode">
          <el-select v-model="createCode.inputType" placeholder="请选择" style="float:left;">
            <el-option label="默认" value="DEFAULT"></el-option>
            <el-option label="下拉列表" value="SELECTION"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="createCode.inputType === 'SELECTION'" label="选项值" :label-width="formLabelWidthcode">
          <h3 class="Formcode">
            选项值
            <el-button class="addBtn" type="danger" icon="el-icon-edit" @click="dialogVisibleSelects = true; selectOptions = {}" circle size="mini"></el-button>
          </h3>
          <el-table :data="showSelectOptions" border style="100%">
            <el-table-column fixed prop="name" label="选项值"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="saveOptions(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deletedOptions(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNewCode('createCode')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建选项值" :visible.sync="dialogVisibleSelects">
      <!-- <el-form :model="selectOptions">
        <el-form-item label="活动名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="selectOptions.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form> -->
      <el-input v-model="selectOptions.name"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSelectOptions()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Configurat',
  data () {
    return {
      fullscreenLoading: false,
      val: '',
      val1: '',
      index: '',
      selectId: '',
      activeColapse: '',
      dyeingCollapse: '',
      dyeingForm: {},
      activeTabs: '',
      tabs: {},
      tabType: '',
      tabData: '', // 标题
      dialogVisibleAddProesses: false, // 新增工序
      dialogVisibleSort: false, // 排序弹框
      dialogVisibleSilkExceptions: false, // 丝锭异常弹框
      innerVisibleSilkExceptions: false, // 丝锭异常 新建异常
      dialogVisibleSilkNotes: false, // 丝锭备注
      innerVisibleSilkNotes: false, // 新建备注
      dialogVisibleForm: false, // 搜索表单
      dialogVisibleCreate: false, // 新建表单
      dialogVisibleNewCode: false, // 添加字段
      dialogVisibleSelects: false, // 添加下拉列表值
      totalData: [], // 工艺列表
      oldData: [],
      ChangeData: {},
      rules: {},
      options: [
        {name: '落丝', value: 'DOFFING'},
        {name: '待染判', value: 'SUBMIT_DYEING_PREPARE'},
        {name: '染判', value: 'SUBMIT_DYEING_RESULT'},
        {name: '等级确认', value: 'SUBMIT_GRADE'},
        {name: '标样丝', value: 'SUBMIT_DYEING_SAMPLE'}
      ],
      // 多选框
      checkAll: false,
      checked: [],
      isIndeterminate: true,
      // 新增工序
      isNewSilk: false,
      isNewNotes: false,
      isNewForm: false,
      productProesses: {
        product: '',
        sortBy: 0,
        relateRoles: [],
        exceptions: [],
        notes: [],
        formConfig: {
          name: null,
          formFieldConfigs: []
        }
      },
      // 排序
      sortData: [],
      // 丝锭异常
      silkExcepts: [],
      checkAllSilk: false,
      isIndeterminateSilk: true,
      silkExceptTable: [], // 所有丝锭异常列表
      checkedSilks: [], // 已有异常
      newSilkExceptions: { // 新增异常选项
        name: ''
      },
      // 丝锭备注
      silkNotes: [],
      checkAllNote: false,
      isIndeterminateNote: true,
      silkNoteTable: [], // 所有丝锭备注列表
      checkedNotes: [], // 已有备注
      newSilkNotes: { // 新增备注选项
        name: ''
      },
      // 表单选择
      isSaveForm: false, // 表单是添加还是修改
      formFieldConfigs: '', // 最终显示的数据
      formLabelWidth: '',
      formLabelWidthcode: '120px',
      optionsForm: [], // 获取数据
      value: '', // 绑定搜索值
      loading: false,
      createform: { // 新建表单
        name: '',
        formFieldConfigs: [] // 要添加字段
      },
      showCode: [], // 展示新建字段
      saveIndex: '',
      isSave: false,
      createCode: {
        name: '',
        multi: false,
        inputType: '',
        required: false,
        selectOptions: [],
        valueType: ''
      }, // 新建字段
      optionsCode: [ // 值类型选择
        {name: '文本', valueType: 'STRING'},
        {name: '布尔', valueType: 'BOOLEAN'},
        {name: '数值', valueType: 'NUMBER'}
      ],
      selectOptions: { // 新建选项值
        name: ''
      },
      showSelectOptions: [], // 展示列表
      isSaveOption: false, // 是否修改下拉值
      // 表单验证规则
      exceptionsRules: {
        name: [{ required: true, message: '必输项', trigger: 'blur' }],
        sortBy: [{ type: 'number', required: true, message: '请输入数字', trigger: 'blur' }],
        required: [{ required: true, message: '必选项', trigger: 'change' }],
        valueType: [{ required: true, message: '必选项', trigger: 'change' }],
        inputType: [{ required: true, message: '必选项', trigger: 'change' }]
      }
    }
  },
  created () {
    this.selectId = this.$route.query.name
    // this.dyeingForm = this.$route.query.dyeingFormConfig
    this.getTabsTitles()
  },
  methods: {
    openAdd (name) {
      this.productProesses = { // 打开重置数据
        product: {
          name: ''
        },
        sortBy: 0,
        relateRoles: [],
        exceptions: [],
        notes: [],
        formConfig: {
          name: null,
          formFieldConfigs: []
        }
      }
      for (let i = 0; i < this.tabs.length; i++) {
        if (name === this.tabs[i].name) {
          name = this.tabs[i]
        }
      }
      this.productProesses.product = name
      this.dialogVisibleAddProesses = true
    },
    checkbox (index) {
    },
    getTabsTitles () {
      this.fullscreenLoading = true // 添加loading
      this.$api.getProduct().then(res => {
        this.tabs = res.data
        this.activeTabs = this.selectId
        let product = {
          name: this.activeTabs
        }
        this.handleClick(product)
        this.fullscreenLoading = false
      })
    },
    handleClick (tab, event) {
      this.tabType = tab.name
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name === this.tabType) {
          this.tabData = this.tabs[i]
        }
      }
      this.$api.getTabData(this.tabData.id).then(res => {
        this.totalData = res.data.sort(function (a, b) {
          return a.sortBy - b.sortBy
        })
        this.activeColapse = this.totalData[0].name // 默认打开第一个
        this.oldData = res.data.sort(function (a, b) {
          return a.sortBy - b.sortBy
        })
        // relateRoles如为null出bug
        for (let i = 0; i < this.totalData.length; i++) {
          if (!this.totalData[i].relateRoles) {
            this.totalData[i].relateRoles = []
          }
        }
      })
    },
    submitForm (index, formName) {
      this.$refs[formName][index].validate((valid) => {
        if (valid) {
          this.$api.sortProesses(this.totalData[index]).then(res => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    // 关闭弹窗
    handleClose (done) { // 刷新单个列表
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name === this.tabType) {
          this.tabData = this.tabs[i]
        }
      }
      this.$api.getTabData(this.tabData.id).then(res => {
        this.totalData = res.data.sort(function (a, b) {
          return a.sortBy - b.sortBy
        })
        // relateRoles如为null出bug
        for (let i = 0; i < this.totalData.length; i++) {
          if (!this.totalData[i].relateRoles) {
            this.totalData[i].relateRoles = []
          }
        }
      })
      this.totalData = this.oldData
      this.dialogVisibleSort = false
    },
    handleClose1 (done) {
      this.checkedSilks = []
      this.dialogVisibleSilkExceptions = false
    },
    handleClose2 (done) {
      this.checkedNotes = []
      this.dialogVisibleSilkNotes = false
    },
    // 新增
    addExceptions () {
      this.$api.silkExceptions().then(res => {
        this.silkExcepts = res.data
        this.silkExceptTable = res.data.map(item => {
          return item.name
        })
        this.isNewSilk = true // 新增
        this.dialogVisibleSilkExceptions = true
      })
    },
    addSilk () {
      for (let j = 0; j < this.checkedSilks.length; j++) {
        for (let i = 0; i < this.silkExcepts.length; i++) {
          if (this.checkedSilks[j] === this.silkExcepts[i].name) {
            this.checkedSilks[j] = this.silkExcepts[i]
          }
        }
      }
      this.productProesses.exceptions = this.checkedSilks
      this.dialogVisibleSilkExceptions = false
      this.isNewSilk = false
      this.checkedSilks = []
    },
    addNotes () {
      this.$api.silkNotes().then(res => {
        this.silkNotes = res.data
        this.silkNoteTable = res.data.map(item => {
          return item.name
        })
        this.isNewNotes = true
        this.dialogVisibleSilkNotes = true
      })
    },
    addNewNotes () {
      for (let j = 0; j < this.checkedNotes.length; j++) {
        for (let i = 0; i < this.silkNotes.length; i++) {
          if (this.checkedNotes[j] === this.silkNotes[i].name) {
            this.checkedNotes[j] = this.silkNotes[i]
          }
        }
      }
      this.productProesses.notes = this.checkedNotes
      this.dialogVisibleSilkNotes = false
      this.isNewNotes = false
      this.checkedNotes = []
    },
    choseNewForm () {
      for (let i = 0; i < this.optionsForm.length; i++) {
        if (this.optionsForm[i].name === this.value) {
          this.value = this.optionsForm[i]
        }
      }
      this.productProesses.formConfig = this.value
      this.dialogVisibleForm = false
    },
    addNewFormcode () {
      this.createform.formFieldConfigs = this.showCode
      if (this.createform.name === '') {
        this.$message.error('无法新建，请输入名称！')
      } else if (this.createform.formFieldConfigs.length === 0) {
        this.$message.error('无法新建，请新建表单字段！')
      } else {
        this.$api.addCode(this.createform).then(res => {
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success'
          })
          this.formFieldConfigs = res.data // 赋值完成
          if (this.formFieldConfigs !== '') {
            if (this.productProesses) {
              this.productProesses.formConfig = this.formFieldConfigs
            }
          }
          this.dialogVisibleCreate = false
          this.dialogVisibleForm = false
          this.formFieldConfigs = []
        })
      }
    },
    NewForm (formName) { // 新增确定按钮
      if (this.productProesses.exceptions.length === 0) {
        this.$message.error('请选择丝锭异常, 否则无法新增!')
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.addProductProcesses(this.productProesses).then(res => {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              this.dialogVisibleAddProesses = false
              this.handleClose()
            })
          } else {
            return false
          }
        })
      }
    },
    // 排序（有修改不能复用）
    getOldSort () {
      for (let i = 0; i < this.totalData.length; i++) {
        this.sortData = this.totalData.map(item => {
          return item.sortBy
        })
      }
    },
    up (i) {
      this.getOldSort()
      let arr = this.totalData
      this.totalData = []
      let temp = arr[i]
      arr[i] = arr[i - 1]
      arr[i - 1] = temp
      for (let j = 0; j < arr.length; j++) {
        arr[j].sortBy = this.sortData[j]
        this.totalData.push(arr[j])
      }
    },
    down (i) {
      this.getOldSort()
      let arr = this.totalData
      this.totalData = []
      let temp = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = temp
      for (let j = 0; j < arr.length; j++) {
        arr[j].sortBy = this.sortData[j]
        this.totalData.push(arr[j])
      }
    },
    sortProesses () { // 排序确定
      for (let i = 0; i < this.totalData.length; i++) {
        this.$api.sortProesses(this.totalData[i]).then(res => {
          this.dialogVisibleSort = false
        })
      }
    },
    // 丝锭异常
    saveExceptions (index) {
      this.index = index
      this.$api.silkExceptions().then(res => {
        this.silkExcepts = res.data
        this.silkExceptTable = res.data.map(item => {
          return item.name
        })
        this.dialogVisibleSilkExceptions = true
        if (this.totalData[index].exceptions) {
          this.checkedSilks = this.totalData[index].exceptions.map(item => {
            return item.name
          })
        }
      })
    },
    handleCheckAllSilkChange (val) {
      this.checkedSilks = val ? this.silkExceptTable : []
      this.isIndeterminateSilk = false
    },
    handleCheckedSilksChange (value) {
      let checkedCount = value.length
      this.checkAllSilk = checkedCount === this.silkExceptTable.length
      this.isIndeterminateSilk = checkedCount > 0 && checkedCount < this.silkExceptTable.length
    },
    saveSilk () { // 最后赋值异常
      for (let j = 0; j < this.checkedSilks.length; j++) {
        for (let i = 0; i < this.silkExcepts.length; i++) {
          if (this.checkedSilks[j] === this.silkExcepts[i].name) {
            this.checkedSilks[j] = this.silkExcepts[i]
          }
        }
      }
      this.totalData[this.index].exceptions = this.checkedSilks
      this.dialogVisibleSilkExceptions = false
      this.checkedSilks = [] // 赋值结束 清空
    },
    addSilkExceptions (formName) { // 新增丝锭异常选项
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addsilkExceptions(this.newSilkExceptions).then(res => {
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
            this.$api.silkExceptions().then(res => {
              this.silkExcepts = res.data
              this.silkExceptTable = res.data.map(item => {
                return item.name
              })
              if (this.totalData[this.index].exceptions) {
                this.checkedSilks = this.totalData[this.index].exceptions.map(item => {
                  return item.name
                })
              }
              this.checkedSilks.push(this.newSilkExceptions.name)
              this.innerVisibleSilkExceptions = false
            })
          })
        } else {
          return false
        }
      })
    },
    // 丝锭备注
    openNotes (index) {
      this.index = index
      this.$api.silkNotes().then(res => {
        this.silkNotes = res.data
        this.silkNoteTable = res.data.map(item => {
          return item.name
        })
        this.dialogVisibleSilkNotes = true
        if (this.totalData[index].notes) {
          this.checkedNotes = this.totalData[index].notes.map(item => {
            return item.name
          })
        }
      })
    },
    handleCheckAllNoteChange (val) {
      this.checkedNotes = val ? this.silkNoteTable : []
      this.isIndeterminateNote = false
    },
    handleCheckedNoteChange (value) {
      let checkedCount = value.length
      this.checkAllNote = checkedCount === this.silkNoteTable.length
      this.isIndeterminateNote = checkedCount > 0 && checkedCount < this.silkNoteTable.length
    },
    saveNotes () { // 最后赋值备注
      for (let j = 0; j < this.checkedNotes.length; j++) {
        for (let i = 0; i < this.silkNotes.length; i++) {
          if (this.checkedNotes[j] === this.silkNotes[i].name) {
            this.checkedNotes[j] = this.silkNotes[i]
          }
        }
      }
      this.totalData[this.index].notes = this.checkedNotes
      this.dialogVisibleSilkNotes = false
      this.checkedNotes = [] // 清空
    },
    addSilkNotes (formName) { // 新增备注选项
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addSilkNotes(this.newSilkNotes).then(res => {
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
            this.$api.silkNotes().then(res => {
              this.silkNotes = res.data
              this.silkNoteTable = res.data.map(item => {
                return item.name
              })
              if (this.totalData[this.index].notes) {
                this.checkedNotes = this.totalData[this.index].notes.map(item => {
                  return item.name
                })
                this.checkedNotes.push(this.newSilkNotes.name)
              }
              this.innerVisibleSilkNotes = false
            })
          })
        } else {
          return false
        }
      })
    },
    // 表单模板选择
    // addForm () {
    //   this.dialogVisibleForm = false
    //   if (this.formFieldConfigs !== '') {
    //     this.totalData[this.index].formConfig = this.formFieldConfigs
    //   }
    // },
    saveOptionsFormItem (name) {
      for (let i = 0; i < this.optionsForm.length; i++) {
        if (this.optionsForm[i].name === name) {
          this.value = this.optionsForm[i]
        }
      }
      this.createform = this.value
      this.showCode = this.value.formFieldConfigs
      this.dialogVisibleCreate = true
    },
    openForms (i) {
      this.index = i
      this.dialogVisibleForm = true
    },
    remoteMethod (query) { // 搜索
      if (query !== '') {
        this.loading = true
        this.$api.searchForms(query).then(res => {
          this.loading = false
          this.optionsForm = res.data
        })
      } else {
        this.optionsForm = []
      }
    },
    choseForm () { // 直接选择表单赋值
      for (let i = 0; i < this.optionsForm.length; i++) {
        if (this.optionsForm[i].name === this.value) {
          this.value = this.optionsForm[i]
        }
      }
      if (this.totalData[this.index]) {
        this.totalData[this.index].formConfig = this.value
      } else {
        this.dyeingForm = this.formFieldConfigs = this.value
      }
      this.dialogVisibleForm = false
    },
    clearForms (index) {
      if (this.totalData[this.index]) {
        this.totalData[index].formConfig = {name: '表单模板'}
      } else {
        this.dyeingForm = this.formFieldConfigs = {name: '表单模板'}
      }
    },
    addNewCode (formName) { // 添加新字段
      if (this.createCode.inputType === 'SELECTION') {
        if (this.showSelectOptions.length !== 0) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.createCode.selectOptions = this.showSelectOptions.map(item => { return item.name }) // 传入select
              this.createCode.multi = false
              if (this.isSave) {
                this.showCode[this.saveIndex] = this.createCode
                this.dialogVisibleNewCode = false
                this.isSave = false
              } else {
                this.showCode.push(this.createCode)
                this.dialogVisibleNewCode = false
              }
              this.showSelectOptions = []
            } else {
              return false
            }
          })
        } else {
          this.$message.error('无法新建，请配置选项值!')
        }
      }
    },
    addFormcode () { // 添加方法
      this.createform.formFieldConfigs = this.showCode
      this.$api.addCode(this.createform).then(res => {
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        })
        this.formFieldConfigs = res.data // 赋值完成
        if (this.formFieldConfigs !== '') {
          if (this.totalData[this.index]) {
            this.totalData[this.index].formConfig = this.formFieldConfigs
          }
        }
        this.dialogVisibleCreate = false
        this.dialogVisibleForm = false
      })
    },
    saveCode (i, row) {
      this.isSave = true
      this.saveIndex = i
      this.createCode = row
      for (let i of row.selectOptions) {
        this.showSelectOptions.push({name: i})
      }
      this.dialogVisibleNewCode = true
    },
    deletedCode (i, row) {
      // this.createform.formFieldConfigs.splice(i, 1)
      this.showCode.splice(i, 1)
    },
    addSelectOptions () {
      if (this.selectOptions.name !== undefined) {
        if (this.isSaveOption) {
          this.showSelectOptions[this.selectIndex] = this.selectOptions
          this.isSaveOption = false
          this.dialogVisibleSelects = false
        } else {
          this.showSelectOptions.push(this.selectOptions)
          this.dialogVisibleSelects = false
        }
      } else {
        this.$message.error('无法新建，请输入选项值!')
      }
    },
    saveOptions (i, row) {
      this.isSaveOption = true
      this.selectIndex = i
      this.selectOptions = row
      this.dialogVisibleSelects = true
    },
    deletedOptions (i, row) {
      this.showSelectOptions.splice(i, 1)
    },
    addDyeingForm (data) {
      let params = {
        id: data.id,
        dyeingFormConfig: {
          id: this.dyeingForm.id
        }
      }
      this.$api.addDyeingInfo(params).then(res => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        })
      })
    },
    handleChange (data) {
      this.$api.getDyeingInfo(data).then(res => {
        // console.log(res)
        this.dyeingForm = res.data.dyeingFormConfig
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-collapse-item__header {
  text-align: left;
}
.Formcode {
  background: #909399;
  margin: 0;
  line-height: 40px;
  color: white;
  text-align: left;
  padding-left: 10px;
  .addBtn {
    float: right;
    margin: 4px;
  }
}
.Form {
  width: 100%;
  float: left;
  margin-top: 10px;
}
</style>
