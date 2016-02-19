define([], function () {
	var stompC = function(evEmit) {
		var latestSnap = "";
		var eventEmitter = evEmit;

		this.subscribe = function() {
			var Stomp = require('stomp-client'); //stomp client library
			
			//get JSON file
			try{
				var credentials = JSON.parse(require('fs').readFileSync('./pass.json', 'utf8'));  //credentials to STOMPserver
				console.log(credentials);
			}catch(err){
				console.log("could not read .json file!");
			}

			var topic1= '/topic/elvisDiff';
			var topic2= '/topic/elvisSnapShot';

			console.log('connecting to', credentials.ip);
			var client = new Stomp(credentials.ip, credentials.port, credentials.user, credentials.pass);
			client.connect(function(sessionId) {
				console.log('subscribing to:', topic2)
				client.subscribe(topic2, function(body, headers) {
					snapShot = JSON.parse(body);
					//snapShot = JSON.stringify(snapShot);
					console.log('\n');	
					console.log('-------');		
					latestSnap = snapShot;
					notify();
				}); //subscribe
			}); //connect
		}//subscribe

		var notify = this.notify = function() {
			eventEmitter.emit('data_ready');
			console.log('stompC:data ready!');
		}
		this.getLatestSnap = function() {
			return latestSnap;
		}
	};//stompC
	return stompC;
});





//get credentials

/*  example data
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