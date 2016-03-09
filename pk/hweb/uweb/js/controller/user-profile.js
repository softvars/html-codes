var UserProfileController = function() {
	RegistrationController.call(this);
	this.URLPrefix = "/upweb/user/";
    this.linkcardtoprofileURL = this.URLPrefix + "linkcardtoprofile";
};

UserProfileController.prototype = Object.create(RegistrationController.prototype);
UserProfileController.prototype.constructor = UserProfileController;

UserProfileController.prototype.always_callback = function() {
	$(".field-error-message").html('');
	$("#error-message-div").html('');
};

UserProfileController.prototype.onBoardUser = function(updateProfile) {
	var thisObj = this;
	var alertObj = thisObj.getAlertInstance({
		isForm : true
	});
	var $form = $('form');
	var request_done = function(responseData) {
		if(UP_RESPONSE_CODE.SUCCESS === responseData.statusCode) {
			up_common.loadPageWithUrl("/upweb/register/registrationsuccess");
		}  
	};
	var config = {
		url : updateProfile,
		contentType : UPWEB.JSON,
		data : "",
		type : "GET"
    },
    app_config = {
        scope : thisObj,
		done : request_done,
		form : $form,
		alert : alertObj
    };
	var request = _.ajax(config, app_config);
	
	
};

var userProfileController = new UserProfileController();