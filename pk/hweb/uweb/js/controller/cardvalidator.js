var CardController = function() {
	 BaseController.call(this);
	 this.maskedCards = null;
	 this.URLPrefix = "/upweb/card/";
	 this.validateMaskedPanUrl = this.URLPrefix + "validatemaskedpan";
	 this.getMaskedCardsUrl =  this.URLPrefix + "maskedcardvalues";
	 this.homePageUrl = "/upweb/register/initRegistration";
	 this.homePageText = "Home";
	 this.selectCard="";
	 this.retryCount = 3;
};

CardController.prototype = Object.create(BaseController.prototype);
CardController.prototype.constructor = CardController;
CardController.prototype.methodPost = "POST";

CardController.prototype.maskedCards = null;
CardController.prototype.isSelectedCardPopulated = false;
CardController.prototype.isInitCompleted = false;

CardController.prototype.validateMaskedPan = function(successCall) {
	var thisObj = this;
	var isNotifyOnFailure = thisObj.retryCount === 1 ? false : true;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnError : isNotifyOnFailure});
	var $form = $("#confirm-maskedpan-form");
	var numberOfTimesLeft = parseInt($("#modal-validate-card .bottom-text").find("span").html());
	var json = serializeObject('#confirm-maskedpan-form');
	var selected = $( "#card-alias option:selected" ).val();
	json.maskedPan = cardController.maskedCards[selected||"GESTPAY_CARD"].maskedPan;
	json = JSON.stringify(json);
	var formName = $('#card-name').val() == undefined ? UP_Qualifiers.validateMaskedPan : UP_Qualifiers.validateMaskedPanWithAlias;
	var request_done = successCall;
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
			name :  formName,
	        scope:  thisObj, 
	        done:   request_done, 
	        fail: request_fail,
	        form:   $form, 
	        alert:  alertObj
	    };
		var request = _.ajax(config, app_config);
		request.done(function(responseData) {
			if(("UPWE-0016" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode) || ("UPWE-0024" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode)) {
				$('.bottom-text').removeClass('hide-it');
				responseData.data.retryCount ? $('.bottom-text span').html(responseData.data.retryCount) : $('.bottom-text span').html("0");
			}
			if(responseData.data.retryCount === 0) {
				var _renderNotify = function(){
					thisObj.renderNotifyPage(responseData.description, responseData.url, thisObj.homePageText);
		        };
				pageUnload.invalidateSession(_renderNotify);
			}
		});
	};

CardController.prototype.splitStringAtInterval = function(str, interval) {
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
	
CardController.prototype.populateSelectedCard = function() {
	var thisObj = this;
	var maskedValues = thisObj.maskedCards;
	var selected = $( "#card-alias option:selected" ).val();
	var selectedCard = maskedValues[selected] || maskedValues["GESTPAY_CARD"];
	selectCard=selectedCard;
	$(".type .card-type").addClass(selectedCard.circuitName.toLowerCase());
	var array = thisObj.splitStringAtInterval(selectedCard.maskedPan, 4);
	$(".middle").html("<div class='card-code '>"+array[0]+"</div>&nbsp;<div class='card-code '>"+array[1]+
			"</div>&nbsp;<div class='card-code '>"+array[2]+"</div>&nbsp;<div class='card-code '>"+array[3]+"</div>");
	var indices = [];
	var maskedPan = selectedCard.maskedPan;
	var j = 0;
	for(var i=0; i<maskedPan.length;i++) {
		j = i;
	    if (maskedPan[i] === "_") indices.push(j + 1);
	}
	$(".col-xs-12 label").html("Inserisci la cifra n° "+indices[0]+", n° "+indices[1]+", n° "+indices[2]+" e n° "+indices[3]+" della carta.");
	thisObj.isSelectedCardPopulated = true;
};

CardController.prototype.getMaskedCards = function() {
	var thisObj = this;
	thisObj.maskedCards = maskedCardValues;
	thisObj.populateSelectedCard();
};

CardController.prototype.initcardverification = function(success_call) {
	var thisObj = this;
	var request_done = success_call;
	var config = {
		url : thisObj.verifyCardUrl,
		type : "POST"
	}, app_config = {
		scope : thisObj,
		done : request_done,
	};
	_.ajax(config, app_config);
};

CardController.prototype.init = function() {
	var thisObj = this;
	thisObj.getMaskedCards();
	$("#cfr1").focus();
	var finalize = false;
	$('.masked-pan-value').off("keyup keydown");
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
		thisObj.populateSelectedCard();
		$('.masked-pan-value').val("");
	});
	thisObj.isInitCompleted = true;
};

var cardController = new CardController();

$(document).ready(function() {
	cardController.init();
});

setTimeout(function(){
	if(cardController.isInitCompleted != true){
		cardController.init();
	} else if(cardController.isSelectedCardPopulated != true){
		cardController.getMaskedCards();
	}
}, 4000);