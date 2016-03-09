/* Dependencies: underscore.js */

if(typeof _ !== "undefined")
{
    _.mixin({
        ajax: function(config, app_config){
            up_common.spinnerOverlay(true);

            var app_config = app_config || {};
        	var $form = app_config["form"];
            var scope = app_config["scope"] || {}; 
        	var alert_obj = app_config["alert"] || (_.isFunction(scope.getAlertInstance) ? scope.getAlertInstance() : {});
            var business_done = app_config["done"];
            var business_fail = app_config["fail"];
            var business_always = app_config["always"];

            up_common.removeFormErrors($form);

            var request_always = function(response){
        		if(_.isFunction(scope.always_callback)) {
        			scope.always_callback(response);
        		}
        		if(_.isFunction(business_always)) business_always(response);
                up_common.spinnerOverlay(false);
            };
           
            var request = {};
            var isErrors = up_validator.validate(app_config, alert_obj);
            if(isErrors !== false) {
            	request_always({});
            	request.done = function(){};
            	request.fail = function(){};
            	request.always = function(){};
            	return request;
            } else {
            	config.url = up_common.appendSecrandidParam(config.url);
             	request = $.ajax(config);
            }
            
            request.done(function(response) {
		        var isSuccess = response && response.statusMsg && response.statusMsg.toLowerCase() === UP_STATUS_MSG.OK;
		        var isNotifiable = _.isFunction(alert_obj.isNotifiable) ? alert_obj.isNotifiable(response) : alert_obj.isNotifiable;

		        if(_.isFunction(scope.notify) && isNotifiable) {
		        	scope.notify(alert_obj, isSuccess, response , $form);
		        }
		        if(isSuccess) {
		        	if(_.isFunction(business_done)) business_done(response);
		        	if(alert_obj.isOverlay) {
		        		var $modal = $form.parents(".modal");
		        		$modal.modal('hide');
		        	} else if($form && alert_obj.isClearForm){
		        		up_common.clearForm($form);
		        	}
		        } else {
		        	if(_.isFunction(business_fail)) business_fail(response);
		        }
           });

           request.fail(function( jqXHR, textStatus, errorThrown ) {
            	var res = {description: errorThrown};
            	if(alert_obj.isForm) {
            		scope.renderFormAlert(res, $form);
            	} else {
            		scope.renderAlert(res);
            	}
                console.log( "Error In Making Ajax Request, url:" + config.url +" ,textStatus: " + textStatus + ", errorThrown: " + errorThrown + ", jqXHR.readyState: " + jqXHR.readyState + ", jqXHR.status: " + jqXHR.status);
            });

           request.always(function(response){
                request_always(response);
           });

           return request;
        }
    });
}