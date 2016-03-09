var ValidateEmailController = function() {
	BaseController.call(this);
	this.URLPrefix = "/upweb/password/";
	this.validateCaptchaUrl = "/upweb/request/captcha/validate";
	this.validateTokensPage = this.URLPrefix + "forgetPasswordToken";
	this.validateEmailUrl = this.URLPrefix + "validateUser";
	this.refershCaptchaUrl = "/upweb/request/captcha/refersh";
};

ValidateEmailController.prototype = Object.create(BaseController.prototype);
ValidateEmailController.prototype.constructor = ValidateEmailController;
ValidateEmailController.prototype.methodPost = "POST";

ValidateEmailController.prototype.validateCaptchaAndEmail = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true}); 
	var $form = $('#validate-user-form');
	var captcha = $('#textcaptcha').val(); 
	var captchaData = (captcha && captcha.length) ? "?captcha=" + captcha : '?captcha=';
	var request_done = function(responseData) {
		$("#modal-validate-user .error-message").html("");
		thisObj.validateEmail();
	};
	var request_fail = function(responseData) {
		$('input[name="captcha"]').val("");
		thisObj.refreshCaptacha();
	};

	var config = {
		url : thisObj.validateCaptchaUrl + captchaData,
		contentType : "application/x-www-form-urlencoded",
		type : thisObj.methodPost
    },
    app_config = {
		name :  UP_Qualifiers.forgetPasswordCaptchaAndEmail,
        scope:  thisObj, 
        done:   request_done,
        fail:   request_fail,
        form:   $form, 
        alert:  alertObj
    };
    _.ajax(config, app_config);
};

ValidateEmailController.prototype.validateEmail = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true});
	var $form = $('#validate-user-form');
	var json = serializeObject($form);
	delete json['captcha'];
	var formValues = JSON.stringify(json);
	var request_done = function(responseData) {
		up_common.loadPageWithUrl(thisObj.validateTokensPage);
	};
	var request_fail = function(responseData) {
		$('input[name="captcha"]').val("");
		thisObj.refreshCaptacha();
	};
	var config = {
		url : thisObj.validateEmailUrl,
		contentType : UPWEB.JSON,
		data : formValues,
		type : thisObj.methodPost
    },
    app_config = {
		name :  UP_Qualifiers.forgetPasswordCaptchaAndEmail,
        scope:  thisObj, 
        done:   request_done, 
        fail:   request_fail,
        form:   $form, 
        alert:  alertObj
    };
	_.ajax(config, app_config);
};

ValidateEmailController.prototype.refreshCaptacha = function() {
	var thisObj = this;
	$("#captcha-image").attr("src", up_common.appendSecrandidParam(thisObj.refershCaptchaUrl)+"&_="+new Date().getTime());
};

var validateEmailController = new ValidateEmailController();

$(function() {
    if(typeof up_common !== "undefined") {
        up_common.beforeunload_alertMessage = 'La richiesta di recupero password sarà annullata';
    }
	$(document.body).on('click', '#validate-user-cap-btn', function(e) {
		validateEmailController.validateCaptchaAndEmail();
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', ".refresh-captcha", function(e) {
		validateEmailController.refreshCaptacha();
	});
});

$(window).load(function() {
	var height=$(".form-container").height() + $(".captchaimg").height();
	$('#modal-validate-user').css("height", height);
});
