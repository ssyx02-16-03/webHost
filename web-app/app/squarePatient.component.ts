/**
 * Created by oskar on 2016-04-04.
 */


import {Component, OnInit} from 'angular2/core';

import {SocketIO} from './socket-io';

@Component({
    template: `
        <p>{{status}}</p>
        <div class="square"></div>
        <div class="waiting"></div>
		
		`,
    providers: [SocketIO]
})


export class SquarePatients implements OnInit{
    patients =
        [{
            "Priority":"Orange",
            "arrival_time_of_day":"14:53",
            "room":"19",
            "name":"foo aaaaaaa",
            "last_event":{
                "guidelines_exceeded":true,
                "minutes_since":"1717",
                "name":"Klar"
            },
            "has_doctor":true,
            "id":3972924,
            "doctor_name":"MARST104",
            "side":"blue_side"
        },
        {
            "Priority":"Orange",
            "arrival_time_of_day":"07:08",
            "room":"27",
            "name":"namn cccccc",
            "last_event":{
                "guidelines_exceeded":true,
                "minutes_since":"3182",
                "name":"Omv\u00e5rdnad"
            },
            "has_doctor":true,
            "id":3971342,
            "doctor_name":"HELLU17",
            "side":"blue_side"
        }];

    private status: string = "Nothing has happened yet";

    private cards = [];

    ngOnInit(){
        this.updateCards(this.patients);

        SocketIO.connect('webserver_blue_side_overview');
        SocketIO.on('webserver_blue_side_overview', function(data){
            console.log(data);
            console.log('test worked! SocketIO!');
            this.updateCards(data);
        });

        //paint the startup
        svg = d3.select(".square")
            .attr("width", "600px")
            .attr("height", "300px")
            .style("background-color:", "black");
    }

    updateCards(data){
        cards = []; //throw away
        for(var i=0; i < data.length; i++){
            patienti = new Card(data[i]);
            cards.push(patienti);
        }
        console.log("updated cards! ",cards);
    }
}

private function paint() {
    var svg = d3.select(".square").append("svg");
}


class Card{
    static width = 150;
    static height = 50;
    triage:TriageStatus;
    careNumber:string;
    Name:string;
    ArrivalTime:string;
    loc:Location;
    room:string;

    constructor(careNumber,Name,triStatus,location){

    }

}

enum TriageStatus{
    blue,
    green,
    yellow,
    orange,
    red
}

enum Location{
    square,
    waiting_inner,
    other
}