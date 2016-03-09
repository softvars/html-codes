var express = require('express');
var bodyParser = require('body-parser');
var loki = require('lokijs');
var app = express();
var router = express.Router();
var db = new loki('db4.json');
db.loadDatabase();
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
app.post('/product/:id/step/:step', function(req, res){
    var widgets = db.getCollection('steps') || db.addCollection('steps',{ indices: ['id'] });
    var id = parseInt(req.params.id);
     var stepNo = req.params.step;
    var reqData = req.body;
    var product = "";
    console.log(" widgets ",widgets);
    if(id) {
        if(widgets && widgets.data){
                var queryObj = {"id": id};
                var widData = widgets.find({'$and':[{"id": id},{"number": stepNo}]});
                console.log("reqData",reqData)
                if(widData && widData.length>0){
                     widData.widgets = reqData.widgets;
                   
                    console.log("widgets1:",reqData.widgets);
                    widgets.update(widData);

                    console.log("update product step :" + widData);
                     db.saveDatabase();
                }
                else{
                    console.log("elsepart:",widData);
                 
                   reqData.id = id;
                    var insertData = widgets.insert(reqData);
                     db.saveDatabase();
                    console.log("collectData:",db.getCollection('steps').data);

                }
            }


            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(widgets.data));
        //db.saveDatabase();//
    }
});
app.post('/product/:id/clone/:mode', function(req, res){
    var products = db.getCollection('products');
    var reqData = req.body;
    console.log("inserting data ",reqData);
    //var reqData = JSON.parse(body);
    
    var id = db.getCollection('products') && db.getCollection('products').maxId || 0;
    console.log("@@@@@@@@@reqData ",reqData);
    reqData.id = id + 1;
    delete reqData['$loki'];
    delete reqData['meta'];
    reqData.createDate =new Date().getTime();
    reqData.updateDate = new Date().getTime();
    console.log("inserting data ",reqData);
    var insertData = products.insert(reqData);
    console.log("insertData ",insertData);

    db.saveDatabase();

    res.json(returnSuccessData(reqData));
        //db.saveDatabase();//
    });
app.get('/product/:id/step/:step', function(req, res){
    var widgets = db.getCollection('steps');
    var id = parseInt(req.params.id);
    var stepNo = req.params.step
    //var reqData = req.body;
    console.log("pid:" + id);
    var product = "";

    if(id) {
        db.loadDatabase({}, function () {
            if(widgets && widgets.data){
 
                var queryObj = {"id": id,"number": stepNo};
                console.log("####queryObj#######",queryObj) ;
                var widData = widgets.find({'$and':[{"id": id},{"number": stepNo}]});
                console.log(widData);
                
            }
            //db.saveDatabase();
            res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(widData));
        });
    }
});

app.delete('/product/:id', function (req, res) {
     var id = parseInt(req.params.id);
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
app.post('/product/:id', function (req, res) {
     var products = db.getCollection('products');
    var id = parseInt(req.params.id);
    var reqData = req.body;
    if(id) {
        if(products && products.data){
            var queryObj = {"id": id};
                var prdData = products.find(queryObj);
                console.log("reqData",reqData)
                if(prdData && prdData.length>0){
                    products.update(reqData);
                    db.saveDatabase();
                }
                else{
                    reqData.id=id;
                    var insertData = products.insert(reqData);
                     db.saveDatabase();
                    

                }
            
              res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(products.data));
        
        }
       
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

app.get('/widget?:category', function(req, res){
    var catId = req.query.category;
    //console.log(req.query.category)
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
    "configurations": ['testMail', 'testMail2' ],
    "components": ['testMailComp'],
    "properties": ['testprop']
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
 widgets.where(function( obj ){ if(obj.category.code == catId){ resData.push(obj);} });


}
 res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send( returnSuccessData(resData));


});
//app.use(router);
app.listen(3000);
console.log("Server Started http://localhost:3000");