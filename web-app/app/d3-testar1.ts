/**
 * Created by asasoderlund on 2016-03-01.
 *
 * staplarna fungerar men koden är ful och det finns inga siffror
 */

import {Component} from 'angular2/core';

import * as d3 from 'd3';



@Component({

    selector: 'd3',
    template: `
        <header class="header"> </header>
		<svg class='chart'></svg>
		`
})

export class D3Testar1D3 {

    public static draw() {

        var jsonData = [
            {   "torg": "Inkommande",
                "inkommande": 0,
                "tittade": 0,
                "otittade": 0,
                "klara": 0,
                "blue": 0,
                "green": 0,
                "yellow": 0,
                "orange": 0,
                "red": 0,
                "otriagerade": 9,
                "totalt": 9
            },
            {
                "torg": "Medicin Blå",
                "inkommande": 0,
                "tittade": 8,
                "otittade": 11,
                "klara": 4,
                "blue": 0,
                "green": 2,
                "yellow": 11,
                "orange": 8,
                "red": 2,
                "otriagerade": 0,
                "totalt": 23
            },
            {
                "torg": "Medicin Gul",
                "inkommande": 2,
                "tittade": 6,
                "otittade": 10,
                "klara": 4,
                "blue": 1,
                "green": 1,
                "yellow": 9,
                "orange": 8,
                "red": 1,
                "otriagerade": 0,
                "totalt": 22
            },
            {
                "torg": "Kirurg",
                "inkommande": 1,
                "tittade": 5,
                "otittade": 8,
                "klara": 3,
                "blue": 0,
                "green": 1,
                "yellow": 8,
                "orange": 5,
                "red": 2,
                "otriagerade": 0,
                "totalt": 17
            },
            { "torg": "Ortoped", "inkommande": 1, "tittade": 3, "otittade": 6, "klara": 0, "blue": 0, "green" :3, "yellow": 5, "orange":1, "red":0, "otriagerade": 0, "totalt": 10},
            { "torg": "Jour", "inkommande": 2, "tittade": 1, "otittade": 5, "klara":1, "blue": 0, "green" :1, "yellow": 3, "orange":3, "red":0, "otriagerade": 0, "totalt": 9}];

        var total = 0  //set a variable that holds our total
            var taxes = jsonData;  //reference the element in the "JSON" aka object literal we want
        for (var i = 0; i < taxes.length; i++) {  //loop through the array
            total += taxes[i].totalt;  //Do the math!
        }
        var header = d3.select("header");
        var text = header.append("text")
            .data(jsonData)
            .text("Patientfördelning: " + total)
            .style("font-size", "20px")
            .style("font-weight", "bold");

        var color = ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); //finns enbart med för att loopen i legend ska bli rätt..

        var color_hash = { //gör om så att den matchar jsonfilen och fixa till stapeln på otriagerade
            0 : ["inkommande", "lightgrey"],
            1 : ["tittade", "lightgrey"],
            2 : ["påtittade", "grey"],
            3 : ["klara", "black"],
            4 : ["blå", "blue"],
            5 : ["grön", "green"],
            6 : ["gul", "yellow"],
            7 : ["orange", "orange"],
            8 : ["röd", "red"],
            9 : ["ej triagerade", "brown"]
        };

        var max = d3.max(jsonData, function (d) {
            return d.totalt;
        });

        var width = 700,
            chartWidth = width * 0.7,
            height = 400,
            chartHeight = height * 0.8,
            barSpace = chartWidth / (jsonData.length*2),
            barWidth = barSpace * 0.8,
            fontSize = chartHeight / max,
            legendSpace = height / 20,
            legendSize = legendSpace / 2;

        var x = d3.scale.ordinal()
            .domain(jsonData.map(function(d) { return d.torg; }))
            .rangeRoundBands([0, chartWidth], .1);

        var y = d3.scale.linear()
            .range([chartHeight, 0])
            .domain([0, max]);


        //Axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10)
        .outerTickSize(2);


        //Chart
        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

        var bar = chart.selectAll("g")
            .data(jsonData)
            .enter().append("g")
            .attr("transform", "translate(" + 50 + "," + 50 + ")");

        bar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis)
        .selectAll("text")
            .attr("font-size", fontSize);

        bar.append("g")
            .attr("class", "y axis")
            .style({ 'stroke': 'black', 'fill': 'black', 'stroke-width': '1px'})
            .call(yAxis);

        //Legend
        var legend = chart.append("g")
            .attr("class", "legend")
            .attr("x", width - 65)
            .attr("y", 25)
            .attr("height", 100)
            .attr("width", 100);

        legend.selectAll('g').data(color)
            .enter()
            .append('g')
            .each(function(d, i) {
                var g = d3.select(this);
                var rect = g.append("rect")
                    .attr("x", chartWidth + barSpace + 10)
                    .attr("y", i * legendSpace + (height - chartHeight))
                    .attr("width", legendSize)
                    .attr("height", legendSize);
                    if ( i == 0) {
                    rect.style("fill", "none")
                        .style("stroke", color_hash[String(0)][1])
                        .style("stroke-dasharray", ("3, 3"))
                        .style("stroke-width", "1.75px");
                    }
                else {
                        rect.style("fill", color_hash[String(i)][1]);
                    }
                g.append("text")
                    .attr("x", chartWidth + barSpace + legendSize * 3)
                    .attr("y", i * legendSpace + (height - chartHeight) * 1.12)
                    .style("fill", "black")
                    .text(color_hash[String(i)][0]);
            });

        //Total siffra
        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - fontSize/2; })
            .attr("y", function(d) { return y(d.totalt) - 5; })
            .text( function (d) { return d.totalt; })
            .attr("font-size", fontSize * 1.2)
            .attr("font-weight", "bold");

        //Otriagerade

        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function (d) { return y(d.otriagerade); })
            .attr("height", function (d) { return chartHeight - y(d.otriagerade); })
            .attr("width", barWidth * 2)
            .attr("fill", color_hash[String(9)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { if (d.otriagerade != 0) {return y(d.otriagerade) + fontSize; } })
            .text( function (d) { if (d.otriagerade != 0) {return d.otriagerade; }})
            .attr("font-size", fontSize);


        //Inkommande
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { return y(d.inkommande) - chartHeight + y(d.tittade) - chartHeight + y(d.otittade) - chartHeight + y(d.klara); })
            .attr("height", function(d) { return chartHeight - y(d.inkommande); })
            .attr("width", 2 * barWidth)
            .style("stroke-dasharray", ("8, 8"))
            .style("stroke", color_hash[String(0)][1])
            .style("fill", "none")
            .style("stroke-width", "3px");

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { return y(d.inkommande) - chartHeight + y(d.tittade) - chartHeight + y(d.otittade) - chartHeight + y(d.klara) + fontSize; })
            .text( function (d) { if (d.inkommande != 0) { return d.inkommande; } })
            .attr("font-size", fontSize);


        //Påtittade
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function (d) { return y(d.tittade); })
            .attr("height", function (d) { return chartHeight - y(d.tittade); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(1)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { if (d.tittade != 0) {return y(d.tittade) + fontSize; } })
            .text( function (d) { if (d.tittade != 0) {return d.tittade; } })
            .attr("font-size", fontSize);


        //Opåtittade
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { return y(d.otittade) - chartHeight + y(d.tittade); })
            .attr("height", function(d) { return chartHeight - y(d.otittade); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(2)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { return y(d.otittade) - chartHeight + y(d.tittade) + fontSize; })
            .text( function (d) { if (d.otittade != 0) {return d.otittade; } })
            .attr("font-size", fontSize);


        //Klara
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { return y(d.klara) - chartHeight + y(d.tittade) - chartHeight + y(d.otittade); })
            .attr("height", function(d) { return chartHeight - y(d.klara); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(3)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace - barWidth; })
            .attr("y", function(d) { return y(d.klara) - chartHeight + y(d.tittade) - chartHeight + y(d.otittade) + fontSize; })
            .text( function (d) { if (d.klara != 0) { return d.klara; } })
            .attr("font-size", fontSize)
         .attr("fill", "red");


        //Blåa
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function (d) { return y(d.blue); })
            .attr("height", function (d) { return chartHeight - y(d.blue); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(4)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function (d) { return y(d.blue) + fontSize; })
            .text( function (d) { if (d.blue != 0) { return d.blue; } })
            .attr("font-size", fontSize)
            .attr("fill", "black");

        //Gröna
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.green) - chartHeight + y(d.blue); })
            .attr("height", function(d) { return chartHeight - y(d.green); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(5)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.green) - chartHeight + y(d.blue) + fontSize; })
            .text( function (d) { if (d.green != 0) { return d.green; } })
            .attr("font-size", fontSize)
            .attr("fill", "black");

        //Gula
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.yellow) - chartHeight + y(d.blue) - chartHeight + y(d.green); })
            .attr("height", function(d) { return chartHeight - y(d.yellow); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(6)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.yellow) - chartHeight + y(d.blue) - chartHeight + y(d.green) + fontSize; })
            .text( function (d) { if (d.yellow != 0) { return d.yellow; }})
            .attr("font-size", fontSize)
            .attr("fill", "black");


        //Orangea
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.orange) - chartHeight + y(d.blue) - chartHeight + y(d.green) - chartHeight + y(d.yellow); })
            .attr("height", function(d) { return chartHeight - y(d.orange); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(7)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.orange) - chartHeight + y(d.blue) - chartHeight + y(d.green) - chartHeight + y(d.yellow) + fontSize; })
            .text( function (d) { if (d.orange != 0) { return d.orange; } })
            .attr("font-size", fontSize)
            .attr("fill", "black");

        //Röda
        bar.append("rect")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.red) - chartHeight + y(d.blue) - chartHeight + y(d.green) - chartHeight + y(d.yellow) - chartHeight + y(d.orange); })
            .attr("height", function(d) { return chartHeight - y(d.red); })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(8)][1]);

        bar.append("text")
            .attr("x", function (d, i) { return (2 * i + 1) * barSpace; })
            .attr("y", function(d) { return y(d.red) - chartHeight + y(d.blue) - chartHeight + y(d.green) - chartHeight + y(d.yellow) - chartHeight + y(d.orange) + fontSize; })
            .text( function (d) { if (d.red != 0) { return d.red; } })
            .attr("font-size", fontSize)
            .attr("fill", "black");

    }
}