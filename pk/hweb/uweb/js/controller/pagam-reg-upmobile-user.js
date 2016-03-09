var UpMobileUserController = function() {
	UserProfileController.call(this);
	this.URLPrefix = "/upweb/user/";
	this.sendSmsOTPURL = this.URLPrefix + "sendSmsOTP";
	this.validateSmsOTPURL = this.URLPrefix + "validateSmsOTP";
	this.onBoardUpMobileUserURL = this.URLPrefix + "onboardupmobileuser";
	this.validateMaskedPanUrl = this.URLPrefix + "register/validatemaskedpan";
};

UpMobileUserController.prototype = Object.create(UserProfileController.prototype);
UpMobileUserController.prototype.constructor = UpMobileUserController;

UpMobileUserController.prototype.always_callback = function() {
	$(".field-error-message").html('');
	$("#error-message-div").html('');
};

var upMobileUserController = new UpMobileUserController();

$(function() {
	var registration_request_done = function(responseData) {
		registrationController.send_sms_otp();
	};

	var gestpay_maskedpan_validation_request_done = function(responseData) {
		up_common.loadPageWithUrl(registrationController.verifyCardUrl);
	};
	var token_validation_request_done = function(responseData) {
		up_common.loadPageWithUrl("/upweb/user/onboardupmobileuser");
	};
	$(document.body).on('click', '#registration-user-btn', function(e) {
		registrationController.validate_user_profile(registration_request_done);
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', '#token-validation-btn', function(e) {
		registrationController.validate_sms_otp(token_validation_request_done);
		e.preventDefault();
		return false;
	});
	var confirm_maskedpan_request_done = function(responseData) {
		up_common.loadPageWithUrl(registrationController.initGestpayCardUrl);
	};
	$(document.body).on('click', "#confirm-maskedpan-btn", function(e) {
		cardController.validateMaskedPan(confirm_maskedpan_request_done);
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', "#confirm-gestpay-maskedpan-btn", function(e) {
		cardController.validateMaskedPan(gestpay_maskedpan_validation_request_done);
		e.preventDefault();
		return false;
	});
});