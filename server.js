var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyp = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var passport = require('passport');
var session = require('express-session');
var cookie = require('cookie-parser');
var flash= require('express-flash');
var MongoStore = require('connect-mongo')(session);

var cartlength = require('./middlewares/middlewares');
var secret = require('./config/keys'); 
var Category = require('./models/category');
var routesuser = require('./routes/user');
var routesadmin = require('./routes/admin');
var User = require('./models/user');
var main = require('./routes/main');
var apiroutes = require('./api/api');

var app = express();
app.use(express.static(__dirname +'/public'));
app.use(morgan('dev'));
app.use(bodyp.json());
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(cookie());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:secret.secret,
    store: new MongoStore({url: secret.database,autoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routesuser);
app.use(routesadmin);
app.use('/api',apiroutes);
app.use(main);

app.use((req,res,next)=>{
    res.locals.user = req.user;
});
app.use(cartlength);
app.use((req,res,next)=>{
    Category.find({},(err,categories)=>{
        if(err) return next(err);
       return  res.locals.categories = categories;
        next();
    });
});




app.listen(4400,(err)=>{
    if (err) throw err;
    console.log("server running");
});