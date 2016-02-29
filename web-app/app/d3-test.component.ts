import {Component} from 'angular2/core';
//import * as d3 from 'd3';

// ska egentligen inte göras såhär, borde få import att funka istället...
declare var d3: any;

@Component({
	template: `
		<h2>D3 verkar rätt schysst</h2>
		<h3>{{message}}</h3>
		<button (click)='doStuff()'>Klickbar</button>
		<div class='chart'></div>
		`
})

export class D3TestComponent {

	message: string = 'tycker jag iaf';
	
	data: number[] = [4, 8, 15, 16, 23, 42];
	
	doStuff() {
		this.message = 'ändrat!';
		
		d3.select(".chart")
  			.selectAll("div")
    		.data(this.data)
  			.enter().append("div")
    		.style("width", function(d) { return d * 10 + "px"; })
			.style("background-color", "red")
    		.text(function(d) { return d; });
	}	
}