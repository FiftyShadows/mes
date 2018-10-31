接口文档v1.0 
	by zkw 
	2018-09-19 10:04
##翻包维护##
1.翻包原因查询(分页)
请求类型:post
请求地址:/mes/warehouseInfo/turnoverPackage/getReasonList
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10"		//每页显示条数
}
返回值:
{
  "status": "200",
  "msg": "查询翻包原因成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 3,
    "startRow": 1,
    "endRow": 3,
    "total": 3,
    "pages": 1,
    "list": [
      {
        
        "id": 1,
        "reason": "原因1",
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      },
      {
        "id": 2,
        "reason": "降等",
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      },
      {
        "id": 15,
        "reason": "破包",
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "lastPage": 1,
    "firstPage": 1
  },
  "token": null
}

2.增加翻包原因
请求类型:post
请求地址:/mes/warehouseInfo/turnoverPackage/addReason
传入参数:
{
    "reason": "翻包原因3",	//翻包原因
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "增加翻包原因成功",
  "data": "",
  "token": null
}

3.更新翻包原因
请求类型:post
请求地址:/mes/warehouseInfo/turnoverPackage/updateReason
传入参数:
{
    "reason": "降等",		//翻包原因
    "id": "2"	,			//翻包原因id
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "更改翻包原因成功",
  "data": "",
  "token": null
}

4.删除翻包原因
请求类型:post
请求地址:/mes/warehouseInfo/turnoverPackage/deleteReason
传入参数:
{
    "id": "16",			//翻包原因id
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "删除翻包原因成功",
  "data": "",
  "token": null
}

5.查询单个翻包原因
请求类型:post
请求地址:/mes/warehouseInfo/turnoverPackage/selectReason
传入参数:
{
    "id": "15"			//翻包原因id
}
返回值:
{
  "status": "200",
  "msg": "查询单个翻包原因成功",
  "data": {
    "id": 15,
    "reason": "破包",
    "remark": null,
    "isDeleted": null,
    "createTime": null,
    "modifiedTime": null,
    "creatorId": null,
    "modifierId": null
  },
  "token": null
}

##物料维护##
6.查询物料(包含模糊查询)
请求类型:post
请求地址:/mes/warehouseInfo/material/getMaterialList
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10",		//每页显示条数
    "batchNo": "207030",	//批次号,非必输项
    "material": "0"			//物料号,非必输项
}
返回值:
{
  "status": "200",
  "msg": "查询物料成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 2,
    "startRow": 1,
    "endRow": 2,
    "total": 2,
    "pages": 1,
    "list": [
      {
        "id": 1505,
        "factoryId": "3100",
        "productName": "POY",
        "batchno": "207030",
        "spec": "104dtex/36f",
        "level": "B",
        "material": "000000001000101120",
        "materialtext": "POY-104dtex/36f-207030-B",
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      },
      {
        "id": 1511,
        "factoryId": "3100",
        "productName": "POY",
        "batchno": "207030",
        "spec": "104dtex/36f",
        "level": "B",
        "material": "000000001000101120",
        "materialtext": "POY-104dtex/36f-207030-B",
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "lastPage": 1,
    "firstPage": 1
  },
  "token": null
}

7.同步物料
请求类型:post
请求地址:/mes/warehouseInfo/material/synMaterial
传入参数:无
返回值:
{
  "status": "200",
  "msg": "同步物料成功",
  "data": null,
  "token": null
}

##库位维护##
8.增加库位
请求类型:post
请求地址:/mes/warehouseInfo/storage/addStorage
传入参数:
{
    "houseId": "11",			//仓库id
    "storageCode": "库位007",	//库位名称
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "添加库位成功",
  "data": null,
  "token": null
}

9.修改库位
请求类型:post
请求地址:/mes/warehouseInfo/storage/updateStorage
传入参数:
{
    "storageId": "1",			//库位id
    "storageCode": "库位009",	//库位名称
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "修改库位成功",
  "data": null,
  "token": null
}

10.查询单个库位
请求类型:post
请求地址:/mes/warehouseInfo/storage/selectStorage
传入参数:
{
    "storageId": "2",			//库位id
}
返回值:
{
  "status": "200",
  "msg": "查询单个库位成功",
  "data": {
    "id": 2,
    "storageCode": "AM101",
    "houseId": 12,
    "storageStatus": null,
    "storageType": null,
    "productType": null,
    "remark": null,
    "isDeleted": null,
    "createTime": null,
    "modifiedTime": null,
    "creatorId": null,
    "modifierId": null
  },
  "token": null
}

11.查询库位
请求类型:post
请求地址:/mes/warehouseInfo/storage/getStorageList
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10",		//每页显示条数
    "houseId": "11"			//仓库id,非必输项
}
返回值:
{
  "status": "200",
  "msg": "查询库位成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 2,
    "startRow": 1,
    "endRow": 2,
    "total": 2,
    "pages": 1,
    "list": [
      {
        "id": 3,
        "storageCode": "库位000",
        "houseId": 11,
        "storageStatus": null,
        "storageType": null,
        "productType": null,
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      },
      {
        "id": 4,
        "storageCode": "库位007",
        "houseId": 11,
        "storageStatus": null,
        "storageType": null,
        "productType": null,
        "remark": null,
        "isDeleted": null,
        "createTime": null,
        "modifiedTime": null,
        "creatorId": null,
        "modifierId": null
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "lastPage": 1,
    "firstPage": 1
  },
  "token": null
}

12.删除库位
请求类型:post
请求地址:/mes/warehouseInfo/storage/deleteStorage
传入参数:
{
    "storageId": "5",		//库位id
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "删除库位成功",
  "data": null,
  "token": null
}

13.查询所有批次
请求类型:post
请求地址:/mes/warehouseInfo/storage/getBatchList
传入参数:无
返回值:
{
  "status": "200",
  "msg": "查询所有批次成功",
  "data": [
    {
      "id": 1,
      "workshop": "纺丝C车间",
      "batchNo": "GC071001",
      "spec": "185dtex/144f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "红色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 2,
      "workshop": "纺丝C车间",
      "batchNo": "GC021502",
      "spec": "275dtex/96ff",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "蓝色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 3,
      "workshop": "纺丝D车间",
      "batchNo": "GD30705S",
      "spec": "83dtex/48f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "红色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 4,
      "workshop": "纺丝C车间",
      "batchNo": "GC70706",
      "spec": "140dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黑色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 6,
      "workshop": "纺丝A车间",
      "batchNo": "GA92083",
      "spec": "350dtex/96f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "紫色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 7,
      "workshop": "纺丝B车间",
      "batchNo": "GB12582",
      "spec": "430dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "紫色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 8,
      "workshop": "纺丝C车间",
      "batchNo": "GC61005",
      "spec": "180dtex/96f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "紫色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 9,
      "workshop": "纺丝A车间",
      "batchNo": "GA62081",
      "spec": "212dtex/48f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 10,
      "workshop": "纺丝C车间",
      "batchNo": "GC61206",
      "spec": "218dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 11,
      "workshop": "纺丝D车间",
      "batchNo": "GD71021S",
      "spec": "102dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 12,
      "workshop": "纺丝C车间",
      "batchNo": "GC50708",
      "spec": "152dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 13,
      "workshop": "纺丝C车间",
      "batchNo": "GC11023",
      "spec": "178dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 14,
      "workshop": "纺丝C车间",
      "batchNo": "GC11521",
      "spec": "270DTEX/48F",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 15,
      "workshop": "纺丝C车间",
      "batchNo": "GC20721",
      "spec": "137DTEX/36F",
      "centerValue": "172",
      "holeCount": "23",
      "tubeColor": "黄色",
      "delayDays": null,
      "remark": "高沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    }
  ],
  "token": null
}

14.增加库位批次
请求类型:post
请求地址:/mes/warehouseInfo/storage/addStorageBatchNo
传入参数:
{
    "storageId": "2",			//库位id
    "batchNoIds": [				//批次号id,数组格式
        "1",
        "2",
        "3",
        "6"
    ],
    "userId": "1"				//用户编号
}
返回值:
{
  "status": "200",
  "msg": "增加库位批次成功",
  "data": null,
  "token": null
}

15.查询库位批次
请求类型:post
请求地址:/mes/warehouseInfo/storage/selectStorageBatchNo
传入参数:
{
    "storageId": "2"			//库位id
}
返回值:
{
  "status": "200",
  "msg": "查询库位批次成功",
  "data": [
    {
      "id": 1,
      "workshop": "纺丝C车间",
      "batchNo": "GC071001",
      "spec": "185dtex/144f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "红色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 2,
      "workshop": "纺丝C车间",
      "batchNo": "GC021502",
      "spec": "275dtex/96ff",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "蓝色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 4,
      "workshop": "纺丝C车间",
      "batchNo": "GC70706",
      "spec": "140dtex/72f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "黑色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 6,
      "workshop": "纺丝A车间",
      "batchNo": "GA92083",
      "spec": "350dtex/96f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "紫色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    },
    {
      "id": 3,
      "workshop": "纺丝D车间",
      "batchNo": "GD30705S",
      "spec": "83dtex/48f",
      "centerValue": "170",
      "holeCount": "23",
      "tubeColor": "红色",
      "delayDays": null,
      "remark": "低沸水",
      "isDeleted": null,
      "createTime": null,
      "modifiedTime": null,
      "creatorId": null,
      "modifierId": null
    }
  ],
  "token": null
}

16.更改库位批次
请求类型:post
请求地址:/mes/warehouseInfo/storage/updateStorageBatchNo
传入参数:
{
    "storageId": "2",			//库位id
    "batchNoIds": "1,2,4,5"	,	//批次号id,多个批次以","分隔
	"userId":"1" //用户编号
}
返回值:
{
  "status": "200",
  "msg": "更改库位批次成功",
  "data": null,
  "token": null
}


##########
库位模块新增接口:
2018.09.26
	by zkw

17.查询仓库库位信息(分页)
请求类型:post
请求地址:/mes/warehouseInfo/storage/getWarehouseStorageList
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10"		//每页显示条数
}
返回值:
{
  "status": "200",
  "msg": "查询仓库对应库位成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 4,
    "startRow": 1,
    "endRow": 4,
    "total": 4,
    "pages": 1,
    "list": [
      {
        "warehouseId": 20,
        "warehouseName": "仓库A",
        "storageId": 1,
        "storageCode": "库位009"
      },
      {
        "warehouseId": 20,
        "warehouseName": "仓库A",
        "storageId": 2,
        "storageCode": "AM101"
      },
      {
        "warehouseId": 21,
        "warehouseName": "仓库B",
        "storageId": 3,
        "storageCode": "库位000"
      },
      {
        "warehouseId": 22,
        "warehouseName": "仓库C",
        "storageId": 4,
        "storageCode": "库位007"
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "firstPage": 1,
    "lastPage": 1
  },
  "token": null
}

18.查询仓库列表(不分页)
请求类型:post
请求地址:/mes/warehouseInfo/storage/selectWarehouseList
传入参数:无
返回值:
{
  "status": "200",
  "msg": "查询仓库列表成功",
  "data": [
    {
      "id": 20,
      "houseCode": null,
      "houseName": "仓库A",
      "houseType": "测试库",
      "storageCount": 9,
      "storageRow": 3,
      "storageColumn": 3,
      "lgort": "测试库",
      "remark": null,
      "isDeleted": "N",
      "createTime": "2018-09-20T08:04:25.000+0000",
      "modifiedTime": "2018-09-26T06:58:36.000+0000",
      "creatorId": 1,
      "modifierId": 1,
      "houseLocation": "纺丝A车间"
    },
    {
      "id": 21,
      "houseCode": null,
      "houseName": "仓库B",
      "houseType": "测试库",
      "storageCount": 9,
      "storageRow": 3,
      "storageColumn": 3,
      "lgort": "测试库",
      "remark": null,
      "isDeleted": "N",
      "createTime": "2018-09-20T08:04:45.000+0000",
      "modifiedTime": "2018-09-26T06:58:44.000+0000",
      "creatorId": 1,
      "modifierId": 1,
      "houseLocation": "纺丝B车间"
    },
    {
      "id": 22,
      "houseCode": null,
      "houseName": "仓库C",
      "houseType": "测试库",
      "storageCount": 9,
      "storageRow": 3,
      "storageColumn": 3,
      "lgort": "成品库",
      "remark": null,
      "isDeleted": "N",
      "createTime": "2018-09-20T08:05:39.000+0000",
      "modifiedTime": "2018-09-26T06:58:45.000+0000",
      "creatorId": 1,
      "modifierId": 1,
      "houseLocation": "纺丝C车间"
    },
    {
      "id": 23,
      "houseCode": null,
      "houseName": "仓库D",
      "houseType": "测试库",
      "storageCount": 9,
      "storageRow": 3,
      "storageColumn": 3,
      "lgort": "成品库",
      "remark": null,
      "isDeleted": "N",
      "createTime": "2018-09-20T08:05:46.000+0000",
      "modifiedTime": "2018-09-26T06:58:47.000+0000",
      "creatorId": 1,
      "modifierId": 1,
      "houseLocation": "纺丝D车间"
    },
    {
      "id": 25,
      "houseCode": null,
      "houseName": "仓一南马路",
      "houseType": "ABC",
      "storageCount": 9,
      "storageRow": 3,
      "storageColumn": 3,
      "lgort": "纺丝D成品库",
      "remark": null,
      "isDeleted": "N",
      "createTime": "2018-09-26T06:58:47.000+0000",
      "modifiedTime": "2018-09-26T07:42:44.000+0000",
      "creatorId": 1,
      "modifierId": 1,
      "houseLocation": "纺丝D车间"
    },
    {
      "id": 26,
      "houseCode": null,
      "houseName": "cheshi",
      "houseType": "固定库",
      "storageCount": 1,
      "storageRow": 1,
      "storageColumn": 1,
      "lgort": "成品销售退货库cheshi,纺丝D成品库",
      "remark": null,
      "isDeleted": "N",
      "createTime": "2018-09-26T07:46:39.000+0000",
      "modifiedTime": "2018-09-26T08:34:29.000+0000",
      "creatorId": 1,
      "modifierId": 1,
      "houseLocation": "纺丝A车间"
    }
  ],
  "token": null
}

#############
库位模块新增接口:
2018.09.27
	by zkw

19.查询库位计划信息(前端展示,分页)
请求类型:post
请求地址:/mes/warehouseInfo/storage/getWarehouseStoragePlanList
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10"		//每页显示条数
}
返回值:
{
  "status": "200",
  "msg": "查询库位计划信息成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 5,
    "startRow": 1,
    "endRow": 5,
    "total": 5,
    "pages": 1,
    "list": [
      {
        "warehouseId": 20,
        "warehouseName": "仓库A",
        "storageId": 1,
        "storageCode": "库位009",
        "storageStatus": null,
        "planBatchNoList": [],
        "produceType": null
      },
      {
        "warehouseId": 20,
        "warehouseName": "仓库A",
        "storageId": 2,
        "storageCode": "AM101",
        "storageStatus": null,
        "planBatchNoList": [
          "GC071001",
          "GC021502",
          "GC70706"
        ],
        "produceType": null
      },
      {
        "warehouseId": 21,
        "warehouseName": "仓库B",
        "storageId": 3,
        "storageCode": "库位000",
        "storageStatus": null,
        "planBatchNoList": [],
        "produceType": null
      },
      {
        "warehouseId": 22,
        "warehouseName": "仓库C",
        "storageId": 4,
        "storageCode": "库位007",
        "storageStatus": null,
        "planBatchNoList": [],
        "produceType": null
      },
      {
        "warehouseId": 23,
        "warehouseName": "仓库D",
        "storageId": 8,
        "storageCode": "CC",
        "storageStatus": null,
        "planBatchNoList": [],
        "produceType": null
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "firstPage": 1,
    "lastPage": 1
  },
  "token": null
}

20.查询关联仓库的库位(不分页)
请求类型:post
请求地址:/mes/warehouseInfo/storage/selectStorageList
传入参数:
{
    "houseId": "20"		//仓库id
}
返回值:
{
  "status": "200",
  "msg": "查询关联库位成功",
  "data": [
    {
      "id": 1,
      "storageCode": "库位009",
      "houseId": 20,
      "storageStatus": "使用中",
      "storageType": "内销",
      "productType": null,
      "remark": null,
      "isDeleted": "N",
      "createTime": null,
      "modifiedTime": "2018-09-27T04:20:32.000+0000",
      "creatorId": null,
      "modifierId": 1
    },
    {
      "id": 2,
      "storageCode": "AM101",
      "houseId": 20,
      "storageStatus": "使用中",
      "storageType": "内销",
      "productType": null,
      "remark": null,
      "isDeleted": "N",
      "createTime": null,
      "modifiedTime": "2018-09-27T04:20:32.000+0000",
      "creatorId": null,
      "modifierId": null
    }
  ],
  "token": null
}


##盘点维护##
新增接口
2018.09.29
	by zkw

21.查询盘点记录(前端展示,分页)
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/getStocktakingRecord
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10",		//每页显示条数
	 "houseId":""	,		//可选,模糊查询条件:仓库id
     "batchNo":"",			//可选,模糊查询条件:批号
     "username":"",			//可选,模糊查询条件:用户名,即盘点人
     "startDate":""	,		//可选,模糊查询条件:开始日期,格式参照之前的页面
     "endDate":""			//可选,模糊查询条件:结束日期,格式参照之前的页面
}
返回值:
{
  "status": "200",
  "msg": "获取盘点记录成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 4,
    "startRow": 1,
    "endRow": 4,
    "total": 4,
    "pages": 1,
    "list": [
      {
        "stocktakingRecordId": 1,
        "warehouseName": "仓库A",
        "storageCode": "库位009",
        "batchNo": "GC021502",
        "level": "AA",
        "createTime": "2018-09-28T06:06:19.000+0000",
        "username": "管理员",
        "totalQuantity": 2,
        "totalWeight": 760
      },
      {
        "stocktakingRecordId": 2,
        "warehouseName": "仓库A",
        "storageCode": "库位009",
        "batchNo": "GC021502",
        "level": "A",
        "createTime": "2018-09-28T06:06:19.000+0000",
        "username": "管理员",
        "totalQuantity": 2,
        "totalWeight": 760
      },
      {
        "stocktakingRecordId": 3,
        "warehouseName": "仓库A",
        "storageCode": "库位009",
        "batchNo": "GC021502",
        "level": "B",
        "createTime": "2018-09-28T06:06:19.000+0000",
        "username": "管理员",
        "totalQuantity": 2,
        "totalWeight": 760
      },
      {
        "stocktakingRecordId": 4,
        "warehouseName": "仓库A",
        "storageCode": "库位009",
        "batchNo": "GC021502",
        "level": "C",
        "createTime": "2018-09-28T06:06:19.000+0000",
        "username": "管理员",
        "totalQuantity": 2,
        "totalWeight": 760
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "firstPage": 1,
    "lastPage": 1
  },
  "token": null
}

22.查询盘点码单明细(前端展示,分页)
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/getStocktakingDetail
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10",		//每页显示条数
	"stocktakingRecordId": "1",		//翻包记录id
    "lotNumber": "wqdqd111"			//可选,模糊查询条件:箱包码单号
}
返回值:
{
  "status": "200",
  "msg": "获取盘点明细成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 1,
    "startRow": 1,
    "endRow": 1,
    "total": 1,
    "pages": 1,
    "list": [
      {
        "lotNumber": "wqdqd111",
        "createTime": "2018-09-26T01:52:26.000+0000",
        "username": "管理员"
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "firstPage": 1,
    "lastPage": 1
  },
  "token": null
}

##盘点维护##
新增接口
2018.10.09
	by zkw

23.查询盘点信息(显示待入库)(前端展示,分页)
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectStocktakingInfo
传入参数:
{
    "pageNum": "1",			//当前页数
    "pageSize": "10",		//每页显示条数
    "houseId": "20",		//仓库id
    "batchNo": "",			//批次,可选
    "level": "",			//等级,可选
    "classes": "",			//班次,可选
    "startDate": "2018-09-14 15:39:18",		//入库开始时间
    "endDate": "2018-09-30 15:39:18"		//入库截止时间
}
返回值:
{
  "status": "200",
  "msg": "获取盘点信息成功",
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "size": 3,
    "startRow": 1,
    "endRow": 3,
    "total": 3,
    "pages": 1,
    "list": [
      {
        "batchNo": "GC071001",
        "spec": "185dtex/144f",
        "warehouseId": null,
        "warehouseName": "仓库A",
        "storageId": null,
        "storageCode": "AM101",
        "packageType": "人工打包",
        "yoke": "塑托",
        "classes": "甲",
        "level": "AA",
        "singleWeight": null,
        "totalWeight": 760,
        "totalQuantity": 2,
        "lotNumberList": null
      },
      {
        "batchNo": "GC071001",
        "spec": "185dtex/144f",
        "warehouseId": null,
        "warehouseName": "仓库A",
        "storageId": null,
        "storageCode": "AM101",
        "packageType": "自动打包",
        "yoke": "塑托",
        "classes": "甲",
        "level": "AA",
        "singleWeight": null,
        "totalWeight": 380,
        "totalQuantity": 1,
        "lotNumberList": null
      },
      {
        "batchNo": "GC071001",
        "spec": "185dtex/144f",
        "warehouseId": null,
        "warehouseName": "仓库A",
        "storageId": null,
        "storageCode": "AM101",
        "packageType": "自动打包",
        "yoke": "木架",
        "classes": "甲",
        "level": "AA",
        "singleWeight": null,
        "totalWeight": 1140,
        "totalQuantity": 3,
        "lotNumberList": null
      }
    ],
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1,
    "firstPage": 1,
    "lastPage": 1
  },
  "token": null
}