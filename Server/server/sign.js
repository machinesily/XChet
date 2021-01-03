//用户登录
const { execPath } = require('process')
var dbserver = require('../dao/dbserver')

exports.sign = (req,res)=>{
  let data = req.body.data
  let psw = req.body.psw

  dbserver.useMatch(data,psw,res)
}