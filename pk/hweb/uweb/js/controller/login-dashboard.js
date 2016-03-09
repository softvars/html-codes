var LoginDashboardController = function()
{
	LoginController.call(this);
	//this.invalidateSessionUrl = "/upweb/session/invalidate";
};

LoginDashboardController.prototype = Object.create(LoginController.prototype);
LoginDashboardController.prototype.constructor = LoginDashboardController;

/*
 * We are commented this since we are not used it right now.
 * LoginDashboardController.prototype.invalidateSession = function(){
    var thisObj = this;
    var request_done = function(response) {
        $("body").trigger("invalidate_session_done");
    };
  
    var config = {
    	url: thisObj.invalidateSessionUrl,
        type: "POST"
    },
    app_config = {
        scope:  thisObj,
        done :  request_done
    };
    var request = _.ajax(config, app_config);
    request.always(function(){
       $('#registration-success-alert').hide();
    });
};
*/

/*
 * We are commented this since we are not used it right now.
 * LoginDashboardController.prototype.bindSessionInvalidate = function(){
	var thisObj = this;
	$('#close-registration-success').on('click', function(){
		thisObj.invalidateSession();
    });
};*/

LoginDashboardController.prototype.showRegSuccessAlert = function() {
	$('#registration-success-alert').removeClass('hide-it').show();
	//this.bindSessionInvalidate();
};

var loginDashboardController = new LoginDashboardController();

$(function() {
    $(document.body).off('click', "#do-login-on-registration-success:has(a)");
    $(document.body).on('click', "#do-login-on-registration-success:has(a)", function(e){
        if(e.target && e.target.tagName != 'A') {
            var $this = $(this);
            $this.off('click');
            $('a', $this).click();
            window.location.href = $this.find("a").first().attr("href");
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    });
    
    $(document.body).off('click', '#do-login-on-registration-successc a');
    $(document.body).on('click', '#do-login-on-registration-successc a', function(e){
        $(this).on('click', function(e){
            $(this).off('click');
			e.stopPropagation();
	        e.preventDefault();
	        return false;
		});
		$('#registration-success-alert').addClass('hide-it');
		if(typeof up_common !== "undefined") {
			  up_common.spinnerOverlay(true);
		}
	});
});