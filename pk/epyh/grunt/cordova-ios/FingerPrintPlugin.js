var FingerPrintPlugin = {
    canUseFingerPrint: function (success, failure, resultType) {
        return cordova.exec(success, failure, "BiometricPlugin", "hasBiometricSensor", [resultType]);
    },
    activateFingerPrint: function (success, failure, resultType) {
        if(!success){
            success= function(){};
        }
        if(!failure){
            failure= function(){};
        }
        return cordova.exec(success, failure, "BiometricPlugin", "enrollBiometricInfo", [resultType]);
    },
    deleteBiometricInfo: function (success, failure, resultType) {
        
        var success = function(){};
        
        var failure = function(){};
        
        var resultType = {};
        
        return cordova.exec(success, failure, "BiometricPlugin", "deleteBiometricInfo", [resultType]);
    },
     
    getBiometricInfoFailure: function(error){
        console.log(error);
    },
    useFingerPrint: function (success, failure, resultType) {
        return cordova.exec(this.getBiometricInfoSuccess, this.getBiometricInfoFailure, "BiometricPlugin", "getBiometricInfo", [resultType]);
    }
};