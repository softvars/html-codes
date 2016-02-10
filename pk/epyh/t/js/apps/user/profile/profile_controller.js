define(["app",
    "apps/user/profile/profile_view",
    "common/innerloading/view",
    "common/confirm/profile_view"
], function(Appersonam, View, innerLoading, Confirm) {
    Appersonam.module("UserApp.Profile", function(Profile, Appersonam, Backbone, Marionette, $, _) {
        Profile.Controller = {

            profile: function(FetchingAllUserInfo, resumePanel, fetchingAliasVm) {
                var resume = resumePanel.model;
                var self = this;
                require(["entities/file", "entities/user"], function() {
                    var deviceVariables = Appersonam.request('global:get:device');
                    var view;
                    view = new View.Form({
                        model: new Backbone.Model()
                    });

                    view.on("back", function() {
                        Appersonam.UserApp.trigger("nav:back", 'user', 1);
                    });

                    Appersonam.UserApp.trigger('show:main', new innerLoading.LoadingListView(), 2);
                    try {
                        $.when(FetchingAllUserInfo, fetchingAliasVm).done(function(allUserInfo, aliasVm) {
                            var userData = allUserInfo.get('userSettings');

                            var emailsView = new View.AliasListView({
                                collection: aliasVm.emailList,
                                model: aliasVm.primaryMail
                            });

                            var phonesView = new View.AliasListView({
                                collection: aliasVm.phoneList,
                                model: aliasVm.primaryPhone
                            });

                            view.model.clear({
                                silent: true
                            });
                            view.model = Appersonam.request('new:user:entity', userData);

                            var aliasesViews = [emailsView, phonesView];

                            view.on('render', function() {

                                var execRemoveAlias = function(model) {
                                    var message = "Stai per eliminare un indirizzo e-mail di contatto";
                                    if (model.get('type') === 'M') {
                                        message = "Stai per eliminare un numero di contatto";
                                    }
                                    var confirmModel = new Backbone.Model({
                                        title: message,
                                        description: "",
                                        button: 'Conferma Eliminazione',
                                        className: 'confirmation-dialog-danger',
                                    });
                                    var confirmPanel = new Confirm.Profile({
                                        model: confirmModel
                                    });
                                    Appersonam.UserApp.trigger('show:overlay', confirmPanel, '-delete-confirm');
                                    view.addBlur();
                                    confirmPanel.on('cancel', function() {
                                        view.removeBlur();
                                        Appersonam.UserApp.trigger('close:overlay', '-delete-confirm');
                                    });
                                    confirmPanel.on('confirm', function() {
                                        var deleteAlias = Appersonam.request('delete:alias', model.toJSON());
                                        deleteAlias.save(null, {
                                            withoutMethods: true,
                                            success: function(resultData) {
                                                if (resultData.get('status').code === 'OK') {
                                                    Appersonam.request('tracking:log:event', 'alias_deleted');

                                                    var aliasView = model.get('type') === 'M' ? phonesView : emailsView;


                                                    aliasView.collection.remove(model, {
                                                        silent: true
                                                    });
                                                    aliasView.collection.sort();
                                                    aliasView.count = 0;
                                                    aliasView.model.set({
                                                        maxReached: aliasView.collection.length >= Appersonam.CommonVariables.aliasesLimit
                                                    }, {
                                                        silent: true
                                                    });
                                                    aliasView.render();

                                                    view.removeBlur();
                                                    Appersonam.UserApp.trigger('close:overlay', '-delete-confirm');
                                                    deleteAlias.clear();
                                                } else {
                                                    confirmPanel.model.set({
                                                        title: resultData.get('status').description,
                                                        button: null
                                                    });
                                                    confirmPanel.render();
                                                    deleteAlias.clear();
                                                }
                                            },
                                            error: function() {
                                                deleteAlias.clear();
                                            },
                                        });

                                    });

                                };

                                var execActivateAlias = function(model) {
                                    var thisView = this;
                                    var activateView = new View.ActivateAlias({
                                        model: model
                                    });
                                    activateView.on("back", function() {
                                        Appersonam.UserApp.trigger("nav:back", 'user', 2);
                                        delete activateView;
                                    });
                                    activateView.on("submit", function(otp) { //da rivedere
                                        var activateAlias = Appersonam.request('activate:alias', model.toJSON(), otp);
                                        var isValid = activateAlias.save(null, {
                                            withoutMethods: true,
                                            success: function(resultData) {
                                                if (resultData.get('status').code === 'OK') {
                                                    Appersonam.request('tracking:log:event', 'alias_activated');
                                                    var aliasView = model.get('type') === 'M' ? phonesView : emailsView;

                                                    model.set({
                                                        active: true,
                                                        activeOrderValue: 1,
                                                        defaultAlias: false,
                                                        defaultOrderValue: 2
                                                    });
                                                    aliasView.collection.sort();
                                                    aliasView.count = 0;
                                                    aliasView.render();
                                                    Appersonam.UserApp.trigger("nav:back", 'user', 2);
                                                    delete activateView;
                                                } else {
                                                    var resultError = {
                                                        otp: resultData.get('status').description
                                                    };
                                                    activateAlias.unset('status');
                                                    activateAlias.unset('UserAlias');
                                                    activateView.triggerMethod("form:data:invalid", resultError);
                                                }
                                            },
                                            error: function() {},
                                        });
                                        if (isValid !== true) {
                                            activateView.triggerMethod("form:data:invalid", activateAlias.validationError);
                                        }
                                    });
                                    Appersonam.UserApp.trigger('show:main', activateView, 3);
                                };

                                var execSubmitAlias = function(data) {
                                    var thisView = this;
                                    var newAlias = Appersonam.request('new:alias', data.type);
                                    newAlias.set({
                                        alias: data.alias
                                    });
                                    var isValid = newAlias.save(null, {
                                        withoutMethods: true,
                                        success: function(resultData) {
                                            if (resultData.get('Status').code === 'OK') {
                                                Appersonam.request('tracking:log:event', 'alias_created');
                                                //var newModel = new Backbone.Model(resultData.get('UserAlias'));
                                                var newModel = Appersonam.request('empty:alias', {
                                                    active: false,
                                                    value: newAlias.get('alias'),
                                                    type: data.type
                                                });
                                                thisView.collection.add(newModel, {
                                                    silent: true
                                                });

                                                thisView.model.set({
                                                    maxReached: thisView.collection.length >= Appersonam.CommonVariables.aliasesLimit
                                                }, {
                                                    silent: true
                                                });

                                                thisView.count = 0;
                                                thisView.render();
                                                newAlias.clear();
                                            } else {
                                                var resultError = {
                                                    alias: resultData.get('Status').description
                                                };
                                                //newAlias.unset('Status');
                                                //resultData.unset('UserAlias');
                                                thisView.triggerMethod("form:data:invalid", resultError);
                                            }
                                        },
                                        error: function() {},
                                    });
                                    if (isValid !== true) {
                                        this.triggerMethod("form:data:invalid", newAlias.validationError);
                                    }
                                };

                                var execSetPrimary = function(model) {
                                    var thisView = this;
                                    var newPrimary = Appersonam.request('set:primary:entity', model.toJSON());
                                    newPrimary.save(null, {
                                        withoutMethods: true,
                                        success: function(resultData) {
                                            Appersonam.request('tracking:log:event', 'primary_alias_changed');
                                            if (model.get('type') === 'E') {
                                                var newPrincipalValue = resultData.get('primaryMail');
                                                thisView.model.set({
                                                    value: newPrincipalValue
                                                }, {
                                                    silent: true
                                                });
                                                thisView.collection.reset(resultData.get('secondaryMail'), {
                                                    silent: true
                                                });
                                                thisView.render();
                                            } else {
                                                var newPrincipalValue = resultData.get('primaryPhone');
                                                thisView.model.set({
                                                    value: newPrincipalValue
                                                }, {
                                                    silent: true
                                                });
                                                thisView.collection.reset(resultData.get('secondaryPhone'), {
                                                    silent: true
                                                });
                                                thisView.render();
                                            }
                                        },
                                        error: function() {},
                                    });
                                };

                                for (var i = aliasesViews.length - 1; i >= 0; i--) {

                                    aliasesViews[i].on('remove', execRemoveAlias);
                                    aliasesViews[i].on('activate', execActivateAlias);
                                    aliasesViews[i].on('submit', execSubmitAlias);
                                    aliasesViews[i].on('set:primary', execSetPrimary);

                                    if (aliasesViews[i].model.get("type") === 'E') {
                                        view.emailAliasesRegion.show(aliasesViews[i]);
                                    } else if (aliasesViews[i].model.get("type") === 'M') {
                                        view.phoneAliasesRegion.show(aliasesViews[i]);
                                    }
                                }
                            });
                            view.on("form:submit", function(nickname) {
                                var imageBase64 = view.model.get('imageBase64');
                                view.model.save({
                                    nickname: nickname,
                                    imageBase64: undefined
                                }, {
                                    silent: true,
                                    showLoading: false,
                                    serviceDestination: 'NEW',
                                    success: function(data) {
                                        if (data.get('ErrorMessage')) {
                                            data.unset('ErrorMessage', {
                                                silent: true
                                            });
                                        }
                                        Appersonam.CommonVariables.myself.nickname = nickname;
                                        Appersonam.NavigationApp.trigger('update:personaldata', imageBase64, nickname);

                                        $.when(Appersonam.request("global:get:object", 'userInfo')).done(function(cachedObject) {
                                            cachedObject.nickname = nickname;
                                            Appersonam.request("global:initialize:object", cachedObject, 'userInfo');
                                        });
                                    },
                                    error: function(data) {}
                                });
                                resumePanel.model.set({
                                    nickname: nickname
                                });
                                resumePanel.render();
                                Appersonam.UserApp.trigger("nav:back", 'user', 1);
                            });
                            Appersonam.UserApp.trigger('show:main', view, 2);
                        });
                    } catch (ex) {
                        console.log(ex);
                    }
                });
            }
        };
    });
    return Appersonam.UserApp.Profile.Controller;
});
