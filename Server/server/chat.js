//获取一对一聊天
var dbserver = require('../dao/dbserver')


exports.msg = (req,res)=>{
  let data = req.body
  dbserver.msg(data,res)
}


exports.groupMsg = (req,res)=>{
  let data = req.body
  dbserver.groupMsg(data,res)
}