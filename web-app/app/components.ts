/**
 * Created by edvard on 2016-03-02.
 */

import {Funktion2Component} from './funktion2.component';
import {LocationsComponent} from './tester/locations.component.ts';
import {D3Test1Component} from './tester/d3-test1.component.ts';
import {D3AreaChartComponent} from './tester/d3-area-chart.component.ts';
import {D3ArgPatientComponent} from './tester/d3-arg-patient.component.ts';
import {PassivareComponent} from "./tester/passivare.component.ts";
import {MapComponent} from "./map.component";
import {barchart_coordinatorComponent} from "./barchart_coordinator.component";
import {changeTable} from "./changeTable.component";
import {BootstrapTestComponent} from "./tester/bootstrap_test.component.ts";
import {TrendDiagrams} from "./trend_diagrams/trend_diagrams.component.ts";
import {SquarePatients} from "./squarePatient.component";
import {Coordinator} from "./coordinator.component";
import {Faces} from "./faces";
import {SquareComponent} from "./square.component";

/**
 * Den här listan används av App för att generera menyn. name är namnet som blir på menyknapparna och path är det som
 * hamnar i webbläsarens adressfält.
 */
export var COMPONENTS = [
    {'component': Funktion2Component, 'name': 'Webserver_comm-test', 'path': '/webserver_comm-test'},
    {'component': LocationsComponent, 'name': 'OckuperadeRum', 'path': '/locationss'},
    {'component': D3Test1Component, 'name': 'D3Test1', 'path': '/d3-test'},
    {'component': D3AreaChartComponent, 'name': "D3 area chart", 'path': '/d3-area-chart'},
    {'component': D3ArgPatientComponent, 'name': "D3 arg patient", 'path': './angry-patient'},
    {'component': PassivareComponent, 'name': "PassivareComp", 'path': "/passivvvisto"},
    {'component': MapComponent, 'name': "Karta", "path": "/map"},
    {'component': barchart_coordinatorComponent, 'name': "Stapeldiagram", "path": "/stapel"},
    {'component': BootstrapTestComponent, 'name': "Bootstrap-test", "path": "/bootstrap"},
    {'component': TrendDiagrams, 'name': 'Tr3nd Diagram', "path": "/diagram"},
    {'component': changeTable, 'name': "Change table", "path": "/change-table"},
    {'component': SquarePatients, 'name': "Square-Patients", "path": "/squaree"},
    {'component': Coordinator, 'name': "Koordinator", "path": "/coordinator"},
    {'component': Faces, 'name': "Faces", 'path': '/faces'},
    {'component': SquareComponent, 'name': "Torg", 'path': '/square'}
];
