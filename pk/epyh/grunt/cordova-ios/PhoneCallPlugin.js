var PhoneCallPlugin = { 
    doPhoneCall: function (success, fail, resultType) { 
      return cordova.exec( success, fail,"PhoneCallPlugin","makeCall", [resultType]);
    },
    canMakeCall: function (success, fail, resultType) { 
    return cordova.exec( success, fail,"PhoneCallPlugin","canMakeCall", [resultType]);
    } 
};