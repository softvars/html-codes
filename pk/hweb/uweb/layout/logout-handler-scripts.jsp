<script type="text/javascript">
	/* logout when page back, fwd or refresh navigation */
	var hypeWalletLogoutHandler = function(){
	    if("performance" in window && "navigation" in window.performance){
	        var type = window.performance.navigation.type;
	        if(type === 2 || type === 1 ){
	            var logoutElm = null;
	            if(typeof $ !== "undefined") {
	                $('#spinner-overlay').toggleClass('hide', false);
	                logoutElm = $(".logout").get(0);
	                $( window ).off('beforeunload');
	                $( document ).off('beforeunload');
	            }
	            if(logoutElm) {
	                logoutElm.click();
	            } else {
	                window.location.href = "/AuthenticationDelegatedServlet?delegated_service=217";
	            }
	        }
	    }
	};
	hypeWalletLogoutHandler();
</script>