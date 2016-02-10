define(["app"], function (Appersonam) {
    Appersonam.module("P2pApp", function (P2pApp, Appersonam, Backbone, Marionette, $, _) {

        P2pApp.startWithParent = false;

        P2pApp.onStart = function () { };

        P2pApp.onStop = function () {
            Appersonam.P2pApp.trigger('unset:panelmanager');
            //Appersonam.P2pApp.trigger('flush:views');
        };
    });
    Appersonam.module("Routers.P2pApp", function (P2pAppRouter, Appersonam, Backbone, Marionette, $, _) {
        var self = this;
        P2pAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                //"p2p/payment": "paymentNavigation",
                //"p2p/request": "requestNavigation",
                //"p2p/simplePayment": "simplePayment",
                //"p2p/simpleRequest": "simpleRequest",
                //"p2p/hypePayment": "hypePayment",
                //"p2p/hypeRequest": "hypeRequest"
            }
        });

        var API = {
            navigation: function () {
                require(["apps/p2p/menu/menu_controller"], function (controller) { 
                    self.activitiesController = controller;
                    //if (!self.panelManager) {
                    Appersonam.startSubApp("P2pApp");
                    LogDB.log(Appersonam.currentApp.moduleName + ' => navigation');
                    require(["common/panel/panel_manager"], function (PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        if (self.disableMenu !== true) {
                            Appersonam.NavigationApp.trigger('toggle:menu');
                        }
                        setTimeout(function () {
                            Appersonam.mainContentRegion.show(self.panelManager);
                            self.activitiesController.navigation(self.mode);
                        }, 300);
                    });
                });
            },
            secondStep: function (transferObject, mode, page, transferOnly) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => secondStep');
                Appersonam.request('tracking:log:event', 'p2p_second_step');
                require(["common/p2p/hypeTransfer/profile_controller"], function (controller) {                    
                        self.transferController = controller;
                        self.transferController.profile(transferObject, mode, page, transferOnly);
                });
            },

            newHypeTransfer: function (mode, transferOnly) {
                require(["apps/p2p/search/list/list_controller"], function (controller) {
                    self.listController = controller;
                    //if (!self.panelManager) {
                    Appersonam.startSubApp("P2pApp");
                    if(transferOnly === true){
                            LogDB.log(Appersonam.currentApp.moduleName + ' => newTransferMoney');
                            Appersonam.request('tracking:log:event', 'new_transfer');
                    }
                    else{
                        if(mode === 'request'){
                            LogDB.log(Appersonam.currentApp.moduleName + ' => newHypeRequest');
                            Appersonam.request('tracking:log:event', 'new_request');
                        }
                        else{
                            LogDB.log(Appersonam.currentApp.moduleName + ' => newHypeSend');
                            Appersonam.request('tracking:log:event', 'new_send');
                        }
                    }
                    require(["common/panel/panel_manager"], function (PanelManager) {
                        self.panelManager = new PanelManager.Panels();
                        if (self.disableMenu !== true) {
                            Appersonam.NavigationApp.trigger('toggle:menu');
                        }
                        setTimeout(function () {
                            Appersonam.mainContentRegion.show(self.panelManager);
                            if (transferOnly !== true) {
                                self.listController.listEntities(mode);
                            }
                            else {
                                self.listController.transferOnly();
                            }
                        }, 300);
                    });
                    /*}
                    else {
                        activitiesController.navigation(self.mode);
                    }*/
                });
            },
            paymentNavigation: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => paymentNavigation');
                self.mode = 'payment';
                API.navigation();
            },
            requestNavigation: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => requestNavigation');
                self.mode = 'request';
                API.navigation();
            },
            simpleTransfer: function (object, hype) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => simpleTransfer');
                require(["apps/p2p/simpleTransfer/profile_controller"], function (controller) {
                    controller.profile(self.mode, 2, object, hype);
                });
            },
            simplePayment: function (model, hype) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => simplePayment');
                self.mode = 'payment';
                API.simpleTransfer(model, hype);
            },
            simpleRequest: function (object, hype) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => simpleRequest');
                self.mode = 'request';
                API.simpleTransfer(object, hype);
            },
            hypeTransfer: function (object) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => hypeTransfer');
                require(["common/p2p/hypeTransfer/profile_controller"], function (controller) {
                    controller.profile(self.mode, 2, object);
                });
            },
            hypePayment: function (collection) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => hypePayment');
                self.mode = 'payment';
                API.hypeTransfer(collection);
            },
            hypeRequest: function (collection) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => hypeRequest');
                self.mode = 'request';
                API.hypeTransfer(collection);
            },
            contactsList: function (item, quantity) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => contactsList');
                require(["apps/p2p/contacts/list/list_controller"], function (controller) {
                    controller.listEntities(self.mode, item, quantity);
                });
            },
            searchList: function (model, peersCollection, mode) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => searchList');
                require(["apps/p2p/search/list/list_controller"], function (controller) {
                    controller.listEntities(model, peersCollection, mode);
                });
            },
            addContact: function (newModel) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => addContact');
                require(["apps/p2p/contacts/profile/profile_controller"], function (controller) {
                    controller.newEntity(newModel);
                });
            },
            editContact: function (entity, mode, transferOnly) {
                if(transferOnly === true){
                    LogDB.log(Appersonam.currentApp.moduleName + ' => moneyTransferContact');
                }
                else{
                        Appersonam.request('tracking:log:event', 'custom_contact_profile');
                        LogDB.log(Appersonam.currentApp.moduleName + ' => editContact');
                }
                require(["apps/p2p/contacts/profile/profile_controller"], function (controller) {
                    controller.editEntity(entity, mode, transferOnly);
                });
            }
        };

        Appersonam.P2pApp.on('show:overlay', function (childView, index) {
            self.panelManager.showOverlay(childView, index);
        });         

        Appersonam.P2pApp.on('unset:panelmanager', function () {
            delete self.panelManager;
        });

        Appersonam.P2pApp.on('panelManager:onBackFunction', function (onBackFunction) {
            self.panelManager.onBackFunction = onBackFunction;
        });

        Appersonam.P2pApp.on('contacts:child:list', function (item, quantity) {
            //Appersonam.navigate("p2p/friends");
            API.contactsList(item, quantity);
        });

        Appersonam.on('back:button:clicked', function () {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.P2pApp.on('search:child:list', function (item, quantity) {
            //Appersonam.navigate("p2p/friends");
            API.searchList(item, quantity);
        });

        Appersonam.P2pApp.on('close:overlay', function (index) {
            self.panelManager.closeOverlay(index);
        });

        Appersonam.P2pApp.on('new:contact', function (newModel) {
            API.addContact(newModel);
        });

        Appersonam.P2pApp.on('edit:contact', function (entity, mode, transferOnly) {
            API.editContact(entity, mode, transferOnly);
        });

        Appersonam.P2pApp.on('nav:back', function (address, quantity, transferOnly) {
            //Appersonam.navigate(address);
            self.panelManager.goTo(null, quantity, transferOnly);
        });

        Appersonam.P2pApp.on('show:main', function (childView, index) {
            if (self.panelManager.currentLevel === 0 && self.disableMenu !== true) {
                self.panelManager.goTo(childView, index);
                setTimeout(function () {
                    Appersonam.NavigationApp.trigger('toggle:menu');
                    setTimeout(function () {
                        Appersonam.NavigationApp.trigger('corner:menu');
                    }, 100);
                }, 500);
            } else {
                self.panelManager.goTo(childView, index);
                setTimeout(function () {
                    Appersonam.trigger('close:loading');
                }, 500);
            }
        });

        Appersonam.P2pApp.on('p2p:secondstep', function (transferObject, mode, page, transferOnly) {
            API.secondStep(transferObject, mode, page, transferOnly);
        });

        Appersonam.on('hype:transfer:new', function (disableMenu) {
            self.disableMenu = disableMenu;
            API.newHypeTransfer('payment', true);
        });

        Appersonam.P2pApp.on('show:child', function (childView) {
            self.activitiesController.showChild(childView);
        });
        Appersonam.P2pApp.on('set:active', function (target) {
            self.activitiesController.setActive(target);
        });

        Appersonam.on('hype:request:new', function (disableMenu) {
            self.disableMenu = disableMenu;
            API.newHypeTransfer('request');
        });

        Appersonam.on('hype:payment:new', function (disableMenu) {
            self.disableMenu = disableMenu;
            API.newHypeTransfer('payment');
        });

        Appersonam.P2pApp.on('p2p:search', function (model, peersCollection, mode) {
            API.searchList(model, peersCollection, mode);
        });

        Appersonam.on('p2p:payment', function (disableMenu) {
            self.disableMenu = disableMenu;
            //Appersonam.navigate("p2p/payment");
            API.paymentNavigation();
        });

        Appersonam.on('p2p:request', function (disableMenu) {
            self.disableMenu = disableMenu;
            //Appersonam.navigate("p2p/request");
            API.requestNavigation();
        });

        Appersonam.P2pApp.on('simple:payment', function (model) {
            //Appersonam.navigate("p2p/simplePayment");
            API.simplePayment(model);
        });

        Appersonam.P2pApp.on('hype:request', function (model) {
            //Appersonam.navigate("p2p/hypeRequest");
            API.simpleRequest(model, true);
        });

        Appersonam.P2pApp.on('hype:payment', function (model) {
            //Appersonam.navigate("p2p/hypePayment");
            API.simplePayment(model, true);
        });


        Appersonam.P2pApp.on('simple:request', function (object) {
            //Appersonam.navigate("p2p/simpleRequest");
            API.simpleRequest(object);
        });

        P2pAppRouter.on('start', function () {
            new P2pAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.P2pAppRouter;
});