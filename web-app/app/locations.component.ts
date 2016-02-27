import {Component, OnInit} from 'angular2/core';

import {LocationsService} from './locations.service';

//import {ProvidePlugin} from 'webpack';

//import * as io from 'socket.io-client';
//import 'socket.io-client'; mer fel
//var socket = io('213');

//import {Http} from "angular2/http";

// så här enkelt var det visst att använda ett js-script importerat i
// index.html... nu tar jag helg
declare var io: any;
//declare const io;

@Component({
	template: `
		<h2>Ockuperade rum:</h2>
		`,
	providers: [LocationsService]
})

export class LocationsComponent implements OnInit {
	
	messages: string[];
	socket: any;
	
	constructor() {
		console.log("are we here?");
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
		this.socket = io('http://localhost:8000');
		//console.log(LocationsService.getShit());
	}
}