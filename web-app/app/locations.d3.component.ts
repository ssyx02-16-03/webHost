/**
 * Created by edvard on 2016-03-01.
 */

import {Component} from 'angular2/core'

import * as d3 from 'd3';
import {OnlineComponent} from './online.component.ts';

@Component({
    template: `<div>{{kassString}}</div>
               <div class="textdiv">No locations received yet</div>
               `
})

export class LocationsD3Component extends OnlineComponent {

    kassString = 'inte ritat ännu';
    ggrRitat = 0;

    getEventType(): string {
        return 'freeRooms';
    }

    draw(patientLocations) {

        this.kassString = 'ritat ' + ++this.ggrRitat + ' gånger!'

        var dataStr = JSON.stringify(patientLocations);

        d3.select('.textdiv')
            .selectAll('div')
            .data([dataStr])
            .enter().append('div')
            .text(function(d) { return sliceString(d) });

        function sliceString(string) {

            var str = string;
            //var str = '';
            for(var i = 0; i < 29; i++) {
              //  str = str + string.slice(0 + i * 8, i * 8 + string.length/8) + "\n";
                //if(str.length > i * 30) {
                    str = str.substr(0, i * 30) + "\n" + str.substr(i * 30);
                //}
            }
            return str;
        }

    }

}