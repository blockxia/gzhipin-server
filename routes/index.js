var express = require('express');
var router = express.Router();
const UserModel=require('../db/models').UserModel
const md5=require('blueimp-md5')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.post('/register',function (req,res) {
    const {username,password}=req.body
    if(username==='admin'){
       res.send({code:1,msg:'此用戶已存在'})
    }else{
      res.send({code:0,data:{username,password}})
    }*/
// })
router.post('/register',function (req,res) {
    const {username,password,type}=req.body
  UserModel.findOne({username},function (err,user) {
      if(user){
          res.send({code:1,msg:'此用户已存在'})
      }else{
          new UserModel({username,password:md5(password),type}).save(function (err,user) {
              const userid=user._id
              res.cookie('userid',userid,{maxAge:1000*60*60*24*7})
              res.send({code:0,data:{_id:userid,username,type}})
          })
      }
  })
})
router.post('/login',function (req,res) {
    const {username,password}=req.body
    UserModel.findOne({username,password:md5(password)},{password:0,__v:0},function (err,user) {
        if(user){
            res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
            res.send({code:0,data:user})
        }else{
            res.send({code:1,msg:'用户名或密码错误!'})
        }
    })
})

module.exports = router;
