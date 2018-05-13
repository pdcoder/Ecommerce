var router = require('express').Router;
var User = require('../models/user');


router.get('/signup',(req,res,next)=>{
    res.render('home');
});


router.post('/signup', (req,res,next)=>{
    var user= new User();
user.profile.name = req.body.name;
user.email = req.body.email;
user.password = req.body.password;

User.findOne({email: req.body.email}, (err,existinguser)=>{
    if(existinguser){
    console.log(req.body.email + " already existis ");
    }
    else{
user.save((err,user)=>{
    if (err)
    return next(err);

    res.json("new user created");
});
    }
});
});
module.exports = router ;