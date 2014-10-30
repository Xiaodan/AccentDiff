d3.json("DATA/JSON/tamil2.json", function (error, data) {
	// body...
	var waveform = WaveformData.create(data);
	wf = waveform;
	console.log(waveform.duration);
	var layout = d3.select("body").append("svg");
	layout.attr("width", 800)
		.attr("height", 600);
	var graph = layout.append("g");
	var x = d3.scale.linear();
	var y = d3.scale.linear();
	var offsetX = 100;

	x.domain([0, waveform.adapter.length]).rangeRound([0, 1024]);
	y.domain([d3.min(waveform.min), d3.max(waveform.max)]).rangeRound([offsetX, -offsetX]);

	var area = d3.svg.area()
	  .x(function(d, i){ return x(i) })
	  .y0(function(d, i){ return y(waveform.min[i]) })
	  .y1(function(d, i){ return y(d) });

	graph.append("path")
	  .datum(waveform.max)
	  .attr("transform", function(){ return "translate(0, "+offsetX+")"; })
	  .attr("class", "area")
	  .attr("d", area);
});