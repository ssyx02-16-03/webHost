/**
 * Created by edvard on 2016-04-06.
 */

import {Component,OnInit} from 'angular2/core';
import {SquarePatients} from './squarePatient.component';
import {Faces} from './faces.component';
import {barchart_medicinComponent} from './barchart_medicin.component';
import {changeTable} from "./changeTable.component";
import {Clock} from "./clock.component";
import {BrokenNotifier} from './broken_data_notifier';

@Component({
    template: `
        <placeholder>
            <faces></faces>
            <squareCards></squareCards>
            <rightDiv>
                <clock_coord></clock_coord>
                <medbarchart></medbarchart>
                <latestTable></latestTable>
            </rightDiv>
        </placeholder>
        <brokenData><brokenData>
        `,
    directives: [Clock, SquarePatients, changeTable, barchart_medicinComponent,BrokenNotifier] // Faces hidden
})

export class SquareComponent implements OnInit{
    ngOnInit(){
        var backgroundC = "background-color: #F5F5F5;";
        var border = "border:solid 1px #E0E0E0;";

        var placehold = d3.select("placeholder");
        placehold.attr("style","display:block; position:relative;");
        placehold.attr("class","placeholder");

        //--RIGHT AND LEFT DIV
        var squareCards = placehold.select("squareCards");
        squareCards.attr("style", "display:block; float:left; width:60%;height:100%;");

        var rightDiv = placehold.select("rightDiv");
        rightDiv.attr("style", "display:block; float:left; width:40%;height:100%;");

        //--faces
        var faces = placehold.select("faces");
        faces.attr("style", "display:block; position:absolute; width:20%; height: 15%; top:20%; left:15%;");


        //--INSIDE RIGHT DIV
        var clock = rightDiv.select('clock_coord')
            .attr("style","display:block; float:right; width:100%; height:10%;" +border);

        var medbarchart = rightDiv.select('medbarchart')
            .attr("style", "display:block; float:right; clear:both; width:100%; height: 50%;" +border);

        var latestTable = rightDiv.select('latestTable')
            .attr("style", "display:block; float:right; clear:both; width:100%; height:40%;" +border);



    }

}
