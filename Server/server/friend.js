//好友操作
var dbserver = require('../dao/dbserver')

//添加好友
exports.applyFriend = (req,res)=>{
  let data = req.body
  // console.log(req.body);
  dbserver.applyFriend(data,res)
}

//好友状态更新
exports.updateFriendState = (req,res)=>{
  let data = req.body
  dbserver.updateFriendState(data,res)
}

//拒绝好友或删除好友
exports.deleteFriend = (req,res)=>{
  let data = req.body
  dbserver.deleteFriend(data,res)
}
