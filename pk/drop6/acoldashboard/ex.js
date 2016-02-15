var express = require('express');
var bodyParser = require('body-parser');
var loki = require('lokijs');

var app = express();
var router = express.Router();
var db = new loki('db4d.json');
var productResponseData='';

function returnSuccessData(data){
    var resp = {
        "status": "OK",
        "message": null,
        "data": data
    }
    //return JSON.stringify(resp);
    return resp;
}

function returnErrorData(errorCode,data){
    var resp = {
        "status": "KO",
        "message": data,
        "data": []
    }
    return JSON.stringify(resp);
}

app.use(express.static('./../acoldashboard'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/product', function(req, res){
    var reqData = req.body;
    console.log("inserting data ",reqData);
    //var reqData = JSON.parse(body);
    var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    var id = db.getCollection('products') && db.getCollection('products').maxId || 0;
    console.log("Id ",id);
    reqData['id'] = id + 1;
    reqData.createDate =new Date().getTime();
    reqData.updateDate = new Date().getTime();
    console.log("inserting data ",reqData);
    var insertData = products.insert(reqData);
    console.log("insertData ",insertData);

    db.saveDatabase();

    res.json(returnSuccessData(reqData));
});

app.get('/api/product', function(req, res){
    //var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    db.loadDatabase({}, function () {
        if(db.getCollection('products') && db.getCollection('products').data){
            productResponseData = db.getCollection('products').data;
        }
        res.set({"Content-Type": "application/json"});
        res.type('application/json');
        res.send( returnSuccessData(productResponseData));
    })
});

app.get('/api/product/:id', function(req, res){
    //var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    var id = parseInt(req.params.id);
    console.log("pid:" + id);
    var resData = "";
    if(id) {
        db.loadDatabase({}, function () {
            if(db.getCollection('products') && db.getCollection('products').data){
                resData = db.getCollection('products').find({"id": id});
            }
            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send( returnSuccessData(resData));
        });
    }
});
//app.use(router);
app.listen(3000);