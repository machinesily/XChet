//用户登录
var dbserver = require('../dao/dbserver')

//引入token文件
var jwt = require('../dao/jwt')

exports.login = (req,res)=>{
  let data = req.body.user
  let psw = req.body.psw

  dbserver.useMatch(data,psw,res)
}

//token测试
exports.test = (req,res)=>{
  let token = req.body.token
  let match = jwt.verifyToken(token)

  res.send({match})
}