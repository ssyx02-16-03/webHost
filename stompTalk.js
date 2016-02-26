define(['stomp-client', 'json!pass.json', 'events','./lib/Queue.js'], 
	function(StompClient, pass, events, Queue) {

	var stompClient = new StompClient(pass.ip, 
									  pass.port,
									  pass.user, 
									  pass.pass);

	var connected = false;
	var tryingToConnect = false;
	var topicQ = new Queue();
	var funcQ = new Queue();

	var eventEmitter = new events.EventEmitter();
	eventEmitter.addListener('subscribe', startSubscribing );

	function connect(onConnectFunction) {
		stompClient.connect(onConnectFunction, function(){
			system.log("stompTalk: couldn't connect!");
		});
	}

	function disconnect(){
		stompClient.disconnect();
		connected = false;
		console.log("stompClient disconnected");
	}
	
	function subscribe(topic, onSubscribeFunction) {
		topicQ.enqueue(topic);
		funcQ.enqueue(onSubscribeFunction);

		if(!connected && !tryingToConnect){
			tryingToConnect = true;
			connect(function(sessionId){
				console.log("\nstompClient: connected");
				tryingToConnect = false;
				connected = true;
				eventEmitter.emit('subscribe');
			});
		}else{
			eventEmitter.emit('subscribe');
		}
	}

	function startSubscribing(){
		while(connected && !topicQ.isEmpty()){
			console.log("Subscribing to:" +topicQ.peek());
			stompClient.subscribe(topicQ.dequeue(), funcQ.dequeue());
			console.log("--subscribed!");
		}
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
	};
});
