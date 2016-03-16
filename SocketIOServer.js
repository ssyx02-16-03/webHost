define(['express', 'http', 'socket.io'], function(express, http, socketIO) {

	var app = express();
	var http = http.Server(app);
	var io = socketIO(http);

	function on(event, onEventFunction) {
		io.on(event, onEventFunction);
	}

	function emit(key, value) {
		io.emit(key, value);
	}

	// här var det __dirname + '/client' som argument förut
	//app.use(express.static('./client'));
	app.use(express.static('./web-app'));

	on('connection', function(socket) {
		console.log('a user connected');

		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
		socket.on('chat message', function(msg) {
			console.log('message: ' + msg);
		});
	});

	// håller tummarna på att man kan göra detta först och definiera eventsvar efteråt utan trubbel...
	http.listen(8000, function(){
		console.log('SocketIO server listening on *:8000');
	});



	return {
		on: on,
		emit: emit
	}
});
