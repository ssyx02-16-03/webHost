/**
 * Created by edvard on 2016-04-05.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

var dataKey = {
  times : 'times',
  hist : 'trend',
  pred  : 'prediction'
};


export abstract class TrendDiagram {

    abstract getMarkerColors();

    scaleData(data,minMinutes:number,maxMinutes:number){
      //get rid of datapoints beyond and before -minMinutes and +maxMinutes
        console.log(data);
        if(data['current_value']){
            var median = data['current_value'];
            data[dataKey.times] = median;
        }

        var newHistData = Array();
        var nowKey = data[dataKey.hist].length-1;
        var xNow = data[dataKey.hist][nowKey].x;

        console.log(xNow);
        var xMin_minutes = xNow - minMinutes

        for(var i = nowKey; i>=0; i--){
          if(data[dataKey.hist][i].x < xMin_minutes){
            break;
          }
          newHistData.unshift(data[dataKey.hist][i]);
        }
        newHistData.unshift({x:xMin_minutes,y:0});


        var newPredData = Array();
        var nowKey = 0;
        var xMax_minutes = xNow + maxMinutes;


        for(var i = 0; i<data[dataKey.pred].length; i++){
          if(data[dataKey.pred][i].x > xMax_minutes){
            break;
          }
          newPredData.push(data[dataKey.pred][i]);
        }
        newPredData.push({x:xMax_minutes,y:0});


        data[dataKey.hist] = newHistData;
        data[dataKey.pred] = newPredData;

        console.log(data);
        return data;
    }

    draw(data,selector,ylims: number[]) {
      data = this.scaleData(data,120,60);

        var bgGreen = "#c5f9a9";
        var bgYellow = "#fcf49f";
        var bgRed = "#ffa375";

        var daddyDiv = d3.select(selector);
        daddyDiv.selectAll("*").remove(); //clear everything, were going fresh n' new

        var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 550 - margin.left - margin.right, // width 350 förut
            height = 150 - margin.top - margin.bottom;
        //hIndraw = 0.1 * width,
        //vIndraw = 0.2 * height;

        var x = d3.scale.linear()
            .range([0, width]);
        //.range([hIndraw, width - hIndraw]);

        var xstr = d3.scale.ordinal()
            .domain(["-2 timmar", "-1 timme", "nu", "+1 timme"])
            .rangePoints([0, width]);


        var xAxis = d3.svg.axis()
            .scale(xstr)
            //.tickValues(['ett', 'two', 'three'])
            .orient("bottom")

        var y = d3.scale.linear()
            .range([0, height]);
        //.range([height - vIndraw, vIndraw]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);

        /* fattar inte hur denna funkar...
         var circle = d3.geo.circle()
         .origin([5.0, 0]);
         */

        var line = d3.svg.line()
            .x(function(d: any) { return x(d.x); })
            .y(function(d: any) { return y(d.y); });

        var svg = daddyDiv.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var allData = data['trend'].concat(data['prediction']);
        x.domain(d3.extent(allData, function(d: any) { return d.x; }));

        var maxValue = d3.max(allData, function (d) { return d['y']; });
        var minValue = d3.min(allData, function (d) { return d['y']; });

        //scenarios:
        // i röda fältet: ha med gult i botten
        // i gula fältet: ha med rött och grönt
        // i gröna fältet: ha med det gula

        var ylimsMargin = 10;
        var ymin = ylims[1];
        var ymax = ylims[0];
        if(minValue > ymax-ylimsMargin){
          minValue = ymax-ylimsMargin;
        }
        if(maxValue < ymin+ylimsMargin){
          maxValue = ymin+ylimsMargin;
        }

        if(minValue < 0){
          minValue = 0;
        }

        console.log("maxval:",maxValue);
        console.log("minval:", minValue);
        y.domain([maxValue + 1, minValue - 1]); // gör det som Indraw gjorde förut, fast korrekt

        //---------------------------------------------------//
        //------------- color-coded background --------------//
        //ylims = [6.0, 4.5];

        var back = svg.append("svg").attr("class","background")
            .attr("width",width)
            .attr("height", height);


        //bad line
        //var hasRed = ylims[0] < maxValue ? 1 : 0;
        if(ylims[0] < maxValue) {
            back.append("rect")
                .attr("width", width)
                //.attr("height", y(ylims[0])
                .attr("height", y(ylims[0]))
                .attr("fill", bgRed);
        }

        //ok line
        //var hasYellow = (ylims[0] < maxValue || ylims[1] > minValue) ? 1 : 0;
        if(ylims[0] < maxValue || ylims[1] > minValue) {
            var yellowY: number;
            var yellowHeight: number;
            if (ylims[0] < maxValue && ylims[1] > minValue) { // om båda gränser är med
                yellowY = y(ylims[0]);
                yellowHeight = y(ylims[1]) - y(ylims[0]);
            } else if (ylims[0] < maxValue && ylims[1] < minValue) { // om övre gränsen är med
                yellowY = y(ylims[0]);
                yellowHeight = height - y(ylims[0]);
            } else if (ylims[0] > maxValue && ylims[1] > minValue) { // om nedre gränsen är med
                yellowY = 0;
                yellowHeight = y(ylims[1]);
            } else {
                yellowHeight = 0;
            }
            console.log("yellowheight is " + yellowHeight);
            back.append("rect")
                //.attr("y", y(ylims[0]))
                .attr("y", yellowY)
                .attr("width", width)
                //.attr("height", (y(ylims[1]) - y(ylims[0])) * hasYellow)
                .attr("height", yellowHeight)
                .attr("fill", bgYellow); //light yellow
        }
        if (ylims[0] > maxValue && ylims[1] < minValue) { // om helgult
            var yellowY = 0;
            var yellowHeight = height;
            back.append("rect")
                //.attr("y", y(ylims[0]))
                .attr("y", yellowY)
                .attr("width", width)
                //.attr("height", (y(ylims[1]) - y(ylims[0])) * hasYellow)
                .attr("height", yellowHeight)
                .attr("fill", bgYellow); //light yellow
        }

        //good line
        var hasGreen = ylims[1] > minValue ? 1 : 0;
        if(ylims[1] > minValue) {
            back.append("rect")
                .attr("y", y(ylims[1]))
                .attr("width", width)
                //.attr("height", y(ylims[1]) - y(ylims[0]))
                .attr("height", height - y(ylims[1]))
                .attr("fill", bgGreen);
        }

        back.append("path")
            .datum(data['trend'])
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "2.5px"); // gör det som CSS:en i styles ovan hade gjort

        back.append("path")
            .datum(data['prediction'])
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-dasharray", "5,5")
            .style("stroke-width", "2.5px"); // gör det som CSS:en i styles ovan hade gjort

        //x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        //y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .attr("style","float:left;")
            .style("text-anchor", "end")
            .text(""); // stod här "någoooot" förut

        this.drawCircles(svg,data,x,y)

    }

    private drawCircles(parent,data,x,y){
        var svg = parent;
        //---------------------------------------------------//
        //-------------------- circles ----------------------//
         var smallR = 5;
         var bigR = 8;
         var colors = this.getMarkerColors();
         var circles = svg.append("svg").attr("class","circles");

         var dataPoints = data[dataKey.hist].length;
         var nowTimeKey = dataPoints-1;

         for (var key in data[dataKey.times]) {
            var radius = smallR;
            if(key != undefined) {
              var circle = circles.append("circle")
              .attr("cx", x(data[dataKey.hist][nowTimeKey].x))
              .attr("cy", y(data[dataKey.times][key]))
              .attr("r",smallR)
              .attr("angle", 360)
              .style("fill", colors[key])
              .attr("stroke","white","stroke-width",-2)
              .attr("class","trend_circle");

              if(key == 'median'){
                circle.attr("r", bigR);
              }
            }
         }
    }
}
