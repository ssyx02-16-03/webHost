import {Component, OnInit,Injectable} from 'angular2/core';

import {SocketIO} from './socket-io';

@Component({
    selector: 'brokenData',
    template: `<div id='broken_data_notifier'>
                <h1>I tried, you tried, but the connection, the bus, the webserver_comm or the evlis data logger is down!</h1>
                <p> there will be an offline button here later, but til then you are left in the ugly pink world</p>
                <button (click)='hideBroken()'>Hide this ugly thing!</button>
            </div>`
})

export class BrokenNotifier implements OnInit{
    public static divName:string = 'broken_data_notifier';

    hideBroken(){
      var div = document.getElementById(BrokenNotifier.divName);
      div.style.display ='none';
    }

    showBroken()
    {
      var div = document.getElementById(BrokenNotifier.divName);
      div.style.display ='block';
    }

    ngOnInit(){
      BrokenBox.start();
    }

}
class BrokenBox{
    private static connected:boolean = false;
    public static lastTimeStamp:number = 0;
    private static i = 0;
    private static div:HTMLElement;
    private static timeTilError = 5;

    public static start(){
      BrokenBox.div = document.getElementById(BrokenNotifier.divName);
      SocketIO.subscribe('status_message',function(data){
          BrokenBox.newData(data);
      });
      BrokenBox.alertStatus(false);
      BrokenBox.startBrokenTimer();
    }

    public static newData(data){
      console.log("StatusData!");
      var status = false;
      BrokenBox.lastTimeStamp = data.timestamp/1000;
      if(data.status=='alive'){
        status = true;
      }
      BrokenBox.alertStatus(status);
    }

    public static alertStatus(connected:boolean){
      if(connected){
        BrokenBox.connected = true
        BrokenBox.div.style.display ='none';
      }else{
        BrokenBox.connected = false;
        BrokenBox.div.style.display ='block';
      }
    }

    private static startBrokenTimer(){
        var currentTimeStamp:number = BrokenBox.lastTimeStamp;
        BrokenBox.i = 0;
        window.setInterval(function(){
          BrokenBox.compare(currentTimeStamp);
        },1000);
    }

    public static compare(currentTime:number){
      if(BrokenBox.i>BrokenBox.timeTilError && currentTime >= BrokenBox.lastTimeStamp ){
        BrokenBox.alertStatus(false);
        BrokenBox.i = 0;
      }
      BrokenBox.i++;
    }

}
