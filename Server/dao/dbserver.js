//引入加密文件
var bcrypt = require('../dao/bcrypt')

//引入token文件
var  jwt = require('../dao/jwt')

var dbmodel = require('../model/dbmodel')
var User = dbmodel.model('User')

//新建用户
exports.buildUser = (name,mail,psw,res)=>{
  let password = bcrypt.encryption(psw)  //密码加密

  let data ={
    name:name,
    mail:mail,
    psw:password,
    time:new Date()
  }

  let user = new User(data)

  user.save(function(err,result){
    if(err){
      res.send({status:500})
    }else{
      res.send({status:200})
    }
  })
}

//查看用户名是否注册
exports.countUserValue = function(data,type,res){
  let wherestr = {}
  //wherestr = {'type':data}
  wherestr[type] = data

  //MongoDB查找的方法
  User.countDocuments(wherestr,(err,result)=>{
    if(err){
      res.send({status:500})
    }else{
      res.send({status:200,result})
    }
  })
}

//用户登陆验证
exports.useMatch = (data,psw,res)=>{
  let wherestr = {$or:[{'name':data},{'email':data}]} //搜索的条件  
  let out = {'name':1,'imgurl':1,'psw':1} //输出的东西，1为输出
  User.find(wherestr,out,(err,result)=>{
    if(err){
      res.send({status:500})
    }else{
      if(result == ''){
        res.send({status:400}) //没有匹配到用户返回400
      }
      result.map((e)=>{
        const pswMatch = bcrypt.verification(psw,e.psw)  //解密密码并进行匹配，返回布尔值
        if(pswMatch){
          let token = jwt.generateToken(e._id)  //生成token
          let back =  {
            id:e._id,
            name: e.name,
            imgurl:e.imgurl,
            token:token
          }
          res.send({status:200,back})
        }else{
          res.send({status:400})
        }
      })
    }
  })
}
