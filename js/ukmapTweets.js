var width = 900;
var height = 700;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g");

// Don't forget to change the data file name!
d3.json("data/uk.json", loadData);

function loadData(error, dataset) {
	if (error) {
		console.log(error);
	}
	else {
		//console.log(dataset);
		drawData(dataset);
	}
}

var mapProjection = d3.geo.albers()
	.center([0,55])
	.rotate([0,0])
	.scale([4000]);

function zoom(region) {
	var z = 3; // zoom factor
	console.log("Clicked on",region);
	graphics.attr("transform",
		"translate(" + width / 2 + "," + height /2 + ")" +
		" scale(" + z + ")" +
		" translate(" + (-width/2) + "," + (-height/2) + ")"
	);
}

function drawData(dataset) {
	var subunits = topojson.feature(dataset,
		dataset.objects.subunits).features;

	var geoPath = d3.geo.path()
		.projection(mapProjection)

	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	var color = d3.scale.ordinal()
		//.domain(["GBR","FRA","ITA","POL"])

		.range([
			"#c6dbef","#9ecae1","#6baed6","#4292c6",
		]);

	var temp = graphics.selectAll("path")
		.data(subunits)
		.enter()
		.append("path")
		.attr("d",geoPath)
		.style("fill",function(subunits){
			return color(subunits.id);
		});
	graphics.selectAll("path")
		.on("click",zoom);


}


function loadUserData(error,dataset) {
	if (error) {
		console.log(error);
	}
	else {
		drawUserData(dataset);

	}
}




function drawUserData(dataset) {
	for (var i = 0; i< dataset.nodes.length; i++){
		var user = dataset.nodes[i];
		var coordinate1 = user.tweets[0].geo.coordinates[1];
		var coordinate2  = user.tweets[0].geo.coordinates[0];
		var coords = [coordinate1, coordinate2];
		user.geo = coords;

	}

	//var london = [0.1275, 51.5072]
	//var coordinates = mapProjection(london)
	//console.log(coordinates);
    //
	//graphics.append("circle")
	//	.attr("cx",coordinates[0])
	//	.attr("cy",coordinates[1])
	//	.attr("r",5)

	graphics.selectAll(".tweet")
		.data(dataset.nodes)
		.enter()
		.append("circle")
		.attr("class","tweet")
		.attr("r",2.5)
		.style("fill","#800014")
		.attr("transform",mapUser);

	graphics.selectAll(".link")
		.data(dataset.links)
		.enter()
		.append("line")
		.attr("class","link")
		.style("stroke", "#999")
		.style("opacity",0.1)
		.attr("x1",function(link){
				return mapProjection(dataset.nodes[link.source].geo)[0];
		})
		.attr("y1",function(link){
			return mapProjection(dataset.nodes[link.source].geo)[1];
		})
		.attr("x2",function(link){
			return mapProjection(dataset.nodes[link.target].geo)[0];
		})
		.attr("y2",function(link){
			return mapProjection(dataset.nodes[link.target].geo)[1];
		});
}

function mapUser(user) {
	return "translate(" + mapProjection(user.geo) + ")";

}
d3.json("data/usersGraph.json", loadUserData)
