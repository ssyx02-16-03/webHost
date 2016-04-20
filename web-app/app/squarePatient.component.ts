/**
 * Created by oskar on 2016-04-04.
 */


import {Component, OnInit} from 'angular2/core';

import {SocketIO} from './socket-io';

@Component({
    selector: 'squareCards',
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
    var divs = [];
    divs['squareDiv'] = d3.select(".square")
        .attr("style", ""
            +"width: 100%;"
            +"height: 45%;");
            //+"width:" + cardWidth*5 +"px;"
            //+"height:" +cardHeight*3 +"px;"

    divs['waitingDiv'] = d3.select(".waiting")
        .attr("style", ""
            +"width: 80%;"
            +"height: 55%;"
            //+"width: "+cardWidth*4 +"px;"
            //+"height:"+cardHeight*4 +"px;"
            +"float:left;");

    divs['othersDiv'] = d3.select(".others")
        .attr("style", "float:left;"
            +"clear:right;"
            +"width:20%;"
            +"height:55%;");
            //+"width: "+ cardWidth+"px;"
            //+"height:" +cardHeight*4 +"px;"
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
        + "margin-bottom: 2%;"
        + "display:inline-block; "
        + "float:left;";

    var columns =[];
    for(var i=0; i<4; i++){
        columns[i] = newUl(grandParent,23);
    }
    var parent = columns[0] //used for column making using <ul>

    //print the cards, start with placeholder
    parent.append("li")
        .attr("style", cardStyle + "font-size:200%; font-weight:bold;")
        .text("Väntrum");

    for(var paintedCards = 1; waitingCards.length >0; paintedCards++) {
        if(paintedCards %4 == 0){ //new col every 4th card
            parent = columns[paintedCards/4];
        }
        var patient = waitingCards.pop();
        paintCard(patient,parent,cardStyle);
    }

}

function paintOtherCards(grandParent,cards){
    grandParent.selectAll("*").remove(); //remove old stuff
    var ul = newUl(grandParent,100);

    var cardStyle = "height: 23%; width: 100%;"
        + "margin-bottom: 5%;"
        + "display:inline-block; "
        + "float:left;";

    ul.append("li") //nameholder
        .attr("style",cardStyle + "font-size:200%; font-weight:bold;")
        .style("height","12%")
        .text("Övriga");

    for(var i = 0; cards.length >0 && i<3; i++) { //cannot be longer than 3 cards atm !
        var patient = cards.pop();
        paintCard(patient,ul,cardStyle);
    }
    if(cards.length > 0){
        console.log("ERROR: paintOthers: more than 4 waiting!");
    }

}

function paintSquareCards(grandParent,roomCards){
    grandParent.selectAll("*").remove(); //remove old stuff

    var cardStyle = "margin-bottom: 0.5%;" //3px
        + "display:block; "
        + "float:left;"
        + cssCalcWidth(100,-4);

    //paint holder spacing
    var color = ""; //"background-color:;"
    var columnStyle = "width: 20%; height: 64%;" +color;

    var topRowDiv = grandParent.append("div")
                    .attr("style","width: 100%; height: 32%;" +color);
    var leftColumnDiv = grandParent.append("div")
                    .attr("style", columnStyle +"float:left;");
    var rightColumnDiv = grandParent.append("div")
                    .attr("style", columnStyle +"float:right;");

    var sortedCards = [];
    for(var i=0; roomCards.length > 0; i++){
        var card = roomCards.pop();
        sortedCards[card.room_nr] = card;
    }
    // top row
    paintCardRow(card_holders.topRow, sortedCards, topRowDiv, cardStyle + "height: 100%;"+ cssCalcWidth(20,-3) + "margin-right:3px;");
    //left column
    paintCardRow(card_holders.leftCol, sortedCards ,leftColumnDiv,  cardStyle + "height: 50%;");
    //right column
    paintCardRow(card_holders.rightCol, sortedCards ,rightColumnDiv,  cardStyle + "height: 50%;");

    function paintCardRow(card_holders, cards, parentDiv, cardStyle:string){
      var keys = Object.keys(card_holders);
      for(var i=0; i<keys.length; i++){
        var thisRoom = card_holders[keys[i]];
          paintCardOrDummy(thisRoom, cards[keys[i]], parentDiv, cardStyle);
      }
    }

    function paintCardOrDummy(roomName:string, card:Card, parent, cardStyle:string){
        if(card == null){  paintDummyCard(roomName,parent,cardStyle);
        }else{  paintCard(card,parent,cardStyle);  }
    }

}

//create a new listholder for cards
function newUl(gParent,width:number){
    var ulStyle = "width: "+width +"%; height: 100%; float:left; padding:5px;";
    var parent = gParent.append("ul")
        .attr("style", ulStyle);
    return parent;
}

//paint a single card
function paintDummyCard(roomName:string,parent,cardStyle){
    var dummyCard = parent
        .append("div")
        .attr("id","dummy");

    dummyCard.attr("style", cardStyle
                +"background-color:gray;"
                +"border-style:solid; border-width:2px; border-color:white;");

    var p = dummyCard.append("p")
                .text(roomName)
                .attr("style","color: white; font-size:2em; font-type:bold; margin:20px;");
}
function paintCard(patientCard:Card,parent,cardStyle) { //paint one card inside parent

    //Attention checker
    var attentionStyle = "";
    if(patientCard.needsAttention){
        attentionStyle = "outline-style: solid; outline-width: 3px; outline-color: black;";
    }
    var card1 = parent.append("li")
        .attr("style", cardStyle
            + "background-color:" +patientCard.triage +";"
            + attentionStyle);

    var upperContainer = card1.append("div").attr("style","width:100%; height:50%;");
    //Room nr
    var roomNr = upperContainer.append("p")
        .text(patientCard.room)
        .attr("style", "float:left; display:block; font-size: 150%; padding:5px; margin:0px; max-width:40%");

    //patient name
    var roomNrWidth = roomNr.node().getBoundingClientRect().width;
    var nameAndNumberStyle = "text-align:right; font-size:150%; min-width: 50%;"
        +"float:right; display: block;";

    upperContainer.append("p")
        .text(patientCard.name)
        .attr("style", nameAndNumberStyle
            + "margin: 5px 2px 0 0;");

    //patient number
    upperContainer.append("p")
        .text(patientCard.careNumber)
        .attr("style", nameAndNumberStyle
            +" margin: 2px 2px 0 0;"); //margin: top right bot left


    //info table: styles
    var rowStyle = "height:50%;";
    var borderStyle = " border-style: solid; border-width: 1px; border-color: gray; ";
    var cellStyle = "font-size: 130%; padding:1%; width:50%; background-color:rgba(255,255,255,0.5);" +borderStyle;

    //info table: draw table
    var cardTable = card1.append("table").attr("style", "width: 100%; height: 50%;");
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
    room_nr:number;
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
            case 'Blå':
                this.triage = triageStatus.blue;
                break;
            case 'Grön':
            case 'Green':
                this.triage = triageStatus.green;
                break;
            case 'Gul':
            case 'Yellow':
                this.triage = triageStatus.yellow;
                break;
            case 'Orange':
                this.triage = triageStatus.orange;
                break;
            case 'Röd':
            case 'Red':
                this.triage = triageStatus.red;
                break;
            default:
                console.log("ERROR: triage colour ");
                this.triage = "white";
        }
    }

    determineLocation(jsonLocation){
        this.room = jsonLocation;
        var letter = this.room.substr(0,1);
        var room_nr = parseInt( this.room.substr(1,3) );
        if(letter == "b" || letter == "B" ) {
            this.loc = Location.square;
            this.room_nr = room_nr;
        }else if(this.isNumeric(this.room)){
          this.room_nr = parseInt(this.room);
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

var card_holders = {
  leftCol: {
    19 : "B19",
    20 : "B20"
  },
  topRow : {
    21 : "B21",
    22 : "B22",
    23 : "B23",
    24 : "B24",
    25 : "B25"
  },
  rightCol:{
    26 : "B26",
    27 : "B27"
  }
}

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
