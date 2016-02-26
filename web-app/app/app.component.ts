import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {Funktion1Component} from './funktion1.component';
import {Funktion2Component} from './funktion2.component';
import {LocationsComponent} from './locations.component';

import {Funktion1Service} from './funktion1.service';
import {LocationsService} from './locations.service';

@Component({
    selector: 'app',
    template: `
		<h1>My Third Angular 2 App</h1>
	 	<nav>
			<a [routerLink]="['Funktion1']">En funktion</a>
			<a [routerLink]="['Funktion2']">En annan funktion</a>
			<a [routerLink]="['Locations']">Ockuperade rum</a>
		</nav>
		<router-outlet></router-outlet>
		`,
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
	{
		path: '/funktion1',
		name: 'Funktion1',
		component: Funktion1Component
	},
	{
		path: '/funktion2',
		name: 'Funktion2',
		component: Funktion2Component
	},
	{
		path: '/locations',
		name: 'Locations',
		component: LocationsComponent
	}
])

export class AppComponent { }
