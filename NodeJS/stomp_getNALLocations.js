var Stomp = require('stomp-client');
var client = new Stomp(); //<-fix
var destination = '/topic/HelloWorld';
var topic1= '/topic/elvisDiff';
var topic2= '/topic/elvisSnapShot';

var newBody;
var locations = null;
var savePath = '../apacheHTTP/htdocs/'

console.log("Hello, World!")
client.connect(function(sessionId) {
	console.log('subscribing to:', topic2)
	client.subscribe(topic2, function(body, headers) {
		snapShot = JSON.parse(body);
		console.log('\n');
		locations = getAllLocations(snapShot);
		locations = JSON.stringify(locations);
		saveToDisk(locations);
		console.log(locations);
		console.log('-------');
		client.unsubscribe(topic2, headers );
	});
});


function saveToDisk(jsonObject){
	const fs = require('fs');
	fs.writeFile(savePath +'locations.json',locations, (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
}


function getAllLocations(obj){
	var locations = [];
	for(var i=0; i<obj.patients.length; i++){
		locations.push(obj.patients[i].Location);
		if(locations[i] == ''){
			locations[i]= '-noRoom';
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

