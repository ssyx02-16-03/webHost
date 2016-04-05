/**
 * Created by edvard on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

export abstract class TrendDiagram implements OnInit {

    x: any = [-2, -1, 0, 1]
    y: any = [5, 6, 4, 6]

    //data: any = [];
    data: any = {'lin': [], 'times': {'blue': 4.5, 'yellow': 4.2, 'orange': 3.5, 'median': 3.9}}

    ngOnInit() {

        for(var i = 0; i < this.x.length; i++) {
            this.data['lin'].push({'x': this.x[i], 'y': this.y[i]});
        }

        this.draw(this.data);
    }

    draw(data) {

        var margin = {top: 40, right: 40, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        //hIndraw = 0.1 * width,
        //vIndraw = 0.2 * height;

        var x = d3.scale.linear()
            .range([0, width]);
        //.range([hIndraw, width - hIndraw]);

        var xstr = d3.scale.ordinal()
            .domain(["-2 timmar", "-1 timme", "nu", "+1 timme"])
            .rangePoints([0, width]);

        var y = d3.scale.linear()
            .range([0, height]);
        //.range([height - vIndraw, vIndraw]);

        var xAxis = d3.svg.axis()
            .scale(xstr)
            //.tickValues(['ett', 'two', 'three'])
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        /* fattar inte hur denna funkar...
         var circle = d3.geo.circle()
         .origin([5.0, 0]);
         */

        var line = d3.svg.line()
            .x(function(d: any) { return x(d.x); })
            .y(function(d: any) { return y(d.y); });

        var svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data['lin'], function(d: any) { return d.x; }));
        //y.domain(d3.extent(data['lin'], function(d: any) { return d.y; }));
        var maxValue = d3.max(data['lin'], function (d) { return d['y']; });
        var minValue = d3.min(data['lin'], function (d) { return d['y']; });
        console.log(maxValue);
        y.domain([maxValue + 1, minValue - 1]); // gör det som Indraw gjorde förut, fast korrekt

        //---------------------------------------------------//
        //------------- color-coded background --------------//
        var ylims = [6.0, 4.5];
        svg.append("rect")
            .attr("width", width)
            .attr("height", y(ylims[0]))
            .attr("fill", "red");

        svg.append("rect")
            .attr("y", y(ylims[0]))
            .attr("width", width)
            .attr("height", y(ylims[1]) - y(ylims[0]))
            .attr("fill", "brown");

        svg.append("rect")
            .attr("y", y(ylims[1]))
            .attr("width", width)
            .attr("height", y(ylims[1]) - y(ylims[0]))
            .attr("fill", "green");

        svg.append("path")
            .datum(data['lin'].slice(0,3))
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "2.5px"); // gör det som CSS:en i styles ovan hade gjort

        svg.append("path")
            .datum(data['lin'].slice(2,4))
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-dasharray", "5,5")
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

        //---------------------------------------------------//
        //-------------------- circles ----------------------//

        var smallR = 10;
        var bigR = 15;

        svg.append("circle")
            .attr("cx", x(data['lin'][2].x))
            .attr("cy", y(data['times']['blue']))
            .attr("r", smallR)
            .attr("angle", 360)
            .style("fill", "blue");

        svg.append("circle")
            .attr("cx", x(data['lin'][2].x))
            .attr("cy", y(data['times']['yellow']))
            .attr("r", smallR)
            .attr("angle", 360)
            .style("fill", "yellow");

        svg.append("circle")
            .attr("cx", x(data['lin'][2].x))
            .attr("cy", y(data['times']['orange']))
            .attr("r", smallR)
            .attr("angle", 360)
            .style("fill", "orange");

        svg.append("circle")
            .attr("cx", x(data['lin'][2].x))
            .attr("cy", y(data['times']['median']))
            .attr("r", bigR)
            .attr("angle", 360)
            .style("fill", "black");
    }
}