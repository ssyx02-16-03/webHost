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
      addNewType('testType','testData');
        angelClient.subscribe(topic, function(body, headers) {
            console.log('passiveDataService: Data recieved');
            var pack = JSON.parse(body);
            getDataType(pack,socketIOServer);
        });
        //socketIOServer.emit('connectionResponse', 'skickas detta?');

        socketIOServer.on('connection', function(socket) {
            console.log('somebody connected');
            socket.emit('connectionResponse', 'yo');

            socket.on('eventType', function(eventType) {
                console.log('mr somebody wants ' + eventType + '!');
                socket.emit('eventType',latestData['eventType']);
            });
        });
    }

    function getDataType(pack, socketIO) {
      var type = pack.type;
      var data = pack.data;
      if(type != null && data != null){
        var eventName = 'webserver_' +type;
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
