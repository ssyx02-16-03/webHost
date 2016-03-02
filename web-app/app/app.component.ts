/**
 * Created by edvard on 2016-02-25.
 */

import {Component} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
//import {bootstrap}    from 'angular2/platform/browser';

import {COMPONENTS} from './components';

@Component({
    selector: 'app',
    template: `
		<h1>Intelligenta akutmottagningen</h1>
	 	<nav>
	 		<a *ngFor='#component of components' [routerLink]='[component.name]'>{{component.name}}</a>
		</nav>
		<router-outlet></router-outlet>
		`,
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})

@RouteConfig(getRoutes())


export class AppComponent {

	// *ngFor wants this
	components = COMPONENTS;
}

function getRoutes(): Route[] {

	var routes: Route[] = [];
	for(var i = 0; i < COMPONENTS.length; i++) {
		routes.push(new Route({path: COMPONENTS[i].path, component: COMPONENTS[i].component, name: COMPONENTS[i].name}));
	}
	return routes;
}