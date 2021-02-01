let express = require('express')

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = new mongoose.Schema({
    addTime:{
        type: Date,
        default: Date.now
    },
    content:{
        type:String
    },
    writer:{
        type:String
    },
    from:{
        type:String
    },
    to:{
        type:String
    },
    Mood:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'trends'
    }
    
})