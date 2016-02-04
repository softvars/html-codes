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
var db = new loki('acol.json');
var products = db.addCollection('products', {indices: ['id'] });
console.log("collection created");
products.insert([]);
console.log("inserted arr",db.getCollection('products').data);
var productResponseData=null;

var req_url = function(url){this.url = url;};
req_url.prototype.url = null;
req_url.prototype.startsWith = function (starts){
    if(starts && this.url) {
        var length = starts.length;
        return (this.url.substring(0, length) === starts) 
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
           if(requrl.startsWith("/api/product") && (request.method && (request.method == 'POST' || request.method == 'PUT'))){
                var body = "";
                request.on('data', function (chunk) {
                    console.log("The request chunk is :" + chunk);
                    body = chunk;
                });
                request.on('end', function () {
                    console.log("/api/product/add");
                 //   console.log("The request body is :" + body);
                    var reqData = JSON.parse(body);
                    reqData.createDate =new Date().getMilliseconds();
                    reqData.updateDate = new Date().getMilliseconds();
                    
                    products.insert(reqData);
                    console.log("inserted data",db.getCollection('products').data);
                     db.saveDatabase();
                    console.log("length :" + db.getCollection('products').data.length);
                    response.writeHead(200,{});
                   
                   

                    response.write(JSON.stringify(reqData));  
                    response.end();
                    return;
                });
            } else 
            if(requrl.startsWith("/api/product") && (request.method && request.method === 'GET')){
                db.loadDatabase({}, function () {
                     console.log("/api/product/list");
                    console.log("The response is :" + JSON.stringify(db.getCollection('products').data));
                    productResponseData = JSON.stringify(db.getCollection('products').data);
                    //productResponseData = productResponseData &&productResponseData.length>0 && productResponseData.data ||'';
                response.writeHeader(200,{"Content-Type": "application/json"});  
                response.write(productResponseData, "binary");  
                response.end();
                return;
                });
               
            }
       } 
    } else {
        path.exists(full_path,function(exists){
            if(!exists){
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
                    //console.log("The request body is :" + body);
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