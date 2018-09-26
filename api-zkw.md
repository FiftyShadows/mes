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
    "reason": "翻包原因3"	//翻包原因
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
    "id": "2"				//翻包原因id
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
    "id": "16"			//翻包原因id
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
    "storageCode": "库位007"	//库位名称
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
    "storageCode": "库位009"	//库位名称
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
    "storageId": "5"		//库位id
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
    "batchNoIds": "1,2,3,4"		//批次号id,多个批次以","分隔
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
    "batchNoIds": "1,2,4,5"		//批次号id,多个批次以","分隔
}
返回值:
{
  "status": "200",
  "msg": "更改库位批次成功",
  "data": null,
  "token": null
}