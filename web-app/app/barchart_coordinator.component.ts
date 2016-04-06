/**
 * Created by edvard on 2016-03-01.
 */

import {Component, OnInit} from 'angular2/core';

//import * as d3 from 'd3';

import {barchart_coordinator} from './barchart_coordinator.ts'

@Component({
    selector: 'coordbarchart',
    template: `
		<h2>Stapeldiagram</h2>
		<d3></d3>
		`,
    directives: [barchart_coordinator]
})

export class barchart_coordinatorComponent implements OnInit {

    ngOnInit() {
        barchart_coordinator.draw();
    }
}