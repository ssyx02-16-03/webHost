/**
 * Created by oskar on 2016-04-04.
 */


import {Component, OnInit} from 'angular2/core';

import {SocketIO} from './socket-io';

@Component({
    selector: 'squarepatients',
    template: `
    <div class="square"></div>
<div class="waiting"></div>
<div class="others"></div>

    `,
    providers: [SocketIO],
    //styleUrls: ['./squareStyle.css']
})


export class SquarePatients implements OnInit{

    ngOnInit(){
        var divs = paintCardHolders();

        //listen to data
        SocketIO.connect('blue_side_overview');
        SocketIO.on('blue_side_overview', function(data){
            console.log(data);
            console.log('test worked! SocketIO!');
            refreshCards(divs,data);
        });
        //for testing purposes
        refreshCards(divs,patients);
    }
}

//print the base layout
function paintCardHolders(){
    var height = "400px";
    var cardWidth = 150; //pixels
    var cardHeight = 100;
    var divs = [];
    divs['squareDiv'] = d3.select(".square")
        .attr("style", "width:" + cardWidth*5 +"px;"
            +"height:" +cardHeight*3 +"px;"
            + "background-color:black;");

    divs['waitingDiv'] = d3.select(".waiting")
        .attr("style", "width: "+cardWidth*4 +"px;"
            +"height:"+cardHeight*4 +"px;"
            +"float:left;"
            +"background-color: #E0E0E0; "); //light gray

    divs['othersDiv'] = d3.select(".others")
        .attr("style", "float:left;"
            +"clear:right;"
            +"width: "+ cardWidth+"px;"
            +"height:" +cardHeight*4 +"px;"
            +"margin-left: 2px;"
            +"background-color: gray");
    return divs;
}

//make things happen
function refreshCards(divs,data){
    var cards = updateCards(data);
    paintWaitingList(divs.waitingDiv, cards[Location.innerWaitRoom]);
    paintOtherCards(divs.othersDiv, cards[Location.other]);
    paintSquareCards(divs.squareDiv, cards[Location.square]);
}

//instance each card and collect them in an ojbect
function updateCards(data){
    var cards = [];
    cards[Location.other] = [];
    cards[Location.square] = [];
    cards[Location.innerWaitRoom] = [];

    //noinspection TsLint
    for(var i=0; i < data.length; i++){
        var patienti =  new Card(data[i]);
        cards[patienti.loc].push(patienti);
    }
    console.log("updated cards! ",cards);
    return cards;
}

//paint all the cards:
function paintWaitingList(grandParent,waitingCards) {
    grandParent.selectAll("*").remove(); //remove old stuff
    var cardStyle = "height: 23%; width: 100%;"
        + "margin-bottom: 10px;"
        + "display:inline-block; "
        + "float:left;";

    var paintedCards = 0; //important for column making
    var parent = grandParent; //used for column making using <ul>

    //print the cards
    console.log("waitingCards:" ,waitingCards);
    while(waitingCards.length >0) {
        var patient = waitingCards.pop();
        parent = paintWaitCard(patient,parent,cardStyle);
        parent = paintWaitCard(patient,parent,cardStyle);
        parent = paintWaitCard(patient,parent,cardStyle);
    }

    function paintWaitCard(patientCard:Card,parent,cardStyle:string){
        if(paintedCards%4 == 0){ //fix a new column every 4th card
            parent = newUl(grandParent,23);
        }
        if(paintedCards == 0){ //first column should start with an empty spot
            parent.append("li")
                .attr("style", cardStyle)
                .text("väntrum");
            paintedCards++;
        }
        paintCard(patientCard, parent, cardStyle);
        paintedCards++;
        return parent;
    }
}
function paintOtherCards(grandParent,cards){
    grandParent.selectAll("*").remove(); //remove old stuff
    var ul = newUl(grandParent,100);

    var cardStyle = "height: 23%; width: 100%;"
        + "margin-bottom: 10px;"
        + "display:inline-block; "
        + "float:left;";

    for(var i = 0; cards.length >0 && i<4; i++) { //cannot be longer than 4 cards!
        if(i == 0){ //put banner on top
            ul.append("li")
                .attr("style", cardStyle)
                .text("Övriga")
                .style("height","12%");
        }

        var patient = cards.pop();
        paintCard(patient,ul,cardStyle);
    }
    if(cards.length > 0){
        console.log("ERROR: paintOthers: more than 4 waiting!");
    }

}
function paintSquareCards(grandParent,roomCards){
    grandParent.selectAll("*").remove(); //remove old stuff

    var sortedCards = [];
    for(var i=0; roomCards.length > 0; i++){
        var card = roomCards.pop();
        var roomNr = parseInt(card.room);
        if(roomNr < 19 || roomNr > 27){
            console.log("ERROR: paintSquareCards: room numbers are bad..");
        }
        sortedCards[roomNr]= card;
    }
    var cardStyle = "margin-bottom: 3px;"
        + "display:block; "
        + "float:left;"
        + cssCalcWidth(100,-4);

    //paint holder spacing
    var color = "";
    var columnStyle = "width: 20%; height: 64%;" +color;

    var topRow = grandParent.append("div")
                    .attr("style","width: 100%; height: 32%;" +color);
    var leftColumn = grandParent.append("div")
                    .attr("style", columnStyle +"float:left;");
    var rightColumn = grandParent.append("div")
                    .attr("style", columnStyle +"float:right;");

    for(var i=21; i<26; i++){
        paintCardOrDummy(i,sortedCards[i],topRow,cardStyle + "height: 100%;"+ cssCalcWidth(20,-3) + "margin-right:3px;");
    }
    //left column
    paintCardOrDummy(20,sortedCards[20],leftColumn,cardStyle + "height: 50%;");
    paintCardOrDummy(19,sortedCards[19],leftColumn,cardStyle + "height: 50%;");
    //right column
    paintCardOrDummy(26,sortedCards[26],rightColumn,cardStyle + "height: 50%;");
    paintCardOrDummy(27,sortedCards[27],rightColumn,cardStyle + "height: 50%;");


    function paintCardOrDummy(num:number,card:Card, parent,cardStyle){
        if(card == null){
            paintDummyCard(num,parent,cardStyle);
        }else{
            paintCard(card,parent,cardStyle);
        }
    }

}

//create a new listholder for cards
function newUl(gParent,width:number){
    var ulStyle = "width: "+width +"%; height: 100%; float:left; padding:5px;";
    var parent = gParent.append("ul")
        .attr("style", ulStyle)
    return parent;
}

//paint a single card
function paintDummyCard(num:number,parent,cardStyle){
    var dummyCard = parent
        .append("div")
        .attr("id","dummy");

    dummyCard.attr("style", cardStyle
                +"background-color:gray;"
                +"border-style:solid; border-width:2px; border-color:white;");

    var p = dummyCard.append("p")
                .text(num)
                .attr("style","color: white; font-size:2em; font-type:bold; margin:20px;");
}
function paintCard(patientCard:Card,parent,cardStyle) { //paint one card inside parent

    //Attention checker
    var attentionStyle = "";
    if(patientCard.needsAttention){
        attentionStyle = "outline-style: solid; outline-width: 3px; outline-color: "+patientCard.triage +";";
    }
    var card1 = parent.append("li")
        .attr("style", cardStyle
            + "background-color:" +patientCard.triage +";"
            + attentionStyle);

    //Room nr
    var roomNr = card1.append("p")
        .text(patientCard.room)
        .attr("style", "float:left; display:block; font-size: 1.25em; padding:5px; margin:0px; max-width:40%");

    //patient name
    var roomNrWidth = roomNr.node().getBoundingClientRect().width;
    var nameAndNumberStyle = "text-align:right; font-size:0.75em; min-width: 50%;"
        +"float:right; display: block;";
    card1.append("p")
        .text(patientCard.name)
        .attr("style", nameAndNumberStyle
            + "margin: 5px 2px 0 0;");


    //patient number
    card1.append("p")
        .text(patientCard.careNumber)
        .attr("style", nameAndNumberStyle
            +" margin: 2px 2px 0 0;"); //margin: top right bot left


    //info table: styles
    var rowStyle = "height:50%;";
    var borderStyle = " border-style: solid; border-width: 1px; border-color: gray; ";
    var cellStyle = "font-size: 0.75em; padding:1px; width:50%; background-color:rgba(255,255,255,0.5);" +borderStyle;

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

function cssCalcWidth(percent:number,pixels:number){
    return "width: -moz-calc(" +percent +"% + " +pixels +"px);"
    + "width: -webkit-calc(" +percent +"% + " +pixels +"px);"
    + "width: calc(" +percent +"% + " +pixels +"px);";
}


//Classes and other stuff
class Card{
    triage:string;
    careNumber:string;
    name:string;
    arrivalTime:string;
    loc:Location;
    room:string;
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
            case 'Blue'||'Blå':
                this.triage = triageStatus.blue;
                break;
            case 'Green'||'Grön':
                this.triage = triageStatus.green;
                break;
            case 'Yellow'||'Gul':
                this.triage = triageStatus.yellow;
                break;
            case 'Orange':
                this.triage = triageStatus.orange;
                break;
            case 'Red'||'Röd':
                this.triage = triageStatus.red;
                break;
            default:
                console.log("ERROR: triage colour ");
                this.triage = "purple";
        }
    }

    determineLocation(jsonLocation){
        this.room = jsonLocation;
        if(this.isNumeric(this.room)){
            this.loc = Location.square;
        }else {
            switch(this.room) {
                case 'ivr':
                    this.loc = Location.innerWaitRoom;
                    break;
                default:
                    this.loc = Location.other;
            }
        }
    }

    private isNumeric(num){ //is the object numeric?
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

//determines where
enum Location{
    square,
    innerWaitRoom,
    other
}


//temp dev. data:
var patients =
    [{
        "Priority":"Orange",
        "arrival_time_of_day":"14:53",
        "room":"22",
        "name":"foo aaaaaaa",
        "last_event":{
            "guidelines_exceeded":true,
            "minutes_since":"1717",
            "name":"Klar"
        },
        "has_doctor":true,
        "id":3972924,
        "is_done": true,
        "doctor_name":"Klar",
        "side":"blue_side"
    },
        {
            "Priority":"Orange",
            "arrival_time_of_day":"07:08",
            "room":"ivr",
            "name":"Abra Kadaver",
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
            "Priority":"Orange",
            "arrival_time_of_day":"07:08",
            "room":"ivr",
            "name":"Iver Ivar",
            "last_event":{
                "guidelines_exceeded":false,
                "minutes_since":"32",
                "name":"Omv\u00e5rdnad"
            },
            "has_doctor":false,
            "id":3971342,
            "doctor_name":"HELLU17",
            "side":"yellow_side"
        },
        {
            "Priority":"Red",
            "arrival_time_of_day":"07:08",
            "room":"A1",
            "name":"Agust Akut",
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
            "Priority":"Green",
            "arrival_time_of_day":"07:08",
            "room":"24",
            "name":"Slappar Stina",
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
