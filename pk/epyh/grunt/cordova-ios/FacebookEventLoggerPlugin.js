var FacebookEventLoggerPlugin = {
    logEvent: function (eventName, attributes, amount) {
        if(attributes === null){
            attributes = undefined;
        }
        if(!!amount){
            amount = amount.toString();
        }
        else if(amount === null) {
            amount = undefined;
        }
        var eventObject = {
            eventName: eventName,
            attributes: attributes,
            amount: amount
        };
        var success = function (arguments) {
            console.log(JSON.stringify(arguments));
        };
        var failure = function (arguments) {
            console.log(JSON.stringify(arguments));
        };
        cordova.exec(
                success,
                failure,
                "FacebookEventLoggerPlugin", 
                "logGenericEvent",
                [eventObject]
            );
    }
};