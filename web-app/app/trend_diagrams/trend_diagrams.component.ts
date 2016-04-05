/**
 * Created by edvard on 2016-04-05.
 */

import {Component, View} from 'angular2/core';
import {TrendDiagram} from './trend_diagram.component.ts';
import {Tr3ndDiagram, Tr2ndDiagram} from './tr3nd_diagram.component.ts';

@Component({
    template: `<tr3nddiagram></tr3nddiagram>
        <tr2nddiagram></tr2nddiagram>
        `,
    directives: [Tr3ndDiagram, Tr2ndDiagram]
})

export class TrendDiagrams {

}