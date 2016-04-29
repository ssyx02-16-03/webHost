
/**
 * Created by asasoderlund on 2016-04-06.
 */

import {Component} from 'angular2/core';
import {Barchart, Block} from './barchart_abstract';

import * as d3 from 'd3';

@Component({
    selector: '.medbarchart',
    template: `
        <h3 class="barchart_totNumber" style="margin: 0 auto; height:10%; width:50%">Patientantal: </h3>
		    <svg class='barchart_medicine' style="display:block; margin:0 auto;"></svg>
		`
})

export class barchart_medicin extends Barchart{
  static color_hash = Barchart.getMedColors();
  static staplar = (["Priofärg", "Läkarstatus", "Plats"]);


    private static scaleSVG(svg,width,height,endpoints){
        svg.attr("viewBox", endpoints[0] +" " +endpoints[1] +" " +endpoints[2] +" " +endpoints[3]);
        svg.attr("preserveAspectRatio","xMaxYMax");
        svg.attr("height",height +"%");
        svg.attr("width",width +"%");
    }

    public static draw(rawData){
        var rawData = rawData.bars;
        console.log("barchart:draw!",rawData);
        for(var i=0; i< rawData.length; i++){
            if(rawData[i].division == "Medicin Blå"){
                this.drawWithRefinedData(rawData[i]);

                return;
            }
        }
        console.log("Barchar_medicine: ERROR, could not find data");
    }

    public static drawWithRefinedData(jsonData) {
        var color_hash = this.color_hash;
        var svg = d3.select(".barchart_medicine");
        this.scaleSVG(svg,90,90,[0,30,400,300]);

        var nPatients = jsonData.total_patients;

        var h3_number = d3.select('.barchart_totNumber');
        h3_number.text("Patientantal: "+nPatients);

        var max = nPatients;
        var width = 500,
            chartWidth = 200,
            height = 300,
            chartHeight = height * 0.7,
            barSpace = chartWidth / 3,
            barWidth = barSpace * 0.9,
            fontSize = 11,
            legendSpace = height / 20,
            legendSize = legendSpace / 2;

        var chart = d3.select(".barchart_medicine");
        chart.selectAll("*").remove(); //delete garbage

        var x = d3.scale.ordinal()
            .domain(this.staplar)
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
            .outerTickSize(1)
            .tickFormat(function(d) { //eliminate decimal numbers
                if(d%1 == 0){
                    return d;
                }
            });

        var bar = chart
            .append("g")
            .attr("id","data")
            .attr("id","data")
            .attr("transform", "translate(50,50)"); //rotate

        bar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("font-size", fontSize * 1.0);

        bar.append("g")
            .attr("class", "y axis")
            .style({ 'stroke': 'black', 'fill': 'black', 'stroke-width': '1px'})
            .call(yAxis);

        //Legend
        var legend = chart.append("g")
            .attr("class", "legend")
            .attr("x", chartWidth+barWidth*4)
            .attr("y", 25)
            .attr("height", 100)
            .attr("width", 100);

        var keys = Object.keys(color_hash);
        legend.selectAll('g').data(keys)
            .enter()
            .append('g')
            .each(function(d, i) {
                var g = d3.select(this);
                var x = chartWidth + barSpace;
                var rect = g.append("rect")
                    .attr("x", x)
                    .attr("y", i * legendSpace + (height - chartHeight) / 2)
                    .attr("width", legendSize)
                    .attr("height", legendSize);
                if(i == 0) {
                      //strokeEffect(rect);
                } else {
                    rect.style("fill", color_hash[i][1]);
                }
                g.append("text")
                    .attr("x", x+15)
                    .attr("y", i * legendSpace * 1.01 + (height - chartHeight) / 2 * 1.12)
                    .style("fill", "black")
                    .text(color_hash[i][0]);
            });

        var barBox = bar.append("g")
            .attr("class","chartArea");

        // -----------TRIAGE STATUS ----------------------
        var triage = [];
        triage[0] = jsonData.blue;
        triage[1] = jsonData.green;
        triage[2] = jsonData.yellow;
        triage[3]  = jsonData.orange;
        triage[4]  = jsonData.red;

        var xCoord = 1 * barSpace - barWidth;
        var lastBox = Block.drawPile(triage,barBox,y, chartHeight,barWidth, xCoord, 4,color_hash);

        //---------- INKOMMANDE
        var incoming:number = jsonData.incoming;
        var incWidth = barWidth+2*barSpace;
        var incHeight = chartHeight -y(incoming);
        var incColor = "";

        var block = new Block(barBox, lastBox.x, lastBox.y-incHeight, incWidth, incHeight, incColor, incoming);
        block.stroke("white");

        //----------------------PATIENTSTATUS--------------------------
        var patientStatus = [];
        patientStatus[0] = jsonData.no_doctor;
        patientStatus[1] = jsonData.has_doctor;
        patientStatus[2] = jsonData.klar;

        var xCoord = 2 * barSpace - barWidth;
        Block.drawPile(patientStatus, barBox, y,chartHeight,barWidth ,xCoord,1,color_hash);

        // -----------RUMSFÖRDELNING ----------------------
        var roomArray = [];
        roomArray[0] = jsonData.rooms_here;
        roomArray[1] = jsonData.inner_waiting_room;
        roomArray[2] = jsonData.at_examination;
        roomArray[3] = jsonData.rooms_elsewhere;

        var xCoord = 3 * barSpace - barWidth;
        Block.drawPile(roomArray, barBox, y, chartHeight, barWidth ,xCoord,9,color_hash);
    }//draw()
}
