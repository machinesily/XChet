var jwt = require('jsonwebtoken')
var secret = 'XChet' //签名


//生成token
exports.generateToken = function (e) {
  let payload = { //负载
    id: e,
    time: new Date()
  }
  let token = jwt.sign(payload, secret, {
    expiresIn: 60 * 60 * 24 * 120 //有效时间120天
  })
  return token
}

//解码token
exports.verifyToken = (e)=>{
  let payload
  jwt.verify(e,secret,(err,result)=>{
    if(err){
      payload = 0
    }else{
      payload = 1
    }
  })
  return payload
}