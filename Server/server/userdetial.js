//用户详情
var dbserver = require('../dao/dbserver')

//详情
exports.userDetial = (req,res)=>{
  let id = req.body.id
  dbserver.userDetial(id,res)
}

//用户信息修改
exports.userUpdata = (req,res)=>{
  let data = req.body
  dbserver.userUpdata(data,res)
}

//好友备注获取
exports.getFriendAlias = (req,res)=>{
  let data = req.body
  dbserver.getFriendAlias(data,res)
}

//好友备注修改
exports.friendAliasUpdate = (req,res)=>{
  let data = req.body
  dbserver.friendAliasUpdate(data,res)
}