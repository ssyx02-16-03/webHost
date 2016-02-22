define(['stomp-client', 'json!pass.json'], function(StompClient, pass) {
	
	var stompClient = new StompClient(pass.ip, pass.port, pass.user, pass.pass);

	/*
	function connect(onConnectFunction) {
		stompClient.connect(onConnectFunction);
	}
	*/
	
	// subscribar och connectar här på samma gång, kan komma att visa sig att connect är användbart
	function subscribe(topic, onSubscribeFunction) {
		stompClient.connect(function(sessionId) {
			stompClient.subscribe(topic, onSubscribeFunction);
		});
	}

	return {
		//connect: connect,
		subscribe: subscribe
	}
});