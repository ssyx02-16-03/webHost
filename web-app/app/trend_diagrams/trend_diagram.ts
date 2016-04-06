/**
 * Created by edvard on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

export abstract class TrendDiagram {

    abstract getMarkerColors();

    draw(data) {

        var margin = {top: 20, right: 30, bottom: 20, left: 40},
            width = 350 - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;
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

        var allData = data['trend'].concat(data['prediction']);
        x.domain(d3.extent(allData, function(d: any) { return d.x; }));
        var maxValue = d3.max(allData, function (d) { return d['y']; });
        var minValue = d3.min(allData, function (d) { return d['y']; });
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
            .datum(data['trend'])
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "2.5px"); // gör det som CSS:en i styles ovan hade gjort

        svg.append("path")
            .datum(data['prediction'])
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

        var smallR = 5;
        var bigR = 8;
        var colors;

        colors = this.getMarkerColors();

        svg.append("circle")
            .attr("cx", x(data['trend'][2].x))
            .attr("cy", y(data['times']['median']))
            .attr("r", bigR)
            .attr("angle", 360)
            .style("fill", "black");

        for (var key in data['times']) {

            if(key != undefined) {
                svg.append("circle")
                    .attr("cx", x(data['trend'][2].x))
                    .attr("cy", y(data['times'][key]))
                    .attr("r", smallR)
                    .attr("angle", 360)
                    .style("fill", colors[key]);
            }
        }
    }
}