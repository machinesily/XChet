//引入解析req.body的插件
var bodyParser = require('body-parser')
//引入token
var jwt = require('./dao/jwt')


const express = require('express')
const app = express()
const port = 3000

//解决跨域问问题
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method == 'OPTIONS'){
    res.sendStatus(200)
  }else {
      next()
  }
});

//解析前端传过来数据
app.use(bodyParser.json())
// app.use(bodyParser.json({limit:'50mb'}))

//获取图片静态路径
app.use(express.static(__dirname+'/data'))

//token判断
app.use((req,res,next)=>{
  if(typeof(req.body.token)!='undefined'){
    //处理token匹配
    let token = req.body.token
    let tokenMatch = jwt.verifyToken(token)
    if(tokenMatch == 1){
     //验证通过
      next()
    }else{
     //验证不通过
      res.send({status:300})
    }
  }else{
    next()
  }
})

//导入路由表
require('./route/index.js')(app)
require('./route/files.js')(app)

//404页面处理
app.use((req,res,next)=>{
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

//出现错误处理
app.use((err,rep,res,next) => {
  res.status(err.status || 500)
  res.send(err.message);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))