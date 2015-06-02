var body = d3.select("body");
var graphics = body.append("svg");

var width = 900;
var height = 600;

graphics.attr("width", width);
graphics.attr("height",height);


graphics.append("circle")
    .attr("r",190)
    .attr("cx",200)
    .attr("cy",200)
    .style("fill","#FFFF00")
    //.style("stroke","#CCCCCC")
    //.style("stroke-width","3px")
    //.style("opacity","0.5");

var eyebrow = new function() {
    d3.svg.arc()
        .innerradius(80)
        .innerRadius(80)
        .outerRadius(100)
        .startAngle(2)
        .endAngle(5);
}

var arc = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(100)
    .startAngle(2)
    .endAngle(5);

var arc2 = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(100)
    .startAngle(2)
    .endAngle(3);

graphics.append("path")
    .attr("d",arc2)
    .attr("transform","translate(120,170) rotate (210)");

var arc3 = d3.svg.arc()
    .innerRadius(80)
    .outerRadius(100)
    .startAngle(2)
    .endAngle(3);

graphics.append("path")
    .attr("d",arc3)
    .attr("transform","translate(260,170) rotate (220)");


graphics.append("path")
    .attr("d", arc)
    .attr("transform","translate(190,225) rotate(-20)");

graphics.append("circle")
    .attr("r",30)
    .attr("cx",120)
    .attr("cy",140);

graphics.append("circle")
    .attr("r",30)
    .attr("cx",260)
    .attr("cy",140);



//for (i=0; i<8;i++) {
//    var height = 30 + (i*3);
//    graphics.append("rect")
//        .attr("x", 40+(i*10))
//        .attr("y", 100 - height)
//        .attr("height", height)
//        .attr("width", 10)
//        .attr("fill","#000000");
//}



//graphics.append("line")
//    .attr("x1",100)
//    .attr("y2",50)
//    .attr("x2",180)
//    .attr("y2",10)
//    .attr("stroke","#000000")
//    .attr("stroke-width",2);
//
//graphics.append("text")
//    .text("i am drawing")
//    .attr("x",190)
//    .attr("y",30);