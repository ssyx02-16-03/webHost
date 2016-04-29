

export class Barchart{
    private static color_hash_default = [
        ["inkommande", "black"],
        ["opåtittade", "#808080"],
        ["påtittade", "#C0C0C0"],
        ["klara", "#fbfbfb"],
        ["röd", "#FF0000"],
        ["orange", "#FF8C00"],
        ["gul", "#FFFF00"],
        ["grön", "#5FCC00"],
        ["blå", "#0040FF"],
    ];

    private static color_hash_rooms = [
      ["annan plats", "#c9e1ec"],
      ["undersökning", "#9fc7d3"],
      ["inre väntrum", "#6ca1bc"],
      ["rum", "#34749d"]
    ];

    private static color_hash_noTriage = [["ej triagerade", "#333333"]];

    public static getMedColors(){
      var array = this.color_hash_default.concat(this.color_hash_rooms);
      //console.log(array);
      return array;
    }

    public static getCoordColors(){
      var array = this.color_hash_default.concat(this.color_hash_noTriage);
      return array;
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
      //console.log(this);
      if(this.svgBlock){
         this.svgBlock.style("fill", "none")
             .style("stroke", color)
             .style("stroke-dasharray", ("2, 2"))
             .style("stroke-width", "1.75px");
        }
      }

    static drawPile(dataArray:number[], parent, yAxis, chartHeight:number, barWidth:number, xCoord:number, colorOffset:number, color_hash){
          var yCoord = yAxis(dataArray[dataArray.length-1]);
          var lastY = chartHeight;
          for(var i=dataArray.length-1; i >= 0; i--){
              var boxHeight = chartHeight-yAxis(dataArray[i]);
              yCoord = lastY-boxHeight;
              Block lastBlock = new Block(parent, xCoord, yCoord, barWidth, boxHeight, color_hash[i+colorOffset][1], dataArray[i]);
              lastY = lastBlock.y;
          }
          return lastBlock;
      }
  }
}
