/**
 * Created by edvard on 2016-03-01.
 */

import {Component} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    selector: 'd3',
    template: `
        <div class='textdiv'></div>
        <div class='chart'></div>
		<svg class='svgchart'></svg>
		`
})

export class D3TestD3 {

    public static draw(data: number[]) {

        d3.select('.textdiv')
            .selectAll('div')
            .data(['hejhej'])
            .enter().append('div')
            .text(function(d) { return d; });


        d3.select('.chart')
            .selectAll("div")
            .data(data)
            .enter().append('div')
            .style("width", function (d) {
                return d * 10 + "px";
            })
            .style("background-color", "steelBlue")
            .text(function (d) {
                return d;
            });
        // chart


        /*
        var height = 300,
            width = 400;

        var y = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

        var chart = d3.select(".svgchart")
            .attr("width", width)
            .attr("height", height);

        var barWidth = width / data.length;

        // g är typ som en div som hör till svg-grejset
        // joinar ihop varje number i data med ett g-element som translateras ett avstånd beräknad utifrån d och index
        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        bar.append("rect")
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); })
            .attr("width", barWidth - 5);

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", function(d) { return y(d) + 3; })
            .attr("dy", ".75em")
            .text(function(d) { return d; });
        */
    }
}