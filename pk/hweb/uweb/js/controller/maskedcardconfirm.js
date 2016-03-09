var MaskedCardController = function() {
	 BaseController.call(this);
	 this.maskedCards = null;
	 this.getMaskedCardsUrl = "/upweb/card/maskedcardvalues";
	 this.validateMaskedPanUrl = "/upweb/card/validatemaskedpan";
	 this.initRegistrationUrl = "/upweb/register/initUpMobileUserRegistration";
	 this.homePageUrl = "/upweb/register/initRegistration";
	 this.homePageText = "Home";
	 this.retryCount = 3;
};

MaskedCardController.prototype = Object.create(BaseController.prototype);
MaskedCardController.prototype.constructor = MaskedCardController;
MaskedCardController.prototype.methodPost = "POST";


MaskedCardController.prototype.validateMaskedPan = function() {
	var thisObj = this;
	var isNotifyOnFailure = thisObj.retryCount === 1 ? false : true;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnError : isNotifyOnFailure});
	var $form = $("#confirm-maskedpan-form");
	var json = serializeObject('#confirm-maskedpan-form');
	var selected = $( "#card-alias option:selected" ).val();
	json.maskedPan = thisObj.maskedCards[selected].maskedPan;
	json = JSON.stringify(json);
	var request_done = function(responseData) {
		up_common.loadPageWithUrl(thisObj.initRegistrationUrl);
	};
	var request_fail =  function(responseData){
		thisObj.retryCount = responseData.data.retryCount;
	};
	var config = {
		url : thisObj.validateMaskedPanUrl,
		contentType : UPWEB.JSON,
		data : json,
		type : thisObj.methodPost
    },
    app_config = {
		name :  UP_Qualifiers.validateMaskedPan,
        scope:  thisObj, 
        done:   request_done,
        fail: request_fail,
        form:   $form, 
        alert:  alertObj
    };
	var request = _.ajax(config, app_config);
	request.done(function(responseData) {
		if(("UPWE-0016" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode) || ("UPWE-0024" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode)) {
			responseData.data.retryCount ? $('.bottom-text span').html(responseData.data.retryCount) : $('.bottom-text span').html("0");
			$('.bottom-text.chances-left').removeClass("hide_it");
			if(responseData.data.retryCount === 0) {
				var _renderNotify = function(){
					thisObj.renderNotifyPage(responseData.description, responseData.url, thisObj.homePageText);
		        };
				pageUnload.invalidateSession(_renderNotify);
			}
		}
	});
};

MaskedCardController.prototype.populateSelectedCard = function() {
	var thisObj = this;
	var maskedValues = thisObj.maskedCards;
	var selected = $( "#card-alias option:selected" ).val();
	var selectedCard = maskedValues[selected];
	$(".type .card-type").addClass(selectedCard.circuitName.toLowerCase());
	var array = thisObj.splitStringAtInterval(selectedCard.maskedPan, 4);
	$(".middle").html("<div class='card-code'>"+array[0]+"</div> <div class='card-code'>"+array[1]+
			"</div> <div class='card-code'>"+array[2]+"</div><div class='card-code'>"+array[3]+"</div>");
	var indices = [];
	var maskedPan = selectedCard.maskedPan;
	var j = 0;
	for(var i=0; i<maskedPan.length;i++) {
		j = i;
	    if (maskedPan[i] === "_") indices.push(j + 1);
	}
	$(".col-xs-12 label").html("Inserisci la cifra n° "+indices[0]+", n° "+indices[1]+", n° "+indices[2]+" e n° "+indices[3]+" della carta.");
};

MaskedCardController.prototype.getMaskedCards = function() {
	var thisObj = this;
	thisObj.maskedCards = maskedCardValues;
	thisObj.populateSelectedCard();
};

MaskedCardController.prototype.splitStringAtInterval = function(str, interval) {
	var result = [];
	var spanHtml = "";
	if(interval > 0) {
		for (var i=0, j=1; i < str.length; i++) {
			spanHtml += "<span "+ (str[i] == "_" ? "class='n"+(j++)+"'" : "") + ">" + str[i] + "</span>";
			if(i && ((i+1) % interval === 0)) {
				result.push(spanHtml);
				spanHtml= "";
			}
		}
	}
	return result;
};

var maskedCardController = new MaskedCardController();

$(function() {
	maskedCardController.getMaskedCards();
	$("#cfr1").focus();
	var finalize = false;
	$('.masked-pan-value').on("keyup", function(e) {
		var $this = $(this);
		var value = $this.val();
		var n = this.id.replace('cfr', 'n');
		$("span."+n).html((value || '_'));
		if(finalize) {
			$(':input:eq(' + ($(':input').index(this) + 1) + ')').focus();
		}
	}).on('keydown', function(e) {
		var limit = 1;
		finalize = true;
		var value = $(this).val();
		if (!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) && 
				!(value.length == limit && isAllowedInputNavKey(e))) {
			finalize = false;
			e.preventDefault();
			return false;
		}
		if(isAllowedInputNavKey(e)) {
			finalize = false;
		}
	});
	$(document.body).on('change', "#card-alias", function(e) {
		maskedCardController.populateSelectedCard();
	});
	$(document.body).on('click', "#confirm-maskedpan-btn", function(e) {
		maskedCardController.validateMaskedPan();
		e.preventDefault();
		return false;
	});
});
$(window).load(function() {
	var height=$(".form-container").height() + 60;
	$('#modal-validate-card').css("height", height);
});


