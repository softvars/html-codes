var NewUserController = function() {
	UserProfileController.call(this);
	this.URLPrefix = "/upweb/user/";
	this.sendSmsOTPURL = this.URLPrefix + "sendSmsOTP";
	this.validateSmsOTPURL = this.URLPrefix + "validateSmsOTP";
	this.regNewUserURL = this.URLPrefix + "register/registernewuser";
};

NewUserController.prototype = Object.create(UserProfileController.prototype);
NewUserController.prototype.constructor = NewUserController;

NewUserController.prototype.always_callback = function() {
	$(".field-error-message").html('');
	$("#error-message-div").html('');
};

var newUserController = new NewUserController();

$(function() {
	var $registration_user_form = $('#registration-user-form');
	if($registration_user_form && $registration_user_form.get(0)) {
		populatePlaceHolders($registration_user_form);
	}
	var registration_request_done = function(responseData) {
		registrationController.send_sms_otp();
	};
	var gestpay_maskedpan_validation_request_done = function(responseData) {
		up_common.loadPageWithUrl(registrationController.verifyCardUrl);
	};
	var token_validation_request_done = function(responseData) {
		up_common.loadPageWithUrl("/upweb/user/registernewuser");
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
	$(document.body).on('click', "#confirm-gestpay-maskedpan-btn", function(e) {
		cardController.validateMaskedPan(gestpay_maskedpan_validation_request_done);
		e.preventDefault();
		return false;
	});
});