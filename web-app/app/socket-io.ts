/**
 * Created by edvard on 2016-03-01.
 */

//---------------- är detta en Singleton???

import {Injectable} from 'angular2/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketIO {
    public static waitedTooLong:boolean = true;
    private static secondsSinceData:number = 0;
    private static socket: any;
    public static connected:boolean = false;

    private static emitBroken(state:boolean){
      var myEvent = new CustomEvent("broken_data",
        {
          'detail' : state
        });
      document.body.dispatchEvent(myEvent);

    }

    private static resetCounter(){
      this.secondsSinceData = 0;
      this.waitedTooLong = false;
      this.emitBroken(false);
    }

    private static brokenCounter(){
      this.secondsSinceData++;
      if(this.secondsSinceData > 10){
        console.log("brokenCounter: no data for more than 10 seconds! :(");
        this.waitedTooLong = true;
        this.emitBroken(true);
      }
      setTimeout(function(){ SocketIO.brokenCounter(); }, 1000);
    }

    public static subscribe(eventType: string, onEventFunction: (eventData: any) => void) {
        this.connect(eventType);
        this.on(eventType, function(data) {
            SocketIO.resetCounter();
            onEventFunction(data);
            console.log('got data from ' + eventType + ', SocketIO!');
        });
    }

    public static connect(eventType: string) {
        if (this.socket != null) {
          console.log('request response!');
          this.socket.emit('eventType', eventType);
          return;
        }
        this.socket = io.connect(); // stod 'http://localhost:8000' förut
        SocketIO.brokenCounter(); //start to count

        this.socket.on('connectionResponse', function (d) {
            SocketIO.connected = true;
            console.log('server responded: ' + d + "!");
            SocketIO.socket.emit('eventType', eventType);
        });
    }

    public static on(eventType: string, onEventFunction: (eventData: any) => void) {
        SocketIO.socket.on(eventType, onEventFunction);
    }
}
