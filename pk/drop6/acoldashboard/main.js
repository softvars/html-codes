/* Hello, World! program in node.js */
//console.log("Hello, World!");

//var http = require("http");

var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");
my_http.createServer(function(request,response){
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    //response.writeHeader(200,{"Access-Control-Allow-Origin":"*"});
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
                    response.writeHead(200);
                    response.end();
                    return;
                });
                console.log("The request body is :" + body);
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
                    response.writeHeader(200);  
                    response.write(file, "binary");  
                    response.end();
                    return;
                }
            });
        }
    });
}).listen(8080);
sys.puts("Server Running on 8080");