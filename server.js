var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyp = require('body-parser');
var User = require('./models/user');
var ejs = require('ejs');
var engine = require('ejs-mate');
var routes = require('./routes/user');
var session = require('express-session');
var cookie = require('cookie-parser');
var flash= require('express-flash');
var MongoStore = require('mongo-connect')(session);
require('./config/keys');


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
    secret:"pd@123",
    store: new MongoStore({url: 'mongodb://pdcoder:pdcoder@ds111895.mlab.com:11895/pdcoder',autoReconnect:true})
}));
app.use(flash());


app.use(routes);


app.listen(4000);