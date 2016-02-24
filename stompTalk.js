define(['stomp-client', 'json!pass.json'], function(StompClient, pass) {
	
	var stompClient = new StompClient(pass.ip, 
									  pass.port, 
									  pass.user, 
									  pass.pass);

	function connect(onConnectFunction) {
		stompClient.connect(onConnectFunction);
	}
	function disconnect(){
		stompClient.disconnect();
		console.log("stompClient disconnected");
	}
	
	// subscribar och connectar här på samma gång, kan komma att visa sig att connect är användbart
	function subscribe(topic, onSubscribeFunction) {
		this.connect(function(sessionId) {
			console.log("\nstompClient: connected!\nsubscribing to:" +topic);
			stompClient.subscribe(topic, onSubscribeFunction);
		});
	}

	function unsubscribe(topic){
		stompClient.unsubscribe(topic);
		console.log("stompClient unsubscribed from" +topic);	
	}

	return {
		connect: connect,
		disconnect : disconnect,
		unsubscribe: unsubscribe,
		subscribe: subscribe
	}
});
