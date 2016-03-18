define([], function() {
    var topic = '/topic/elvisSnapShot'; //IRL should be '/topic/webserver_package'

//implement a hashSet for each webserver_package
    var latestData = {};
    latestData['webserver_test'] = 'testData';

    function start(angelClient, socketIOServer) {
        /*
        angelClient.subscribe(topic, function(body, headers) {
            console.log('passiveDataService: Data recieved');
            var pack = JSON.parse(body);
            console.log(pack)
            //getDataType(pack,socketIOServer);
        });
        */

        //socketIOServer.emit('connectionResponse', 'skickas detta?');

        socketIOServer.on('connection', function(socket) {
            console.log('somebody connected');
            socket.emit('connectionResponse', 'yo');

            socket.on('eventType', function(eventType) {
                console.log('mr somebody wants ' + eventType + '!');
            });
        });
    }

    /*
    function getDataType(package, socketIO) {
        var type = package.type;
        var data = package.data;
        if(type == null || data == null){
            //throw "package_type or package_data was NULL"; //commented out for testing purposes
        }
        var eventName = 'webserver_' +type;
        latestData[eventName] = data; //save latest data if user request it
        console.log('passiveDataService: type:', eventName, '\tdata:', data);
        socketIO.on(eventName, function(callbackFunc){ //subscribe to everything we got data on.
            callbackFunc(latestData[eventName]); //give the user the latest and greatest of our data
        });

        console.log(latestData);
    }
    */
    return {
        start:start
    }
});
