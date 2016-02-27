import {Injectable} from 'angular2/core';
import {Http} from "angular2/http";


//import * as io from 'socket.io-client';

@Injectable()
export class LocationsService {
	
	constructor(private _http: Http) {}
	
	getShit() {
		return "skit";
	}

}
