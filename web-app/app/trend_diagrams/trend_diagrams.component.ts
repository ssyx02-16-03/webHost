/**
 * Created by edvard on 2016-04-05.
 */

import {Component} from 'angular2/core';
import {TrendDiagram} from './trend_diagram.ts';
import {TTKDiagram, TTDDiagram, TTTDiagram} from './trend_diagrams.ts';
import {SocketIO} from '../socket-io';

@Component({
    selector: 'trend-diagrams',
    template: `
        <div style="width:430px">
            <p style="margin:0px;">ttk</p>
            <ttkdiagram></ttkdiagram>
            <p style="margin:0px;">ttd</p>
            <ttddiagram></ttddiagram>
            <p style="margin:0px;">ttt</p>
            <tttdiagram></tttdiagram>
        </div>
        `,
    directives: [TTKDiagram, TTDDiagram, TTTDiagram]
})


export class TrendDiagrams {

    ngOnInit(){
        TrendDiagrams.reDraw(null);
        console.log("start to draw!");
        SocketIO.subscribe('coordinator_line_graph', function(data) {
            console.log(data);
            TrendDiagrams.reDraw(data);
        });
    }
    
    static reDraw(data){
        var tttD = new TTTDiagram();
        var ttdD = new TTDDiagram();
        var ttkD = new TTKDiagram();

        if(data == null){
            tttD.drawDummy();
            ttdD.drawDummy();
            ttkD.drawDummy();
        }else {
            tttD.draw(data['ttt']);
            ttdD.draw(data['ttd']);
            ttkD.draw(data['ttk']);
        }
    }

}

