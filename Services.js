define(['./services/LocationsService.js', './services/elasticTalk.js', './services/FreeRoomsService.js'],
	   function(locationsService, elasticTalk, freeRoomsService) {
	
	function start(angelClient, socketIOServer) {
		elasticTalk.lazyStart();

		locationsService.start(angelClient, socketIOServer);
		//freeRoomsService.start(angelClient, socketIOServer);
	}
	
	return {
		start: start
	}
});