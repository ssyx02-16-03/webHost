import {Injectable} from 'angular2/core';

@Injectable()
export class Funktion1Service {
	
	getMessage() {
		return Promise.resolve(message);
	}
}

// does not belong here, oh well...
var message: string = "Jag är ett litet meddelande";