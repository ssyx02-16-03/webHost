define([], function() {
  var topic = '/topic/elvisSnapShot'; //IRL should be '/topic/webserver_package'

	function start(angelClient, socketIOServer) {
		angelClient.subscribe(topic, function(body, headers) {
      console.log('passiveDataService: Data recieved');
      var pack = JSON.parse(body);
      getDataType(pack,socketIOServer);
		});
	}

	function getDataType(package, socketIO) {
    var type = package.type;
    var data = package.data;
    if(type == null || data == null){
      //throw "package_type or package_data was NULL"; //commented out for testing purposes
    }
    var eventName = 'webserver_' +type;
    console.log('passiveDataService: type:', eventName, '\tdata:', data);
    socketIO.emit(eventName, data);
	}

  return {
    start:start
  }
});
