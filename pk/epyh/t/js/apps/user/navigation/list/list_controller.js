define(["app",
    "apps/user/navigation/list/list_view",
    "common/image/profile/profile_view",
    "common/confirm/profile_view"
], function(Appersonam, View, ImageProfile, Confirm) {
    Appersonam.module("UserApp.Navigation", function(Navigation, Appersonam, Backbone, Marionette, $, _) {
        Navigation.Controller = {
            userNavigation: function(mode) {
                var self = this;
                this.layout = new View.Layout();
                var fetchingAliases = null;
                var resumeModel = null;
                var resumePanel = null;
                require(["entities/file", "entities/user"], function() {

                    //var fetchingActiveAliases = Appersonam.request("user:active:aliases");
                    //var fetchingInactiveAliases = Appersonam.request("user:inactive:aliases");
                    var deviceVariables = Appersonam.request('global:get:device');
                    var fetchingAllUserInfo = Appersonam.request("get:all:user:info", false);
                    var fetchingCachedFinancial = Appersonam.request("global:get:object", 'financial');
                    var fetchingCachedUserInfo = Appersonam.request("global:get:object", 'userInfo');
                    var fetchingCustomerInfos = Appersonam.request("global:get:object", 'customerAccountInfos');

                    var userActionsView = new View.UserActionsView();
                    $.when(fetchingCustomerInfos, fetchingCachedUserInfo, fetchingCachedFinancial).done(function(customerInfos, cachedData, cachedFinantial) {
                        if (cachedData.length === 0 || _.isEmpty(cachedData) || cachedData['ErrorMessage']) {

                            if (!cachedFinantial.userSettings) {
                                cachedFinantial.userSettings = {
                                    imageBase64: ''
                                }
                            }
                            cachedData = {
                                userReport: {
                                    incomes: 0,
                                    expenses: 0,
                                    goals: 0
                                },
                                userSettings: {
                                    nickname: '',
                                    imageBase64: cachedFinantial.userSettings.imageBase64,
                                    loadingImage: true,
                                    image: null
                                },
                            };
                        } else {
                            fetchingAliases = Appersonam.request("user:all:aliases", cachedFinantial.userSettings.email, cachedFinantial.userSettings.phone);
                            userActionsView.on("profile", function() {
                                Appersonam.UserApp.trigger('user:profile', fetchingAllUserInfo, resumePanel, fetchingAliases);
                            });
                        }
                        var cachedUserInfo = new Backbone.Model(cachedData);
                        var userData = cachedUserInfo.get('userSettings');
                        resumeModel = new Backbone.Model(cachedUserInfo.get('userReport'));
                        resumeModel.set(userData);
                        if (!_.isEmpty(customerInfos)) {
                            resumeModel.set({
                                isPlusCustomer: customerInfos.isPlusCustomer,
                                isYooxCustomer: (customerInfos.customerType === 'YOOX')
                            });
                        }
                        resumePanel = new View.ResumePanel({
                            model: resumeModel
                        });

                        self.layout.on("help", function() {
                            //Sella.deviceactions.sendMail('help@hype.it', 'Hype - Ho bisogno di Aiuto', '');
                            Appersonam.UserApp.trigger('user:help');
                        });

                        self.layout.on("show", function() {
                            self.layout.resumeRegion.show(resumePanel);
                            self.layout.actionsRegion.show(userActionsView);
                        });
                        userActionsView.on("navigate", function(trigger) {
                            Appersonam.UserApp.trigger(trigger, userData);
                        });
                        self.layout.on('corner:menu', function() {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        });
                        self.layout.on('sellabox', function() {
                            self.showSellabox();
                        });
                        if (mode === 'refresh') {
                            Appersonam.UserApp.trigger('refresh:panel', self.layout, 1);
                        } else {
                            Appersonam.UserApp.trigger('show:main', self.layout, 1);
                        }
                        $.when(fetchingAllUserInfo).done(function(allUserInfo) {
                            try {
                                if (!fetchingAliases) {
                                    fetchingAliases = Appersonam.request("user:all:aliases", allUserInfo.get('userSettings').email, allUserInfo.get('userSettings').phone);
                                    userActionsView.on("profile", function() {
                                        Appersonam.UserApp.trigger('user:profile', fetchingAllUserInfo, resumePanel, fetchingAliases);
                                    });
                                }

                                Appersonam.request("global:initialize:object", allUserInfo.toJSON(), 'userInfo');
                                resumeModel.clear({
                                    silent: true
                                });
                                resumeModel.set(allUserInfo.get('userReport'), {
                                    silent: true
                                });
                                userData = allUserInfo.get('userSettings');
                                Appersonam.CommonVariables['myself'] = userData;
                                resumeModel.set(userData, {
                                    silent: true
                                });
                                var imageId = resumeModel.get('image');
                                if (!_.isEmpty(customerInfos)) {
                                    resumeModel.set({
                                        isPlusCustomer: customerInfos.isPlusCustomer,
                                        isYooxCustomer: (customerInfos.customerType === 'YOOX')
                                    });
                                }

                                self.layout.resumeRegion.show(resumePanel);

                                var imageProfileView = null;
                                imageProfile = Appersonam.request("file:entity", imageId);
                                imageProfileView = new ImageProfile.ImageWidget({
                                    model: imageProfile,
                                    platform: deviceVariables.platform
                                });
                                imageProfileView.on('image:selected', function(imageBase64, model) {
                                    var oldData = model.toJSON();
                                    model.unset('label');
                                    model.save({
                                        content: imageBase64
                                    }, {
                                        serviceDestination: 'NEW',
                                        success: function(result) {
                                            if (result.get('ErrorMessage')) {
                                                model.clear();
                                                model.set(oldData, {
                                                    silent: true
                                                });
                                            }
                                            //aggiorno cache dati utente
                                            cachedData.userSettings.imageBase64 = imageBase64;
                                            Appersonam.request('tracking:log:event', 'user_image_updated');
                                            Appersonam.request("global:initialize:object", cachedData, "userInfo");
                                            Appersonam.request("global:initialize:object", imageBase64, "userImage");
                                            //aggiorno immagine piccola menù
                                            Appersonam.NavigationApp.trigger('update:personaldata', imageBase64, null);

                                            Appersonam.CommonVariables['userImageId'] = result.get('id');
                                            imageProfileView.model.set('content', imageBase64);
                                            resumePanel.model.set('imageBase64', imageBase64, {
                                                silent: true
                                            });
                                            resumePanel.render();
                                            if (!resumeModel.get('image')) { //se l'utente non aveva già una foto 
                                                resumeModel.set('image', result.get('id'), {
                                                    silent: true
                                                });
                                                userData.image = result.get('id');
                                                self.setUserImageId(userData); //chiamo il server per settare l'id dell'immagine per questo utente
                                            }
                                        },
                                        error: function(data) {}
                                    });
                                });
                                self.layout.imageProfileRegion.show(imageProfileView);
                                self.layout.on('select:image', function() {
                                    imageProfileView.selectImage();
                                });

                            } catch (exception) {
                                console.log('exception: ' + exception);
                            }
                        });
                    });
                });
            },
            showSellabox: function() {
                var that = this;
                var fetchingSellabox = Appersonam.request('sellabox:disclaimer');
                $.when(fetchingSellabox).done(function(sellaboxDisclaimer) {
                    if (sellaboxDisclaimer.get('show') === 'true') {
                        //that.layout.addBlur();
                        that.acceptDisclaimer();
                    } else {
                        that.goToSellabox();
                    }
                });
            },
            acceptDisclaimer: function() {
                var that = this;
                var acceptDisclaimer = Appersonam.request('accept:disclaimer:entity');
                acceptDisclaimer.fetch({
                    success: function(response) {
                        that.goToSellabox();
                    },
                    error: function(response) {}
                });
            },
            goToSellabox: function() {
                Appersonam.UserApp.trigger('sellabox');
            },
            setUserImageId: function(userData) {
                var userEntity = Appersonam.request('new:user:entity', userData);
                userEntity.save(null, {
                    silent: true,
                    serviceDestination: 'NEW',
                    success: function(data) {
                        if (data.get('ErrorMessage')) {
                            data.unset('ErrorMessage', {
                                silent: true
                            });
                        }
                        Appersonam.CommonVariables['myself'].image = userData.image;
                    },
                    error: function(data) {}
                });
            }
        };
    });
    return Appersonam.UserApp.Navigation.Controller;
});
