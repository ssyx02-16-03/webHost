/**
 * Created by edvard on 2016-04-05.
 */

import {Component} from 'angular2/core';
import {TrendDiagrams} from './trend_diagrams/trend_diagrams.component';
import {MapComponent} from './map.component';
import {barchart_coordinatorComponent} from './barchart_coordinator.component';

@Component({
    template: `
        <trend-diagrams style="float:left"></trend-diagrams>
        <map style="float:left"></map>
        <coordbarchart></coordbarchart>
        `,
    directives: [TrendDiagrams, MapComponent, barchart_coordinatorComponent]
})

export class Coordinator {

}
