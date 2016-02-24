// config gör att man kan få med .json i define, se AngelClient för exempel
var requireJS = require('./node_modules/requirejs/bin/r.js');
requireJS.config({
	waitSeconds: 2,
	paths: {
		text: 'lib/requirejs_plugins/text',
		json: 'lib/requirejs_plugins/json'
	}
});
	
requireJS(['./stompTalk.js', './SocketIOServer.js', './Services.js'],
		  function(stompTalk, socketIOServer, services) {
		
	// kommer ändras till start(angelClient, esClient, socketIOServer)
	services.start(stompTalk, socketIOServer);
});