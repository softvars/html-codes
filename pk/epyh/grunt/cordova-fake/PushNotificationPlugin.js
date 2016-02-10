var PushNotificationPlugin = { 
    registerPushService: function (success, fail, resultType) { 
      fail();
      return "";
    },
    getPreference: function (success, fail, resultType) { 
  		var parsed = JSON.parse(resultType);
  		setTimeout(function(){
  		var result = {prefvalue: Sella.deviceactions.load(parsed.prefkey)}
  		  success(JSON.stringify(result));},
  		100);
    },
    setPreference: function (success, fail, resultType) { 
  		setTimeout(function(){
  		  var parsed = JSON.parse(resultType);
  		  Sella.deviceactions.save(parsed.prefkey, parsed.prefvalue);
  		  success();
      },
  		100);
    },
    deletePreference: function (success, fail, resultType) { 
      var parsed = JSON.parse(resultType);
      localStorage.removeItem(parsed.prefkey);
      return "";
    }
};
