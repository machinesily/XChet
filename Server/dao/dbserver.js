//引入加密文件
var bcrypt = require('../dao/bcrypt')

//引入token文件
var jwt = require('../dao/jwt')

var dbmodel = require('../model/dbmodel')
var User = dbmodel.model('User')
var Friend = dbmodel.model('Friend')
var Group = dbmodel.model('Group')
var GroupUser = dbmodel.model('GroupUser')

//新建用户
exports.buildUser = (name, mail, psw, res) => {
  let password = bcrypt.encryption(psw) //密码加密

  let data = {
    name: name,
    mail: mail,
    psw: password,
    time: new Date()
  }

  let user = new User(data)

  user.save(function (err, result) {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

//查看用户名是否注册
exports.countUserValue = function (data, type, res) {
  let wherestr = {}
  //wherestr = {'type':data}
  wherestr[type] = data

  //MongoDB查找的方法
  User.countDocuments(wherestr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200,result})
    }
  })
}

//用户登陆验证
exports.useMatch = (data, psw, res) => {
  //搜索的条件
  let wherestr = {
    $or: [{
      'name': data
    }, {
      'email': data
    }]
  }
  //输出的东西，1为输出
  let out = {
    'name': 1,
    'imgurl': 1,
    'psw': 1
  }
  User.find(wherestr, out, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      if (result == '') {
        res.send({status: 400}) //没有匹配到用户返回400
      }
      result.map((e) => {
        const pswMatch = bcrypt.verification(psw, e.psw) //解密密码并进行匹配，返回布尔值
        if (pswMatch) {
          let token = jwt.generateToken(e._id) //生成token
          let back = {
            id: e._id,
            name: e.name,
            imgurl: e.imgurl,
            token: token
          }
          res.send({status: 200,back})
        } else {
          res.send({status: 400})
        }
      })
    }
  })
}

//搜索用户
exports.searchUser = (data, res) => {
  let wherestr
    if (data == 'XChet') {
       wherestr = {}
    } else {
       wherestr = {
        $or: [{
          'name': {
            $regex: data //$regex模糊搜索
          }
        }, {
          'mail': {
            $regex: data
          }
        }]
      }
    }

    let out = {
      'name': 1,
      'mail': 1,
      'imgurl': 1
    }

    User.find(wherestr, out, (err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        res.send({status: 200,result})
      }
    })
  },

  //判断是否为好友
  exports.isFirend = (uid, fid, res) => {
    let wherestr = {
      'userID': uid,
      'friendID': fid,
      'state': 0
    }
    Friend.findOne(wherestr, (err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        if (result) {
          //是好友
          res.send({status: 200})
        } else {
          //不是好友
          res.send({status: 400})
        }
      }
    })
  },

  //搜索群
  exports.searchGroup = (data, res) => {
    let wherestr
    if (data == 'XChet') {
       wherestr = {}
    } else {
       wherestr = {
        'name': {
          $regex: data //$regex模糊搜索
        }
      }
    }
    let out = {
      'name': 1,
      'imgurl': 1
    }

    Group.find(wherestr, out, (err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        res.send({status: 200,result})
      }
    })
  }

//判断是否在群内
exports.isInGroup = (uid, gid, res) => {
  let wherestr = {
    'userID': uid,
    "groupID": gid
  }

  GroupUser.findOne(wherestr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      if (result) {
        //在群里
        res.send({status: 200})
      } else {
        //不在群里
        res.send({status: 400})
      }
    }
  })
}

//用户详情
exports.userDetial = (id,res)=>{
  let wherestr = {'_id':id}
  let out = {'psw':0}
  User.findOne(wherestr.out,(err,result)=>{
    if(err){
      res.send({status:500})
    }else{
      res.send({status:200,result})
    }
  })
}

//用户信息修改
exports.userUpdata = (data,res)=>{
  let updatestr = {}

  //判断是否有传密码
  if (typeof(data.psw)!= 'undefined'){
    //有密码进行匹配
    User.find({'_id':data.id},{'psw':data.psw},function(err,result){
      if(err){
        //发送错误发送500
        res.send({status:500})
      }else{
        //没有匹配到密码发送400
        if(result==''){
          res.send({status:400})
        }
        result.map(function(e){
          //用户输入的密码和数据库的密码匹配
          const pswMatch = bcrypt.verification(data.pwd,e.psw)//e.psw为匹配到的真密码
          if(pswMatch){
            //密码验证成功
            updatestr[data.type] = data.data //查找条件
            User.findByIdAndUpdate(data.id,updatestr,function(err,res){ //更新数据
              if(err){
                //修改失败
                res.send({status:500})
              }else{
                //修改成功
                res.send({status:200})
              }
            })
          } else{
            //密码不匹配
            res.send({status:400})
          }
        })
      }
    })
  }else{
    //前端没有传入密码
    updatestr[data.type] = data.data
    User.findByIdAndUpdate(data.id,updatestr,function(err,resu){
      if(err){
        //修改失败
        res.send({status:500})
      }else{
        //修改成功
        res.send({status:200})
      }
    })
  }
}

//修改好友备注
exports.friendAliasUpdate = function(data,res){
  let wherestr = {'userID':data.uid,'friendID':data.fid}
  let updatestr = {'alias':data.name}
  Friend.updateOne(wherestr,updatestr,function(err,result){
    if(err){
      //修改失败
      res.send({status:500})
    }else{
      //修改成功
      res.send({status:200})
    }
  })

}