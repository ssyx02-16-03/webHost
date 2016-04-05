/**
 * Created by edvard on 2016-04-05.
 */

import {Component} from 'angular2/core';
import {TrendDiagrams} from './trend_diagrams/trend_diagrams.component';
import {MapComponent} from './map.component';

@Component({
    template: `
        <trend-diagrams style="float:left"></trend-diagrams>
        <map></map>
        `,
    /*styles: [`
        trend-diagrams {
            resize: horizontal;
            width: 100px;
        },
        trend-diagrams:active {
            width: auto;
        }
        trend-diagrams:focus {
            min-width: 200px;
        }
    `],*/
    directives: [TrendDiagrams, MapComponent]
})

export class Coordinator {

}
