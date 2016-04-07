/**
 * Created by asasoderlund on 2016-04-06.
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

export class barchart_medicin {

    public static draw() {

        var jsonData = [{
            "torg": "Medicin Blå",
            "inkommande": 2,
            "tittade": 8,
            "otittade": 11,
            "klara": 4,
            "blue": 1,
            "green": 2,
            "yellow": 11,
            "orange": 8,
            "red": 1,
            "otriagerade": 0,
            "rooms_here": 7,
            "inner_waiting_room": 12,
            "at_examination": 2,
            "rooms_elsewhere": 2,
            "totalt": 25
        }];

        var total = 0
        var data = jsonData;
        for (var i = 0; i < data.length; i++) {
            total += data[i].totalt;
        }
        var header = d3.select("header");
        var text = header.append("text")
            .data(jsonData)
            .text("Patientantal: " + total + "st")
            .style("font-size", "20px")
            .style("font-weight", "bold");

        var max = jsonData[0].totalt;

        var width = 600,
            chartWidth = width * 0.4,
            height = 300,
            chartHeight = height * 0.7,
            barSpace = chartWidth / 3,
            barWidth = barSpace * 0.9,
            fontSize = chartHeight / max,
            legendSpace = height / 20,
            legendSize = legendSpace / 2;

        //document.write(Object.keys(jsonData).length);

        var color = ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); //finns enbart med för att loopen i legend ska bli rätt..

        var color_hash = {
            0 : ["inkommande", "lightgrey"],
            1 : ["påtittade", "grey"],
            2 : ["opåtittade", "lightgrey"],
            3 : ["klara", "black"],
            4 : ["blå", "blue"],
            5 : ["grön", "green"],
            6 : ["gul", "yellow"],
            7 : ["orange", "orange"],
            8 : ["röd", "red"],
            9 : ["rum", "#236B8E"],
            10 : ["inre väntrum", "#5D92B1"],
            11 : ["undersökning", "#A4D3EE"],
            12 : ["annan plats", "#B0E2FF"]
        };

        var staplar = (["Priofärg", "Läkarstatus", "Plats"]);

        var x = d3.scale.ordinal()
            .domain(staplar)
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
            .attr("font-size", fontSize * 1.5);

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
                    .attr("x", chartWidth + barSpace - 20)
                    .attr("y", i * legendSpace + (height - chartHeight) / 2)
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
                    .attr("x", chartWidth + barSpace)
                    .attr("y", i * legendSpace * 1.01 + (height - chartHeight) / 2 * 1.12)
                    .style("fill", "black")
                    .text(color_hash[String(i)][0]);
            });

        /*//Total siffra
        bar.append("text")
            .attr("x", 2 * barSpace - barWidth / 2 - fontSize )
            .attr("y", y(jsonData[0].totalt) - 5 )
            .text( jsonData[0].totalt)
            .attr("font-size", fontSize * 1.5)
            .attr("font-weight", "bold");*/

        //Inkommande
        chart.selectAll("g").data(staplar)
            .each(function(d, i) {
                bar.append("rect")
                    .attr("x", (1 + i) * barSpace - barWidth)
                    .attr("y", y(jsonData[0].inkommande) - chartHeight + y(jsonData[0].tittade) - chartHeight + y(jsonData[0].otittade) - chartHeight + y(jsonData[0].klara))
                    .attr("height", chartHeight - y(jsonData[0].inkommande))
                    .attr("width", 2 * barWidth / 2)
                    .style("stroke-dasharray", ("8, 8"))
                    .style("stroke", color_hash[String(0)][1])
                    .style("fill", "none")
                    .style("stroke-width", "3px");
            });

        chart.selectAll("g").data(staplar)
            .each(function(d, i) {
                var inktext = bar.append("text")
                    .attr("x", (1 + i) * barSpace - barWidth)
                    .attr("y", y(jsonData[0].inkommande) - chartHeight + y(jsonData[0].tittade) - chartHeight + y(jsonData[0].otittade) - chartHeight + y(jsonData[0].klara) + fontSize)
                    .attr("font-size", fontSize);
                if (jsonData[0].inkommande != 0) {
                    inktext.text(jsonData[0].inkommande)
                }
            });

        //Opåtittade
        bar.append("rect")
            .attr("x", barSpace - barWidth)
            .attr("y", y(jsonData[0].otittade))
            .attr("height", chartHeight - y(jsonData[0].otittade))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(2)][1]);

        var otitttext = bar.append("text")
            .attr("x", barSpace - barWidth)
            .attr("y", y(jsonData[0].otittade) + fontSize)
            .attr("font-size", fontSize);
        if (jsonData[0].otittade != 0) {
            otitttext.text(jsonData[0].otittade) }




        //Påtittade
        bar.append("rect")
            .attr("x", barSpace - barWidth)
            .attr("y", y(jsonData[0].tittade) - chartHeight + y(jsonData[0].otittade))
            .attr("height", chartHeight - y(jsonData[0].tittade))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(1)][1]);

        var titttext = bar.append("text")
            .attr("x", barSpace - barWidth)
            .attr("y", y(jsonData[0].tittade) - chartHeight + y(jsonData[0].otittade) + fontSize )
            .attr("font-size", fontSize);
        if (jsonData[0].tittade != 0) {
            titttext.text(jsonData[0].tittade) }




        //Klara
        bar.append("rect")
            .attr("x", barSpace - barWidth)
            .attr("y", y(jsonData[0].klara) - chartHeight + y(jsonData[0].tittade) - chartHeight + y(jsonData[0].otittade))
            .attr("height", chartHeight - y(jsonData[0].klara) )
            .attr("width", barWidth)
            .attr("fill", color_hash[String(3)][1]);

        var klartext = bar.append("text")
            .attr("x", barSpace - barWidth)
            .attr("y", y(jsonData[0].klara) - chartHeight + y(jsonData[0].tittade) - chartHeight + y(jsonData[0].otittade) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "red");
        if (jsonData[0].klara != 0) {
            klartext.text(jsonData[0].klara)}



        //Blåa
        bar.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].blue))
            .attr("height", chartHeight - y(jsonData[0].blue))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(4)][1]);


        var bluetext = bar.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].blue) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (jsonData[0].blue != 0 ) {
            bluetext.text(jsonData[0].blue) }

        //Gröna
        bar.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].green) - chartHeight + y(jsonData[0].blue))
            .attr("height", chartHeight - y(jsonData[0].green))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(5)][1]);

        var greentext = bar.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].green) - chartHeight + y(jsonData[0].blue) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (jsonData[0].green != 0) {
            greentext.text(jsonData[0].green) }

        //Gula
        bar.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].yellow) - chartHeight + y(jsonData[0].blue) - chartHeight + y(jsonData[0].green))
            .attr("height", chartHeight - y(jsonData[0].yellow))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(6)][1]);

        var yelltext = bar.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].yellow) - chartHeight + y(jsonData[0].blue) - chartHeight + y(jsonData[0].green) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (jsonData[0].yellow != 0) {
            yelltext.text(jsonData[0].yellow) }

        //Orangea
        bar.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].orange) - chartHeight + y(jsonData[0].blue) - chartHeight + y(jsonData[0].green) - chartHeight + y(jsonData[0].yellow))
            .attr("height", chartHeight - y(jsonData[0].orange))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(7)][1]);

        var orantext = bar.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].orange) - chartHeight + y(jsonData[0].blue) - chartHeight + y(jsonData[0].green) - chartHeight + y(jsonData[0].yellow) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (jsonData[0].orange != 9) {
                orantext.text(jsonData[0].orange) }

        //Röda
        bar.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].red) - chartHeight + y(jsonData[0].blue) - chartHeight + y(jsonData[0].green) - chartHeight + y(jsonData[0].yellow) - chartHeight + y(jsonData[0].orange))
            .attr("height", chartHeight - y(jsonData[0].red))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(8)][1]);

        var redtext = bar.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(jsonData[0].red) - chartHeight + y(jsonData[0].blue) - chartHeight + y(jsonData[0].green) - chartHeight + y(jsonData[0].yellow) - chartHeight + y(jsonData[0].orange) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (jsonData[0].red != 0) {
            redtext.text(jsonData[0].red) }

        //Rum
        bar.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].rooms_here))
            .attr("height", chartHeight - y(jsonData[0].rooms_here))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(9)][1]);

        var roomtext = bar.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].rooms_here) + fontSize)
            .attr("font-size", fontSize);
        if (jsonData[0].rooms_here != 0) {
            roomtext.text(jsonData[0].rooms_here) }

        //Väntrum
        bar.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].inner_waiting_room) - chartHeight + y(jsonData[0].rooms_here))
            .attr("height", chartHeight - y(jsonData[0].inner_waiting_room))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(10)][1]);

        var waittext = bar.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].inner_waiting_room) - chartHeight + y(jsonData[0].rooms_here) + fontSize)
            .attr("font-size", fontSize);
        if (jsonData[0].inner_waiting_room != 0) {
            waittext.text(jsonData[0].inner_waiting_room) }


        //Undersökning
        bar.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].at_examination) - chartHeight + y(jsonData[0].inner_waiting_room) - chartHeight + y(jsonData[0].rooms_here))
            .attr("height", chartHeight - y(jsonData[0].at_examination))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(11)][1]);

        var extext = bar.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].at_examination) - chartHeight + y(jsonData[0].inner_waiting_room) - chartHeight + y(jsonData[0].rooms_here) + fontSize)
            .attr("font-size", fontSize);
        if (jsonData[0].at_examination != 0) {
            extext.text(jsonData[0].at_examination) }


        //Annat
        bar.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].rooms_elsewhere) - chartHeight + y(jsonData[0].rooms_here) - chartHeight + y(jsonData[0].inner_waiting_room) - chartHeight + y(jsonData[0].at_examination))
            .attr("height", chartHeight - y(jsonData[0].rooms_elsewhere))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(12)][1]);

        var elsetext = bar.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(jsonData[0].rooms_elsewhere) - chartHeight + y(jsonData[0].rooms_here) - chartHeight + y(jsonData[0].inner_waiting_room) - chartHeight + y(jsonData[0].at_examination) + fontSize)
            .attr("font-size", fontSize);
        if (jsonData[0].rooms_elsewhere != 0) {
            elsetext.text(jsonData[0].rooms_elsewhere) }

    }

}