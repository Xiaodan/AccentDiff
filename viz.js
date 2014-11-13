var width = 1024;
var height = 300;
var margin_x = 50;
var margin_y = 50;

var layout = d3.select("body").append("svg");
	layout.attr("width", width+2*margin_x)
		.attr("height", height+2*margin_y)
		.classed("waveform", true);

var x = null;
var y = null;

var xAxis = null;
var offsetX = 100;

function init (lang1_datafile, lang1_name, lang2_datafile, lang2_name) {
	// body...
	var data1 = null;
	var data2 = null;
	d3.json(lang1_datafile, function (error1, t_data1) {
		data1 = WaveformData.create(t_data1);
		d3.json(lang2_datafile, function (error2, t_data2) {
			data2 = WaveformData.create(t_data2);

			var x_max = Math.max(data1.offset_length, data2.offset_length);
			var y_max = Math.max(d3.max(data1.max), d3.max(data2.max));
			x = d3.scale.linear();
			y = d3.scale.linear();
			x.domain([0, x_max])
				.rangeRound([0, width]);
			y.domain([-y_max, y_max])
				.rangeRound([offsetX, -offsetX]);
			xAxis = d3.svg.axis().scale(x).orient("top");
			layout.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate("+margin_x+"," + margin_y + ")")
		    .call(xAxis);
		    layout.append("text")      // text label for the x axis
		        .attr("x", margin_x+(width/2.0) )
		        .attr("y",  20)
		        .style("text-anchor", "middle")
		        .text("Time (milliseconds)");
		    console.log("Drawing axis");

			drawWaveForm(data1, lang1_datafile, lang1_name);
			drawWaveForm(data2, lang2_datafile, lang2_name, "base");
		});

	});
}

function drawWaveForm(waveform, datafile, name, cssClass){
	var filename = datafile.replace(/^.*\/|\.[^.]*$/g, '');
	console.log(filename);

	if(cssClass === undefined){
		cssClass = "";
	}
	console.log(waveform.duration);
	console.log(waveform);
	var container = d3.select("body")
		.append("div")
		.classed("container", true);
	container.append("h3")
		.classed("area", true)
		.classed(cssClass, true)
		.text(name+": "+cssClass);

	var barHeight = 50;
	var offsetY = (cssClass == "base") ? barHeight + margin_y: margin_y;
	var bars = layout.append("g")
		.attr("transform", function(){ 
			return "translate("+margin_x+", "+(offsetY)+")";
		});
	var waveThreshold = 0.2*(d3.max(waveform.max) - d3.min(waveform.max));
	console.log("waveThreshold", waveThreshold, 
		d3.max(waveform.max), d3.min(waveform.max));
	var barArea = d3.svg.area()
	  .x(function(d, i){ return x(i); })
	  .y0(function(d, i){ return 0; })
	  .y1(function(d, i){ return (d>waveThreshold) ? barHeight: 0; });

	bars.append("path")
		.datum(waveform.max)
		.classed("area", true)
		.classed(cssClass, true)
		.attr("d", barArea);
	//bars.call(xAxis);

	var posWaveY = 1.5*offsetX + barHeight*2 + margin_y;
	var graph = layout.append("g")
		.attr("transform", function(){ 
	  		return "translate("+margin_x+", "+posWaveY+")"; 
	  	});
		//.attr("transform", function(){ return "translate(0, "+nextY+")"; });

	var area = d3.svg.area()
	  .x(function(d, i){ return x(i) })
	  .y0(function(d, i){ return y(waveform.min[i]) })
	  .y1(function(d, i){ return y(d) });

	graph.append("path")
	  .datum(waveform.max)
	  .classed("area", true)
	  .classed(cssClass, true)
	  .attr("d", area);


	
	var audioElm = container.append("audio")
		.attr("controls", "controls");
	audioElm.append("source")
		.attr("src", "./DATA/MP3/"+filename+".mp3");
		
}

init("./DATA/JSON/tamil2.json", "Native Tamil",
	"./DATA/JSON/english2.json", "Native English");