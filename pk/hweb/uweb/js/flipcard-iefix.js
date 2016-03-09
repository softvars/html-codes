$(document).ready(function() {
	if(typeof flipcard != "undefined") {
		if(flipcard) {
			$(".cvc-code").off("focus", flipcard);
			$(".cvc-code").off("blur", flipcard);
		}
	}
	$(".cvc-code").on("focus blur", function(e) {
		if (e.type=="focus") {
			$(".card-plate.front", "#"+$(this).attr("data-target-id")).hide();
			$(".card-plate.back", "#"+$(this).attr("data-target-id")).show();
		} else {
			$(".card-plate.front", "#"+$(this).attr("data-target-id")).show();
			$(".card-plate.back", "#"+$(this).attr("data-target-id")).hide();
		}
	});
});