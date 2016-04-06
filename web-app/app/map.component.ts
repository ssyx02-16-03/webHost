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
 import {SocketIO} from './socket-io';
 import {room_table} from './map_room_table.ts';



@Component({
    selector: 'map',
    template: `
        <svg class="map"></svg>
        <div class="abra"></div>
        `, //used by room_table
    providers: [SocketIO]
})

export class MapComponent implements OnInit {
    
    rooms =
    {
        "infection":[
            {
                "patient_department":"default",
                "occupied":false,
                "room":"1"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"2"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"3"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"4"
            }
        ],
        "nowhere":[
            {
                "patient_department":"default",
                "occupied":true,
                "room":"noRoom"
            }
        ],
        "medicineYellow":[
            {
                "patient_department":"default",
                "occupied":false,
                "room":"10"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"11"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"12"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"13"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"14"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"15"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"16"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"17"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"18"
            }
        ],
        "medicineBlue":[
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"19"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"20"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"21"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"22"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"23"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"24"
            },
            {
                "patient_department":"medicineYellow",
                "occupied":true,
                "room":"25"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"26"
            },
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"27"
            }
        ],
        "ort_cast":[
            {
                "patient_department":"default",
                "occupied":true,
                "room":"47"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"47a"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"47b"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"48"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"48a"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"48b"
            }
        ],
        "surgery":[
            {
                "patient_department":"default",
                "occupied":true,
                "room":"50"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"51"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"52"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"53"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"54"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"55"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"56"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"57"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"58"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"59"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"60"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"61"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"62"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"63"
            }
        ],
        "triage":[
            {
                "patient_department":"default",
                "occupied":true,
                "room":"5"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"6"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"7"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"8"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"9"
            }
        ],
        "acute":[
            {
                "patient_department":"default",
                "occupied":false,
                "room":"A1"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"A2"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"A3"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"A4"
            }
        ],
        "jour":[
            {
                "patient_department":"default",
                "occupied":true,
                "room":"30"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"31"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"32"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"33"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"34"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"35"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"46"
            }
        ],
        "waiting":[
            {
                "patient_department":"medicineBlue",
                "occupied":true,
                "room":"ivr"
            }
        ],
        "orthoped":[
            {
                "patient_department":"default",
                "occupied":true,
                "room":"36"
            },
            {
                "patient_department":"default",
                "occupied":false,
                "room":"37"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"38"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"39"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"40"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"41"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"42"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"43"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"44"
            },
            {
                "patient_department":"default",
                "occupied":true,
                "room":"45"
            }
        ]
    };

    scale = 0.5;

    stdSpace = 25 * this.scale;
    stdRoomWidth = 60 * this.scale;
    stdRoomHeight = 60 * this.scale;

    ngOnInit() {
        this.draw(this.rooms);
        room_table.drawTable(this.rooms);
        //get data from webserver_com module
        SocketIO.connect('webserver_room_occupation');
        SocketIO.on('webserver_room_occupation', function(data){
            this.rooms = data['data']['rooms'];
            console.log(data);
            console.log('test worked! SocketIO!');
            this.draw(this.rooms);
            room_table.drawTable(this.rooms);
        });
    }

    draw(rooms) {

        var svg = d3.select(".map")
            .attr("width", 1200 * this.scale)
            .attr("height", 750 * this.scale);

        //----infection
        var infecRoomWidth = 80 * this.scale;
        var infecRoomHeight = 50 * this.scale;
        var room1: Room = this.drawRoom(".map", 30, 30,
            infecRoomWidth, infecRoomHeight, 'infection',0);
        var room4: Room = this.drawRoomRow(room1,
            RelativePosition.SOUTH, 0, infecRoomWidth, infecRoomHeight, 'infection', 1, RelativePosition.SOUTH, 3);

        //----triage
        var room9: Room = this.drawRoomRow(room1,
            RelativePosition.EAST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'triage', 0, RelativePosition.SOUTH, 5);

        //----medicine yellow
        var room12: Room = this.drawRoomNextToRoom(room1,
            RelativePosition.EAST, this.stdSpace*4, this.stdRoomWidth, this.stdRoomHeight, 'medicineYellow',2);
        var room10: Room = this.drawRoomRow(room12,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, 'medicineYellow', 1, RelativePosition.SOUTH, -2);
        var room15: Room = this.drawRoomRow(room12,
            RelativePosition.EAST, 0, this.stdRoomWidth, this.stdRoomHeight*0.75, 'medicineYellow', 3, RelativePosition.EAST, 3);
        var room16: Room = this.drawRoomNextToRoom(room15,
            RelativePosition.EAST, 0, this.stdRoomWidth, this.stdRoomHeight, 'medicineYellow',6);
        var room18: Room = this.drawRoomRow(room16,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, 'medicineYellow', 7, RelativePosition.SOUTH, 2);

        //----medicine blue
        var room20: Room = this.drawRoomRow(room18,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'medicineBlue',0, RelativePosition.SOUTH, 2);
        var room25: Room = this.drawRoomRow(room20,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'medicineBlue',2, RelativePosition.WEST, 5);
        var room27: Room = this.drawRoomRow(room25,
            RelativePosition.NORTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'medicineBlue',7, RelativePosition.NORTH, 2);

        //----jour
        var room34: Room = this.drawRoomNextToRoom(room16,
            RelativePosition.EAST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'jour',4);
        var room30: Room = this.drawRoomRow(room34,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, 'jour',3, RelativePosition.SOUTH, -4);
        var room35: Room = this.drawRoomNextToRoom(room34,
            RelativePosition.EAST, 0, this.stdRoomWidth, this.stdRoomHeight, 'jour',5);
        var room46: Room = this.drawRoomNextToRoom(room30,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'jour',6);

        //---ort
        var room38: Room = this.drawRoomRow(room35,
            RelativePosition.EAST, this.stdSpace*2, this.stdRoomWidth, this.stdRoomHeight, 'orthoped',0,RelativePosition.EAST,3);
        var room43: Room = this.drawRoomRow(room38,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'orthoped',3, RelativePosition.SOUTH,5);
        var room45: Room = this.drawRoomRow(room43,
            RelativePosition.WEST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'orthoped',8, RelativePosition.WEST,2);

        //----ort_cast
        var room47B: Room = this.drawRoomRow(room38,
            RelativePosition.EAST, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'ort_cast',1,RelativePosition.SOUTH,2);
        var room48B: Room = this.drawRoomRow(room47B,
            RelativePosition.SOUTH, 0, this.stdRoomWidth, this.stdRoomHeight, 'ort_cast',4, RelativePosition.SOUTH,2);

        //surgery
        var room58: Room = this.drawRoomNextToRoom(room43,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight, 'surgery',8);
        var room54: Room = this.drawRoomRow(room58,
            RelativePosition.WEST, 0, this.stdRoomWidth, this.stdRoomHeight, 'surgery',7, RelativePosition.WEST,-4);
        var room63: Room = this.drawRoomRow(room58,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight*0.75, 'surgery',10, RelativePosition.SOUTH,4);
        var room50: Room = this.drawRoomRow(room54,
            RelativePosition.SOUTH, this.stdSpace, this.stdRoomWidth, this.stdRoomHeight*0.75,'surgery',3, RelativePosition.SOUTH,-4);
        var room59: Room = this.drawRoomRelativeToRoom(room58,
            this.stdRoomWidth+this.stdSpace, -this.stdSpace, this.stdRoomWidth,this.stdRoomHeight, 'surgery',9);

        //acute
        var roomA4: Room = this.drawRoomRelativeToRoom(room25,
            0, this.stdSpace*4, this.stdRoomWidth,this.stdRoomHeight, 'acute',3);
        var roomA1: Room = this.drawRoomRow(roomA4,
            RelativePosition.EAST, 0, this.stdRoomWidth*1.5, this.stdRoomHeight*1.25, 'acute',2, RelativePosition.EAST,-3);

    }

    drawRoom(htmlObject: string, x: number, y: number,
             width: number, height: number, roomDep:string, roomNum:number) {
        return new Room(htmlObject, x, y, width, height, roomDep, this.rooms[roomDep][roomNum]);
    }

    drawRoomRow(relativeRoom: Room, relPos: RelativePosition, relFirstSpace: number,
                    roomWidth: number, roomHeight: number, roomDep: string, roomNum: number,
                    rowDirection: RelativePosition, numOfRooms: number){

        var inc: number = 1;
        if(numOfRooms < 0){ //go negative?
            numOfRooms = Math.abs(numOfRooms);
            inc = -1;
        }
        var space: number = relFirstSpace;
        for(var i:number = 0; i< numOfRooms; i++){
            relativeRoom = this.drawRoomNextToRoom(relativeRoom,
                relPos, space, roomWidth, roomHeight, roomDep, roomNum+i*inc);
            if(i == 0){
                space = 0;
                relPos= rowDirection;
            }
        }
        return relativeRoom;
    }

    drawRoomNextToRoom(room: Room, relativePosition: RelativePosition, relativeSpace: number,
                       width: number, height: number, roomDep:string, roomNum:number) {
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

        return this.drawRoom(room.htmlObject, x, y, width, height, roomDep, roomNum);
    }

    drawRoomRelativeToRoom(room: Room, relativeX: number, relativeY: number,
                           width: number, height: number, roomDep:string, roomNum:number) {

        return this.drawRoom(room.htmlObject, room.x + relativeX, room.y + relativeY,
            width, height, roomDep, roomNum);

    }
}

class Room{
    htmlObject:string;
    x:number;
    y:number;
    width:number;
    height:number;
    occupied:boolean;

    constructor(htmlObject:string, x:number, y:number,
                width:number, height:number, roomDep:string, jsonRoomObject) {
        this.htmlObject = htmlObject;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.occupied = jsonRoomObject['occupied'];

        var color = "black";

        //color formatting
        if (this.occupied && jsonRoomObject['patient_department'] != "default"){
            if(jsonRoomObject['patient_department'] == "medicineBlue"){
                color = roomColors.medBlu;
            }else if(jsonRoomObject['patient_department'] == "medicineYellow"){
                color = roomColors.medYel;
            }
        }else{
            switch(roomDep){
                case 'acute':
                    color = roomColors.acute;
                    break;
                case 'infection':
                    color = roomColors.infec;
                    break;
                case 'jour':
                    color = roomColors.jour;
                    break;
                case 'medicineBlue':
                    color = roomColors.medBlu;
                    break;
                case 'medicineYellow':
                    color = roomColors.medYel;
                    break;
                case 'ort_cast':
                case 'orthoped':
                    color = roomColors.ort;
                    break;
                case 'surgery':
                    color = roomColors.surg;
                    break;
                case 'triage':
                    color = roomColors.triage;
                    break;
            }
        }

        var svg = d3.select(htmlObject).append("svg");

        var rect = svg.append("rect")
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

        if (this.occupied) {
            svg.append("circle")
                .attr("cx", x + width / 2 - 15)
                .attr("cy", y + height / 2)
                .attr("r", 4)
                .attr("angle", 360)
                .attr("stroke-width", 1)
                .attr("stroke", "white")
                .style("fill", "red");

            rect.style("opacity", 0.8);
        }
    }
}

 enum RelativePosition {
     NORTH,
     SOUTH,
     EAST,
     WEST
 }

 var roomColors = {
     infec:"gray",
     medYel:"yellow",
     medBlu:"blue",
     triage:"gray",
     jour:"purple",
     ort:"green",
     surg:"red",
     acute:"gray"
 };
