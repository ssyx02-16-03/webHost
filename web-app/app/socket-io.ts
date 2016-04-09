/**
 * Created by edvard on 2016-03-01.
 */

//---------------- är detta en Singleton???

import {Injectable} from 'angular2/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketIO {

    private static socket: any;

    static subscribe(eventType: string, onEventFunction: (eventData: any) => void) {
        this.connect(eventType);
        this.on(eventType, function(data) {
            onEventFunction(data);
            console.log('got data from ' + eventType + ', SocketIO!');
        });
    }

    static connect(eventType: string) {
        if (this.socket == null) {
            this.socket = io.connect(); // stod 'http://localhost:8000' förut
            
            this.socket.on('connectionResponse', function (d) {
                console.log('server responded: ' + d + "!");
                SocketIO.socket.emit('eventType', eventType);
            });

        } else {
            console.log('request response!');
            SocketIO.socket.emit('eventType', eventType);
        }
    }

    static on(eventType: string, onEventFunction: (eventData: any) => void) {
        this.socket.on(eventType, onEventFunction);
    }
}