var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyp = require('body-parser');
var User = require('./models/user');
var ejs = require('ejs');
var engine = require('ejs-mate');
var router = require('./routes/user');
require('./config/keys');


var app = express();
app.use(express.static(__dirname +'/public'));
app.use(morgan('dev'));
app.use(bodyp.json());
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.post('/create_user',(req,res)=>{
var user = new User();
user.profile.name = req.body.name;
user.password = req.body.password;
user.email = req.body.email;

user.save((err)=>{
    if (err) return next(err);
    res.json('Successfully created record');

})
});


app.get('/',(req,res)=>{
res.render('home')});

app.listen(4000);