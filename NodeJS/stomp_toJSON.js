console.log("Hello, World!")


var Stomp = require('stomp-client');
//var client = new Stomp('0.0.0.0', 66666, '', '');
var destination = '/topic/HelloWorld';
var topic1= '/topic/elvisDiff';
var topic2= '/topic/elvisSnapShot';
var newBody;

client.connect(function(sessionId) {
	console.log('subscribed to:', topic2)
	client.subscribe(topic2, function(body, headers) {
	newBody = JSON.parse(body);
	console.log('json:', newBody);
	console.log('\n');
	});
});
