define(["app", "apps/user/notifications/list/list_view", "common/placeholder/view"], function (Appersonam, View, Placeholder) {
    Appersonam.module("UserApp.NotificationList", function (NotificationList, Appersonam, Backbone, Marionette, $, _) {
        NotificationList.Controller = {
            list: function (mode) {
                var self = this;
                require(["entities/user", "entities/trigger"], function () {
                    var fetchingEntity = Appersonam.request("user:entity");
                    var fetchingTriggers = Appersonam.request("trigger:map:entity");
                    $.when(fetchingEntity, fetchingTriggers).done(function (user, triggersObject) {
                        var view;
                        self.collection = new Backbone.Collection(user.get('triggers'));
                        view = new View.Entities({
                            collection: self.collection,
                            triggersObject: triggersObject.get('map'),
                            emptyView: Placeholder.PlaceholderWidget
                        });
                        self.collection.bind('remove', function () {
                            view.render();
                        }, self);
                        self.collection.bind('change', function () {
                            view.render();
                        }, self);
                        view.on("itemview:notification:selected", function (itemview, model) {
                            Appersonam.UserApp.trigger('user:notification:profile', user, model, triggersObject);
                        });
                        view.on("itemview:notification:delete", function (itemview, model) {
                            var triggerToDelete = Appersonam.request("trigger:entity", model.toJSON());
                            triggerToDelete.destroy(
                            {
                                serviceDestination: 'NEW',
                                success: function (result) {
                                Appersonam.request('tracking:log:event', 'trigger_deleted');
                                    //Appersonam.trigger('user:home', 'refresh');
                                    self.collection.remove(model);
                                },
                                error: function (result) {

                                }
                            });
                        });
                        view.on("notification:new", function () {
                            Appersonam.UserApp.trigger('user:notification:profile', user, new Backbone.Model(), triggersObject, self.collection);
                        });
                        view.on("back", function () {
                            Appersonam.UserApp.trigger("nav:back", 'user', 1);
                        });
                        if (mode === 'refresh') {
                            Appersonam.UserApp.trigger('refresh:panel', view, 2);
                            /*Appersonam.trigger('user:home', 'refresh');
                            setTimeout(function () {
                                Appersonam.UserApp.trigger("nav:back", 'user', 1);
                            }, 500);*/
                        }
                        else {
                            Appersonam.UserApp.trigger('show:main', view, 2);
                        }
                    });
                });
            }
        };
    });
    return Appersonam.UserApp.NotificationList.Controller;
});
