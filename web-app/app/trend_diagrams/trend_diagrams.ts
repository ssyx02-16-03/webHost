/**
 * Created by edvard on 2016-04-05.
 */

import {Component, OnInit} from "angular2/core";
import {TrendDiagram} from './trend_diagram.ts';

@Component({
    selector: 'ttkdiagram',
    template: '<div class="chart"></div>'
})

export class TTKDiagram extends TrendDiagram {

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

    ngOnInit() {
        this.draw(this.data);
    }
}

@Component({
    selector: 'ttddiagram',
    template: '<div class="chart"></div>'
})

export class TTDDiagram extends TrendDiagram {

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

    ngOnInit() {
        this.draw(this.data);
    }
}

@Component({
    selector: 'tttdiagram',
    template: '<div class="chart"></div>'
})

export class TTTDiagram extends TrendDiagram {

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

    ngOnInit() {
        this.draw(this.data);
    }
}