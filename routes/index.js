var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register',function (req,res) {
    const {username,password}=req.body
    if(username){

    }else{

    }

})
module.exports = router;
