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

        table.style("height", "10%"); // set to very low value to make the rows stack tightly

        var table_width = 14 // the widht to pad the department names to
        var department_translator = {};
        department_translator["medicineYellow"] =   room_table.rightPad("Medicin Gul", table_width);
        department_translator["medicineBlue"] =     room_table.rightPad("Medicin Blå", table_width);
        department_translator["ort_cast"] =          room_table.rightPad("Gips", table_width) ;
        department_translator["surgery"] =          room_table.rightPad("Kirurg", table_width);
        department_translator["triage"] =           room_table.rightPad("Triage", table_width);
        department_translator["acute"] =            room_table.rightPad("Akut", table_width);
        department_translator["jour"] =             room_table.rightPad("Jour", table_width);
        department_translator["orthoped"] =         room_table.rightPad("Ortoped", table_width);

        //create header row
        var tr = thead.append("tr");
        for(var i=0; i < columnKeys.length; i++) {
            thead.select("tr")
                .append("th")
                .attr("style", this.tdStyle)
                .text(department_translator[columnKeys[i]]);
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


    // Pads a string with blankspaces up to length n
    private static rightPad(s, n){
        var len = s.length
        for(var i=0; i<n - len; i++){
            s += "\u00A0" // this is an immortal super-blankspace. trailing mortal blanksapces are ignored by d3
        }
        return s
    }

}


