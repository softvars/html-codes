var ValidateTokensController = function() {
	BaseController.call(this);
	this.URLPrefix = "/upweb/register/";
	this.validateTokensUrl = this.URLPrefix + "validateTokens";
	this.initValidateCardUrl = "/upweb/card/initvalidate";
	this.resendSmsOtpUrl = "/upweb/otp/resendsmsotp";
	 this.resendEMailOtpUrl = "/upweb/otp/resendemailotp";
	 this.registerUpMobileUserUrl = "/upweb/register/registerupmobileuser";
	 this.homePageUrl = "/upweb/register/initRegistration";
	 this.homePageText = "Home";
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
		if(("UPWE-0011" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode) || ("UPWE-0023" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode)) {
			responseData.data.retryCount ? $('.bottom-text span').html(responseData.data.retryCount) : $('.bottom-text span').html("0");
			$('.bottom-text.chances-left').removeClass("hide_it");
		}
		if(responseData.data.retryCount === 0) {
			var _renderNotify = function(){
				thisObj.renderNotifyPage(responseData.description, responseData.url, thisObj.homePageText);
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

ValidateTokensController.prototype.registerUpMobileUser = function() {
var thisObj = this;
var alertObj = thisObj.getAlertInstance({isForm: true});
var $form = $("#token-validation-form");
var request_done = function(responseData) {
	up_common.loadPageWithUrl("/upweb/register/registrationsuccess");
};
var config = {
	url : thisObj.registerUpMobileUserUrl,
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



var validateTokensController = new ValidateTokensController();

$(function() {
	$(document.body).on('click', "#token-validation-btn", function(e) {
		var requestDone = function(responseData){
				up_common.loadPageWithUrl(validateTokensController.initValidateCardUrl);
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
	$(document.body).on('click', "#upmobile-user-token-validation-btn", function(e) {
		var requestDone = function(responseData){
				validateTokensController.registerUpMobileUser();
		};
		validateTokensController.validateTokens(requestDone);
		e.preventDefault();
		return false;
	});
});

$(window).load(function() {
	var height=$(".form-container").height() + 60;
	$('#modal-token-validation').css("height", height);
});
