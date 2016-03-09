var ValidateCardController = function() {
	 BaseController.call(this);
	 this.URLPrefix = "/upweb/request/";
	 this.cardValidationUrl = "/upweb/card/validatecard";
	 this.registerCompletionUrl = "/upweb/register/confirmNewUserRegistration";
	 this.checkTransaction3DVerifiedURL = "/upweb/card/checkTransaction3DVerified";
	 this.homePageUrl = "/upweb/register/initRegistration";
	 this.homePageText = "Home";
	 this.retryCount = 3;
};

ValidateCardController.prototype = Object.create(BaseController.prototype);
ValidateCardController.prototype.constructor = ValidateCardController;
ValidateCardController.prototype.methodPost = "POST";

ValidateCardController.prototype.validateCard = function() {
	var thisObj = this;
	var isNotityOnFail = thisObj.retryCount === 1 ? false : true;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnError : isNotityOnFail});
	alertObj.isNotifiable = function (responseData) {
		return  responseData.statusCode !== "UPWE-0026";
	};
	
	var $form = $('#card-validate-form');
	var json = serializeObject($form, true);
	var request_done = function(responseData) {
		if(responseData.statusCode==="UPWE-0026"){
			thisObj.verifyByVisa(responseData.data);
		} else {
			up_common.loadPageWithUrl("/upweb/card/checkTransaction3DVerified");
		}
	};
	var request_fail = function(responseData) {
		thisObj.retryCount = responseData.data.retryCount;
	};
	var config = {
		url : thisObj.cardValidationUrl,
		contentType : UPWEB.JSON,
		data : json,
		type : thisObj.methodPost
    },
    app_config = {
		name :  UP_Qualifiers.validateCard,
        scope:  thisObj, 
        done:   request_done,
        fail: request_fail,
        form:   $form, 
        alert:  alertObj
    };
	var request=_.ajax(config, app_config);
	request.done(function(responseData) {
		if(responseData.data.retryCount > 0) {
			responseData.data.retryCount ? $('.bottom-text span').html(responseData.data.retryCount) : $('.bottom-text span').html("0");
			$('.bottom-text.chances-left').removeClass("hide_it");
		}
		if(responseData.data.retryCount < 1 && responseData.statusMsg.toLowerCase() === UP_STATUS_MSG.KO) {
			var _renderNotify = function(){
				thisObj.renderNotifyPage(responseData.description, responseData.url, thisObj.homePageText);
	        };
			pageUnload.invalidateSession(_renderNotify);
		}
	});
};

ValidateCardController.prototype.verifyByVisa = function(transactionDetails) {
	up_common.spinnerOverlay(true);
	var form = document.createElement("form");
    form.setAttribute("method", "POST");
    $('<input>').attr({
        type: 'hidden',
        name: 'a',
        value: transactionDetails.shopLogin
    }).appendTo(form);
    $('<input>').attr({
        type: 'hidden',
        name: 'b',
        value: transactionDetails.vbVRisp
    }).appendTo(form);
    $('<input>').attr({
        type: 'hidden',
        name: 'c',
        value: up_common.appendSecrandidParam(transactionDetails.redirectionURL)
    }).appendTo(form);
    form.setAttribute("action", transactionDetails.verifyByVisaUrl);
    pageUnload.removeUnloadHandlers();
    document.body.appendChild(form);
    form.submit();
};

var validateCardController = new ValidateCardController();

$(function() {
	var $card_validate_form = $('#card-validate-form');
	if($card_validate_form && $card_validate_form.get(0)) {
		populatePlaceHolders($card_validate_form);
	}
	
	$(document.body).on('click', '#card-validate-btn', function(e) {
		validateCardController.validateCard();
		e.preventDefault();
		return false;
	});
});

$(window).load(function() {
	var height=$(".form-container").height() + 60;
	$('#modal-validate-card').css("height", height);
});
