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
var db = new loki('acol1.json');

console.log("collection created");


var productResponseData='';

var req_url = function(url){this.url = url;};
req_url.prototype.url = null;
req_url.prototype.startsWith = function (starts){
    if(starts && this.url) {
        var length = starts.length;
        return (this.url.substring(0, length) === starts);
    }
    return false;
}

my_http.createServer(function(request,response){
    var requrl = new req_url(request.url);
    var my_path = url.parse(request.url).pathname;
    var products = db.getCollection('products') || db.addCollection('products',{ indices: ['id'] });
    var full_path = path.join(process.cwd(),my_path);
    var isAPIRequest = requrl.startsWith("/api/");
    if(isAPIRequest) {
       if(requrl.startsWith("/api/product")) {
           console.log(request.method + ":/api/product/");
           if(request.method == 'POST'/* || request.method == 'PUT'*/){
                var body = "";
                request.on('data', function (chunk) {
                    body = chunk;
                });
                request.on('end', function () {
                    var reqData = JSON.parse(body);
                      
                    var id = db.getCollection('products') && db.getCollection('products').maxId || 0;
                    console.log("Id ",id);
                    reqData['id'] = id + 1;
                    reqData.createDate =new Date().getTime();
                    reqData.updateDate = new Date().getTime();
                    console.log("inserting data ",reqData);
                     var insertData = products.insert(reqData);
                    console.log("insertData ",insertData);
                            
                    db.saveDatabase();
                    
                    response.writeHead(200,{});
                    response.write(returnSuccessData(reqData));
                    response.end();
                    return;
                });
            } else 
            if(request.method === 'GET'){
                db.loadDatabase({}, function () {
                if(db.getCollection('products') && db.getCollection('products').data){
                    productResponseData =db.getCollection('products').data;
                }
                response.writeHeader(200,{"Content-Type": "application/json"});
                response.write( returnSuccessData(productResponseData), "binary");
                response.end();
                return;
                });

            }
       } 
 else if(requrl.startsWith("/api/category") && (request.method && (request.method == 'GET'))){
            var data = [{"name": "Anagrafica","code": "ANAGRAFE"},
                        {"name": "Onboarding","code": "ONBOARDING"},
                        {"name": "Catalogo prodotti","code": "CATALOGO"}];

            response.writeHeader(200,{"Content-Type": "application/json"});
            response.write( returnSuccessData(data), "binary");
            response.end();
            return;
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