/**
 * Created by asasoderlund on 2016-03-26.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

import {D3Testar1D3} from './d3-testar1.ts'


@Component({
    selector: 'd3',

    template: `
		<h2>Stapeldiagram</h2>
		<d3></d3>
		<svg class='chart'></svg>
		`,
    directives: [D3Testar1D3]
})

export class D3Testar1Component implements OnInit {

    ngOnInit() {
        this.draw(this.jsonData);
    }

    jsonData = [
        {
            "torg": "medicinblå",
            "tittade": 5,
            "otittade": 3,
            "klara": 2,
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
            "klara": 2,
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
            "klara": 2,
            "green": 1,
            "blue": 1,
            "yellow": 8,
            "orange": 9,
            "red": 3
        }];


    draw(data) {


        //{ "torg": "ortoped", "tittade": 12, "otittade": 1, "klara": 2, "green": 1, "blue" :1, "yellow": 8, "orange":9, "red":3},
        //{ "torg": "jour", "tittade": 12, "otittade": 1, "klara": 2, "green": 1, "blue" :1, "yellow": 8, "orange":9, "red":4}];

        var width = 200,
            height = 300;

        var hej2 = this.drawBar(28, height, width, "grey", "tittade");
        var hej = this.drawBar(28, height, width, "green", "klara");
        var hej1 = this.drawBar(28, height, width, "lightgrey", "otittade");


    }

    drawBar(max:number, width:number, height:number, color:string, category:string) {
        return new Bar(28, height, width, "lightgrey", category);

    }

}

class Bar {


    constructor(max:number, width:number, height:number, color:string, category:string) {

        var jsonData = [
            {
                "torg": "medicinblå",
                "tittade": 5,
                "otittade": 3,
                "klara": 2,
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
                "klara": 2,
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
                "klara": 2,
                "green": 1,
                "blue": 1,
                "yellow": 8,
                "orange": 9,
                "red": 3
            }];

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([0, max]);

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

        var oneBar = bar.append("rect")
            .attr("height", function (d) {
                return height;
            })
            .attr("width", barWidth)

        if (category == "klara") {
            oneBar.attr("y", function (d) {
                    return y(d.klara) - height + y(d.tittade) - height + y(d.otittade);
                })
                .attr("fill", "green");
        }

        if (category == "otittade") {
            oneBar.attr("y", function (d) {
                    return y(d.otittade) - height + y(d.tittade);
                })
                .attr("fill", "yellow");
        }

        if (category == "tittade") {
            oneBar.attr("y", function (d) {
                    return y(d.tittade);
                })
                .attr("fill", "red");
        }


        //Add SVG Text Element Attributes
        var textLabels = bar.append("text")
            .attr("x", barWidth / 3)
            .attr("y", function (d) {
                return y(d.tittade) + 3;
            })
            .attr("dy", ".75em")
            .text(function (d) {
                return d.tittade;
            })
            .attr("font-size", "20px");
        /*.attr("font-family", "sans-serif")
         .attr("fill", "red");*/

        var textLabels = bar.append("text")
            .attr("x", barWidth / 3)
            .attr("y", function (d) {
                return y(d.otittade) - height + y(d.tittade) + 3;
            })
            .attr("dy", ".75em")
            .text(function (d) {
                return d.otittade;
            })
            .attr("font-size", "20px");

    }


}