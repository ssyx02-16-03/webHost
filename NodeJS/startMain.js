console.log("this Script intend to talk with activeMQ and elasticsearch and throw data onto the webhost.");
var requireJS = require('./node_modules/requireJS/r.js');
var $ = require('./node_modules/jQuery/jQuery.js');
/*requireJS.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});*/

requireJS(['./stompCom.js'], function(stompClient){
    var events = require('events'); // event module
	var eventEmitter = new events.EventEmitter(); // Create an eventEmitter object

     var stomper;
     stomper = new stompClient(eventEmitter);
     stomper.subscribe();

     eventEmitter.on('data_ready', function(){
	   var data = stomper.getLatestSnap();
	   console.log('data received succesfully.');
	   processData(data);
	});
});


function processData(data){
	var locations = getAllLocations(data);
	console.log(locations);
	saveToDisk(locations);
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

function saveToDisk(jsonObject){
	var savePath = '../WSClient/locations.json';
	const fs = require('fs');
	fs.writeFile(savePath,jsonObject, function(err){
		if (err) throw err;
		console.log('It\'s saved!');
	});
}

