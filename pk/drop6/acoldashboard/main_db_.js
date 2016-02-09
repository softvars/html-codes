var server_running_port = 1002;
var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs");

var loki = require('lokijs');
var db = new loki('acol.json');
//var product = db.getCollection('products');


var products = db.addCollection('products'/*, {indices: ['id'] }*/);

console.log("collection product:" + JSON.stringify(products));

//console.log("collection created");
/*products.insert([]);*/
//console.log("inserted arr",db.getCollection('products').data);
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
