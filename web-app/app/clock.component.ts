
import {Component, OnInit} from 'angular2/core';
import * as d3 from 'd3';
import {SocketIO} from './socket-io';

@Component({
    selector: 'clock_coord',
    template: `
        <svg class="clock" width="350" height="100"></svg>
        `,
    providers: [SocketIO]
})

export class Clock implements OnInit {

    static svgClass = '.clock';
    static chart;
    static minute;



    ngOnInit() {
        Clock.loop();
    }

    static loop() {
        var obj = d3.select(this.svgClass).select("*"); //already there?
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        if(this.minute != minute || obj[0][0]==null){
          this.minute = minute;
          var parsed_hour = hour < 10 ? "0"+String(hour): String(hour);
          var parsed_min = minute < 10 ? "0"+String(minute): String(minute);
          var second = new Date().getSeconds();
          Clock.draw(String(parsed_hour) + ":" + String(parsed_min));
        }
        setTimeout(function(){ Clock.loop(); }, 1000); // clock calls self once per second
    }

    static draw(data) {

        var scale = 1.0; // scale factor of clock
        var x = 7;      // pixel coordinate, sorry
        var y = 7;      // also pixel coordinate
        var boxWidth = 305*scale;
        var boxHeight = 85*scale;
        var xmiddle = boxWidth/2;
        var ymiddle = boxHeight/2;

        var borderwidth = 2;
        var font_size = 80;
        this.chart = d3.select(this.svgClass);
        this.chart.selectAll("*").remove();

        this.chart.append("rect") //draws the border rectangle
            .attr("x", x )
            .attr("y", y )
            .attr("width",  boxWidth)
            .attr("height", boxHeight)
            .attr("fill", "lightGray")
            .attr("stroke", "#505050")
            .attr("stroke-width", borderwidth);

        this.chart.append("text")
            .attr("font-size",font_size)
            .attr("class","clock")
            .attr('x',xmiddle)
            .attr('y',font_size-10 ) //got it just in the middle
            .attr("text-anchor","middle") //x position
            .attr("alignment-baseline","middle") //y position
            .text(data);


    }



//    dummyCard.attr("style", cardStyle
//+"background-color:gray;"
//+"border-style:solid; border-width:2px; border-color:white;");


}
