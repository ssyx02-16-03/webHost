/**
 * Created by asasoderlund on 2016-03-01.
 *
 * staplarna fungerar men koden är ful
 */

import {Component} from 'angular2/core';
import {Barchart,Block} from './barchart_abstract';

import * as d3 from 'd3';

@Component({
    selector: 'barchart_coordinator',
    template: `
        <h2 id="barchart_coord_header">Patienter totalt: </h2>
		    <svg class='baarchart' style="width:100%; height:90%;" viewBox="0 25 650 380"></svg>
		`,
    styleUrls: ['app/globalcss/style.css']
})
//<!--<header class="header" style="width:100%; height:10%; font-size:100%; padding-left:5%; ">Stapeldiagram</header>-->

export class barchart_coordinator {
    public static draw(jsonData) {
        var total:number = 0;
        var data = jsonData;
        for (var i = 0; i < data.length; i++) {
            total += data[i]['total_patients'];
        }
        var header:HTMLElement = document.getElementById('barchart_coord_header');
        header.innerText = "Patienter totalt: " + total;

        var color_hash = Barchart.getCoordColors();

        var max = d3.max(jsonData, function (d) {
            return d['total_patients'];
        });

        var width = 700,
            chartWidth = width * 0.7,
            height = 400,
            chartHeight = height * 0.8,
            barSpace = chartWidth / (jsonData.length * 2),
            barWidth = barSpace * 0.8,
            middleSpacer = 5;
            //fontSize = chartHeight / max,
            fontSize = 10,
            legendSpace = height / 20,
            legendSize = legendSpace / 2;

        //console.log(jsonData); // TODO debugging...
        //console.log(jsonData[1]['division']);

        var x = d3.scale.ordinal()
            .domain(jsonData.map(function (d) {
                return d['division'];
            }))
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
            .tickFormat(d3.format("d"))
            .tickSubdivide(0)
            .outerTickSize(2);

        //clear all before
        d3.select(".header").selectAll("*").remove();
        d3.select(".baarchart").selectAll("*").remove();

        //Chart
        var chart = d3.select(".baarchart")
            .attr("width", width)
            .attr("height", height);

        var bar = chart.append("g")
            .attr("transform", "translate(" + 50 + "," + 50 + ")");

        bar.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("font-size", fontSize);

        bar.append("g")
            .attr("class", "y axis")
            .style({'stroke': 'black', 'fill': 'black', 'stroke-width': '1px'})
            .call(yAxis);

        //Legend
        var legend = chart.append("g")
            .attr("class", "legend")
            .attr("x", chartWidth+100)
            .attr("y", 25)
            .attr("height", 100)
            .attr("width", 100);

        legend.selectAll('g').data(color_hash)
            .enter()
            .append('g')
            .each(function (d, i) {
                var g = d3.select(this);
                var rect = g.append("rect")
                    .attr("x", chartWidth + barSpace + 10)
                    .attr("y", i * legendSpace + (height - chartHeight))
                    .attr("width", legendSize)
                    .attr("height", legendSize);
                if (i == 0) {
                    rect.style("fill", "none")
                        .style("stroke", color_hash[0][1])
                        .style("stroke-dasharray", ("3, 3"))
                        .style("stroke-width", "1.75px");
                }
                else {
                    rect.style("fill", color_hash[i][1]);
                }
                g.append("text")
                    .attr("x", chartWidth + barSpace + legendSize * 3)
                    .attr("y", i * legendSpace + (height - chartHeight) * 1.12)
                    .style("fill", "black")
                    .text(color_hash[i][0]);
            });

        var barBox = bar.append("g")
              .attr("class","chartArea");
        //Total siffra
        barBox.selectAll('g').data(jsonData)
            .enter()
            .append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - fontSize / 2;
            })
            .attr("y", function (d) {
                return y(d['total_patients']) - 5;
            })
            .text(function (d) {
                return d['total_patients'];
            })
            .attr("font-size", fontSize * 1.2)
            .attr("font-weight", "bold");

        //untriaged
        var i = 0;
        var noTriage = [];
        noTriage[0] = jsonData[i]['untriaged'];
        var xCoord = (2*i+1) * barSpace - barWidth;
        Block lastBox = Block.drawPile(noTriage,barBox,y, chartHeight, barWidth*2, xCoord, 9,color_hash);
        lastBox.setFontColor("white");

        //the rest
        for(var i=1; i<jsonData.length; i++){
          paintBlocks(jsonData,i,barBox,y,chartHeight,barWidth,color_hash,middleSpacer);
        }

        function paintBlocks(jsonData,i:number,parent,y,chartHeight,barWidth,color_hash,middleSpacer){
          var medBlue_triage = [];
          var medBlue_status = [];
          var xCoord = (2*i+1) * barSpace -barWidth;

          jsonData = jsonData[i];
          medBlue_status[0] = jsonData.no_doctor;
          medBlue_status[1] = jsonData.has_doctor;
          medBlue_status[2] = jsonData.klar;
          Block firstBox = Block.drawPile(medBlue_status,parent,y, chartHeight, barWidth, xCoord, 1, color_hash);

          xCoord = (2*i+1) * barSpace + middleSpacer;
          medBlue_triage[0] = jsonData.blue;
          medBlue_triage[1] = jsonData.green;
          medBlue_triage[2] = jsonData.yellow;
          medBlue_triage[3]  = jsonData.orange;
          medBlue_triage[4]  = jsonData.red;
          Block.drawPile(medBlue_triage,parent,y, chartHeight, barWidth, xCoord, 4, color_hash);

          var strokeHeight = chartHeight-y(jsonData.incoming);
          var block = new Block(parent, firstBox.x, firstBox.y-strokeHeight, barWidth*2+middleSpacer, strokeHeight, "none", jsonData.incoming);
          block.stroke("white");
        }

    }
}
