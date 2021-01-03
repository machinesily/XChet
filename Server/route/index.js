var dbserver = require('../dao/dbserver')
//引入邮箱发送方法
var emailserver = require('../dao/emailserver.js')
//引入注册页面服务
var signup = require('../server/signup')
//引入登录页面服务
var sign = require('../server/sign')

module.exports = function (app) {
  //连接数据库测试
  app.post('/user', (req, res) => {
    res.send('aaa')
    // dbserver.findUser(res)
  })

  //邮箱测试
  app.post('/mail', (req, res) => {
    let mail = req.body.mail
    emailserver.emailSingUp(mail, res)
  })

  //注册页面
  //注册
  app.post('/signup/add', (req, res) => {
    signup.signUp(req, res)
  })

  //用户或邮箱是否占用判断
  app.post('/signup/judge', (req, res) => {
    signup.judge(req, res)
  })

  //登陆页面
  //登录
  app.post('/sign/match', (req, res) => {
    sign.sign(req, res)
  })
}