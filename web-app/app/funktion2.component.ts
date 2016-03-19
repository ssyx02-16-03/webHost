/**
 * Created by edvard on 2016-02-25.
 */

import {Component, OnInit} from 'angular2/core';
import {SocketIO} from './socket-io';

@Component({
	template:
		'<h2>webserver_comm-test</h2>' +
		'<h3 id="funktion2_test">{{test_string}}</h3>',
	providers: [SocketIO]
})

export class Funktion2Component implements OnInit {

	test_string: string = "Nothing recieved yet";

	ngOnInit() {
        console.log('init..');
		// behövde visst connecta såhär innan för att hela on-funktionen ska funka, misstänker asynkron-grej
		SocketIO.connect('webserver_test');
		SocketIO.on('webserver_test', function(data){
            d3.select('#funktion2_test').text(data);
            console.log('test worked! SocketIO!');
		});
	}


}