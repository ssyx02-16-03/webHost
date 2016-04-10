/**
 * Created by edvard on 2016-04-06.
 */

import {Component,OnInit} from 'angular2/core';
import {SquarePatients} from './squarePatient.component';
import {Faces} from './faces.component';
import {barchart_medicinComponent} from './barchart_medicin.component';
import {changeTable} from "./changeTable.component";

@Component({
    template: `
        <placeholder>
                  <faces></faces>
            <squareCards></squareCards>
            <rightDiv>
                <clock></clock>
                <medbarchart></medbarchart>
                <latestTable></latestTable>
            </rightDiv>
            <squareCards></squareCards>
        </placeholder>
        `,
    directives: [Faces, SquarePatients, changeTable, barchart_medicinComponent]
})

export class SquareComponent implements OnInit{
    ngOnInit(){
        var backgroundC = "background-color: #F5F5F5;";
        var border = "border:solid 1px #E0E0E0;";

        var placehold = d3.select("placeholder");
        placehold.attr("style","display:block; width:1920px; height:1080px; position:relative;" +backgroundC);

        //--RIGHT AND LEFT DIV
        var squareCards = placehold.select("squareCards");
        squareCards.attr("style", "display:block; float:left; width:60%;height:100%;");

        var rightDiv = placehold.select("rightDiv");
        rightDiv.attr("style", "display:block; float:left; width:40%;height:100%;");

        //--faces
        var faces = placehold.select("faces");
        faces.attr("style", "display:block; position:absolute; width:20%; height: 15%; top:20%; left:20%;");
        //--INSIDE LEFT DIV
        var faces = squareCards.select('faces')
            .attr("style", "display:block; margin:auto; margin-top:20%; height: 20%; width:40%;"+border);

        //--INSIDE RIGHT DIV
        var clock = rightDiv.select('clock')
            .attr("style","display:block; float:right; width:80%; height:10%;" +border);

        var medbarchart = rightDiv.select('medbarchart')
            .attr("style", "display:block; float:right; clear:both; width:100%; height: 50%;" +border);

        var latestTable = rightDiv.select('latestTable')
            .attr("style", "display:block; float:right; clear:both; width:100%; height:40%;" +border);



    }

}