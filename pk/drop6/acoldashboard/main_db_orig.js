var server_running_port = 1002;
var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");

var loki = require('lokijs');
var db = new loki('acol2.json');
//db.clearChanges();
var products = db.addCollection('products'/*, {indices: ['id'] }*/);
//products.removeWhere(function(){return true;})

console.log("collection created");
console.log("inserted arr", products.data);
var productResponseData=null;

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
                    //var ptds = db.getCollection('products');
                    var reqData = JSON.parse(body);
                    sys.puts("Id "+db.getCollection('products').maxId);
                    reqData.id = db.getCollection('products').maxId + 1;
                    reqData.createDate =new Date().getMilliseconds();
                    reqData.updateDate = new Date().getMilliseconds();
                    products.insert(reqData);
                    db.saveDatabase();
                    response.writeHead(200,{"Content-Type": "application/json"});
                    response.write(JSON.stringify(db.getCollection('products').data), "binary");
                    response.end();
                    return;
                });
            } else 
            if(request.method === 'GET'){
                db.loadDatabase({}, function () {
                    productResponseData = JSON.stringify(db.getCollection('products').data);
                    response.writeHeader(200,{"Content-Type": "application/json"});
                    response.write(productResponseData, "binary");  
                    response.end();
                    return;
                });
               
            }
       } 
    } else {
        //path.exists(full_path, function(exists){
        filesys.access(full_path, filesys.R_OK | filesys.W_OK, function (error) {
            //if(!exists){
            if(error){
                response.writeHeader(404, {"Content-Type": "text/plain"});  
                response.write("404 Not Found\n");  
                response.end();
                return;
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