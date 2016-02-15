/* Hello, World! program in node.js */
//console.log("Hello, World!");

//var http = require("http");

var server_running_port = 1002;
var sys = require("sys"),
    my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");

var loki = require('lokijs');
var db = new loki('acolDB.json');
var products = db.getCollection('products') || db.addCollection('products', {indices: ['id']});
var environments  = db.getCollection('environments') || db.addCollection("environments");
var productResponseData = {};

var req_url = function (url) {
    this.url = url;
};
req_url.prototype.url = null;
req_url.prototype.startsWith = function (starts) {
    if (starts && this.url) {
        var length = starts.length;
        return (this.url.substring(0, length) === starts)
    }
    return false;
}

while(environments.data[0]) {
    environments.remove(environments.data[0]);
}

environments.insert([{"code": "TEMP","name": "temporary","descr": "temporary environment"},
                     {"code": "TEST","name": "test","descr": "test environment"},
                     {"code": "PRE","name": "preproduction","descr": "preproduction environment"},
                     {"code": "PROD","name": "production","descr": "production environment"}]);
db.saveDatabase();

my_http.createServer(function (request, response) {

    var requrl = new req_url(request.url);
    var products = db.getCollection('products') || db.addCollection('products', {indices: ['id']});
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(), my_path);
    var isAPIRequest = requrl.startsWith("/api/");
    var responseString = "";
    var requestUrl = request.url;
    var urlSplit = request.url.split("/");

    if (isAPIRequest) {
        if (requrl.startsWith("/api/product")) {

            var cloneFlag = request.url.indexOf("clone") >= 0 ? true : false;
            var updateFlag = (!cloneFlag && urlSplit.length > 3) ? true : false;
            if (request.method == 'POST') { //All Post calls handled here
                if (cloneFlag) {
                    //Clone a data;
                    var cloneId = urlSplit[3];
                    db.loadDatabase({}, function () {
                        var products = db.getCollection('products');
                        var selectedItem = products.find({id:parseInt(cloneId)});
                        selectedItem.id = db.getCollection('products').maxId + 1;
                        selectedItem.createDate = new Date().getMilliseconds();
                        selectedItem.updateDate = new Date().getMilliseconds();
                        var clonedData = products.insert(selectedItem);
                        db.saveDatabase();
                        response.writeHeader(200, {"Content-Type": "application/json"});
                        response.write(returnSuccessData(clonedData), "binary");
                        response.end();
                        return;
                    });

                    console.log("inside clone existing record part");
                } else if (updateFlag) {
                    console.log("inside Updata existing record part");
                    var deleteId = urlSplit[3];
                    var selectedItem = {};
                    var body = "";
                    var products = db.getCollection('products');
                    request.on('data', function (chunk) {body = chunk;});
                    request.on('end', function () {
                        db.loadDatabase({}, function () {
                            var products = db.getCollection('products');
                            selectedItem = products.find({id:parseInt(deleteId)});
                            products.remove(selectedItem);
                            db.saveDatabase();
                        });
                        var reqData =  JSON.parse(body);
                        reqData.createDate = selectedItem.createDate;
                        reqData.updateDate = new Date().getMilliseconds();
                        var updateData  = products.insert(reqData);
                        db.saveDatabase();
                        response.writeHeader(200, {"Content-Type": "application/json"});
                        response.write(returnSuccessData(reqData), "binary");
                        response.end();
                        return;
                    });


                } else {
                    //Insert new Data
                    console.log("inside insert new record part");
                    var body = "";
                    request.on('data', function (chunk) {body = chunk;});
                    request.on('end', function () {
                        var reqData = JSON.parse(body);
                        var id = db.getCollection('products') && db.getCollection('products').maxId ? db.getCollection('products').maxId : 0;
                        reqData['id'] = id + 1;
                        reqData.createDate = new Date().getMilliseconds();
                        reqData.updateDate = new Date().getMilliseconds();
                        var insertData = products.insert(reqData);
                        console.log("insertData ", insertData);
                        db.saveDatabase();
                        response.writeHead(200, {});
                        response.write(returnSuccessData(insertData));
                        response.end();
                        return;
                    });
                }

            } else if (request.method == 'GET') { //All Get calls handled here

                db.loadDatabase({}, function () {
                    if(urlSplit.length > 3){
                        var selectId = urlSplit[3];
                        var products = db.getCollection('products');
                        productResponseData = products.find({id:parseInt(selectId)});
                    }else{
                        if (db.getCollection('products') && db.getCollection('products').data) {
                            productResponseData = db.getCollection('products').data;
                        }
                    }
                    response.writeHeader(200, {"Content-Type": "application/json"});
                    response.write(returnSuccessData(productResponseData), "binary");
                    response.end();
                    return;
                });
            } else if (request.method == 'DELETE') { //All Delete calls handled here
                var deleteId = urlSplit[3];
                db.loadDatabase({}, function () {
                    var products = db.getCollection('products');
                    var selectedItem = products.find({id:parseInt(deleteId)});
                    products.remove(selectedItem);
                    db.saveDatabase();
                    response.writeHeader(200, {"Content-Type": "application/json"});
                    response.write(returnSuccessData(db.getCollection('products').data), "binary");
                    response.end();
                    return;
                });
            }

        } else if (requrl.startsWith("/api/env") && (request.method && (request.method == 'GET'))) {
            var environments  = db.getCollection("environments")||db.addCollection("environments");

            db.loadDatabase({}, function () {
                if(urlSplit.length > 3){
                    var code = urlSplit[3];
                    console.log("code ",code);
                    var environments = db.getCollection('environments');
                    productResponseData = environments.find({code:code});
                }else{
                    if (db.getCollection('environments') && db.getCollection('environments').data) {
                        productResponseData = db.getCollection('environments').data;
                    }
                }
                response.writeHeader(200, {"Content-Type": "application/json"});
                response.write(returnSuccessData(productResponseData), "binary");
                response.end();
                return;
            });

        } else if (requrl.startsWith("/api/category")){
            if(request.method == 'GET'){
                var data = [{"name": "Anagrafica","code": "ANAGRAFE"},
                            {"name": "Onboarding","code": "ONBOARDING"},
                            {"name": "Catalogo prodotti","code": "CATALOGO"}];
                response.writeHeader(200, {"Content-Type": "application/json"});
                response.write(returnSuccessData(data), "binary");
                response.end();
                return;
            }
        }


    } else {
        path.exists(full_path, function(exists){
        //filesys.access(full_path, filesys.R_OK | filesys.W_OK, function (error){
            if(!exists){
            //if(error){
                response.writeHeader(404, {"Content-Type": "text/plain"});  
                response.write("404 Not Found\n");  
                response.end(); 
                return;
          //  }
        }
            if(request.method && (request.method == 'POST' || request.method == 'PUT')) {
                var body = "";
                request.on('data', function (chunk) {
                    body += chunk;
                });
                request.on('end', function () {
                    filesys.writeFile(full_path, body, function(err) {
                        if(err) {
                            response.writeHeader(500, {"Content-Type": "text/plain"});  
                            response.write(err + "\n");  
                            response.end();
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        response.writeHead(200,{});
                        response.end();
                        return;
                    });
                });
            }
            else {
                filesys.readFile(full_path, "binary", function(err, file) {  
                     if(err) {  
                         response.writeHeader(500, {"Content-Type": "text/plain"});  
                         response.write(err + "\n");  
                         response.end();
                         return;
                     }  
                     else{

                        response.writeHeader(200,{});  
                        response.write(file, "binary");  
                        response.end();
                        return;
                    }
                });
            }
        });
    }
}).listen(server_running_port);
sys.puts("Server Running on " + server_running_port);

function returnSuccessData(data){
    var resp = {
        "status": "OK",
        "message": null,
        "data": data
    }
    return JSON.stringify(resp);
}

function returnErrorData(errorCode,data){
    var resp = {
        "status": "KO",
        "message": data,
        "data": []
    }
    return JSON.stringify(resp);
}