/**
 * Created by edvard on 2016-03-01.
 */

import {Component, OnInit} from '../../node_modules/angular2/core.d';

import {SocketIO} from './../socket-io';

@Component({
    providers: [SocketIO]
})

export abstract class OnlineComponent implements OnInit {

    /**
     * Eventtypen är en sträng som webservern märker en viss typ av data med, exempelvis märks datan med patientplatser
     * 'patientLocations'. Låt metoden returnera önskad eventtyp.
     */
    abstract getEventType(): string;

    /**
     * Anropas varje gång webservern skickar ut eventData av typen eventType
     *
     * @param eventData är data av en viss eventtyp som skickas ut från servern
     */
    abstract draw(eventData: any);

    ngOnInit() {

        // behövde visst connecta såhär innan för att hela on-funktionen ska funka, misstänker asynkron-grej
        SocketIO.connect(this.getEventType());

        // StackExchange säger att man gör såhär i javascript, själv tycker jag det ser förjävligt ut
        var thiz = this;

        SocketIO.on(this.getEventType(), function(eventData) {
            console.log(thiz.getEventType() + ' received via SocketIO!');
            thiz.draw(eventData);
        });
    }

}