var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema=mongoose.Schema
var PdMoodSchema=new Schema({
    addTime:{
        type: Date,
        default: Date.now
    },
    content:String, //用户发表内容
    writer:{
       type: mongoose.Schema.Types.ObjectId, //这里的类型是User里面的id
       ref:'users'//关联User集合
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments'
    }],
})
module.exports=mongoose.model('User',PdMoodSchema)
