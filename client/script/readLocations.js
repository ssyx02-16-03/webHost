	
function readLocationsFromJSON(){
	var path = 'locations.json';
	var tab = '#tab2';
	$.getJSON( path, {})
	    .done(function( data ) {
			console.log(data);
			data = JSON.stringify(data);
			data = data.replace(/,/g, ' ');
			data = data.replace(/"/g, ' ');
			
			$(tab).text("");
			$(tab).text(data);
		}
	);	
}
			