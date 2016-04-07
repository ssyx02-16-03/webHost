/**
 * Created by asasoderlund on 2016-04-06.
 */

import {Component, OnInit} from 'angular2/core';

//import * as d3 from 'd3';

import {barchart_medicin} from './barchart_medicin.ts'

@Component({
    template: `
		<h2>Stapeldiagram</h2>
		<d3></d3>
		`,
    directives: [barchart_medicin]
})

export class barchart_medicinComponent implements OnInit {

    ngOnInit() {
        barchart_medicin.draw();
    }
}