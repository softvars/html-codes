define(["app"], function (Appersonam) {
    Appersonam.module("ActivitiesApp", function (ActivitiesApp, Appersonam, Backbone, Marionette, $, _) {

        ActivitiesApp.startWithParent = false;

        ActivitiesApp.onStart = function () {
        };
        ActivitiesApp.onStop = function () {
            Appersonam.ActivitiesApp.trigger('unset:properties');
        };
    });
    Appersonam.module("Routers.ActivitiesApp", function (ActivitiesAppRouter, Appersonam, Backbone, Marionette, $, _) {

        ActivitiesAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
            }
        });
        var activitiesController;
        var self = this;
        var API = {
            activitiesNavigation: function (fromLogin) {
                require(["apps/activities/navigation/list/list_controller"], function (controller) {
                    //if (!self.panelManager) {
                    if (fromLogin !== true) {
                        self.fromMenu = true;//con animazione menù
                    }
                    else {
                        self.fromMenu = false;//senza animazione
                    }
                    //Appersonam.request("global:initialize:categories", null);//svuoto le categorie nel localstorage
                    Appersonam.startSubApp("ActivitiesApp");//se passo da una subapp all'altra, quella vecchia verrà chiusa

                    LogDB.log(Appersonam.currentApp.moduleName + ' => activitiesNavigation');
                    require(["common/panel/panel_manager"], function (PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        if (fromLogin !== true) {
                            Appersonam.NavigationApp.trigger('toggle:menu');
                        }
                        setTimeout(function () {
                            Appersonam.mainContentRegion.show(self.panelManager);
                            if (!self.activitiesController) {//assegno il controller per la prima volta
                                self.activitiesController = controller;
                            }
                            self.activitiesController.activitiesNavigation(self.innerTrigger);
                            self.activitiesController.checkUserType();
                        }, 300);
                    });
                });
            },
            refreshSts: function (showLoading) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => refreshSts');
                self.activitiesController.refreshSts(showLoading);
            },
            hashSearch: function (query) {
                self.activitiesController.hashSearch(query);
            }
        };
        Appersonam.ActivitiesApp.on('inner:trigger', function () {
            Appersonam.ActivitiesApp.trigger(self.innerTrigger, null, 1);
        });
        Appersonam.ActivitiesApp.on('switch:area', function (name) {
            self.activitiesController.switchArea(name);
        });
        //management delle regions da mostrare
        Appersonam.ActivitiesApp.on('show:child', function (childView, regionName) {
            self.activitiesController.showRegion(childView, regionName);
            if (self.panelManager.levelAmount == 2) {
                self.panelManager.goTo(null, 1);
            }
        });
        Appersonam.ActivitiesApp.on('unset:properties', function () {
            delete self.panelManager;
            delete self.activitiesController;
            delete self.fromMenu;
        });

        Appersonam.ActivitiesApp.on('refresh:child', function (childView, regionName, noSwitch) {
            self.activitiesController.showRegion(childView, regionName, noSwitch);
        });
        Appersonam.ActivitiesApp.on('refresh:panel', function (childView, index) {
            self.panelManager.refresh(childView, index);
        });

        Appersonam.ActivitiesApp.on('show:overlay', function (childView, index) {
            self.panelManager.showOverlay(childView, index);
        });
        Appersonam.ActivitiesApp.on('toggle:sts', function () {
            self.activitiesController.toggleSts();
        });
        Appersonam.ActivitiesApp.on('update:sts', function (showLoading) {
            API.refreshSts(showLoading);
        });

        Appersonam.on('back:button:clicked', function () {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.ActivitiesApp.on('hash:search', function (query) {
            API.hashSearch(query);
        });
        Appersonam.ActivitiesApp.on('close:overlay', function (index) {
            self.panelManager.closeOverlay(index);
        });
        Appersonam.ActivitiesApp.on('set:active', function (target) {
            self.activitiesController.setActive(target);
        });
        Appersonam.ActivitiesApp.on('update:collection', function (object, target) {
            if (self.activitiesController) {
                self.activitiesController.updateCollection(object, target);
            }
        }); 

        

        Appersonam.ActivitiesApp.on('activate:navigation', function (allowNavigation) {
            //if (self.activitiesController) {
            //    self.activitiesController.activateNavigation(allowNavigation);
            //}
        });

        Appersonam.on('close:menu', function (childView, index) {
            if (self.fromMenu === true && self.panelManager) {
                self.fromMenu = false;
                Appersonam.NavigationApp.trigger('toggle:menu');
                setTimeout(function () {
                    Appersonam.NavigationApp.trigger('corner:menu');
                }, 100);
            }
        });
        Appersonam.ActivitiesApp.on('show:main', function (childView, index) {
            if (self.panelManager.currentLevel === 0) {
                self.panelManager.goTo(childView, index);
            }
            else {
                self.panelManager.goTo(childView, index);
            }
        });
        Appersonam.ActivitiesApp.on('nav:back', function (address, quantity) {
            //Appersonam.navigate(address);
            self.panelManager.removeView(quantity);
        });

        Appersonam.on('activities', function (innerTrigger, fromLogin) {
            require(["apps/activities/goals/goals_app", "apps/activities/movements/movements_app"], function (PanelManager) {
                self.panelManager = undefined;
                self.innerTrigger = innerTrigger;
                API.activitiesNavigation(fromLogin);
            });
        });

        ActivitiesAppRouter.on('start', function () {
            new ActivitiesAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.ActivitiesAppRouter;
});