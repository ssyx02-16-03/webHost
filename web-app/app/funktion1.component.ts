/**
 * Created by edvard on 2016-02-25.
 */

import {Component, OnInit} from 'angular2/core';

import {Funktion1Service} from './funktion1.service';

@Component({
	template: `
		<h2>Jaeg är en funktion</h2>
		<h3>{{message}}</h3>
		`,
	providers: [Funktion1Service]
})

export class Funktion1Component implements OnInit {

	message: string;

	constructor(
		private _funktion1Service: Funktion1Service) { }
	
	ngOnInit() {
		this._funktion1Service.getMessage().then(message => this.message = message);
		console.log(this.message);
	}	
}