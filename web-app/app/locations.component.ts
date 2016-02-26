import {Component, OnInit} from 'angular2/core';

import {LocationsService} from './locations.service';

@Component({
	template: `
		<h2>Ockuperade rum:</h2>
		`,
	providers: [LocationsService]
})

export class LocationsComponent implements OnInit {
	
	ngOnInit() {
	}
}