var RequestHttpsPlugin = { 
    doRequestHttps: function (success, fail, resultType) { 
      return cordova.exec( success, fail,"RequestHttpsPlugin","nativeAction", [resultType]);
    },
	doDe: function (success, fail, resultType) { 
		return cordova.exec( success, fail,"RequestHttpsPlugin","doDeAction", [resultType]);
	}
};