var WebViewPlugin = { 
    openLink: function (success, fail, resultType) { 
      return cordova.exec( success, fail,"WebViewPlugin","openLink", [resultType]);
    },    
    puttl: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"WebViewPlugin","ptl", [resultType]);
    },
    openTol: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"WebViewPlugin","openTol", [resultType]);
    },
    destroyCookies: function (success, fail, resultType) {
    	return cordova.exec( success, fail,"WebViewPlugin","destroyCookies", [resultType]);
    }    
};