/**
 * Created by edvard on 2016-03-01.
 */

//---------------- är detta en Singleton???

import {Injectable} from 'angular2/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketIO {

    private static socket: any;

    static connect(eventType: string) {
        if (this.socket == null) {
            this.socket = io.connect('http://localhost:8000');

            var thiz = this;

            this.socket.on('connectionResponse', function (wut) {
                console.log('server responded: ' + wut + "!");
                thiz.socket.emit('eventType', eventType);
            });

        } else {

            var thiz = this;

            this.socket.on('connectionResponse', function (wut) {
                console.log('server responded: ' + wut + "!");
                thiz.socket.emit('eventType', eventType);
            });

        }
        //this.socket.emit('eventType', {heej: eventType} );
    }

    static on(event: string, onEventFunction: (eventData: any) => void) {
        this.socket.on(event, onEventFunction);
    }
}