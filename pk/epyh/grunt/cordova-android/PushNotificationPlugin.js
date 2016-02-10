var PushNotificationPlugin = { 
    registerPushService: function (success, fail, resultType) { 
      return cordova.exec(success, fail,"PushNotificationPlugin","registerdevice", [resultType]);
    },
    getPreference: function (success, fail, resultType) { 
      return cordova.exec(success, fail,"PushNotificationPlugin","getpreference", [resultType]);
    },
    setPreference: function (success, fail, resultType) { 
      return cordova.exec(success, fail,"PushNotificationPlugin","setpreference", [resultType]);
    },
    deletePreference: function (success, fail, resultType) { 
      return cordova.exec(success, fail,"PushNotificationPlugin","deletepreference", [resultType]);
    },
    resetPreferences: function (success, fail, resultType) {  
      return cordova.exec(success, fail,"PushNotificationPlugin","resetpreferences", [resultType]);
    }
};
