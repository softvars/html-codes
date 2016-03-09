var PreRegistrationController = function() {
	 BaseController.call(this);
	 this.URLPrefix = "/upweb/register/";
	 this.validateEmailUrl = this.URLPrefix + "validateUser";
	 this.refershCaptchaUrl = "/upweb/request/captcha/refersh";
	 this.validateCaptchaUrl = "/upweb/request/captcha/validate";
	 this.initPreregisterUrl = this.URLPrefix + "initpreregister";
};

PreRegistrationController.prototype = Object.create(BaseController.prototype);
PreRegistrationController.prototype.constructor = PreRegistrationController;
PreRegistrationController.prototype.methodPost = "POST";

PreRegistrationController.prototype.loginScreen = function() {
	$("#registered-hype-user-alert").show();
};

PreRegistrationController.prototype.validateEmail = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true});
	var $form = $('#validate-user-form');
	var json = serializeObject($form);
	delete json['captcha'];
	var formValues = JSON.stringify(json);
	var request_done = function(responseData) {
		up_common.loadPageWithUrl(thisObj.initPreregisterUrl);
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
		name :  UP_Qualifiers.validateCaptchaAndEmail,
        scope:  thisObj, 
        done:   request_done, 
        fail: request_fail,
        form:   $form, 
        alert:  alertObj
    };
	_.ajax(config, app_config);
};


PreRegistrationController.prototype.refreshCaptacha = function() {
	var thisObj = this;
	$("#captcha-image").attr("src", up_common.appendSecrandidParam(thisObj.refershCaptchaUrl)+"&_="+new Date().getTime());
};

PreRegistrationController.prototype.validateCaptchaAndEmail = function() {
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
		name :  UP_Qualifiers.validateCaptchaAndEmail,
        scope:  thisObj, 
        done:   request_done,
        fail:   request_fail,
        form:   $form, 
        alert:  alertObj
    };
    _.ajax(config, app_config);
};

var preRegistrationController = new PreRegistrationController();

$(function() {
	$(document.body).on('click', ".refresh-captcha", function(e) {
		preRegistrationController.refreshCaptacha();
	});
	$(document.body).on('click', '#validate-user-btn', function(e) {
		preRegistrationController.validateCaptchaAndEmail();
		e.preventDefault();
		return false;
	});
	$(document.body).on('click', '#close-registered-upweb-alert, #close-registered-hype-alert, #close-registration-success-alert', function(e) {
		pageUnload.invalidateSession(function(){$('#secrandid').val('');});
		up_common.loadPageWithUrl('/upweb/register/initRegistration');
	});
	$(document.body).on('click', '#show-upweb-login, #show-hype-login', function(e) {
		up_common.loadPageWithUrl("/upweb/login.html");
	});
});

$(window).load(function() {
	var height=$(".form-container").height() + $(".captchaimg").height();
	$('#modal-validate-user').css("height", height);
});