/**
 * Created by edvard on 2016-04-06.
 */

import {Component} from 'angular2/core';
import {SquarePatients} from './squarePatient.component';
import {Faces} from './faces';

@Component({
    template: `
        <squarepatients></squarepatients>
        <faces></faces>
        `,
    styles: [`
       faces {
          position: relative;
          top: -200px;
          left: -500px;
          z-index: 10;
        }
    `],
    directives: [SquarePatients, Faces]
})

export class SquareComponent {

}