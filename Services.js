define(['./services/LocationsService.js', './services/FreeRoomsService.js'],
	   function(locationsService, freeRoomsService) {
	
	// ska ändras till start(angelClient, esClient, socketIOService)
	function start(angelClient, socketIOServer) {
		
		locationsService.start(angelClient, socketIOServer);
		//freeRoomsService.start(angelClient, socketIOServer);
	}
	
	return {
		start: start
	}
});