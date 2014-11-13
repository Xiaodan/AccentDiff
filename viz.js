var width = 1024;
var height = 400;

var layout = d3.select("body").append("svg");
	layout.attr("width", 1024)
		.attr("height", 400)
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
			.text(name+": "+cssClass);
		var offsetX = 100;
		if(x == null || y == null){
			/**
			* Use same x and y range for both waveforms.
			*/
			x = d3.scale.linear();
			y = d3.scale.linear();
			x.domain([0, 2000]).rangeRound([0, width]);
			y.domain([-d3.max(waveform.max), d3.max(waveform.max)]).rangeRound([offsetX, -offsetX]);

		}

		var bars = layout.append("g");
		var waveThreshold = 20;
		var barHeight = 50;
		var offsetY = (cssClass == "base") ? barHeight + 10: 10;
		var barArea = d3.svg.area()
		  .x(function(d, i){ return x(i); })
		  .y0(function(d, i){ return 0; })
		  .y1(function(d, i){ return (d>20) ? 50: 0; });

		bars.append("path")
			.datum(waveform.max)
			.attr("transform", function(){ 
				return "translate(0, "+(offsetY)+")";
			})
			.classed("area", true)
			.classed(cssClass, true)
			.attr("d", barArea);


		var graph = layout.append("g")
			//.attr("transform", function(){ return "translate(0, "+nextY+")"; });

		var area = d3.svg.area()
		  .x(function(d, i){ return x(i) })
		  .y0(function(d, i){ return y(waveform.min[i]) })
		  .y1(function(d, i){ return y(d) });

		graph.append("path")
		  .datum(waveform.max)
		  .attr("transform", function(){ return "translate(0, "+2.5*offsetX+")"; })
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