define(["app", "apps/navigation/ios/list/list_controller"], function(Appersonam, ListController) {
    Appersonam.module("NavigationApp", function(Navigation, Appersonam, Backbone, Marionette, $, _) {
        var API = {
            listNavigation: function() {
                ListController.listNavigation();
            },
            launchApp: function(functionName) {
                require(["entities/user"], function() {
                    var fetchingPrimaryEmail = Appersonam.request('primary:mail');
                    $.when(fetchingPrimaryEmail).done(function(primaryEmail) {
                        Appersonam.NavigationApp.trigger('reset:menu:items');
                        Appersonam.NavigationApp.trigger('corner:menu');
                        AppToAppPlugin.launchApp(null, null, functionName, {
                            userId: primaryEmail
                        });
                    });
                });
            }
        };

        Appersonam.on("qr_reader", function() {
            API.launchApp("qr_reader");
        });

        Appersonam.on("pay_bill", function() {
            API.launchApp("pay_bill");
        });

        Appersonam.on("geolocalization", function() {
            API.launchApp("geolocalization");
        });

        Navigation.on("start", function() {
            API.listNavigation();
        });
    });
    return Appersonam.NavigationApp;
});
