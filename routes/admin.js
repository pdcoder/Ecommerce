var router = require('express').Router();
var Category = require('../models/category');

router.get('/addcategory',(req,res,next)=>{
    res.render('addcategory', {message: req.flash('success')});
});

router.post('/addcategory',(req,res,next)=>{
    var category = new Category();
    category.name = req.body.name;

    category.save((err)=>{
        if (err) return next(err);
        req.flash('success','Successfully added a category');
        return res.redirect('/addcategory');

    });
});

module.exports = router;