var http = require("http");
var fs= require("fs");

var server = http.createServer((req, res)=>{
	console.log("Somone connected via HTTP!")
})

server.listen(8000);
console.log("Hello Man")