/**
 * Created by edvard on 2016-02-25.
 */

import {Component} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {COMPONENTS} from './components';

@Component({
    selector: 'app',
    template: `
    	<div id='center'>
			<h1 id='title'>{{title}}</h1>
	 		<div id='menubutton'
	 			*ngFor='#component of components'
	 			[routerLink]='[component.name]'
	 			(click)='title = component.name'>
	 				{{component.name}}
	 		</div>
	 		<div id='outlet'>
				<router-outlet></router-outlet>
			</div>
		</div>
		`,
	styleUrls: ['app/app.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})

@RouteConfig(getRoutes())


export class App {

	title = 'Intelligenta akutmottagningen';

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