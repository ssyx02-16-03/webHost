/**
 * Created by edvard on 2016-03-01.
 */

import {Component} from 'angular2/core'

import * as d3 from 'd3';
import {D3Component} from './d3.component';

@Component({
    template: '<div>yooo</div> <div class="textdiv"></div>'
})

export class LocationsD3 extends D3Component {

    getEventType(): string {
        return 'patientLocations';
    }

    draw(patientLocations) {

        var dataStr = JSON.stringify(patientLocations);

        d3.select('.textdiv')
            .selectAll('div')
            .data([dataStr])
            .enter().append('div')
            .text(function(d) { return d; });

    }

}