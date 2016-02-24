define(['stomp-client', 'json!pass.json'], function(StompClient, pass) {
	
	var stompClient = new StompClient(pass.ip, pass.port, pass.user, pass.pass);
	
	/*function connect(onConnectFunction) {
		stompClient.connect(onConnectFunction);
	}
	*/
	
	// subscribar och connectar här på samma gång, kan komma att visa sig att connect är användbart
	function subscribe(topic, onSubscribeFunction) {
		stompClient.connect(function(sessionId) {
			console.log("\nstompClient: connected!\nsubscribing to:" +topic);
			stompClient.subscribe(topic, onSubscribeFunction);
		});
	}

	function unsubscribe(topic){
		stompClient.unsubscribe(topic);	
	}
	
	function disconnect(){
		stompClient.disconnect();	
	}

	return {
		//connect: connect,
		unsubscribe: unsubscribe,
		//disconnect : disconnect,
		subscribe: subscribe
		 
	}
});
