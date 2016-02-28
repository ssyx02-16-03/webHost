import {Component, OnInit} from 'angular2/core';

import {LocationsService} from './locations.service';

//import * as io from 'socket.io-client';
//import 'socket.io-client'; mer fel
//var socket = io('213');

//import {Http} from "angular2/http";

// så här enkelt var det visst att använda ett js-script importerat i
// index.html... 
declare var io: any;
//declare const io;

@Component({
	template: `
		<h2>Ockuperade rum:</h2>
		<h3>{{patientLocations}}</h3>
		`,
	providers: [LocationsService]
})

export class LocationsComponent implements OnInit {
	
	//messages: string[];
	socket: any;
	patientLocations: string = "No locations received yet";
	
	constructor() {
		console.log('are we here?');
		//this.socket = io();
		
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
	
	
	ngOnInit() {
		
		// StackExchange säger att man gör såhär i javascript, själv tycker jag det ser förjävligt ut
		var thiz = this;
		
		this.socket = io('http://localhost:8000');
		
		this.socket.on('patientLocations', function(patientLocationss) {
			console.log(thiz.patientLocations);
			console.log('patientLocations received!');
			thiz.patientLocations = JSON.stringify(patientLocationss);
			//console.log(this.patientLocations);
		});
	}
}