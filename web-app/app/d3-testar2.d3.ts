/**
 * Created by asasoderlund on 2016-03-26.
 */

import {Component} from 'angular2/core';

import * as d3 from 'd3';



@Component({
    /*selector: 'd3',
     template: `
     <div class='chart'></div>
     <svg class='svgchart'></svg>
     `*/



    selector: 'd3',
    template: `
    <svg class='chart'></svg>
    `,
    directives: [D3Testar2D3]
})

export class D3Testar2D3 {

    public static draw(data:number[]) {

        var jsonData = [
            {
                "torg": "medicinblå",
                "tittade": 5,
                "otittade": 3,
                "green": 4,
                "blue": 1,
                "yellow": 8,
                "orange": 9,
                "red": 2
            },
            {
                "torg": "medicingul",
                "tittade": 18,
                "otittade": 4,
                "green": 8,
                "blue": 4,
                "yellow": 8,
                "orange": 9,
                "red": 2
            },
            {
                "torg": "kirurg",
                "tittade": 12,
                "otittade": 1,
                "green": 1,
                "blue": 1,
                "yellow": 8,
                "orange": 9,
                "red": 3
            }];
        //{ "torg": "ortoped", "tittade": 12, "otittade": 1, "green": 1, "blue" :1, "yellow": 8, "orange":9, "red":3},
        //{ "torg": "jour", "tittade": 12, "otittade": 1, "green": 1, "blue" :1, "yellow": 8, "orange":9, "red":4}];

        var width = 200,
            height = 300;

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(jsonData, function (d) {
                return d.tittade + d.otittade + d.green;
            })]);

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

        var barWidth = width / jsonData.length;

        var bar = chart.selectAll("g")
            .data(jsonData)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * barWidth + ",0)";
            });

        bar.append("rect")
            .attr("y", function (d) {
                return y(d.tittade);
            })
            .attr("height", function (d) {
                return height - y(d.tittade);
            })
            .attr("width", barWidth - 1)
            .attr("fill", "grey");


        bar.append("rect")
            .attr("y", function(d) { return y(d.otittade) - height + y(d.tittade); })
            .attr("height", function(d) { return height - y(d.otittade); })
            .attr("width", barWidth - 1)
            .attr("fill", "lightgrey");

        bar.append("rect")
            .attr("y", function(d) { return y(d.green) - height + y(d.tittade) - height + y(d.otittade); })
            .attr("height", function(d) { return height - y(d.green); })
            .attr("width", barWidth - 1)
            .attr("fill", "green");



        //Add SVG Text Element Attributes
        var textLabels = bar.append("text")
            .attr("x", barWidth / 3 )
            .attr("y", function(d) { return y(d.tittade) + 3; })
            .attr("dy", ".75em")
            .text( function (d) { return d.tittade; })
            .attr("font-size", "20px");
        /*.attr("font-family", "sans-serif")
         .attr("fill", "red");*/

        var textLabels = bar.append("text")
            .attr("x", barWidth / 3 )
            .attr("y", function(d) { return y(d.otittade) - height + y(d.tittade) + 3; })
            .attr("dy", ".75em")
            .text( function (d) { return d.otittade; })
            .attr("font-size", "20px");

    }
}