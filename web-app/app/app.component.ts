/**
 * Created by edvard on 2016-02-25.
 */

import {Component, View} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
//import {bootstrap}    from 'angular2/platform/browser';

import {Funktion1Component} from './funktion1.component';
import {Funktion2Component} from './funktion2.component';
import {LocationsComponent} from './locations.component';
import {D3TestComponent} from './d3-test.component';


//import {ViewComponent} from './d3.component.ts';
import {LocationsD3} from './locations.d3';


// servicar ska la inte ligga här?
//import {Funktion1Service} from './funktion1.service';
import {LocationsService} from './locations.service';

@Component({
    selector: 'app',
    template: `
		<h1>Intelligenta akutmottagningen</h1>
	 	<nav>
			<a [routerLink]="['Funktion1']">En funktion</a>
			<a [routerLink]="['Funktion2']">En annan funktion</a>
			<a [routerLink]="['Locations']">Ockuperade rum</a>
			<a [routerLink]="['D3Test']">D3-test</a>
			<a [routerLink]="['InheritanceTest']">Arv-test</a>
		</nav>
		<router-outlet></router-outlet>
		`,
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
	new Route({path: '/funktion1', component: Funktion1Component, name: 'Funktion1'}),
	new Route({path: '/funktion2', component: Funktion2Component, name: 'Funktion2'}),
	new Route({path: '/locations', component: LocationsComponent, name: 'Locations'}),
	new Route({path: '/d3-test', component: D3TestComponent, name: 'D3Test'}),
	new Route({path: '/extends-test', component: LocationsD3, name: 'InheritanceTest'})

])

export class AppComponent {
}
