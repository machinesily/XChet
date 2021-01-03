//引入解析req.body的插件
var bodyParser = require('body-parser')


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

//导入路由表
require('./route/index.js')(app)

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