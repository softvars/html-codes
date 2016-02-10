var AppToAppPlugin = {
    launchApp: function (success, fail, actionName, resultType) {
	console.log('Lancio AppToApp: '+actionName+' - '+resultType);
        if (!success) {
            success = function () {

            };
        }
        if (!fail) {
            fail = function () {

            };
        }
        return cordova.exec(success, fail, "AppToAppPlugin", actionName, [resultType]);
    }
};