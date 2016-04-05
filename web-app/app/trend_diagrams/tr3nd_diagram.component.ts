/**
 * Created by edvard on 2016-04-05.
 */

import {Component} from "angular2/core";
import {TrendDiagram} from './trend_diagram.component.ts';

@Component({
    selector: 'tr3nddiagram',
    template: '<div class="chart"></div>'//,
//    directives: [Tr3ndDiagram]
})

export class Tr3ndDiagram extends TrendDiagram {

}

@Component({
    selector: 'tr2nddiagram',
    template: '<div class="chart"></div>'//,
//    directives: [Tr3ndDiagram]
})

export class Tr2ndDiagram extends TrendDiagram {

}
