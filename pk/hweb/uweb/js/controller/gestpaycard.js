var GestPayCardController = function() {
	 CardController.call(this);
	 this.URLPrefix = "/upweb/card/";
	 this.validateMaskedPanUrl = this.URLPrefix + "validatemaskedpan";
	 this.initGestpayCardUrl = "/upweb/card/initgestpaycard";
};

GestPayCardController.prototype = Object.create(CardController.prototype);
GestPayCardController.prototype.constructor = GestPayCardController;


var gestPayCardController = new GestPayCardController();

$(function() {
	

	var confirm_maskedpan_request_done = function(responseData) {
		up_common.loadPageWithUrl(registrationController.userProfileURL);
	};
	$(document.body).on('click', "#confirm-gestpay-maskedpan-btn", function(e) {
		cardController.validateMaskedPan(confirm_maskedpan_request_done);
		e.preventDefault();
		return false;
	});

});