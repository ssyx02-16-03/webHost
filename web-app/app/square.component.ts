/**
 * Created by edvard on 2016-04-06.
 */

import {Component} from 'angular2/core';
import {SquarePatients} from './squarePatient.component';
import {Faces} from './faces.component';
import {barchart_medicinComponent} from './barchart_medicin.component';

@Component({
    template: `
        <squarepatients></squarepatients>
        <faces></faces>
        <medbarchart></medbarchart>
        `,
    styles: [`
       faces {
          position: relative;
          top: -200px;
          left: -500px;
          z-index: 10;
        }
        .chart {
          position: absolute;
          right: 500px;
          top: 200px;
        }
    `], // inte en blekaste om hur man lägger medbarcharten där den ska va... det enda som flyttar på sig är rubriken...
    directives: [SquarePatients, Faces, barchart_medicinComponent]
})

export class SquareComponent {

}