// ----------------------------------------------------------
// ******************** STOMP CLIENT ************************

function startLocationsService(socket) { //connection) {

	var Stomp = require('stomp-client');
	var credentials = require('./pass.json')

	var client = new Stomp(credentials.ip, credentials.port, credentials.user, credentials.pass);

	client.connect(function(sessionId) {
		console.log('connected to Angel');
		client.subscribe('/topic/elvisSnapShot', function(body, headers) {
			snapShot = JSON.parse(body);
			console.log('\n');
			locations = getAllLocations(snapShot);
			locations = JSON.stringify(locations);
			console.log(locations);
			console.log('-------');
			socket.emit('locations', locations);
		});
	});

	function getAllLocations(obj){
		var locations = [];
		for(var i=0; i<obj.patients.length; i++){
			locations.push(obj.patients[i].Location);
			if(locations[i] == ''){
				locations[i]= '-noRoom';
			}
		}
		return locations;
	}
}


// ----------------------------------------------------------
// ******************** SocketIO SERVER *********************

/*
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* från chattexemplet...
app.get('/', function(req, res){
  res.use(__dirname + '/client/index.html');
});
*/

app.use(express.static(__dirname + '/client'));

io.on('connection', function(socket) {

	console.log('a user connected');
	
	// startar LocationsService oavsett vem som connectar, for test...
	startLocationsService(socket);
	
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});
});

http.listen(3000, function(){
  console.log('SocketIO server listening on *:3000');
});


/*
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
	console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

	startLocationsService(connection);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});
*/