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
    directives: [TrendDiagrams, MapComponent]
})

export class Coordinator {

}
