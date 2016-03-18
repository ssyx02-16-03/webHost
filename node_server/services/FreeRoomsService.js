// osäker på om rooms.json är 100% korrekt!!! Rum är ett fritextfält med max tre tecken i Elvis!!!
define(['json!./rooms.json'], function(rooms) {
	
	function start(angelClient, socketIOServer) {

		angelClient.subscribe('/topic/elvisSnapShot', function(body, headers) {
	
			var snapShot = JSON.parse(body);
			var locations = getPatientLocations(snapShot);
			var freeRooms = getFreeRooms(rooms, locations);
			console.log('FreeRoomsService--- Data recieved ---');
			socketIOServer.emit('freeRooms', freeRooms);
		});
	}
	
	function getPatientLocations(snapShot) {
		var locations = [];
		for(var i=0; i<snapShot.patients.length; i++){
			locations.push(snapShot.patients[i].Location);
			if(locations[i] == ''){
				locations[i]= '-noRoom';
			}
		}
		return locations;
	}
	
	function getFreeRooms(rooms, locations) {
		
		var freeRooms = {};
	
		for(var roomGroup in rooms) {
			var roomGroup = rooms[roomGroup];
			for(var room in roomGroup) {
				freeRooms[roomGroup[room]] = isFree(roomGroup[room], locations);		
			}
		}
		return freeRooms;
	}

	function isFree(room, locations) {
		for(var i = 0; i<locations.length; i++) {
			//console.log(room);
			//console.log(locationz[i]);
			if(room == locations[i]) {
				return false;
			}
		}
		return true;
	}
	
	return {
		start: start
	}
});