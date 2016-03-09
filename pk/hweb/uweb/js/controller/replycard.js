var ReplyCardController = function() {
	CardController.call(this);
	this.URLPrefix = "/upweb/card/";
	this.initGestpayCardUrl = this.URLPrefix + "initgestpaycard";
};

ReplyCardController.prototype = Object.create(CardController.prototype);
ReplyCardController.prototype.constructor = ReplyCardController;

var replyCardController = new ReplyCardController();

$(function() {
	var confirm_maskedpan_request_done = function(responseData) {
		up_common.loadPageWithUrl(replyCardController.initGestpayCardUrl);
	};
	$(document.body).on('click', "#confirm-maskedpan-btn", function(e) {
		replyCardController.validateMaskedPan(confirm_maskedpan_request_done);
		e.preventDefault();
		return false;
	});

});