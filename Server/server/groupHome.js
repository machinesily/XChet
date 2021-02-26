//获取群信息和修改
var dbserver = require('../dao/dbserver')

//群信息
exports.groupHome = (req,res)=>{
  let data = req.body
  dbserver.groupHome(data,res)
}
//群成员
exports.groupMember = (req,res)=>{
  let data = req.body
  dbserver.groupMember(data,res)
}
//退出群
exports.exitGroup = (req,res)=>{
  let data = req.body
  dbserver.exitGroup(data,res)
}

// 邀请群成员
exports.insertGroupUser = (req,res)=>{
  let data = req.body
  dbserver.insertGroupUser(data,res)
}

// 修改群名
exports.update = (req,res)=>{
  let data = req.body
  dbserver.update(data,res)
}

// 删除群成员
exports.deleteGroupUser = (req,res)=>{
  let data = req.body
  dbserver.deleteGroupUser(data,res)
}