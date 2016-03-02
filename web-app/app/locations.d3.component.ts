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
        return 'patientLocations';
    }

    draw(patientLocations) {

        this.kassString = 'ritat ' + ++this.ggrRitat + ' gånger!'

        var dataStr = JSON.stringify(patientLocations);

        d3.select('.textdiv')
            .selectAll('div')
            .data([dataStr])
            .enter().append('div')
            .text(function(d) { return d; });

    }

}