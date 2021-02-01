var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema=mongoose.Schema
var userSchema=new Schema({
    avator:{
        type:String,
        default:'https://s3.ax1x.com/2021/01/28/ySayGT.jpg'
    },
    name:{
    type:String,
    required:true
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:'这个人很懒，什么都没留下'
    },
    lase_modifytime:{
        type:Date,
        default:Date.now,
       
    }
})
module.exports=mongoose.model('User',userSchema)
