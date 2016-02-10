define(["app",
    "apps/activities/goals/transfer/transfer_view",
    "common/keyboard/view",
    "config/marionette/keyboardRegion"], function (Appersonam, View, Keyboard) {
        Appersonam.module("GoalsApp.Transfer", function (Transfer, Appersonam, Backbone, Marionette, $, _) {
            Transfer.Controller = {
                transferEntity: function (goal) {
                    require(["entities/goal", "entities/financialSituation"], function () {
                        var fetchingFinancial = Appersonam.request("financialSituation:entity");
                        $.when(fetchingFinancial).done(function (financial) {
                            if (!financial.get('ErrorMessage')) {
                                Appersonam.request('global:initialize:object', financial.toJSON(), 'financial');
                            }
                            var view;
                            var transferModel = new Backbone.Model({ financial: financial.toJSON(), goal: goal.toJSON() })
                            view = new View.Form({
                                model: transferModel
                            });
                            view.on("transfer:confirm", function (value) {
                                goal.set({ currentAmount: value });
                                goal.save(null,
                                    {
                                        serviceDestination: 'NEW',
                                        success: function (result) {
                                            Appersonam.ActivitiesApp.trigger('goals:show', goal, "refresh");
                                        },
                                        error: function (result) {
                                        }
                                    });
                            });

                            view.on("keyboard:show", function (value) {
                                if (value === '') {
                                    value = '0';
                                }
                                var keyboard = new Keyboard.KeyboardWidget({ value: value });
                                view.keyboardRegion.show(keyboard);

                                keyboard.on("keyboard:value:changed", function (data) {
                                    view.setAmount(data);
                                });

                                keyboard.on("keyboard:close", function (data) {
                                    view.keyboardRegion.close();
                                });
                            });
                            view.on("keyboard:close", function (data) {
                                view.keyboardRegion.close();
                            });

                            view.on("back", function () {
                                Appersonam.ActivitiesApp.trigger("nav:back", 'activities/goals' + goal.get('id'), 1);
                            });
                            Appersonam.ActivitiesApp.trigger('show:main', view, 3);
                        });
                    });
                }
            };
        });
        return Appersonam.GoalsApp.Transfer.Controller;
    });
