/**
 * Created by edvard on 2016-03-01.
 */

//---------------- är detta en Singleton???

import {Injectable} from 'angular2/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketIO {

    //static socketIO: SocketIO;

    private static socket = io.connect('http://localhost:8000');

    /*
    static getInstance() {
        if(SocketIO.socketIO == null) {

        }
    }
    */

    public static on(event: string, onEventFunction: (eventData: any) => void) {
        this.socket.on(event, onEventFunction);
    }
}