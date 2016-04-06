/**
 * Created by edvard on 2016-02-25.
 */

import {Component, OnInit} from 'angular2/core';

import {SocketIO} from './../socket-io';

@Component({
	template: `
		<h2>Ockuperade rum</h2>
		<h3>{{patientLocations}}</h3>
		<h3>{{patLoc2}}</h3>
		`,
	providers: [SocketIO]
})

export class LocationsComponent implements OnInit {
	

	private patientLocations: string = "No locations received yet";
	
	ngOnInit() {

		// StackExchange säger att man gör såhär i javascript, själv tycker jag det ser förjävligt ut
		var thiz = this;

		// behövde visst connecta såhär innan för att hela on-funktionen ska funka, misstänker asynkron-grej
		SocketIO.connect('patientLocations');

		SocketIO.on('patientLocations', function(patientLocationss) {
			thiz.patientLocations = JSON.stringify(patientLocationss);
			console.log('patientLocations received via SocketIO!');
			console.log(thiz.patientLocations);
		});
	}
}