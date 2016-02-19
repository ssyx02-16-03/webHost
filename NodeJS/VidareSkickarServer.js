// ----------------------------------------------------------
// ******************** STOMP CLIENT ************************

function startLocationsService(connection) {

	//var Stomp = require('stompjs');
	//var credentials = require('./passTillStompWebServer.json')

	var Stomp = require('stomp-client');
	var credentials = require('./pass.json')

	//var client = Stomp.overWS('ws://' + credentials.ip + ':' + credentials.port);

	var client = new Stomp(credentials.ip, credentials.port, credentials.user, credentials.pass);

	//client.connect(credentials.user, credentials.pass, function() {
	client.connect(function(sessionId) {
		console.log('connected to Angel');
		client.subscribe('/topic/elvisSnapShot', function(body, headers) {
			snapShot = JSON.parse(body);
			console.log('\n');
			locations = getAllLocations(snapShot);
			locations = JSON.stringify(locations);
			console.log(locations);
			console.log('-------');
			connection.sendUTF(locations);
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
// ******************** WS SERVER ***************************
// saknas lösning för användarnamn och lösenord...

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
