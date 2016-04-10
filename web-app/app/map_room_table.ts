/**
 * Created by Oskar on 24-Mar-16.

 not working: css styling from external .css file
*/

import {Component} from 'angular2/core';
import * as d3 from 'd3';

@Component({
    selector: 'abra',
    template: `
        <map_tableContainer style="height:100%; width:100%; margin:0 auto; display: block;" >
            <p style="height:2%;" >Lediga rum</p>
            <table style="height:95%; font-size:120%;"></table>
        </map_tableContainer>           
        `,
})

/*
what the data will look like
'infection': [
    {'room': '1', 'occupied': true},
*/

export class room_table{
    static divName = "map_tableContainer";
    static tdStyle = "padding-left:10px"; //fulfix lyckades inte med en styleUrls: []

    public static draw(data) {
        var columnKeys = Object.keys(data);
        columnKeys.splice('nowhere', 1);
        columnKeys.splice('waiting', 1);
        var emptyrooms = this.listRooms(data, columnKeys);
        var roomTable = this.tabulate(emptyrooms, columnKeys);
    }

    private static listRooms(rawData,columnKeys){
        var emptyrooms = [];
        for (var col = 0; col < columnKeys.length; col++) {
            emptyrooms.push([]);
            var rows = rawData[columnKeys[col]].length;
            for (var row = 0; row < rows; row++) {
                if(rawData[columnKeys[col]][row]['occupied'] == false) {
                    emptyrooms[col].push(rawData[columnKeys[col]][row]['room']); //push data to specific column
                }
            }
            emptyrooms[col].reverse(); //flip the room order in order to make pop() work. pull() doesn't exist.
        }
        return emptyrooms;
    }

    private static tabulate(emptyrooms, columnKeys) {
        var table = d3.select(this.divName).select("table");
        table.selectAll("*").remove();

        var thead = table.append("thead");
        var tbody = table.append("tbody");

        //create header row
        var tr = thead.append("tr");
        for(var i=0; i < columnKeys.length; i++) {
            thead.select("tr")
                .append("th")
                .attr("style", this.tdStyle)
                .text(columnKeys[i]);
        }

        // create rows(and content)
        var roomName = "full";
        for(var i=0; i<150 && roomName != ""; i++){
            tbody.append("tr"); //create empty row
            roomName = "";
            for (var col=0; col < columnKeys.length; col++) {
                roomName = emptyrooms[col].pop();
                tbody.append("td")
                    .attr("style", this.tdStyle)
                    .text(roomName);
            }
        }

    }

}


