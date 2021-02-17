//首页
var dbserver = require('../dao/dbserver')

/** 以下为废弃部分 */
//获取好友列表
exports.getFriend = (req, res) => {
  let data = req.body
  dbserver.getFriends(data, res)
}

//获取最后一条消息
exports.getLastMsg = (req, res) => {
  let data = req.body
  dbserver.getLastMsg(data, res)
}

//获取未读消息数
exports.unreadMsg = (req, res) => {
  let data = req.body
  dbserver.unreadMsg(data, res)
}
/** 以上为废弃部分 */

exports.indexGetMsg = (req, res) => {
  let data = req.body
  dbserver.getMsg(data, res)
}

//清零未读消息数
exports.updateMsg = (req, res) => {
  let data = req.body
  dbserver.updateMsg(data, res)
}

//获取群列表
exports.getGroup = (req, res) => {
  let data = req.body
  dbserver.getGroup(data, res)
}

//获取群最后一条消息
exports.getLastGroupMsg = (req, res) => {
  let data = req.body
  dbserver.getLastGroupMsg(data, res)
}

//清零未读消息数
exports.updateGroupMsg = (req, res) => {
  let data = req.body
  dbserver.updateGroupMsg(data, res)
}