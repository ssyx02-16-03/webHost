 /**
 * Created by edvard on 2016-03-18.
  *
  *
  * idé: gör alla rum till var sitt objekt innan man ritar upp dem?
  * lägg alla i var sin array, därefter kan allt accessas via en hashmap?
  * ha alla i en hashmap typ, get('infection') ger en lista med alla de rummen
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    template: '<svg class="map"></svg>'
})

export class MapComponent implements OnInit {


    rooms = {
        'infection': [
            {'room': '1', 'occupied': true},
            {'room': '2', 'occupied': false},
            {'room': '3', 'occupied': true},
            {'room': '4', 'occupied': false}
        ],
        'triage': [
            {'room': '6', 'occupied': true},
            {'room': '7', 'occupied': false},
            {'room': '8', 'occupied': true},
            {'room': '9', 'occupied': false}
        ],
        'medicineYellow': [
            {'room': '10', 'occupied': true},
            {'room': '11', 'occupied': true},
            {'room': '12', 'occupied': true},
            {'room': '13', 'occupied': true},
            {'room': '14', 'occupied': true},
            {'room': '15', 'occupied': true},
            {'room': '16', 'occupied': false},
            {'room': '17', 'occupied': false},
            {'room': '18', 'occupied': false}
        ],
        'medicineBlue': [
            {'room': '19', 'occupied': true},
            {'room': '20', 'occupied': false},
            {'room': '21', 'occupied': true},
            {'room': '22', 'occupied': false},
            {'room': '23', 'occupied': false},
            {'room': '24', 'occupied': true},
            {'room': '25', 'occupied': true},
            {'room': '26', 'occupied': true},
            {'room': '27', 'occupied': true}
        ],
        'jour' : [
            {'room': '30', 'occupied': false},
            {'room': '31', 'occupied': false},
            {'room': '32', 'occupied': true},
            {'room': '33', 'occupied': false},
            {'room': '34', 'occupied': false},
            {'room': '35', 'occupied': false},
            {'room': '46', 'occupied': false}
        ],
        'orthoped':[
            {'room': '36', 'occupied': false},
            {'room': '37', 'occupied': false},
            {'room': '38', 'occupied': true},
            {'room': '39', 'occupied': false},
            {'room': '40', 'occupied': false},
            {'room': '41', 'occupied': false},
            {'room': '42', 'occupied': false},
            {'room': '43', 'occupied': false},
            {'room': '44', 'occupied': false},
            {'room': '45', 'occupied': false}
        ],
        'ort_cast':[
            {'room': '47A', 'occupied': false},
            {'room': '47B', 'occupied': false},
            {'room': '48A', 'occupied': true},
            {'room': '48B', 'occupied': false}
        ],
        'surgery':[
            {'room': '50', 'occupied': false},
            {'room': '51', 'occupied': false},
            {'room': '52', 'occupied': true},
            {'room': '53', 'occupied': false},
            {'room': '54', 'occupied': false},
            {'room': '55', 'occupied': false},
            {'room': '56', 'occupied': false},
            {'room': '57', 'occupied': false},
            {'room': '58', 'occupied': false},
            {'room': '59', 'occupied': false},
            {'room': '60', 'occupied': false},
            {'room': '61', 'occupied': false},
            {'room': '62', 'occupied': false},
            {'room': '63', 'occupied': false}
        ],
        'acute':[
            {'room': 'A1', 'occupied': false},
            {'room': 'A2', 'occupied': false},
            {'room': 'A3', 'occupied': true},
            {'room': 'A4', 'occupied': false}
        ]
    }

    stdSpace = 25;
    stdRoomWidth = 60;
    stdRoomHeight = 60;

    color_infec = "gray";
    color_medYel = "yellow";
    color_medBlu = "blue";
    color_triage = "gray";
    color_jour = "purple";
    color_ort = "green";
    color_surg = "red";
    color_acute = "gray";

    ngOnInit() {
        this.draw(this.rooms);
    }

    draw(rooms) {

        console.log(rooms['infection']);
        console.log(rooms['bu']);

        // ful-satta onödigt stora för tillfället
        var svg = d3.select(".map")
            .attr("width", 1200)
            .attr("height", 750);

        //----infection
        var infecRoomWidth = 80;
        var infecRoomHeight = 50;
        var color = this.color_infec;
        var room1: Room = this.drawRoom(".map", 30, 30,
            infecRoomWidth, infecRoomHeight, "grey", rooms['infection'][0]);
        var room4: Room = this.drawRoomRow(room1,
            RelativePosition.SOUTH, 0, infecRoomWidth, infecRoomHeight, color, 'infection', 1, RelativePosition.SOUTH, 3);

        //----triage
        var room9: Room = this.drawRoomRow(room1,
            RelativePosition.EAST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'triage', 0, RelativePosition.SOUTH, 4);

        //----medicine yellow
        color = this.color_medYel;
        var room12: Room = this.drawRoomNextToRoom(room1,
            RelativePosition.EAST, this.stdSpace*4, this.stdRoomWidth, this.stdRoomHeight, color, rooms['medicineYellow'][2]);
        var room10: Room = this.drawRoomRow(room12,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, color, 'medicineYellow', 1, RelativePosition.SOUTH, -2);
        var room15: Room = this.drawRoomRow(room12,
            RelativePosition.EAST, 0, this.stdRoomWidth, this.stdRoomHeight*0.75, color, 'medicineYellow', 3, RelativePosition.EAST, 3);
        var room16: Room = this.drawRoomNextToRoom(room15,
            RelativePosition.EAST, 0, this.stdRoomWidth, this.stdRoomHeight, color, rooms['medicineYellow'][6]);
        var room18: Room = this.drawRoomRow(room16,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, color, 'medicineYellow', 7, RelativePosition.SOUTH, 2);

        //----medicine blue
        color = this.color_medBlu;
        var room20: Room = this.drawRoomRow(room18,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'medicineBlue',0, RelativePosition.SOUTH, 2);
        var room25: Room = this.drawRoomRow(room20,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'medicineBlue',2, RelativePosition.WEST, 5);
        var room27: Room = this.drawRoomRow(room25,
            RelativePosition.NORTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'medicineBlue',7, RelativePosition.NORTH, 2);

        //----jour
        color = this.color_jour;
        var room34: Room = this.drawRoomNextToRoom(room16,
            RelativePosition.EAST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, rooms['jour'][4]);
        var room30: Room = this.drawRoomRow(room34,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, color, 'jour',3, RelativePosition.SOUTH, -4);
        var room35: Room = this.drawRoomNextToRoom(room34,
            RelativePosition.EAST, 0, this.stdRoomWidth, this.stdRoomHeight, color, rooms['jour'][5]);
        var room46: Room = this.drawRoomNextToRoom(room30,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, this.color_jour, rooms['jour'][6]);

        //---ort
        color = this.color_ort = "green";
        var room38: Room = this.drawRoomRow(room35,
            RelativePosition.EAST, this.stdSpace*2, this.stdRoomWidth, this.stdRoomHeight, color, 'orthoped',0,RelativePosition.EAST,3);
        var room43: Room = this.drawRoomRow(room38,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'orthoped',3, RelativePosition.SOUTH,5);
        var room45: Room = this.drawRoomRow(room43,
            RelativePosition.WEST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'orthoped',8, RelativePosition.WEST,2);

        //----ort_cast
        var room47A: Room = this.drawRoomRow(room38,
            RelativePosition.EAST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, 'ort_cast',0,RelativePosition.SOUTH,4);

        //surgery
        color = this.color_surg;
        var room58: Room = this.drawRoomNextToRoom(room43,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, color, rooms['surgery'][8]);
        var room54: Room = this.drawRoomRow(room58,
            RelativePosition.WEST, 0, this.stdRoomWidth, this.stdRoomHeight, color, 'surgery',7, RelativePosition.WEST,-4);
        var room63: Room = this.drawRoomRow(room58,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight*0.75, color, 'surgery',10, RelativePosition.SOUTH,4);
        var room50: Room = this.drawRoomRow(room54,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight*0.75, color, 'surgery',3, RelativePosition.SOUTH,-4);
        var room59: Room = this.drawRoomRelativeToRoom(room58,
            this.stdRoomWidth+this.stdSpace, -this.stdSpace, this.stdRoomWidth,this.stdRoomHeight, color,rooms['surgery'][9]);

        //acute
        color = this.color_acute;
        var roomA4: Room = this.drawRoomRelativeToRoom(room25,
            0, this.stdSpace*4, this.stdRoomWidth,this.stdRoomHeight, color,rooms['acute'][3]);
        var roomA1: Room = this.drawRoomRow(roomA4,
            RelativePosition.EAST, 0, this.stdRoomWidth*1.5, this.stdRoomHeight*1.25, color, 'acute',2, RelativePosition.EAST,-3);

    }

    drawRoomRow(relativeRoom: Room, relPos: RelativePosition, relFirstSpace: number,
                    roomWidth: number, roomHeight: number, color: string, roomName: string, roomNum: number,
                    rowDirection: RelativePosition, numOfRooms: number){

        var inc: number = 1;
        if(numOfRooms < 0){ //go negative?
            numOfRooms = Math.abs(numOfRooms);
            inc = -1;
        }
        var space: number = relFirstSpace;
        for(var i:number = 0; i< numOfRooms; i++){
            relativeRoom = this.drawRoomNextToRoom(relativeRoom,
                relPos, space, roomWidth, roomHeight, color, this.rooms[roomName][roomNum+i*inc]);
            if(i == 0){
                space = 0;
                relPos= rowDirection;
            }
        }
        return relativeRoom;
    }

    drawRoom(htmlObject: string, x: number, y: number,
             width: number, height: number, color: string, jsonRoomObject) {
        return new Room(htmlObject, x, y, width, height, color, jsonRoomObject);
    }

    drawRoomNextToRoom(room: Room, relativePosition: RelativePosition, relativeSpace: number,
                       width: number, height: number, color: string, jsonRoomObject) {
        var x: number;
        var y: number;

        switch(relativePosition) {
            case RelativePosition.NORTH:
                x = room.x;
                y = room.y - room.height -relativeSpace;
                break;
            case RelativePosition.SOUTH:
                x = room.x;
                y = room.y + room.height +relativeSpace;
                break;
            case RelativePosition.EAST:
                x = room.x + room.width +relativeSpace;
                y = room.y;
                break;
            case RelativePosition.WEST:
                x = room.x - room.width -relativeSpace;
                y = room.y;
                break;
        }

        return this.drawRoom(room.htmlObject, x, y, width, height, color, jsonRoomObject);
    }

    drawRoomRelativeToRoom(room: Room, relativeX: number, relativeY: number,
                           width: number, height: number, color: string, jsonRoomObject) {

        return this.drawRoom(room.htmlObject, room.x + relativeX, room.y + relativeY,
            width, height, color, jsonRoomObject);

    }
}

class Room {
    htmlObject:string;
    x:number;
    y:number;
    width:number;
    height:number;

    constructor(htmlObject:string, x:number, y:number,
                width:number, height:number, color:string, jsonRoomObject) {

        this.htmlObject = htmlObject;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        var svg = d3.select(htmlObject).append("svg");

        svg.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .style("fill", color);

        svg.append("text")
            .attr("x", x + width / 2)
            .attr("y", y + height / 2)
            .attr("dy", ".35em")
            .text(jsonRoomObject['room']);

        if (jsonRoomObject['occupied']) {

            svg.append("circle")
                .attr("cx", x + width / 2 - 15)
                .attr("cy", y + height / 2)
                .attr("r", 10)
                .attr("angle", 360)
                .attr("stroke-width", 1)
                .attr("stroke", "white")
                .style("fill", "red");
        }
    }
}

 enum RelativePosition {
     NORTH,
     SOUTH,
     EAST,
     WEST
 }
