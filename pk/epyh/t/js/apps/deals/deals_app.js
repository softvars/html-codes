define(["app"], function(Appersonam) {
    Appersonam.module("DealsApp", function(DealsApp, Appersonam, Backbone, Marionette, $, _) {

        DealsApp.startWithParent = false;

        DealsApp.onStart = function() {};

        DealsApp.onStop = function() {
            Appersonam.DealsApp.trigger('unset:panelManager');
        };
    });
    Appersonam.module("Routers.DealsApp", function(DealsAppRouter, Appersonam, Backbone, Marionette, $, _) {
        var self = this;
        DealsAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {

            }
        });
        var API = {
            dealsList: function(menuAnimationDisabled) {
                require(["apps/deals/list/list_controller"], function(controller) {
                    Appersonam.startSubApp("DealsApp");
                    LogDB.log(Appersonam.currentApp.moduleName + ' => deals list');
                    Appersonam.request('tracking:log:event', 'deals_list');
                    require(["common/panel/panel_manager"], function(PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        if (!menuAnimationDisabled) {
                            Appersonam.NavigationApp.trigger('toggle:menu');
                        }
                        setTimeout(function() {
                            Appersonam.mainContentRegion.show(self.panelManager);
                            controller.list(menuAnimationDisabled);
                        }, 300);
                    });
                });
            },
            showDeal: function(deal) {
                require(["apps/deals/show/show_controller"], function(controller) {
                    LogDB.log(Appersonam.currentApp.moduleName + ' => deals show ' + JSON.stringify(deal));
                    Appersonam.request('tracking:log:event', 'deals_show');
                    controller.show(deal);
                });
            },
            createGoal: function(data) {
                require(["apps/activities/goals/profile/profile_controller"], function(controller) {
                    LogDB.log(Appersonam.currentApp.moduleName + ' => create goal from deal ' + data);
                    Appersonam.request('tracking:log:event', 'gol_from_deal');
                    controller.entityFromDeal(data);
                });
            }
        };

        Appersonam.on('back:button:clicked', function() {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.DealsApp.on('close:overlay', function(index) {
            self.panelManager.closeOverlay(index);
        });

        Appersonam.DealsApp.on('show:main', function(childView, index, menuAnimationDisabled) {
            if (self.panelManager.currentLevel === 0) {
                self.panelManager.goTo(childView, index);
                setTimeout(function() {
                    if (!menuAnimationDisabled) {
                        Appersonam.NavigationApp.trigger('toggle:menu');
                    }
                    setTimeout(function() {
                        if (!menuAnimationDisabled) {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        }
                    }, 100);
                }, 500);
            } else {
                self.panelManager.goTo(childView, index);
            }
        });

        Appersonam.DealsApp.on('nav:back', function() {
            if (self.panelManager) {
                self.panelManager.removeView(1);
            }
        });

        Appersonam.DealsApp.on('unset:panelManager', function(innerTrigger) {
            delete self.panelManager;
        });

        Appersonam.DealsApp.on('show:deal', function(deal) {
            API.showDeal(deal);
        });

        Appersonam.on('deals:list', function(menuAnimationDisabled) {
            API.dealsList(menuAnimationDisabled);
        });
        Appersonam.DealsApp.on('show:overlay', function(childView, index) {
            self.panelManager.showOverlay(childView, index);
        });
        DealsAppRouter.on('start', function() {
            new DealsAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.DealsAppRouter;
});
