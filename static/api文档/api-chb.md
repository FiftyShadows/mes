1.查询车间接口
post请求
http://localhost:8080/warehouseInfo/workshop/selectWorkshop

返回参数
{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "id": 1,
            "workshopCode": "A",
            "workshop": "纺丝A车间",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": 2,
            "workshopCode": "B",
            "workshop": "纺丝B车间",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": 3,
            "workshopCode": "C",
            "workshop": "纺丝C车间",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": 4,
            "workshopCode": "D",
            "workshop": "纺丝D车间",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        }
    ],
    "token": null
}

2.增加仓库接口
post请求
http://localhost:8080/warehouseInfo/warehouse/addWarehouse

请求参数
{
	"warehouseName":"仓库D",
	"warehouseType":"测试库",
	"workshop":"纺丝D车间",
	"storageCount":"9",
	"storageRow":"3",
	"storageColumn":"3",
	"lgort":"成品库",
	"userId":"1"
}
返回参数
{
    "status": "200",
    "msg": "新增仓库成功",
    "data": null,
    "token": null
}

3.查询仓库接口
post请求
http://localhost:8080/warehouseInfo/warehouse/selectWarehouse

请求参数
{
	
	"pageNum":"2",
	"pageSize":"2"
}

返回参数
{
    "status": "200",
    "msg": "查询仓库成功",
    "data": {
        "pageNum": 2,
        "pageSize": 2,
        "size": 2,
        "startRow": 3,
        "endRow": 4,
        "total": 5,
        "pages": 3,
        "list": [
            {
                "id": 13,
                "houseCode": "AA",
                "houseName": "测试仓库A",
                "houseType": "成品测试库",
                "storageCount": 9,
                "storageRow": 3,
                "storageColumn": 3,
                "lgort": "SAP测试库A",
                "remark": null,
                "isDeleted": null,
                "createTime": null,
                "modifiedTime": "2018-09-19T01:11:20.000+0000",
                "creatorId": null,
                "modifierId": null,
                "houseLocation": "纺丝A车间"
            },
            {
                "id": 14,
                "houseCode": "BB",
                "houseName": "测试仓库B",
                "houseType": "成品测试库",
                "storageCount": 9,
                "storageRow": 3,
                "storageColumn": 3,
                "lgort": "SAP测试库B",
                "remark": null,
                "isDeleted": null,
                "createTime": null,
                "modifiedTime": "2018-09-19T01:11:25.000+0000",
                "creatorId": null,
                "modifierId": null,
                "houseLocation": "纺丝B车间"
            }
        ],
        "prePage": 1,
        "nextPage": 3,
        "isFirstPage": false,
        "isLastPage": false,
        "hasPreviousPage": true,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2,
            3
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 3,
        "lastPage": 3,
        "firstPage": 1
    },
    "token": null
}

4.删除仓库接口
post请求
http://localhost:8080/warehouseInfo/warehouse/deleteWarehouse

请求参数
{
	"id":"23",
	"userId":"1"
}

返回参数
{
    "status": "200",
    "msg": "删除仓库成功",
    "data": null,
    "token": null
}

5.增加SAP库存点接口
post请求
http://localhost:8080/warehouseInfo/sapStorage/addSapStorage
请求参数
{
	"mandt":"800",
	"factoryCode":"3100",
	"lgort":"3179",
	"lgobe":"成品测试库",
	"type":"内销",
	"userId":"1"
}
返回参数
{
    "status": "200",
    "msg": "增加成功",
    "data": null,
    "token": null
}

6.删除SAP库存点接口
post请求
http://localhost:8080/warehouseInfo/sapStorage/deleteSapStorage
请求参数
{
	"id":"6",
	"userId":"1"
}
返回参数
{
    "status": "200",
    "msg": "删除成功",
    "data": null,
    "token": null
}

7.修改SAP库存点
post请求
http://localhost:8080/warehouseInfo/sapStorage/updateSapStorage

请求参数
{
	"id":"5",
	"mandt":"800",
	"factoryCode":"3100",
	"lgort":"3179",
	"lgobe":"测试库A",
	"type":"内销",
	"userId":"1"
}
返回参数
{
    "status": "200",
    "msg": "修改成功",
    "data": null,
    "token": null
}


8.查询所有SAP库存点接口
post请求
http://localhost:8080/warehouseInfo/sapStorage/selectSapStorage

请求参数
{
	
	"pageNum":"1",
	"pageSize":"2"
}
返回参数
{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "pageNum": 1,
        "pageSize": 2,
        "size": 2,
        "startRow": 1,
        "endRow": 2,
        "total": 4,
        "pages": 2,
        "list": [
            {
                "id": 2,
                "mandt": "800",
                "factoryCode": "3100",
                "lgort": "3131",
                "lgobe": "成品销售退货库",
                "type": "内销",
                "remark": null,
                "isDeleted": "N",
                "createTime": "2018-09-20T07:20:49.000+0000",
                "modifiedTime": "2018-09-20T07:24:54.000+0000",
                "creatorId": 1,
                "modifierId": null
            },
            {
                "id": 3,
                "mandt": "800",
                "factoryCode": "3100",
                "lgort": "3172",
                "lgobe": "纺丝D成品库",
                "type": "内销",
                "remark": null,
                "isDeleted": "N",
                "createTime": "2018-09-20T07:21:54.000+0000",
                "modifiedTime": "2018-09-20T07:24:58.000+0000",
                "creatorId": 1,
                "modifierId": null
            }
        ],
        "prePage": 0,
        "nextPage": 2,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 2,
        "firstPage": 1,
        "lastPage": 2
    },
    "token": null
}

新增唛头接口：http://192.168.129.97:8080/productCodeController/addBarcode
参数
{
	"salesType":"内销",   //销售类型   ---数据字典调用   传入参数:销售类型
	"batchNo":"AAM12345",   批号      
	"sapStorage":"短纤测试库",   sap库存点  ----  http://192.168.129.97:8080/warehouseInfo/sapStorage/getSapStorage接口获取
	"productTime":"2018-10-16",  入库时间
	"productName":"短纤",   产品名称	----数据字典调用 传入参数:产品名称
	"productType":"棉型",   产品类型	----数据字典调用 传入参数:选择的产品名称
	"workshop":"短纤车间",  车间     -----http://192.168.129.97:8080/warehouseInfo/workshop/selectWorkshop
	"line":"A1",           线别	-----数据字典调用  传入参数：选择的产品名称+线别
	"classes":"甲",        班次	----数据字典调用  传入参数：班次
	"level":"优等",       等级	----数据字典调用  传入参数：等级
	"packageType":"人工打包",       ----数据字典调用  传入参数：打包方式
	"netWeight":"380",      净重	
	"count":"3"         唛头数量
}

返回参数
{
    "status": "200",
    "msg": "成功",
    "data": null,
    "token": null
}




通用下拉接口 数据字典
post请求
http://localhost:8080/mes/system/dict/getDict
传入参数：
{
"key":"班次"
}

返回参数：
{
"status": "200",
"msg": "查询成功",
"data":[
{
"dictValue": "白班",
"dictKey": "bb"
},
{
"dictValue": "晚班",
"dictKey": "wb"
},
{
"dictValue": "中班",
"dictKey": "zb"
}
],
"token": null
}




查询接口：http://192.168.129.97:8080/productCodeController/selectCode
post请求
参数:
{
	"workshop":"",
	"line":"",
	"classes":"",
	"batchNo":"",
	"level":"",
	"startDate":"",
	"endDate":"",
	"page":"1",
	"pageSize":"4"
}

返回参数
{
{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "pageNum": 1,
        "pageSize": 4,
        "size": 4,
        "startRow": 1,
        "endRow": 4,
        "total": 7,
        "pages": 2,
        "list": [
            {
                "id": 107,
                "lotNumber": "010320181016AAM12345A110001",
                "sublotNumber": "AAM12345",
                "level": "优等",
                "material": null,
                "saleType": "内销",
                "yoke": null,
                "foamType": null,
                "foamNum": null,
                "netWeight": 380,
                "packageType": "人工打包",
                "silkCount": null,
                "yarnKind": null,
                "twistDirection": null,
                "productTime": "2018-10-15T16:00:00.000+0000",
                "lineName": "A1",
                "classes": "甲",
                "preStorage": null,
                "printFlag": null,
                "printCount": null,
                "lgort": "短纤测试库",
                "remark": null,
                "isDeleted": null,
                "createTime": null,
                "modifiedTime": null,
                "creatorId": null,
                "modifierId": null,
                "workshop": "短纤车间",
                "productName": "短纤",
                "productType": "棉型"
            },
            {
                "id": 108,
                "lotNumber": "010320181016AAM12345A110002",
                "sublotNumber": "AAM12345",
                "level": "优等",
                "material": null,
                "saleType": "内销",
                "yoke": null,
                "foamType": null,
                "foamNum": null,
                "netWeight": 380,
                "packageType": "人工打包",
                "silkCount": null,
                "yarnKind": null,
                "twistDirection": null,
                "productTime": "2018-10-12T16:00:00.000+0000",
                "lineName": "A1",
                "classes": "甲",
                "preStorage": null,
                "printFlag": null,
                "printCount": null,
                "lgort": "短纤测试库",
                "remark": null,
                "isDeleted": null,
                "createTime": null,
                "modifiedTime": "2018-10-17T12:56:43.000+0000",
                "creatorId": null,
                "modifierId": null,
                "workshop": "短纤车间",
                "productName": "短纤",
                "productType": "棉型"
            },
            {
                "id": 109,
                "lotNumber": "010320181016AAM12345A110003",
                "sublotNumber": "AAM12345",
                "level": "优等",
                "material": null,
                "saleType": "内销",
                "yoke": null,
                "foamType": null,
                "foamNum": null,
                "netWeight": 380,
                "packageType": "人工打包",
                "silkCount": null,
                "yarnKind": null,
                "twistDirection": null,
                "productTime": "2018-10-13T16:00:00.000+0000",
                "lineName": "A1",
                "classes": "甲",
                "preStorage": null,
                "printFlag": null,
                "printCount": null,
                "lgort": "短纤测试库",
                "remark": null,
                "isDeleted": null,
                "createTime": null,
                "modifiedTime": "2018-10-17T12:56:51.000+0000",
                "creatorId": null,
                "modifierId": null,
                "workshop": "短纤车间",
                "productName": "短纤",
                "productType": "棉型"
            },
            {
                "id": 110,
                "lotNumber": "010320181016AAM12345A110004",
                "sublotNumber": "AAM12345",
                "level": "优等",
                "material": null,
                "saleType": "内销",
                "yoke": null,
                "foamType": null,
                "foamNum": null,
                "netWeight": 380,
                "packageType": "人工打包",
                "silkCount": null,
                "yarnKind": null,
                "twistDirection": null,
                "productTime": "2018-10-11T16:00:00.000+0000",
                "lineName": "A1",
                "classes": "甲",
                "preStorage": null,
                "printFlag": null,
                "printCount": null,
                "lgort": "短纤测试库",
                "remark": null,
                "isDeleted": null,
                "createTime": null,
                "modifiedTime": "2018-10-17T12:56:57.000+0000",
                "creatorId": null,
                "modifierId": null,
                "workshop": "短纤车间",
                "productName": "短纤",
                "productType": "棉型"
            }
        ],
        "prePage": 0,
        "nextPage": 2,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 2,
        "firstPage": 1,
        "lastPage": 2
    },
    "token": null
}}




待入库和已入库接口：
http://192.168.129.78:8080//warehouseInfo/InboundRecord/getPageInroundRecordList
{
	"sublotNumber":"",
	"houseName":"",  仓库名称
	"lotNumber":"",  码单号
	"productName":"POY"，产品名
	"startTime":"",  开始时间
	"endTime":"",    结束时间
	"pageNum":1,    
	"pageSize":10,
	"synSap":"N"  待入库为N，已入库为Y
}

返回参数
{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "messageType": 1,
        "message": "查询未入库成功",
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
                    "id": null,
                    "spec": "178dtex/72f",
                    "houseName": "POY仓库",
                    "lotNumber": "020120180930GC11023C230001",
                    "productName": "POY",
                    "sublotNumber": "GC11023",
                    "saleType": "内销",
                    "level": "AA",
                    "yoke": "木架托盘",
                    "packageType": "人工打包",
                    "transDate": "2018-09-29T16:00:00.000+0000",  入库时间
                    "username": "admin"
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
        }
    },
    "token": null
}