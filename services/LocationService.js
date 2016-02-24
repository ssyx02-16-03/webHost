define([], function() {
	function start(stompTalk, socketIOServer) {
		stompTalk.subscribe('/topic/elvisSnapShot', function(body, headers) {
			console.log('LocationService--- Data recieved ---');
			var snapShot = JSON.parse(body);
			var patientLocations = getPatientLocations(snapShot);
			//console.log(patientLocations);
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
