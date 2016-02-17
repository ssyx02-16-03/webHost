    
function printPatients(elvisLocation,data){
  $('#log').text("");
  $('#log').append("No of patients: " +elvisLocation.length+ "<br />"); //set textmessage
  $('#log').append("Rooms:<br />"); 
  $('#log').append(JSON.stringify(elvisLocation)); 
}

function webSocketConnect(){
        require(['lib/stomp.js'], function () {
            console.log("imported stomp.js");
            getPass();
        });

      function getPass() {
        $.getJSON( 'pass.json', function( data ) { //requires a running http server
            console.log("imported pass.json");
            socketConnect(data);
          }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        }); //.fail
      }//getPass
}//webSocketConnect    


function socketConnect(data){
  var div = '#tab3';
      if(window.WebSocket) {
          var client, destination;
          var url = "ws://"+data.ip+":61614" +"/stomp";
          var login = data.user;
          var passcode = data.pass;
          //destination = '/topic/elvisDiff';
          destination = '/topic/elvisSnapShot';

          console.log("socketConnect, data:" +url, +" " +login +" " +passcode +" " +destination);
          client = Stomp.client(url);

          client.debug = function(str) {
            console.log(str);
          };
          
          $(div).text("connecting to " +url);
          client.connect(login, passcode, function(frame) {
            $(div).append("Connected! subcribing to: " +destination);
            console.log("connected to Stomp");
            $(div).append("<p id=\"log\"></p>")
            
            client.subscribe(destination, function(message) {
              var data = jQuery.parseJSON(message.body);

              var elvisLocation = [];
              for(var i=0; i<data.patients.length; i++){
                elvisLocation[i] = data.patients[i].Location;
                if(elvisLocation[i] == ""){
                  elvisLocation[i] = "---";
                }
                if(i == data.patients.length-1){
                  printPatients(elvisLocation,data);
                }
              }
            });
          });//client.connect
  
        $('#disconnect').click(function() {
          client.disconnect(function() {
            $('#connected').fadeOut({ duration: 'fast' });
            $('#connect').fadeIn();
            $("#messages").html("");
          });
          return false;
        });
   
        $('#send_form').submit(function() {
          var text = $('#send_form_input').val();
          if (text) {
            client.send(destination, {}, text);
            $('#send_form_input').val("");
          }
          return false;
        });
      } else {
        $("#connect").html("\
            <h1>Get a new Web Browser!</h1>\
            <p>\
            Your browser does not support WebSockets. This example will not work properly.<br>\
            Please use a Web Browser with WebSockets support (WebKit or Google Chrome).\
            </p>\
        ");
      }
}