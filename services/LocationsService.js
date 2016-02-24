define([], function() {
	function start(angelClient, socketIOServer) {
		angelClient.subscribe('/topic/elvisSnapShot', function(body, headers) {
			var snapShot = JSON.parse(body);
			var patientLocations = getPatientLocations(snapShot);
			console.log(patientLocations);
			console.log('-------');
			socketIOServer.emit('patientLocations', patientLocations);
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
