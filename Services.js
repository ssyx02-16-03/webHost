define(['./services/StompLocationService.js', './services/ElasticLocationService.js', './services/FreeRoomsService.js', './services/PassiveDataService.js'],
	   function(StompLocationService, ElasticLocationService, FreeRoomsService, PassiveDataService) {

				function start(stompAPI, elasticAPI, socketIOServer) {
					StompLocationService.start(stompAPI, socketIOServer);
					ElasticLocationService.start(elasticAPI, socketIOServer);
					FreeRoomsService.start(stompAPI, socketIOServer);
					PassiveDataService.start(stompAPI, socketIOServer); //will outconquer all other data collection services. Maybe they will be slaves to this one.

					//testing..
				}

	return {
		start: start
	}
});
