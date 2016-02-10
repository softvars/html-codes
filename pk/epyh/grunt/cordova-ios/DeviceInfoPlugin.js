var DeviceInfoPlugin = {
    isTablet: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "isTablet", [resultType]);
    },
    isAndroid: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "isAndroid", [resultType]);
    },
    appVersion: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "appVersion", [resultType]);
    },
    osVersion: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "osVersion", [resultType]);
    },
    osRelease: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "osRelease", [resultType]);
    },
    moreInfo: function (success, fail, resultType) {
        success("IOS");
    },
    canOpenSettingsFromUrl: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "canOpenSettingsFromUrl", [resultType]);
    },
    openSettings: function (success, fail, resultType) {
        return cordova.exec(success, fail, "DeviceInfoPlugin", "openSettings", [resultType]);
    }
};