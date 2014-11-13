function genOptionName (obj) {
	// body...
	return obj.native_language.toUpperCase() + ", " +
	 obj.birth_place.toUpperCase() + ", " +
	 obj.gender[0].toUpperCase() + "("+obj.age+")";

};

$.getJSON("DATA/biography.json", function(result){
	console.log(result);
	var lang1 = $("#lang1");
	var lang2 = $("#lang2");
	$(lang1).find("option").remove();
	$(lang2).find("option").remove();
	$.each(result, function() {
		console.log(this.unique_id);
		lang1.append($("<option />").val(this.unique_id).text(genOptionName(this)));
		lang2.append($("<option />").val(this.unique_id).text(genOptionName(this)));
	});
	$(".chosen-select").chosen().change(function(e){
	console.log(e.target.value);
	curr_lang = e.target.value;
	console.log("Next Language is Created on Choosen", curr_lang);
	});
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
	init("./DATA/JSON/"+lang1+".json", "Native "+lang1.toUpperCase(),
		"./DATA/JSON/"+lang2+".json", "Native "+lang2.toUpperCase());
});