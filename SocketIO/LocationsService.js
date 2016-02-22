define([], function() {
	
	function start(angelClient, socketIOServer) {

		angelClient.subscribe('/topic/elvisSnapShot', function(body, headers) {
	
			snapShot = JSON.parse(body);
			console.log('\n');
			locations = getPatientLocations(snapShot);
			var locationz = locations;
			console.log(locations); // for testing
			locations = JSON.stringify(locations);
			console.log(locations);
			console.log('-------');
			socketIOServer.emit('locations', locations);
		});
	}
	
	function getPatientLocations(obj) {
	
		var locations = [];
		for(var i=0; i<obj.patients.length; i++){
		locations.push(obj.patients[i].Location);
			if(locations[i] == ''){
				locations[i]= '-noRoom';
			}
		}
		return locations;
	}
	
	return {
		start: start
	}
});