			
			var rooms = require('./rooms.json'); // vet ej om denna json är 100% korrekt
			//console.log(rooms);
			var obj = {};
			for(var roomGroup in rooms) {
				var roomGroup = rooms[roomGroup];
				for(var room in roomGroup) {
					//console.log(roomGroup[room]);
					obj[roomGroup[room]] = isFree(roomGroup[room], locationz);
				}
			}
			//console.log(obj);
		});
	});
	
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