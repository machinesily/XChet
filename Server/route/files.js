//引入附件上传插件
var multer = require('multer')
//动态生成目录
var mkdir = require('../dao/mkdir')

 
//磁盘存储引擎可以让你控制文件的存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //保存路径
    let url = req.body.url
    mkdir.mkdirs('../data/'+url,err => {
      console.log(err);
    })

    cb(null, './data/'+url)
  },
  //文件名
  filename: function (req, file, cb) {
    let name = req.body.name
    //正则匹配后缀名
    let type = file.originalname.replace(/.+\./,".")
    // console.log(type);
    cb(null,name+type)
  }
})

var upload = multer({ storage: storage })

module.exports = function (app){
  //前端文件上传
  app.post('/files/upload', upload.array('file', 10), function (req, res, next) {
   //获取图片名
    let data = req.files[0].filename
   //返回前端图片名
    res.send(data)

  })
}