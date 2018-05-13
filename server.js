var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.send("Hi!");
});

app.listen(4000);