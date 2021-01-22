var dbserver = require('../dao/dbserver')

//导入邮件发送
var email = require('../dao/emailserver')

//用户注册
exports.signUp = function(req,res){
  let name = req.body.name
  let mail = req.body.mail
  let psw = req.body.psw

  //发送邮件
  email.emailSingUp(mail,res)
  dbserver.buildUser(name,mail,psw,res)
}

//用户或邮箱是否占用判断
exports.judge = (req,res)=>{
  let data = req.body.data
  let type = req.body.type

  dbserver.countUserValue(data,type,res)
}