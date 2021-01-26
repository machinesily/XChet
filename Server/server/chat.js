//获取一对一聊天
var dbserver = require('../dao/dbserver')

//添加好友
exports.msg = (req,res)=>{
  let data = req.body
  dbserver.msg(data,res)
}