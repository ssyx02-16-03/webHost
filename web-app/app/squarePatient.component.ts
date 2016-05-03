/**
 * Created by oskar on 2016-04-04.
 */
import {Component, OnInit, ViewEncapsulation} from 'angular2/core';

import {SocketIO} from './socket-io';

@Component({
    selector: 'squareCards',
    template: `
      <div class="grid"></div>
      <div class="squarePatients"></div>
      <div class="waitingPatients"></div>
      <div class="otherPatients"></div>
    `,
    styleUrls: ['app/square_patient.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [SocketIO]
})


export class SquarePatients implements OnInit{
    ngOnInit(){
        var divs = styleCardHolders();

        //listen to data
        SocketIO.subscribe('blue_side_overview', function(data){
          console.log(data);
          console.log('test worked! SocketIO!');
          refreshCards(divs,data);
        });
        //for testing purposes
        refreshCards(divs,patients);
    }
}


var cardWidth = 20; //percentage of the whole bottom area, total of 5 columns
var waitDivWidth = 3/5*100;
var otherDivWidth = 100-waitDivWidth;
var waitCols = waitDivWidth/cardWidth;
var otherCols = otherDivWidth/cardWidth;

//print the base layout
function styleCardHolders(){
  var divs = [];
  divs['squareDiv'] = d3.select(".squarePatients");
          //+"width:" + cardWidth*5 +"px;"
          //+"height:" +cardHeight*3 +"px;"

  divs['waitingDiv'] = d3.select(".waitingPatients")
      .attr("style", ""
          +"width:" +waitDivWidth + "%;");
          //+"width: "+cardWidth*4 +"px;"
          //+"height:"+cardHeight*4 +"px;"

  divs['othersDiv'] = d3.select(".otherPatients")
      .attr("style", "width:" +otherDivWidth + "%;");
          //+"width: "+ cardWidth+"px;"
        //+"height:" +cardHeight*4 +"px;"

  return divs;
}

function paintGrid(rows:number,cells:number){
    var gridMap = new Array(rows);
    var grid = d3.select('.grid');
    grid.selectAll("*").remove(); //paint it all over again(not good);

    for(var r=0; r<rows; r++){
        var row = grid.append("div").attr("class","row").style("height",100/rows + "%");
        gridMap[r] = new Array(cells);
      for(var c=0; c< cells; c++){
        gridMap[r][c] = row.append("div").attr("class","cell").style("width",100/cells + "%");
      }
    }
    return gridMap;
}

//make things happen
function refreshCards(divs,data){
  var cards = updateCards(data);
  var grid = paintGrid(3,5);
  paintRoomCards(grid,cards[Location.square]);
  paintCardsLoop(divs.waitingDiv,waitCols,"Väntrum",cards[Location.innerWaitRoom]);
  paintCardsLoop(divs.othersDiv,otherCols,"Övriga",cards[Location.other]);
}

//instance each patient as as an object
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

function paintRoomCards(grid,roomCards){
  var sortedCards = [];
  for(var i=0; roomCards.length > 0; i++){
      var card = roomCards.pop();
      sortedCards[card.room_nr] = card;
  }

  var keys = Object.keys(card_holders);
  for(var i=0; i<keys.length; i++){
    var key = keys[i];
    var roomName = card_holders[key][2];
    var cell = card_holders[key][1];
    var row = card_holders[key][0];
    grid[row][cell].selectAll("*").remove(); //remove old stuff
    paintCardOrDummy(roomName, sortedCards[key], grid[row][cell],"");
  }

  function paintCardOrDummy(roomName:string, card:Card, parent, cardStyle:string){
      if(card == null){  paintDummyCard(roomName,parent,cardStyle);
      }else{  paintCard(card,parent,cardStyle);  }
  }
}

function paintCardsLoop(grandParent,nColumns:number,title:string,cards ){
  grandParent.selectAll("*").remove(); //remove old stuff

  var cardStyle = "height: 23%; width:" +100 +"%;";

  var maxCards = nColumns*4;
  var columns = [];

  for(var i=0; i<nColumns; i++){
    columns[i] = newUl(grandParent, 100/nColumns );
  }

  //print the cards, start with placeholder
  var parent = columns[0];
    parent.append("li")
      .attr('class','headCard')
      .attr("style", cardStyle)
      .text(title);

  for(var paintedCards = 1; cards.length>0 && paintedCards < maxCards; paintedCards++) {
      if(paintedCards %4 == 0){ //new col every 4th card
          parent = columns[paintedCards/4];
      }
      var patient = cards.pop();
      paintCard(patient,parent,cardStyle);
  }
  if(cards.length > 0){
      console.log("ERROR: paintOthers: more than there is room awaits!");
  }
}

//create a new listholder for cards
function newUl(gParent, width:number){
  var ulStyle = "width: " +width +"%; height: 100%;";
  var parent = gParent.append("ul")
      .attr("style", ulStyle)
      .attr("class", "cardList");
  return parent;
}


//paint a single card
function paintDummyCard(roomName:string,parent,cardStyle){
  var dummyCard = parent
      .append("li")
      .attr("class","patientCard dummy");

  //dummyCard.attr("style", cardStyle);
  var p = dummyCard.append("p").text(roomName).attr("style", "font-size:2em;");
}

function paintCard(patientCard:Card,parent,cardStyle) { //paint one card inside parent
  var card1 = parent.append("li")
      .attr("style", cardStyle)
      .attr("class","patientCard "+patientCard.triage);

  if(patientCard.needsAttention){
      card1.attr("class","patientCard attention " +patientCard.triage);
  }

  var upperContainer = card1.append("div").attr("style","width:100%; height:50%;");
  //Room nr
  var roomNr = upperContainer.append("p")
      .text(patientCard.room)
      .attr("style", "float:left; display:block; padding:5px; margin:0px; max-width:40%");

  //patient name and number
  upperContainer.append("p")
      .text(patientCard.name)
      .attr('class', 'nameAndNumber')
      .attr("style","margin: 5px 2px 0 0;");
  upperContainer.append("p")
      .text(patientCard.careNumber)
      .attr('class', 'nameAndNumber')
      .attr("style"," margin: 2px 2px 0 0;"); //margin: top right bot left

  //info table: styles
  var rowStyle = "height:50%;";
  var borderStyle = ""; //" border-style: solid; border-width: 1px; border-color: gray; ";
  var cellStyle = +borderStyle;

  //info table: draw table
  var cardTable = card1.append("table").attr("style", "width: 100%; height: 50%;");
  var tbody = cardTable.append("tbody");

  //info table: draw rows and cells
  var tr = tbody.append("tr").attr("style",rowStyle);
  var arrival = tr.append("td").attr("style",cellStyle).text(patientCard.arrivalTime);
  arrival.append("img").attr("class","arrivalClock");
  var careClock = tr.append("td").attr("style",cellStyle).text(patientCard.lastAttention +" min");
  careClock.append("img").attr("class","waitClock");
  tr = tbody.append("tr").attr("style",rowStyle);
  var lastEvent = tr.append("td").attr("style",cellStyle).text(patientCard.lastEvent);
  var status = tr.append("td").attr("style",cellStyle).text(patientCard.doctorName);
  if(patientCard.isDone){
    status.append("img").attr("class","done");
  }else if(patientCard.hasDoctor){
    status.append("img").attr("class","doctor");
  }

}

//not used atm
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
    isDone:boolean;
    hasDoctor:boolean;

    constructor(jsonObject){
        this.determineLocation(jsonObject['room']);
        this.determineTriage(jsonObject['Priority']);
        this.careNumber = JSON.stringify(jsonObject['id']);
        this.name = jsonObject['name'];
        this.arrivalTime = jsonObject['arrival_time_of_day'];
        this.needsAttention = jsonObject['last_event']['guidelines_exceeded'];
        this.lastAttention = jsonObject['last_event']['minutes_since'];
        this.lastEvent = jsonObject['last_event']['name'];
        this.determineDoctorOrDone(jsonObject['doctor_name']);
    }
    determineDoctorOrDone(jsonDoctorName){
      switch(jsonDoctorName){
          case 'klar':
          case 'Klar':
            this.doctorName = 'Klar';
            this.isDone = true;
            this.hasDoctor = false;
            break;
          case null:
            this.hasDoctor = false;
            this.isDone = false;
            break;
          default:
            this.doctorName = jsonDoctorName;
            this.hasDoctor = true;
            this.isDone = false;
      }
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
        var room_nr = parseInt( this.room.substr(1,3) );
        if(this.room == "Biv" || this.room == "Bvr"){
            this.loc = Location.innerWaitRoom;
        }else if(this.isNumeric(room_nr)) {
            this.room_nr = room_nr;
            this.loc = Location.square;
        } else {
            this.loc = Location.other;
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

/*
grid [row,col,roomString]
*/
var card_holders = {
    19:[2,0,"B19"],
    20:[1,0,"B20"],
    21:[0,0,"B21"],
    22:[0,1,"B22"],
    23:[0,2,"B23"],
    24:[0,3,"B24"],
    25:[0,4,"B25"],
    26:[1,4,"B26"],
    27:[2,4,"B27"]
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
            "room":"B27",
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
