
import {Component, OnInit} from 'angular2/core';
import * as d3 from 'd3';
import {SocketIO} from './socket-io';


//NOTE: styles set in globalcss/style.css
@Component({
    selector: 'clock_coord',
    template: `
        <div class="clock" style="width:300px; height:100%; margin:0 auto;">
          <table id="clock_table" style="width:100%; height:100%;" >
            <tbody>
              <tr>
              <td id="clock_hours1"> </td>
              <td id="clock_hours2"> </td>
              <td id="clock_colon">:</td>
              <td id="clock_minutes1"> </td>
              <td id="clock_minutes2"> </td>
              </tr>
            </tbody>
          </table>
        </div> `,
    providers: [SocketIO]
})

export class Clock implements OnInit {

    static clockTable:string = "#clock_table";
    static minute:number;

    ngOnInit() {
        Clock.loop();
    }

    static loop() {
        var obj:HTMLElement = document.getElementById('clock_hours1'); //object already there?
        var innerText = "";
        if(obj == null){
          return;
        }
        innerText = obj.innerText;
        var hour:number = new Date().getHours();
        var minute:number = new Date().getMinutes();
        //var hour:number new Date().getSeconds(); //fulfix, bra för att kolla beteende
        if(this.minute != minute || innerText == ""){
          this.minute = minute;
          var clockArray:number[] = [];
          clockArray[0] = Math.floor(hour/10);
          clockArray[1] = hour%10;
          clockArray[2] = Math.floor(minute/10);
          clockArray[3] = minute%10;
          Clock.draw(clockArray);
        }
        setTimeout(function(){ Clock.loop(); }, 1000); // clock calls self once per second
    }

    static draw(dataArray:number[]) {
        var scale = 1.0; // scale factor of clock
        var x = 7;      // pixel coordinate, sorry
        var y = 7;      // also pixel coordinate
        var boxWidth = 305*scale;
        var boxHeight = 85*scale;
        var xmiddle = boxWidth/2;
        var ymiddle = boxHeight/2;

        var borderwidth = 2;
        var font_size = 80;

        var cells:HTMLElement[] = [];
        cells[0] = document.getElementById("clock_hours1");
        cells[1] =  document.getElementById("clock_hours2");
        cells[2] =  document.getElementById("clock_minutes1");
        cells[3] =  document.getElementById("clock_minutes2");

        for(var i =0; i < 4; i++){
          cells[i].innerText = String(dataArray[i])
        }


        /*
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
        */

    }

}
