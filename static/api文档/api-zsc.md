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
            "productId": null,
            "houseName": "仓库A",    	//仓库
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
            "productId": null,
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
            "productId": null,
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
            "productId": null,
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
            "productId": null,
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
            "productId": null,
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
	说明：点击“批号”下拉列表，异步请求“选择的车间下的所有批号”
	请求类型:post
请求地址:/warehouseInfo/InboundRecord/selectOublotNumberList
传入参数: 
	{	
	  "houseName": null        //仓库  (可以不传)
	}
返回值:
{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "productId": null,
            "houseName": null,
            "transOperator": null,
            "lotNumber": null,
            "productName": null,
            "sublotNumber": "批次222",
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


3.查询所有“品名”
	说明：点击“批号”下拉列表，异步请求“选择的车间下的所有批号”
请求类型:post
请求地址:/warehouseInfo/InboundRecord/selectProductNameList
传入参数: 
	{	
	
	 "houseName": null       	//仓库  (可以不传)
	 "sublotNumber": null		//批号	(可以不传)
	
	}
返回值:
{
    "status": "200",
    "msg": "查询成功",
    "data": [
        {
            "productId": null,
            "houseName": null,
            "transOperator": null,
            "lotNumber": null,
            "productName": "POY",    //品名(成品名称)
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "productId": null,
            "houseName": null,
            "transOperator": null,
            "lotNumber": null,
            "productName": "FDY",
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "productId": null,
            "houseName": null,
            "transOperator": null,
            "lotNumber": null,
            "productName": "短纤",
            "sublotNumber": null,
            "productType": null,
            "level": null,
            "yoke": null,
            "packageType": null,
            "productTime": null,
            "type": null
        },
        {
            "productId": null,
            "houseName": null,
            "transOperator": null,
            "lotNumber": null,
            "productName": "切片",
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
            "pageSize": 10,
            "size": 2,			//总记录数
            "startRow": 1,		
            "endRow": 2,
            "total": 2,
            "pages": 1,
            "list": [
                {
                    "productId": 2,                	//id
                    "houseName": null,				//仓库名称
                    "transOperator": null,			//操作员
                    "lotNumber": "ewfwed222",		//码单号
                    "productName": null,			//成品名称	
                    "sublotNumber": "批次222",		//批号
                    "productType": null,			//成品类型(成品区、拆包区)
                    "level": null,					//等级
                    "yoke": "托盘类型222",			//托盘类型
                    "packageType": "打包类型222",	//打包类型
                    "productTime": null,			//入库时间
                    "type": null					//库存类型（内销，外贸）
                },
                {
                    "productId": 4,
                    "houseName": null,
                    "transOperator": null,
                    "lotNumber": "dfvervf444",
                    "productName": null,
                    "sublotNumber": "批次222",
                    "productType": null,
                    "level": null,
                    "yoke": "托盘类型222",
                    "packageType": "打包类型222",
                    "productTime": null,
                    "type": null
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
    "msg": "查询成功",
    "data": [
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": "仓库A",
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": null,
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": "仓库B",
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": null,
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": "仓库C",
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": null,
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": "仓库D",
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": null,
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": "仓一南马路",
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": null,
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": "cheshi",
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": null,
            "yoke": null,
            "package_type": null
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
    "msg": "查询成功",
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
    "msg": "查询成功",
    "data": [
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC071001",     //批号
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC021502",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GD30705S",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC70706",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GA92083",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GB12582",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC61005",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GA62081",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC61206",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GD71021S",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC50708",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC11023",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC11521",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
            "remark": null,
            "isDeleted": null,
            "createTime": null,
            "modifiedTime": null,
            "creatorId": null,
            "modifierId": null
        },
        {
            "id": null,
            "workshop": null,
            "batchNo": "GC20721",
            "spec": null,
            "centerValue": null,
            "holeCount": null,
            "tubeColor": null,
            "delayDays": null,
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
4.查询所有“班次”
请求类型:post
请求地址:warehouseInfo/InStorageRecord/selectClassesList
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
            "lotNumber": null,
            "sublotNumber": null,
            "material": null,
            "saleType": null,
            "yoke": null,
            "foamType": null,
            "foamNum": null,
            "netWeight": null,
            "packageType": null,
            "silkCount": null,
            "yarnKind": null,
            "twistDirection": null,
            "productTime": null,
            "lineName": null,
            "classes": "甲",
            "preStorage": null,
            "printFlag": null,
            "printCount": null,
            "lgort": null,
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
5.查询所有“等级”
	
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectLevelList
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
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "C",             //等级
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "AA",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "A",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "B",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "优等",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "综合丝",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "合格",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "等外",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "壹等",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "AAA",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "AA630",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "次优等",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "一等",
            "yoke": null,
            "package_type": null
        },
        {
            "id": null,
            "sublotNumber": null,
            "spec": null,
            "houseName": null,
            "storageName": null,
            "count": null,
            "sumWeight": null,
            "level": "AA车丝",
            "yoke": null,
            "package_type": null
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
    "status": "400",
    "msg": "查询成功",
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
                    "sublotNumber": "GC071001",		String 		//批号
                    "spec": "185dtex/144f",			String		//规格
                    "houseName": null,				String  	//仓库名称
                    "storageName": "AM101",			String		//库位号	
                    "count": 1,						Integer		//箱数
                    "sumWeight": 3420,				BigDecimal	//每批的总重量
                    "level": "AA",					String		//等级
                    "yoke": "木架",					String		//托盘类型
                    "package_type": "自动打包"		String		//打包类型
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
请求类型:post
请求地址:/warehouseInfo/InStorageRecord/selectTransTypeList
传入参数: 
	{
	"sublotNumber":null	    	//批号（必传）
}
返回值:(返回了两条数据)
	{
    "status": "200",
    "msg": "查询成功",
    "data": [
        null,         
        {
            "id": null,
            "productId": null,
            "billid": null,
            "transNo": null,
            "transDate": null,
            "transType": "",            //出入库类型
            "transOperator": null,
            "preStorage": null,
            "count": null,
            "requisitionDetailId": null,
            "synSap": null,
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
    "status": "400",
    "msg": "查询成功",
    "data": {
        "messageType": 1,
        "message": "查询入库成功",
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
                    "id": 1,
                    "lotNumber": null								String	//码单
                    "productTime": null,							String  //生产日期
                    "transType": null,								String  //出入库类型
                    "transDate": "2018-09-26T07:39:15.000+0000",	String  //入库日期
                    "transDperator": null,							String  //入库员
                    "netWeight": null								String  //净重
                },
                {
                    "id": 5,
                    "lotNumber": null,
                    "productTime": null,
                    "transType": "",
                    "transDate": "2018-09-12T07:39:23.000+0000",
                    "transDperator": "",
                    "netWeight": null
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
    "status": "400",
    "msg": "查询成功",
    "data": {
        "messageType": 1,
        "message": "查询入库成功",
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
                    "id": 1,
                    "lotNumber": null								String	//码单
                    "productTime": null,							String  //生产日期
                    "transType": null,								String  //出入库类型
                    "transDate": "2018-09-26T07:39:15.000+0000",	String  //入库日期
                    "transDperator": null,							String  //入库员
                    "netWeight": null								String  //净重
                },
                {
                    "id": 5,
                    "lotNumber": null,
                    "productTime": null,
                    "transType": "",
                    "transDate": "2018-09-12T07:39:23.000+0000",
                    "transDperator": "",
                    "netWeight": null
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
                "transType": null,
                "transDate": "2018-09-05T07:39:18.000+0000",
                "transOperator": null,
                "netWeight": "380.00"
            },
            {
                "lotNumber": "0004",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": null,
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": null,
                "netWeight": "380.00"
            },
            {
                "lotNumber": "0006",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": "380.00"
            },
            {
                "lotNumber": "0007",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": "380.00"
            },
            {
                "lotNumber": "0008",
                "productTime": "2018-09-30T01:12:20.000+0000",
                "transType": "",
                "transDate": "2018-09-14T07:39:27.000+0000",
                "transOperator": "",
                "netWeight": "380.00"
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


	
	
	
	
	
	