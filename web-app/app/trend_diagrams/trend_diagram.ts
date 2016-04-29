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


var xAxisLimits = {
  min:0,
  max:0
};

var yAxisLimits = {
  min:0,
  max:0
};

export abstract class TrendDiagram {
    abstract getMarkerColors();

    scaleData(data,minMinutes:number,maxMinutes:number){
      //get rid of datapoints beyond and before -minMinutes and +maxMinutes
        console.log(data);
        if(data['current_value']){
            var median = data['current_value'];
            data[dataKey.times] = {'median': median.y};
        }

        var newHistData = Array();
        var nowKey = data[dataKey.hist].length-1;
        var xNow = data[dataKey.pred][0].x;

        console.log(xNow);
        var xMin_minutes = xNow - minMinutes;
        xAxisLimits.min = xMin_minutes;

        for(var i = nowKey; i>=0; i--){
          this.checkYLimit(data[dataKey.hist][i]);
          if(data[dataKey.hist][i].x < xMin_minutes){
            newHistData.unshift(data[dataKey.hist][i]);
            break;
          }else if(data[dataKey.hist][i].x <= xNow){
              newHistData.unshift(data[dataKey.hist][i]);
          }
        }
        newHistData.push(data[dataKey.pred][0]); //add first prediction point to history
        //newHistData.unshift({x:xMin_minutes,y:0});

        var newPredData = Array();
        var nowKey = 0;
        var xMax_minutes = xNow + maxMinutes;
        xAxisLimits.max = xMax_minutes;

        for(var i = 0; i<data[dataKey.pred].length; i++){
          this.checkYLimit(data[dataKey.pred][i]);
          newPredData.push(data[dataKey.pred][i]);
          if(data[dataKey.pred][i].x > xMax_minutes){
            break;
          }
        }
        //newPredData.push({x:xMax_minutes,y:0});

        data[dataKey.hist] = newHistData;
        data[dataKey.pred] = newPredData;

        console.log(data);
        return data;
    }

    checkYLimit(dataPoint){
      if(dataPoint.y >yAxisLimits.max){
        yAxisLimits.max = dataPoint.y;
      }if(dataPoint.y < yAxisLimits.min){
        yAxisLimits.min = dataPoint.y;
      }
    }

    draw(data,selector,ylims: number[]) {
      xAxisLimits.min=0;
      xAxisLimits.max=0;
      yAxisLimits.min=0;
      yAxisLimits.max=0;
      data = this.scaleData(data,120,30);
      console.log(xAxisLimits,yAxisLimits);

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
            .range([0,width]);
            //.range([xAxisLimits.min,xAxisLimits.max]);
        //.range([hIndraw, width - hIndraw]);

        var xstr = d3.scale.ordinal()
            .domain([ String(xAxisLimits.min), "-1.5","-1","0.5","0", String(xAxisLimits.max)])
            .rangePoints([0, width]);
                      //.domain(["-2 timmar", "-1 timme", "nu", "+1 timme"])


        var xAxis = d3.svg.axis()
            .scale(xstr)
            //.tickValues(['ett', 'two', 'three'])
            .orient("bottom");

        var y = d3.scale.linear()
        .range([0,height])
            //.range([yAxisLimits.min, yAxisLimits.max]);
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
        x.domain(d3.extent(allData, function(d: any) {
          if(d.x > xAxisLimits.max) {
            return xAxisLimits.max;
          }else if(d.x < xAxisLimits.min) {
              return xAxisLimits.min;
          } else {
            return d.x;
          }
        }));

        //var maxValue = yAxisLimits.max;
        //var minValue = yAxisLimits.min;
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

    drawCircles(parent,data,x,y){
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
           console.log(data[dataKey.times][key]);
            if(key != undefined) {
              var color = colors[key];
              if(colors[key]==undefined){
                color = "black";
              }
              var circle = circles.append("circle")
              .attr("cx", x(data[dataKey.pred][0].x))
              .attr("cy", y(data[dataKey.times][key]))
              .attr("r",smallR)
              .attr("angle", 360)
              .style("fill", color)
              .attr("stroke","white","stroke-width",-2)
              .attr("class","trend_circle");

              if(key == 'median'){
                circle.attr("r", bigR);
              }
            }
         }
    }
}
