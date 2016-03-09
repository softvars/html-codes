var PaymentOTPController = function()
{
    BaseController.call(this);
    this.paymentUrlPrefix = "/upweb/auth/payment/";
    this.paymentUrl = this.paymentUrlPrefix + "cardselection";
    this.validateTokenUrl = this.paymentUrlPrefix + "validateotp/";
    this.cancelCardUrl = this.paymentUrlPrefix + "cancelcard";
	this.resendSmsOtpUrl = this.paymentUrlPrefix + "resendTxnSMSOtp";
};

PaymentOTPController.prototype = Object.create(BaseController.prototype);
PaymentOTPController.prototype.constructor = PaymentOTPController;

PaymentOTPController.prototype.methodPost = "POST";

PaymentOTPController.prototype.getPaymentTrxID = function() {
	var paymentTrxID = $("#cards-body-container").data('txnid');
	return paymentTrxID ? paymentTrxID : null;
};

PaymentOTPController.prototype.getPaymentTrxIDParam = function() {
	var paymentTrxID = this.getPaymentTrxID();
	return (paymentTrxID != null) ? "?paymentTrxId=" + paymentTrxID : '';
};

PaymentOTPController.prototype.resendSmsOtp = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isClearForm: false, isNotifiableOnSuccess: true});
	var $form = $('#token-validation-form');
	var request_done = function(responseData){

	};
	var config = {
		url : thisObj.resendSmsOtpUrl,
		type : "GET"
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done, 
        form:   $form, 
        alert:  alertObj
    };
	_.ajax(config, app_config);
};

PaymentOTPController.prototype.validatePaymentOtp = function() {
	var thisObj = this;
	up_common.spinnerOverlay(true);
	var alertObj = thisObj.getAlertInstance({isForm: true});
	var $form = $('#token-validation-form');
	var otp = $("#pinsms").val();
	var paymentTrxIDParam = thisObj.getPaymentTrxIDParam();
	var validateTokenUrl_ = thisObj.validateTokenUrl + otp + paymentTrxIDParam;
	var business_always = function(responseData){
		up_common.spinnerOverlay(false);
	};

	var config = {
		url : validateTokenUrl_,
		type : thisObj.methodPost
    },
    app_config = {
		name: UP_Qualifiers.validateSmsOTP,
        scope:  thisObj, 
        always: business_always,
        form:   $form, 
        alert:  alertObj
    };
	var request = _.ajax(config, app_config);
	request.done(function(responseData) {
		if(responseData) {
			var $chancesLeft = $('.bottom-text.chances-left');
			$chancesLeft.find('span').html((responseData.data && responseData.data.retryCount) ? responseData.data.retryCount : "0");
			if("UPWE-0011" != responseData.statusCode) {
				if("UPWE-0031" === responseData.statusCode) {
					setPaymentMessageAlert("OTP_FAILED");
					showPaymentCardselectionAlert();
				} else {
					up_common.loadPageWithUrl(paymentOTPController.paymentUrl + paymentTrxIDParam);
				}
			} else {
				$chancesLeft.removeClass('hide-it');
			} 
		}
	});
};

var paymentOTPController = new PaymentOTPController();

$(function() {
    $(document.body).on('click', '#token-validation-btn', function(e) {
    	paymentOTPController.validatePaymentOtp();
    	e.preventDefault();
    	return false;
    });
    $(document.body).on('click', "#resend-sms-otp", function(e) {
    	paymentOTPController.resendSmsOtp();
    	e.preventDefault();
    	return false;
    });
});