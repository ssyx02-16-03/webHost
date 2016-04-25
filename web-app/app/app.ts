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
			<h1 id='title' *ngIf='! fullscreen'>{{title}}</h1>
	 		<div id="menu" *ngIf='! fullscreen'>
				<div id='menubutton'
					*ngFor='#component of components'
					[routerLink]='[component.name]'
					(click)='title = component.name'>
						{{component.name}}
				</div>
	 		</div>
	 		<div id='outlet'>
				<router-outlet></router-outlet>
			</div>
                        <button *ngIf='! fullscreen'
                             (click)='toggleFullScreen()'>Helskärmsläge</button>
		</div>
		`,
	styleUrls: ['app/app.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})
@RouteConfig(getRoutes())

export class App {

	title = 'Intelligenta akutmottagningen';
  static fullscreen:boolean = false;

	// *ngFor wants this
	components = COMPONENTS;

  hej() {
      console.log("hej");
  }

  toggleFullScreen() {
      if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
        this.fullscreen = true;
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } //else {
       // this.fullscreen = false;
       // if (document.exitFullscreen) {
       //   document.exitFullscreen();
       // } else if (document.msExitFullscreen) {
       //   document.msExitFullscreen();
       // } else if (document.mozCancelFullScreen) {
       //   document.mozCancelFullScreen();
       // } else if (document.webkitExitFullscreen) {
       //   document.webkitExitFullscreen();
       // }
      //}
    }
}

function getRoutes(): Route[] {

	var routes: Route[] = [];
	for(var i = 0; i < COMPONENTS.length; i++) {
		routes.push(new Route({path: COMPONENTS[i].path, component: COMPONENTS[i].component, name: COMPONENTS[i].name}));
	}
	return routes;
}
