var RegistrationController = function() {
	BaseController.call(this);
	this.URLPrefix = "/upweb/user/";
	this.validateUserDetailsURL = this.URLPrefix + "validate/userdetails";
	this.validateCodicefiscaleURL = this.URLPrefix + "getUserInfoByCodicefiscale";
	this.sendSmsOTPURL = this.URLPrefix + "sendSmsOTP";
	this.resendSmsOTPURL = this.URLPrefix + "resendsmsotp";
	this.validateSmsOTPURL = this.URLPrefix + "validateSmsOTP";
	this.linkcardtoprofileURL = this.URLPrefix + "linkcardtoprofile";
	this.initReplyCardURL = "/upweb/card/initreplycard";
	this.initGestpayCardUrl = "/upweb/card/initgestpaycard";
	this.userProfileURL = this.URLPrefix + "userProfile";
	this.verifyCardUrl="/upweb/card/validatetransaction";
	 this.homePageUrl = "/upweb/register/initRegistration";
	 this.homePageText = "OK";
	 this.retryCount = 3;
	this.editBirthDate_picker = null;
	this.dateRegEx = /^((0[1-9])|([1-2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/[1-2][0-9]{3}$/; //yy/mm/yyyy
	this.secQuest={};
	this.secQuest['quest1']='#quest2';
	this.secQuest['quest2']='#quest1';
};

RegistrationController.prototype = Object.create(BaseController.prototype);
RegistrationController.prototype.constructor = RegistrationController;
RegistrationController.prototype.requestType = "application/json; charset=UTF-8";
RegistrationController.prototype.methodPost = "POST";
RegistrationController.prototype.methodGet = "GET";

RegistrationController.prototype.always_callback = function() {
	$(".field-error-message").html('');
	$("#error-message-div").html('');
};

RegistrationController.prototype.send_sms_otp = function() {
		 var form = document.createElement("form");
		    form.setAttribute("method", "POST");
		    form.setAttribute("action", up_common.appendSecrandidParam(this.sendSmsOTPURL));
		    pageUnload.removeUnloadHandlers();
		    document.body.appendChild(form);
		    form.submit();
};

RegistrationController.prototype.$datepicker_inputs = null;
RegistrationController.prototype.datepicker_config = {
    format: 'dd/mm/yyyy',
    formatSubmit: 'dd/mm/yyyy',
    max: true,
    editable: true,
    hiddenName: true,
    today: '',
    clear: '',
    close: '',
    klass: {
        input: ''
    }
};

RegistrationController.prototype.initDatepickers = function(){
	var $datepickers = $('.datepicker');
	if($datepickers.length && $datepickers.pickadate){
		this.$datepicker_inputs = $datepickers.pickadate(this.datepicker_config);
		this.editBirthDate_picker = this.$datepicker_inputs.filter('.birthDate__datepicker').pickadate('picker');
	}
};

RegistrationController.prototype.resendSmsOtp = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isClearForm: false, isNotifiableOnSuccess: true});
	var $form = $('#token-validation-form');
	var request_done = function(responseData){
		thisObj.renderFormAlert({description:"Codice SMS OTP inviato con successo"}, $form, true);
	};
	var config = {
		url : this.resendSmsOTPURL,
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

RegistrationController.prototype.validationErrorsInterceptor = function(alert_obj, formAlerts, $form){
	var dob = $("#edit-date").val();
		var taxCode = $("#cf").val();
		if(dob === "" && taxCode === "") {
			formAlerts['birthDate'] = "Inserisci la data di nascita o il codice fiscale";
			formAlerts['taxCode'] = formAlerts['birthDate'];
	}
		var secQ1 = $("#quest1").val();
		var secQ2 = $("#quest2").val();
		var default_ = "default";
		if(secQ1 == default_) {
			formAlerts["securityQuestionOne"] = "Scegli una domanda di sicurezza";
		}
		if(secQ2 == default_) {
			formAlerts["securityQuestionTwo"] = "Scegli una domanda di sicurezza";
		}
	this.renderValidationErrors(alert_obj, formAlerts, $form);
};

RegistrationController.prototype.validate_sms_otp = function(success_call) {
	var thisObj = this;
	var isNotifyOnFailure = thisObj.retryCount === 1 ? false : true;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnError : isNotifyOnFailure});

	var $form = $('#token-validation-form');
	var json = serializeObject($form, true);
	var request_done = success_call;
	var request_fail =  function(responseData){
		thisObj.retryCount = responseData.data.retryCount;
	};
	var config = {
		url : thisObj.validateSmsOTPURL,
		contentType : UPWEB.JSON,
		data : json,
		type : registrationController.methodPost
	}, app_config = {
		name :  UP_Qualifiers.validateSmsOTP,
		scope : thisObj,
		done : request_done,
		fail: request_fail,
		form : $form,
		alert : alertObj
	};
	var request = _.ajax(config, app_config);
	request.done(function(responseData) {
		if(("UPWE-0011" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode) || ("UPWE-0023" === responseData.statusCode && UP_STATUS_CODE.OK !== responseData.statusCode)) {
			$('.bottom-text').removeClass('hide-it');
			responseData.data.retryCount ? $('.bottom-text span').html(responseData.data.retryCount) : $('.bottom-text span').html("0");
		}
		if(responseData.data.retryCount === 0) {
			var _renderNotify = function(){
				thisObj.renderNotifyPage(responseData.description, responseData.url, "Home");
	        };
			pageUnload.invalidateSession(_renderNotify);
		}
	});
};

RegistrationController.prototype.validate_user_profile = function(success_call) {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({
		isForm : true
	});

	var $form = $('#registration-user-form');
	var json = serializeObject($form);
	delete json["_submit"];
	
	var termsAndCondition = $('#termsAndCondition').prop("checked");
    if(termsAndCondition) {
    	json["termsAndCondition"] = true;
    } else {
    	json["termsAndCondition"] = false;
    }
    
    json = JSON.stringify(json);
	var request_done = success_call;
	var config = {
		url : thisObj.validateUserDetailsURL,
		contentType : UPWEB.JSON,
		data : json,
		type : registrationController.methodPost
	}, app_config = {
		name :  UP_Qualifiers.addUserProfile,
		scope : thisObj,
		done : request_done,
		form : $form,
		alert : alertObj
	};
	_.ajax(config, app_config);
};

RegistrationController.prototype.validate_codice_fiscale = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({
		isForm : true,
		isClearForm:false
	});
	var $form = $('#registration-user-form');
	var json = serializeObject($form);
	delete json["_submit"];
	json = JSON.stringify(json);
/*	var request_done = function(responseData) {
		var formAlerts = {};
		if ("UPWE-0000" !== responseData.statusCode && "OK" !== responseData.statusMsg) {
			formAlerts[this.name] = "Codice fiscale non valido";
			registrationController.renderValidationErrors(null, formAlerts,
					$form);
		} else {
			$('#edit-date').val(responseData.data.birthDate);
		}
	};
*/	
	var request_done = function(responseData) {
		$('#edit-date').val(responseData.data.birthDate);
	};
	var request_fail = function(responseData) {
		var formAlerts = {};
		if (UP_RESPONSE_CODE.UNKNOWN === responseData.statusCode && "codice fiscale non valido" === String.prototype.toLowerCase.call(responseData.description)) {
			formAlerts['taxCode'] = responseData.description;
			thisObj.renderValidationErrors(null, formAlerts,	$form);
		}
	};
	
	var config = {
		url : thisObj.validateCodicefiscaleURL,
		contentType : UPWEB.JSON,
		data : json,
		type : thisObj.methodPost
	}, app_config = {
		scope : thisObj,
		done : request_done,
		fail : request_fail,
		form : $form,
		alert : alertObj
	};
	_.ajax(config, app_config);
};

var registrationController = new RegistrationController();

$(function() {
	
	registrationController.initDatepickers();
	 var $birthDate_picker = registrationController.editBirthDate_picker;
	    if($birthDate_picker) {
	    	$birthDate_picker.on({
	            open: function() {
	                var birthDate = $('.registration-user-form').find('#edit-date').val();
	                if(birthDate && registrationController.dateRegEx.test(birthDate)) {
	                	$birthDate_picker.set('select', birthDate, { muted: true });
	                }
	            },
	            render: function() { console.log('Just rendered anew');
	            },
	            set: function(thingSet) {
	                if(thingSet && (thingSet.hasOwnProperty('select') || thingSet.hasOwnProperty('clear') )) {
	                    if(thingSet['select']) {
	                    	$('.registration-user-form').find('#edit-date').val($birthDate_picker.get());
	                    }
	                }
	            }
	        });
	    }
	
	$(document.body).on('click', "#resend-sms-otp", function(e) {
		registrationController.resendSmsOtp();
		e.preventDefault();
		return false;
	});
	
	$('#quest1, #quest2').on('change', function() {
		 var secQuestName = $(registrationController.secQuest[this.id]).attr("name");
		 var $form = $('#registration-user-form');
		 if(this.value === $(registrationController.secQuest[this.id]).val() && this.value !=="default" && $(registrationController.secQuest[this.id]).val()!=="default"){
			 var formAlerts = {};
			 if(secQuestName === "securityQuestionOne") {
				 formAlerts[this.name] = "Inserisci una risposta differente dalla prima";
			 } else if(secQuestName === "securityQuestionTwo") {
				 formAlerts[this.name] = "Inserisci una risposta differente dalla seconda";
			 }
			 registrationController.renderValidationErrors(null, formAlerts, $form);
			 this.value="default";
		 } else {
			 var fieldSet = $form.find('div.input-group, div.input-group-block').has('[name="'+ this.name +'"], [name="' + secQuestName +'"]');
			 fieldSet.removeClass('input-error input-correct');
		 }
	});
	
	$('#confirm-password, #password').on('focusin', function () {
		if($('#confirm-password, #password').parent().hasClass('input-correct')){
		$('#confirm-password, #password').parent().removeClass('input-correct');
			}
		});
	
	$('#confirm-password').on('keyup keydown keypress focus focusin focusout blur click mouseout', function () {
		if($(this).val() != $('#password').val().substr(0,$(this).val().length) ){
		 var $form = $('#registration-user-form');
		 var formAlerts = {};
		 formAlerts[this.name] = "Controlla di aver inserito la stessa password";
		 registrationController.renderValidationErrors(null, formAlerts, $form);
		}else if($(this).val()!='' && $(this).val().length == $('#password').val().length){
			$('#confirm-password, #password').parent().removeClass('input-group input-error').addClass('input-group input-correct');
		}
	});
	$('#cf').on('focusout', function () {
		if($('#cf').val().length === 16){
			registrationController.validate_codice_fiscale();
		}else {
			var $form = $('#registration-user-form');
			var formAlerts = {};
			formAlerts[this.name] = "Codice fiscale non valido";
			registrationController.renderValidationErrors(null, formAlerts, $form);
		}
	});
	
});

$(window).load(function() {
	$("#countryCode").addClass("col-width-74");
	$("#removeSpan").remove();
	var height=$(".form-container").height() + 70;
	$('#modal-preregister-user').css("height", height);
});
