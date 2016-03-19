/**
 * Created by edvard on 2016-03-18.
 */

import {Component, OnInit} from 'angular2/core';

import * as d3 from 'd3';

@Component({
    template: '<svg class="map"></svg>'
})

export class MapComponent implements OnInit {

    rooms = {
        'infection':[
            {'room': '1', 'occupied': true},
            {'room': '2', 'occupied': false},
            {'room': '3', 'occupied': true},
            {'room': '4', 'occupied': false}
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
        ]
    }


    ngOnInit() {

        this.draw(this.rooms);

    }

    draw(rooms) {

        console.log(rooms['infection']);
        console.log(rooms['bu'])

        // ful-satta onödigt stora för tillfället
        var svg = d3.select(".map")
            .attr("width", 1000)
            .attr("height", 500);


        var i: number = 0;

        var infectionRoomWidth = 80;
        var infectionRoomHeight = 50;

        var room1: Room = this.drawRoom(".map", 30, 30,
            infectionRoomWidth, infectionRoomHeight, "grey", rooms['infection'][i]);
        var lastlyDrawnRoom: Room = room1;

        while(i < rooms['infection'].length - 1) {
            i++;
            lastlyDrawnRoom = this.drawRoomNextToRoom(
                lastlyDrawnRoom, RelativePosition.SOUTH,
                infectionRoomWidth, infectionRoomHeight, "grey", rooms['infection'][i]);
        }

        var medRoomWidth = 60;
        var medRoomHeight = 60;
        var yellow = "yellow";

        var room12: Room = this.drawRoomRelativeToRoom(room1,
            200, 0, medRoomWidth, medRoomHeight, yellow, rooms['medicineYellow'][2]);
        var room11: Room = this.drawRoomNextToRoom(room12,
            RelativePosition.SOUTH, medRoomWidth, medRoomHeight, yellow, rooms['medicineYellow'][1]);
        var room10: Room = this.drawRoomNextToRoom(room11,
            RelativePosition.SOUTH, medRoomWidth, medRoomHeight, yellow, rooms['medicineYellow'][0]);

        var room13: Room = this.drawRoomNextToRoom(room12,
            RelativePosition.EAST, medRoomWidth, medRoomHeight / 2, yellow, rooms['medicineYellow'][3]);
        var room14: Room = this.drawRoomNextToRoom(room13,
            RelativePosition.EAST, medRoomWidth, medRoomHeight / 2, yellow, rooms['medicineYellow'][4]);
        var room15: Room = this.drawRoomNextToRoom(room14,
            RelativePosition.EAST, medRoomWidth, medRoomHeight / 2, yellow, rooms['medicineYellow'][5]);

        var room16: Room = this.drawRoomNextToRoom(room15,
            RelativePosition.EAST, medRoomWidth, medRoomHeight, yellow, rooms['medicineYellow'][6]);
        var room17: Room = this.drawRoomNextToRoom(room16,
            RelativePosition.SOUTH, medRoomWidth, medRoomHeight, yellow, rooms['medicineYellow'][7]);
        var room18: Room = this.drawRoomNextToRoom(room17,
            RelativePosition.SOUTH, medRoomWidth, medRoomHeight, yellow, rooms['medicineYellow'][8]);

    }

    drawRoom(htmlObject: string, x: number, y: number,
             width: number, height: number, color: string, jsonRoomObject) {
        return new Room(htmlObject, x, y, width, height, color, jsonRoomObject);
    }

    drawRoomNextToRoom(room: Room, relativePosition: RelativePosition,
                       width: number, height: number, color: string, jsonRoomObject) {
        var x: number;
        var y: number;

        switch(relativePosition) {
            case RelativePosition.NORTH:
                x = room.x;
                y = room.y - room.height;
                break;
            case RelativePosition.SOUTH:
                x = room.x;
                y = room.y + room.height;
                break;
            case RelativePosition.EAST:
                x = room.x + room.width;
                y = room.y;
                break;
            case RelativePosition.WEST:
                x = room.x - room.width;
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

    htmlObject: string;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(htmlObject: string, x: number, y: number,
                width: number, height: number, color: string, jsonRoomObject) {

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

        if(jsonRoomObject['occupied']) {

            svg.append("circle")
                .attr("cx", x + width / 2 - 15)
                .attr("cy", y + height / 2)
                .attr("r", 10)
                .attr("angle", 360)
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