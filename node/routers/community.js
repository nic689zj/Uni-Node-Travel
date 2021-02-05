const express=require('express')
const router= express.Router()
const multer= require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
    // 指定文件路径
        cb(null, './static/img')
    },
    filename: function(req, file, cb) {
    // 指定文件名


        //文件名重复覆盖
        // 后缀名发生改变,如何解决？👇
    console.log('----',file)
    let exts=file.originalname.split('.') //拿到源文件的后缀名
    let ext=exts[exts.length-1]
    
    let tmpname=(new Date()).getTime()+parseInt(Math.random()*9999)  //为了避免重复，用时间戳表示
        cb(null, `${tmpname}.${ext}`);
    }
});
var upload = multer({
    storage: storage
});
//上传图片必须用post方法
router.post('/upload',upload.single('hehe'),(req,res)=>{////hehe就是上传图片数据的key值，前端必须保持统一。可以用postman模拟，数据类型是表单对象。
    console.log(req.file)
    let {size,mimetype,path}=req.file
    let types=['jpg','jpeg','png','gif'] //允许上传的数据类型
    let tmpType=mimetype.split('/')[1]
    if(size>500000){
        return  res.send({err:-1,msg:'尺寸过大'})
    }else if(types.indexOf(tmpType)==-1){
        return  res.send({err:-2,msg:'媒体类型错误'})
    }else{
      let url=`/public/img/${req.file.filename}`
      res.send({err:0,msg:'ok',img:url})
    }
    
   
  })