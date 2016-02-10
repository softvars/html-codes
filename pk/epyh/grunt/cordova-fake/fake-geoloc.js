navigator.geolocation.getCurrentPosition = function(onSuccess, onError, options) {
    if(options.makeError) {
        onError();
    } else{
        onSuccess(
					{coords:{
					latitude:45.563397,
					longitude:8.057712
				}
		});
    }
};