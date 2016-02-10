define(["app",
    "apps/card/recharge/menu/show_view"], function (Appersonam, View) {
        Appersonam.module("CardApp.RechargeMenu", function (RechargeMenu, Appersonam, Backbone, Marionette, $, _) {
            RechargeMenu.Controller = {
                show: function () {
                    var fetchingCachedUserInfo = Appersonam.request("global:get:object", 'userInfo');
                    var fetchingAllUserInfo = Appersonam.request("get:all:user:info", false);
                    var self = this;
                    self.showView = new View.Menu();
                    self.showView.on('corner:menu', function () {
                        Appersonam.NavigationApp.trigger('corner:menu');
                    });
                    $.when(fetchingCachedUserInfo).done(function (cachedData) {
                        var cachedDataEmpty = false;
                        if (cachedData.length === 0 || _.isEmpty(cachedData) || cachedData['ErrorMessage']) {
                            cachedDataEmpty = true;
                        }
                        if (cachedDataEmpty === false) {
                            self.showView.on('item:selected', function (choice) {
                                if (choice === 'card') {
                                    Appersonam.CardApp.trigger('recharge:via:card');
                                }
                                else {
                                    Appersonam.CardApp.trigger('recharge:via:transfer', cachedData.userSettings);
                                }
                            });
                        }
                        else {
                            $.when(fetchingAllUserInfo).done(function (allUserInfo) {
                                Appersonam.request("global:initialize:object", allUserInfo.toJSON(), 'userInfo');
                                self.showView.on('item:selected', function (choice) {
                                    if (choice === 'card') {
                                        Appersonam.CardApp.trigger('recharge:via:card');
                                    }
                                    else {
                                        Appersonam.CardApp.trigger('recharge:via:transfer', allUserInfo.get('userSettings'));
                                    }
                                });
                            });
                        }
                    });
                    Appersonam.CardApp.trigger('show:main', self.showView, 1);
                }
            };
        });
        return Appersonam.CardApp.RechargeMenu.Controller;
    });
