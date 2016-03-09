var WalletController = function()
{
    BaseController.call(this);
    this.getCardsUrl = "/upweb/auth/wallet/cards";
    this.URLPrefix = "/upweb/auth/card/";
    this.editCardsUrl = this.URLPrefix + "edit";
    this.validateEditCardUrl = this.URLPrefix + "validateeditcard";
    this.addCardUrl = this.URLPrefix + "add";
    this.removeCardUrl = this.URLPrefix + "remove";
    this.setPreferredCardUrl = this.URLPrefix + "set_preferred";
    this.removePreferredCardUrl = this.URLPrefix + "remove_preferred";
    this.cardLimit = 5;
    this.cardList = null;
    this.validateCardURL = this.URLPrefix + "validateAddEditCard";
};

WalletController.prototype = Object.create(BaseController.prototype);
WalletController.prototype.constructor = WalletController;

WalletController.prototype.methodPost = "POST";
WalletController.prototype.printCards = null;
WalletController.prototype.printEditCards = null;

WalletController.prototype.ADD = 1;
WalletController.prototype.EDIT = 2;
WalletController.prototype.REMOVE = 3;


WalletController.prototype.isPreferredCard = function(cardID){
    var storedCardID = $("#profilocarteDiv").data('preferred-card');
    return (storedCardID && parseInt(storedCardID) === parseInt(cardID)) ? true : false;
};

WalletController.prototype.isHypeCard = function(card){
	return card['hype'] === true || card['hype'] === "true" ? true : false;
};

WalletController.prototype.requestDoneInterceptor = function(response, callback, args) {
	this.processPreferred(callback, args);
};

WalletController.prototype.processPreferred = function(callback, args) {
    var isPreferredChecked = false, method = null, cardID = null, $form = null;
    if(args && args.length) {
        isPreferredChecked = args[0]; method = args[1]; cardID = args[2]; $form = args[3];
    }
    var cbk = function(){ callback(); };
    if(!cardID || !method) {
        cbk(); return;
    }
    if(isPreferredChecked && (method === this.ADD || (method === this.EDIT && !this.isPreferredCard(cardID)))) {
        this.setPreferredCard(cardID, cbk, $form);
    } else if(this.isPreferredCard(cardID) && ((!isPreferredChecked && method === this.EDIT) || method === this.REMOVE)) {
        this.removePreferred(cbk, $form, method);
    }else {
        cbk();
    }
};

WalletController.prototype.cardListTidy = function(data) {
	var thisObj = this;
	thisObj.cardList =  data;
	if(thisObj.cardList != null) {
		_.each(thisObj.cardList, function(card, idx, list) {
			card.meta = {};
			card['last4Digits'] = card.maskedPan.substring(12,17);
			if(isNotEmpty(card.certified)) {
				var certified = card.certified.toLowerCase();
				card.meta.cert = (certified === 'true' ? 'Certificata' : (certified === 'false' ? 'Certifica Carta' : 'Certificazione In Corso')) ;  
			} else {
				card.meta.cert = 'Certificazione In Corso'; 
			}
		});
	}
};

WalletController.prototype.getCards = function() {
    var thisObj = this;
    
    var request_done = function(response) {
        thisObj.cardListTidy(response.data);
        var cardsHtml = thisObj.printCards({cards: thisObj.cardList});
        var editCardsHtml = thisObj.printEditCards({cards:thisObj.cardList});
        $("#profilocarteDiv").html(cardsHtml);
        $(".carousel-inner").html(editCardsHtml);
        $("body").trigger("wallet_cards_loaded");
    };
    var config = {
        url: thisObj.getCardsUrl
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done
    };
    var request = _.ajax(config, app_config);
    request.always(function(){
    	 if(thisObj.cardList && thisObj.cardList.length < thisObj.cardLimit){
             $("#staticHypeData").removeClass("hide");
         }
    });
};

WalletController.prototype.validationErrorsInterceptor = function(alert_obj, formAlerts, $form){
	var isAddCard = $form.is('.add-card-form'); 
	var isEditCard = $form.is('.edit-card-form');
	if((isAddCard || isEditCard ) && !(formAlerts['pan']) && formAlerts['circuitName']) {
		formAlerts['pan'] =  formAlerts['circuitName'];
	} else if (isEditCard) {
		 var prevDate = $form.find('input[name="expiryDate"]').data("pre-value");
		 var presDate = $form.find('input[name="expiryDate"]').val();
		 if(prevDate !== presDate) {
			 var cvv = $form.find('input[name="cvv"]').val();
			 cvv && up_validator_util.REGEXP.CARD_CVV.test(cvv) ? delete formAlerts['cvv'] : formAlerts['cvv'] = "Inserici un CVV valido";
		 } else {
			delete formAlerts['cvv'];
		 }
	}

	if(_.size(formAlerts) == 0){
		return false;
	}
	this.renderValidationErrors(alert_obj, formAlerts, $form);
};

WalletController.prototype.editCard = function($form, prevDate, isPreferredChecked) {
	var thisObj = this;
    var alertObj = thisObj.getAlertInstance({isForm: true, isOverlay: true}); 
    var json = serializeObject($form);
    json['pastExpiryDate'] = prevDate;
    var pan = $form.find('input[name="pan"]').val();
    var paymentId = $form.find('input[name="paymentMethodId"]').val();
    var prevCard = _.find(thisObj.cardList, function(card){
    	return paymentId === card.paymentMethodId;
    });
    console.log(pan.substring(12, 16)+ " prev card 4 digits " + prevCard.last4Digits);
    if(prevCard.last4Digits !== pan.substring(12, 16)) {
    	up_common.renderValidationError($form.find('div:has(input[name="pan"])'), "pan", "Le ultime cifre della carta non coincidono", $form);
    	return false;
    }
    console.log(prevDate);
    
    if(isPreferredChecked) {
    	json["prefferedCardChecked"] = true;
    } else {
    	json["prefferedCardChecked"] = false;
    }
    delete json["prefferedCard"];
    json = JSON.stringify(json);
    console.log(json);
    
    var request_done = function( response ) {
    	if(response.statusCode==="UPWE-0026"){
			thisObj.verifyByVisa(response.data);
		}
    };

    var config = {
        url: thisObj.validateEditCardUrl,
        contentType: UPWEB.JSON, 
        data: json,
        type: thisObj.methodPost
    },
    app_config = {
        name :  UP_Qualifiers.editCard,
        scope:  thisObj, 
        done :  request_done, 
        form :  $form, 
        alert:  alertObj
    };
    _.ajax(config, app_config);
};

WalletController.prototype.addCard = function(element) {
	var thisObj = this;
    var alertObj = thisObj.getAlertInstance({isForm: true, isOverlay: true}); 
    var $form = $("#add-card-form-id");
    var json = serializeObject($form);
    var isPreferredChecked = $form.find('input[name="prefferedCard"]').prop( "checked" );
    if(isPreferredChecked) {
    	json["prefferedCardChecked"] = true;
    } else {
    	json["prefferedCardChecked"] = false;
    }
    delete json["prefferedCard"];
    json = JSON.stringify(json);
    
    var request_done = function( response ) {
    	if(response.statusCode==="UPWE-0026"){
			thisObj.verifyByVisa(response.data);
		} else {
			up_common.loadPageWithUrl("/upweb/card/checkTransaction3DVerified");
		}
    };

    var config = {
        url: thisObj.validateCardURL,
        contentType: UPWEB.JSON,
        data: json,
        type: thisObj.methodPost
    },
    app_config = {
        name :  UP_Qualifiers.addCard,
        scope:  thisObj, 
        done :  request_done, 
        form :  $form, 
        alert:  alertObj
    };
    _.ajax(config, app_config);
};

WalletController.prototype.verifyByVisa = function(transactionDetails) {
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

WalletController.prototype.removeCard = function(element) {
    var thisObj = this;
    var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnSuccess: true, isOverlay: true}); 
    var $element = $(element);
    var key = $element.data('meta');
    var $form = $("form#edit-card-form-" + key);
    var cardID = $form.data('paymentmethod-id');  
    var isPreferredChecked = $form.find('input[name="prefferedCard"]').prop( "checked" );
    $("#confirm-modal.card-delete").remove();
    var request_done = function( response ) {
        thisObj.requestDoneInterceptor(response, function(){
            thisObj.getCards();
            $('#modal-edit-cards').modal('hide');
            console.log("Remove Card Done. Data:" + response);
        }, [isPreferredChecked, thisObj.REMOVE, cardID, $form]);
    };

    var config = {
        url: thisObj.removeCardUrl,
        data: 'cardid='+ cardID,
        type: thisObj.methodPost,
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done, 
        form:   $form, 
        alert:  alertObj
    };
    _.ajax(config, app_config);
};

WalletController.prototype.setPreferredCard_ = function(response, addOrRemove) {
    if(response) {
        if(response.statusMsg === "OK")
        {
            $("#profilocarteDiv").data('preferred-card', addOrRemove ? response.data : 0);
        }
    }
};

WalletController.prototype.setPreferredCard = function(cardID, cbk, $form) {
    var thisObj = this;
    var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnSuccess: true, isOverlay: true}); 

    var request_done = function( response ) {
        thisObj.setPreferredCard_(response, true);
    };
    var config = {
        url: thisObj.setPreferredCardUrl,
        data: 'cardid='+ cardID,
        type: thisObj.methodPost
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done,
        form: $form,
        alert:  alertObj
    };
    var request = _.ajax(config, app_config);

    request.always(function(  ) {
    	cbk();
    });
};

WalletController.prototype.removePreferred = function(cbk, $form, method) {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnSuccess: !(method === thisObj.REMOVE), isOverlay: true});
    var request_done = function( response ) {
        var cardId = response.data;
        thisObj.setPreferredCard_(response, false);
    };
    var config = {
        url: thisObj.removePreferredCardUrl,
        type: thisObj.methodPost
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done,
        form: $form,
        alert:  alertObj
    };
    var request = _.ajax(config, app_config);
    request.always(function(  ) {
    	cbk();
    });
};
var walletController = new WalletController();

$(function() {
	$('#add-card-form-id input[type=password], #add-card-form-id input[name=fake_password]').val('');
    walletController.printCards = _.template($('#cardsTemplate').html());
    walletController.printEditCards = _.template($("#editCardsTemplate").html());
    $(document.body).on('click', '.edit-card-btn', function(e) {
        var $element = $(this);
        var $form = $element.closest("form.edit-card-form");
        var prevDate = $form.find('input[name="expiryDate"]').data("pre-value");
        var presDate = $form.find('input[name="expiryDate"]').val();
        var isPreferredChecked = $form.find('input[name="prefferedCard"]').prop( "checked" );
        if(presDate.length == 5 && prevDate !== presDate) {
        	walletController.editCard($form, prevDate, isPreferredChecked);
        } else if(presDate.length == 5){
        	var cardID = $form.data('paymentmethod-id');  
        	walletController.requestDoneInterceptor(null, function() {
        		walletController.getCards();
	            $('#modal-edit-cards').modal('hide');
	            console.log("Editing Card Done.");
	        }, [isPreferredChecked, walletController.EDIT, cardID, $form]);
        } else {
        	console.log("Throw Validation error for the expiry date");
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    });

    $("#add-card-btn").on('click', function(e){
        walletController.addCard(this);
        e.stopPropagation();
        e.preventDefault();
        return false;
    });
    $(document.body).on('click', '#confirm-modal.card-delete .positive', function(e) {
        walletController.removeCard(this);
        e.stopPropagation();	
        e.preventDefault();
        return false;
    });

    $(document.body).on("keyup", 'input[name="expiryDate"]', function(e) {
    	var $this = $(this);
		var value = $this.val();
		var preVal = $this.data('pre-value');
		var $form = $this.parents('.edit-card-form');
		var $inputDivs = $form.find('.pan-div, .cvv-code-parent');
		
		var addOrRemove = (value.length == 5 && value != preVal); 
		$inputDivs.toggleClass('hide-it', !addOrRemove);
		if(addOrRemove) {
			$inputDivs.find('input.cvc-code, input.pan').val('');
		}
		up_common.updateBSModal(null, $form);
    });
	
    var doKeyUp = false, panKeyDown = false, panCutOrPasted = false, panCutted = false, panPasted = false;
	$(document.body).on("keyup", ".edit-card-code", function(e) {
		if (doKeyUp) {
			var $this = $(this);
            var value = $this.val();
            var $thisparent = $this.parents('.edit-card-form');
            var $code1 = $thisparent.find('.code-1');
            var $code2 = $thisparent.find('.code-2');
            var $code3 = $thisparent.find('.code-3');
            var $code4 = $thisparent.find('.code-4');

			if (value.length == 0) {
				$code1.html("****");
				$code2.html("****");
				$code3.html("****");
				$code4.html($code4.data('code-4'));
			} else {
				$code1.html(value.substring(0, 4));
				$code2.html(value.substring(4, 8));
				$code3.html(value.substring(8, 12));
				$code4.html(value.substring(12, 16));
			}
		}
		panKeyDown = false;
	}).on("keydown", ".edit-card-code", function(e) {
		var limit = 16;
		panKeyDown = doKeyUp = true;
		var $this = $(this);
		var value = $this.val();
		
		if( (value.length === 0 || doGetCaretPosition(this) === 0) && isDigitKey(e) && !isValidCardNumKey(e)) {
		    up_common.renderValidationError($this.parent(), this.name, "Insericsci una carta VISA o MasterCard", $this.parents('form'));
		    e.stopPropagation();
		}
		if ((value.length === 1 && !(parseInt(value[0]) === 4 || parseInt(value[0]) === 5 || isAllowedInputNavKey(e))) || 
			(!(value.length < limit && (isDigitKey(e) || isAllowedInputNavKey(e))) &&
			!(value.length === limit && isAllowedInputNavKey(e)) )) {
			doKeyUp = (value.length === limit && isDigitKey(e));
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}).on("paste cut", ".edit-card-code", function(e) {
		panCutOrPasted = true;
		panCutted = e.type === 'cut';	
		panPasted = e.type === 'paste';
	}).on("input", ".edit-card-code", function(e) {
		console.log("event:" + e.type);
		if(!panKeyDown && isExist(up_validator_util)) {
			var $this = $(this);
			var value = $this.val();
			var $form = $this.closest('form');
			var isNotValidNum  = up_validator_util.notNumber(value);
			var isNotValidPan  = up_validator_util.notCardNumber(value);
			if(isNotValidNum || isNotValidPan) {
				 var formAlerts = {};
				 formAlerts[this.name] = (isNotValidNum ? "Inserisci solo numeri" : "Inserisci un numero di carta valido: massimo 16 cifre" ); //up_validator_cnf.cnf["pan"].
				 up_common.renderValidationErrors(null, formAlerts, $form);
				 if(isNotValidNum) {
					 $(this).val("");
				 } else {
					 $(this).val(value.substring(0, 16));
				 }
			} else {
				up_common.removeFormErrors($form);
			}
			panCutOrPasted = false;
			doKeyUp = true;
			$this.trigger('keyup');
		} else {
			panKeyDown = false;
		} 
	});
	
	$(document.body).on('slid.bs.carousel', '#edit-cards-carousel', function(e) {
		var $this = $(this);
		var $forms = $this.find('form'); 
		up_common.clearForm($forms);
		if( $forms ) {
			doKeyUp = true;
			$forms.find('input[name="expiryDate"], .edit-card-code').trigger('keyup');
		}
	}).on('slide.bs.carousel', '#edit-cards-carousel', function(e) {
		$(".popover").popover("hide");
	});
	
    $("#modal-edit-cards").on('shown.bs.modal', function (e) {
    	doKeyUp = true;
    	var $modal = $(this);
    	$(".item.active", $modal).find('input[name="expiryDate"], .edit-card-code').trigger('keyup');
	}).on('hidden.bs.modal', function (e) {
    	$("#confirm-modal").remove();
	});
    
});
