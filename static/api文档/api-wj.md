盘点接口

1.查询待盘点数据
http://localhost:8080/mes/warehouseInfo/stocktaking/selectStocktaking
POST请求
入参：
{
  "houseName":"B车间仓库",
  "batchNo":"GB31503",
  "level":"AA",
  "classes":"乙",
  "startDate":"2018-10-01",
  "endDate":"2018-10-30"
}
返回：

{
"status": "200",
"msg": "查询成功",
"data":[
  {
  "sublotNumber": "GB31503",
  "spec": "305dtex/96f",
  "houseName": "B车间仓库",
  "storageCode": "B001",
  "level": "AA",
  "packageType": "人工打包",
  "yoke": "塑料托盘",
  "netWeight": 2880,
  "count": 4
  }
],
"token": null
}

2.盘点数据保存接口
http://localhost:8080/mes/warehouseInfo/stocktaking/addStocktaking
POST请求
入参：
{
  "houseId":37,
  "houseName":"B车间仓库",
  "batchNo":"GB31503",
  "level":"AA",
  "classes":"乙",
  "startDate":"2018-10-01",
  "endDate":"2018-10-31",
  "count":4,
  "userId":1  
}
返回：
{
"status": "200",
"msg": "盘点成功",
"data": null,
"token": null
}



1.调拨单查询
post请求
http://localhost:8080/mes/trans/outbound/selectDelivery
传入参数：
{
	"requisitionId":"00", //调拨单号
	"plateNumber"                     //车牌号  （调拨单号，车牌号二选一，也可以2个）
	"pageSize":2,
	"pageNum":6
}
返回值：
{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "pageNum": 6,
        "pageSize": 1,
        "size": 1,
        "startRow": 6,
        "endRow": 6,
        "total": 8,
        "pages": 8,
        "list": [
            {
                "id": 2684,
                "requisitionId": "0080002592",
                "requisitionType": "LF",
                "deliveryNo": null,
                "customerId": "0000300029",
                "customerName": "嘉兴市富春贸易有限公司",
                "outboundDate": "2017-10-30T16:00:00.000+0000",
                "plateNumber": "",
                "isInnersale": null,
                "status": "已调拨",
                "deliveryPerson": null,
                "remark": null,
                "isDeleted": "N",
                "createTime": "2018-11-06T00:19:36.000+0000",
                "modifiedTime": null,
                "creatorId": null,
                "modifierId": null,
                "loading_spot": "3002"
            }
        ],
        "prePage": 5,
        "nextPage": 7,
        "isFirstPage": false,
        "isLastPage": false,
        "hasPreviousPage": true,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 8,
        "lastPage": 8,
        "firstPage": 1
    },
    "token": null
}

2.调拨单明细

post请求
http://localhost:8080/mes/trans/outbound/selectDeliveryDetail
传入参数：
{
	{
	"requisitionId":"0080002594", //调拨单号
	"pageSize":"4",
	"pageNum":"1"
	}
}
返回值：
{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "pageNum": 1,
        "pageSize": 4,
        "size": 4,
        "startRow": 1,
        "endRow": 4,
        "total": 4,
        "pages": 1,
        "list": [
            {
                "requisitionId": "0080002594",
                "batchNo": "GB31503",
                "special": "305dtex/96f",
                "level": "AA",
                "material": "000000001000311850",
                "deliveryWeight": 0,
                "actualWeight": 0
            },
            {
                "requisitionId": "0080002594",
                "batchNo": "GB31503",
                "special": "305dtex/96f",
                "level": "AA",
                "material": "000000001000311850",
                "deliveryWeight": 720,
                "actualWeight": 0
            },
            {
                "requisitionId": "0080002594",
                "batchNo": "GB31503",
                "special": "305dtex/96f",
                "level": "AA",
                "material": "000000001000311850",
                "deliveryWeight": 720,
                "actualWeight": 0
            },
            {
                "requisitionId": "0080002594",
                "batchNo": "GB31503",
                "special": "305dtex/96f",
                "level": "AA",
                "material": "000000001000311850",
                "deliveryWeight": 720,
                "actualWeight": 0
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
