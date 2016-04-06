/**
 * Created by edvard on 2016-03-01.
 */

import {Component, OnInit} from '../../node_modules/angular2/core.d';

//import * as d3 from 'd3';

import {D3Testar1D3} from './d3-testar1.ts'

@Component({
    template: `
		<h2>Stapeldiagram</h2>
		<d3></d3>
		`,
    directives: [D3Testar1D3]
})

export class D3Testar1Component implements OnInit {

    ngOnInit() {
        D3Testar1D3.draw();
    }
}