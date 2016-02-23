// config gör att man kan få med .json i define, se AngelClient för exempel
var requireJS = require('./node_modules/requirejs/bin/r.js');
requireJS.config({
	waitSeconds: 2,
	paths: {
		text: 'node_modules/requirejs/lib/text',
		json: 'node_modules/requirejs/lib/json'
	}
});



/*
requireJS(['./AngelClient.js', './SocketIOServer.js', './LocationsService'],
		  function(angelClient, socketIOServer, locationsService) {
		
	//locationsService.start(angelClient, socketIOServer);
	
});
*/

requireJS(['elasticsearch' ,'json!./pass.json'],
	function(elastic,credentials){
		var start = function(){
			var client = new elastic.Client({
			  	host: credentials.ip +':9200',
			  	log: 'trace',
			  	sniffOnStart: true,
  				sniffInterval: 300000
			});
			return client;
		};

		var ping = function(client){
			client.ping({
				  // ping usually has a 3000ms timeout
				  requestTimeout: Infinity,

				  // undocumented params are appended to the query string
				  hello: "elasticsearch!"
				}, function (error) {
				  if (error) {
				    console.trace('elasticsearch cluster is down!');
				  } else {
				    console.log('All is well');
				}
			});
		};

		var getStatus = function(client){
			client.cluster.health(function (err, resp) {
				  if (err) {
				    console.error(err.message);
				  } else {
				    console.dir(resp);
				  }
				});
		}
/*
				// index a document
				client.index({
				  index: 'blog',
				  type: 'post',
				  id: 1,
				  body: {
				    title: 'JavaScript Everywhere!',
				    content: 'It all started when...',
				    date: '2013-12-17'
				  }
				}, function (err, resp) {
				  // ...
				});
				*/
		var c = start();
		ping(c);
		getStatus(c);
		
	});
