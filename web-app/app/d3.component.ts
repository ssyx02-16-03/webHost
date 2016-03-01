/**
 * Created by edvard on 2016-03-01.
 */

import {Component, OnInit} from 'angular2/core';

import {SocketIO} from './socket-io';

@Component({
    providers: [SocketIO]
})

export abstract class D3Component implements OnInit {

    abstract getEventType(): string;
    abstract draw(eventData: any);

    ngOnInit() {

        // behövde visst connecta såhär innan för att hela on-funktionen ska funka, misstänker asynkron-grej
        SocketIO.connect();

        // StackExchange säger att man gör såhär i javascript, själv tycker jag det ser förjävligt ut
        var thiz = this;

        SocketIO.on(this.getEventType(), function(eventData) {
            console.log(thiz.getEventType() + ' received via SocketIO!');
            thiz.draw(eventData);
        });
    }

}