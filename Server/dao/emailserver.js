//引入发送邮件的插件
var nodemailer = require('nodemailer')
//引入证书文件
var credentials = require('../config/credentials')

//创建传输方式
var transporter = nodemailer.createTransport({
  service:'qq',
  auth:{
    user:credentials.qq.user,
    pass:credentials.qq.pass
  }
})

//注册发送邮件给用户
exports.emailSingUp = function(email,res){
  //发送信息内容
  let options = {
    from:'934229118@qq.com',
    to:email,
    subject:'感谢你的注册',  //邮件标题
    html:'<span>欢迎你的加入</span><a href="http://localhost:8080/">点击</a>'
  }

  //发送邮件
  transporter.sendMail(options,(err,msg)=>{
    if(err){
      res.send('邮件发送失败'+err)
      // console.log(err);
    }else{
      res.send('邮件发送成功')
      // console.log('邮箱发送成功！');
    }
  })
}