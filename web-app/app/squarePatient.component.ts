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
            "doctor_name":"Klar",
            "side":"blue_side"
        },
        {
            "Priority":"Orange",
            "arrival_time_of_day":"07:08",
            "room":"27",
            "name":"abra cccccc",
            "last_event":{
                "guidelines_exceeded":false,
                "minutes_since":"32",
                "name":"Omv\u00e5rdnad"
            },
            "has_doctor":true,
            "id":3971342,
            "doctor_name":"HELLU17",
            "side":"yellow_side"
        },
            {
                "Priority":"Yellow",
                "arrival_time_of_day":"07:08",
                "room":"27",
                "name":"Sjöko Ekström",
                "last_event":{
                    "guidelines_exceeded":false,
                    "minutes_since":"32",
                    "name":"Omv\u00e5rdnad"
                },
                "has_doctor":true,
                "id":3971342,
                "doctor_name":"HELLU17",
                "side":"yellow_side"
            }];

    private status: string = "Nothing has happened yet";

    private cards = []; //all the patients will be stored here

    ngOnInit(){
        //paint the card holders

        var squareDiv = d3.select(".square")
            .attr("style", "width: 600px;"
                +"height: 400px;"
                + "background-color:gray;");

        var waitingDiv = d3.select(".waiting")
            .attr("style", "width: 800px;"
                +"height: 600px;"
                +"background-color: #E0E0E0; "); //light gray


        //listen to data
        SocketIO.connect('webserver_blue_side_overview');
        SocketIO.on('webserver_blue_side_overview', function(data){
            console.log(data);
            console.log('test worked! SocketIO!');
            this.cards = this.updateCards(data);
            paintWaiting(squareDiv,cards);
        });
        this.status = "";


        //for testing purposes
        cards = this.updateCards(this.patients);
        paintWaiting(waitingDiv,cards[Location.waiting_inner]);

    }

    updateCards(data){
        var cards = [];
        cards[Location.other] = [];
        cards[Location.square] = [];
        cards[Location.waiting_inner] = [];
        for(var i=0; i < data.length; i++){
            var patienti =  new Card(data[i]);
            cards[Location.waiting_inner].push(patienti);
            cards[patienti.loc].push(patienti);
        }
        console.log("updated cards! ",cards);
        return cards;
    }
}


function paintWaiting(grandParent,cards) {
    var paintedCards = 0;

    var parent = grandParent;
    for(var i=0; i<10; i++)
    {
        parent = paintWaitCard(cards[0], parent);
    }

    while(cards.length >0) {
        var patient = cards.pop();
        parent = paintWaitCard(patient,parent);
    }
    paintDummyCard(parent);



    function paintDummyCard(parent){

        var dummyCard = parent
            .append("div")
            .attr("id","dummy");

        dummyCard.attr("style", cardSize
            + "margin-bottom: 2px;"
            + "display:block; "
            + "background-color: gray;"
            + "float:left;");
    }

    function paintWaitCard(patientCard:Card,parent){
        var ulStyle = "width: 23%; float:left; padding:5px;";
        if(paintedCards%4 == 0){ //fix a new column every 4th card
            parent = grandParent.append("ul")
                .attr("style", ulStyle)
        }
        paintedCards++;
        paintCard(patientCard,parent);
        return parent;
    }


    function paintCard(patientCard:Card,parent) {

        //Attention checker
        var tempStyle = "";
        if(patientCard.needsAttention){
            tempStyle = "outline-style: solid; outline-width: 3px; outline-color: "+patientCard.triage +";";
        }
        var cardSize = "height: 100%; width: 100%;";

        var card1 = parent.append("li")
                .attr("style", cardSize
                + "margin-bottom: 10px;"
                + "display:inline-block; "
                + "background-color:" +patientCard.triage +";"
                + "float:left;"
                + tempStyle);

        //Room nr
        var roomNr = card1.append("p")
            .text(patientCard.room)
            .attr("style", "float:left; display:block; font-size: 1.25em; padding:5px; margin:0px;");

        //patient name
        var roomNrWidth = roomNr.node().getBoundingClientRect().width;
        var nameAndNumberStyle = "text-align:right; font-size:0.75em; min-width: 80%;"
                +"float:right; display: block;";

        card1.append("p")
            .text(patientCard.name)
            .attr("style", nameAndNumberStyle
                + "margin: 5px 2px 0 5px;");

        //patient number
        card1.append("p")
            .text(patientCard.careNumber)
            .attr("style", nameAndNumberStyle
                +" margin: 2px 2px 0 5px;"); //margin: top right bot left



        //info table: styles
        var rowStyle = "height:50%;";
        var borderStyle = " border-style: solid; border-width: 1px; border-color: gray; ";
        var cellStyle = "padding:1px; width:50%; background-color:rgba(255,255,255,0.5);" +borderStyle;

        //info table: draw table
        var cardTable = card1.append("table").attr("style", "float:left; width: 100%; height: 60%; padding:1px;");
        var tbody = cardTable.append("tbody");

        //info table: draw rows and cells
        var tr = tbody.append("tr").attr("style",rowStyle);
        var arrival = tr.append("td").attr("style",cellStyle).text(patientCard.arrivalTime);
        var careClock = tr.append("td").attr("style",cellStyle).text(patientCard.lastAttention +" min");
        tr = tbody.append("tr").attr("style",rowStyle);
        var lastEvent = tr.append("td").attr("style",cellStyle).text(patientCard.lastEvent);
        var status = tr.append("td").attr("style",cellStyle).text(patientCard.doctorName);

    }
}



class Card{
    triage:string;
    careNumber:string;
    name:string;
    arrivalTime:string;
    loc:Location;
    room:number;
    needsAttention:boolean;
    lastAttention:number;
    lastEvent:string;
    doctorName:string;

    constructor(jsonObject){
        this.determineLocation(jsonObject['room']);
        this.determineTriage(jsonObject['Priority']);
        this.careNumber = JSON.stringify(jsonObject['id']);
        this.name = jsonObject['name'];
        this.arrivalTime = jsonObject['arrival_time_of_day'];
        this.needsAttention = jsonObject['last_event']['guidelines_exceeded'];
        this.lastAttention = jsonObject['last_event']['minutes_since'];
        this.lastEvent = jsonObject['last_event']['name'];
        this.doctorName = jsonObject['doctor_name'];
    }


    determineTriage(jsonPriority){
        switch (jsonPriority){
            case 'Blue':
                this.triage = triageStatus.blue;
                break;
            case 'Green':
                this.triage = triageStatus.green;
                break;
            case 'Yellow':
                this.triage = triageStatus.yellow;
                break;
            case 'Orange':
                this.triage = triageStatus.orange;
                break;
            case 'Red':
                this.triage = triageStatus.red;
                break;
        }
    }

    determineLocation(jsonLocation){
        if(this.isNumeric(jsonLocation)){
            this.loc = Location.square;
            this.room = jsonLocation;
        }else {
            this.room = 0;
            switch (jsonLocation) {
                case 'ivr':
                    this.loc = Location.waiting_inner;
                    break;
                default:
                    this.loc = Location.other;
            }
        }
    }

    isNumeric(num){ //is the object numeric?
        return !isNaN(num);
    }
}

var triageStatus = {
    blue : "blue",
    green : "green",
    yellow : "yellow",
    orange : "orange",
    red : "red"
};

enum Location{
    square,
    waiting_inner,
    other
}

