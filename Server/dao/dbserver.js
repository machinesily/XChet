//引入加密文件
var bcrypt = require('../dao/bcrypt')

//引入token文件
var jwt = require('../dao/jwt')

var dbmodel = require('../model/dbmodel')
var User = dbmodel.model('User')
var Friend = dbmodel.model('Friend')
var Group = dbmodel.model('Group')
var GroupUser = dbmodel.model('GroupUser')
var Message = dbmodel.model('Message')
var GroupMessage = dbmodel.model('GroupMessage')

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
      'mail': data
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
          let result = {
            id: e._id,
            name: e.name,
            imgurl: e.imgurl,
            token: token
          }
          res.send({status: 200,result})
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
    if (data == 'Xchat') {
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
    Friend.findOne(wherestr,(err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        if (result) {
          //是好友
          res.send({status: 200,result})
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
  User.findOne(wherestr,out,(err,result)=>{
    if(err){
      res.send({status:500})
    }else{
      res.send({status:200,result})
    }
  })
}

//用户信息修改
function upDate(data,updatestr,res){
  User.findByIdAndUpdate(data,updatestr,function(err,resu){ 
    if(err){
      //修改失败
      res.send({status:500})
    }else{
      //修改成功
      res.send({status:200})
    }
  })
}

exports.userUpdata = (data,res)=>{
  let updatestr = {}

  //判断是否有传密码
  if (data.psw){
    //有密码进行匹配
    User.find({'_id':data.id},{'psw':1},function(err,result){
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
          const pswMatch = bcrypt.verification(data.psw,e.psw)//e.psw为数据库的密码
          if(pswMatch){
            //密码验证成功
            //如果修改密码先加密再存储
            if(data.type == 'psw'){
              let password = bcrypt.encryption(data.data) //密码加密
              updatestr[data.type] = password
              upDate(data.id,updatestr,res) //更新密码
            }else{
              //修改邮箱
              updatestr[data.type] = data.data //查找条件
              //邮箱查重
              User.countDocuments(updatestr, (err, result) => {
                if (err) {
                  res.send({status: 500})
                } else {
                  if(result==0){
                    upDate(data.id,updatestr,res) //更新邮箱
                  }else{
                    //已存在
                    res.send({status: 300})
                  }
                }
              })
            }
          } else{
            //密码不匹配
            res.send({status:400})
          }
        })
      }
    })
  }else if(data.type == 'name'){
    //修改用户名
    updatestr[data.type] = data.data //查找条件
    //用户名查重
    User.countDocuments(updatestr, (err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        if(result==0){
          upDate(data.id,updatestr,res) //更新用户名
        }else{
          //已存在
          res.send({status: 300})
        }
      }
    })
  }else{
    //前端没有传入密码，一般项修改
    updatestr[data.type] = data.data
    upDate(data.id,updatestr,res)  //更新数据
  }
}

//获取好友备注
exports.getFriendAlias = function(data,res){
  let wherestr = {'userID':data.uid,'friendID':data.fid}
  let out = {'alias':1}
  Friend.findOne(wherestr,out,function(err,result){
    if(err){
      //查找失败
      res.send({status:500})
    }else{
      //查找成功
      res.send({status:200+result})
    }
  })
}

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

//好友操作
//添加好友表
exports.bulidFriend = function(uid,fid,state,res){
  let data = {
    userID:uid,
    friendID:fid,
    state:state,
    time:new Date(),
    lastTime:new Date()
  }

  let friend = new Friend(data)
  friend.save(function (err, result) {
    if (err) {
      console.log('添加好友表出错');
    } else {
      // res.send({status: 200})
    }
  })
}

//好友最后通讯时间
exports.upFriendLastTime = function(uid,fid){
  let wherestr = {'userID':uid,'friendID':fid}
  let updatestr = {'lastTime':new Date()}

  Friend.updateOne(wherestr,updatestr,(err,result)=>{
    if (err) {
      console.log('最后通讯数据更新出错');
    } else {
      // res.send({status: 200})
    }
  })
}

//添加一对一信息表
exports.inserMsg = function(uid,fid,msg,type,res){
  let data = {
    userID:uid,
    friendID:fid,
    message:msg,
    type:type,
    time:new Date(),
    state:1
  }
  let message = new Message(data)
  message.save(function (err, result) {
    if (err) {
      console.log('插入信息错误');
    } else {
      // console.log('插入信息成功');
    }
  })
}

//好友申请
exports.applyFriend = function(data,res){
  //判断是否已经申请过了
  let wherestr = {'userID':data.uid,'friendID':data.fid}
  Friend.countDocuments(wherestr,(err,result) => {
    if(err){
      res.send({status:500})
    }else{
      //如果result = 0 为初次申请
      if(result == 0){
        this.bulidFriend(data.uid,data.fid,2,res) //2代表申请发送方
        this.bulidFriend(data.fid,data.uid,1,res) //1代表好友向你申请
      }else{
        //不是初次申请
        this.upFriendLastTime(data.uid,data.fid,res)
        this.upFriendLastTime(data.fid,data.uid,res)
      }
      this.inserMsg(data.uid,data.fid,data.msg,0,res)
      res.send({status:200})
    }
  })
}

//更新好友状态
exports.updateFriendState = function(data,res){
  let msg = '我们已经成为好友，快来聊天吧'
  //修改查找项
  let wherestr = {$or:[{'userID':data.uid,'friendID':data.fid},{'userID':data.fid,'friendID':data.uid}]}
  Friend.updateMany(wherestr,{'state':0},(err,result)=>{
    if (err) {
      res.send({status: 500})
    } else {
      this.inserMsg(data.fid,data.uid,msg,0,res)
      res.send({status: 200})
    }
  })
}

//拒绝好友或删除好友
exports.deleteFriend = (data,res)=>{
  //修改查找项
  let wherestr = {$or:[{'userID':data.uid,'friendID':data.fid},{'userID':data.fid,'friendID':data.uid}]}
  Friend.deleteMany(wherestr,(err,result)=>{
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
  Message.deleteMany(wherestr,(err,result)=>{
    if (err) {
      console.log('删除好友失败');
    } else {
      console.log('删除好友成功');
    }
  })
}

//首页获取用户列表
exports.getFriends = (data,res)=>{
  let query = Friend.find({})
  //查询条件
  query.where({'userID':data.uid,'state':data.state})
  //查找friendID关联的user对象
  query.populate('friendID')
  //排序方式 倒序排列
  query.sort({'lastTime':-1})
  //查询结果
  query.exec().then((e)=>{
    let result = e.map((ver)=>{
      return {
        id:ver.friendID._id,
        name:ver.friendID.name,
        alias: ver.alias,
        imgurl:ver.friendID.imgurl,
        lastTime:ver.lastTime,
        type:0
      }
    })
    res.send({status:200,result})
  }).catch(err => {
    res.send({status:500})
  })
}

//首页获取一对一消息
exports.getLastMsg = (data, res) => {
  let query = Message.find({})
  //查询条件
  query.where({$or:[{'userID':data.uid,'friendID':data.fid},{'userID':data.fid,'friendID':data.uid}]})
  //排序方式 倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then((ver)=>{
    let result = {
      message:ver[0].message,
      time:ver[0].time,
      type:ver[0].type
    }
    res.send({status:200,result})
  }).catch(err => {
    res.send({status:500})
  })
}
 
//首页未读消息数获取
exports.unreadMsg = (data, res) => {
  //条件
  let wherestr = {'userID':data.fid,'friendID':data.uid,'state':1}
  Message.countDocuments(wherestr,(err,result) => {
    if(err){
      res.send({status:500})
    }else{
     res.send({status:200,result})
    }
  })
}

//首页未读消息数清零
exports.updateMsg = (data, res) => {
  //搜索条件
  let wherestr = {'userID':data.uid,'friendID':data.fid,'state':1}
  //修改内容
  let updatestr = {'state':0}
  Message.updateMany(wherestr,updatestr,(err,result) => {
    if(err){
      res.send({status:500})
    }else{
     res.send({status:200})
    }
  })
}

//获取群列表
exports.getGroup = (data,res)=>{
  let query = GroupUser.find({})
  //查询条件
  query.where({'userID':data.uid})
  //查找friendID关联的user对象
  query.populate('groupID')
  //排序方式 倒序排列
  query.sort({'lastTime':-1})
  //查询结果
  query.exec().then((e)=>{
    let result = e.map((ver)=>{
      return {
        id:ver.groupID._id,
        name:ver.groupID.name,
        imgurl:ver.groupID.imgurl,
        lastTime:ver.lastTime,
        tip:ver.tip,
        type:1
      }
    })
    res.send({status:200,result})
  }).catch(err => {
    res.send({status:500})
  })
}

//获取群最后一条消息
exports.getLastGroupMsg = (data, res) => {
  let query = GroupMessage.find({})
  //查询条件
  query.where({'groupID':data.gid})
  //关联的user对象
  query.populate('userID')
  //排序方式 倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then((ver)=>{
    let result = {
      message:ver[0].message,
      time:ver[0].time,
      type:ver[0].type,
      name:ver[0].userID.name,
    }
    res.send({status:200,result})
  }).catch(err => {
    res.send({status:500})
  })
}

//首页群未读消息数清零
exports.updateGroupMsg = (data, res) => {
  //搜索条件
  let wherestr = {'userID':data.uid,'groupID':data.gid}
  //修改内容
  let updatestr = {'tip':0}
  Message.updateOne(wherestr,updatestr,(err,result) => {
    if(err){
      res.send({status:500})
    }else{
     res.send({status:200})
    }
  })
}

//消息操作
//分页获取数据一对一数据
exports.msg = (data,res) => {
  var skipNum = data.nowPage*data.pageSize

  let query = Message.find({})
  //查询条件
  query.where({$or:[{'userID':data.uid,'friendID':data.fid},{'userID':data.fid,'friendID':data.uid}]})
  //排序方式 倒序排列
  query.sort({'time':-1})
  //关联的user对象
  query.populate('userID')
  //跳过的条数
  query.skip(skipNum)
  //每页显示的条数
  query.limit(data.pageSize)
  //查询结果
  query.exec().then((e)=>{
    let result = e.map((ver) => {
      return {
        id:ver._id,
        message:ver.message,
        type:ver.type,
        time:ver.time,
        fromID:ver.userID._id,
        imgurl:ver.userID.imgurl,
      }
    })
    res.send({status:200,result})
  }).catch(err => {
    console.log(err);
    res.send({status:500,err,data})
  })
}