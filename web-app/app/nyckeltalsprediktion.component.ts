/**
 * Created by edvard on 2016-03-22.
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
        .line {
            fill: none;
            stroke: steelblue;
            stroke-width: 1.5px;
        }
        `] // style verkar inte fungera.. pga anguar? men bara att lägga till i JS:en istället
})

export class NyckeltalsPrediktionComponent implements OnInit {

    x: any = [-2, -1, 0, 1]
    y: any = [5, 6, 4, 6]

    data: any = [];

    ngOnInit() {

        for(var i = 0; i < this.x.length; i++) {
            this.data.push({'x': this.x[i], 'y': this.y[i]});
        }

        this.draw(this.data);
    }

    draw(data) {

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            hIndraw = 0.1 * width,
            vIndraw = 0.2 * height;


        var x = d3.scale.linear()
            .range([hIndraw, width - hIndraw]);

        var xstr = d3.scale.ordinal()
            .domain(["-2 timmar", "-1 timme", "nu", "+1 timme"])
            .rangePoints([0, width]);

        var y = d3.scale.linear()
            .range([height - vIndraw, vIndraw]);

        var xAxis = d3.svg.axis()
            .scale(xstr)
            //.tickValues(['ett', 'two', 'three'])
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d: any) { return x(d.x); })
            .y(function(d: any) { return y(d.y); });

        var svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d: any) { return d.x; }));
        y.domain(d3.extent(data, function(d: any) { return d.y; }));

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2.5px"); // gör det som CSS:en i styles ovan hade gjort

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