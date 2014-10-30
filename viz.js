var layout = d3.select("body").append("svg");
	layout.attr("width", 800)
		.attr("height", 250)
		.classed("waveform", true);

var x = null;
var y = null;

/*var layout = container
			.append("svg")
			.attr("width", 800)
			.attr("height", 300);*/

function drawWaveForm(datafile, name, cssClass){
	d3.json(datafile, function (error, data) {
	// body...
		var filename = datafile.replace(/^.*\/|\.[^.]*$/g, '');
		console.log(filename);

		if(cssClass === undefined){
			cssClass = "";
		}
		var waveform = WaveformData.create(data);
		console.log(waveform.duration);
		var container = d3.select("body")
			.append("div")
			.classed("container", true);
		container.append("h3")
			.classed("area", true)
			.classed(cssClass, true)
			.text(name+": "+cssClass)


		var graph = layout.append("g")
			//.attr("transform", function(){ return "translate(0, "+nextY+")"; });
		var offsetX = 100;
		if(x == null || y == null){
			/**
			* Use same x and y range for both waveforms.
			*/
			x = d3.scale.linear();
			y = d3.scale.linear();
			x.domain([0, 2000]).rangeRound([0, 1024]);
			y.domain([-d3.max(waveform.max), d3.max(waveform.max)]).rangeRound([offsetX, -offsetX]);

		}

		var area = d3.svg.area()
		  .x(function(d, i){ return x(i) })
		  .y0(function(d, i){ return y(waveform.min[i]) })
		  .y1(function(d, i){ return y(d) });


		graph.append("path")
		  .datum(waveform.max)
		  .attr("transform", function(){ return "translate(0, "+offsetX+")"; })
		  .classed("area", true)
		  .classed(cssClass, true)
		  .attr("d", area);
		var audioElm = container.append("audio")
			.attr("controls", "controls");
		audioElm.append("source")
			.attr("src", "./DATA/MP3/"+filename+".mp3");
	});
}

drawWaveForm("./DATA/JSON/tamil2.json", "Native Tamil");
drawWaveForm("./DATA/JSON/english2.json", "Native English", "base");