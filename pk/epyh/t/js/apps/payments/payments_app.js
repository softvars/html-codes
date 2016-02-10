define(["app"], function (Appersonam) {
    Appersonam.module("PaymentsApp", function (PaymentsApp, Appersonam, Backbone, Marionette, $, _) {

        PaymentsApp.startWithParent = false;

        PaymentsApp.onStart = function () {
        };

        PaymentsApp.onStop = function () {
            Appersonam.PaymentsApp.trigger('unset:panelManager');
        };
    });
    Appersonam.module("Routers.PaymentsApp", function (PaymentsAppRouter, Appersonam, Backbone, Marionette, $, _) {
        var self = this;
        PaymentsAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                //"payments/mobile": "rechargeMobile",
                //"payments/bills": "bills",
            }
        });


        var API = {
            rechargeMobile: function () {
                require(["apps/payments/mobile_recharge/profile_controller"], function (controller) {
                    //if (!self.panelManager) {
                    Appersonam.startSubApp("PaymentsApp");
                    Appersonam.request('tracking:log:event', 'mobile_recharge');
                    LogDB.log(Appersonam.currentApp.moduleName + ' => rechargeMobile');
                    require(["common/panel/panel_manager"], function (PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        Appersonam.NavigationApp.trigger('toggle:menu');
                        setTimeout(function () {
                            Appersonam.mainContentRegion.show(self.panelManager);
                            controller.profile(null);
                        }, 300);
                    });
                });
            },
            bills: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => bills');
                require(["apps/payments/bills/profile_controller"], function (controller) {
                    //if (!self.panelManager) {
                    require(["common/panel/panel_manager"], function (PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        Appersonam.mainContentRegion.show(self.panelManager);
                        controller.profile(null);
                    });
                    /*}
                    else {
                        controller.profile(null);
                    }*/
                });
            }
        };

        Appersonam.on('back:button:clicked', function () {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.PaymentsApp.on('show:overlay', function (childView, index) {
            self.panelManager.showOverlay(childView, index);
        });

        Appersonam.PaymentsApp.on('close:overlay', function (index) {
            self.panelManager.closeOverlay(index);
        });

        Appersonam.PaymentsApp.on('show:main', function (childView, index) {
            if (self.panelManager.currentLevel === 0) {
                self.panelManager.goTo(childView, index); setTimeout(function () {
                    Appersonam.NavigationApp.trigger('toggle:menu');
                    setTimeout(function () {
                        Appersonam.NavigationApp.trigger('corner:menu');
                    }, 100);
                }, 500);
            }
            else {
                self.panelManager.goTo(childView, index);
            }
        });

        Appersonam.on('payments', function (innerTrigger) {
            Appersonam.PaymentsApp.trigger(innerTrigger);
        });

        Appersonam.PaymentsApp.on('panelManager:onBackFunction', function (onBackFunction) {
            self.panelManager.onBackFunction = onBackFunction;
        });

        Appersonam.PaymentsApp.on('unset:panelManager', function (innerTrigger) {
            delete self.panelManager;
        });

        Appersonam.PaymentsApp.on('payments:mobile', function () {
            //Appersonam.navigate("payments/mobile");
            API.rechargeMobile();
        });

        Appersonam.PaymentsApp.on('payments:bill', function () {
            //Appersonam.navigate("payments/bills");
            API.bills();
        });

        PaymentsAppRouter.on('start', function () {
            new PaymentsAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.PaymentsAppRouter;
});