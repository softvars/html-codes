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

app.use(express.static('./../Onboarding'));

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
            res.send(returnSuccessData(resData[0]));
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
            if(db.getCollection('steps') && db.getCollection('steps').data){
                resData = db.getCollection('steps').find({"id": id});
                collectData = db.getCollection('steps')
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
                    if(reqData.properties && reqData.properties.length>0){
                        var prop = reqData.properties;
                          console.log("properties",prop);
                     for(var i=0;i<prop.length;i++){
                         
                         if(reqData.properties[i] && reqData.properties[i].id){
                         
                         }
                         else{
                             var currentTime = new Date().getTime();
                            reqData.properties[i].id ="id_"+ currentTime;
                         }
                        
                     }
                         console.log("properties",reqData);
                    }
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
app.post('/product/:id/clone/:mode', function(req, res){
    var products = db.getCollection('products');
    var reqData = req.body;
    var prdId = parseInt(req.params.id);
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
    
  /*  var stepid = db.getCollection('steps') && db.getCollection('steps').maxId || 0;
   var stepData = db.getCollection('steps');
    var stepReqData = stepData.find({"id":prdId});
    console.log("stepNewData data ",stepReqData);
    var stepNewData = stepReqData;
     
    stepNewData.id = stepid + 1;
    for(var i=0;i<stepNewData.length;i++){
     delete stepNewData[i]['$loki'];
    delete stepNewData[i]['meta'];
    }
    
   console.log("stepNewData delete ",stepNewData);
   var insertData = stepData.insert(stepNewData);
    console.log("insertData ",insertData);

    db.saveDatabase();*/

    res.json(returnSuccessData(reqData));
        //db.saveDatabase();//
    });
app.post('/product/:id/step/:step', function(req, res){
    var products = db.getCollection('products');
    var id = parseInt(req.params.id);
     var stepNo = req.params.step;
    var reqData = req.body;
    var product = "";
   // console.log(" widgets ",widgets);
    
        if(products && products.data){
                var queryObj = {"id": id};
                var prdData = products.find(queryObj);
               var stepsData = prdData[0].steps;
                    console.log("steps", stepsData)
                   var stepData =[];
                    stepData=stepsData.filter(function(step){console.log("fileter step",step);
                                                                console.log("stepNo",stepNo)  
                                                                return step.number == stepNo})
                if(stepData && stepData.length>0){
                    
                
                     console.log("stepData",stepData)
                   if(stepData[0] && stepData[0].widgets){
                       console.log("widgets")
                   stepData[0].widgets = reqData.widgets;
                   }
                    else{
                         console.log("else",stepData)
                    stepData[0] = reqData;
                    }
                  products.update(prdData);
                     db.saveDatabase();
                    
                }
            else{
                  console.log(" else steps", prdData[0])
                
                prdData[0].steps.push(reqData);
                console.log(" else steps1", prdData)
                 products.update(prdData);
                 db.saveDatabase();
            }
               res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(prdData[0].steps));
        }
            
              
    
});



app.get('/product/:id/step/:step', function(req, res){
  var products = db.getCollection('products');
    var id = parseInt(req.params.id);
     var stepNo = req.params.step;
    var reqData = req.body;
    var product = "";
   // console.log(" widgets ",widgets);
    
        if(products && products.data){
                var queryObj = {"id": id};
                var prdData = products.find({"id": id});
                if(prdData){
            var stepsData = prdData[0].steps;
           var stepData = stepsData.filter(function(step){return step.number == stepNo})
             res.set({"Content-Type": "application/json"});
            res.type('application/json');
            res.send(returnSuccessData(stepData[0]));
    }}
});


app.get('/category', function(req, res){
   var data = [{
      "name": "Anagrafica",
      "code": "ANAGRAFE"
    },
    {
      "name": "Onboarding",
      "code": "ONBOARDING"
    },
    {
      "name": "Catalogo prodotti",
      "code": "CATALOGO"
    },
    {
      "name": "Antiriciclaggio",
      "code": "ANTIRICICLAGGIO"
    },
    {
      "name": "Sottoscrizione Contratti",
      "code": "CONTRATTI"
    }];
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
    var data = [
    {
      "name": "Nome e Cognome",
      "description": "Widget Nome e Cognome",
      "code": "NOME_COGNOME",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "NOME",
          "name": "nome",
          "description": "Nome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "COGNOME",
          "name": "cognome",
          "description": "Cognome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Codice Fiscale",
      "description": "Widget Codice Fiscale",
      "code": "CODICE_FISCALE",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTI_ABILITATI",
          "name": "Tipologia di clienti",
          "description": "Tipologia di clienti",
          "multi": true,
          "status": [
            {
              "code": "MAGGIORENNE",
              "description": "Il widget/componente prevede abilitazione per gli utenti maggiorenni",
              "style": null
            },
            {
              "code": "MINORENNE",
              "description": "Il widget/componente prevede abilitazione per gli utenti minorenni",
              "style": null
            }
          ]
        },
        {
          "code": "CLIENTE_HYPE",
          "name": "Cliente Hype",
          "description": "Verifica se e cliente hype",
          "multi": false,
          "status": [
            {
              "code": "HYPE",
              "description": "Il widget/componente prevede la verifica se il cliente e cliente hype",
              "style": null
            },
            {
              "code": "NO_HYPE",
              "description": "Il widget/componente esclude la verifica se il cliente e cliente hype",
              "style": null
            }
          ]
        },
        {
          "code": "VERIFICA_RICHIESTE_IN_CORSO",
          "name": "Richieste dallo stesso CF",
          "description": "Verifica se vi sono richieste in corso per lo stesso CF",
          "multi": false,
          "status": [
            {
              "code": "NO_RICHIESTE_IN_CORSO",
              "description": "Il widget/componente esclude la verifica della presenza di richieste gia avviate",
              "style": null
            },
            {
              "code": "RICHIESTE_IN_CORSO",
              "description": "Il widget/componente prevede la verifica della presenza di richieste gia avviate",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CF",
          "name": "cf",
          "description": "Codice Fiscale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Email",
      "description": "Widget email",
      "code": "EMAIL",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "INSERIMENTO_CODICE",
              "description": "Il widget/componente viene validato con codice",
              "style": null
            },
            {
              "code": "INSERIMENTO_DOPPIO",
              "description": "Il widget/componente viene validato con reinserimento",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "CONTROLLO_P2P",
          "name": "Servizio P2P",
          "description": "Verifica se gia P2P",
          "multi": false,
          "status": [
            {
              "code": "NO_P2P",
              "description": "Il widget/componente esclude la verifica P2P",
              "style": null
            },
            {
              "code": "P2P",
              "description": "Il widget/componente prevede la verifica P2P",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "EMAIL",
          "name": "email",
          "description": "Email",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CONFERMA_EMAIL",
          "name": "conferma email",
          "description": "Conferma Email",
          "properties": []
        },
        {
          "code": "CODICE_EMAIL",
          "name": "codice email",
          "description": "Codice Email",
          "properties": []
        }
      ],
      "properties": [
        {
          "code": "TEMPLATE",
          "name": "Codice invia mail"
        },
        {
          "code": "TEMPLATE_OTP",
          "name": "Codice validazione mail"
        }
      ]
    },
    {
      "name": "Cellulare",
      "description": "Widget cellulare",
      "code": "CELLULARE",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "INSERIMENTO_CODICE",
              "description": "Il widget/componente viene validato con codice",
              "style": null
            },
            {
              "code": "INSERIMENTO_DOPPIO",
              "description": "Il widget/componente viene validato con reinserimento",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "CONTROLLO_P2P",
          "name": "Servizio P2P",
          "description": "Verifica se gia P2P",
          "multi": false,
          "status": [
            {
              "code": "NO_P2P",
              "description": "Il widget/componente esclude la verifica P2P",
              "style": null
            },
            {
              "code": "P2P",
              "description": "Il widget/componente prevede la verifica P2P",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CONFERMA_PREF_CELLULARE",
          "name": "conferma prefisso",
          "description": "Conferma prefisso cellulare",
          "properties": []
        },
        {
          "code": "CONFERMA_NUM_CELLULARE",
          "name": "conferma cellulare",
          "description": "Conferma numero cellulare",
          "properties": []
        },
        {
          "code": "PREF_CELLULARE",
          "name": "prefisso",
          "description": "Prefisso cellulare",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NUM_CELLULARE",
          "name": "num cellulare",
          "description": "Numero cellulare",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CODICE_CELLULARE",
          "name": "codice cellulare",
          "description": "Codice cellulare",
          "properties": []
        }
      ],
      "properties": [
        {
          "code": "SERVIZIO",
          "name": "Codice servizio cellulare"
        },
        {
          "code": "TEMPLATE_OTP",
          "name": "Codice validazione cellulare"
        }
      ]
    },
    {
      "name": "Privacy ricontatto",
      "description": "Widget privacy ricontatto",
      "code": "PRIVACY",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "PRIVACY",
          "name": "privacy",
          "description": "Privacy",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Verifica Dati CF",
      "description": "Widget Verifica dati da codice fiscale",
      "code": "VERIFICA_DATI_DA_CF",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "NOME",
          "name": "nome",
          "description": "Nome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "COGNOME",
          "name": "cognome",
          "description": "Cognome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CF",
          "name": "cf",
          "description": "Codice Fiscale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "SESSO",
          "name": "sesso",
          "description": "Sesso",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA",
          "name": "data",
          "description": "Data",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CITTA",
          "name": "citta",
          "description": "Citta",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "PROVINCIA",
          "name": "provincia",
          "description": "Provincia",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Cittadinanza",
      "description": "Widget cittadinanza",
      "code": "CITTADINANZA",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CITTADINANZA",
          "name": "cittadinanza",
          "description": "Cittadinanza",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Residenza",
      "description": "Widget residenza",
      "code": "RESIDENZA",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CITTA",
          "name": "citta",
          "description": "Citta",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "PROVINCIA",
          "name": "provincia",
          "description": "Provincia",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NAZIONE",
          "name": "nazione",
          "description": "Nazione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "INDIRIZZO",
          "name": "indirizzo",
          "description": "Indirizzo",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CAP",
          "name": "cap",
          "description": "Cap",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Domicilio",
      "description": "Widget domicilio",
      "code": "DOMICILIO",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            },
            {
              "code": "SOLA_LETTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati e non modificabili",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CITTA",
          "name": "citta",
          "description": "Citta",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "PROVINCIA",
          "name": "provincia",
          "description": "Provincia",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NAZIONE",
          "name": "nazione",
          "description": "Nazione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "INDIRIZZO",
          "name": "indirizzo",
          "description": "Indirizzo",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "RESIDENZA",
          "name": "residenza",
          "description": "Residenza",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "CAP",
          "name": "cap",
          "description": "Cap",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "ALTRO",
          "name": "altro",
          "description": "Altro",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Riferimento Postale",
      "description": "Widget Riferimento Postale",
      "code": "RIF_POSTALE",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CITTA",
          "name": "citta",
          "description": "Citta",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "PROVINCIA",
          "name": "provincia",
          "description": "Provincia",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NAZIONE",
          "name": "nazione",
          "description": "Nazione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "INDIRIZZO",
          "name": "indirizzo",
          "description": "Indirizzo",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "RESIDENZA",
          "name": "residenza",
          "description": "Residenza",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "DOMICILIO",
          "name": "domicilio",
          "description": "Domicilio",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "CAP",
          "name": "cap",
          "description": "Cap",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "ALTRO",
          "name": "altro",
          "description": "Altro",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Invito intestatari",
      "description": "Widget invito intestatariPostale",
      "code": "INVITO_INTESTATARI",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "INVITO",
          "name": "Invito",
          "description": "Invito",
          "multi": false,
          "status": [
            {
              "code": "INVITO_EMAIL",
              "description": "Il widget/componente prevede la configurazione di invito tramite email",
              "style": null
            },
            {
              "code": "INVITO_SMS",
              "description": "Il widget/componente prevede la configurazione di invito tramite sms",
              "style": null
            }
          ]
        },
        {
          "code": "CF_COINTESTATARIO",
          "name": "CF cointestatario",
          "description": "Viene richiesto il codice fiscale del cointestatario",
          "multi": false,
          "status": [
            {
              "code": "CF",
              "description": "Il widget/componente richiede il CF",
              "style": null
            },
            {
              "code": "NO_CF",
              "description": "Il widget/componente non richiede il CF",
              "style": null
            }
          ]
        },
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "NOME",
          "name": "nome",
          "description": "Nome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "COGNOME",
          "name": "cognome",
          "description": "Cognome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CF",
          "name": "cf",
          "description": "Codice Fiscale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "EMAIL",
          "name": "email",
          "description": "Email",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "PREF_CELLULARE",
          "name": "prefisso",
          "description": "Prefisso cellulare",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NUM_CELLULARE",
          "name": "num cellulare",
          "description": "Numero cellulare",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NOME_1",
          "name": "nome",
          "description": "Nome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "COGNOME_1",
          "name": "cognome",
          "description": "Cognome",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CF_1",
          "name": "cf",
          "description": "Codice Fiscale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "EMAIL_1",
          "name": "email",
          "description": "Email",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "PREF_CELLULARE_1",
          "name": "prefisso",
          "description": "Prefisso cellulare",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NUM_CELLULARE_1",
          "name": "num cellulare",
          "description": "Numero cellulare",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "SERVIZIO",
          "name": "Codice servizio cellulare"
        },
        {
          "code": "TEMPLATE",
          "name": "Codice invia mail"
        }
      ]
    },
    {
      "name": "Dati sensibili",
      "description": "Widget Trattamento dati sensibili",
      "code": "DATI_SENSIBILI",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Professione e Attivita",
      "description": "Widget professioni e attivita",
      "code": "PROFESSIONE_ATTIVITA",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "PROFESSIONE",
          "name": "professione",
          "description": "input professione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "ATTIVITA",
          "name": "attivita",
          "description": "input attivita economica",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "SETTORE",
          "name": "settore",
          "description": "input settore economico",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Residenza Fiscale",
      "description": "Widget Residenza fiscale",
      "code": "RESIDENZA_FISCALE",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "SECONDO_INTESTATARIO",
          "name": "Secondo intestatario",
          "description": "Secondo intestatario",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "NAZIONE",
          "name": "nazione",
          "description": "Nazione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NAZIONE_2",
          "name": "nazione",
          "description": "Nazione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NAZIONE_3",
          "name": "nazione",
          "description": "Nazione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CF_2",
          "name": "cf",
          "description": "Codice Fiscale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "CF_3",
          "name": "cf",
          "description": "Codice Fiscale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "STESSA_NAZIONE",
          "name": "Stessa Nazione",
          "description": "Stessa Nazione",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "ALTRA_NAZIONE",
          "name": "Altra Nazione",
          "description": "Altra Nazione",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "NO_ALTRE_RESIDENZE",
          "name": "No Altre residenze",
          "description": "no altre residenze",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "ALTRE_RESIDENZE",
          "name": "Altre residenze",
          "description": "altre residenze",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Documento",
      "description": "Widget Documento",
      "code": "DOCUMENTO",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "TIPO_DOCUMENTO",
          "name": "Tipo documento",
          "description": "Tipo del documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "ENTE_RILASCIO",
          "name": "ente rilascio",
          "description": "ente di emissione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "LUOGO_RILASCIO",
          "name": "luogo rilascio",
          "description": "luogo di emissione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NUMERO_DOCUMENTO",
          "name": "numero documento",
          "description": "numero del documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA_RILASCIO",
          "name": "data rilascio",
          "description": "data di rilascio",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA_SCADENZA",
          "name": "data scadenza",
          "description": "data di scadenza",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DOCF_UPLOAD",
          "name": "fronte documento",
          "description": "upload fronte documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DOCR_UPLOAD",
          "name": "retro documento",
          "description": "upload retro documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Secondo Documento",
      "description": "Widget Secondo documento",
      "code": "DOCUMENTO_2",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "GIA_CLIENTE",
          "name": "Gia cliente",
          "description": "verifica se utente gia cliente",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "ENTE_RILASCIO",
          "name": "ente rilascio",
          "description": "ente di emissione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "LUOGO_RILASCIO",
          "name": "luogo rilascio",
          "description": "luogo di emissione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NUMERO_DOCUMENTO",
          "name": "numero documento",
          "description": "numero del documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA_RILASCIO",
          "name": "data rilascio",
          "description": "data di rilascio",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA_SCADENZA",
          "name": "data scadenza",
          "description": "data di scadenza",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DOCF_UPLOAD",
          "name": "fronte documento",
          "description": "upload fronte documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DOCR_UPLOAD",
          "name": "retro documento",
          "description": "upload retro documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "BOLLETTA",
          "name": "bolletta",
          "description": "bolletta",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "BUSTA_PAGA",
          "name": "busta paga",
          "description": "busta paga",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "ESTRATTO_CONTO",
          "name": "estratto conto",
          "description": "estratto conto",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "CARTA_IDENTITA",
          "name": "carta identita",
          "description": "carta identita",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "PATENTE",
          "name": "patente",
          "description": "patente",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "PASSAPORTO",
          "name": "passaporto",
          "description": "passaporto",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "PERMESSO_SOGGIORNO",
          "name": "permesso di soggiorno",
          "description": "permesso di soggiorno",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Succursale identificazione",
      "description": "Widget succursale identificazione",
      "code": "SUCCURSALE_IDENTIFICAZIONE",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "SUCCURSALE",
          "name": "succursale",
          "description": "succursale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "TIPO_DOCUMENTO",
          "name": "Tipo documento",
          "description": "Tipo del documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "ENTE_RILASCIO",
          "name": "ente rilascio",
          "description": "ente di emissione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "LUOGO_RILASCIO",
          "name": "luogo rilascio",
          "description": "luogo di emissione",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NUMERO_DOCUMENTO",
          "name": "numero documento",
          "description": "numero del documento",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA_RILASCIO",
          "name": "data rilascio",
          "description": "data di rilascio",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DATA_SCADENZA",
          "name": "data scadenza",
          "description": "data di scadenza",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Termina procedura",
      "description": "Widget termina procedura",
      "code": "TERMINA_PROCEDURA",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [],
      "components": [],
      "properties": [
        {
          "code": "MESSAGGIO_FINALE",
          "name": "Messaggio finale"
        },
        {
          "code": "TEMPLATE_BONIFICO",
          "name": "Template mail se bonifico"
        },
        {
          "code": "TEMPLATE_CLIENTE",
          "name": "Template mail se cliente"
        },
        {
          "code": "TEMPLATE_SELFIE",
          "name": "Template mail se selfie"
        },
        {
          "code": "TEMPLATE_SUCCURSALE",
          "name": "Template mail se succursale"
        }
      ]
    },
    {
      "name": "Selfie",
      "description": "Widget Selfie",
      "code": "SELFIE",
      "category": {
        "name": "Anagrafica",
        "code": "ANAGRAFE"
      },
      "configurations": [
        {
          "code": "GIA_CLIENTE",
          "name": "Gia cliente",
          "description": "verifica se utente gia cliente",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "SELFIE_UPLOAD",
          "name": "selfie",
          "description": "upload selfie",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },{
      "name": "Questionario Antiriciclaggio",
      "description": "Widget questionario antiriciclaggio",
      "code": "ANTIRICICLAGGIO",
      "category": {
        "name": "Antiriciclaggio",
        "code": "ANTIRICICLAGGIO"
      },
      "configurations": [],
      "components": [
        {
          "code": "QUESTIONARIO",
          "name": "Questionario",
          "description": "questionario antiriclaggio",
          "properties": []
        }
      ],
      "properties": []
    }, {
      "name": "Attiva Revoca Firma Digitale",
      "description": "Widget attiva revoca firma digitale",
      "code": "ATTIVA_REVOCA_FIRMA",
      "category": {
        "name": "Sottoscrizione Contratti",
        "code": "CONTRATTI"
      },
      "configurations": [
        {
          "code": "GIA_CLIENTE",
          "name": "Gia cliente",
          "description": "verifica se utente gia cliente",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        },
        {
          "code": "IFRAME",
          "name": "Iframe",
          "description": "iframe",
          "properties": []
        }
      ],
      "properties": [
        {
          "code": "LINK_ADDENDUM",
          "name": "Link Addendum"
        },
        {
          "code": "LINK_ISTRUZIONI",
          "name": "Link Istruzioni"
        },
        {
          "code": "LINK_MANUALE",
          "name": "Link Manuale"
        }
      ]
    },
    {
      "name": "Firma",
      "description": "Widget Firma",
      "code": "FIRMA",
      "category": {
        "name": "Sottoscrizione Contratti",
        "code": "CONTRATTI"
      },
      "configurations": [],
      "components": [
        {
          "code": "IFRAME",
          "name": "Iframe",
          "description": "iframe",
          "properties": []
        }
      ],
      "properties": []
    },
    {
      "name": "Stampa",
      "description": "Widget Stampa",
      "code": "STAMPA",
      "category": {
        "name": "Sottoscrizione Contratti",
        "code": "CONTRATTI"
      },
      "configurations": [],
      "components": [],
      "properties": []
    },
    {
      "name": "Presa Visione Contratti",
      "description": "Widget Presa visione contratti",
      "code": "VISIONE_CONTRATTI",
      "category": {
        "name": "Sottoscrizione Contratti",
        "code": "CONTRATTI"
      },
      "configurations": [],
      "components": [],
      "properties": []
    }, {
      "name": "Bundle prodotto",
      "description": "Widget Bundle prodotto",
      "code": "BUNDLE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "PRIMO_INTESTATARIO",
          "name": "Primo intestatario",
          "description": "Vincolo sul primo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NO_PRIMO_INTESTATARIO",
              "description": "Il widget/componente non ha il vincolo primo intestatario",
              "style": null
            },
            {
              "code": "PRIMO_INTESTATARIO",
              "description": "Il widget/componente ha il vincolo primo intestatario",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CODICE_PRODOTTO",
          "name": "codice prodotto",
          "description": "Codice prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NOME_PRODOTTO",
          "name": "nome prodotto",
          "description": "nome prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "IMMAGINE_PRODOTTO",
          "name": "immagine prodotto",
          "description": "immagine prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DESCR_PRODOTTO",
          "name": "descrizione prodotto",
          "description": "descrizione prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Interessi conto corrente",
      "description": "Widget interessi conto corrente",
      "code": "INTERESSI_CC",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [],
      "components": [
        {
          "code": "INTERESSI",
          "name": "interessi",
          "description": "flag interessi conto corrente",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Documentazione informativa",
      "description": "Widget di documentazione informativa",
      "code": "DOCUMENTAZIONE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "CODICE_BANCA",
          "name": "Codice banca"
        },
        {
          "code": "CODICE_PRODOTTO",
          "name": "Codice Prodotto"
        },
        {
          "code": "DESCR_PRODOTTO",
          "name": "Descrizione Prodotto"
        },
        {
          "code": "DESCR_PRODOTTO_2",
          "name": "Descrizione Prodotto 2"
        },
        {
          "code": "DESCR_PRODOTTO_3",
          "name": "Descrizione Prodotto 3"
        },
        {
          "code": "DESCR_PRODOTTO_4",
          "name": "Descrizione Prodotto 4"
        },
        {
          "code": "LINK",
          "name": "Link documentazione"
        },
        {
          "code": "LINK_2",
          "name": "Link documentazione 2"
        },
        {
          "code": "LINK_3",
          "name": "Link documentazione 3"
        },
        {
          "code": "LINK_4",
          "name": "Link documentazione 4"
        },
        {
          "code": "NOME_PRODOTTO",
          "name": "Nome Prodotto"
        },
        {
          "code": "NOME_PRODOTTO_2",
          "name": "Nome Prodotto 2"
        },
        {
          "code": "NOME_PRODOTTO_3",
          "name": "Nome Prodotto 3"
        },
        {
          "code": "NOME_PRODOTTO_4",
          "name": "Nome Prodotto 4"
        }
      ]
    },
    {
      "name": "Cronistoria rapporti",
      "description": "Widget consenso cronistoria rapporti",
      "code": "CRONISTORIA",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Promozione prodotti",
      "description": "Widget consenso promozione prodotti banca",
      "code": "PROMOZIONE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Promozione prodotti terzi",
      "description": "Widget consenso promozione prodotti terzi",
      "code": "PROMOZIONE_TERZI",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Profilazione",
      "description": "Widget consenso profilazione",
      "code": "PROFILAZIONE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Scelta Succursale",
      "description": "Widget scelta succursale",
      "code": "SUCCURSALE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "SUCCURSALE",
          "name": "succursale",
          "description": "succursale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },    {
      "name": "Label",
      "description": "Widget Label",
      "code": "LABEL",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [
        {
          "code": "LABEL",
          "name": "label",
          "description": "Label",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Invito al login",
      "description": "Widget invito al login",
      "code": "INVITO_LOGIN",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [],
      "properties": []
    },
    {
      "name": "Obbligo di login",
      "description": "Widget obbligo di login nel caso CF sia cliente",
      "code": "LOGIN_SE_CLIENTE",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [],
      "properties": []
    },
    {
      "name": "Numero intestatari",
      "description": "Widget numero intestatari",
      "code": "NUMERO_INTESTATARI",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "MAX_INTESTATARI",
          "name": "Max intestatari",
          "description": "Massimo numero intestatari",
          "multi": false,
          "status": [
            {
              "code": "MAX_2_INTESTATARI",
              "description": "Il widget/componente prevede massimo due intestatari",
              "style": null
            },
            {
              "code": "MAX_3_INTESTATARI",
              "description": "Il widget/componente prevede massimo tre intestatari",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "INTESTATARI_1",
          "name": "un intestatario",
          "description": "A me",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "INTESTATARI_2",
          "name": "due intestatari",
          "description": "A me e una persona",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "INTESTATARI_3",
          "name": "tre intestatari",
          "description": "A me e a due persone",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Numero fisso intestatari",
      "description": "Widget numero fisso di intestatari",
      "code": "INTESTATARI_FISSI",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "NUM_INTESTATARI",
          "name": "Num intestatari",
          "description": "Numero intestatari",
          "multi": false,
          "status": [
            {
              "code": "2_INTESTATARI",
              "description": "Il widget/componente prevede due intestatari",
              "style": null
            },
            {
              "code": "3_INTESTATARI",
              "description": "Il widget/componente prevede tre intestatari",
              "style": null
            }
          ]
        },
        {
          "code": "VISUALIZZAZIONE",
          "name": "ModalitÃ Â di visualizzazione",
          "description": "ModalitÃ  di visualizzazione",
          "multi": false,
          "status": [
            {
              "code": "MOSTRA",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [],
      "properties": [
        {
          "code": "DESCRIZIONE",
          "name": "Descrizione"
        },
        {
          "code": "NUM_INTESTATARI",
          "name": "Numero intestatari"
        }
      ]
    },
    {
      "name": "Numero intestatari conto",
      "description": "Widget numero intestatari ereditato da conto di addebito",
      "code": "CONTO_INTESTATARI",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [
        {
          "code": "LABEL",
          "name": "label",
          "description": "Label",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Categoria di identificazione",
      "description": "Widget categoria di identificazione",
      "code": "CAT_IDENTIFICAZIONE",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "IDENTIFICAZIONE",
          "name": "Metodologia identificazione",
          "description": "Metodologia identificazione",
          "multi": true,
          "status": [
            {
              "code": "BONIFICO",
              "description": "Il widget/componente prevede identificazione tramite bonifico",
              "style": null
            },
            {
              "code": "PERSONA",
              "description": "Il widget/componente prevede identificazione di persona",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "IDENT_BONIFICO",
          "name": "bonifico",
          "description": "Identificazione tramite bonifico",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "IDENT_PERSONA",
          "name": "di persona",
          "description": "Identificazione di persona",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "IDENT_WEBCAM",
          "name": "webcam",
          "description": "Identificazione tramite webcam",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Modalita identificazione",
      "description": "Widget Modalita identificazione",
      "code": "MOD_IDENTIFICAZIONE",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "IDENTIFICAZIONE",
          "name": "Metodologia identificazione",
          "description": "Metodologia identificazione",
          "multi": true,
          "status": [
            {
              "code": "BONIFICO_1_DOCUMENTO",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "BONIFICO_2_DOCUMENTI",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "PERSONA",
              "description": "Il widget/componente prevede identificazione di persona",
              "style": null
            },
            {
              "code": "SELFIE_1_DOCUMENTO",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "SELFIE_2_DOCUMENTI",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "SELFIE_BONIFICO_DOCUMENTO",
              "description": "Il widget/componente viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "CF_ANAGRAFE",
          "name": "Cf anagrafe",
          "description": "Cf gia presente in anagrafica",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "SELFIE_BONIFICO_DOCUMENTO",
          "name": "Selfie Bonifico Documento",
          "description": "Selfie, Bonifico e Documento",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "BONIFICO_2_DOCUMENTI",
          "name": "Bonifico 2 Documenti",
          "description": "Bonifico e 2 documenti",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "BONIFICO_1_DOCUMENTO",
          "name": "Bonifico 1 Documento",
          "description": "Bonifico e 1 documento",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "SELFIE_2_DOCUMENTI",
          "name": "Selfie 2 Documenti",
          "description": "Selfie e 2 documenti",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "SELFIE_1_DOCUMENTO",
          "name": "Selfie 1 Documento",
          "description": "Selfie e 1 documento",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "PERSONA",
          "name": "Persona",
          "description": "Di persona",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Bonifico",
      "description": "Widget bonifico",
      "code": "BONIFICO",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "GIA_CLIENTE",
          "name": "Gia cliente",
          "description": "verifica se utente gia cliente",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [],
      "properties": [
        {
          "code": "IBAN",
          "name": "IBAN Bonifico"
        },
        {
          "code": "SERVIZIO",
          "name": "Codice servizio cellulare"
        }
      ]
    },
    {
      "name": "Attesa",
      "description": "Widget attesa",
      "code": "ATTESA",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [],
      "properties": [
        {
          "code": "TEMPLATE",
          "name": "Codice invia mail"
        }
      ]
    },
    {
      "name": "Tipologia Carta",
      "description": "Widget Tipologia Carta",
      "code": "TIPOLOGIA_CARTA",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CARTA_FISICA",
          "name": "Carta Fisica",
          "description": "radio carta fisica",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "CARTA_VIRTUALE",
          "name": "Carta Virtuale",
          "description": "radio carta virtuale",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
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