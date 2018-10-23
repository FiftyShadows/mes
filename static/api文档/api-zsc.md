接口文档v1.0 
	by ZhangSuchao
	2018-09-30 
	
	##待入库接口文档##
1.查询所有“车间”
	说明：点击“出入库记录”，默认发送该请求，返回值参数绑定到“待入库记录”下的“请选择仓库”
请求类型:post
请求地址:/warehouseInfo/InboundRecord/getHouseNameList
传入参数: 
	{
		
	}
返回值:
	{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "id": null,
            "houseName": "仓库A",     //仓库
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "id": null,
            "houseName": "仓库B",
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "id": null,
            "houseName": "仓库C",
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "id": null,
            "houseName": "仓库D",
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "id": null,
            "houseName": "仓一南马路",
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "id": null,
            "houseName": "cheshi",
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        }
    ],
    "token": null
}

2.查询所有“批号”
	说明：点击“批号”下拉列表，异步请求“所有批号” 
			参数不再传
	请求类型:post
请求地址:/warehouseInfo/InboundRecord/selectOublotNumberList
传入参数: 
	{	
	 
	}
返回值:
{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC071001",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC021502",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD30705S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC70706",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GA92083",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GB12582",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61005",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GA62081",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61206",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71021S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC50708",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC11023",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC11521",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71217S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61004",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD30515",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC20721",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC20726",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC21524",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD41211",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC70707",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10503",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10504",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10502",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71020S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC011201",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC71005",
            "level": null,
            "classes": null
        }
    ],
    "token": null
}


3.查询所有“品名”
	说明：点击“批号”下拉列表，异步请求“所有批号”
		#参数不再传#
请求类型:post
请求地址:/warehouseInfo/InboundRecord/selectProductNameList
传入参数: 
	{	
	
	
	
	}
返回值:
{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "productName": "POY",
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": "FDY",
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": "切片",
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": "短纤",
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        }
    ],
    "token": null
}

4.查询所有“待入库记录” (分页)
	
请求类型:post
请求地址:/warehouseInfo/InboundRecord/getPageInroundRecordList
传入参数:
{
	"pageNum":1,				//当前页：int			必填
	"pageSize":10,				//每页显示数量：int		必填
	“houseName”:null,			//仓库 	 	String		(可以不传)
	"sublotNumber":“批次222”,	//批次		String		(可以不传)
	"productName":null,			//成品名称	String		(可以不传)
	"lotNumber":null,			//码单号	String		(可以不传)
	"startTime":null,			//开始时间	String		(可以不传)
	"endTime":null				//结束时间	String		(可以不传)
	
}
返回值：
{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "messageType": 1,
        "message": "查询未入库成功",
        "data": {
            "pageNum": 1,
            "pageSize": 100,
            "size": 50,
            "startRow": 1,
            "endRow": 50,
            "total": 50,
            "pages": 1,
            "list": [
                {
                    "id": 2,
                    "houseName": "仓库A",
                    "transOperator": "操作员2",
                    "lotNumber": "0002",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 2,
                    "houseName": "仓库A",
                    "transOperator": "操作员2",
                    "lotNumber": "0002",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 3,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "0003",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 3,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "0003",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 4,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "0004",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑托",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 4,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "0004",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑托",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 8,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0008",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑托",
                    "packageType": "人工打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 8,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0008",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑托",
                    "packageType": "人工打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 10,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0003",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 10,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0003",
                    "productName": "POY",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "AA",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 6,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0006",
                    "productName": "切片",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "合格",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 6,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0006",
                    "productName": "切片",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "合格",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 7,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0007",
                    "productName": "切片",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "合格",
                    "yoke": "塑托",
                    "packageType": "人工打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 7,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0007",
                    "productName": "切片",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "合格",
                    "yoke": "塑托",
                    "packageType": "人工打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 9,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0009",
                    "productName": "切片",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "合格",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 9,
                    "houseName": "仓库A",
                    "transOperator": "",
                    "lotNumber": "0009",
                    "productName": "切片",
                    "sublotNumber": "GC071001",
                    "productType": null,
                    "level": "合格",
                    "yoke": "木架",
                    "packageType": "自动打包",
                    "productTime": "2018-09-30T01:12:20.000+0000",
                    "type": "内销"
                },
                {
                    "id": 45,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330005",
                    "productName": "切片",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "合格",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 45,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330005",
                    "productName": "切片",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "合格",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 51,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330007",
                    "productName": "切片",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "合格",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 51,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330007",
                    "productName": "切片",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "合格",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 58,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 58,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 59,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 59,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 60,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 60,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 61,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 61,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 62,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 62,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 63,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 63,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 64,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 64,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 65,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 65,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 66,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "外贸"
                },
                {
                    "id": 66,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "wqdqd111",
                    "productName": "切片",
                    "sublotNumber": "批次111",
                    "productType": null,
                    "level": "合格",
                    "yoke": "托盘类型111",
                    "packageType": "打包类型111",
                    "productTime": null,
                    "type": "内销"
                },
                {
                    "id": 46,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330006",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 46,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330006",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 47,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330005",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 47,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330005",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 48,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330006",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 48,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330006",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 49,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330007",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 49,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330007",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 50,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330008",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 50,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330008",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
                },
                {
                    "id": 52,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330008",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "外贸"
                },
                {
                    "id": 52,
                    "houseName": "仓库A",
                    "transOperator": null,
                    "lotNumber": "020220181009GD71217SD330008",
                    "productName": "FDY",
                    "sublotNumber": "GD71217S",
                    "productType": null,
                    "level": "AA",
                    "yoke": "塑料托盘",
                    "packageType": "人工打包",
                    "productTime": "2018-10-08T16:00:00.000+0000",
                    "type": "内销"
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
        }
    },
    "token": null
}


	
接口文档v1.0 
	by ZhangSuchao
	2018-10-8
	
	##入库接口文档##
1.查询所有仓库
	说明：点击“入库记录”，默认加载“仓库”
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/getHouseNameList
传入参数: 
	{
		
}
返回值:
	{
    "status": "200",
    "msg": "查询仓库成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库A",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库B",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库C",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库D",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓一南马路",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "cheshi",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null
        }
    ],
    "token": null
}
	
	
2.查询所有“产品名称”

请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectProductList
传入参数: 
	{
		
}
返回值:
	{
    "status": "200",
    "msg": "查询商品名称成功",
    "data": [
        {
            "id": null,
            "productCode": null,
            "productName": "POY",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "productCode": null,
            "productName": "FDY",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "productCode": null,
            "productName": "切片",
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "productCode": null,
            "productName": "短纤",
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


3.查询所有“批号”
	
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectBatchNoList
传入参数: 
	{
		
}
返回值:
	{
    "status": "200",
    "msg": "查询批号成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC071001",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC021502",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD30705S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC70706",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GA92083",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GB12582",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61005",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GA62081",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61206",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71021S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC50708",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC11023",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC11521",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71217S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61004",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD30515",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC20721",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC20726",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC21524",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD41211",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC70707",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10503",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10504",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10502",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71020S",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC011201",
            "level": null,
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC71005",
            "level": null,
            "classes": null
        }
    ],
    "token": null
}


4.查询所有“班次”
请求类型:post
请求地址:warehouseInfo/InStorageRecord/selectClassesList
传入参数: 
	{
		
	}
返回值:	
	{
    "status": "200",
    "msg": "查询班次成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": "白班"
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": "晚班"
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": "中班"
        }
    ],
    "token": null
}
5.查询所有“等级”
	
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectLevelList
传入参数: 
	{
		
	}
返回值:
	{
    "status": "200",
    "msg": "查询等级成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": "A",
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": "B",
            "classes": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": "C",
            "classes": null
        }
    ],
    "token": null
}

6.分页查询所有“入库记录”
请求类型:post
请求地址:warehouseInfo/InStorageRecord/getPageInStorageRecordList
传入参数: 
	{
		"pageNum":1,				//当前页：		int			必填
		"pageSize":10,				//每页显示数量：int			必填
		“houseName”:null,			//仓库 	 		String		(可以不传)
		"productName":null,			//产品名称		String		(可以不传)
		"batchNo":null,				//批次			String		(可以不传)
		"classes":null,				//班次			String		(可以不传)
		“level”:null,				//等级			String 		(可以不传)
		"startTime":null,			//开始入库时间	String		必填
		"endTime":null,				//结束入库时间	String		必填
		"productTime":null			//生产日期		String		(可以不传)
	}
返回值:
	{
    "status": "200",
    "msg": "查询入库记录成功",
    "data": {
        "messageType": 1,
        "message": "查询入库成功",
        "data": {
            "pageNum": 1,
            "pageSize": 3,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 1,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "sublotNumber": "GC071001",
                    "spec": "185dtex/144f",
                    "houseName": null,
                    "storageName": "AM101",
                    "count": null,
                    "sumWeight": 3810,
                    "level": "AA",
                    "yoke": "木架",
                    "package_type": "自动打包"
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
        }
    },
    "token": null
}

		#码单明细#
7,出入库类型(老系统的“状态”)
	备注：参数不再传递
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectTransTypeList
传入参数: 
	{
	
}
返回值:
	{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": "扫码入库",
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": "翻包入库",
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": "退货入库",
            "sutboundType": null
        }
    ],
    "token": null
}

8.码单明细记录
		备注：点击“码单明细”
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectInStorageDetailList
传入参数: 
	{
		"pageNum":1,									(必传)
		"pageSize":10,									(必传)
		"sublotNumber":null,      	String  //批号  	(必传)
		"transType":null,			String  //出入库类型
		"lineName":null,			String  //线别
		"lotNumber":null			String  //码单号
		
		
	}
返回值
	{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "messageType": 1,
        "message": "查询入库成功",
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
                    "id": 12,
                    "lotNumber": "0010",
                    "productTime": "2018-10-09T07:11:55.000+0000",
                    "transType": "出入库类型2",
                    "transDate": "2018-10-09T07:39:27.000+0000",
                    "transDperator": "操作员1",
                    "netWeight": 390
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
9.码单明细搜索
	备注：点击“搜索”
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/searchInStorageDetailList
传入参数: 
	{
		"pageNum":1,						(必传)
		"pageSize":10,						(必传)
		"sublotNumber":null,      	String  //批号
		"transType":null,			String  //出入库类型
		"lineName":null,			String  //线别
		"lotNumber":null			String  //码单号
		
		
	}
返回值
	{
    "status": "200",
    "msg": "查询成功",
    "data": {
        "messageType": 1,
        "message": "查询入库成功",
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
                    "id": 12,
                    "lotNumber": "0010",
                    "productTime": "2018-10-09T07:11:55.000+0000",
                    "transType": "出入库类型2",
                    "transDate": "2018-10-09T07:39:27.000+0000",
                    "transDperator": "操作员1",
                    "netWeight": 390
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

接口文档v1.0 
	by zkw 
	2018-10-11 15:20
##盘点接口##

1，待盘点的盘点明细查看码单（分页）
	备注：参数参数必传
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectStocktakingDetail
传入参数:
	{
	"sublotNumber":"GC071001",   
	"houseName":"仓库A",
	"pageNum":1,
	"pageSize":5
	}
返回值:
	{
    "status": "200",
    "msg": "查看码单信息成功",
    "data": {
        "pageNum": 1,
        "pageSize": 5,
        "size": 5,
        "startRow": 1,
        "endRow": 5,
        "total": 7,
        "pages": 2,
        "list": [
            {
                "lotNumber": "0002",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "出入库类型1",
                "transDate": "2018-09-05T07:39:18.000+0000",
                "transOperator": "操作员2",
                "netWeight": 380
            },
            {
                "lotNumber": "0004",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": null,
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": null,
                "netWeight": 380
            },
            {
                "lotNumber": "0006",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": 380
            },
            {
                "lotNumber": "0007",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": 380
            },
            {
                "lotNumber": "0008",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": 380
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
        "lastPage": 2,
        "firstPage": 1
    },
    "token": null
}

	2018-10-16
	
	##盘点接口文档##
1.查询所有“仓库”
	请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectHouseNameList
传入参数: 
	{
		
	}
返回值:
	{
    "status": "200",
    "msg": "查询仓库成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库A",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库B",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库C",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓库D",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "仓一南马路",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": "cheshi",
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        }
    ],
    "token": null
}


2.查询所有“批号”
	请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectBatchNoList
传入参数: 
	{
		
	}
返回值:
	{
    "status": "200",
    "msg": "查询批号成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC071001",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC021502",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD30705S",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC70706",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GA92083",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GB12582",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61005",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GA62081",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61206",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71021S",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC50708",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC11023",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC11521",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71217S",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC61004",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD30515",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC20721",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC20726",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC21524",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD41211",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC70707",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10503",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10504",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD10502",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GD71020S",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC011201",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": "GC71005",
            "level": null,
            "classes": null,
            "storageType": null,
            "sutboundType": null
        }
    ],
    "token": null
}

3.查询所有“等级”
	请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectLevelList
传入参数: 
	{
		
	}
返回值:
	{
    "status": "200",
    "msg": "查询等级成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": "A",
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": "B",
            "classes": null,
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": "C",
            "classes": null,
            "storageType": null,
            "sutboundType": null
        }
    ],
    "token": null
}

4.查询所有“班次”
	请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectClassesList
传入参数: 
	{
		
	}
返回值:
	{
    "status": "200",
    "msg": "查询班次成功",
    "data": [
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": "白班",
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": "晚班",
            "storageType": null,
            "sutboundType": null
        },
        {
            "productName": null,
            "workshop": null,
            "factoryName": null,
            "houseName": null,
            "storageCode": null,
            "batchNo": null,
            "level": null,
            "classes": "中班",
            "storageType": null,
            "sutboundType": null
        }
    ],
    "token": null
}

5.待入库成功的数据（凯文的接口，已经测过）
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectStocktakingInfo
传入参数: 
	{
	"houseId":20,
	"batchNo":null,
	"level":null,
	"classes":null,
	"startDate":"2018-08-01" ,
	"endDate":"2018-10-20" ,
	"pageNum":1,
	"pageSize":5
}
返回值:
	{
    "status": "200",
    "msg": "获取盘点信息成功",
    "data": {
        "pageNum": 1,
        "pageSize": 5,
        "size": 5,
        "startRow": 1,
        "endRow": 5,
        "total": 12,
        "pages": 3,
        "list": [
            {
                "lotNumber": null,
                "batchNo": "GC011201",			
                "spec": "218dtex/72f",
                "warehouseId": null,
                "warehouseName": "仓库A",
                "storageId": null,
                "storageCode": "AM101",
                "packageType": "自动打包",
                "yoke": "木架托盘",
                "classes": "甲",
                "level": "AA",
                "singleWeight": null,							//漏扫使用：单个码单的产品的重量
                "totalWeight": 720,					//批次的总重量
                "totalQuantity": 1,					//批次的个数
                "lotNumberList": null,
                "autoTotalCount": 3,				//自动化的批次的个数
                "autoSingleCount": null							//漏扫使用：单个码单的产品的数量
            },
            {
                "lotNumber": null,
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
                "totalWeight": 380,
                "totalQuantity": 1,
                "lotNumberList": null,
                "autoTotalCount": null,
                "autoSingleCount": null
            },
            {
                "lotNumber": null,
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
                "lotNumberList": null,
                "autoTotalCount": null,
                "autoSingleCount": null
            },
            {
                "lotNumber": null,
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
                "totalWeight": 760,
                "totalQuantity": 2,
                "lotNumberList": null,
                "autoTotalCount": null,
                "autoSingleCount": null
            },
            {
                "lotNumber": null,
                "batchNo": "GC71005",
                "spec": "183dtex/144f",
                "warehouseId": null,
                "warehouseName": "仓库A",
                "storageId": null,
                "storageCode": "AM101",
                "packageType": "人工打包",
                "yoke": "塑料托盘",
                "classes": "乙",
                "level": "AA",
                "singleWeight": null,
                "totalWeight": 720,
                "totalQuantity": 1,
                "lotNumberList": null,
                "autoTotalCount": 2,
                "autoSingleCount": null
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
            2,
            3
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 3,
        "firstPage": 1,
        "lastPage": 3
    },
    "token": null
}
6.漏扫的数据
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/getWaitStocktakingRecord
传入参数: 
	{
	"houseId":1,
	"houseName":"仓库A",
	"batchNo":"GD10504",
	"level":"A",
	"classes":"中",
	"productDate":null,
	"startDate":null,
	"endDate":null,
	"pageNume":1,
	"pageSize":5
	}
返回值:
	{
    "status": "400",
    "msg": "有漏扫的码单",
    "data": [
        {
            "lotNumber": "020120181004GC71005C220019",
            "batchNo": "GC71005",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020120181008GC011201C210007",
            "batchNo": "GC011201",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020120181008GC011201C210009",
            "batchNo": "GC011201",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020120181008GC011201C210011",
            "batchNo": "GC011201",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020220181003GD10504D220001",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020220181003GD10504D220003",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020220181003GD10504D220004",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020220181003GD10504D220005",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020220181008GD71217SD330005",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020120181002GC50708C130008",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020120181002GC50708C130009",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020120181002GC50708C130010",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        },
        {
            "lotNumber": "020220181009GD71217SD330015",
            "batchNo": "GD10504",
            "spec": "710dtex/96f",
            "warehouseId": 20,
            "warehouseName": "仓库A",
            "storageId": null,
            "storageCode": "AM101",
            "packageType": "人工打包",
            "yoke": "塑托",
            "classes": "中",
            "level": "A",
            "singleWeight": 380,
            "totalWeight": null,
            "totalQuantity": null,
            "lotNumberList": null,
            "autoTotalCount": 1
        }
    ],
    "token": null
}


7.成功的码单详情
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectStocktakingDetail
传入参数: 
	{
	"sublotNumber":"GC071001",		//批次
	"houseName":"仓库A",
	"pageNum":1,
	"pageSize":5
	}
返回值:
	{
    "status": "200",
    "msg": "查看码单信息成功",
    "data": {
        "pageNum": 1,
        "pageSize": 5,
        "size": 5,
        "startRow": 1,
        "endRow": 5,
        "total": 7,
        "pages": 2,
        "list": [
            {
                "lotNumber": "0002",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "出入库类型1",
                "transDate": "2018-09-05T07:39:18.000+0000",
                "transOperator": "操作员2",
                "netWeight": 380
            },
            {
                "lotNumber": "0004",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": null,
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": null,
                "netWeight": 380
            },
            {
                "lotNumber": "0006",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": 380
            },
            {
                "lotNumber": "0007",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": 380
            },
            {
                "lotNumber": "0008",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": 380
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
	

8.漏扫的码单详情
请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/selectAutoStocktakingDetail
传入参数: 
	{
	"sublotNumber":"GC071001",
	"houseName":"仓库A"

	}
	
返回值:
	{
    "status": "200",
    "msg": "查看码单信息成功",
    "data": [
        {
            "lotNumber": "020220181009GD71217SD330004",
            "productTime": "2018-10-16T05:06:50.094+0000",
            "transType": "补录库",
            "transDate": "2018-10-16T05:06:50.094+0000",
            "transOperator": "操作员1",
            "netWeight": 380
        },
        {
            "lotNumber": "020220181009GD71217SD330006",
            "productTime": "2018-10-16T05:06:50.094+0000",
            "transType": "补录库",
            "transDate": "2018-10-16T05:06:50.094+0000",
            "transOperator": "操作员1",
            "netWeight": 380
        },
        {
            "lotNumber": "020220181009GD71217SD330004",
            "productTime": "2018-10-16T05:06:50.094+0000",
            "transType": "补录库",
            "transDate": "2018-10-16T05:06:50.094+0000",
            "transOperator": "操作员1",
            "netWeight": 380
        }
    ],
    "token": null
}




9.补录的功能
	备注：测试数据	
		020220181008GD71217SD330005
		020120181002GC50708C130008
		020120181002GC50708C130009
		020120181002GC50708C130010
		020220181009GD71217SD330015
		020220181003GD10504D220001
		020220181003GD10504D220002
		020220181003GD10504D220003
		020220181003GD10504D220004
		020220181003GD10504D220005
		020120181008GC011201C210008
		020120181004GC71005C220019
		020120181004GC71005C220020
		
	请求类型:post
请求地址:/mes/warehouseInfo/stocktaking/getLotNumberIdInboundList
传入参数: 
	{
	"lotNumbers":"020220181002GD30515D120002,020220181002GD30515D120003",	//码单
	"userId":1
}
	
返回值:
	{
		"status": "201",
		"msg": "补录成功",
		"data": null,
		"token": null
	}

