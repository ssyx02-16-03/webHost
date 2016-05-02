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
      noDoc: 'no_doctor',
      hasDoc: 'has_doctor',
      doneDoc: 'klar',
      noTriage : 'untriaged'
    }

    public static color_hash_incoming = [
      ["inkommande", "#333333"]
    ];

    public static color_hash_status = [
        ["opåtittade", "#808080"],
        ["påtittade", "#C0C0C0"],
        ["klara", "#fbfbfb"]
    ];

    public static color_hash_triage = [
      ["blå", "#0040FF"],
      ["grön", "#5FCC00"],
      ["gul", "#FFFF00"],
      ["orange", "#FF8C00"],
      ["röd", "#FF0000"]
    ];

    public static color_hash_rooms = [
      ["rum", "#285078"],
      ["inre väntrum", "#328CA5"],
      ["undersökning", "#97D2C8"],
      ["annan plats", "#C3E6BE"]
    ];

    public static color_hash_noTriage = [
      ["ej triagerade", "#333333"]
    ];

    public static getMedLegend(){
      return this.color_hash_incoming.concat(this.color_hash_status,this.color_hash_rooms);
    }

    public static getCoordLegend(){
      return this.color_hash_incoming.concat(this.color_hash_status,this.color_hash_noTriage);
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

    static drawPile(dataArray:number[], parent, yAxis, chartHeight:number, barWidth:number, xCoord:number, color_hash:string[][]){
          var yCoord;
          var lastY = chartHeight;
          for(var i=0; i<dataArray.length; i++){
              var boxHeight = chartHeight-yAxis(dataArray[i]);
              yCoord = lastY-boxHeight;
              var lastBlock = new Block(parent, xCoord, yCoord, barWidth, boxHeight, color_hash[i][1], dataArray[i]);
              lastY = lastBlock.y;
          }
          return lastBlock;
      }
}
