define(['./services/StompLocationService.js', './services/ElasticLocationService.js', './services/FreeRoomsService.js'],
	   function(StompLocationService, ElasticLocationService, freeRoomsService) {
	
	function start(stompAPI, elasticAPI, socketIOServer) {
		StompLocationService.start(stompAPI, socketIOServer);
		ElasticLocationService.start(elasticAPI, socketIOServer);
		
		freeRoomsService.start(stompAPI, socketIOServer);
		
		stompAPI.subscribe('/topic/elvisDiff', function(body, headers){
			console.log("getting data - woho! subscribing again!");
		});
		elasticAPI.search('*',function(data){
			console.log("gotData: " +data);
		})
		elasticAPI.getLocation(function(data){
			console.log("rooms: "+data.data);
		})
	}
	
	return {
		start: start
	}
});