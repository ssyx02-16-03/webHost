/**
 * Created by edvard on 2016-02-25.
 */

import {Component, OnInit} from 'angular2/core';

import {SocketIO} from './socket-io';

import * as io from 'socket.io-client';

@Component({
	template: `
		<h2>Ockuperade rum:</h2>
		<h3>{{patientLocations}}</h3>
		<h3>{{patLoc2}}</h3>
		`,
	providers: [SocketIO]
})

export class LocationsComponent implements OnInit {

	patientLocations: string = "No locations received yet";
	patLoc2: string = "mååe testa SocketIO";
	
	constructor() {
		console.log('are we here?');
	}

	socket: any;
	zocket: any;
	
	
	ngOnInit() {

		// StackExchange säger att man gör såhär i javascript, själv tycker jag det ser förjävligt ut
		var thiz = this;
		
		this.socket = io.connect('http://localhost:8000');
		
		this.socket.on('patientLocations', function(patientLocationss) {
			console.log('patientLocations received!');
			thiz.patientLocations = JSON.stringify(patientLocationss);
		});

		//this.zocket = SocketIO.getInstance();

		SocketIO.on('patientLocations', function(patientLocationss) {
			thiz.patLoc2 = JSON.stringify(patientLocationss);
			console.log('patientLocations received via SocketIO!');
			console.log(patientLocationss);
		});


	}
}