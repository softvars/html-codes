var express = require('express');
var bodyParser = require('body-parser');
var loki = require('lokijs');

var app = express();
var router = express.Router();
var db = new loki('db4.json');
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
//var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
app.post('/api/product', function(req, res){
     var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    var reqData = req.body;
    console.log("inserting data ",reqData);
    //var reqData = JSON.parse(body);
    
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
    var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    db.loadDatabase({}, function () {
        if(products && products.data){
            productResponseData = products.data;
        }
        res.set({"Content-Type": "application/json"});
        res.type('application/json');
        res.send( returnSuccessData(productResponseData));
    })
});

app.get('/api/product/:id', function(req, res){
    var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    var id = parseInt(req.params.id);
    console.log("pid:" + id);
    var resData = "";
   
    if(id) {
        db.loadDatabase({}, function () {
            if(products && products.data){
                resData = products.find({"id": id});
                  console.log("resData:" + resData);
            }
              console.log("resData1:" + resData);
            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(resData));
        });
    }
});
app.post('/api/product/:id/step', function(req, res){
    var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    var id = parseInt(req.params.id);
    var reqData = req.body;
    console.log("pid:" + id);
    var product = "";
   
    if(id) {
        db.loadDatabase({}, function () {
            if(products && products.data){
                product = products.find({"id": id});
                product.widgets[reqData.step] = reqData.widgets;
                products.update(product);
                console.log("update product step :" + product);
            }
            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(product));
        });
    }
});

app.delete('/api/product/:id', function (req, res) {
     var id = parseInt(req.params.id);
    console.log("pid:" + id);
    var resData = "";
    var collectData ='';
    if(id) {
        db.loadDatabase({}, function () {
            if(db.getCollection('products') && db.getCollection('products').data){
                resData = db.getCollection('products').find({"id": id});
                collectData = db.getCollection('products')
                collectData.remove(resData);
                db.saveDatabase();
                
            }
            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send( returnSuccessData([]));
        });
    }
});
app.get('/api/category', function(req, res){
   var data = [{"name": "Anagrafica","code": "ANAGRAFE"},
                            {"name": "Onboarding","code": "ONBOARDING"},
                            {"name": "Catalogo prodotti","code": "CATALOGO"}];
        res.set({"Content-Type": "application/json"});
        res.type('application/json');
        res.send(returnSuccessData(data));
});

app.get('/api/widget', function(req, res){
   var data = [{
    "name": "Email",
    "description": "Widget email",
    "code": "EMAIL",
    "category": {
      "name": "Anagrafica",
      "code": "ANAGRAFE"
    },
    "configurations": [{
      "code": "VALIDAZIONE",
      "name": "Validazione",
      "description": "Validazione",
      "multi": false,
      "status": [{
        "code": "INSERIMENTO_CODICE",
        "description": "Il widget/componente viene validato con codice",
        "style": null
      }, {
        "code": "INSERIMENTO_DOPPIO",
        "description": "Il widget/componente viene validato con reinserimento",
        "style": null
      }, {
        "code": "NON_VALIDARE",
        "description": "Il widget/componente non viene validato",
        "style": null
      }]
    }],
    "components": [{
      "code": "CODICE_EMAIL",
      "name": "codice email","description": "Codice Email",
      "properties": []
    }, {
      "code": "CONFERMA_EMAIL",
      "name": "conferma email",
      "description": "Conferma Email",
      "properties": []
    }, {
      "code": "EMAIL",
      "name": "email",
      "description": "Email",
      "properties": [{
        "code": "VALUE"
      }]
    }],
    "properties": [{
      "code": "TEMPLATE",
      "name": "Codice invia mail"
    }]
  }];

        res.set({"Content-Type": "application/json"});
        res.type('application/json');
        res.send(returnSuccessData(data));
});
//app.use(router);
app.listen(3000);