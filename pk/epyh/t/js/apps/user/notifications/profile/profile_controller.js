define(["app", "apps/user/notifications/profile/profile_view"/*, "common/keyboard/view"*/], function (Appersonam, View /*,Keyboard*/) {
    Appersonam.module("Userapp.NotificationProfile", function (NotificationProfile, Appersonam, Backbone, Marionette, $, _) {
        NotificationProfile.Controller = {
            profile: function (user, model, triggerObject, triggersList) {
                var self = this;
                require(["entities/user", "entities/trigger"], function () {
                    self.user = user;
                    self.triggersCollection = new Backbone.Collection(user.get('triggers'));

                    var view = new View.Form({
                        model: model,
                        triggersObjectTree: triggerObject.get('map')
                    });

                    view.on("model:save", function (formData) {
                        var model = { data: formData };
                        var triggerToCreate = Appersonam.request('trigger:entity', model);
                        triggerToCreate.save(null, {
                            encode: false,
                            serviceDestination: 'NEW',
                            success: function (result) {
                                var updatedCollection = (result.get('triggers'));
                                Appersonam.request('tracking:log:event', 'trigger_created');
                                triggersList.reset(updatedCollection);
                                setTimeout(function () {
                                    Appersonam.UserApp.trigger("nav:back", 'user', 1);
                                },
                                300)
                            },
                            error: function (result) {

                            }
                        });
                    });
                     
                    /*view.on("keyboard:show", function (value) {
                        var keyboard = new Keyboard.KeyboardWidget({ value: value });
                        view.keyboardRegion.show(keyboard);

                        keyboard.on("keyboard:value:changed", function (data) {
                            view.setAmount(data);
                        });

                        keyboard.on("keyboard:close", function (data) {
                            view.keyboardRegion.close();
                        });
                    });*/

                    view.on("subject:selected", function (optionsList, level, state, value) {
                        var optionsCollection = new Backbone.Collection(optionsList);
                        var choiceView = new View.OptionsList({ collection: optionsCollection, level: level, state: state, value: value });
                        view.addBlur();
                        Appersonam.UserApp.trigger('show:overlay', choiceView, '_1');

                        choiceView.on("choice:selected", function (key, level, state) {
                            view.updateMenu(key, level, state);
                            view.removeBlur();
                            Appersonam.UserApp.trigger('close:overlay', '_1');
                        });
                        choiceView.on("close:choices", function () {
                            view.removeBlur();
                            Appersonam.UserApp.trigger('close:overlay', '_1');
                        });
                    });

                    view.on("back", function () {
                        Appersonam.UserApp.trigger("nav:back", 'user', 2);
                    });

                    Appersonam.UserApp.trigger('show:main', view, 3);
                });
            }
        };
    });
    return Appersonam.Userapp.NotificationProfile.Controller;
});
