/**
 * Created by edvard on 2016-03-02.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    template: `
		<h2>D3 verkar rätt schysst</h2>
		<!--
		<div class='textdiv'></div>
        <div class='chart'></div>
        -->
		<svg class='svgchart'></svg>
		`
})

export class D3Test1Component implements OnInit {

    fakeData:number[] = [4, 8, 15, 16, 23, 42];

    // Detta sker när componenten initialiseras, dvs när länken till den klickas
    ngOnInit() {
        this.draw(this.fakeData);
    }

    draw(data: number[]) {
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
    }

}