var UPWEB = {
	JSON : "application/json; charset=UTF-8",
	POST_METHOD : "POST",
};
var UPWEB_MASK_REGEX = /\*|\s/g;
var UPWEB_CONST_ACTIVE = "active";
var UPWEB_SUPPORTED_BROWSER = { "firefox": 33, "chrome": 33, "msie": 9, "ie": 9 };

var UP_RESPONSE_CODE = {
    SUCCESS:            "UPWE-0000",
    TECHNICAL_PROBLEM:  "UPWE-0001",
    ALREADY_EXIST:      "UPWE-0002",
    DATE_FORMAT:        "UPWE-0003",
    NO_DATA_FOUND:      "UPWE-0004",
    REMOVE_FAILED:      "UPWE-0005",
    SESSION_EXPIRED:    "UPWE-0006",
    VALIDATION_FAILED:  "UPWE-0007",
    REQUEST_FAILED:     "UPWE-0008",
    EMAIL_LINK_EXPIRED: "UPWE-0027",
    UNKNOWN:            "UPWE-1000"
};

var UP_CONSTANTS = {
	REGISTRATION_CANCELLED : "La richiesta di registrazione sarà annullata"	
};

var UP_STATUS_CODE = {
    OK: "0000",
    KO: "0001",
    INVALID_MOBILE_NUM: "0002",
    FIELD_EMPTY: "0003",
    TECHNICAL_PROBLEM_SQL: "0004",
    EXTERNAL_SERVICE_REPLY: "0005",
    INVALID_EMAI_NAME: "0006",
    INVALID_PAN: "0007",
    INVALID_EXPIRY_MONTH: "0008",
    INVALID_EXPIRY_YEAR: "0009",
    INVALID_PIN: "0010",
    INVALID_NAME: "0011",
    INVALID_SURNAME: "0012",
    INVALID_FISCALCODE: "0013",
    INVALID_TRANSACTION_ID: "0014"
};

var UP_STATUS_MSG = {
    OK:    "ok",
    KO:    "ko"
};

var AlertFactory = function( ){ };
AlertFactory.prototype.isNotifiable = true;
AlertFactory.prototype.isNotifiableOnError = true;
AlertFactory.prototype.isNotifiableOnSuccess = false;
AlertFactory.prototype.isForm = false;
AlertFactory.prototype.isClearForm = true;
AlertFactory.prototype.isOverlay = false;

/* It is a base class for other controllers.*/
var BaseController = function( ){
};

BaseController.prototype.getAlertInstance = function(config) {
	var alertObj = Object.create(AlertFactory.prototype);
	if(config) {
	    alertObj = _.defaults(config, alertObj);
	}
	return alertObj;
};

BaseController.prototype.renderAlert = function(res, alertOnSuccess) {
	var c = alertOnSuccess ? 'alert-success' : 'alert-danger';
	var msg = (res && res.description) || (alertOnSuccess ? 'success' : 'error');
	var $msgAlert = $('.content-wrap #msg-alert');
	$msgAlert.removeClass('hide-it alert-success alert-danger').addClass(c);
	$msgAlert.find('.message').html(msg);
	$msgAlert.show();
};
BaseController.prototype.renderFormAlert= function(res, $form, alertOnSuccess) {
	if(!($form && $form.find)) return;
	var c = alertOnSuccess ? ' alert-success' : ' alert-danger';
	var msg = ( res && res.description ) || '';
	var $formAlert = $form.find(".row.formAlert");
	if($formAlert && $formAlert.length) {
		$formAlert.removeClass('hide-it alert-success alert-danger').addClass(c);
		$formAlert.find('.message').html(msg);
	} else {
		var alertHtml = '<div class="row formAlert alert alert-dismissable'+c+'" role="alert"><div class="col-sm-12 msg-div">' +
							'<button type="button" class="close close-alert" data-dismiss="alert" alert-id="#msg-alert" aria-label="Close"></button>' +
							'<span class="message">'+ msg +'</span>' +
					    '</div></div>';
    	var $formFirstChild = $form.children().first();
    	$formFirstChild.before(alertHtml);
    	var $modal_content = $form.parents('.modal-content, .form-content');
    	var modal_content_height = $modal_content.css('height');
    	var row_Form_Alert_Height =  $('.row.formAlert').css('height');
    	$modal_content.css('height', parseInt(modal_content_height) + parseInt(row_Form_Alert_Height) + "px");
	}
	up_common.updateBSModal(null, $form);
};

BaseController.prototype.renderValidationError = function($div, inputName, errorMsg, $form) {
	var fieldSet = $div.has('[name="'+inputName+'"]');
	if(fieldSet && fieldSet.length) {
		fieldSet.addClass('input-error').find('div.input-msg').html(errorMsg);
	}
	if($form) {
		up_common.updateBSModal(null, $form);
	}
};

BaseController.prototype.renderValidationErrors= function(alert_obj, formAlerts, $form) {
	var thisObj = this;
	if($form && $form.find) {
		var $inputGroup = $form.find('div.input-group, div.input-group-block');
		_.each(formAlerts, function(errorMsg, field) {
			thisObj.renderValidationError($inputGroup, field, errorMsg, $form);
		});
	}
};

BaseController.prototype.validationErrorsInterceptor = function(alert_obj, formAlerts, $form){
	this.renderValidationErrors(alert_obj, formAlerts, $form);
};

BaseController.prototype.renderAlert_ = function(response, $form, alert_obj, isSuccess) {
	if(alert_obj.isForm  && (!isSuccess || (isSuccess && !alert_obj.isOverlay))) {
		this.renderFormAlert(response, $form, isSuccess);
	} else {
		this.renderAlert(response, isSuccess);
	}
};

BaseController.prototype.notify = function(alert_obj, isSuccess, response , $form) {
	if(alert_obj.isNotifiableOnError || alert_obj.isNotifiableOnSuccess) {
	    if(!isSuccess && alert_obj.isNotifiableOnError) {
	        var isValidationErr = response.statusCode === UP_RESPONSE_CODE.VALIDATION_FAILED && !!response.errors;
	        if(isValidationErr) {
	        	this.validationErrorsInterceptor(alert_obj, response.errors, $form);
	        } else {
	        	this.renderAlert_(response, $form, alert_obj, isSuccess);
	        }
	    } else if(isSuccess && alert_obj.isNotifiableOnSuccess) {
	    	this.renderAlert_(response, $form, alert_obj, isSuccess);
	    }
    }
	$(window).scrollTop(0);
};

BaseController.prototype.renderNotifyPage = function(msg, homeLink, linkName, title) {
	var notifyTemplate = _.template($('#notificationTemplate').html());
	var notification = {};
	notification.message = msg;
	notification.link = homeLink;
	notification.linkName = linkName;
	notification.title = title;
	var notificationHtml = notifyTemplate({notification:notification});
    $(".error-alert-modal").html(notificationHtml);
};

BaseController.prototype.extractPan = function(pan){
    return pan && pan.length ? pan.replace(UPWEB_MASK_REGEX, '') : '';
};

BaseController.prototype.validate = function(config, doNotHideSpinner){
	var hideSpinner = doNotHideSpinner === true ? false : true;
	up_common.spinnerOverlay(true);
	config["scope"] = this;
	var alert_obj = config["alert"] || (_.isFunction(this.getAlertInstance) ? this.getAlertInstance() : {});
	var isErrors = up_validator.validate(config, alert_obj);
	if(isErrors || hideSpinner) {
		up_common.spinnerOverlay(false);
	}
	return isErrors;
};

var UP_Qualifiers = {
	doLogin 			: "LoginController.login_submit",
	sendMailToSupport 	: "UpWeb_Common.sendMailToSupport",
	editProfile 		: "ProfileController.editProfile",
	addAddress 			: "AddressController.addAddress",
	editAddress 		: "AddressController.editAddress",
	editCard 			: "WalletController.editCard",
	addCard 			: "WalletController.addCard",
	validateCaptchaAndEmail		: "PreRegistrationController.validateCaptchaAndEmail",
	addUserProfile		: "RegistrationController.validate_user_profile",
	validateSmsOTP		: "RegistrationController.validate_sms_otp",
	validateMaskedPan	: "CardController.prototype.validateMaskedPan",
	validateMaskedPanWithAlias	: "CardController.prototype.validateMaskedPanWithAlias",
	validateTokens		: "ValidateTokensController.validateTokens",
	validateCard		: "ValidateCardController.validateCard",
	changePassword		: "ProfileController.changePassword",
	addUpMobileUserProfile : "RegistrationController.addUpMobileUser",
	forgetPasswordUnblockPin : "ValidateTokensController.unblockPin",
	forgetPasswordCaptchaAndEmail	: "ValidateEmailController.validateCaptchaAndEmail",
	editProfileWithTaxCode : "ProfileController.editProfileWithTaxCode"
};

var UpWeb_Common = function ( ){
	BaseController.call(this);
    this.hash = getUrlHash();
    this.pathname = window.location.pathname;
    this.isNoRecord = (this.hash === 'no-record');
    this.sendMailToSupportUrl = "/upweb/auth/dashboard/sendmail";
    this.faqHTMLTmpl = "";
    this.faqHTML = "";
    this.detachedElmMap = {};
    this.pageHashMap = {
    	'termini_e_condizioni'	:'#modal-terms-and-conditions-privacy-policy', 
    	'contatti'		: '#modal-contacts', 
    	'supporto'		: '#modal-support', 
    	'faq'			: '#modal-faq', 
    	'privacy_policy': '#modal-privacy',
    	'add_card' : '#modal-add-card',
    	'edit_card' : '#modal-edit-cards',
    	'add_address' : '#modal-address',
    	'edit_address' : '#modal-address',
    	'edit_profile' : '#modal-edit-profile',
    	'detail_transaction' : '#modal-detail-transaction'};
    this.contentSelector = this.pageHashMap[this.hash];
    this.beforeunload_alertMessage = 'La sessione sarà chiusa';
    this.dateRegEx = /^((0[1-9])|([1-2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/[1-2][0-9]{3}$/; //yy/mm/yyyy
};
UpWeb_Common.prototype = Object.create(BaseController.prototype);
UpWeb_Common.prototype.constructor = UpWeb_Common;

UpWeb_Common.prototype.logged_in_user_name = "";
UpWeb_Common.prototype.spinnerOverlayGear = 0;

UpWeb_Common.prototype.removeFormErrors = function($form) {
	if($form && $form.find) {
		$form.find('div.input-group, div.input-group-block').removeClass('input-error');
    	$form.find('.alert.formAlert').addClass('hide-it');
    	this.updateBSModal(null, $form);
	}
};

UpWeb_Common.prototype.removeAlerts = function() {
	var $msgAlert = $('.content-wrap #msg-alert');
	if($msgAlert && $msgAlert.length) {
		$msgAlert.addClass('hide-it');
	}
};

UpWeb_Common.prototype.updateSpinnerPosition = function(e) {
	var midHeight = document.body.offsetHeight / 2;
	var scrollTop = $(document).scrollTop();
	$(".popup-overlay .spinner").css('top', midHeight + (scrollTop - 35));
};

UpWeb_Common.prototype.spinnerOverlay = function (isShow) {
	if(typeof isShow === 'boolean') {
	    if(!isShow && this.spinnerOverlayGear > 0)
	        this.spinnerOverlayGear--;
	    if(this.spinnerOverlayGear === 0) {
	        $('#spinner-overlay').toggleClass('hide', !isShow);
	        if(isShow) {
	        	this.updateSpinnerPosition();
	        	$(document).on('scroll', this.updateSpinnerPosition);
	        } else {
	        	$(document).off('scroll', this.updateSpinnerPosition);
	        }
	    }
	    if(isShow)
	        this.spinnerOverlayGear++;
	}
};

UpWeb_Common.prototype.browserInfo = (function(){
    console.log("navigator.browserInfo: " + navigator.browserInfo);
    var toRet = null;
    var info = navigator.browserInfo;
    if(info[1]) {
        var name = String.prototype.toLowerCase.call(info[0]);
        var version = parseInt(info[1]);
        toRet = {"name": name, "version": version};
    }
    return toRet;
})();

UpWeb_Common.prototype.isSupportedBrowser = (function(){
    var browser = UpWeb_Common.prototype.browserInfo;
    if(browser.version ) {
        var s_version = UPWEB_SUPPORTED_BROWSER[browser.name];
        return s_version && browser.version >= s_version;
    }
})() === true;

UpWeb_Common.prototype.sendMailToSupport = function(elm) {
	var thisObj = this;
    var $form = $(elm).closest('form');
    var json = serializeObject($form, true);
    var $modal_support = $form.parents('#modal-support');
    
    var alertObj = thisObj.getAlertInstance({isNotifiableOnSuccess: true});
    alertObj.isForm = $modal_support && $modal_support.length ? true : false;
    alertObj.isOverlay = $modal_support && $modal_support.length ? true : false;
    
    var request_done = function( response ) {
        $('#modal-support').modal('hide');
	};

    var config = {
        url: thisObj.sendMailToSupportUrl,
        contentType: UPWEB.JSON,
        data: json,
        type: "POST"
    },
    app_config = {
    	name :  UP_Qualifiers.sendMailToSupport,
        scope:  thisObj, 
        done :  request_done, 
        form :  $form, 
        alert:  alertObj
    };
    _.ajax(config, app_config);
};

UpWeb_Common.prototype.clearForm = function($forms, e){
	if(!($forms && $forms.length)) return;
	var thisObj = this;
	$forms.each(function(i){
		var form = this;
		form.reset();
		var $form = $(form), form_id = form.id;
		switch(form_id) {
			case 'add-card-form-id':
				$form.find("#card-type").prop("class", "");
				$form.find('.card-code').html("****");
				$form.find('.expiry-date-month').html("--");
				$form.find('.expiry-date-year').html("--");
				break;
			case 'support-form':
			case 'support-form-overlay':
				$form.find(".selectpicker").selectpicker('val', "Transazioni");
				break;
		}
		thisObj.removeFormErrors($form);
	});
};

UpWeb_Common.prototype.updateHash = function(){
	this.hash = getUrlHash();
	this.contentSelector = this.pageHashMap[this.hash];
    if(this.contentSelector) {
    	$("body").trigger(this.hash);
    } else {
    	$('.modal').modal('hide');
    }
};

UpWeb_Common.prototype.updateBSModal = function($modal, $element){
	var $modal = $modal || ($element && $element.closest ? $element.closest('.modal') : null ) ;
	if($modal && $modal.find) {
		var $modal_dialog = $modal.find('.modal-dialog');
		var $container_fluid = $modal.find('.container-fluid');
		$modal_dialog.css("height", $container_fluid.height());
	}
};

UpWeb_Common.prototype.appendParams = function(url, vars){
	if(url && vars) {
		var hash = '';
		var isContainsRef = url.indexOf('#') > -1;
		if(isContainsRef) {
			var url_ = url.split('#');
			url = url_[0];
			hash = url_[1] && "#"+url_[1] || '' ;
		}
		var qPosition = url.indexOf('?');
		url += (qPosition > -1 ? (qPosition === (url.length - 1) ? '' : '&') : '?');
		if(_.isObject(vars)) {
			var vars_ = [];
			_.each(vars, function(val, key){
				vars_.push(key + "=" + val);
			});
			vars = vars_.join('&');
		}
		url += vars + hash;
	}
	return url;
};

UpWeb_Common.prototype.appendSecrandidParam = function(url){
    var $form = $('form#secrandid-form');
    var vars = serializeObject($form);
	return this.appendParams(url, vars);
};

UpWeb_Common.prototype.loadPageWithUrl = function(url, vars){
	this.spinnerOverlay(true);
	if(typeof pageUnload !== "undefined") {
		pageUnload.removeUnloadHandlers();
	}
	window.location.href = up_common.appendSecrandidParam(url);
};

var up_common = new UpWeb_Common();

$(function(){
	$(document.body).on('click', 'a', function(e){
		if(typeof pageUnload !== "undefined") {
			pageUnload.pauseUnloadHandlers();
		}
	});
	
    if(typeof FAQ_DATA !== "undefined") {
	    up_common.faqHTMLTmpl = _.template($('#faqTemplate').html());
	    up_common.faqHTML = up_common.faqHTMLTmpl(FAQ_DATA);
	    var $faq_modal = $('#modal-faq');
        $faq_modal.html(up_common.faqHTML);
	}

    up_common.logged_in_user_name = $('#nav-bar-menu .logged-user').html();

    var $modals = $('.modal');
	$(window).on('hashchange', function() {
		if(!up_common.hash === 'detail_transaction') {
			$modals.modal('hide');
		}
		up_common.updateHash();
	});
   
    $(document.body).on('click', '#terms-and-conditions, #privacyPolicyModal, #termsAndConditionModal, #faq-link, #contacts, #support, #privacy_policy, .add-card, .open-edit-cards, .add-new-address, .edit_address, #edit-profile', function(e){
    	var $this = $(this);
    	var hash = this.hash || $this.data('hash');
    	if(hash && hash === '#' + getUrlHash() ) {
    		$modals.modal('hide');
    		up_common.updateHash();
    	}
    });
    
    $(document.body).on('termini_e_condizioni', /*'#terms-and-conditions, #privacyPolicyModal, #termsAndConditionModal',*/ function(e) {
    	$('#modal-terms-and-conditions-privacy-policy').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-terms-and-conditions-privacy-policy').modal('show');
		$(window).scrollTop(0);
    });
    $(document.body).on('faq', function(e) {
        $('#modal-faq').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-faq').modal('show');
		$(window).scrollTop(0);
    });
    
    $(document.body).on('contatti', function(e) {
		$('#modal-contacts').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-contacts').modal('show');
		$(".item",$('#modal-contacts')).each(function(){$(this).removeClass("active");});
		$(window).scrollTop(0);
	});
    $(document.body).on('supporto', function(e) {
		$('#modal-support').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-support').modal('show');
		$(window).scrollTop(0);
	});
    $(document.body).on('privacy_policy', function(e) {
		$('#modal-privacy').prop('class', 'modal bottom').addClass('bottom remove-paddings');
		$('#modal-privacy').modal('show');
		$(window).scrollTop(0);
	});
    
    $(document.body).on('add_card', function(e) {
    	$('#modal-add-card').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-add-card').modal('show');
		$(window).scrollTop(0);
		populatePlaceHolders($('#add-card-form-id'));
		$('#modal-add-card').scrollTop(0);
		e.preventDefault();
		return false;
    });
    
    $(document.body).on('edit_card', function(e) {
    	$modal = $('#modal-edit-cards');
		$modal.prop('class', 'modal bottom').addClass('bottom');
		$modal.modal('show');
		up_common.updateBSModal($modal);
		$(window).scrollTop(0);
		e.preventDefault();
		return false;
    });
    
    $(document.body).on('edit_address add_address', function(e) {
		$('#modal-address').prop('class', 'modal bottom').addClass('bottom');
		$('#modal-address').modal('show');
		$(window).scrollTop(0);
	});
    
    $(document.body).on('add_address', function(e){
    	populatePlaceHolders($('#address-form'));
    	$('#modal-address').scrollTop(0);
    });

    $(document.body).on('click', '.support-form input[type="submit"]', function(e){
        up_common.sendMailToSupport(this);
        e.preventDefault();
        return false;
    });
	$(document.body).on('click', "#termsAndCondition", function(e) {
		var $submit = $('#registration-user-btn');
		var isChecked = $('#termsAndCondition').prop("checked");
		if (isChecked) {
			$submit.removeAttr('disabled');
		}else{
			$submit.prop('disabled', true);
		}
		$submit.toggleClass('readonly', !isChecked);
	});
    $(document.body).on('click', '.alert.formAlert .close-alert', function(e) {
        $('.alert.formAlert').addClass('hide-it');
    });
    
    $(document.body).on('hidden.bs.modal', function (e) {
    	var modal_id = e.target.id;
    	var $modal = $('#'+modal_id);
    	var $forms = $modal.find('form');
    	up_common.clearForm($forms, e);
	});

    $(document.body).on('shown.bs.modal', function (e) {
    	var modal_id = e.target.id;
    	var $modal = $('#'+modal_id);
    	up_common.updateBSModal($modal);
    	up_common.removeAlerts();
	});
    
    $(document.body).on('keydown focusin remove_error_event', 'input, textarea', function(){
    	var $this = $(this);
    	$this.closest('div.input-group, div.input-group-block').removeClass('input-error input-correct');
    });
    
    var browser = up_common.browserInfo; 
    var browserName = browser.name === 'ie' || browser.name === 'msie' ? 'msie' : browser.name ;
    $(document.body).toggleClass(browserName, true);
   
	$(document.body).on('keyup', '#edit-date, .edit-date', function(e) {
		var limit = 10;
		var $this = $(this);
		var value = $this.val();
		var key = e.which || e.keyCode;
		var slash = '/';
		if (value.length >= 2 && !(key == 8 || key == 46)) {
			var slashCount = (value.split(slash)).length-1; 
			if(slashCount === 0) {
				if(value.length < 5) {
					$this.val(value.substr(0, 2) + slash + value.substr(2, 2));
				} else {
					$this.val(value.substr(0, 2) + slash + value.substr(2, 2) + slash + value.substr(4, 4));
				}
			} else if(slashCount === 1 && value.length > 4) {
				$this.val(value.substr(0, 5) + slash + value.substr(5, 4));
			}
			e.preventDefault();
			return false;
		} else if (value.length > limit) {
			e.preventDefault();
			return false;
		}
    });

	$(document.body).on('keydown', '#edit-date, .edit-date', function(e) {
		var limit = 10;
		doKeyUp = true;
		var value = $(this).val();
		if ((value.length === 8 && !(value.indexOf('/') > -1 || isAllowedInputNavKey(e))) ||
			(value.length === 9 && !((value.split('/')).length === 3 || isAllowedInputNavKey(e))) ||
		    (!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) && 
				!(value.length == limit && isAllowedInputNavKey(e)))) {
			doKeyUp = false;
			e.preventDefault();
			return false;
		}
	});
	

	// On focus of the fake password field
	$('.fake_password').focus(function(){
		var $this = $(this);
		$this.addClass('hide-it');
		var $real_password = $this.siblings("input[type='password']");
		if($real_password) {
			$real_password.removeClass('hide-it').focus(); 
		}
	});

	// On blur of the real pass
	$(".fake_password + input[type='password']").blur(function(){
		var $this = $(this);
	    if($this.val() == "") {
	        $this.addClass('hide-it');
	        var $fake_password = $this.siblings('.fake_password');
	        if($fake_password) {
	        	$fake_password.removeClass('hide-it');
	        }
	    }
	});
});