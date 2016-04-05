/**
 * Created by edvard on 2016-03-02.
 */

import {Funktion1Component} from './funktion1.component';
import {Funktion2Component} from './funktion2.component';
import {LocationsComponent} from './locations.component';
import {D3Test2Component} from './d3-test2.component';
import {D3Test1Component} from './d3-test1.component';
import {D3AreaChartComponent} from './d3-area-chart.component';
import {D3ArgPatientComponent} from './d3-arg-patient.component';
import {PassivareComponent} from "./passivare.component";
import {MapComponent} from "./map.component";
import {BootstrapTestComponent} from "./bootstrap_test.component";
<<<<<<< HEAD
import {TrendDiagrams} from "./trend_diagrams/trend_diagrams.component.ts";
=======
import {NyckeltalsPrediktionComponent} from './nyckeltalsprediktion.component';
import {SquarePatients} from "./squarePatient.component";
>>>>>>> f4a4b303fc2c14f25d8fa434fce0869092c02ff8

/**
 * Den här listan används av App för att generera menyn. name är namnet som blir på menyknapparna och path är det som
 * hamnar i webbläsarens adressfält.
 */
export var COMPONENTS = [
    {'component': Funktion1Component, 'name': 'En Funktion', 'path': '/funktion11'},
    {'component': Funktion2Component, 'name': 'Webserver_comm-test', 'path': '/webserver_comm-test'},
    {'component': LocationsComponent, 'name': 'OckuperadeRum', 'path': '/locationss'},
    {'component': D3Test2Component, 'name': 'D3Test2', 'path': '/d3-testt2'},
    {'component': D3Test1Component, 'name': 'D3Test1', 'path': '/d3-test'},
    {'component': D3AreaChartComponent, 'name': "D3 area chart", 'path': '/d3-area-chart'},
    {'component': D3ArgPatientComponent, 'name': "D3 arg patient", 'path': './angry-patient'},
    {'component': PassivareComponent, 'name': "PassivareComp", 'path': "/passivvvisto"},
    {'component': MapComponent, 'name': "Karta", "path": "/map"},
    {'component': BootstrapTestComponent, 'name': "Bootstrap-test", "path": "/bootstrap"},
<<<<<<< HEAD
    {'component': TrendDiagrams, 'name': 'Tr3nd Diagram', "path": "/diagram"}
];
=======
    {'component': NyckeltalsPrediktionComponent, 'name': "Nyckeltal", "path": "/indicators"},
    {'component': SquarePatients, 'name': "Square-Patients", "path": "/square"}
];
>>>>>>> f4a4b303fc2c14f25d8fa434fce0869092c02ff8
