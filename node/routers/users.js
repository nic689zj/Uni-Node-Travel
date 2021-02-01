const express=require("express")
const User= require("../models/users");
const app=express();
const jwt = require("jsonwebtoken");
const router=express.Router();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');//加密
const passport = require("passport");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.get('/all',(req,res)=>{
    res.json({msg:"users test api works"})
})


router.post('/register',function(req,res){
    var body=req.body
    User.findOne({
      email:req.body.email,
  }).then((user)=>{
      if(user){
         return  res.status(400).json('该邮箱已经存在')
      }
   
      const newUser=User({
          name:body.name,
          email:body.email,
          password:body.password
      })
      bcrypt.genSalt(10,function(err,salt){
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err) throw err;
              newUser.password=hash
              newUser.save().then(user=>res.json(user)).catch(console.log(err))
          })
      })
  })
})
router.get('current',(req,res)=>{
    res.json({msg:"success"})
})
router.post('/login',function(req,res){
    console.log(req.body)
    var body=req.body
   const name=body.name
   const password=body.password
   User.findOne({name
   }).then(user=>{
       if(!user){
           return res.status(404).json({emai:'用户不存在'})
       }
       bcrypt.compare(password,user.password).then(isMatch=>{
           if(isMatch){
               const rule={id:user.id,name:user.name}
              jwt.sign(rule,'secret',{expiresIn:36000},(err,token)=>{
                  res.json({
                      success:true,
                      token:'Bearer '+token
                  })
              })
           }
           
           else{
               return res.status(400).json({password:'密码错误'})
           }
       })
   })
})
router.get(
    "/current",
    passport.authenticate("jwt",{session:false}), // 用户权限验证
    (req,res) => {
      res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
      });
  })
module.exports = router;