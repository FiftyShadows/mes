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