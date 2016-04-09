/**
 * Created by edvard on 2016-04-05.
 */

/*
 TTT - < 20 min = BRA, 20-40 min = OK, >40 min = Inte bra

 TTL – (1) < 1h = BRA, 1h-2h = OK, >2h = Inte bra
        (2)  < 1h = BRA, >=1 Inte bra

 TTK – (1) < 3h 30 min = BRA,  3h 30 min – 4h = OK, >4h = Inte bra
        (2) < 3h 30 min = BRA, >=3h 30 min Inte bra

 TTA – (1) < 30 min BRA, 30-60 min = OK, >60 min = Inte bra
        (2)  <30 min = BRA, >=30 min Inte bra

 TVT – (1) < 4h = BRA, 4-6h = OK, >6h = Inte bra
        (2) <4h = BRA, >=4h Inte bra
 */


import {Component, OnInit} from "angular2/core";
import {TrendDiagram} from './trend_diagram.ts';


@Component({
    selector: 'ttkdiagram',
    template: '<div class="ttk-chart"></div>'
})


export class TTKDiagram extends TrendDiagram {
    selector = ".ttk-chart";
    ttk_ylims = [4*60, 3.5*60];  //TTK – (1) < 3h 30 min = BRA,  3h 30 min – 4h = OK, >4h = Inte bra

    data: any = {
        'trend': [
            {'x': -2, 'y': 5},
            {'x': -1, 'y': 6},
            {'x': 0, 'y': 4}
        ],
        'prediction': [
            {'x': 0, 'y': 4},
            {'x': 1, 'y': 6}
        ],
        'times': {'Gul': 4.5, 'Ki': 4.2, 'Ort': 3.5, 'Jour': 3.2, 'median': 3.9}
    };

    getMarkerColors() {
        return {
            'Gul': 'yellow',
            'Ki': 'red',
            'Ort': 'green',
            'Jour': 'purple'
        }
    }

    drawDummy(){
        super.draw(this.data,this.selector,this.ttk_ylims);
    }

    draw(data){
        super.draw(data,this.selector,this.ttk_ylims);
    }
}

@Component({
    selector: 'ttddiagram',
    template: '<div class="ttd-chart"></div>'
})

export class TTDDiagram extends TrendDiagram {
    ttd_ylims = [120, 60]; //TTL – (1) < 1h = BRA, 1h-2h = OK, >2h = Inte bra
    selector = ".ttd-chart";

    data: any = {
        'trend': [
            {'x': -2, 'y': 5},
            {'x': -1, 'y': 6},
            {'x': 0, 'y': 4}
        ],
        'prediction': [
            {'x': 0, 'y': 4},
            {'x': 1, 'y': 6}
        ],
        'times': {'Gul': 4.5, 'Ki': 4.2, 'Ort': 3.5, 'Jour': 3.2, 'median': 3.9}
    }

    getMarkerColors() {
        return {
            'Gul': 'yellow',
            'Ki': 'red',
            'Ort': 'green',
            'Jour': 'purple'
        }
    }

    drawDummy(){
        super.draw(this.data,this.selector,this.ttd_ylims);
    }

    draw(data){
        super.draw(data,this.selector,this.ttd_ylims);
    }
}

@Component({
    selector: 'tttdiagram',
    template: '<div class="ttt-chart"></div>'
})

export class TTTDiagram extends TrendDiagram {
    ttt_ylims = [40, 20]; //   TTT - < 20 min = BRA, 20-40 min = OK, >40 min = Inte bra
    selector = ".ttt-chart";

    data: any = {
        'trend': [
            {'x': -2, 'y': 5},
            {'x': -1, 'y': 6},
            {'x': 0, 'y': 4}
        ],
        'prediction': [
            {'x': 0, 'y': 4},
            {'x': 1, 'y': 6}
        ],
        'times': {'median': 3.9}
    }

    getMarkerColors() {
        return 0;
    }

    drawDummy(){
        super.draw(this.data,this.selector,this.ttt_ylims);
    }

    draw(data){
        super.draw(data,this.selector,this.ttt_ylims);
    }
}