$(".chosen-select").chosen().change(function(e){
	console.log(e.target.value);
	curr_lang = e.target.value;
	console.log("Next Language is Created on Choosen", curr_lang);
});

$("#update").on("click", function (argument) {
	// body...
	var lang1 = $("#lang1").val();
	var lang2 = $("#lang2").val();
	x = null;
	y = null;
	console.log(lang1, lang2);
	$(".waveform")[0].innerHTML = "";
	$(".container").remove();
	drawWaveForm("./DATA/JSON/"+lang1+".json", "Native "+lang1.toUpperCase());
	drawWaveForm("./DATA/JSON/"+lang2+".json", "Native "+lang2.toUpperCase(), "base");
});