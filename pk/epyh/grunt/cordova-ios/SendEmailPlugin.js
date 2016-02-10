var SendEmailPlugin = { 
    sendMail: function (success, fail, resultType) { 
     	return cordova.exec( success, fail,"SendEmailPlugin","sendMail", [resultType]);
    },
    sendReport: function (success, fail, resultType) {
    	return cordova.exec( success, fail,"SendEmailPlugin","sendReport", [resultType]);
    }
};