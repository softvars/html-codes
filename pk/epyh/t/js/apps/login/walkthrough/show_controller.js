define(["app",
    "apps/login/walkthrough/show_view"
], function (Appersonam, View) {
    Appersonam.module("LoginApp.Walkthrough", function (Walkthrough, Appersonam, Backbone, Marionette, $, _) {
        Walkthrough.Controller = {
            showWalkthrough: function () {
                var useDynamic = Sella.deviceInfo.platform.toLowerCase() === 'ios' || (Sella.deviceInfo.platform.toLowerCase() === 'android' && parseFloat(Sella.deviceInfo.osVersion) > 18);
                if (useDynamic === true) {
                    var walkThroughView = new View.Dynamic();
                }
                else {
                    var walkThroughView = new View.Static();
                }
                Appersonam.LoginApp.trigger('show:overlay', walkThroughView, '-1');
            }
        }
    });
    return Appersonam.LoginApp.Walkthrough.Controller;
});