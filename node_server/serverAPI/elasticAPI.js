/*
*	Commands:
*	+ Search: execute a search query and get back search hits that match the query
*	+ Get:  get a typed JSON document from the index based on its id.
*	+ Index:  
*/

define(['elasticsearch' ,'json!pass.json','events','../lib/Queue.js'],
	function(elastic,credentials,events,Queue){
		var client;
		var connecting = false;
		var connected = false;
		
		var queryQ = new Queue();
		var callbackQ = new Queue();

		var eventEmitter = new events.EventEmitter();
		eventEmitter.on('elasticConnected', function(){
				console.log("elasticSearch: connected!");
			});

		function connect(){
			console.log("elasticSearch: connecting...");
			connecting = true;
			client = establish();
			ping(client);
		}

		function establish(){
			client = new elastic.Client({
			  	'host': credentials.ip +':9200',
			  	'log': 'error', //error,warning,info,debug,trace
			  	'sniffOnStart' : true,
  				'sniffInterval': 300000
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
				client.search(query).then( function(body) {
					  var hits = body.hits.hits;
					  callback(hits);

					}, function(error) {
					  callback(null);
					  console.trace(error.message);
					  console.log("elasticTalk:error!");
				});
			}
		}

		function startSearching(queryQ,callbackQ){ //do queries that was enqued when we weren't connected
			if(!connected){
				console.log("elasticTalk.startSearching: i've been called but i'm not connected! :(");
			}
			while(!queryQ.isEmpty()){
				goSearch(queryQ.dequeue(), callbackQ.dequeue());
			}
		}


	return{
		connect: connect,
		ping: ping,
		getStatus: getStatus,
		search : search,
	}
});


/**


	"index": "on_going_patient_index", //on_going_patient_index, finished_patient_index"
				"query": {
					"match": { "2",
					}
				}

				*/