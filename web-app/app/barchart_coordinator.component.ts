/**
 * Created by edvard on 2016-03-01.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

import {barchart_coordinator} from './barchart_coordinator.ts'
import {SocketIO} from './socket-io';

@Component({
    selector: 'coordbarchart',
    template: `
        <header class="header"> </header>
		<svg class='baarchart'></svg>
		`,
    directives: [barchart_coordinator],
    providers: [SocketIO]
})

export class barchart_coordinatorComponent implements OnInit {

    ngOnInit() {
        var jsonData = [
            {   "division": "incoming",
                "incoming": 0,
                "has_doctor": 0,
                "no_doctor": 0,
                "klar": 0,
                "blue": 0,
                "green": 0,
                "yellow": 0,
                "orange": 0,
                "red": 0,
                "untriaged": 9,
                "total_patients": 9
            },
            {
                "division": "Medicin Blå",
                "incoming": 0,
                "has_doctor": 8,
                "no_doctor": 11,
                "klar": 4,
                "blue": 0,
                "green": 2,
                "yellow": 11,
                "orange": 8,
                "red": 2,
                "untriaged": 0,
                "total_patients": 23
            },
            {
                "division": "Medicin Gul",
                "incoming": 2,
                "has_doctor": 6,
                "no_doctor": 10,
                "klar": 4,
                "blue": 1,
                "green": 1,
                "yellow": 9,
                "orange": 8,
                "red": 1,
                "untriaged": 0,
                "total_patients": 22
            },
            {
                "division": "Kirurg", // division
                "incoming": 1, // incoming
                "has_doctor": 5, // has_doctor
                "no_doctor": 8, // no_doctor
                "klar": 3, // klar
                "blue": 0, // blue
                "green": 1,
                "yellow": 8,
                "orange": 5,
                "red": 2,
                "untriaged": 0, // untriaged
                "total_patients": 17 // total_patients
            },
            { "division": "Ortoped", "incoming": 1, "has_doctor": 3, "no_doctor": 6, "klar": 0, "blue": 0, "green" :3, "yellow": 5, "orange":1, "red":0, "untriaged": 0, "total_patients": 10},
            { "division": "Jour", "incoming": 2, "has_doctor": 1, "no_doctor": 5, "klar":1, "blue": 0, "green" :1, "yellow": 3, "orange":3, "red":0, "untriaged": 0, "total_patients": 9}];

        barchart_coordinator.draw(jsonData);

        SocketIO.subscribe('bar_graphs', function(data) {
            this.jsonData = data['bars'];
            barchart_coordinator.draw(this.jsonData);
        });

    }
}