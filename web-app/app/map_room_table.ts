/**
 * Created by Oskar on 24-Mar-16.

 Things to fix:
 1. make a list or hashmap out of the occupied rooms.
    Something that makes creation of rows in the table easy and quick with less complexity than now.
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
        d3.select(this.divName).text("Lediga rum");

        var columnKeys = Object.keys(data);
        var peopleTable = this.tabulate(data, columnKeys);
    }

    public static tabulate(data, columnKeys) {
        var table = d3.select(this.divName).append("table")
            .attr("style", "margin-left: 40px"),
            thead = table.append("thead"),
            tbody = table.append("tbody");

        //header row
        var tr = thead.append("tr");
        for(var i=0; i < columnKeys.length; i++) {
            thead.select("tr")
                .append("th")
                .attr("style","padding: 5px")
                .text(columnKeys[i]);
        }

        // create rows(and content)
        for(var row=0; row < 14; row++) { //should somehow be done until its done,
            var id = "table_" +row;
            tbody.append("tr").attr("id",id); //create empty row
            var id ="#table_" +row;
            for (var col=0; col < columnKeys.length; col++) {

                if(data[columnKeys[col]][row] != null) {
                    if (data[columnKeys[col]][row]['occupied'] == false) {
                        console.log(data[columnKeys[col]][row]);
                        tbody.select(id)
                            .append("td")
                            .text(data[columnKeys[col]][row]['room']);
                    }
                }else{
                    tbody.select(id)
                        .append("td")
                }
            }
        }

    }

}


