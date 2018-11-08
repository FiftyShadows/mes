盘点接口

1.登录接口
post请求
http://localhost:8080/system/login
传入参数：
{
  "loginname":"fhy",
  "password":"123456"
}
返回值：
{
    "status": "200",
    "msg": "登录成功",
    "data":{
    "menu":[
        {"id": 10, "menuName": "调拨出库", "url": null, "remark": null, "isDeleted": null,…},
        {"id": 11, "menuName": "翻包", "url": null, "remark": null, "isDeleted": null,…},
        {"id": 12, "menuName": "库存明细", "url": null, "remark": null, "isDeleted": null,…}
    ],
    "userId": 25
    },
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5neWkiLCJmaHkiOiJwYXNzd29yZCIsImlhdCI6MTUzNjgyOTM4Nn0.ZyAzVRsOilZxc-gQ__jZmv6Mn0rOrfuDYBvbcG_9TVs"
}



2.角色下拉接口
post请求
http://localhost:8080/mes/system/role/selectRole
传入参数：无需参数
返回值：
{
    "status": "200",
    "msg": "查询成功",
    "data":[
        {
        "roleId": 1,
        "roleName": "管理员"
        },
        {
        "roleId": 2,
        "roleName": "包装工"
        },
        {
        "roleId": 3,
        "roleName": "开票员"
        },
        {
        "roleId": 4,
        "roleName": "计量员"
        },
        {
        "roleId": 5,
        "roleName": "发货员"
        }
    ],
    "token": null
}



3.新增用户接口
post请求
http://localhost:8080/mes/system/user/addUser
传入参数：
{
  "loginname":"jlya",
  "password":"123456",
  "name":"计量员A",
  "roleId":4,
  "remark":"我是备注",
  "class":"白班",
  "status":"我是状态",
  "type":"我是类型",
  "userId":"1"
}

返回参数：
{
"status": "200",
"msg": "用户新增成功！",
"data": null,
"token": null
}

4.删除用户接口
post请求
http://localhost:8080/mes/system/user/deleteUser
传入参数：
{
  "id":20,
  "userId":1
}

返回参数：
{
"status": "200",
"msg": "删除成功",
"data": null,
"token": null
}

5.更新用户接口
post请求
http://localhost:8080/mes/system/user/updateUser
传入参数：
{
  "id":"16",
  "loginname":"jlya11",
  "password":"12345116",
  "name":"计量员A11",
  "roleId":4,
  "remark":"我11是备注11",
  "class":"白班1",
  "status":"我是状11态",
  "type":"我是11类型",
  "userId":1
}

返回参数：
{
"status": "200",
"msg": "更新成功",
"data": null,
"token": null
}

6.查询用户接口
post请求
http://localhost:8080/mes/system/user/selectUser
传入参数：
都是查询条件，都是可添可不填
{
    "name":"A",
    "loginname":"",
    "type":"2"
}

返回参数：
{
"status": "200",
"msg": "查询成功",
"data":[
    {
        "id": 2,
        "loginname": "bzg",
        "password": "123456",
        "name": "包装工A",
        "status": null,
        "type": "2",
        "classes": null,
        "roleId": 2,
        "remark": null,
        "isDeleted": "N",
        "createTime": null,
        "modifiedTime": "2018-09-13T08:49:34.000+0000",
        "creatorId": null,
        "modifierId": 24
    },
    {
        "id": 12,
        "loginname": "kpy",
        "password": "123456",
        "name": "开票员A",
        "status": null,
        "type": "2",
        "classes": "白班",
        "roleId": 3,
        "remark": "呵呵哒",
        "isDeleted": "N",
        "createTime": null,
        "modifiedTime": "2018-09-13T08:49:36.000+0000",
        "creatorId": null,
        "modifierId": 1
    }
    ],
    "token": null
}

7.重置用户密码接口
post请求
http://localhost:8080/mes/system/user/resetPassword
传入参数：
{
    "id":24,
    "userId":2
}

返回参数：
{
    "status": "200",
    "msg": "密码重置成功",
    "data": null,
    "token": null
}

8.更新密码接口
post请求
http://localhost:8080/mes/system/user/updatePassword
传入参数：
{
    "oldPassword":"123456",
    "newPassword":"234567w",
    "userId":24
}

返回参数：
{
    "status": "200",
    "msg": "密码更新成功",
    "data": null,
    "token": null
}

9.通用下拉接口

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


10.扫码入库接口
post请求
http://localhost:8080/mes/trans/inbound/addInbound
传入参数：
{
  "pre_storage":"AM101",
  "lot_number1":"020220181009GD71217SD330007",
  "lot_number2":"020220181009GD71217SD330008",
  "userId":1,
  "classes":"早班"
}

注：1.码单号2的选填项，可以为空
    2.码单号必须是excel种的数据
	3.码单号对应的批次的预设库位必须和参数中的库位一直才允许入库

返回值：
{
"status": "200",
"msg": "入库成功",
"data": null,
"token": null
}





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
