define(['./services/LocationService.js', './services/FreeRoomsService.js'],
	   function(locationService, freeRoomsService) {
	
	function start(stompTalk, elasticTalk, socketIOServer) {
		locationService.start(stompTalk, socketIOServer);
		
		//freeRoomsService.start(stompTalk, socketIOServer);
		
		stompTalk.subscribe('/topic/elvisDiff', function(body, headers){
			console.log("getting data - woho! subscribing again!");
		});
		elasticTalk.search('*',function(data){
			console.log("gotData: " +data);
		})
		elasticTalk.getLocation(function(data){
			console.log("rooms: "+data.data);
		})
	}
	
	return {
		start: start
	}
});