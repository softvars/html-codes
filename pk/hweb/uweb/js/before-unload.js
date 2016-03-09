var PageUnloadController = function() {
    this.isBeforeUnload = false;
    this.waitingFlag = true;
    this.handlersTimerVar = null;
};

PageUnloadController.prototype.invalidateSession = function(cbk) {
	var url = "/upweb/session/invalidate";
	url = up_common !== "undefined" ? up_common.appendSecrandidParam(url) : url;
	$.ajax({
		url: url,
		type: "POST",
		complete: function(obj){
			cbk();
		},
		async : false
	});
};

PageUnloadController.prototype.removeUnloadHandlers = function(){
	$( window ).off('beforeunload');
	$( document ).off('beforeunload');
};

PageUnloadController.prototype.addUnloadHandlers = function(){
	var thisObj = this;
	$( window ).on('beforeunload', function(evt) {
		thisObj.isBeforeUnload = true;
	    var message = up_common.beforeunload_alertMessage || 'Your session will be closed';
	    if (typeof evt == 'undefined') {
	        evt = window.event;
	    }
	    if (evt) {
	        evt.returnValue = message;
	    }
	    console.log( "page before unload done!");
	    return message;
	});
};

PageUnloadController.prototype.pauseUnloadHandlers = function(){
	var thisObj = this;
	if(thisObj.handlersTimerVar) {
		clearTimeout(thisObj.handlersTimerVar);
	}
	thisObj.removeUnloadHandlers();
	thisObj.handlersTimerVar = window.setTimeout( function(){
		thisObj.addUnloadHandlers();
	}, 2000 );
};
PageUnloadController.prototype.logoutHandler = function(){
	var thisObj = this;
	if("performance" in window && "navigation" in window.performance){
	    var type = window.performance.navigation.type;
	    if(type === 2 || type === 1 ){
	    	if(typeof up_common !== "undefined") {
	    		up_common.spinnerOverlay(true);
	    	}
	    	thisObj.pauseUnloadHandlers();
	    	var logout = $(".logout").get(0);
	    	if(logout) {
	    		logout.click();
	    	} else {
	    		window.location.href = "/AuthenticationDelegatedServlet?delegated_service=217";
	    	}
	    }
	}
};
var pageUnload = new PageUnloadController() ;

pageUnload.removeUnloadHandlers();
pageUnload.addUnloadHandlers();

$(function(){
	pageUnload.logoutHandler();
});