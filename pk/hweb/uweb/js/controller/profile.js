var ProfileController = function()
{
    BaseController.call(this);
    this.URLPrefix = "/upweb/auth/profile/";
    this.getProfileUrl = this.URLPrefix +"get";
    this.changePasswordURL = this.URLPrefix +"changepassword";
    this.editProfileUrl = this.URLPrefix +"update";
    this.validateCodicefiscaleURL = "/upweb/user/getUserInfoByCodicefiscale";
    this.profile = null;
    this.printProfile = null;
    this.classNamesMap = {profilo:'profile', indirizzi: 'address', carte: 'cards'};
    this.classNames = _.values(this.classNamesMap);
    this.editBirthDate_picker = null;
    this.taxCode = null;
};

ProfileController.prototype = Object.create(BaseController.prototype);
ProfileController.prototype.constructor = ProfileController;

ProfileController.prototype.$datepicker_inputs = null;
ProfileController.prototype.datepicker_config = {
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

ProfileController.prototype.initDatepickers = function(){
	var $datepickers = $('.datepicker');
	if($datepickers.length && $datepickers.pickadate){
		this.$datepicker_inputs = $datepickers.pickadate(this.datepicker_config);
		this.editBirthDate_picker = this.$datepicker_inputs.filter('.birthDate__datepicker').pickadate('picker');
	}
};


ProfileController.prototype.initProfilePage = function() {
    var c = 'profile', h = up_common.hash;
    if(h) {
        c = this.classNamesMap[h];
        if (!c) {
            var idx =  _.indexOf(this.classNames, h);
            c =  idx > -1 ? this.classNames[idx] : (up_common.pageHashMap[up_common.hash] ? null : 'profile') ;
        }
    }
    if (c) {
        $("#profile-menu a."+c).trigger("load_profile_view");
    }
};

ProfileController.prototype.genderMap = {'M': 'Maschio' , 'F': 'Femmina'};

ProfileController.prototype.processProfileData = function(data) {
	var gender = this.genderMap[data.gender];
	if(_.isObject(data) && gender) {
		data.sex = gender;
	}
	return data;
};

ProfileController.prototype.getProfile = function() {
    var thisObj = this;
    var request_done = function(response) {
        thisObj.profile = thisObj.processProfileData(response.data);
        var userProfileHtml = thisObj.printProfile({userProfilePV:thisObj.profile});
        $("#profile-body-container").html(userProfileHtml);
    };
    var config = {
        url: thisObj.getProfileUrl
    },
    app_config = {
        scope:  thisObj, 
        done:   request_done
    };
    _.ajax(config, app_config);
};

ProfileController.prototype.editProfile = function() {
    var thisObj = this;
    var alertObj = thisObj.getAlertInstance({isForm: true, isOverlay: true});
    var $form = $('.edit-profile-form');
    var json = serializeObject($form);
    
    json.email = thisObj.profile.email;
    json.mobileNumber = thisObj.profile.mobileNumber;
    delete json["_submit"];
    json = JSON.stringify(json);
    var request_done = function(response) {
    	up_common.loadPageWithUrl("/upweb/auth/profile");
    };

    var config = {
        url: thisObj.editProfileUrl,
        contentType: UPWEB.JSON,
        data: json,
        type: "POST"
    },
    app_config = {
        scope:  thisObj, 
        done :  request_done, 
        form :  $form, 
        alert:  alertObj
    };
    if(thisObj.taxCode == null) {
    	app_config.name = UP_Qualifiers.editProfile;
    }
    _.ajax(config, app_config);
};
ProfileController.prototype.changePassword = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({isForm: true, isNotifiableOnSuccess: true, isOverlay: true});
	var $form = $('.change-password-form');
	var json = serializeObject($form);
	json = JSON.stringify(json);
	var request_done = function(response) {
		thisObj.renderFormAlert({description:"Password aggiornata con successo"}, $form, true);
	};
	var config = {
			url: thisObj.changePasswordURL,
			contentType: UPWEB.JSON,
			data: json,
			type: "POST"
	},
	app_config = {
			name :  UP_Qualifiers.changePassword,
			scope:  thisObj, 
			done :  request_done, 
			form :  $form, 
			alert:  alertObj
	};
	_.ajax(config, app_config);
};

ProfileController.prototype.updateBSModal = function($Modal, $element, extHeight){
	var $modal = $Modal || ($element && $element.closest ? $element.closest('.modal') : null ) ;
	if($modal && $modal.find) {
		var $modal_dialog = $modal.find('.modal-dialog');
		var $container_fluid = $modal.find('.container-fluid');
		$modal_dialog.css("height", $container_fluid.height() + (extHeight ? extHeight : 0));
	}
};

ProfileController.prototype.validate_codice_fiscale = function() {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({
		isForm : true,
		isClearForm:false
	});
	var $form = $('.edit-profile-form');
	var json = serializeObject($form);
	delete json["_submit"];
	json = JSON.stringify(json);
	var request_done = function(responseData) {
		$('#edit-date').val(responseData.data.birthDate);
		thisObj.editProfile();
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
		type : "POST"
	}, app_config = {
		name : UP_Qualifiers.editProfileWithTaxCode,
		scope : thisObj,
		done : request_done,
		fail : request_fail,
		form : $form,
		alert : alertObj
	};
	_.ajax(config, app_config);
};

var profileController = new ProfileController();
$(function() {
	profileController.initDatepickers();
    profileController.printProfile = _.template($('#profileTemplate').html());

    $("#profile-menu a, #drawer-menu a:not(.cards), #nav-bar-menu a:not(.cards)").off("click load_profile_view");
    $("#profile-menu a, #drawer-menu a:not(.cards), #nav-bar-menu a:not(.cards)").on("click load_profile_view", function(){
        var $this = $(this);
        var isProfile =  $this.hasClass("profile");
        var isAddress =  $this.hasClass("address");
        var isCards =  $this.hasClass("cards");
        if( !(isProfile || isAddress || isCards) )  return;

    	$('.content-wrap #msg-alert').addClass('hide-it');
        $('.profile-header, .profile-menu').show();
        if(up_common.detachedElmMap['container_main']) {
            $('.content-wrap .container.main').html(up_common.detachedElmMap['container_main']);
            up_common.detachedElmMap['container_main'] = null;
        }
        
        var $thisParent = $this.parent('li');
        if(!$thisParent.hasClass(UPWEB_CONST_ACTIVE)) {
            $("#profile-menu li.active, #drawer-menu li.active, #nav-bar-menu li.active").removeClass(UPWEB_CONST_ACTIVE);
            var selector = isProfile ? "a.profile,a.logged-user" : ( isAddress ? "a.address" : ( isCards ? "a.cards" : "") ) ;
            $("li:has("+selector+")").addClass(UPWEB_CONST_ACTIVE);
        }

        $("#profile-body-container").toggleClass('hide', !isProfile);
        $("#address-body-container").toggleClass('hide', !isAddress);
        $("#cards-body-container").toggleClass('hide', !isCards);

        $('title').html("WebWallet - " + $this.attr('title'));

        if(isProfile && isExist(profileController)) {
            profileController.getProfile();
        }
        else if(isAddress && isExist(addressController)) {
            addressController.getAddressList();
            addressController.getProvinces();
        }
        else if(isCards && isExist(walletController)) {
            walletController.getCards();
        }
    });

    $(document.body).on('click', '.edit-profile-form input[type=submit]', function(e) {
    	if(profileController.taxCode != null || $('.edit-profile-form #edit-cf').val().length > 0){
    		profileController.validate_codice_fiscale();
		}else {
			profileController.editProfile();
		}
        e.preventDefault();
        return false;
    });
    $(document.body).on('click', '#change_password_btn', function(e) {
    	profileController.changePassword();
    	e.preventDefault();
    	return false;
    });

	$(document.body).on('click', '#edit-profile', function(e) {
		var profile = profileController.profile;
		var $edit_profile_form = $('.edit-profile-form');
		$edit_profile_form.find('#edit-name').val(profile.firstName);
		$edit_profile_form.find('#edit-surname').val(profile.lastName);
		$edit_profile_form.find('#edit-gender').selectpicker('val', profile.sex);
		var $birthDateDiv = $edit_profile_form.find('#edit-date');
		$birthDateDiv.addClass("readonly");
		$birthDateDiv.attr('readonly', true);
		$birthDateDiv.siblings("img").remove();
		$birthDateDiv.val(profile.birthDate);
		if(profile.taxCode) {
			profileController.taxCode = profile.taxCode;
			$('.sesso_field').remove();
		} else {
			$('.sesso_field').show();
		}
		$edit_profile_form.find('#edit-cf').val(profile.taxCode);
		$edit_profile_form.find('#edit-accId').val(profile.accId);
	});
	
/*	$('#edit-cf').on('input paste', function () {
		if($('#edit-cf').val().length===16){
			//profileController.validate_codice_fiscale();
			profileController.editProfile();
		}else {
			var $form = $('.edit-profile-form');
			var formAlerts = {};
			formAlerts[this.name] = "Codice fiscale non valido";
			profileController.renderValidationErrors(null, formAlerts, $form);
		}
	});
	*/
    var $birthDate_picker = profileController.editBirthDate_picker;
    if($birthDate_picker) {
    	$birthDate_picker.on({
            open: function() {
                var birthDate = $('.edit-profile-form').find('#edit-date').val();
                if(birthDate && up_common.dateRegEx.test(birthDate)) {
                	$birthDate_picker.set('select', birthDate, { muted: true });
                }
            	profileController.updateBSModal(null, $('.edit-profile-form'), 70);
            },
            set: function(thingSet) {
                if(thingSet && (thingSet.hasOwnProperty('select') || thingSet.hasOwnProperty('clear') )) {
                    if(thingSet['select']) {
                    	$('.edit-profile-form').find('#edit-date').val($birthDate_picker.get());
                    }
                }
            }
        });
    }
    
    $(document.body).on('hide.bs.modal show.bs.modal', function (e) {
    	$(".popover").popover("hide");
	});
    profileController.initProfilePage();
});