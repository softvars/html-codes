var express = require('express');
var fs = require('fs');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'appversion, content-type');
    next();
});

console.log('Server started on port ' + ( 1338));

app.listen(1338);

app.get('/', function(req,res){
    res.send(200, { nodversion: process.version });
});

app.post('/', function(req,res){

    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin','*');

    var send = function(data){ res.send(data); };
    console.log("req ",req);
    switch(req.body.function){
        case 'htmlContent':
            break;
        default:
            res.send(200, { nodversion: process.version });
            break;
    }

});

