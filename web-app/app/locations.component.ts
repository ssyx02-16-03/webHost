/**
 * Created by edvard on 2016-02-25.
 */

import {Component, OnInit} from 'angular2/core';

import * as io from 'socket.io-client';

import {LocationsService} from './locations.service';

@Component({
	template: `
		<h2>Ockuperade rum:</h2>
		<h3>{{patientLocations}}</h3>
		`,
	providers: [LocationsService]
})

export class LocationsComponent implements OnInit {
	
	//messages: string[];

	//socket = io('http://localhost:8000');

	patientLocations: string = "No locations received yet";
	
	constructor() {
		console.log('are we here?');
		//this.socket = io()
		
	}
 
	
    //constructor(http: Http) {
        //this.messages = [];
		/*
        http.get("/fetch").subscribe((success) => {
            var data = success.json();
            for(var i = 0; i < data.length; i++) {
                this.messages.push(data[i].message);
            }
        }, (error) => {
            console.log(JSON.stringify(error));
        });
		*/
        //this.chatBox = "";
		
	/*	
		this.socket = io('localhost:8000');
        this.socket.on("chat_message", (msg) => {
            this.messages.push(msg);
        });
	*/	
    //}

	socket: any;
	
	
	ngOnInit() {

		// StackExchange säger att man gör såhär i javascript, själv tycker jag det ser förjävligt ut
		var thiz = this;
		
		this.socket = io.connect('http://localhost:8000');
		
		this.socket.on('patientLocations', function(patientLocationss) {
			console.log(thiz.patientLocations);
			console.log('patientLocations received!');
			thiz.patientLocations = JSON.stringify(patientLocationss);
		});

	}
}