/**
 * Created by edvard on 2016-03-04.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    template: `
		<h2>Tryck på patienten. Då blir den arg.</h2>
		<svg class='svgchart' style="width: 600px;"></svg>
		`
})

export class D3ArgPatientComponent implements OnInit {


    ngOnInit() {

        var cx = 180;

        var circle = d3.select(".svgchart").append("circle")
            .attr("cx", cx)
            .attr("cy", 60)
            .attr("r", 60)
            .attr("angle", 360)
            .style("fill", "blue");

        circle.on("click", function() {

            circle.style("fill", "red");

            setInterval(function() {
                circle.transition()
                    .attr("cx", cx + 7);
                circle.transition()
                    .attr("cx", cx - 7)
                    .delay(150);
                circle.transition()
                    .attr("cx", cx + 6)
                    .delay(300);
                circle.transition()
                    .attr("cx", cx - 6)
                    .delay(450);
                circle.transition()
                    .attr("cx", cx + 5)
                    .delay(600);
                circle.transition()
                    .attr("cx", cx - 3)
                    .delay(750);
                circle.transition()
                    .attr("cx", cx)
                    .delay(900);
            }, 2000);

            /*
            var start = Date.now()
            d3.timer(function() {
                circle.transition()
                    .attr("cx", cx + Date.now() - start);
            });
            */

        });
    }

}