/*
*  Oskar
*/

export class Barchart{

    public static jsonKeys = {
      red: 'red',
      orange: 'orange',
      yellow: 'yellow',
      green: 'green',
      blue: 'blue',
      incoming : 'incoming',
      doneDoc: 'klar',
      hasDoc: 'has_doctor',
      noDoc: 'no_doctor',
      noTriage : 'untriaged',
      innerWaiting : 'inner_waiting_room',
      atExam : 'at_examination',
      roomsHere : 'rooms_here',
      roomsElse : 'rooms_elsewhere'
    }

    public static color_hash = {
        doneDoc: ["Klara", "#fbfbfb"],
        hasDoc: ["Påtittade", "#C0C0C0"],
        noDoc:  ["Opåtittade", "#808080"],
        blue: ["Blå", "#0040FF"],
        green: ["Grön", "#5FCC00"],
        yellow: ["Gul", "#FFFF00"],
        orange: ["Orange", "#FF8C00"],
        red: ["Röd", "#FF0000"],
        roomsHere: ["I rum här", "#285078"],
        innerWaiting: ["Inre väntrum", "#328CA5"],
        atExam: ["På Undersökning", "#97D2C8"],// we do not actually support this at the moment
        roomsElse: ["Annan plats", "#C3E6BE"],
        noTriage: ["Ej triage", "#333333"],
        incoming: ["Ej triagefärg", "#333333"]
    };


    public static getMedLegend(){
      var legendKeys = [];
      legendKeys = this.getCoordLegend();
      legendKeys.push(["","none"]);
      legendKeys.push(this.color_hash['roomsElse']);
      legendKeys.push(this.color_hash['atExam']);
      legendKeys.push(this.color_hash['innerWaiting']);
      legendKeys.push(this.color_hash['roomsHere']);
      return legendKeys;
    }

    public static getCoordLegend(){
      var legendKeys = [];
      legendKeys.push(this.color_hash['incoming']);
      legendKeys.push(["","none"]);
      legendKeys.push(this.color_hash['doneDoc']);
      legendKeys.push(this.color_hash['hasDoc']);
      legendKeys.push(this.color_hash['noDoc']);
      return legendKeys;
    }

    public static svgStroke(svg,color){
      if(svg){
         svg.style("fill", "none")
             .style("stroke", color)
             .style("stroke-dasharray", ("2, 2"))
             .style("stroke-width", "1.75px");
        }
    }
}

export class Block{
    parent; //parent Div
    x:number;
    y:number;
    width:number;
    height:number;
    fontSize:number;
    color:string;
    nOfPatients:number;

    fontColor:string;
    svgBlock;
    svgText;

    constructor(parent,x,y, width:number,height:number,color:string, nOfPatients:number){
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.fontSize = 15;
        this.color = color;
        this.nOfPatients = nOfPatients;
        this.fontColor = "black";

        if(this.color ==  this.fontColor){
          this.fontColor = "white";
        }
        //console.log(this);
        if(nOfPatients > 0){
          this.svgBlock = this.paintBlock(parent,x,y,width,height,color);
          this.svgText = this.paintText(parent,x,y,this.fontColor,this.fontSize,nOfPatients);
        }
        return this;
    }

    paintBlock(parent,x:number,y:number,width:number,height:number,color:string){
      var block = parent.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height)
          .attr("fill", color);
      return block;
    }

    paintText(parent,x,y,fontColor,fontSize,text){
      var textField = parent.append("text")
          .attr("x", x)
          .attr("y", y + fontSize)
          .attr("font-size", fontSize)
          .attr("fill", fontColor)
          .attr("dx", ".5em")
          .text(text);
      return textField;
    }

    setFontColor(fontColor:string){
      if(this.svgText){
        this.svgText.attr("fill",fontColor);
      }
    }

    stroke(color:string){
      Barchart.svgStroke(this.svgBlock,color);
    }

    static drawPile(jsonData, keyArray, parent, yAxis, chartHeight:number, barWidth:number, xCoord:number){
          var yCoord;
          var lastY = chartHeight;
          for(var i=0; i<keyArray.length; i++){
              var data = jsonData[Barchart.jsonKeys[keyArray[i]]];
              var boxHeight = chartHeight-yAxis(data);
              yCoord = lastY-boxHeight;
              var lastBlock = new Block(parent, xCoord, yCoord, barWidth, boxHeight, Barchart.color_hash[keyArray[i]][1], data);
              lastY = lastBlock.y;
          }
          return lastBlock;
      }
}
