jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function (e) {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

		//prevents default button to be clicked again at start.
		e.preventDefault();

        if( currentAttrValue == "#tab2"){
            require(['script/readLocations.js'], function(data){
                readLocationsFromJSON();
            });
        }
			
		else if( currentAttrValue == "#tab3"){
			$("#tab3").load("webSocketInclude.html");
			require(['script/webSocketConnect.js'], function (data){
            	webSocketConnect();
        	});
		} else if( currentAttrValue == "#tab4"){
            $("#tab4").load("diffLog.html");
        } else if(currentAttrValue == "#tab1") {
		require(['script/startPassivLocationsVisare.js'], function(data) {
			startPassivLocationsVisare();
		});
        }
    });
});
