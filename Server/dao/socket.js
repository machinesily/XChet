let dbserver = require('./dbserver')

module.exports = (io) => {
  //socket注册用户
  var users = {}
  io.on('connection', socket => {
    //socket注册用户
    // 用户登录注册
    socket.on('login', (id) => {
      socket.name = id
      users[id] = socket.id
      console.log(users);
    })

    //用户一对一消息发送
    socket.on('msg', (msg, uid, fid) => {
      //发送给对方
      console.log(msg);
      dbserver.upFriendLastTime(uid,fid)
      dbserver.inserMsg(uid,fid,msg.message,msg.type)
      if (users[fid]) {
        socket.to(users[fid]).emit('msg', msg, uid, 0)
      }


      //发送给自己
      socket.emit('msg', msg, fid, 1)
    })

    //用户离开
    socket.on('disconnecting', () => {
      if (users.hasOwnProperty(socket.name)) {
        delete users[socket.name]
      }
      console.log(socket.id + '离开');
    })
  })

}