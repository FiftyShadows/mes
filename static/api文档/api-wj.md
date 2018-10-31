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
