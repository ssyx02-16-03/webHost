/**
 * Created by asasoderlund on 2016-03-01.
 *
 * staplarna fungerar men koden är ful och det finns inga siffror
 */

import {Component} from '../../node_modules/angular2/core.d';

import * as d3 from 'd3';

@Component({
    selector: 'd3',
    template: `

		<svg class='chart'></svg>
		`
})

export class D3Testar1D3 {

    public static draw(data: number[]) {

        var jsonData = [
            {
                "torg": "medicinblå",
                "tittade": 8,
                "otittade": 11,
                "klara": 4,
                "blue": 0,
                "green": 2,
                "yellow": 11,
                "orange": 8,
                "red": 2,
                "inkommande": 0
            },
            {
                "torg": "medicingul",
                "tittade": 6,
                "otittade": 10,
                "klara": 4,
                "blue": 1,
                "green": 1,
                "yellow": 9,
                "orange": 8,
                "red": 1,
                "inkommande": 2
            },
            {
                "torg": "kirurg",
                "tittade": 5,
                "otittade": 8,
                "klara": 3,
                "blue": 0,
                "green": 1,
                "yellow": 8,
                "orange": 5,
                "red": 2,
                "inkommande": 1
            },
            { "torg": "ortoped", "tittade": 3, "otittade": 6, "klara": 0, "blue": 0, "green" :3, "yellow": 5, "orange":1, "red":0, "inkommande": 1},
            { "torg": "jour", "tittade": 1, "otittade": 5, "klara":1, "blue": 0, "green" :1, "yellow": 3, "orange":3, "red":0, "inkommande": 2}];


var width = 400,
 height = 300;

 var max = d3.max(jsonData, function (d) {
 return d.tittade + d.otittade + d.klara + d.inkommande;
 });

 var y = d3.scale.linear()
 .range([height, 0])
 .domain([0, max]);

 var chart = d3.select(".chart")
 .attr("width", width)
 .attr("height", height);

 var barWidth = width / (jsonData.length*2);


 var bar = chart.selectAll("g")
 .data(jsonData)
 .enter().append("g");


 //Inkommande

 bar.append("rect")
 .attr("x", function (d, i) {
 return 2 * i * barWidth + barWidth * 0.2;
 })
 .attr("y", function(d) { return y(d.inkommande) - height + y(d.tittade) - height + y(d.otittade) - height + y(d.klara); })
 .attr("height", function(d) { return height - y(d.inkommande); })
 .attr("width", 2 * barWidth * 0.8)
 .style("stroke-dasharray", ("8, 8"))
 .style("stroke", "black")
 .style("fill", "none")
 .style("stroke-width", "3px");

 //Påtittade
 bar.append("rect")
 .attr("x", function (d, i) {
 return 2 * i * barWidth + barWidth * 0.2;
 })
 .attr("y", function (d) {
 return y(d.tittade);
 })
 .attr("height", function (d) {
 return height - y(d.tittade);
 })
 .attr("width", barWidth * 0.8)
 .attr("fill", "grey");

 //Opåtittade
 bar.append("rect")
 .attr("x", function (d, i) {
 return 2 * i * barWidth + barWidth * 0.2;
 })
 .attr("y", function(d) { return y(d.otittade) - height + y(d.tittade); })
 .attr("height", function(d) { return height - y(d.otittade); })
 .attr("width", barWidth * 0.8)
 .attr("fill", "lightgrey");

 //Klara
 bar.append("rect")
 .attr("x", function (d, i) {
 return 2 * i * barWidth + barWidth * 0.2;
 })
 .attr("y", function(d) { return y(d.klara) - height + y(d.tittade) - height + y(d.otittade); })
 .attr("height", function(d) { return height - y(d.klara); })
 .attr("width", barWidth * 0.8)
 .attr("fill", "black");


 //Blåa
 bar.append("rect")
 .attr("x", function (d, i) {
 return (2 * i + 1) * barWidth;
 })
 .attr("y", function (d) {
 return y(d.blue);
 })
 .attr("height", function (d) {
 return height - y(d.blue);
 })
 .attr("width", barWidth * 0.8)
 .attr("fill", "blue");

 //Gröna
 bar.append("rect")
 .attr("x", function (d, i) {
 return (2 * i + 1) * barWidth;
 })
 .attr("y", function(d) { return y(d.green) - height + y(d.blue); })
 .attr("height", function(d) { return height - y(d.green); })
 .attr("width", barWidth * 0.8)
 .attr("fill", "green");

 //Gula
 bar.append("rect")
 .attr("x", function (d, i) {
 return (2 * i + 1) * barWidth;
 })
 .attr("y", function(d) { return y(d.yellow) - height + y(d.blue) - height + y(d.green); })
 .attr("height", function(d) { return height - y(d.yellow); })
 .attr("width", barWidth * 0.8)
 .attr("fill", "yellow");


 //Orangea
 bar.append("rect")
 .attr("x", function (d, i) {
 return (2 * i + 1) * barWidth;
 })
 .attr("y", function(d) { return y(d.orange) - height + y(d.blue) - height + y(d.green) - height + y(d.yellow); })
 .attr("height", function(d) { return height - y(d.orange); })
 .attr("width", barWidth * 0.8)
 .attr("fill", "orange");

 //Röda
 bar.append("rect")
 .attr("x", function (d, i) {
 return (2 * i + 1) * barWidth;
 })
 .attr("y", function(d) { return y(d.red) - height + y(d.blue) - height + y(d.green) - height + y(d.yellow) - height + y(d.orange); })
 .attr("height", function(d) { return height - y(d.red); })
 .attr("width", barWidth * 0.8)
 .attr("fill", "red");




 //Add SVG Text Element Attributes
 var textLabels = bar.append("text")
 .attr("x", function (d, i) {
 return 2 * i * barWidth + barWidth * 0.2;
 })
 .attr("y", function(d) { return y(d.tittade) + 3; })
 .attr("dy", ".75em")
 .text( function (d) { return d.tittade; })
 .attr("font-size", "20px");
 /*.attr("font-family", "sans-serif")
 .attr("fill", "red");*/

 var textLabels = bar.append("text")
 .attr("x", function (d, i) {
 return 2 * i * barWidth + barWidth * 0.2;
 })
 .attr("y", function(d) { return y(d.otittade) - height + y(d.tittade) + 3; })
 .attr("dy", ".75em")
 .text( function (d) { return d.otittade; })
 .text( function (d) { return d.tittade; })
 .attr("font-size", height/max + "px");
    }
}