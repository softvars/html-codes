define(["app",
    "apps/payments/mobile_recharge/profile_view",
    "common/authorize/profile_view",
    "common/keyboard/view",
    "common/combo/list/list_view",
    "common/confirm/profile_view"
], function(Appersonam, View, Authorize, Keyboard, Combo, Confirm) {
    Appersonam.module("PaymentsApp.RechargeProfile", function(RechargeProfile, Appersonam, Backbone, Marionette, $, _) {
        RechargeProfile.Controller = {

            unsetBackButtonHandler: function() {
                this.profileView.removeBlur();
                this.viewToHide.hideItems();
                Appersonam.off('back:button:clicked', this.unsetBackButtonHandler);
                Appersonam.CommonVariables.locked = false;
            },
            profile: function(id) {
                var self = this;
                require(["entities/recharge", 'entities/authorization'], function() {
                    //var fetchingOperators = Appersonam.request("operator:entities");

                    var fetchingOperatorsAndCuts = Appersonam.request("operators:cuts");
                    $.when(fetchingOperatorsAndCuts).done(function(operatorsAndCuts) {
                        var operators = new Backbone.Collection(operatorsAndCuts.get('cutsOperator'));
                        var rechargeModel = Appersonam.request("recharge:entity");

                        self.profileView = new View.Form({
                            model: rechargeModel
                        });
                        self.profileView.on('show', function() {
                            operatorsCombo = new Combo.ComboItemsView({
                                model: operators.first(),
                                collection: operators,
                                valueName: 'operator',
                                textName: 'operatorName',
                                inputName: 'manager',
                                selectFirstItem: true,
                                title: "Scegli l'operatore"
                                    /* labelName: 'name' */
                            });
                            operatorsCombo.on('item:selected', function(model) {
                                self.profileView.setOperatorValue(model);
                                self.profileView.removeBlur();
                                operatorName = model.get('operatorName');
                                operatorsCombo.hideItems();
                                Appersonam.off('back:button:clicked', self.unsetBackButtonHandler);
                                Appersonam.CommonVariables.locked = false;
                                var cuts = model.get('cuts');
                                var cutsCollection = new Array();
                                for (var i = 0; i < cuts.length; i++) {
                                    var model = new Backbone.Model({
                                        CutValue: cuts[i],
                                        CutText: cuts[i],
                                        amount: cuts[i]
                                    });
                                    cutsCollection[i] = model;
                                }
                                //

                                cutsCombo = new Combo.ComboItemsView({
                                    model: new Backbone.Model(cutsCollection[0]),
                                    collection: new Backbone.Collection(cutsCollection),
                                    valueName: 'CutValue',
                                    textName: 'CutText',
                                    inputName: 'amount',
                                    selectFirstItem: true,
                                    title: 'Scegli il taglio della ricarica'
                                        /* labelName: 'name' */
                                });
                                cutsCombo.on('item:selected', function(model) {
                                    self.profileView.setCutValue(model);
                                    self.profileView.removeBlur();
                                    cutsCombo.hideItems();
                                    Appersonam.off('back:button:clicked', self.unsetBackButtonHandler);
                                    Appersonam.CommonVariables.locked = false;
                                });
                                self.profileView.on('cuts:show', function(key) {
                                    self.profileView.addBlur();
                                    cutsCombo.showItems();
                                    Appersonam.on('back:button:clicked', self.unsetBackButtonHandler, self);
                                    self.viewToHide = cutsCombo;
                                    Appersonam.CommonVariables.locked = true;
                                });
                                cutsCombo.on('close:combo', function(model) {
                                    self.profileView.removeBlur();
                                    cutsCombo.hideItems();
                                    Appersonam.off('back:button:clicked', self.unsetBackButtonHandler);
                                    Appersonam.CommonVariables.locked = false;
                                });
                                Appersonam.PaymentsApp.trigger('close:overlay', '-cuts');
                                cutsCombo.persistent = true;
                                Appersonam.PaymentsApp.trigger('show:overlay', cutsCombo, '-cuts');

                                //
                            });
                            operatorsCombo.on('close:combo', function(model) {
                                self.profileView.removeBlur();
                                operatorsCombo.hideItems();
                                Appersonam.off('back:button:clicked', self.unsetBackButtonHandler);
                                Appersonam.CommonVariables.locked = false;
                            });
                            self.profileView.on('operators:show', function(key) {
                                self.profileView.addBlur();
                                operatorsCombo.showItems();
                                Appersonam.on('back:button:clicked', self.unsetBackButtonHandler, self);
                                self.viewToHide = operatorsCombo;
                                Appersonam.CommonVariables.locked = true;
                            });
                        });
                        self.profileView.on('corner:menu', function() {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        });
                        self.profileView.on("form:submit", function(data) {
                            rechargeModel.clear();
                            rechargeModel.set(data, {
                                silent: true
                            });
                            var errors = rechargeModel.validate();

                            if (!_.isEmpty(errors)) {
                                self.profileView.triggerMethod("form:data:invalid", errors);
                            } else {
                                self.showResume(rechargeModel, operatorName);
                            }
                        });
                        Appersonam.PaymentsApp.trigger('show:main', self.profileView, 1);
                        operatorsCombo.persistent = true;
                        Appersonam.PaymentsApp.trigger('show:overlay', operatorsCombo, '-operators');

                        //});
                    });
                });
            },

            showResume: function(rechargeModel, operatorName) {
                var self = this;
                var rechargeData = rechargeModel.toJSON();
                var resumeModel = new Backbone.Model({
                    amount: rechargeModel.get('amount'),
                    operatorName: operatorName,
                    phoneNumber: rechargeModel.get('numcell'),
                });
                var resumeView = new View.Resume({
                    model: resumeModel
                });
                resumeView.on('cancel', function() {
                    Appersonam.PaymentsApp.trigger('close:overlay', '-resume');
                });
                resumeView.on('close', function() {
                    self.profileView.removeBlur();
                });
                resumeView.on('confirm', function() {
                    rechargeModel.save(null, {
                        success: function(result) {
                            if (result.get('ErrorMessage') === '') {
                                self.showResult(true, 'Ricarica eseguita con successo');
                                Appersonam.request('tracking:log:event', 'mobile_recharged');
                                Appersonam.PaymentsApp.trigger('close:overlay', resumeView, '-resume');
                            } else { //serve autorizzazione
                                var errorCode = result.get('ErrorMessage')[0].errorCode;
                                rechargeModel.clear();
                                delete rechargeData.pin;
                                delete rechargeData.pwd;
                                rechargeModel.set(rechargeData, {
                                    silent: true
                                });
                                self.authorize(errorCode, rechargeModel);
                                resumeView.triggerMethod('set:lock:button', false);
                            }
                        },
                        error: function() {
                            rechargeModel.clear();
                            delete rechargeData.pin;
                            delete rechargeData.pwd;
                            rechargeModel.set(rechargeData, {
                                silent: true
                            });
                            self.authorize('000', rechargeModel);
                            resumeView.triggerMethod('set:lock:button', false);
                        }
                    });
                });
                self.profileView.addBlur();
                Appersonam.PaymentsApp.trigger('show:overlay', resumeView, '-resume');
            },

            authorize: function(errorCode, rechargeModel) {
                var self = this;
                var authorizationModel;
                switch (errorCode) {
                    case "690":
                        authorizationModel = Appersonam.request("authorization:entity", true, false); //solo pin
                        break;
                    case "691":
                        authorizationModel = Appersonam.request("authorization:entity", false, true); //solo pwd
                        break;
                    case "692":
                        authorizationModel = Appersonam.request("authorization:entity", true, true); //pin e pwd
                        break;
                    default:
                        self.showResult(false, self.errorCodesMap['000']);
                        return false;
                        break;
                }
                var pinView = new Authorize.Pin({
                    model: authorizationModel
                });
                pinView.on('close', function() {
                    pinView.triggerMethod('set:lock:button', false);
                    self.profileView.removeBlur();
                    Appersonam.PaymentsApp.trigger('close:overlay', '-pin');
                });
                pinView.on('form:submit', function(data) {
                    rechargeModel.set(data, {
                        silent: true
                    });
                    var rechargeData = rechargeModel.toJSON();
                    rechargeModel.save(null, {
                        success: function(result) {
                            if (result.get('ErrorMessage') === '') {
                                self.showResult(true, 'Ricarica eseguita con successo');
                                Appersonam.request('tracking:log:event', 'mobile_recharged');
                            } else {
                                //errore
                                var authError = result.get('ErrorMessage')[0].errorCode;
                                rechargeModel.clear();
                                delete rechargeData.pin;
                                delete rechargeData.pwd;
                                rechargeModel.set(rechargeData, {
                                    silent: true
                                });
                                if (authError === '694' || authError === '693') {
                                    self.showResult(false, self.errorCodesMap[authError]);
                                } else {
                                    self.showResult(false, self.errorCodesMap[authError]);
                                }
                            }
                            pinView.close();
                        },
                        error: function(data) {
                            rechargeModel.clear();
                            delete rechargeData.pin;
                            delete rechargeData.pwd;
                            rechargeModel.set(rechargeData, {
                                silent: true
                            });
                            self.errorCodesMap['000'];
                            pinView.close();
                        }
                    });
                });
                self.profileView.addBlur();
                Appersonam.PaymentsApp.trigger('show:overlay', pinView, '-pin');
            },
            errorCodesMap: {
                '693': 'Il pin inserito non è valido',
                '694': 'Il pin o la password inseriti non sono validi',
                '000': 'Errore generico'
            },
            showResult: function(success, message) {
                var self = this;
                if (success === true) {
                    var confirmModel = new Backbone.Model({
                        header: 'Grande!',
                        title: 'Ricarica eseguita con successo',
                        description: "L'accredito verrà confermato entro pochi minuti",
                        button: 'Torna ai movimenti',
                        className: 'receipt-dialog',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger',
                    });
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.profileView.removeBlur();
                    Appersonam.PaymentsApp.trigger('close:overlay', '-confirm');
                });
                confirmPanel.on("confirm", function() {

                    Appersonam.trigger('reset:loading');
                    Appersonam.trigger('show:loading');
                    setTimeout(function() {
                        self.profileView.removeBlur();
                        Appersonam.PaymentsApp.trigger('close:overlay', '-confirm');
                        Appersonam.trigger('activities', 'movements:list', true);
                        Appersonam.NavigationApp.trigger('set:selected', 'movements', 1);
                    }, 300);
                    //Appersonam.PaymentsApp.trigger('nav:back', "", 1); // la view delle  ricariche è singola, non c'è un "back" dove andare 
                });
                self.profileView.addBlur();
                Appersonam.PaymentsApp.trigger('show:overlay', confirmPanel, '-confirm');
            },
        };
    });
    return Appersonam.PaymentsApp.RechargeProfile.Controller;
});
