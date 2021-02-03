const express=require("express")

const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const passport = require("passport");  
require("./config/passport")(passport); 
const app=express();
var cors=require("cors");
app.use(cors()); 
const users=require('./routers/users')
const shouye=require('./routers/shouye')
// 使用body-parser中间件

app.use(passport.initialize());  

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/shouye",shouye)
app.use("/users",users)

app.listen(3002,()=>{
    console.log('服务器启动成功')
})