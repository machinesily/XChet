var dbserver = require('../dao/dbserver')
//引入邮箱发送方法
var emailserver = require('../dao/emailserver.js')
//引入注册页面服务
var signup = require('../server/signup')
//引入登录页面服务
var login = require('../server/login')
//引入搜索页面服务
var search = require('../server/search')
//用户详情页面服务
var userdetail = require('../server/userdetial')


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
  app.post('/login/match', (req, res) => {
    login.login(req, res)
  })

  // //token测试
  // app.post('/login/token', (req, res) => {
  //   res.send('这里token正确')
  // })

  //搜索页面
  //搜索用户
  app.post('/search/user', (req, res) => {
    search.searchUser(req,res)
  })

  //判断好友
  app.post('/search/isfriend', (req, res) => {
    search.isFriend(req,res)
  })

  //搜索群
  app.post('/search/group', (req, res) => {
    search.searchGroup(req,res)
  })

  //判断是否在群内
  app.post('/search/isingroup', (req, res) => {
    search.isInGroup(req,res)
  })

  //用户详情
  //详情
  app.post('/user/detail', (req, res) => {
    userdetail.userDetial(req,res)
  })
  ////用户信息修改
  app.post('/user/update', (req, res) => {
    userdetail.userUpdata(req,res)
  })
  //好友备注修改
  app.post('/user/alias', (req, res) => {
    userdetail.friendAliasUpdate(req,res)
  })
}