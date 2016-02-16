$(document).ready(function(){
	
	var client = new $.es.Client({ //talk with elastic from web-client
	  hosts: 'localhost:9200'
	});
	
	client.ping({
	requestTimeout: 30000,
	  // undocumented params are appended to the query string
	  hello: "elasticsearch"
	}, function (error) {
	  if (error) {
	    console.error('elasticsearch cluster is down!');
	  } else {
	    console.log('All is well');
	  }
	});

	
	
});


