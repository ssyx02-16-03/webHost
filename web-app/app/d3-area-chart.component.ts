/**
 * Created by edvard on 2016-03-04.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    template: '<div class="chart"></div>',
    styles: [`
        .chart {
            font: 10px sans-serif;
        }
        .axis path, .axis line {
            fill: none;
            stroke: #000;
            shape-rendering: crispEdges;
        }
        .area {
            fill: steelblue;
        }
        `] // style verkar inte fungera.. pga anguar? men bara att lägga till i JS:en istället
})

export class D3AreaChartComponent implements OnInit {

    x: any = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260];
    y: any = [5, 20, 45, 50, 51, 131, 150, 120, 110, 105, 101, 170, 140, 120];

    data: any = [];
    /*
    //The data for our line
    lineData: any = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
        { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
        { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
    */

    ngOnInit() {

        for(var i = 0; i < this.x.length; i++) {
            this.data.push({'x': this.x[i], 'y': this.y[i]});
        }

        this.draw(this.data);
    }

    draw(data) {

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var area = d3.svg.area()
            .x(function(d: any) { return x(d.x); })
            .y0(height)
            .y1(function(d: any) { return y(d.y); });

        var svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d: any) { return d.x; }));
        y.domain([0, d3.max(data, function(d: any) { return d.y; })]);

        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area)
            .style("fill", "steelBlue"); // gör det som CSS:en i styles ovan hade gjort

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("någooot");
        //});



    }
}