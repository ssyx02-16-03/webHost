define(['elasticsearch' ,'json!pass.json'],
	function(elastic,credentials){
		var client;
		
		function lazyStart(){
			client = this.start();
			this.ping(client);
			this.getStatus(client);
		}

		function start(){
			client = new elastic.Client({
			  	host: credentials.ip +':9200',
			  	log: 'trace',
			  	sniffOnStart: true,
  				sniffInterval: 300000
			});
			return client
		};

		function ping(client){
			client.ping({				 
				  requestTimeout: Infinity,  // ping usually has a 3000ms timeout
				  hello: "elasticsearch!" // undocumented params are appended to the query string
				}, function (error) {
				  if (error) {
				    console.trace('elasticsearch cluster is down!');
				  } else {
				    console.log('All is well');
				}
			});
		};

		function getStatus(client){
			client.cluster.health(function (err, resp) {
				  if (err) {
				    console.error(err.message);
				  } else {
				    console.log("elasticTalk:" +resp);
				  }
			});
		};
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
	return{
		lazyStart: lazyStart,
		start: start,
		ping: ping,
		getStatus: getStatus
	}
});