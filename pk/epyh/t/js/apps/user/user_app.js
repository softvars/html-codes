define(["app"], function (Appersonam) {
    Appersonam.module("UserApp", function (UserApp, Appersonam, Backbone, Marionette, $, _) {

        UserApp.startWithParent = false;

        UserApp.onStart = function () {
        };

        UserApp.onStop = function () {
            Appersonam.UserApp.trigger('unset:panelManager');
        };
    });
    Appersonam.module("Routers.UserApp", function (UserAppRouter, Appersonam, Backbone, Marionette, $, _) {

        UserAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                //"user/profile": "profile",
                //"user": "userNavigation",
                //"user/coordinates": "coordinates",
                //"user/stats": "stats",
                //"user/stats": "stats",
                //"user/notifications": "notifications",
                //"user/notifications/:id": "notificationProfile",
            }
        });

        var self = this;

        var API = {
            newAlias: function (type) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => newAlias');
                Appersonam.request('tracking:log:event', 'new_alias');
                require(["apps/user/profile/profile_controller"], function (controller) {
                    controller.profile(FetchingAllUserInfo, resumePanel, fetchingAliases);
                });
            },
            profile: function (FetchingAllUserInfo, resumePanel, fetchingAliases) {
                Appersonam.request('tracking:log:event', 'user_profile');
                LogDB.log(Appersonam.currentApp.moduleName + ' => profile');
                require(["apps/user/profile/profile_controller"], function (controller) {
                    controller.profile(FetchingAllUserInfo, resumePanel, fetchingAliases);
                });
            },
            changePin: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => changePin');
                Appersonam.request('tracking:log:event', 'pin_change');
                require(["apps/user/changePin/change_pin_controller"], function (controller) {
                    controller.profile();
                });
            },
            coordinates: function (userEntity) {
                Appersonam.request('tracking:log:event', 'show_coordinates');
                LogDB.log(Appersonam.currentApp.moduleName + ' => coordinates');
                require(["common/coordinates/coordinates_controller"], function (controller) {
                    controller.coordinates(userEntity);
                });
            },
            help: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => help');
                Appersonam.request('tracking:log:event', 'help_menu');
                require(["apps/user/help/show_controller"], function (controller) {
                    controller.show();
                });
            },
            userNavigation: function (mode) {
                require(["apps/user/navigation/list/list_controller"], function (controller) {
                    if (!self.panelManager) {
                        self.fromMenu = true;
                    }
                    if (mode !== 'refresh') {
                        Appersonam.startSubApp("UserApp");
                        require(["common/panel/panel_manager"], function (PanelManager) {
                            self.panelManager = new PanelManager.Panels();
                            Appersonam.NavigationApp.trigger('toggle:menu');
                            setTimeout(function () {
                                Appersonam.mainContentRegion.show(self.panelManager);
                                controller.userNavigation(mode);
                            }, 300);
                        });
                    }
                    else {
                        controller.userNavigation(mode);
                    }
                    LogDB.log(Appersonam.currentApp.moduleName + ' => userNavigation');
                });
            },
            sellabox: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => sellaBox');
                Appersonam.request('tracking:log:event', 'sellabox');
                require(["apps/user/sellabox/list_controller"], function (controller) {
                    controller.list();
                });
            },
            stats: function () {
                LogDB.log(Appersonam.currentApp.moduleName + ' => stats');
                Appersonam.request('tracking:log:event', 'statistics');
                require(["apps/user/stats/show_controller"], function (controller) {
                    controller.showEntity(null);
                });
            },
            notifications: function (mode) {
                LogDB.log(Appersonam.currentApp.moduleName + ' => notifications');
                Appersonam.request('tracking:log:event', 'notifications_list');
                require(["apps/user/notifications/list/list_controller"], function (controller) {
                    controller.list(mode);
                });
            },
            notificationProfile: function (user, model, triggersObject, collection) {
                Appersonam.request('tracking:log:event', 'notification_profile');
                LogDB.log(Appersonam.currentApp.moduleName + ' => notificationProfile');
                require(["apps/user/notifications/profile/profile_controller"], function (controller) {
                    controller.profile(user, model, triggersObject, collection);
                });
            }
        };

        Appersonam.UserApp.on('show:overlay', function (childView, index) {
            self.panelManager.showOverlay(childView, index);
        });

        Appersonam.UserApp.on('panelManager:onBackFunction', function (onBackFunction) {
            self.panelManager.onBackFunction = onBackFunction;
        });

        Appersonam.UserApp.on('refresh:panel', function (childView, index) {
            self.panelManager.refresh(childView, index);
        });

        Appersonam.UserApp.on('close:overlay', function (index) {
            self.panelManager.closeOverlay(index);
        });

        Appersonam.on('back:button:clicked', function () {
            if (self.panelManager) {
                self.panelManager.backButton();
            }
        });

        Appersonam.UserApp.on('nav:back', function (address, quantity) {
            //Appersonam.navigate(address);
            self.panelManager.goTo(null, quantity);
        });

        Appersonam.UserApp.on('show:main', function (childView, index) {
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

        Appersonam.UserApp.on('unset:panelManager', function () {
            delete self.panelManager;
        });

        Appersonam.UserApp.on('user:profile', function (FetchingAllUserInfo, resumePanel, fetchingAliases) {
            //Appersonam.navigate("user/profile");
            API.profile(FetchingAllUserInfo, resumePanel, fetchingAliases);
        });

        Appersonam.UserApp.on('user:stats', function () {
            //Appersonam.navigate("user/stats");
            API.stats();
        });

        Appersonam.UserApp.on('sellabox', function () {
            //Appersonam.navigate("user/sellabox");
            API.sellabox();
        });

        Appersonam.UserApp.on('user:notifications', function (mode) {
            //Appersonam.navigate("user/notifications");
            API.notifications(mode);
        });

        Appersonam.UserApp.on('user:notification:profile', function (user, model, triggersObject, collection) {
            API.notificationProfile(user, model, triggersObject, collection);
        });

        Appersonam.UserApp.on('user:coordinates', function (userEntity) {
            //Appersonam.navigate("user/coordinates");
            API.coordinates(userEntity);
        });

        Appersonam.UserApp.on('user:home', function (mode) {
            //Appersonam.navigate("user");
            API.userNavigation(mode);
        });

        Appersonam.UserApp.on('user:help', function () {
            API.help();
        });

        Appersonam.UserApp.on('user:changepin', function () {
            API.changePin();
        });

        Appersonam.on('user:home', function (mode) {
            //Appersonam.navigate("user");
            API.userNavigation(mode);
        });

        Appersonam.on('user:new:alias', function (type) {
            //Appersonam.navigate("user");
            API.newAlias(mode);
        });


        Appersonam.UserApp.on('user:resume', function (mode) {
            //Appersonam.navigate("user");
            API.userNavigation('refresh');
        });

        UserAppRouter.on('start', function () {
            new UserAppRouter.Router({
                controller: API
            });
        });
    });
    return Appersonam.UserAppRouter;
});