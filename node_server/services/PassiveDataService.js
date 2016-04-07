define([], function() {
    var topic = '/topic/elvisSnapShot'; //IRL should be '/topic/webserver_package'

//implement a hashSet for each webserver_package
    var latestData = {};
    var numOfLabels = 0;
    var labels = [];

    function addNewType(typeName,typeData){
      latestData[typeName] = typeData;
      labels.push(typeName);
      numOfLabels++;
      console.log('passiveDataService: new dataType added!');
    }

    function start(angelClient, socketIOServer) {
      addNewType('webserver_test','testData'); //for testing purposes ofcourse
        angelClient.subscribe(topic, function(body, headers) {
            var pack = JSON.parse(body);
            emitNewData(pack,socketIOServer);
        });
        //socketIOServer.emit('connectionResponse', 'skickas detta?');

        socketIOServer.on('connection', function(socket) {
            console.log('somebody connected');
            socket.emit('connectionResponse', 'yo');

            socket.on('eventType', function(eventType) {
                console.log('mr somebody wants ' + eventType + '!');
                if(latestData[eventType] == null){
                  console.log('--problem, the data mr somebody wanted doesn\'t exist, sending som nullspace to him anyway..');
                }
                socket.emit(eventType,latestData[eventType]);
            });
        });
    }

    function emitNewData(pack, socketIO) {
      var type = pack.type;
      var data = pack.data;
      if(type != null && data != null){ //is the data in correct form?
        var eventName = type;
        if(latestData[eventName] == null){
          addNewType(eventName,'');
        }
        if(latestData[eventName] != data){
          socketIO.emit(eventName,data);
          latestData[eventName] = data;
        }
      }
  	}


    return {
        start:start
    }
});
