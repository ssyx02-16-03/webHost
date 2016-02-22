define(['./services/LocationsService'], function(locationsService) {
	
	// ska ändras till start(angelClient, esClient, socketIOService)
	function start(angelClient, socketIOService) {
		locationsService.start(angelClient, socketIOService);
	}
	
	return {
		start: start
	}
});