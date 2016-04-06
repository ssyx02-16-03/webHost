/**
 * Created by Linnea on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';
import * as d3 from 'd3';

@Component({
    template: `
        <div class="hej"></div>`
})

/*
 what the data will look like
 'infection': [
 {'room': '1', 'occupied': true},
 */
export class changeTable implements OnInit {

    patients =
        [{
            name: "Pat aaa",
            ID: 3971342,
            change: "Läkare HELLU17",
            timeSinceChange: "4",
            location: "27"
        },
        {
            name: "Pat bbb",
            ID: 3971342,
            change: "Läkare HELLU17",
            timeSinceChange: "13",
            location: "22"
        },
        {
            name: "Pat ccc",
            ID: 3971342,
            change: "Läkare HELLU17",
            timeSinceChange: "19", location: "ivr"
        },
    ];

    // Detta sker när componenten initialiseras, dvs när länken till den klickas
    ngOnInit() {
        console.log('Initiated table!');
        //info table: draw table
        var cardTable = d3.select("hej").append("table").attr("style", "float:left; width: 100%; height: 60%");
        var tbody = cardTable.append("tbody");

        var rowStyle ="";
        var cellStyle ="";
        //info table: draw rows and cells
        var tr = tbody.append("tr").attr("style",rowStyle);
        var arrival = tr.append("td").attr("style",cellStyle).text("a");
        var careClock = tr.append("td").attr("style",cellStyle).text(" min");
        tr = tbody.append("tr").attr("style",rowStyle);
        var lastEvent = tr.append("td").attr("style",cellStyle).text("c");
        var status = tr.append("td").attr("style",cellStyle).text("d");
        //this.draw(this.fakeData);
    }
}
