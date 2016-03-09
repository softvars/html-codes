var PaymentController = function()
{
    BaseController.call(this);
    this.paymentUrlPrefix = "/upweb/auth/payment/";
    this.paymentUrl = this.paymentUrlPrefix + "cardselection";
    this.getCardsUrl = this.paymentUrlPrefix + "cards";
    this.cancelCardUrl = this.paymentUrlPrefix + "cancelcard";

    this.checkCvvForHypeCard = null;
    this.checkCvvForOtherCard = null;
};

PaymentController.prototype = Object.create(BaseController.prototype);
PaymentController.prototype.constructor = PaymentController;

PaymentController.prototype.methodPost = "POST";
PaymentController.prototype.printCards = null;
PaymentController.prototype.CARD_CVV_REGEX = /^[\d]{3,4}$/;

PaymentController.prototype.isHypeCard = function(card){
    return card['hype'] === true || card['hype'] === "true" ? true : false;
};

PaymentController.prototype.getPaymentTrxID = function() {
	var urlVariables = getUrlVariables();
	return urlVariables && urlVariables.length ? urlVariables["paymentTrxId"] : null;
};

PaymentController.prototype.getPaymentTrxIDParam = function() {
	var paymentTrxID = this.getPaymentTrxID();
	return (paymentTrxID != null) ? "?paymentTrxId=" + paymentTrxID : '';
};

PaymentController.prototype.getCards = function() {
    var thisObj = this;
    var paymentTrxIDParam = thisObj.getPaymentTrxIDParam();
    var request_done = function(response) {
    	var cardData = response.data;
    	if(cardData) {
        	var cardsHtml = thisObj.printCards({cards:cardData});
        	$("#paymentCarteDiv").html(cardsHtml);
        	$(".select-card").removeClass("hide").addClass("show");
        	if(cardData.length <= 0 && typeof paymentCardselectionAlert !== "undefined") {
        		paymentCardselectionAlert();
        	}
    	}
        $("body").trigger("payment_cards_loaded");
    };
    var request_fail = function(){
    	up_common.spinnerOverlay(true);
    	up_common.loadPageWithUrl(thisObj.paymentUrl + paymentTrxIDParam);
    };
    
    var config = {
        url: thisObj.getCardsUrl + paymentTrxIDParam,
        type: "POST"
    },
    app_config = {
        scope:  thisObj,
        done :  request_done,
        fail :  request_fail
    };
    _.ajax(config, app_config);
};

var paymentController = new PaymentController();

$(function() {
	paymentController.checkCvvForHypeCard = typeof checkCvvForHypeCard === "undefined" ?  null : checkCvvForHypeCard;
	paymentController.checkCvvForOtherCard = typeof checkCvvForOtherCard === "undefined" ?  null : checkCvvForOtherCard;

    paymentController.printCards = _.template($('#cardsTemplate').html());
    
    $(document.body).on('click', '.select-card-done-btn', function(e) {
    	var $this = $(this);
    	if($this.hasClass('readonly')) {
			e.preventDefault();
			return false;
    	}
    	var isCvvEnabled = !($this.parent('.card_cvv_submit_btn').hasClass('centered'));
    	if(isCvvEnabled) {
	    	var $card_cvv_input = $this.parent('.card_cvv_submit_btn').siblings('.card_cvv_input_div').find('input[name="cvv"]');
	    	var value = $card_cvv_input.val();
	    	var isValid = paymentController.CARD_CVV_REGEX.test(value);
	    	if(!isValid) {
				e.preventDefault();
				return false;
	    	}
	    } else {
	    	$this.siblings('input[name="cvv"]').val('');
	    }
    	var paymentTrxId = paymentController.getPaymentTrxID();
    	$this.siblings('input[name="paymentTrxId"]').val(paymentTrxId);
    	
    	var secrandid = $("form#secrandid-form #secrandid").val();
    	$this.siblings('input[name="secrandid"]').val(secrandid);
    	
    	if(typeof pageUnload !== "undefined") {
    		pageUnload.removeUnloadHandlers();
    	}
    	up_common.spinnerOverlay(true);
    });
    
    $(document.body).on('show.bs.collapse', '.collapse', function (e) {
    	var $this = $(this);
    	$('.collapse.in').collapse('hide');
    	var isCvvEnabled = $this.find('.centered.card_cvv_submit_btn').length === 0;
    	if(isCvvEnabled) {
    		$this.find('input[name="cvv"]').val('');
    		var $submit = $this.find('input[type="submit"]');
    		$submit.addClass('readonly');
    	}
	});
	var doKeyUp;
	$(document.body).on("keyup", '.card_cvv_input', function(e) {
		if (doKeyUp) {
	    	var $this = $(this);
			var value = $this.val();
			var isValid = paymentController.CARD_CVV_REGEX.test(value);
			var $submit = $this.parent('.card_cvv_input_div').siblings('.card_cvv_submit_btn').find('input[type="submit"]');
			console.log("isValid CVV:" + isValid);
			$submit.toggleClass('readonly', !isValid);
		}
    });
    $(document.body).on("keydown", '.card_cvv_input', function(e) {
    	var $this = $(this);
		var value = $this.val();
		var limit = 4;
		
		if (!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) &&
			!(value.length == limit && isAllowedInputNavKey(e))) {
			doKeyUp = false;
			e.preventDefault();
			return false;
		}
		doKeyUp = true;
    });
    
    if(typeof isCardListEmpty === "undefined" || isCardListEmpty !== 'true') {
    	paymentController.getCards();
    }
});
