define(['elasticsearch' ,'json!passNothingVille.json','events','./lib/Queue.js'],
	function(elastic,credentials,events,Queue){
		var client;
		var connecting = false;
		var connected = false;
		
		var queryQ = new Queue();
		var callbackQ = new Queue();

		var eventEmitter = new events.EventEmitter(); //not used atm
		eventEmitter.on('elasticConnected', function(){
				console.log("XXX elasticSearch: connected!");
			});

		function connect(){
			connecting = true;
			client = establish();
			ping(client);
		}

		function establish(){
			client = new elastic.Client({
			  	host: credentials.ip +':9200',
			  	log: 'error', //error,warning,info,debug,trace
			  	sniffOnStart: true,
  				sniffInterval: 300000
			});
			return client
		}

		function ping(client){
			
			client.ping({				 
				  requestTimeout: 30000,  // 3000ms/infinity
				  hello: "elasticsearch!" // undocumented params are appended to the query string
			}, function (error) {
				  if (error) {
				    console.trace('elasticsearch cluster is down!');
				  } else {
				  	connecting = false;
				  	connected = true;
				    eventEmitter.emit('elasticConnected');
				    startSearching(queryQ,callbackQ);
				}
			});
		}

		function getStatus(client){
			client.cluster.health(function (err, resp) {
				  if (err) {
				    console.error(err.message);
				  } else {
				    console.log("elasticTalk:" +resp);
				  }
			});
		}

		function search(query, callbackFunc){
			if(!connected){
				queryQ.enqueue(query); //queue query
				callbackQ.enqueue(callbackFunc); 
				if(!connecting){
					connect();
				}
			}else{
				goSearch(query,callbackFunc);
			}
		}

		function goSearch(query,callback){
			if(client == null){
				callback(null);
			}
			else{
				client.search({
					  q: query
				}).then( function(body) {
					  var hits = body.hits.hits;
					  console.log("hits" +hits);
					  callback(hits);

					}, function(error) {
					  callback(null);
					  console.trace(error.message);
					  console.log("elasticTalk:error!");
				});
			}
		}

		function startSearching(queryQ,callbackQ){
			if(!conneted){
				console.log("elasticTalk.startSearching: i've been called but i'm not connected! :(");
			}
			while(!queryQ.isEmtpy){
				goSearch(queryQ.dequeue(), callbackQ.dequeue());
			}
		}


		function searchSpecified(query,match,body){
			client.search({
				  index: '.kibana', 
				  type: '*',
				  body: { 
				    query: {
				      match: {
				        body: 'elasticsearch'
				      }
				    }
				  }
			}).then(function (resp) {
				    var hits = resp.hits.hits;
				    return hits;
				}, function (err) {
					console.trace(error.message);
			});	
		}

	return{
		connect: connect,
		ping: ping,
		getStatus: getStatus,
		search:search
	}
});