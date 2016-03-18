define([], function() {
	function start(elasticAPI, socketIOServer) {

		var query = {
				"size" : 1000,
				"index" : "on_going_patient_index", //on_going_patient_index, finished_patient_index"
				"fields": "Location"
			}
		elasticAPI.search(query,function(data){
			console.log('ElasticLocationService--- Data recieved ---');
			getPatientLocations(data);
			//socketIOServer.emit('patientLocations', patientLocations);
		})

	}
	
	function getPatientLocations(obj) {
		var locations = [];
		for(var i=0; i<obj.patients.length; i++){
		locations.push(obj.patients[i].Location);
			if(locations[i] == ''){
				locations[i]= '-noRoom';
			}
		}
		console.log(":" +locations);
	}
	
	return {
		start: start
	}
});
