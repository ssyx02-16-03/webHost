var Stomp = require('stomp-client');
var destination = '/topic/HelloWorld';
var topic1= '/topic/elvisDiff';
var topic2= '/topic/elvisSnapShot';
var newBody;

console.log("Hello, World!")
client.connect(function(sessionId) {
	console.log('subscribing to:', topic2)
	client.subscribe(topic2, function(body, headers) {
		snapShot = JSON.parse(body);
		//console.log('json:', snapShot);
		console.log('\n');
		
		var locations = getAllLocations(snapShot);
		for(var i=0; i < locations.length; i++){
			console.log(locations[i]);	
		}
		console.log('-------');
		
	});
	
	
});

function getAllLocations(obj){
	var locations = [];
	for(var i=0; i<obj.patients.length; i++){
		locations.push(obj.patients[i].Location);
		if(locations[i] == ''){
			locations[i]= 'none';
		}
	}
	return locations;	
}

/*
     { CareContactId: 3884978,
       CareContactRegistrationTime: '2016-02-14T07:40:00Z',
       DepartmentComment: '',
       Events: [Object],
       Location: 'G11',
       PatientId: 336570,
       ReasonForVisit: 'B',
       Team: 'NAKME',
       VisitId: 3958522,
       VisitRegistrationTime: '2016-02-14T07:40:00Z' } ] }
*/

/*function Object_keys(obj,name) {
	var keys = [], name;
	for (name in obj) {
	    if (obj.hasOwnProperty(name)) {
		  console.log('Found the propterty!')
		  keys.push(name);
	    }
	}
	return keys;
}*/

