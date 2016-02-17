	
function readLocationsFromJSON(){
	var path = 'locations.json';
	$.getJSON( path, {})
	    .done(function( data ) {
			console.log(data);
			data = JSON.stringify(data);
			data = data.replace(/,/g, ' ');
			data = data.replace(/"/g, ' ');
			$('#tab2').text(data);
		}
	);	
}
			