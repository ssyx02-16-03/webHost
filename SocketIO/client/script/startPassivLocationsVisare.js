function startPassivLocationsVisare() {

	/* ville göra såhär, men krånglade sönder... ligger import i index.html nu
	require(['lib/socket.io.js'], function () {
		console.log("imported stomp.js");
	});
	*/
	
    console.log("loggen är på");
	
	// no URL needed; io will by default connect to the server that served the site
	var socket = io();
	socket.emit('chat message', 'hej bror');

	socket.on('locations', function(data) {
		console.log(data);        
		try {
            var json = JSON.parse(data);
            console.log(json);
			$('#tab1').append(json);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
	});
}

