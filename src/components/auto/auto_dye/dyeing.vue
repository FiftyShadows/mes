<template>
  <div class='dyeing'>
    <el-row type='flex' :gutter='20'>
      <el-col :span='1' class='checkAll'>
        <el-checkbox :indeterminate='isIndeterminate' v-model='checkAll' @change='handleCheckAllChange'>全选</el-checkbox>
      </el-col>
      <el-col :span='3'>
        <el-select v-model="workshop" clearable placeholder="请选择车间">
        <el-option v-for="workshop in workshops" :key="workshop.id" :label="workshop.name" :value="workshop.id"></el-option>
      </el-select>
      </el-col>
      <el-col :span='3'>
        <el-input v-model='userId' placeholder='请输入织袜工号' class='userId'></el-input>
      </el-col>
      <el-col :span='5'>
        <el-date-picker
          v-model='startDate'
          type='date'
          placeholder='请选择织袜开始时间'
          align='right'
          :picker-options='pickerOptions'
          value-format='yyyy-MM-dd'>
        </el-date-picker>
      </el-col>
      <el-col :span='5'>
        <el-date-picker
          v-model='endDate'
          type='date'
          placeholder='请选择织袜结束时间'
          align='right'
          :picker-options='pickerOptions'
          value-format='yyyy-MM-dd'>
        </el-date-picker>
      </el-col>
      <el-button icon='el-icon-search' type='primary' @click='search()'></el-button>
      <el-button @click='batchSubmit()' type='primary'>提交</el-button>
    </el-row>
    <div v-for="(dyeingPrepare, index) in dyeingPrepares" :key="index">
      <dyeing-record-component
        :checkAll="checkAll"
        @changeIsIndeterminate="changeIsIndeterminate"
        @changeCheckAll="changeCheckAll"
        :dyeingPrepares="dyeingPrepares"
        :index="index"
        :dyeingPrepare="dyeingPrepare"
        :key="index"
        v-loading="loading"
        style="margin-top: 10px"
        @getDyeingRecords="search()">
      </dyeing-record-component>
    </div>
    <Pagination :total="total" :page-size="pageSize" :page-num="pageNum" @changePage="changePage"></Pagination>
  </div>
</template>
<script>
import dyeingRecordComponent from './dyeing-record-component'
import Pagination from '../../common/pagination.vue'
export default {
  name: 'dyeing',
  components: {
    'Pagination': Pagination,
    'dyeing-record-component': dyeingRecordComponent
  },
  data () {
    return {
      loading: true,
      total: 0,
      pageSize: 50,
      pageNum: 0,
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
      userId: '',
      workshop: '',
      workshops: [],
      startDate: this.util.getNowFormatDate(),
      endDate: this.util.getNowFormatDate(),
      isIndeterminate: false,
      checkAll: false,
      dyeingPrepares: []
      // dyeingPrepares: [
      //   {
      //     id: 'string',
      //     type: 'FIRST',
      //     silkCarRecord: {
      //       id: '1',
      //       silkCar: {
      //         id: '5b6ed118ee3d0a0926707597',
      //         createDateTime: 1533989144000,
      //         modifyDateTime: 1533989144000,
      //         type: 'DEFAULT',
      //         number: 'C34001',
      //         code: '3000C34001',
      //         row: 3,
      //         col: 4
      //       },
      //       batch: {
      //         id: 'string',
      //         batchNo: 'string',
      //         silkWeight: 0,
      //         centralValue: 0,
      //         holeNum: 0,
      //         spec: 'string',
      //         tubeColor: 'string',
      //         note: 'string',
      //         workshop: {
      //           id: 'string',
      //           code: 'string',
      //           name: 'string',
      //           note: 'string',
      //           corporation: {
      //             id: 'string',
      //             name: 'string'
      //           }
      //         },
      //         product: {
      //           id: '5b6d021dee3d0a28f417c218',
      //           name: 'FDY',
      //           code: 'FDY'
      //         }
      //       },
      //       grade: {
      //         id: 'string',
      //         name: 'string',
      //         sortBy: 'string'
      //       },
      //       doffingDateTime: '1',
      //       carpoolDateTime: '1'
      //     },
      //     silks: [{
      //       id: 'string',
      //       code: 'string',
      //       doffingNum: 'string',
      //       doffingOperator: {
      //         roles: [
      //           'string'
      //         ],
      //         permissions: [
      //           'string'
      //         ],
      //         id: 'string',
      //         hrId: 'string',
      //         oaId: 'string',
      //         name: 'string',
      //         admin: true,
      //         groups: [
      //           {
      //             roles: [
      //               'string'
      //             ],
      //             permissions: [
      //               'string'
      //             ],
      //             id: 'string',
      //             name: 'string'
      //           }
      //         ]
      //       }
      //     }],
      //     silkDyeingSample: {
      //       id: 'string',
      //       silk: {
      //         id: 'string',
      //         code: 'string',
      //         doffingNum: 'string',
      //         doffingOperator: {
      //           roles: [
      //             'string'
      //           ],
      //           permissions: [
      //             'string'
      //           ],
      //           id: 'string',
      //           hrId: 'string',
      //           oaId: 'string',
      //           name: 'string',
      //           admin: true,
      //           groups: [
      //             {
      //               roles: [
      //                 'string'
      //               ],
      //               permissions: [
      //                 'string'
      //               ],
      //               id: 'string',
      //               name: 'string'
      //             }
      //           ]
      //         }
      //       }
      //     },
      //     silkCarRecord1: {
      //       id: 'string',
      //       batch: {
      //         id: 'string',
      //         batchNo: 'string',
      //         silkWeight: 0,
      //         centralValue: 0,
      //         holeNum: 0,
      //         spec: 'string',
      //         tubeColor: 'string',
      //         note: 'string',
      //         workshop: {
      //           id: 'string',
      //           code: 'string',
      //           name: 'string',
      //           note: 'string',
      //           corporation: {
      //             id: 'string',
      //             name: 'string'
      //           }
      //         },
      //         product: {
      //           id: '5b6d021dee3d0a28f417c218',
      //           name: 'FDY',
      //           code: 'FDY'
      //         }
      //       },
      //       silkCar: {
      //         id: 'string',
      //         code: 'string'
      //       },
      //       grade: {
      //         id: 'string',
      //         name: 'string',
      //         sortBy: 'string'
      //       },
      //       doffingDateTime: '1',
      //       carpoolDateTime: '1'
      //     },
      //     silks1: {
      //       id: 'string',
      //       code: 'string',
      //       doffingNum: 'string',
      //       doffingOperator: {
      //         roles: [
      //           'string'
      //         ],
      //         permissions: [
      //           'string'
      //         ],
      //         id: 'string',
      //         hrId: 'string',
      //         oaId: 'string',
      //         name: 'string',
      //         admin: true,
      //         groups: [
      //           {
      //             roles: [
      //               'string'
      //             ],
      //             permissions: [
      //               'string'
      //             ],
      //             id: 'string',
      //             name: 'string'
      //           }
      //         ]
      //       }
      //     },
      //     silkCarRecord2: {
      //       id: 'string',
      //       silkCar: {
      //         id: 'string',
      //         code: 'string'
      //       },
      //       batch: {
      //         id: 'string',
      //         batchNo: 'string',
      //         silkWeight: 0,
      //         centralValue: 0,
      //         holeNum: 0,
      //         spec: 'string',
      //         tubeColor: 'string',
      //         note: 'string',
      //         workshop: {
      //           id: 'string',
      //           code: 'string',
      //           name: 'string',
      //           note: 'string',
      //           corporation: {
      //             id: 'string',
      //             name: 'string'
      //           }
      //         },
      //         product: {
      //           id: '5b6d021dee3d0a28f417c218',
      //           name: 'FDY',
      //           code: 'FDY'
      //         }
      //       },
      //       grade: {
      //         id: 'string',
      //         name: 'string',
      //         sortBy: 'string'
      //       },
      //       doffingDateTime: '1',
      //       carpoolDateTime: '1'
      //     },
      //     silks2: [
      //       {
      //         id: 'string',
      //         code: 'string',
      //         doffingNum: 'string',
      //         doffingOperator: {
      //           roles: [
      //             'string'
      //           ],
      //           permissions: [
      //             'string'
      //           ],
      //           id: 'string',
      //           hrId: 'string',
      //           oaId: 'string',
      //           name: 'string',
      //           admin: true,
      //           groups: [
      //             {
      //               roles: [
      //                 'string'
      //               ],
      //               permissions: [
      //                 'string'
      //               ],
      //               id: 'string',
      //               name: 'string'
      //             }
      //           ]
      //         }
      //       }
      //     ],
      //     creator: {
      //       roles: [
      //         'string'
      //       ],
      //       permissions: [
      //         'string'
      //       ],
      //       id: 'string',
      //       hrId: 'string',
      //       oaId: 'string',
      //       name: 'string',
      //       admin: true,
      //       groups: [
      //         {
      //           roles: [
      //             'string'
      //           ],
      //           permissions: [
      //             'string'
      //           ],
      //           id: 'string',
      //           name: 'string'
      //         }
      //       ]
      //     },
      //     cdt: 'string',
      //     dyeingResults: []
      //   },
      //   {
      //     id: 'string',
      //     type: 'CROSS_LINEMACHINE_LINEMACHINE',
      //     silkCarRecord: {
      //       id: '1',
      //       silkCar: {
      //         id: '5b6ed118ee3d0a0926707597',
      //         createDateTime: 1533989144000,
      //         modifyDateTime: 1533989144000,
      //         type: 'DEFAULT',
      //         number: 'C34001',
      //         code: '3000C34001',
      //         row: 3,
      //         col: 4
      //       },
      //       batch: {
      //         id: 'string',
      //         batchNo: 'string',
      //         silkWeight: 0,
      //         centralValue: 0,
      //         holeNum: 0,
      //         spec: 'string',
      //         tubeColor: 'string',
      //         note: 'string',
      //         workshop: {
      //           id: 'string',
      //           code: 'string',
      //           name: 'string',
      //           note: 'string',
      //           corporation: {
      //             id: 'string',
      //             name: 'string'
      //           }
      //         },
      //         product: {
      //           id: '5b6d021dee3d0a28f417c218',
      //           name: 'FDY',
      //           code: 'FDY'
      //         }
      //       },
      //       grade: {
      //         id: 'string',
      //         name: 'string',
      //         sortBy: 'string'
      //       },
      //       doffingDateTime: 0,
      //       carpoolDateTime: 0
      //     },
      //     silks: {
      //       id: 'string',
      //       code: 'string',
      //       doffingNum: 'string',
      //       doffingOperator: {
      //         roles: [
      //           'string'
      //         ],
      //         permissions: [
      //           'string'
      //         ],
      //         id: 'string',
      //         hrId: 'string',
      //         oaId: 'string',
      //         name: 'string',
      //         admin: true,
      //         groups: [
      //           {
      //             roles: [
      //               'string'
      //             ],
      //             permissions: [
      //               'string'
      //             ],
      //             id: 'string',
      //             name: 'string'
      //           }
      //         ]
      //       }
      //     },
      //     silkDyeingSample: {
      //       id: 'string',
      //       silk: {
      //         id: 'string',
      //         code: 'string',
      //         doffingNum: 'string',
      //         doffingOperator: {
      //           roles: [
      //             'string'
      //           ],
      //           permissions: [
      //             'string'
      //           ],
      //           id: 'string',
      //           hrId: 'string',
      //           oaId: 'string',
      //           name: 'string',
      //           admin: true,
      //           groups: [
      //             {
      //               roles: [
      //                 'string'
      //               ],
      //               permissions: [
      //                 'string'
      //               ],
      //               id: 'string',
      //               name: 'string'
      //             }
      //           ]
      //         }
      //       }
      //     },
      //     silkCarRecord1: {
      //       id: 'string',
      //       batch: {
      //         id: 'string',
      //         batchNo: 'string',
      //         silkWeight: 0,
      //         centralValue: 0,
      //         holeNum: 0,
      //         spec: 'string',
      //         tubeColor: 'string',
      //         note: 'string',
      //         workshop: {
      //           id: 'string',
      //           code: 'string',
      //           name: 'string',
      //           note: 'string',
      //           corporation: {
      //             id: 'string',
      //             name: 'string'
      //           }
      //         },
      //         product: {
      //           id: '5b6d021dee3d0a28f417c218',
      //           name: 'FDY',
      //           code: 'FDY'
      //         }
      //       },
      //       silkCar: {
      //         id: 'string',
      //         code: 'string'
      //       },
      //       grade: {
      //         id: 'string',
      //         name: 'string',
      //         sortBy: 'string'
      //       },
      //       doffingDateTime: 0,
      //       carpoolDateTime: 0
      //     },
      //     silks1: {
      //       id: 'string',
      //       code: 'string',
      //       doffingNum: 'string',
      //       doffingOperator: {
      //         roles: [
      //           'string'
      //         ],
      //         permissions: [
      //           'string'
      //         ],
      //         id: 'string',
      //         hrId: 'string',
      //         oaId: 'string',
      //         name: 'string',
      //         admin: true,
      //         groups: [
      //           {
      //             roles: [
      //               'string'
      //             ],
      //             permissions: [
      //               'string'
      //             ],
      //             id: 'string',
      //             name: 'string'
      //           }
      //         ]
      //       }
      //     },
      //     silkCarRecord2: {
      //       id: 'string',
      //       silkCar: {
      //         id: 'string',
      //         code: 'string'
      //       },
      //       batch: {
      //         id: 'string',
      //         batchNo: 'string',
      //         silkWeight: 0,
      //         centralValue: 0,
      //         holeNum: 0,
      //         spec: 'string',
      //         tubeColor: 'string',
      //         note: 'string',
      //         workshop: {
      //           id: 'string',
      //           code: 'string',
      //           name: 'string',
      //           note: 'string',
      //           corporation: {
      //             id: 'string',
      //             name: 'string'
      //           }
      //         },
      //         product: {
      //           id: '5b6d021dee3d0a28f417c218',
      //           name: 'FDY',
      //           code: 'FDY'
      //         }
      //       },
      //       grade: {
      //         id: 'string',
      //         name: 'string',
      //         sortBy: 'string'
      //       },
      //       doffingDateTime: 0,
      //       carpoolDateTime: 0
      //     },
      //     silks2: [
      //       {
      //         id: 'string',
      //         code: 'string',
      //         doffingNum: 'string',
      //         doffingOperator: {
      //           roles: [
      //             'string'
      //           ],
      //           permissions: [
      //             'string'
      //           ],
      //           id: 'string',
      //           hrId: 'string',
      //           oaId: 'string',
      //           name: 'string',
      //           admin: true,
      //           groups: [
      //             {
      //               roles: [
      //                 'string'
      //               ],
      //               permissions: [
      //                 'string'
      //               ],
      //               id: 'string',
      //               name: 'string'
      //             }
      //           ]
      //         }
      //       }
      //     ],
      //     creator: {
      //       roles: [
      //         'string'
      //       ],
      //       permissions: [
      //         'string'
      //       ],
      //       id: 'string',
      //       hrId: 'string',
      //       oaId: 'string',
      //       name: 'string',
      //       admin: true,
      //       groups: [
      //         {
      //           roles: [
      //             'string'
      //           ],
      //           permissions: [
      //             'string'
      //           ],
      //           id: 'string',
      //           name: 'string'
      //         }
      //       ]
      //     },
      //     cdt: 'string',
      //     dyeingResults: []
      //   }]
    }
  },
  created () {
    this.getWorkShop()
  },
  methods: {
    search () {
      this.loading = true
      let params = {
        first: this.pageNum,
        pageSize: this.pageSize,
        codeDate: '',
        hrIdQ: this.userId,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$api.getDyeingPrepares(params).then(res => {
        this.dyeingPrepares = res.data.dyeingPrepares
        this.loading = false
      })
    },
    batchSubmit () {
      console.log('批量提交')
    },
    handleCheckAllChange (val) {
      this.isIndeterminate = false
      let arr = [...this.dyeingPrepares]
      if (val) {
        this.$store.commit('CheckedDyeingPrepares', arr)
      } else {
        this.$store.commit('CheckedDyeingPrepares', [])
      }
    },
    changeIsIndeterminate (val) {
      this.isIndeterminate = val
    },
    changeCheckAll (val) {
      this.checkAll = val
    },
    changePage (value) {
      this.pageNum = value.pageNum
      this.pageSize = value.pageSize
      this.seachTableData('seachForm')
    },
    // 获取车间
    getWorkShop () {
      this.$api.getWorkShopsLine().then(res => {
        this.workshops = res.data
        this.workshop = this.workshops[0].id
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .dyeing {
    width: 105%;
    height: 95%;
  }
</style>
