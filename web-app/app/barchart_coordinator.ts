/**
 * Created by asasoderlund on 2016-03-01.
 *
 * staplarna fungerar men koden är ful
 */

import {Component} from 'angular2/core';

import * as d3 from 'd3';



@Component({
    selector: 'd3',
    template: `
        <header class="header"> </header>
		<svg class='baarchart'></svg>
		`
})

export class barchart_coordinator {

    // tydligen funkar inte data.red-formatet när man ska kommunicera utifrån, måste köra data['red']

    public static draw(jsonData) {

        var total = 0
        var data = jsonData;
        for (var i = 0; i < data.length; i++) {
            total += data[i]['total_patients'];
        }
        var header = d3.select("header");
        var text = header.append("text")
            .data(jsonData)
            .text("Patientfördelning: " + total)
            .style("font-size", "20px")
            .style("font-weight", "bold");

        var color = ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); //finns enbart med för att loopen i legend ska bli rätt..

        var color_hash = { //gör om så att den matchar jsonfilen och fixa till stapeln på untriaged
            0: ["incoming", "lightgrey"],
            1: ["påhas_doctor", "lightgrey"],
            2: ["opåhas_doctor", "grey"],
            3: ["klar", "black"],
            4: ["blå", "blue"],
            5: ["grön", "green"],
            6: ["gul", "yellow"],
            7: ["orange", "orange"],
            8: ["röd", "red"],
            9: ["ej triagerade", "brown"]
        };

        var max = d3.max(jsonData, function (d) {
            return d['total_patients'];
        });

        var width = 700,
            chartWidth = width * 0.7,
            height = 400,
            chartHeight = height * 0.8,
            barSpace = chartWidth / (jsonData.length * 2),
            barWidth = barSpace * 0.8,
            //fontSize = chartHeight / max,
            fontSize = 10,
            legendSpace = height / 20,
            legendSize = legendSpace / 2;

        console.log(jsonData); // TODO debugging...
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
            .outerTickSize(2);

        d3.select(".header").selectAll("*").remove();
        d3.select(".baarchart").selectAll("*").remove();

        //Chart
        var chart = d3.select(".baarchart")
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
            .style({'stroke': 'black', 'fill': 'black', 'stroke-width': '1px'})
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
            .each(function (d, i) {
                var g = d3.select(this);
                var rect = g.append("rect")
                    .attr("x", chartWidth + barSpace + 10)
                    .attr("y", i * legendSpace + (height - chartHeight))
                    .attr("width", legendSize)
                    .attr("height", legendSize);
                if (i == 0) {
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

        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['untriaged']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['untriaged']);
            })
            .attr("width", barWidth * 2)
            .attr("fill", color_hash[String(9)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                if (d['untriaged'] != 0) {
                    return y(d['untriaged']) + fontSize;
                }
            })
            .text(function (d) {
                if (d['untriaged'] != 0) {
                    return d['untriaged'];
                }
            })
            .attr("font-size", fontSize);


        //incoming
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['incoming']) - chartHeight + y(d['has_doctor']) - chartHeight + y(d['no_doctor']) - chartHeight + y(d['klar']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['incoming']);
            })
            .attr("width", 2 * barWidth)
            .style("stroke-dasharray", ("8, 8"))
            .style("stroke", color_hash[String(0)][1])
            .style("fill", "none")
            .style("stroke-width", "3px");

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['incoming']) - chartHeight + y(d['has_doctor']) - chartHeight + y(d['no_doctor']) - chartHeight + y(d['klar']) + fontSize;
            })
            .text(function (d) {
                if (d['incoming'] != 0) {
                    return d['incoming'];
                }
            })
            .attr("font-size", fontSize);


        //Opåhas_doctor
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['no_doctor']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['no_doctor']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(2)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['no_doctor']) + fontSize;
            })
            .text(function (d) {
                if (d['no_doctor'] != 0) {
                    return d['no_doctor'];
                }
            })
            .attr("font-size", fontSize);


        //Påhas_doctor
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['has_doctor']) - chartHeight + y(d['no_doctor']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['has_doctor']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(1)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                if (d['has_doctor'] != 0) {
                    return y(d['has_doctor']) - chartHeight + y(d['no_doctor']) + fontSize;
                }
            })
            .text(function (d) {
                if (d['has_doctor'] != 0) {
                    return d['has_doctor'];
                }
            })
            .attr("font-size", fontSize);


        //klar
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['klar']) - chartHeight + y(d['has_doctor']) - chartHeight + y(d['no_doctor']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['klar']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(3)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace - barWidth;
            })
            .attr("y", function (d) {
                return y(d['klar']) - chartHeight + y(d['has_doctor']) - chartHeight + y(d['no_doctor']) + fontSize;
            })
            .text(function (d) {
                if (d['klar'] != 0) {
                    return d['klar'];
                }
            })
            .attr("font-size", fontSize)
            .attr("fill", "red");


        //Blåa
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['blue']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['blue']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(4)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['blue']) + fontSize;
            })
            .text(function (d) {
                if (d['blue'] != 0) {
                    return d['blue'];
                }
            })
            .attr("font-size", fontSize)
            .attr("fill", "black");

        //Gröna
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['green']) - chartHeight + y(d['blue']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['green']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(5)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['green']) - chartHeight + y(d['blue']) + fontSize;
            })
            .text(function (d) {
                if (d['green'] != 0) {
                    return d['green'];
                }
            })
            .attr("font-size", fontSize)
            .attr("fill", "black");

        //Gula
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['yellow']) - chartHeight + y(d['blue']) - chartHeight + y(d['green']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['yellow']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(6)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['yellow']) - chartHeight + y(d['blue']) - chartHeight + y(d['green']) + fontSize;
            })
            .text(function (d) {
                if (d['yellow'] != 0) {
                    return d['yellow'];
                }
            })
            .attr("font-size", fontSize)
            .attr("fill", "black");


        //Orangea
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['orange']) - chartHeight + y(d['blue']) - chartHeight + y(d['green']) - chartHeight + y(d['yellow']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['orange']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(7)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['orange']) - chartHeight + y(d['blue']) - chartHeight + y(d['green']) - chartHeight + y(d['yellow']) + fontSize;
            })
            .text(function (d) {
                if (d['orange'] != 0) {
                    return d['orange'];
                }
            })
            .attr("font-size", fontSize)
            .attr("fill", "black");

        //Röda
        bar.append("rect")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['red']) - chartHeight + y(d['blue']) - chartHeight + y(d['green']) - chartHeight + y(d['yellow']) - chartHeight + y(d['orange']);
            })
            .attr("height", function (d) {
                return chartHeight - y(d['red']);
            })
            .attr("width", barWidth)
            .attr("fill", color_hash[String(8)][1]);

        bar.append("text")
            .attr("x", function (d, i) {
                return (2 * i + 1) * barSpace;
            })
            .attr("y", function (d) {
                return y(d['red']) - chartHeight + y(d['blue']) - chartHeight + y(d['green']) - chartHeight + y(d['yellow']) - chartHeight + y(d['orange']) + fontSize;
            })
            .text(function (d) {
                if (d['red'] != 0) {
                    return d['red'];
                }
            })
            .attr("font-size", fontSize)
            .attr("fill", "black");

    }
}