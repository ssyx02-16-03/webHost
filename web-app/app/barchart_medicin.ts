/**
 * Created by asasoderlund on 2016-04-06.
 */

import {Component} from 'angular2/core';

import * as d3 from 'd3';

@Component({

    selector: 'd3',
    template: `
        <svg class="barchart_medicine_header" style="float:left;"> </svg>
		<svg class='barchart_medicine' style="float:left; clear:left;"></svg>
		`
})

export class barchart_medicin {

    public static draw(rawData){
        var rawData= rawData.bars;
        for(var i=0; i< rawData.length; i++){
            if(rawData[i].division == "Medicin Blå"){
                console.log("draw:", rawData[i]);
                this.drawWithRefinedData(rawData[i]);
                return;
            }
        }
    }

    public static drawWithRefinedData(jsonData) {
        var totalPatients = jsonData.total_patients;
        var totPatText = "Patientantal: " + totalPatients + "st";

        console.log("refine:", totalPatients);

        var header = d3.select("barchart_medicine_header");

        /*if(!(!!header.select("p")) ) { //'!!' forces to return true or false
                header.append("p")
                .style("font-size", "20px")
                .style("font-weight", "bold");
        }*/
        header.append("g").text("Patients" +totPatText);


        var max = totalPatients;
        var width = 500,
            chartWidth = 200,
            height = 300,
            chartHeight = height * 0.7,
            barSpace = chartWidth / 3,
            barWidth = barSpace * 0.9,
            fontSize = 11,
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
            .outerTickSize(2)
            .tickFormat(function(d) { //eliminate decimal numbers
                if(d%1 == 0){
                    return d;
                }
            });

        //Chart
        var chart = d3.select(".barchart_medicine")
            .attr("width", width)
            .attr("height", height);
        chart.selectAll("*").remove(); //delete garbage


        var bar = chart
            .append("g")
            .attr("id","data")
            .attr("id","data")
            .attr("transform", "translate(" + 50 + "," + 50 + ")");

        bar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("font-size", fontSize * 1.2);

        bar.append("g")
            .attr("class", "y axis")
            .style({ 'stroke': 'black', 'fill': 'black', 'stroke-width': '1px'})
            .call(yAxis);

        //Legend
        var legend = chart.append("g")
            .attr("class", "legend")
            .attr("x", chartWidth+barWidth)
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
                        .style("stroke", color_hash[0][1])
                        .style("stroke-dasharray", ("3, 3"))
                        .style("stroke-width", "1.75px");
                }
                else {
                    rect.style("fill", color_hash[i][1]);
                }
                g.append("text")
                    .attr("x", chartWidth + barSpace)
                    .attr("y", i * legendSpace * 1.01 + (height - chartHeight) / 2 * 1.12)
                    .style("fill", "black")
                    .text(color_hash[i][0]);
            });


        //----------------------PATIENTSTATUS--------------------------
        /*//Total siffra
        bar.append("text")
            .attr("x", 2 * barSpace - barWidth / 2 - fontSize )
            .attr("y", y(jsonData[0].totalt) - 5 )
            .text( jsonData[0].totalt)
            .attr("font-size", fontSize * 1.5)
            .attr("font-weight", "bold");*/

        var incoming = jsonData.incoming;
        var has_doctor = jsonData.has_doctor;
        var no_doctor = jsonData.no_doctor;
        var done_patients = jsonData.klar;
        
        //Inkommande
        var barBox = bar.append("g")
            .attr("id","chartArea");

        barBox.data(staplar)
            .each(function(d, i) {
                barBox.append("rect")
                    .attr("x", (1 + i) * barSpace - barWidth)
                    .attr("y", y(incoming) - chartHeight + y(has_doctor) - chartHeight + y(no_doctor) - chartHeight + y(done_patients))
                    .attr("height", chartHeight - y(incoming))
                    .attr("width", 2 * barWidth / 2)
                    .style("stroke-dasharray", ("8, 8"))
                    .style("stroke", color_hash[0][1])
                    .style("fill", "none")
                    .style("stroke-width", "3px");
            });

        barBox.selectAll("g").data(staplar)
            .each(function(d, i) {
                var inktext = barBox.append("text")
                    .attr("x", (1 + i) * barSpace - barWidth)
                    .attr("y", y(incoming) - chartHeight + y(has_doctor) - chartHeight + y(no_doctor) - chartHeight + y(done_patients) + fontSize)
                    .attr("font-size", fontSize);
                if (incoming != 0) {
                    inktext.text(incoming)
                }
            });

        //Opåtittade
        barBox.append("rect")
            .attr("x", barSpace - barWidth)
            .attr("y", y(no_doctor))
            .attr("height", chartHeight - y(no_doctor))
            .attr("width", barWidth)
            .attr("fill", color_hash[2][1]);

        var otitttext = barBox.append("text")
            .attr("x", barSpace - barWidth)
            .attr("y", y(no_doctor) + fontSize)
            .attr("font-size", fontSize);
        if (no_doctor != 0) {
            otitttext.text(no_doctor) }

        //Påtittade
        barBox.append("rect")
            .attr("x", barSpace - barWidth)
            .attr("y", y(has_doctor) - chartHeight + y(no_doctor))
            .attr("height", chartHeight - y(has_doctor))
            .attr("width", barWidth)
            .attr("fill", color_hash[1][1]);

        var titttext = barBox.append("text")
            .attr("x", barSpace - barWidth)
            .attr("y", y(has_doctor) - chartHeight + y(no_doctor) + fontSize )
            .attr("font-size", fontSize);
        if (has_doctor != 0) {
            titttext.text(has_doctor) }

        //Klara
        barBox.append("rect")
            .attr("x", barSpace - barWidth)
            .attr("y", y(done_patients) - chartHeight + y(has_doctor) - chartHeight + y(no_doctor))
            .attr("height", chartHeight - y(done_patients) )
            .attr("width", barWidth)
            .attr("fill", color_hash[String(3)][1]);

        var klartext = barBox.append("text")
            .attr("x", barSpace - barWidth)
            .attr("y", y(done_patients) - chartHeight + y(has_doctor) - chartHeight + y(no_doctor) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "red");
        if (done_patients != 0) {
            klartext.text(done_patients)}


        // -----------TRIAGE STATUS ----------------------
        var triage_blue = jsonData.blue;
        var triage_green  = jsonData.green;
        var triage_yellow  = jsonData.yellow;
        var triage_orange  = jsonData.orange;
        var triage_red  = jsonData.red;
        
        //Blåa
        barBox.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_blue))
            .attr("height", chartHeight - y(triage_blue))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(4)][1]);


        var bluetext = barBox.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_blue) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (triage_blue != 0 ) {
            bluetext.text(triage_blue) }

        //Gröna
        barBox.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_green) - chartHeight + y(triage_blue))
            .attr("height", chartHeight - y(triage_green))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(5)][1]);

        var greentext = barBox.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_green) - chartHeight + y(triage_blue) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (triage_green != 0) {
            greentext.text(triage_green) }

        //Gula
        barBox.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_yellow) - chartHeight + y(triage_blue) - chartHeight + y(triage_green))
            .attr("height", chartHeight - y(triage_yellow))
            .attr("width", barWidth)
            .attr("fill", color_hash[6][1]);

        var yelltext = barBox.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_yellow) - chartHeight + y(triage_blue) - chartHeight + y(triage_green) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (triage_yellow != 0) {
            yelltext.text(triage_yellow) }

        //Orangea
        barBox.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_orange) - chartHeight + y(triage_blue) - chartHeight + y(triage_green) - chartHeight + y(triage_yellow))
            .attr("height", chartHeight - y(triage_orange))
            .attr("width", barWidth)
            .attr("fill", color_hash[7][1]);

        var orantext = barBox.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_orange) - chartHeight + y(triage_blue) - chartHeight + y(triage_green) - chartHeight + y(triage_yellow) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (triage_orange != 0) {
                orantext.text(triage_orange) }

        //Röda
        barBox.append("rect")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_red) - chartHeight + y(triage_blue) - chartHeight + y(triage_green) - chartHeight + y(triage_yellow) - chartHeight + y(triage_orange))
            .attr("height", chartHeight - y(triage_red))
            .attr("width", barWidth)
            .attr("fill", color_hash[8][1]);

        var redtext = barBox.append("text")
            .attr("x", 2 * barSpace - barWidth)
            .attr("y", y(triage_red) - chartHeight + y(triage_blue) - chartHeight + y(triage_green) - chartHeight + y(triage_yellow) - chartHeight + y(triage_orange) + fontSize)
            .attr("font-size", fontSize)
            .attr("fill", "black");
        if (triage_red != 0) {
            redtext.text(triage_red); }



        // -----------RUMSFÖRDELNING ----------------------
        var rooms_here = jsonData.rooms_here;
        var inner_waiting = jsonData.inner_waiting_room;
        var at_examination = jsonData.at_examination;
        var rooms_elsewhere = jsonData.rooms_elsewhere;
        if(rooms_here == undefined){
            rooms_here = 0;
        }
        if(inner_waiting == undefined){
            inner_waiting = 0;
        }
        if(at_examination == undefined){
            at_examination = 0;
        }
        if(rooms_elsewhere == undefined){
            rooms_elsewhere = 0;
        }
        
        //Rum
        barBox.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(rooms_here))
            .attr("height", chartHeight - y(rooms_here))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(9)][1]);

        var roomtext = barBox.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(rooms_here) + fontSize)
            .attr("font-size", fontSize);
        if (rooms_here != 0) {
            roomtext.text(rooms_here) }

        //Väntrum
        barBox.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(inner_waiting) - chartHeight + y(rooms_here))
            .attr("height", chartHeight - y(inner_waiting))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(10)][1]);

        var waittext = barBox.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(inner_waiting) - chartHeight + y(rooms_here) + fontSize)
            .attr("font-size", fontSize);
        if (inner_waiting != 0) {
            waittext.text(inner_waiting) }


        //Undersökning
        barBox.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(at_examination) - chartHeight + y(inner_waiting) - chartHeight + y(rooms_here))
            .attr("height", chartHeight - y(at_examination))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(11)][1]);

        var extext = barBox.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(at_examination) - chartHeight + y(inner_waiting) - chartHeight + y(rooms_here) + fontSize)
            .attr("font-size", fontSize);
        if (at_examination != 0) {
            extext.text(at_examination) }


        //Annat
        barBox.append("rect")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(rooms_elsewhere) - chartHeight + y(rooms_here) - chartHeight + y(inner_waiting) - chartHeight + y(at_examination))
            .attr("height", chartHeight - y(rooms_elsewhere))
            .attr("width", barWidth)
            .attr("fill", color_hash[String(12)][1]);

        var elsetext = barBox.append("text")
            .attr("x", 3 * barSpace - barWidth)
            .attr("y", y(rooms_elsewhere) - chartHeight + y(rooms_here) - chartHeight + y(inner_waiting) - chartHeight + y(at_examination) + fontSize)
            .attr("font-size", fontSize);
        if (rooms_elsewhere != 0) {
            elsetext.text(rooms_elsewhere) }


    }//draw()
}