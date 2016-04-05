/**
 * Created by edvard on 2016-04-05.
 */

import {Component} from 'angular2/core';
import {TrendDiagram} from './trend_diagram.ts';
import {TTKDiagram, TTDDiagram, TTTDiagram} from './trend_diagrams.ts';

@Component({
    template: `<ttkdiagram></ttkdiagram>
        <ttddiagram></ttddiagram>
        <tttdiagram></tttdiagram>
        `,
    directives: [TTKDiagram, TTDDiagram, TTTDiagram]
})

export class TrendDiagrams {

}