/**
 * Created by asasoderlund on 2016-03-30.
 */


import {Component, OnInit} from '../../node_modules/angular2/core.d';

//import * as d3 from 'd3';

import {D3Testar3D3} from './d3-testar3.d3.ts'

@Component({
    template: `
		<h2>Stapeldiagram</h2>
		<d3></d3>
		`,
    directives: [D3Test2D3]
})

export class D3Testar3Component implements OnInit {

    data: number[] = [4, 8, 15, 16, 23, 42];

    ngOnInit() {
        D3Testar3D3.draw(this.data);
    }
}