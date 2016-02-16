    
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
          
          $("#tab3").append("connecting to " +url);
          client.connect(login, passcode, function(frame) {
            $("#tab3").append("Connected! subcribing to: " +destination);
            console.log("connected to Stomp");
            client.subscribe(destination, function(message) {
              var body = message.body //should be JSON format.
              $("#tab3").text("size: " +body.length+ "<br />"); //set textmessage
              $("#tab3").append(body); 
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