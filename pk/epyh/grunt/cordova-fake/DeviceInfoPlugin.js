var DeviceInfoPlugin = {
    isTablet: function (success, fail, resultType) {
        if (MobileConf.isTablet)
            success();
        else
            fail();
        return "";
    },
    isAndroid: function (success, fail, resultType) {
        success(null);
    },
    appVersion: function (success, fail, resultType) {
        success("1.3.0");
    },
    isWindowsPhone: function (success, fail, resultType) {
        success();
        return "";
    },
    osVersion: function (success, fail, resultType) {
        success("web");
    },
    osRelease: function (success, fail, resultType) {
        success("web");
    },
    moreInfo: function (success, fail, resultType) {
        success("DESKTOP");
    },
    canOpenSettingsFromUrl: function (success, fail, resultType) {
        fail();
    },
    openSettings: function (success, fail, resultType) {
        fail();
    }
};