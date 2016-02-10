define(["app"], function (Appersonam) {
    Appersonam.module("LoginApp", function (LoginApp, Appersonam, Backbone, Marionette, $, _) {

        LoginApp.startWithParent = false;

        LoginApp.onStart = function () {
        };

        LoginApp.onStop = function () {
            Appersonam.LoginApp.trigger('unset:panelManager');
        };
    });
    Appersonam.module("Routers.LoginApp", function (LoginAppRouter, Appersonam, Backbone, Marionette, $, _) {
        var self = this;
        LoginAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {

            }
        });
        var API = {
            firstStepLogIn: function (hashMail, birthDate, cornerMenu) {
                require(["apps/login/profile/profile_controller"], function (controller) {
                    Appersonam.startSubApp("LoginApp");
                    LogDB.log(Appersonam.currentApp.moduleName + ' => firstStepLogIn');
                    require(["common/panel/panel_manager"], function (PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        Appersonam.mainContentRegion.show(self.panelManager);
                        controller.initializeDeviceVariables(hashMail, birthDate, cornerMenu);
                    });
                });
            },

            readSms: function (data) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => readSms');
                require(["apps/login/profile/profile_controller"], function (controller) {
                    controller.readSms(data);
                }); 
            },

            secondStepLogIn: function (codiceinternet, remember) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => secondStepLogIn');
                require(["apps/login/profile/profile_controller"], function (controller) {
                    controller.secondStep(codiceinternet, remember);
                });
            },
            walkthrough: function (codiceinternet, remember) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => walkThrough');
                Appersonam.request('tracking:log:event', 'walkthrough');
                require(["apps/login/walkthrough/show_controller"], function (controller) {
                    controller.showWalkthrough();
                });
            },
            logout: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => logout');
                Appersonam.request('tracking:log:event', 'logout');
                require(["apps/login/logout/logout_controller"], function (controller) {
                    controller.logout();
                });
            },
            fastLogout: function (sessionExpired, lockScreen) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => fastLogout');
                Appersonam.request('tracking:log:event', 'fast_logout');
                require(["apps/login/logout/logout_controller"], function (controller) {
                    controller.fastLogout(sessionExpired, lockScreen);
                });
            }
        };
        Appersonam.LoginApp.on('show:overlay', function (childView, index) {
            self.panelManager.showOverlay(childView, index);
        });

        Appersonam.on('logout', function () {
            API.logout();
        });

        Appersonam.on('fast:logout', function (sessionExpired, lockScreen) {
            API.fastLogout(sessionExpired, lockScreen);
        });

        Appersonam.LoginApp.on('close:overlay', function (index) {
            self.panelManager.closeOverlay(index);
        });

        Appersonam.LoginApp.on('show:main', function (childView, index) {
            //Appersonam.mainContentRegion.show(childView);
            self.panelManager.goTo(childView, 1);
        });

        Appersonam.on('back:button:clicked', function () {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.LoginApp.on('read:sms', function (data) {
            API.readSms(data);
        });

        Appersonam.LoginApp.on('unset:panelManager', function (innerTrigger) {
            delete self.panelManager;
        });

        Appersonam.LoginApp.on('login', function (hashMail, birthDate, cornerMenu) {
            API.firstStepLogIn(hashMail, birthDate, cornerMenu);
        });

        Appersonam.LoginApp.on('walkthrough', function () {
            API.walkthrough();
        });

        Appersonam.LoginApp.on('secondstep', function (codiceinternet, remember) {
            API.secondStepLogIn(codiceinternet, remember);
        });

        LoginAppRouter.on('start', function () {
            new LoginAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.LoginAppRouter;
});