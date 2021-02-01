const express=require("express")
const Lunbo= require("../models/shouye");
const app=express();
const router=express.Router();
const bodyParser = require('body-parser')
const moment=require('moment')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
router.get(
  "/content",
  (req,res)=>{
    Lunbo.findOne({_id:req.query.id})
      .then(lunbo => {
        if(!lunbo){
          return res.status(404).json("没有任何该id内容~");
        }
        res.json(lunbo);
      }).catch(err => res.status(404).json(err));
}),
router.get(
  "/addcomment",
  (req,res)=>{
    var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
console.log(current_time)
    console.log(req.query.comment)
    Lunbo.updateOne({_id:req.query.id},{$push:{comments:{comment:req.query.comment,date:current_time}}})
      .then(lunbo => {
        res.json(lunbo);
      }).catch(err => res.status(404).json(err));
})
router.get("/", (req,res)=>{
     Lunbo.find()
        .then(lunbo => {
          if(!lunbo){
            return res.status(404).json("没有数据");
          }
          res.json(lunbo);
        }).catch(err => res.status(404).json(err));
  })
  router.post(
    "/add",
    (req,res)=>{
      const LunboField = {};
      if(req.body.address) LunboField.address = req.body.address;
      if(req.body.essay) LunboField.essay = req.body.essay;
      if(req.body.title) LunboField.title = req.body.title;
      if(req.body.picture) LunboField.picture = req.body.picture;
      if(req.body.picture2) LunboField.picture2 = req.body.picture2;
      if(req.body.picture3) LunboField.picture3 = req.body.picture3;
      new Lunbo(LunboField).save().then( lunbo=>{
        res.json(lunbo);
      })
  })
module.exports = router;