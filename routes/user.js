var router = require('express').Router();
var User = require('../models/user');


router.get('/signup',(req,res,next)=>{
    res.render('signup');
});


router.post('/signup', (req,res,next)=>{
    var user= new User();
user.profile.name = req.body.name;
user.email = req.body.email;
user.password = req.body.password;

User.findOne({email: req.body.email}, (err,existinguser)=>{
    if(existinguser){
req.flash('errors','Account with that email address already exists');
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