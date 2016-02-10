define(["app",
    "apps/payments/bills/profile_view",
    "common/keyboard/view",
    "common/authorize/profile_view",
    "common/combo/list/list_view"], function (Appersonam, View, Keyboard, Authorize, Combo) {
        Appersonam.module("PaymentsApp.BillProfile", function (BillProfile, Appersonam, Backbone, Marionette, $, _) {
            BillProfile.Controller = {
                profile: function (id) {
                    var self = this;
                    require(["entities/bill", 'entities/authorization'], function () {
                        var fetchingOperators = Appersonam.request("utility:entities");
                        $.when(fetchingOperators).done(function (operators) {
                            var checkBillModel = Appersonam.request("checkbill:entity");
                            //checkBillModel.set('discriminatore', operators[0].discriminatore);
                            var profileView = new View.Form({ model: checkBillModel });
                            for (var i = 0; i < operators.length; i++) {
                                operators[i].name = operators[i].denominazione;
                                operators[i].id = operators[i].discriminatore;
                            }
                            var combo = new Combo.ComboItemsView({ model: new Backbone.Model(operators[0]), collection: new Backbone.Collection(operators), valueName: 'id', textName: 'denominazione', inputName: 'discriminatore' });

                            combo.on('item:selected', function (key, value, text) {
                                profileView.setValue(key, value, text);
                                profileView.removeBlur();
                                combo.hideItems();
                            });
                            profileView.on('combo:show', function (key) {
                                profileView.addBlur();
                                combo.showItems();
                            });
                            profileView.on("keyboard:show", function (value, key) {
                                var keyboard = new Keyboard.KeyboardWidget({ value: value, pinMode: true });
                                profileView.keyboardRegion.show(keyboard);
                                keyboard.on("keyboard:value:changed", function (value) {
                                    profileView.setValue(key, value.replace(/^0+(?!$)/, ''));
                                });
                                profileView.keyboardRegion.show(keyboard);
                                keyboard.on("keyboard:close", function () {
                                    profileView.keyboardRegion.close();
                                });
                            });
                            profileView.on("form:submit", function (model) {
                                model.save(null,
                                    {
                                        success: function (data) {
                                            if (data.get('ErrorMessage')[0]) {
                                                profileView.showErrors(data.get('ErrorMessage'));
                                            }
                                            else {
                                                var fetchingAuthorization = Appersonam.request("authorization:entity");
                                                $.when(fetchingAuthorization).done(function (authorization) {
                                                    var pinView = new Authorize.Pin({ model: authorization })
                                                    pinView.on('keyboard:show', function (value) {
                                                        var pinKeyboard = new Keyboard.KeyboardWidget({ value: value });
                                                        pinView.keyboardRegion.show(pinKeyboard);

                                                        pinKeyboard.on("keyboard:value:changed", function (data) {
                                                            pinView.setPin(data);
                                                        });
                                                        pinKeyboard.on("keyboard:close", function () {
                                                            pinView.keyboardRegion.close();
                                                        });
                                                    });
                                                    pinView.on('close', function () {
                                                        profileView.removeBlur();
                                                        Appersonam.PaymentsApp.trigger('close:overlay', 'pin');
                                                    });
                                                    pinView.on('form:submit', function (value) {
                                                        var completePaymentModel = Appersonam.request("bill:confirm");
                                                        completePaymentModel.set({ pwd: value });
                                                        completePaymentModel.save(null, {
                                                            success: function (data) {
                                                                if (data.get('ErrorMessage')[0].errorCode === '000004') {
                                                                    model.unset('ErrorMessage');
                                                                    profileView.wrongPassword();
                                                                    pinView.close();
                                                                }
                                                                else {
                                                                    profileView.removeBlur();
                                                                    profileView.success();
                                                                    Appersonam.PaymentsApp.trigger('close:overlay');
                                                                    pinView.close();
                                                                }
                                                            },
                                                            error: function (data) {

                                                            }
                                                        });
                                                    });
                                                    profileView.addBlur();
                                                    Appersonam.PaymentsApp.trigger('close:overlay');
                                                    Appersonam.PaymentsApp.trigger('show:overlay', pinView, 'pin');
                                                });
                                            }
                                        },
                                        error: function () {

                                        }
                                    });


                                //var errors = model.validate();
                                //if (errors) {
                                //    profileView.triggerMethod("form:data:invalid", errors);
                                //}
                                //else {
                                //    var fetchingAuthorization = Appersonam.request("authorization:entity");
                                //    $.when(fetchingAuthorization).done(function (authorization) {
                                //        var pinView = new View.Pin({ model: authorization })
                                //        pinView.on('keyboard:show', function (value) {
                                //            var pinKeyboard = new Keyboard.KeyboardWidget({ value: value });
                                //            pinView.keyboardRegion.show(pinKeyboard);

                                //            pinKeyboard.on("keyboard:value:changed", function (data) {
                                //                pinView.setPin(data);
                                //            });
                                //            pinView.keyboardRegion.show(pinKeyboard);
                                //            pinKeyboard.on("keyboard:close", function () {
                                //                pinView.keyboardRegion.close();
                                //            });
                                //        });
                                //        pinView.on('form:submit', function (value) {
                                //            model.set({ pwd: value });
                                //            model.save(null, {
                                //                //headers: {
                                //                //    "Cookie": 'Cookie:ASP.NET_SessionId=agarq23rfhn4upd2gfikf4g1'
                                //                //},
                                //                success: function (data) {
                                //                    if (data.get('ErrorMessage')[0].errorMessage === 'Attenzione Password non valida') {
                                //                        model.unset('ErrorMessage');
                                //                        profileView.wrongPassword();
                                //                        pinView.close();
                                //                    }
                                //                    else {
                                //                        profileView.success();
                                //                        pinView.close();
                                //                    }
                                //                },
                                //                error: function (data) {

                                //                }
                                //            });
                                //        });
                                //        profileView.pinRegion.show(pinView);
                                //    });
                                //}
                            });
                            Appersonam.PaymentsApp.trigger('show:main', profileView, 1);
                            Appersonam.PaymentsApp.trigger('show:overlay', combo);
                            //});
                        });
                    });
                }
            };
        });
        return Appersonam.PaymentsApp.BillProfile.Controller;
    });