var dbserver = require('../dao/dbserver')

//新建群
exports.createGroup = (req,res)=>{
  let data = req.body
  dbserver.createGroup(data,res)
}

exports.getGroupMsg = (req,res)=>{
  let data = req.body
  dbserver.getGroupMsg(data,res)
}

