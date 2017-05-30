var http = require("http");
var fs= require("fs");

var socketio = require("socket.io")

var server = http.createServer((req, res)=>{
	console.log("Somone connected via HTTP!")
	fs.readFile('index.html', 'utf-8', (error, data)=>{
		if(error) {
			res.writeHead(500,{'content-type':'text/html'});
			res.end("Internal Server Error")
		}else{
			res.writeHead(200,{'content-type':'text/html'});
			res.end(data);
		}
	})
})

var io = socketio.listen(server);
io.sockets.on('connect',(socket)=>{
	console.log("someone connected through socket");
	// console.log(socket);

	socket.on('nameToServer',(name)=>{
		console.log(name + " just joined.");
		io.sockets.emit('newUser',name);
	});

	socket.on('sendMessage', ()=>{
		console.log("Somone clikec on the big blue button.");
	})

	socket.on('timeToServer', ()=>{

	});

	socket.on('messageToServer',(messageObj)=>{
		io.sockets.emit('messageToClient', messageObj.newMessage + '--' + messageObj.name + '--' + messageObj.timestamp);
	});
});

server.listen(8000);
console.log("Server is listening.")