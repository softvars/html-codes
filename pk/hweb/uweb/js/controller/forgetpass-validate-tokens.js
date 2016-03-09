var ValidateTokensController = function() {
	BaseController.call(this);
	this.URLPrefix = "/upweb/password/";
	this.validateTokensUrl = this.URLPrefix + "verifyToken";
	this.initSecurityQuestions = this.URLPrefix + "loadQuestions";
	this.resendSmsOtpUrl = this.URLPrefix + "resendSmsOtp";
	this.resendEMailOtpUrl = this.URLPrefix + "resendEmailOtp";
	this.unblockPinUrl = this.URLPrefix + "unblockPin";
	this.loginPage = "/upweb/login.html";
	this.homePageText = "Login";
	this.retryCount = 3;
};

ValidateTokensController.prototype = Object.create(BaseController.prototype);
ValidateTokensController.prototype.constructor = ValidateTokensController;
ValidateTokensController.prototype.methodPost = "POST";

ValidateTokensController.prototype.validateTokens = function(requestDone) {
	var thisObj = this;
	var isNotifyOnFailure = thisObj.retryCount === 1 ? false : true;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnError : isNotifyOnFailure});
	var $form = $('#token-validation-form');
	var json = serializeObject('#token-validation-form', true);
	var request_done = requestDone;
	var request_fail =  function(responseData){
		thisObj.retryCount = responseData.data.retryCount;
	};
	var config = {
		url : thisObj.validateTokensUrl,
		contentType : UPWEB.JSON,
		data : json,
		type : thisObj.methodPost
    },
    app_config = {
		name: UP_Qualifiers.validateTokens,
        scope:  thisObj, 
        done:   request_done,
        fail: request_fail,
        form:   $form, 
        alert:  alertObj
    };
	var request = _.ajax(config, app_config);
	request.done(function(responseData) {
		if(("UPWE-0011" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode) || ("UPWE-0032" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode)) {
			$('.bottom-text').removeClass('hide-it');
			responseData.data.retryCount ? $('.bottom-text span').html(responseData.data.retryCount) : $('.bottom-text span').html("0");
		}
		if(responseData.data.retryCount === 0) {
			var _renderNotify = function(){
				thisObj.renderNotifyPage(responseData.description, thisObj.loginPage, thisObj.homePageText, "Recupero Password Fallita");
	        };
			pageUnload.invalidateSession(_renderNotify);
		}
	});
};

ValidateTokensController.prototype.resendSmsOtp = function() {
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

ValidateTokensController.prototype.resendEmailOtp = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isClearForm: false, isNotifiableOnSuccess: true});
	
	var $form = $('#token-validation-form');
	var config = {
		url : thisObj.resendEMailOtpUrl,
		type : "GET"
    },
    app_config = {
        scope:  thisObj, 
        form:   $form, 
        alert:  alertObj
    };
	_.ajax(config, app_config);
};

ValidateTokensController.prototype.unblockUserPin = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isClearForm: true, isNotifiableOnSuccess: true});
	var json = serializeObject('#unblock-pin-form', true);
	var $form = $('#unblock-pin-form');
	var request_done =  function(responseData){
		$("#password-reset-success").show();
	};
	var config = {
		contentType : UPWEB.JSON,
		data : json,
		url : thisObj.unblockPinUrl,
		type : thisObj.methodPost
    },
    app_config = {
		name: UP_Qualifiers.forgetPasswordUnblockPin,
        scope:  thisObj, 
        form:   $form, 
        alert:  alertObj,
        done: 	request_done
    };
	_.ajax(config, app_config);
};

var validateTokensController = new ValidateTokensController();

$(function() {
    if(typeof up_common !== "undefined") {
        up_common.beforeunload_alertMessage = 'La richiesta di recupero password sarà annullata';
    }
	$(document.body).on('click', "#token-validation-btn", function(e) {
		var requestDone = function(responseData){
			up_common.loadPageWithUrl(validateTokensController.initSecurityQuestions);
		};
		validateTokensController.validateTokens(requestDone);
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', "#resend-email-otp", function(e) {
		validateTokensController.resendEmailOtp();
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', "#resend-sms-otp", function(e) {
		validateTokensController.resendSmsOtp();
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', "#unblock-pin-btn", function(e) {
		validateTokensController.unblockUserPin();
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', '#go-to-login', function(e) {
		up_common.loadPageWithUrl(validateTokensController.loginPage);
	});
});

$(window).load(function() {
	var height=$(".form-container").height() + 60;
	$('#modal-token-validation').css("height", height);
});
