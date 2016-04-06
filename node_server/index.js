console.log("++++++ index.js +++++++++");

// config gör att man kan få med .json i define, se AngelClient för exempel
var requireJS = require('./node_modules/requirejs/bin/r.js');
requireJS.config({
	waitSeconds: 2,
	paths: {
		text: 'lib/requirejs_plugins/text',
		json: 'lib/requirejs_plugins/json'
	}
});
	
requireJS(['./serverAPI/stompAPI.js', './serverAPI/elasticAPI.js', './SocketIOServer.js', './Services.js'],
		  function(stompAPI, elasticAPI, socketIOServer, services) {
			services.start(stompAPI, elasticAPI, socketIOServer);
});
