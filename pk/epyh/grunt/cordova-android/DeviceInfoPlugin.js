var DeviceInfoPlugin = { 
    isTablet: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"DeviceInfoPlugin","isTablet", [resultType]);
    },
    isAndroid: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"DeviceInfoPlugin","isAndroid", [resultType]);
    },
    appVersion: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"DeviceInfoPlugin","appVersion", [resultType]);
    },
    osVersion: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"DeviceInfoPlugin","osVersion", [resultType]);
    },
    osRelease: function (success, fail, resultType) { 
        return cordova.exec( success, fail,"DeviceInfoPlugin","osRelease", [resultType]);
    },
    moreInfo: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "moreInfo", [resultType]);
    },
    canOpenSettingsFromUrl: function (success, fail, resultType) {
        fail();
    },
    openSettings: function (success, fail, resultType) {
        fail();
    }
};