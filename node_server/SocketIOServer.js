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

  var path = require('path');
  var __dirname = path.resolve(path.dirname());

	// här var det __dirname + '/client' som argument förut
	//app.use(express.static('./client'));
	app.use(express.static(__dirname + '/../web-app'));

    // 404 catch
    app.all('*', (req, res) => {
        console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
        var pathplz = path.resolve(__dirname + '/../web-app/index.html');
        res.status(200).sendFile(pathplz);
    });

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
