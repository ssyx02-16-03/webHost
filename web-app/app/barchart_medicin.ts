/**
 * Created by asasoderlund on 2016-04-06.
 */

import {Component} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    selector: '.medbarchart',
    template: `
        <h3 id="barchart_totNumber" style="margin: 0 auto; height:10%;">Patientantal: </h3>

		<svg class='barchart_medicine' style="display:block; margin:0 auto;"></svg>
		`
})


export class barchart_medicin {

    private static scaleSVG(svg,width,height,endpoints){
        svg.attr("viewBox", endpoints[0] +" " +endpoints[1] +" " +endpoints[2] +" " +endpoints[3]);
        svg.attr("preserveAspectRatio","xMaxYMax");
        svg.attr("height",height +"%");
        svg.attr("width",width +"%");
    }

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
        var svg = d3.select(".barchart_medicine");
        this.scaleSVG(svg,90,90,[0,30,400,300]);
        d3.select(".barchart_p").style("width","80%");

        var nPatients = jsonData.total_patients;

        h3_number = document.getElementById("barchart_totNumber");
        h3_number.textContent = "Patientantal: "+nPatients;

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

        var color = ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); //finns enbart med för att loopen i legend ska bli rätt..

        var chart = d3.select(".barchart_medicine");
        chart.selectAll("*").remove(); //delete garbage

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
                if(i == 0) {
                      strokeEffect(rect);
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

          var barBox = bar.append("g")
              .attr("id","chartArea");

        // -----------TRIAGE STATUS ----------------------
        var triage = [];
        triage[0] = jsonData.blue;
        triage[1] = jsonData.green;
        triage[2] = jsonData.yellow;
        triage[3]  = jsonData.orange;
        triage[4]  = jsonData.red;

        var xCoord = 1 * barSpace - barWidth;
        var lastBox = drawPile(triage,barBox,y, chartHeight,barWidth, xCoord, 4);

        //---------- INKOMMANDE
        var incoming:number = jsonData.incoming;
        var incWidth = barWidth+2*barSpace;
        var incHeight = chartHeight -y(incoming);
        var incColor = "";
        var block = new Block(barBox, lastBox.x, lastBox.y-incHeight, incWidth, incHeight, incColor, incoming);
        strokeEffect(block.svgBlock);

        //----------------------PATIENTSTATUS--------------------------
        var patientStatus = [];
        patientStatus[0] = jsonData.no_doctor;
        patientStatus[1] = jsonData.has_doctor;
        patientStatus[2] = jsonData.klar;

        var xCoord = 2 * barSpace - barWidth;
        drawPile(patientStatus, barBox, y,chartHeight,barWidth ,xCoord,1);

        // -----------RUMSFÖRDELNING ----------------------
        var roomArray = [];
        roomArray[0] = jsonData.rooms_here;
        roomArray[1] = jsonData.inner_waiting_room;
        roomArray[2] = jsonData.at_examination;
        roomArray[3] = jsonData.rooms_elsewhere;

        var xCoord = 3 * barSpace - barWidth;
        drawPile(roomArray, barBox, y, chartHeight, barWidth ,xCoord,9);
    }//draw()
}

function strokeEffect(svg){
  svg.style("fill", "none")
      .style("stroke", color_hash[0][1])
      .style("stroke-dasharray", ("2, 2"))
      .style("stroke-width", "1.75px");
}

function paintBlock(parent,x:number,y:number,width:number,height:number,color:string){
  var block = parent.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", color);
  return block;
}

function paintText(parent,x,y,fontColor,fontSize,text){
  var textField = parent.append("text")
      .attr("x", x)
      .attr("y", y + fontSize)
      .attr("font-size", fontSize)
      .attr("fill", fontColor)
      .text(text);
  return textField;
}


function drawPile(dataArray, parent, yAxis, chartHeight:number, barWidth:number, xCoord:number, colorOffset:number){
    Block lastBox = null;
    var yCoord = yAxis(dataArray[dataArray.length-1]);
    for(var i=dataArray.length-1; i >= 0; i--){
        var boxHeight = chartHeight-yAxis(dataArray[i]);
        if(lastBox != null){
            yCoord = lastBox.y-boxHeight);
        }
        lastBox = new Block(parent,
          xCoord, yCoord,
          barWidth, boxHeight, color_hash[i+colorOffset][1], dataArray[i]);
    }
    return lastBox;
}

var color_hash = {
    0 : ["inkommande", "black"],
    1 : ["opåtittade", "lightgrey"],
    2 : ["påtittade", "grey"]
    3 : ["klara", "black"],
    4 : ["röd", "red"],
    5:  ["orange", "orange"],
    6:  ["gul", "yellow"],
    7:  ["grön", "green"],
    8:  ["blå", "blue"],
    9:  ["annan plats", "#B0E2FF"],
    10: ["undersökning", "#A4D3EE"],
    11: ["inre väntrum", "#5D92B1"],
    12: ["rum", "#236B8E"]
};

var staplar = (["Priofärg", "Läkarstatus", "Plats"]);

class Block{
    parent; //parent Div
    x:number
    y:number
    width:number;
    height:number;
    fontSize:number;
    color:string;
    nOfPatients:number;

    fontColor:string;
    svgBlock; //blockDiv

    constructor(parent,x,y, width:number,height:number,color:string, nOfPatients:number){
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.fontSize = 11;
        this.color = color;
        this.nOfPatients = nOfPatients;
        this.fontColor = "black";

        if(this.color == this.fontColor){
          this.fontColor = "white";
        }

        if(nOfPatients > 0){
          this.svgBlock = paintBlock(parent,x,y,width,height,color);
          paintText(parent,x,y,this.fontColor,this.fontSize,nOfPatients);
        }
        return this;
    }
}
