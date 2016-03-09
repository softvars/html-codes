var UP_VALIDATOR_CONFIG = function() {

	/* Rule Keys */
	this.k = {
		REQUIRED 	: 'REQUIRED',
		CONTAINS 	: 'CONTAINS',
		EMAIL 	 	: 'EMAIL',
		NUMBER 	 	: 'NUMBER',
		CARD_NUMBER	: 'CARD_NUMBER',
		CARD_CVV	: 'CARD_CVV_NUMBER',
		STR_LENGTH	: 'STRING_LENGTH',
		STR_MAX		: 'STRING_MAX',
		STR_MIN		: 'STRING_MIN',
		STR_RANGE	: 'STRING_RANGE',
		D_EXPIRED	: 'EXPIRED_DATE',
		D_EXP_FORMAT: 'EXPIRY_DATE_FORMAT',
		EQUALS		: 'EQUALS',
		NOT_EQUALS	: 'NOT_EQUALS',
		ALPHANUMERIC: 'ALPHANUMERIC',
		MOBILE_NUMBER: 'MOBILE_NUMBER',
		COUNTRY_CODE:  'COUNTRY_CODE',
		CODICE_FISICALE: 'CODICE_FISICALE',
		COUNTRY_CODE_MOBILE_NUMBER: 'COUNTRY_CODE_MOBILE_NUMBER',
		STRING		:	'STRING',
		BUYER_NAME : "BUYER_NAME",
		NOT_SELECTED : "NOT_SELECTED",
		DATE : "DATE",
	};

	/* Rules */
	this.r = {};
	this.r[this.k.REQUIRED] 	= ['emptyString',	_.template("Please provide the <@= fieldName @>")];
	this.r[this.k.CONTAINS] 	= ['notContains',	_.template("Please provide valid <@= fieldName @>")];
	this.r[this.k.EMAIL]    	= ['notEmail',		"Please provide a valid email"];
	this.r[this.k.NUMBER]	 	= ['notNumber',    	_.template("<@= fieldName @> should be a numeric")];
	this.r[this.k.CARD_NUMBER]	= ['notCardNumber',	"Please provide a valid Card Number, allowed 16 digits only"];
	this.r[this.k.CARD_CVV]		= ['notCVVNumber',	"Please provide a valid CVV, Allowed 3 or 4 digits only"];
	this.r[this.k.STR_LENGTH]	= ['invalidLength',	_.template("Length should be <@= args.size @>")];
	this.r[this.k.STR_MAX]		= ['tooLong', 		_.template("Length can't be more than <@= args.max @>")];
	this.r[this.k.STR_MIN]		= ['tooShort', 	    _.template("Length can't be less than <@= args.min @>")];
	this.r[this.k.STR_RANGE]	= ['notInRange', 	_.template("Length can't be less than <@= args.min @> or more than <@= args.max @>")];
	this.r[this.k.D_EXPIRED] 	= ['expiredDate', 	"Please provide a valid Expiry Date"];
	this.r[this.k.D_EXP_FORMAT]	= ['invalidExpiryDateFormat', "Please provide a valid Expiry Date"];
	this.r[this.k.EQUALS]		= ['notEquals', _.template("<@= fieldName @> should be equal to <@= args.toLabel @>")];
	this.r[this.k.NOT_EQUALS]   = ['equals', _.template("<@= fieldName @> should be different from <@= args.toLabel @>")];
	this.r[this.k.ALPHANUMERIC] = ['alphanumeric', "Password must be alphanumeric"];
	this.r[this.k.MOBILE_NUMBER]= ['notMobileNumber', "Mobile number invalid"];
	this.r[this.k.COUNTRY_CODE] = ['notCountryCode', "Country code invalid"];
	this.r[this.k.CODICE_FISICALE] = ['notCodiceFiscale', 'Please provide valid codice fiscale'];
	this.r[this.k.COUNTRY_CODE_MOBILE_NUMBER] = ['notMobileNumberWithCountryCode', 'Please provide valid mobile number'];
	this.r[this.k.STRING]		= ['notString', "Inserisci solo lettere"];
	this.r[this.k.BUYER_NAME]		= ['acceptItalyString', "Inserisci solo lettere"];
	this.r[this.k.NOT_SELECTED] = ['notSelected', _.template("Please select<@= fieldName @>")];
	this.r[this.k.DATE] = ['invalidDate', "Date is invalid"];

	/*	Validator Config
	 *  - key can be created with macro like "fieldName:(xxx)" instead just "fieldName" to create different constrains.    
	 *  - value can be another fieldName instead of a constrains array to get that fieldName's constrains
	 *  - In the constrain array, the string value is the label for that field., and the remaining are the constrains  
	 * */
	this.cnf = {
		"title"	: [
		       	   'Title', 		
		       		{rule: this.k.REQUIRED, msg: "Inserisci un titolo" }, 
		       		{rule: this.k.STR_MAX, args: {max: 50}, msg: "Inserisci al massimo 50 caratteri" },
		       		{rule: this.k.STR_MIN, args: {min: 2}, msg: "Inserisci un oggetto più lungo" } ], // 50 ?
		       		
		"message"	: [
		         	'Message', 		
		         	{rule: this.k.REQUIRED, msg: "Inserisci un testo" },
		         	{rule: this.k.STR_MAX, args: {max: 2000}, msg: "Inserisci al massimo 2000 caratteri" },
		         	{rule: this.k.STR_MIN, args: {min: 2}, msg: "Inserisci un testo più lungo" } ],
		         	   
		"firstName"	: 
					['First Name', 	
					{rule: this.k.REQUIRED, msg: "Insericio il tuo nome" }, 
					this.k.BUYER_NAME,  
					{rule: this.k.STR_MAX, args: {max: 50}, msg: "Il nome non può superare 50 caratteri" }],
					
		"lastName"	: 
					['Last Name', 	
					{rule: this.k.REQUIRED, msg: "Inserisci il tuo cognome" }, 
					this.k.BUYER_NAME,  
					{rule: this.k.STR_MAX, args: {max: 50}, msg: "Il cognome non può superare 50 caratteri" }],
					
		"cardAlias"	: 
					["Card Alias", 	
					{rule: this.k.REQUIRED, msg: "Inserisci un alias per la carta"},  
					{rule: this.k.STR_MAX, args: {max: 50}, msg: "L'alias non può superare i 50 caratteri" } ],
					
		"circuitName": 
					["Card Type", 	
					{rule: this.k.CONTAINS, args: {list:["visa", "mastercard"]}, msg:"Inserisci un tipo carta valito" }],
					
		"pan"		: 
					["Card Number", 	
					{rule: this.k.REQUIRED, msg:"Inserisci il numero di carta" },
					{rule: this.k.NUMBER, msg: "Inserisci solo numeri" },
					{rule: this.k.CARD_NUMBER, msg: "Inserisci un numero di carta valido: massimo 16 cifre" }],
					
		"expiryDate": 
					['Expiry Date', 	
					{rule: this.k.REQUIRED, msg: "Inserisci la data scadenza" }, 
					{rule: this.k.D_EXP_FORMAT, msg: "Inserisci una data scadenza valida" }],
					
		"cvv"		: 
					['CVV', 			
					{rule: this.k.REQUIRED, msg: "Inserisci il CVV" }, 
					{rule: this.k.NUMBER, msg: "Il CVV deve essere numerico" },
					{rule: this.k.CARD_CVV, msg: "Inserici un CVV valido" }],
					
		"acn"		: 
					['Mobile Number', 
					{rule: this.k.REQUIRED, msg: "Inserisci il numero di cellulare" }, 
					{rule: this.k.COUNTRY_CODE_MOBILE_NUMBER, msg: "Il numero di cellulare non è valido" }
					/*, {rule: this.k.STR_RANGE, args: {min: 8, max: 15} }*/],
					
		"street"	: 
					['street', 		
					{rule: this.k.REQUIRED, msg: "Inserisci un indirizzo" }, 
					{rule: this.k.STR_MAX, args: {max: 50}, msg: "Inserisci al massimo 50 caratteri" } ],
					
		"prov"		: 
					['Provincia', 	
					{rule: this.k.REQUIRED, msg: "Inserisci la provincia" }, 
					{rule: this.k.STR_MAX, args: {max: 50}, msg: "Inserisci al massimo 50 caratteri" }],
					
		"city"		: 
					['Citta', 		
					{rule: this.k.REQUIRED, msg:"Inserisci la città" }, 
					{rule: this.k.STR_MAX, args: {max: 50}, msg:"Inserisci al massimo 50 caratteri" }],
					
		"zip"		: 
					['Cap', 			
					{rule: this.k.REQUIRED, msg: "Inserisci il CAP" }, 
					{rule: this.k.STR_MAX, args: {max: 50}, msg:"Inserisci al massimo 50 caratteri" }],
					
		"password"	: 
					['Password',		 
					{rule: this.k.REQUIRED, msg: "Inserisci una password" }, 
					{rule: this.k.ALPHANUMERIC, msg: "La password deve contere numeri e lettere" }, 
					{rule: this.k.STR_LENGTH, args: {size: 8}, msg: "La password deve essere di 8 caratteri" }],
					
		"confirmPassword" : 
					['Confirm Password', 
					{rule: this.k.REQUIRED, msg: "Conferma la password" }, 
					{rule: this.k.ALPHANUMERIC, msg: "La password deve contere numeri e lettere" }, 
					{rule: this.k.STR_LENGTH, args: {size: 8}, msg: "La password deve essere di 8 caratteri" }, 
					{rule: this.k.EQUALS, args: {to: "password", toLabel:"Password"}, msg:"Controlla di aver inserito la stessa password" }],
					
		"oldPassword" : 
					['Old Password', 
					this.k.REQUIRED, 
					this.k.ALPHANUMERIC, 
					{rule: this.k.STR_LENGTH, args: {size: 8}}, 
					{rule: this.k.NOT_EQUALS, args: {to: "password",toLabel:"New Password"}}],
		
		"securityAnswerOne"	: 
					['Answer', 
					{rule: this.k.REQUIRED, msg: "Inserisci una risposta" }, 
					{rule: this.k.STR_RANGE, args: {min: 1, max: 30}, msg:"La lunghezza deve essere compresa tra 1 e 30 caratteri" }],
					
		"securityAnswerTwo"	: 
					['Answer', 
					{rule: this.k.REQUIRED, msg: "Inserisci una risposta" }, 
					{rule: this.k.STR_RANGE, args: {min: 1, max: 30},  msg: "La lunghezza deve essere compresa tra 1 e 30 caratteri" }],
					
		"smsOTP"	: ['OTP', {rule: this.k.REQUIRED, msg: "Inserire codice" }],
		
		//"birthDate"	: ['Birth Date', {rule: this.k.REQUIRED, msg: "Inserisci la data di nascita" }],
		
		"cfrOne"	: ['cfrOne', {rule: this.k.REQUIRED, msg: "Inserisci le cifre mancanti" }],
		
		"cfrTwo"	: "cfrOne",
		
		"cfrThree"	: "cfrOne",
		
		"cfrFour"	: "cfrOne",
		
		"alias"		: "cardAlias",
		
		"afn"		: "firstName",
		
		"aln"		: "lastName",
		
	    "mobileNumber": 
	    			['Mobile Number', 
	    			{rule: this.k.REQUIRED, msg: "Inserisci il numero di cellulare" },
	    			{rule: this.k.MOBILE_NUMBER, msg: "Il numero di cellulare non è valido" }, 
	    			{rule: this.k.STR_RANGE, args: {min: 6, max: 15}, msg:"La lunghezza deve essere compresa tra 6 e 15 caratteri" }],
	    
	    "captcha"	: ['Captcha', {rule: this.k.REQUIRED, msg: "Inserisci il codice captcha" }],
	    
	    "email"		: 
	    			['Email', 
	    			{rule: this.k.REQUIRED, msg:"Inserisci l'email" }, 
	    			{rule: this.k.EMAIL, msg:"Inserisci un indirizzo e-mail valido" }],
	    
	    "emailOTP"	: "smsOTP",
	    
	    "securityQuestionOne" : 
	    			["Security Question", 
	    			{rule: this.k.REQUIRED, msg: "Scegli una domanda di sicurezza" }, 
	    			{rule: this.k.NOT_SELECTED, msg: "Scegli una domanda di sicurezza" }],
	    			
	    "securityQuestionTwo" : "securityQuestionOne",
	    
	    "countryCode":
	    			["Country Code", 
	    			{rule: this.k.REQUIRED, msg: "Inserici il prefisso internazionale" },
	    			{rule: this.k.COUNTRY_CODE, msg: "Prefisso internazionale invalido" }],
	    
	    "taxCode" : 
	    			["Codice Fiscale", 
	    			{rule: this.k.REQUIRED, msg: "Inserisci il codice fiscale" },
	    			{rule: this.k.CODICE_FISICALE, msg: "Inserisci un codice fiscale valido" }, 
	    			{rule: this.k.STR_LENGTH, args: {size: 16}, msg: "Il codice fiscale deve essere di 16 caratteri" }],
	    
	    "mobileNumerwithCountryCode" : 
	    			["Mobile Number", 
					{rule: this.k.REQUIRED, msg: "Inserisci il numero di cellulare" }, 
					{rule: this.k.COUNTRY_CODE_MOBILE_NUMBER, msg: "Il numero di cellulare non è valido" }],
	    			
	    "UserId" : "email",
		"Password"	:  ['Password', {rule: this.k.REQUIRED, msg: "Inserisci una password" }],
		"answerOne" : "securityAnswerOne",
		"answerTwo" : "securityAnswerTwo",
		
		"birthDate" : 
					['Date ', 
					{rule: this.k.REQUIRED, msg: "Inserisci la data di nascita" },
					this.k.DATE]
	};
	
	this.form_cnf = {};
	this.form_cnf[UP_Qualifiers.doLogin]	= ["UserId", "Password"];
	this.form_cnf[UP_Qualifiers.sendMailToSupport]	= ["title", "message"];
	this.form_cnf[UP_Qualifiers.editProfile]	= ["firstName", "lastName", "birthDate"/* "taxCode"*/];
	this.form_cnf[UP_Qualifiers.editProfileWithTaxCode] = ["firstName", "lastName", "birthDate", "taxCode"];
	this.form_cnf[UP_Qualifiers.addAddress]		= ["alias", "afn", "aln", "street", "prov", "city", "zip", "acn"];
	this.form_cnf[UP_Qualifiers.editAddress]	= UP_Qualifiers.addAddress;
	this.form_cnf[UP_Qualifiers.addCard]		= ["cardAlias", "pan", "circuitName", "firstName", "lastName", "expiryDate", "cvv"];
	this.form_cnf[UP_Qualifiers.editCard] 		= ["cardAlias", "pan", "expiryDate", "cvv"];
	this.form_cnf[UP_Qualifiers.validateCaptchaAndEmail]	= ["email", "captcha"];
	this.form_cnf[UP_Qualifiers.addUserProfile] = ["firstName", "lastName", "countryCode", "mobileNumber", "birthDate", "password", "confirmPassword","securityQuestionOne", "securityAnswerOne", "securityQuestionTwo", "securityAnswerTwo"];
	this.form_cnf[UP_Qualifiers.addUpMobileUserProfile] = ["firstName", "lastName", "countryCode", "mobileNumber", "password", "confirmPassword","securityQuestionOne", "securityAnswerOne", "securityQuestionTwo", "securityAnswerTwo", "taxCode"];
	this.form_cnf[UP_Qualifiers.validateSmsOTP] = ["smsOTP"];
	this.form_cnf[UP_Qualifiers.validateMaskedPan] = ["cfrOne","cfrTwo","cfrThree","cfrFour"];
	this.form_cnf[UP_Qualifiers.validateTokens]	= ["smsOTP", "emailOTP"];
	this.form_cnf[UP_Qualifiers.validateCard] = ["cardAlias", "circuitName", "expiryDate", "cvv"];
	this.form_cnf[UP_Qualifiers.changePassword] = ["password", "confirmPassword", "oldPassword"];
	this.form_cnf[UP_Qualifiers.forgetPasswordUnblockPin] = ["password", "confirmPassword", "answerOne", "answerTwo"];
	this.form_cnf[UP_Qualifiers.forgetPasswordCaptchaAndEmail]	= ["email", "captcha"];
	this.form_cnf[UP_Qualifiers.validateMaskedPanWithAlias]	= ["cfrOne","cfrTwo","cfrThree","cfrFour","cardAlias"];
};

var up_validator_cnf = new UP_VALIDATOR_CONFIG();

var isExist = isExist || function(obj) {
    return typeof obj !== "undefined" && obj !== void 0;
};

var UP_VALIDATOR_UTIL = function() {
	var thisObj = this;
	this.REGEXP = {
		NUMBER: /^\d+$/,
		CARD_NUMBER: /^[45][\d]{15}$/,
		CARD_CVV: /^[\d]{3,4}$/,
		EMAIL: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		EXPIRY_DATE: /^((0[1-9])|(1[0-2]))\/[0-9]{2}$/,
		DATE:/^((0[1-9])|([1-2][0-9])|(3[0-1]))\/((0[1-9])|(1[0-2]))\/[1-2][0-9]{3}$/,
		FIELD_NAME_MACRO : /[:][\(][^\)]*[\)]$/,
		ALPHA_NUMERIC: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
		NOT_NUMBER: /^[^\d]+$/,
		NOT_ALPHA: /^[^a-z]+$/i,
		MOBILE_NUMBER: /^[0-9]{6,15}$/,
		COUNTRY_CODE: /[\+][0-9]{2,4}/,
		FULL_MOBILENUMBER: /^[\+]?([0-9]{1,20})$/,
		STRING: /^[a-zA-Z]+$/,
		BUYER_NAME: /^[a-zA-ZÀÁÈÉÌÍÒÓÙÚàáèéìíòóùú' ]+$/
	};

	this.emptyString = function(val) {
		return !(_.isString(val)) || val.trim().length === 0;
	};
	
	this.invalidLength = function(val, args) {
		var args = args || {};
		var toRet = true, size = args.size;
		if(_.isString(val) && isExist(size)) {
			var length = (val.trim().length === 0) ? 0 : val.length;
			toRet = length !== Number(size);
		}
		return toRet;
	};
	
	this.tooLong = function(val, args) {
		var args = args || {};
		var toRet = true, max = args.max;
		if(_.isString(val) && isExist(max)) {
			var length = (val.trim().length === 0) ? 0 : val.length;
			toRet = length > Number(max);
		}
		return toRet;
	};
	
	this.tooShort = function(val, args) {
		var args = args || {};
		var toRet = true, min = args.min;
		if(_.isString(val) && isExist(min)) {
			var length = (val.trim().length === 0) ? 0 : val.length;
			toRet = length < Number(min);
		}
		return toRet;
	};
	
	this.notInRange = function(val, args) {
		var args = args || {};
		var toRet = true, min = args.min, max = args.max;
		if(_.isString(val) && (isExist(min) || isExist(max))) {
			var length = (val.trim().length === 0) ? 0 : val.length;
			toRet = length < Number(min) || length > Number(max);
		}
		return toRet;
	};

	this.equals = function(val, args) {
		var args = args || {};
		var toRet = true, fieldName = args.to, $form = args.$form;
		if(_.isString(val) && isExist(fieldName)) {
			var fieldVal = $form.find('[name="'+fieldName+'"]').val();
			toRet = fieldVal === val;
		}
		return toRet;
	};
	
	this.notEquals = function(val, args) {
		var args = args || {};
		var toRet = true, fieldName = args.to, $form = args.$form;
		if(_.isString(val) && isExist(fieldName)) {
			var fieldVal = $form.find('[name="'+fieldName+'"]').val();
			toRet = fieldVal !== val;
		}
		return toRet;
	};
	
	this.notCardNumber = function(val) {
		return !(thisObj.REGEXP.CARD_NUMBER.test(val));
	};
	
	this.notCVVNumber = function(val) {
		return !(thisObj.REGEXP.CARD_CVV.test(val));
	};
	
	this.notEmail = function(val) {
	    return !(thisObj.REGEXP.EMAIL.test(val));
	};
	
	this.notNumber = function(val) {
	    return !(thisObj.REGEXP.NUMBER.test(val));
	};
	
	this.notContains = function(val, args) {
		var args = args || {};
		var list = args.list;
		var toRet = !isExist(list) || _.indexOf(list, val) === -1;
	    return toRet;
	};
	
	this.expiredDate = function(val) {
		var toRet = false;
		return toRet;
	};
	
	this.invalidExpiryDateFormat = function(val) {
		return !(thisObj.REGEXP.EXPIRY_DATE.test(val));
	};
	
	this.alphanumeric = function(val) {
		return !(thisObj.REGEXP.ALPHA_NUMERIC.test(val));
	};
	
	this.notMobileNumber = function(val) {
		return !(thisObj.REGEXP.MOBILE_NUMBER.test(val));
	};
	
	this.notCountryCode = function(val) {
		return !(thisObj.REGEXP.COUNTRY_CODE.test(val));
	};
	
	this.notCodiceFiscale = function(val) {
		if(!thisObj.emptyString(val)) {
			return thisObj.alphanumeric(val);
		}
		/*return false;*/
	};
	
	this.notMobileNumberWithCountryCode = function(val) {
		return !(thisObj.REGEXP.FULL_MOBILENUMBER.test(val));
	};
	
	this.notString = function(val) {
		return !(thisObj.REGEXP.STRING.test(val));
	};
	this.acceptItalyString = function(val) {
		return !(thisObj.REGEXP.BUYER_NAME.test(val));
	};
	this.notSelected = function(val) {
		return "default" === val ? true : false; 
	};
	this.invalidDate = function(val) {
		if(thisObj.REGEXP.DATE.test(val)) {
			var dateParts = val.split("/");
			var year = parseInt(dateParts[2]);
			if(!year || year < 1850 || year > (new Date()).getFullYear()) {
		          return true;
		     }
		} else {
			return true;
		}
	};
};

var up_validator_util = new UP_VALIDATOR_UTIL();

var UP_FORM_VALIDATOR = function(){

	this.valiateConstrain = function(fieldConstrain, fieldLabel, value, $form) {
		var msg = null, constrainName = null, params = {};
		params.fieldName = !isExist(fieldLabel) || fieldLabel == null ? '' : fieldLabel;
		
		if(_.isString(fieldConstrain)) {
			constrainName = fieldConstrain;  
		}
		else if(_.isObject(fieldConstrain) && !(_.isArray(fieldConstrain)) ) {
			constrainName = fieldConstrain.rule;
			if(fieldConstrain.args) {
				params.args = fieldConstrain.args;
				fieldConstrain.args['$form'] = $form;
			}
		}
		
		var constrain = up_validator_cnf.r[constrainName];
		if(isExist(constrain) && _.isArray(constrain)) {
			var validateFn =  up_validator_util[constrain[0]];
			if(_.isFunction(validateFn)) {
				var isError = validateFn(value, fieldConstrain.args);
				if(isError) {
					var msgTemplate = fieldConstrain.msg || constrain[1];
					msg = _.isFunction(msgTemplate) ? msgTemplate(params) : msgTemplate;
				}
			}
		}
		return msg;
	};
	
	this.validateFiled = function($form, validator_cnf_key, fieldName) {
		var msg = null;
		var fieldConfig = up_validator_cnf.cnf[validator_cnf_key];
		if(isExist(fieldConfig)){
			if(_.isArray(fieldConfig)) {
				var fieldLabel = fieldConfig[0];
				//var fieldVal = $form.find('input[name="'+fieldName+'"],textarea[name="'+fieldName+'"]').val();
				var fieldVal = $form.find('[name="'+fieldName+'"]').val();

				for(var i = 1 ; i < fieldConfig.length; i ++) {
					msg = this.valiateConstrain(fieldConfig[i], fieldLabel, fieldVal, $form);
					if(msg != null) break; 
				}
			} else if(_.isString(fieldConfig)) {
				msg = this.validateFiled($form, fieldConfig, fieldName);
			}
		}
	    return msg;
	};

	this.validate = function(app_config, alert_obj) {
	    var isErrors = false;
	    var app_config = app_config || {};
	    var form_config = null, qualifier_Key = app_config["name"];
	    if(qualifier_Key && (form_config = up_validator_cnf.form_cnf[qualifier_Key]) ) {
	    	while(form_config) {
			    if(_.isArray(form_config)) {
					var thisObj = this;
					var $form = app_config["form"];
				    var scope = app_config["scope"] || {}; 
				    var formAlerts = {};
				    
				    _.each(form_config, function(validator_cnf_key, idx) {
				    	var fieldName = validator_cnf_key.replace(up_validator_util.REGEXP.FIELD_NAME_MACRO, '');
				    	var errorMsg = thisObj.validateFiled($form, validator_cnf_key, fieldName);
				    	if(errorMsg != null) {
				    		formAlerts[fieldName] = errorMsg;
				    	}
				    });
				    
				    isErrors = _.size(formAlerts) > 0;
					if(isErrors) {
						 if(scope.validationErrorsInterceptor(alert_obj, formAlerts, $form) === false) {
							 isErrors = false;
						 }
					}
					form_config = null;
					break;
			    } else if(_.isString(form_config)) {
			    	form_config = up_validator_cnf.form_cnf[form_config];
				}
	    	}
	    }
	    return isErrors;
	};
};

var up_validator = new UP_FORM_VALIDATOR();
