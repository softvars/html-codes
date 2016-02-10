define(["app", "apps/activities/navigation/list/list_view"], function(Appersonam, Views) {
    Appersonam.module("ActivitiesApp.List", function(List, Appersonam, Backbone, Marionette, $, _) {
        List.Controller = {
            //layout: null,
            activateAvailableServices: function(userSettings, value) {
                var that = this;
                Appersonam.CommonVariables['SellaboxActive'] = false;
                Appersonam.CommonVariables['CardRechargeActive'] = false;
                if (userSettings && userSettings.availableServices) {
                    if (userSettings.availableServices.indexOf('SELLABOX_HYPE') > -1) {
                        Appersonam.CommonVariables['SellaboxActive'] = value;
                    }
                    if (userSettings.availableServices.indexOf('RICARICA_CARTA_HYPE') > -1) {
                        Appersonam.CommonVariables['CardRechargeActive'] = value;
                    }
                }
            },

            checkUserType: function() {
                var fetchingAccountInfos = Appersonam.request('global:get:object', 'customerAccountInfos');
                $.when(fetchingAccountInfos).done(function(accountInfos) {
                    if (!accountInfos || _.isEmpty(accountInfos) || JSON.stringify(accountInfos) === '{}' || JSON.stringify(accountInfos) === '[]') {
                        require(["entities/card"], function() {
                            var fetchingCard = Appersonam.request('card:entity');
                            $.when(fetchingCard).done(function(cardEntity) {
                                var isPlusCustomer = parseFloat(cardEntity.get('levelYear')) > 2500;
                                var customerType = cardEntity.get('customer');
                                accountInfos = {
                                    isPlusCustomer: isPlusCustomer,
                                    customerType: customerType
                                };
                                Appersonam.request('global:initialize:object', accountInfos, 'customerAccountInfos');
                                Appersonam.NavigationApp.trigger('set:menu', accountInfos);
                                Appersonam.CommonVariables['accountInfos'] = accountInfos;
                            });
                        });
                    } else {
                        Appersonam.NavigationApp.trigger('set:menu', accountInfos);
                        Appersonam.CommonVariables['accountInfos'] = accountInfos;
                    }
                });
            },

            activitiesNavigation: function(innerTrigger) {
                var self = this;
                if (innerTrigger === 'goals:list') {
                    this.activeView = 'goals';
                } else {
                    this.activeView = 'movements';
                }
                self.layout = new Views.Layout();
                require(["entities/activity", "entities/user", "entities/financialSituation", "entities/category"], function() {
                    Appersonam.request("category:entities");
                    var fetchingCachedFinancial = Appersonam.request("global:get:object", 'financial');
                    $.when(fetchingCachedFinancial).done(function(cachedFinancial) {
                        self.loading = true;
                        self.activateAvailableServices(cachedFinancial.userSettings, false); //inizialmente disattivo comunque i servizi, nel caso io abbia cachato che i servizi siano attivi, ma vengano poi disattivati
                        var fetchingFinancialSituation = Appersonam.request("financialSituation:entity");
                        //var fetchingUser = Appersonam.request("user:entity");
                        //var fecthingInitialResume = Appersonam.request("initial:resume");
                        var menuItems = Appersonam.request("activity:entities", innerTrigger);

                        if (cachedFinancial.length === 0 || _.isEmpty(cachedFinancial) || cachedFinancial['ErrorMessage']) {
                            var stsPanelModel = new Backbone.Model({
                                balance: '0',
                                cash: '0',
                                emoney: '0',
                                savedAmountForGoals: '0',
                                scheduledActivities: '0',
                                spendable: '0',
                                nickname: ''
                            });
                        } else {
                            var stsPanelModel = new Backbone.Model(cachedFinancial);
                            stsPanelModel.set({
                                nickname: stsPanelModel.get('userSettings').nickname
                            });
                        }

                        self.stsPanel = new Views.StsPanel({
                            model: stsPanelModel
                        });
                        self.stsPanel.on('corner:menu', function() {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        });
                        self.layout.on("transfer:menu", function() {
                            Appersonam.trigger('reset:loading');
                            Appersonam.trigger('show:loading');
                            setTimeout(function() {
                                Appersonam.trigger('hype:payment:new', true);
                                Appersonam.NavigationApp.trigger('set:selected', 'send', 1);
                            }, 800);
                        });
                        self.activityItemsView = new Views.ActivityItemsView({
                            collection: menuItems
                        });

                        self.searchView = new Views.SearchView();
                        self.searchView.on("search", function(query) {
                            if (self.activeView === "movements") {
                                Appersonam.ActivitiesApp.trigger("movements:list", null, 1, null, query);
                            } else if (self.activeView === "goals") {
                                Appersonam.ActivitiesApp.trigger("goals:list", null, 1, null, query);
                            }
                        });
                        self.stsPanel.on("render", function() {
                            if (self.loading == false) {
                                self.layout.removeCaching();
                            }
                        });
                        self.layout.on("show", function() {
                            self.layout.stsRegion.show(self.stsPanel);
                            self.layout.searchAreaRegion.show(self.searchView);
                            Appersonam.trigger('reset:loading');
                            self.layout.activitiesRegion.show(self.activityItemsView);
                            self.goalsResume = null;
                            self.movementsCollection = null;
                            if (innerTrigger === 'goals:list') {
                                //Appersonam.NavigationApp.trigger('set:selected', 'goals', 0);
                                Appersonam.ActivitiesApp.trigger("goals:list", 'start', 1, self.goalsResume);
                            } else {
                                //Appersonam.NavigationApp.trigger('set:selected', 'movements', 0);
                                Appersonam.ActivitiesApp.trigger("movements:list", 'start', 1, self.movementsCollection);
                            }
                        });

                        $.when(fetchingFinancialSituation).done(function(financialSituation) {
                            if (!financialSituation.get('ErrorMessage')) {
                                Appersonam.request('global:initialize:object', financialSituation.toJSON(), 'financial');
                                Appersonam.CommonVariables['savedForGoals'] = financialSituation.get('savedAmountForGoals');
                                Appersonam.CommonVariables['scheduled'] = financialSituation.get('scheduledActivities');
                                Appersonam.CommonVariables['balance'] = financialSituation.get('balance');
                                Appersonam.CommonVariables['sts'] = financialSituation.get('spendable');
                                self.activateAvailableServices(financialSituation.get('userSettings'), true);
                            }
                            //switchando subito da movimenti a obiettivi passando per il menù laterale potrebbe dare problemi, per ora mai verificati
                            //in tal caso aggiungere controllo per capire se la chiamata soddisfatta arrriva dai goal o dai movimenti
                            //setTimeout(function () {
                            self.loading = false;
                            if (Appersonam.currentApp.moduleName === 'ActivitiesApp') { //se dal menù principale mi sono spostato, non deve entrare in questo ramo
                                try {
                                    self.layout.activitiesRegion.show(self.activityItemsView);
                                    var user = Appersonam.request('new:user:entity', financialSituation.get('userSettings'));
                                    var userImage = user.get('imageBase64');
                                    if (!userImage) {
                                        userImage = '';
                                    }
                                    Appersonam.request("global:initialize:object", userImage, "userImage");
                                    var nickname = user.get('nickname');
                                    if (!nickname) {
                                        nickname = 'Il mio Hype';
                                    }
                                    Appersonam.NavigationApp.trigger('update:personaldata', userImage, nickname);
                                    if (financialSituation.get('userSettings')) {
                                        if (financialSituation.get('userSettings').availableServices) {
                                            var isWalletActive = (financialSituation.get('userSettings').availableServices.indexOf('WALLET_HYPE') > -1);
                                            Appersonam.CommonVariables.dealsImageUrl = (financialSituation.get('userSettings')).dealsImageUrl;
                                            Appersonam.CommonVariables.dealsImageKey = (financialSituation.get('userSettings')).dealsImageKey;
                                            Appersonam.CommonVariables.isDealsActive = 
                                            (financialSituation.get('userSettings').availableServices.indexOf('DEALS_HYPE') > -1) && 
                                            (financialSituation.get('userSettings').cardType !== 'YOOX');
                                            Appersonam.NavigationApp.trigger('set:menu', {
                                                deals: Appersonam.CommonVariables.isDealsActive,
                                                wallet: isWalletActive
                                            });
                                        } else {
                                            LogDB.log('errore navigationApp STS => financialSituation.userSettings.availableServices = null o undefined');
                                            LogDB.log('financialSituation: ' + JSON.stringify(financialSituation));
                                        }
                                    } else {
                                        LogDB.log('errore navigationApp STS => financialSituation.userSettings = null o undefined');
                                        LogDB.log('financialSituation: ' + JSON.stringify(financialSituation));
                                    }
                                    //$.when(fecthingInitialResume, fetchingCategories).done(function (initialResume) {
                                    //var user = new Backbone.Model(initialResume.get('settings'));
                                    Appersonam.CommonVariables['spendable'] = financialSituation.get('spendable');
                                    Appersonam.CommonVariables['balance'] = financialSituation.get('balance');
                                    Appersonam.CommonVariables['savedForGoals'] = financialSituation.get('savedAmountForGoals');
                                    Appersonam.CommonVariables['scheduled'] = financialSituation.get('scheduledActivities');
                                    Appersonam.CommonVariables['myself'] = user.toJSON();
                                    self.stsPanel.model.set(_.extend({
                                        nickname: user.get('nickname')
                                    }, financialSituation.toJSON()), {
                                        silent: true
                                    });
                                    self.stsPanel.render();
                                    self.layout.enableTransfer();
                                    Appersonam.CommonVariables.aliasIb = user.get('aliasIb');
                                    Appersonam.CommonVariables['userImageId'] = user.get('image');
                                    Appersonam.CommonVariables.idConto = user.get('idConto');
                                    var containerRegion = null;

                                    self.activityItemsView.on("switchArea", function(activityTrigger) {

                                        if (activityTrigger === 'goals:list') {
                                            self.setActive('goals');
                                        } else {
                                            self.setActive('movements');
                                            Appersonam.CommonVariables.movementsFetched = false;
                                        }
                                        self.searchView.clearSearch();
                                        self.layout.switchArea(activityTrigger.replace(':list', ''));
                                    });
                                    self.activityItemsView.on("navigate", function(model, showLoading) {
                                        self.searchView.clearSearch();
                                        self.refreshSts(false);
                                        var mode = 'start';
                                        if (!!showLoading) {
                                            mode = null;
                                        }
                                        var trigger = model.get("activityTrigger");
                                        if (trigger === 'goals:list') {
                                            self.goalsResume = null;
                                            Appersonam.ActivitiesApp.trigger("goals:list", mode, 1, self.goalsResume);
                                            self.setActive('goals');
                                        } else {
                                            self.movementsCollection = null;
                                            Appersonam.ActivitiesApp.trigger("movements:list", mode, 1, self.movementsCollection);
                                            self.setActive('movements');
                                        }
                                    });
                                    self.stsPanel.on('toggle:blur', function() {
                                        self.layout.toggleBlur();
                                    });
                                    if (Appersonam.CommonVariables.isDealsActive) {
                                        Appersonam.MovementsApp.trigger('show:deals:movements');
                                    }

                                } catch (ex) {
                                    LogDB.log('errore navigationApp lista => ' + ex.message);
                                }
                            }
                            //}, 3000);
                        });
                        Appersonam.ActivitiesApp.trigger('show:main', self.layout, 1);
                        if (!Appersonam.CommonVariables.movementsFetched) {
                            self.layout.disableTransfer();
                        }
                        Appersonam.trigger('close:loading'); //chiude il menu laterale
                    });

                });
            },
            hashSearch: function(query) {
                this.searchView.hashSearch(query);
            },
            toggleSts: function() {
                this.stsPanel.toggle();
            },
            setActive: function(target) {
                //this.activityItemsView.activateNavigation(false);
                this.activeView = target;
                this.activityItemsView.setActive(target);
                Appersonam.NavigationApp.trigger('set:selected', target, 0);
            },
            //activateNavigation: function (allowNavigation) {
            //    this.activityItemsView.activateNavigation(allowNavigation);
            //},
            updateCollection: function(object, target) {
                if (target === 'goals') {
                    this.goalsResume = object;
                } else {
                    this.movementsCollection = object.toJSON();
                }
            },
            showRegion: function(view, regionName, noSwitch) {
                if (noSwitch !== true) {
                    this.layout.showRegion(view, regionName);
                    //this.setActive(regionName);//COMMENTO PERCHE' ESISTE GIA' UN COMANDO CHE SWITCHA LA LINEA AZZURRA SOTTO LE VOCI
                } else {
                    this.layout.refreshRegion(view, regionName);
                }
            },
            refreshSts: function(showLoading) {
                var self = this;
                var fetchingEntity = Appersonam.request("financialSituation:entity", showLoading);
                $.when(fetchingEntity).done(function(entity) {
                    if (!entity.get('ErrorMessage')) {
                        Appersonam.CommonVariables.dealsImageUrl = (entity.get('userSettings')).dealsImageUrl;
                        Appersonam.CommonVariables.dealsImageKey = (entity.get('userSettings')).dealsImageKey;
                        Appersonam.CommonVariables['myself'] = entity.get('userSettings');
                        Appersonam.CommonVariables['balance'] = entity.get('balance');
                        Appersonam.CommonVariables['sts'] = entity.get('spendable');
                        Appersonam.request('global:initialize:object', entity.toJSON(), 'financial');
                    }
                    self.stsPanel.model.set(entity.toJSON());
                });
            },
            areaNameSelector: {
                'movementsAreaRegion': 'create',
                'update': 'update',
                'patch': 'patch',
                'delete': 'delete',
                'read': ''
            }
        };
    });
    return Appersonam.ActivitiesApp.List.Controller;
});
