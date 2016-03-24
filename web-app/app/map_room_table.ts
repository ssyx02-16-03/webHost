/**
 * Created by Oskar on 24-Mar-16.
 * copy cated from: http://www.d3noob.org/2013/02/add-html-table-to-your-d3js-graph.html
 */

import {Component} from 'angular2/core';
import * as d3 from 'd3';

@Component({
    selector: '.abra.',
})

/*
'infection': [
    {'room': '1', 'occupied': true},
*/

export class room_table{

    static divName = ".abra";

    public static drawTable(data){
        d3.select(this.divName).text("lite textigt");

        var columns = Object.keys(data);
        var peopleTable = this.tabulate(data, columns);
    }

    public static tabulate(data, columns) {
        var table = d3.select(this.divName).append("table")
            .attr("style", "margin-left: 40px"),
            thead = table.append("thead"),
            tbody = table.append("tbody");

        // append the header row
        thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text("column");

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append("td")
            .attr("style", "font-family: Courier", "padding: 3px")
            .html("cellval");

        return table;
    }

}


