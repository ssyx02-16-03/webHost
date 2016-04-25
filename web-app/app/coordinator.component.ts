/**
 * Created by edvard on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';
import {TrendDiagrams} from './trend_diagrams/trend_diagrams.component';
import {MapComponent} from './map.component';
import {barchart_coordinatorComponent} from './barchart_coordinator.component';
import {Clock} from "./clock.component";
import {BrokenNotifier} from './broken_data_notifier';

@Component({
    template: `
        <placeholder_coordinator>
            <coordbarchart>
            </coordbarchart>
            <clock_coord></clock_coord>
            <map></map>
            <trend-diagrams></trend-diagrams>
        </placeholder_coordinator>
        <brokenData></brokenData>
        `,
    directives: [Clock, TrendDiagrams, MapComponent, barchart_coordinatorComponent,BrokenNotifier]
})

export class Coordinator implements OnInit{
    ngOnInit() {
        var backgroundC = "background-color: #F5F5F5;";
        var border = "border:solid 1px #E0E0E0;";

        var placehold = d3.select("placeholder_coordinator");
        placehold.attr("style","display:block; width:1920px; height:1080px;" +backgroundC );

        var barChart = placehold.select("coordbarchart");
        barChart.attr("style", "display:block; float:left; width:40%; height:50%;" +border);

        var clock_coord = placehold.select("clock_coord");
        clock_coord.attr("style","display:block; float:right; width:25%; height:10%;" +border );

        var trend = placehold.select("trend-diagrams");
        trend.attr("style", "display:block; float:left; clear:left; width:40%; height:50%;" +border);

        var map = placehold.select("map");
        map.attr("style", "display:block; float:right; width:60%; height: 90%;" +border);
    }

}
