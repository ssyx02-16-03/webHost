/**
 * Created by edvard on 2016-03-02.
 */

import {Funktion1Component} from './funktion1.component';
import {Funktion2Component} from './funktion2.component';
import {LocationsComponent} from './locations.component';
import {D3Test2Component} from './d3-test2.component';
import {LocationsD3Component} from './locations.d3.component';
import {D3Test1Component} from './d3-test1.component';

/**
 * Den här listan används av App för att generera menyn. name är namnet som blir på menyknapparna och path är det som
 * hamnar i webbläsarens adressfält.
 */
export var COMPONENTS = [
    {'component': Funktion1Component, 'name': 'En Funktion', 'path': '/funktion11'},
    {'component': Funktion2Component, 'name': 'EnAnnanFunktion', 'path': '/funktion22'},
    {'component': LocationsComponent, 'name': 'OckuperadeRum', 'path': '/locationss'},
    {'component': D3Test2Component, 'name': 'D3Test2', 'path': '/d3-testt2'},
    {'component': LocationsD3Component, 'name': 'ArvTest', 'path': '/inheritance-testt'},
    {'component': D3Test1Component, 'name': 'D3Test1', 'path': '/d3-test'}
];