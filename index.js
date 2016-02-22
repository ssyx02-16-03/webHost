// config gör att man kan få med .json i define, se AngelClient för exempel
var requireJS = require('requirejs');
requireJS.config({
	waitSeconds: 2,
	paths: {
		text: 'node_modules/requirejs/lib/text',
		json: 'node_modules/requirejs/lib/json'
	}
});
	
requireJS(['./AngelClient.js', './SocketIOServer.js', './Services'],
		  function(angelClient, socketIOServer, services) {
		
	// kommer ändras till start(angelClient, esClient, socketIOServer)
	services.start(angelClient, socketIOServer);
});