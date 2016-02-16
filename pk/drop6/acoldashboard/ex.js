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
app.post('/product', function(req, res){
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

app.get('/product', function(req, res){
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

app.get('/product/:id', function(req, res){
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
app.post('/product/:id/step', function(req, res){
    var widgets = db.getCollection('widgets') || db.addCollection('widgets',{ indices: ['id'] });
    var id = parseInt(req.params.id);
    var reqData = req.body;
    console.log("pid:" + id);
    var product = "";
   
    if(id) {
        db.loadDatabase({}, function () {
            console.log("widgets:",widgets)
             console.log("widgetsdata:",widgets.data)
            if(widgets && widgets.data){
                  console.log("widgetsdata:",widgets.data)
               var widData = widgets.find({"id": id});
                if(widData){
                    widgets.update(reqData.widgets);
                }
                
                else{
                widgets.insert(reqData.widgets);}
               // products.update(product);
                console.log("update product step :" + widgets);
            }
            db.saveDatabase();
            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(widgets));
        });
    }
});

app.delete('/product/:id', function (req, res) {
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
app.get('/category', function(req, res){
   var data = [{"name": "Anagrafica","code": "ANAGRAFE"},
                            {"name": "Onboarding","code": "ONBOARDING"},
                            {"name": "Catalogo prodotti","code": "CATALOGO"}];
        res.set({"Content-Type": "application/json"});
        res.type('application/json');
        res.send(returnSuccessData(data));
});

app.get('/widget?:category', function(req, res){
    var catId = req.query.category;
    console.log(req.query.category)
    var widgets = db.getCollection('widgetList');
   if(!widgets){
       widgets = db.addCollection('widgetList');
    var data = [{
    "name": "Email",
    "description": "Widget email",
    "code": "EMAIL",
    "category": {
      "name": "Anagrafica",
      "code": "ANAGRAFE"
    },
    "configurations": [],
    "components": [],
    "properties": []
  },{
    "name": "Nome e Cognome",
    "description": "Widget Nome e Cognome",
    "code": "NOME_COGNOME",
    "category": {
      "name": "Anagrafica",
      "code": "ANAGRAFE"
    },
    "configurations": [],
    "components": [],
    "properties": []
  },{
    "name": "Codice promozionale",
    "description": "Widget Codice promozionale",
    "code": "CODICE_PROMOZIONALE",
    "category": {
      "name": "Onboarding",
      "code": "ONBOARDING"
    },
    "configurations": [],
    "components": [],
    "properties": []
  },
   {
    "name": "Codice fiscale",
    "description": "Widget Codice fiscale",
    "code": "CODICE_FISCALE",
    "category": {
      "name": "Onboarding",
      "code": "ONBOARDING"
    },
    "configurations": [],
    "components": [],
    "properties": []
  },{
    "name": "Cittadinanza",
    "description": "Widget Cittadinanza",
    "code": "CITTADINANZA",
    "category": {
      "name": "Catalogo prodotti",
      "code": "CATALOGO"
    },
    "configurations": [],
    "components": [],
    "properties": []
  }
];
       widgets.insert(data);
   
   }
 if(catId) {
    var resData = [];
 widgets.where(function( obj ){ if(obj.category.code == catId){ console.log(obj); resData.push(obj);} });


}
 res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send( returnSuccessData(resData));
       
    
});
//app.use(router);
app.listen(3000);