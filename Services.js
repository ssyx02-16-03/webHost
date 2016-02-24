define(['./services/LocationsService.js', './services/elasticTalk.js', './services/FreeRoomsService.js'],
	   function(locationsService, elasticTalk, freeRoomsService) {
	
	function start(stompTalk, socketIOServer) {
		elasticTalk.lazyStart();

		locationsService.start(stompTalk, socketIOServer);
		//freeRoomsService.start(stompTalk, socketIOServer);
	}
	
	return {
		start: start
	}
});