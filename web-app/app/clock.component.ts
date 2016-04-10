
import {Component, OnInit} from 'angular2/core';
import * as d3 from 'd3';
import {SocketIO} from './socket-io';

@Component({
    selector: 'clock_coord',
    template: `
        <svg class="clock" width="600"></svg>
        `,
    providers: [SocketIO]
})

export class Clock implements OnInit {

    static svgClass = '.clock';
    static chart;



    ngOnInit() {
        Clock.loop();
    }

    static loop() {
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        var parsed_hour = hour < 10 ? "0"+String(hour): String(hour);
        var parsed_min = minute < 10 ? "0"+String(minute): String(minute);
        var second = new Date().getSeconds()
        Clock.draw(String(parsed_hour) + ":" + String(parsed_min));
        setTimeout(function(){ Clock.loop(); }, 1000); // clock calls self once per second
    }

    static draw(data) {

        var scale = 1.0; // scale factor of clock
        var x = 7;      // pixel coordinate, sorry
        var y = 7;      // also pixel coordinate

        var border = 2;
        var font_size = String(100 * scale)
        this.chart = d3.select(this.svgClass);
        this.chart.selectAll("*").remove();

        this.chart.append("rect") //draws the border rectangle
            .attr("x", x )
            .attr("y", y )
            //.attr("rx", 10*scale)
            //.attr("ry", 10*scale)
            .attr("width",  (305 + 2* border)*scale)
            .attr("height", (85  + 2* border)*scale)
            .attr("fill", "#000000");

        this.chart.append("rect") // dras the gray, real rectangle
            .attr("x", x + border*scale )
            .attr("y", y + border*scale)
            //.attr("rx", 10*scale)
            //.attr("ry", 10*scale)
            .attr("width", 305*scale)
            .attr("height", 85*scale)
            .attr("fill", "#E0E0E0");

        this.chart.append("text")
            .attr("font-family", "Courier New")
            .attr('x',x + 5*scale)
            .attr('y',y + 75*scale)
            .attr("style", "font-size:"+font_size + "px;")
            .text(data);


    }



//    dummyCard.attr("style", cardStyle
//+"background-color:gray;"
//+"border-style:solid; border-width:2px; border-color:white;");


}
