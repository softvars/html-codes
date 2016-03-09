var LoginController = function() {
    BaseController.call(this);
};

LoginController.prototype = Object.create(BaseController.prototype);
LoginController.prototype.constructor = LoginController;

LoginController.prototype.methodPost = "POST";
LoginController.prototype.printCards = null;

var loginController = new LoginController();

$(function() {
	$(".login-form input[type='submit']").on('click', function(e){
		var isNotValid = false;
		var $form = $('.login-form');
		var alertObj = loginController.getAlertInstance({isForm: true});
		var config = {
			name :  UP_Qualifiers.doLogin, 
	        form :  $form, 
	        alert:  alertObj
		};
		isNotValid = loginController.validate(config, true);
		if(isNotValid) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		} else {
			$('.fake_password').remove();
		}
	});
});