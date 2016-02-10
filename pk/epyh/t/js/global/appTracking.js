define(["app"], function (Appersonam) {
    Appersonam.module("Bucket", function (Bucket, Appersonam, Backbone, Marionette, $, _) {
    	
		Appersonam.reqres.setHandler('start:tracking',function (codiceInternet) {
			/*require(['vendor/localytics'], function() {
				ll('setCustomerID', sjcl.encrypt('aip-sec399delcavagnet', codiceInternet));
			    ll('init', 'ed89111ed8aa36c252cbb1d-41a86dbc-71c7-11e5-94a8-003e57fecdee',
			    {appVersion: Sella.appVersion, trackPageView: true} Options );
				Appersonam.request('tracking:log:event', 'login_completed');
			});*/

			Appersonam.request('tracking:log:event', 'login_completed');
		});

    	Appersonam.reqres.setHandler('tracking:log:event', function () {
        	performEventLogging(arguments);
		});

		var localyticsLogging = function  () {
			try{								//attributi			//ammontare
				ll('tagEvent', arguments[0][0], arguments[0][1], arguments[0][2]);
			}
			catch(exception){
				LogDB.log('localytic exception => ' + exception);
			}
		};	

		var nativeFacebbokEventLogging = function  (argument) {
																//attributi			//ammontare
			FacebookEventLoggerPlugin.logEvent(arguments[0][0], arguments[0][1], arguments[0][2]);
		};

		var performEventLogging = function  () {
			
		};

		//configurazione: in base allo strumento di logging usato verrà assegnata un funzione diversa alla generica "performEventLogging"

		performEventLogging = nativeFacebbokEventLogging;

	});
});