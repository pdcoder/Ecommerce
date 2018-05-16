var router = require('express').Router();
var User = require('../models/user');
var passportConf = require('../config/passport');
var passport = require('passport');
var async = require('async');
var Cart = require('../models/cart');

router.get('/login',(req,res)=>{
    if(req.user) return res.redirect('/');
    res.render('login',{message: req.flash('loginMessage')}); 
});

router.post('/login',passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash: true
}));


router.get('/signup',(req,res,next)=>{
    res.render('signup',{
        errors: req.flash('errors')
    });
});


router.post('/signup', (req,res,next)=>{

    async.waterfall([
        (callback)=>{
            var user= new User();
            user.profile.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
        user.profile.picture = user.gvatar();
            User.findOne({email: req.body.email}, (err,existinguser)=>{
            if(existinguser){
             req.flash('errors','Account with that email address already exists');
            }
            else{
            user.save((err,user)=>{
            if (err)
            return next(err);
        callback(null,user);
        });
            }
        });
        },
       function (user){
var cart = new Cart();
cart.owner = user._id;
cart.save((err)=>{
    req.logIn(user,(err)=>{
        if (err) return next(err);
        res.redirect('/profile');
    });
});
        }
    ]);
   
});

router.get('/profile',(req,res,next)=>{
    User.findOne({_id:req.user._id},(err,user)=>{
        if (err) return  next(err);
        res.render('profile',{user:user});
    });
});

router.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/');

});

module.exports = router ;