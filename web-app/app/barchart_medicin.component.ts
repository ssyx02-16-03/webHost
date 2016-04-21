/**
 * Created by asasoderlund on 2016-04-06.
 */

import {Component, OnInit} from 'angular2/core';
import {SocketIO} from './socket-io';

//import * as d3 from 'd3';

import {barchart_medicin} from './barchart_medicin.ts'

@Component({
    selector: 'medbarchart',
    template: `
        <div class="medbarchart" style="margin:0 auto;"></div>
		`,
    directives: [barchart_medicin]
})

export class barchart_medicinComponent implements OnInit {
    static jsonData = {
        "divison": "Medicin Blå",
        "incoming": 2,
        "has_doctor": 8,
        "no_doctor": 11,
        "klar": 4,
        "blue": 1,
        "green": 2,
        "yellow": 11,
        "orange": 8,
        "red": 1,
        "untriaged": 0,
        "rooms_here": 7,
        "inner_waiting_room": 12,
        "at_examination": 2,
        "rooms_elsewhere": 2,
        "total_patients": 25
    };

    /*
     blue    :     0
     divisio     :     "Medicin Blå"
     green     :     0
     has_doctor     :     2
     incoming     :     0
     klar     :     3
     no_doctor     :     2
     orange     :     4
     red     :     0
     total_patients     :     7
     untriaged     :     0
     yellow     :     3

     */


    ngOnInit() {
        barchart_medicin.drawWithRefinedData(barchart_medicinComponent.jsonData);
        SocketIO.subscribe('bar_graphs', function(data){
            barchart_medicin.draw(data);
        })
    }
}
