/**
 * Created by edvard on 2016-03-01.
 */

import {Component, OnInit} from 'angular2/core';

//import * as d3 from 'd3';

import {D3TestD3} from './d3-test.d3'

@Component({
	template: `
		<h2>D3 verkar rätt schysst</h2>
		<d3></d3>
		`,
	directives: [D3TestD3]
})

export class D3TestComponent implements OnInit {

	data: number[] = [4, 8, 15, 16, 23, 42];

	ngOnInit() {
		D3TestD3.draw(this.data);
	}
}