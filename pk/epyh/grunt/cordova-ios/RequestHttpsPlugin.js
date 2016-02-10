var RequestHttpsPlugin = { 
    doRequestHttps: function (success, fail, resultType) {
        //alert(resultType);
      return cordova.exec( success, fail,"RequestHttpsPlugin","nativeFunction", [resultType]);
    },
    doDe: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"RequestHttpsPlugin","doDeAction", [resultType]);
    } 
};