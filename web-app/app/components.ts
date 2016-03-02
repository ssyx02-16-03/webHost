/**
 * Created by edvard on 2016-03-02.
 */

import {Funktion1Component} from './funktion1.component';
import {Funktion2Component} from './funktion2.component';
import {LocationsComponent} from './locations.component';
import {D3TestComponent} from './d3-test.component';
import {LocationsD3} from './locations.d3';

export var COMPONENTS = [
    {'component': Funktion1Component, 'name': 'EnFunktion', 'path': '/funktion11'},
    {'component': Funktion2Component, 'name': 'EnAnnanFunktion', 'path': '/funktion22'},
    {'component': LocationsComponent, 'name': 'OckuperadeRum', 'path': '/locationss'},
    {'component': D3TestComponent, 'name': 'D3Test', 'path': '/d3-testt'},
    {'component': LocationsD3, 'name': 'ArvTest', 'path': '/inheritance-testt'}
];