/**
 * Created by Linnea on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';
import {SocketIO} from './socket-io';
import * as d3 from 'd3';

@Component({
    selector: 'latestTable',
    template: `
        <div class="change_table" style="width:100%;">
        <p style="font-size:200%; font-weight:bold; width:100%; padding-left:5%; ">Senaste ändringar</p>
        <table style="width:100%;">
            <thead></thead>
            <tbody></tbody>
        </table>
        </div>`
})

/*
 what the data will look like
 'infection': [
 {'room': '1', 'occupied': true},
 */
export class changeTable implements OnInit {
    static parentDiv = '.change_table';

    patients = {
        blue: [
            {
                patient_name: "Pat bbb",
                patient_id: 3971342,
                modification_field: "Läkare HELLU17",
                minutes_since: "13",
                current_location: "22"
            },
            {
                patient_name: "Pat bbb",
                patient_id: 3971342,
                modification_field: "Läkare HELLU17",
                minutes_since: "13",
                current_location: "22"
            },
            {
                patient_name: "Pat bbb",
                patient_id: 3971342,
                modification_field: "Läkare HELLU17",
                minutes_since: "13",
                current_location: "22"
            },
        ],
    };

    // Detta sker när componenten initialiseras, dvs när länken till den klickas
    ngOnInit() {
            changeTable.draw(this.patients);
            SocketIO.subscribe('recent_changes', function (data) {
                changeTable.draw(data);
            });
    }

    static draw(data) {
        data = data.blue;

        var headerStyle = "font-size:180%;"
        var cellStyle = "padding: 0.5% 1% 0.5% 1% ; font-size: 160%;";
        var oddRowStyle = "background-color: white";
        var evenRowStyle = "background-color: #ADADAD";
        var rowStyle = [oddRowStyle, evenRowStyle];

        var tableDiv = d3.select(this.parentDiv);
        var table = tableDiv.select('table');
        var thead = table.select('thead');
        var tbody = table.select('tbody');

        var columns = ["patient_id", "patient_name", "modification_field", "minutes_since", "current_location"];
        var colNames = ["Patient id", "Namn", "Ändring", "Minuter sedan", "Plats"];

        tbody.selectAll("*").remove();

        //generate new stuff
        var headers = this.generateHeaders(thead,colNames,headerStyle);
        var rows = this.generateEmptyRows(tbody, data, rowStyle);
        var cells = this.generateCells(rows, columns, cellStyle);

    }

    private static generateHeaders(thead,headerNames,headerStyle){
      var headers = thead.append('tr');
      for(var i=0; i<headerNames.length; i++){
        headers.append('th').text(headerNames[i]).attr("style", headerStyle);
      }

    }

    private static generateEmptyRows(tbody, data, rowStyle) {

        var odd = true;
        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .attr("style", function () {
                if (odd) {
                    odd = false;
                    return rowStyle[0];
                } else {
                    odd = true;
                    return rowStyle[1];
                }
            });
        return rows;
    }

    private static generateCells(rows, columns, cellStyle) {
        var cells = rows.selectAll('td')
            .data(function (row) {
                return columns.map(
                    function (column) {
                        return {column: column, value: row[column]};
                    });
            })
            .enter()
            .append("td")
            .attr("style", cellStyle)
            .html(function (d) {
                if(d.value == null){
                    return ".";
                }else if(d.column == "minutes_since"){
                    return d.value + " min";
                }
                return d.value;
            });

        return cells;
    }
}
