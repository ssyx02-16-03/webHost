/**
 * Created by edvard on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';
import {TrendDiagrams} from './trend_diagrams/trend_diagrams.component';
import {MapComponent} from './map.component';
import {barchart_coordinatorComponent} from './barchart_coordinator.component';

@Component({
    template: `
        <placeholder_coordinator>
            <coordbarchart></coordbarchart>
            <clock_coord></clock_coord>
            <map></map>
            <trend-diagrams></trend-diagrams>
        </placeholder_coordinator>
        `,
    directives: [TrendDiagrams, MapComponent, barchart_coordinatorComponent]
})

export class Coordinator implements OnInit{
    ngOnInit() {
        var placehold = d3.select("placeholder_coordinator");
        placehold.attr("style","display:block; width:1920px; height:1080px; background-color:gray");

        var barChart = placehold.select("coordbarchart");
        barChart.attr("style", "display:block; float:left; width:40%; height:50%; background-color:green;");

        var clock_coord = placehold.select("clock_coord");
        clock_coord.attr("style","display:block; float:right; width:25%; height:10%; background-color:blue");

        var trend = placehold.select("trend-diagrams");
        trend.attr("style", "display:block; float:left; clear:left; width:40%; height:50%; background-color:yellow;");

        var map = placehold.select("map");
        map.attr("style", "display:block; float:right; width:60%; height: 90%; background-color:#F5F5F5;" );
    }

}
