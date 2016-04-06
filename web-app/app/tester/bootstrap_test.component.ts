/**
 * Created by oskar on 2016-04-03.
 */

import {Component} from 'angular2/core';

@Component({
    template: `
        <div class="container-fluid">
            <h1>Bootstrap_test</h1>
            <p>Bootstrap contains 12 columns</p>
            <div class="row">
              <div class="col-sm-4">.col-sm-4</div>
              <div class="col-sm-8">.col-sm-8</div>
            </div>
        </div>
		`
})

export class BootstrapTestComponent{

}