import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'brokenData',
    template: `<div id='broken_data_notifier'>
            <h1>I tried, you tried, but the connection, the bus, the webserver_comm or the evlis data logger is down!</h1>
            <p> there will be an offline button here later, but til then you are left in the ugly pink world</p>
            <button (click)='hideBroken()'>Hide this ugly thing!</button>
            </div>`
})

export class BrokenNotifier implements OnInit{
  private static divName:string = 'broken_data_notifier';
  private static div:HTMLElement;
  private static broken:boolean = false;

    ngOnInit(){
      BrokenNotifier.div = document.getElementById(BrokenNotifier.divName);
      BrokenNotifier.alertUser(true);
      console.log("subscribed");
      document.body.addEventListener("broken_data", BrokenNotifier.goBroken, false);
    }

    public static goBroken(e){ //launched every time broken_data event is called
      console.log("goBroken");
      if(e.detail == BrokenNotifier.broken){ //no change
        return;
      }
      BrokenNotifier.alertUser(e.detail);
    }

    private static alertUser(enable:boolean){
      if(enable){
        BrokenNotifier.broken = true
        BrokenNotifier.div.style.display ='block';
      }else{
        BrokenNotifier.broken = false;
        BrokenNotifier.div.style.display ='none';
      }
    }

    hideBroken(){
      BrokenNotifier.div.style.display ='none';
    }
}
