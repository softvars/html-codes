var RegistrationNewUserController = function() {
	 BaseController.call(this);
	 this.URLPrefix = "/upweb/register/";
	 this.preRegisterUrl = this.URLPrefix + "preregister";
	 this.initValidateTokensUrl = this.URLPrefix + "initvalidatetokens";
	 this.validateCodicefiscaleURL = "/upweb/user/getUserInfoByCodicefiscale";
		this.secQuest={};
		this.secQuest['quest1']='#quest2';
		this.secQuest['quest2']='#quest1';
		this.editBirthDate_picker = null;
		this.dateRegEx = /^((0[1-9])|([1-2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/[1-2][0-9]{3}$/;
};

RegistrationNewUserController.prototype = Object.create(BaseController.prototype);
RegistrationNewUserController.prototype.constructor = RegistrationNewUserController;
RegistrationNewUserController.prototype.methodPost = "POST";

RegistrationNewUserController.prototype.$datepicker_inputs = null;
RegistrationNewUserController.prototype.datepicker_config = {
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

RegistrationNewUserController.prototype.initDatepickers = function(){
	var $datepickers = $('.datepicker');
	if($datepickers.length && $datepickers.pickadate){
		this.$datepicker_inputs = $datepickers.pickadate(this.datepicker_config);
		this.editBirthDate_picker = this.$datepicker_inputs.filter('.birthDate__datepicker').pickadate('picker');
	}
};

RegistrationNewUserController.prototype.preRegisterUser = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true});
	var $form = $('#registration-user-form');
	var json = serializeObject($form);
	delete json["birthDate_submit"];
	var termsAndCondition = $('#termsAndCondition').prop("checked");
    if(termsAndCondition) {
    	json["termsAndCondition"] = true;
    } else {
    	json["termsAndCondition"] = false;
    }
    json = JSON.stringify(json);
    var formName = $('#cf').val() == undefined ? UP_Qualifiers.addUserProfile : UP_Qualifiers.addUpMobileUserProfile;
	var request_done = function(responseData){
		up_common.spinnerOverlay(true);
		 var form = document.createElement("form");
		    form.setAttribute("method", "POST");
		    form.setAttribute("action", up_common.appendSecrandidParam(thisObj.initValidateTokensUrl));
		    pageUnload.removeUnloadHandlers();
		    document.body.appendChild(form);
		    form.submit();
	};
	var config = {
		url : thisObj.preRegisterUrl,
		contentType : UPWEB.JSON,
		data : json,
		type : thisObj.methodPost
    },
    app_config = {
		name:	formName,
        scope:  thisObj, 
        done:   request_done, 
        form:   $form, 
        alert:  alertObj
    };
	_.ajax(config, app_config);
};

RegistrationNewUserController.prototype.validationErrorsInterceptor = function(alert_obj, formAlerts, $form){
	var isNewUserRegistration = $form.is('.registration-new-user-form'); 
	var dob = $("#edit-date").val();
	if(isNewUserRegistration) {
		if(dob === "") {
			formAlerts['birthDate'] = "Inserisci la data di nascita";
		}
	} else {
		var taxCode = $("#cf").val();
		if(dob === "" && taxCode === "") {
			formAlerts['birthDate'] = "Inserisci la data di nascita o il codice fiscale";
			formAlerts['taxCode'] = formAlerts['birthDate'];
		}
	}
	this.renderValidationErrors(alert_obj, formAlerts, $form);
};

RegistrationNewUserController.prototype.validate_codice_fiscale = function() {
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
			thisObj.renderValidationErrors(null, formAlerts,
					$form);
		} else {
			$('#edit-date').val(responseData.data.birthDate);
		}
	};*/
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


var registrationNewUserController = new RegistrationNewUserController();

$(function() {
	var $registration_user_form = $('#registration-user-form');
	if($registration_user_form && $registration_user_form.get(0)) {
		populatePlaceHolders($registration_user_form);
	}
	registrationNewUserController.initDatepickers();
	 var $birthDate_picker = registrationNewUserController.editBirthDate_picker;
	    if($birthDate_picker) {
	    	$birthDate_picker.on({
	            open: function() {
	                var birthDate = $('.registration-user-form').find('#edit-date').val();
	                if(birthDate && registrationNewUserController.dateRegEx.test(birthDate)) {
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
	$(document.body).on('click', '#registration-user-btn', function(e) {
		registrationNewUserController.preRegisterUser();
		e.preventDefault();
		return false;
	});
	$('#quest1, #quest2').on('change', function() {
		 var secQuestName = $(registrationNewUserController.secQuest[this.id]).attr("name");
		 var $form = $('#registration-user-form');
		 if(this.value === $(registrationNewUserController.secQuest[this.id]).val() && this.value !=="default" && $(registrationNewUserController.secQuest[this.id]).val()!=="default"){
			 var formAlerts = {};
			 if(secQuestName === "securityQuestionOne") {
				 formAlerts[this.name] = "Inserisci una risposta differente dalla prima";
			 } else if(secQuestName === "securityQuestionTwo") {
				 formAlerts[this.name] = "Inserisci una risposta differente dalla seconda";
			 }
			 registrationNewUserController.renderValidationErrors(null, formAlerts, $form);
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
		 registrationNewUserController.renderValidationErrors(null, formAlerts, $form);
		}else if($(this).val()!='' && $(this).val().length == $('#password').val().length){
			$('#confirm-password, #password').parent().removeClass('input-group input-error').addClass('input-group input-correct');
		}
	});
	$('#cf').on('focusout', function () {
		if($('#cf').val().length===16){
			registrationNewUserController.validate_codice_fiscale();
		}else {
			var $form = $('#registration-user-form');
			var formAlerts = {};
			formAlerts[this.name] = "Codice fiscale non valido";
			registrationNewUserController.renderValidationErrors(null, formAlerts, $form);
		}
	});
	
});

$(window).load(function() {
	var height=$(".form-container").height() + 70;
	$('#modal-preregister-user').css("height", height);
});