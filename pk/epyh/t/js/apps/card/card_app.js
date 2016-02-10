define(["app"], function(Appersonam) {
    Appersonam.module("CardApp", function(CardApp, Appersonam, Backbone, Marionette, $, _) {

        CardApp.startWithParent = false;

        CardApp.onStart = function() {};

        CardApp.onStop = function() {
            Appersonam.CardApp.trigger('unset:panelManager');
        };
    });
    Appersonam.module("Routers.CardApp", function(CardAppRouter, Appersonam, Backbone, Marionette, $, _) {

        CardAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {

            }
        });

        var self = this;

        var API = {
            myCards: function(dataFrom3DS) {
                require(["apps/card/recharge/profile/profile_controller"], function(controller) {
                    if (!self.panelManager) {
                        self.fromMenu = true;
                    }
                    Appersonam.startSubApp("CardApp");
                    LogDB.log(Appersonam.currentApp.moduleName + ' => myCards');
                    Appersonam.request('tracking:log:event', 'my_cards');
                    require(["common/panel/panel_manager"], function(PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        var onSideMenuClosed = function(){
                            API.hideMainContent();
                            controller.myCards(dataFrom3DS);
                        };
                        $('#main-content').bind("webkitTransitionEnd", onSideMenuClosed);
                        Appersonam.NavigationApp.trigger('toggle:menu');
                    });
                });
            },
            rechargeMenu: function() {
                require(["apps/card/recharge/menu/show_controller"], function(controller) {
                    if (!self.panelManager) {
                        self.fromMenu = true;
                    }
                    Appersonam.startSubApp("CardApp");
                    LogDB.log(Appersonam.currentApp.moduleName + ' => rechargeMenu');
                    require(["common/panel/panel_manager"], function(PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        var onSideMenuClosed = function(){
                            API.hideMainContent();
                            controller.show();
                        };
                        $('#main-content').bind("webkitTransitionEnd", onSideMenuClosed);
                        Appersonam.NavigationApp.trigger('toggle:menu');
                    });
                });
            },
            show: function() {
                require(["apps/card/show/show_controller"], function(controller) {
                    if (!self.panelManager) {
                        self.fromMenu = true;
                    }
                    Appersonam.startSubApp("CardApp");
                    LogDB.log(Appersonam.currentApp.moduleName + ' => show');
                    Appersonam.request('tracking:log:event', 'card_show');
                    require(["common/panel/panel_manager"], function(PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        var onSideMenuClosed = function(){
                            API.hideMainContent();
                            controller.show();
                        };
                        $('#main-content').bind("webkitTransitionEnd", onSideMenuClosed);
                        Appersonam.NavigationApp.trigger('toggle:menu');
                    });
                });
            },
            rechargeProfile: function(dataFrom3DS) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => rechargeProfile');
                Appersonam.request('tracking:log:event', 'card_recharge');
                require(["apps/card/recharge/profile/profile_controller"], function(controller) {
                    controller.rechargeProfile(dataFrom3DS);
                });
            },
            cardRechargeList: function() {
                LogDB.log(Appersonam.currentApp.moduleName + ' => rechargeProfileList');
                Appersonam.request('tracking:log:event', 'card_recharge_list');
                require(["apps/card/recharge/profile/profile_controller"], function(controller) {
                    controller.showCardsList();
                });
            },
            coordinates: function(userEntity) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => coordinates');
                Appersonam.request('tracking:log:event', 'card_transfer_recharge');
                require(["common/coordinates/coordinates_controller"], function(controller) {
                    controller.coordinates(userEntity, true);
                });
            },
            hideMainContent: function(action) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => hideMainContent');
                $('#main-content').unbind("webkitTransitionEnd");
                Appersonam.mainContentRegion.show(self.panelManager);
            },
            showMainContent: function() {},

            activate: function(model) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => activate');
                Appersonam.request('tracking:log:event', 'card_activate');
                require(["apps/card/activate/profile_controller"], function(controller) {
                    controller.rechargeProfile(model);
                });
            },
            request: function(model) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => request');
                Appersonam.request('tracking:log:event', 'card_request');
                require(["apps/card/request/profile_controller"], function(controller) {
                    controller.rechargeProfile(model);
                });
            }
        };

        Appersonam.CardApp.on('show:overlay', function(childView, index) {
            self.panelManager.showOverlay(childView, index);
        });

        Appersonam.CardApp.on('refresh:panel', function(childView, index) {
            self.panelManager.refresh(childView, index);
        });

        Appersonam.CardApp.on('close:overlay', function(index) {
            self.panelManager.closeOverlay(index);
        });

        Appersonam.CardApp.on('recharge:via:transfer', function(userEntity) {
            API.coordinates(userEntity);
        });

        Appersonam.CardApp.on('recharge:via:card', function(dataFrom3DS) {
            //Appersonam.navigate("card/recharge"); 
            API.rechargeProfile(dataFrom3DS);
        });

        Appersonam.CardApp.on('cards:list', function() {
            //Appersonam.navigate("card/recharge"); 
            API.cardRechargeList();
        });

        Appersonam.on('card:recharge:menu', function() {
            //Appersonam.navigate("card/recharge");
            self.panelManager = null;
            API.rechargeMenu();
        });

        Appersonam.on('back:button:clicked', function() {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.CardApp.on('nav:back', function(address, quantity) {
            //Appersonam.navigate(address);
            self.panelManager.goTo(null, quantity);
        });

        Appersonam.CardApp.on('show:main', function(childView, index) {
            if (self.panelManager.currentLevel === 0) {
                self.panelManager.goTo(childView, index);
                setTimeout(function() {
                    Appersonam.NavigationApp.trigger('toggle:menu');
                    setTimeout(function() {
                        Appersonam.NavigationApp.trigger('corner:menu');
                    }, 100);
                }, 500);
            } else {
                self.panelManager.goTo(childView, index);
            }
        });

        Appersonam.CardApp.on('unset:panelManager', function() {
            delete self.panelManager;
        });

        Appersonam.on('card:show', function() {
            //Appersonam.navigate("card/show");
            self.panelManager = null;
            API.show();
        });
        Appersonam.on('my:cards:list', function() {
            //Appersonam.navigate("card/show");
            self.panelManager = null;
            API.myCards();
        });


        Appersonam.CardApp.on("card:activate", function(model) {
            //Appersonam.navigate("card/activate");
            API.activate(model);
        });

        Appersonam.CardApp.on("card:request", function(model) {
            //Appersonam.navigate("card/request");
            API.request(model);
        });

        Appersonam.on("3DS:completed", function(dataFrom3DS) {
            if(!!Appersonam.CommonVariables.ThreeDSCard){
                if(!!Appersonam.CommonVariables.ThreeDSCard.recharging){
                    API.rechargeMenu();
                    setTimeout(function() {
                           API.rechargeProfile(dataFrom3DS);
                    }, 500);
                }
                else{
                    API.myCards(dataFrom3DS);
                }
            }
        });

        CardAppRouter.on('start', function() {
            new CardAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.CardAppRouter;
});
