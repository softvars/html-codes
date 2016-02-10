define(["app",
    "apps/activities/goals/profile/profile_view",
    "common/dropdown/list/list_view",
    "common/keyboard/view",
    "common/confirm/profile_view",
    "config/marionette/keyboardRegion"
], function(Appersonam, View, DropDown, Keyboard, Confirm) {
    Appersonam.module("GoalsApp.Profile", function(Profile, Appersonam, Backbone, Marionette, $, _) {
        Profile.Controller = {
            sendDealsFeedback: function(goalId) {
                var feedbackData = {
                    service: 'obiettivoCreate',
                    idObiettivo: goalId,
                    idDeal: '',
                    itemCode: '',
                    queryString: ''
                };
                var dealFeedback = Appersonam.request('deals:feedback', feedbackData);
                dealFeedback.save(null, {
                    withoutMethods: true,
                    showLoading: false,
                    success: function(result) {},
                    error: function(result) {}
                });
            },
            entityFromDeal: function(data) {
                var that = this;
                if (data.base64Image) {
                    require(["entities/file", "entities/deals"], function() {
                        var imageProfile = Appersonam.request("file:entity", null);
                        imageProfile.set({
                            content: data.base64Image
                        });
                        imageProfile.save(null, {
                            serviceDestination: 'NEW',
                            success: function(result) {
                                data.image = result.id;
                                that.newEntity(data, 3, true);
                            },
                            error: function(data) {}
                        });
                    });
                } else {
                    this.newEntity(data, 3, true);
                }
            },
            newEntity: function(data, page, fromDeals) {
                var that = this;
                require(["entities/goal", "entities/category"], function() {
                    var view;
                    var newEntity = Appersonam.request("goal:entity:new");
                    if (data) {
                        newEntity.set({
                            image: data.image,
                            total: data.item.price,
                            title: data.item.name
                        });
                    }
                    newEntity.set({
                        sts: Appersonam.CommonVariables['sts']
                    }, {
                        silent: true
                    }); // STS SERVE PER MOSTRARE IN ALTO SE L'AMMONTARE DELL'OBBIETTIVO LO SUPERA
                    var fetchingCategories = Appersonam.request("category:entities");
                    $.when(fetchingCategories).done(function(categories) {
                        newEntity.set({
                            category: categories.first()
                        });
                        view = new View.Form({
                            model: newEntity,
                            generateTitle: true
                        });

                        view.on("back", function() {
                            Appersonam.currentApp.trigger("nav:back", 'activities/goals', 1);
                        });
                        view.on("form:submit", function(data) {
                            newEntity.set(data, {
                                silent: true
                            });
                            newEntity.unset('deals');
                            var sts = newEntity.get('sts');
                            newEntity.unset('sts');
                            if (newEntity.save(null, {
                                    serviceDestination: 'NEW',
                                    success: function(data) {
                                        Appersonam.request('tracking:log:event', 'goals_create_completed');
                                        if (fromDeals) {
                                            Appersonam.currentApp.trigger('nav:back', '', 1);
                                        } else {
                                            Appersonam.currentApp.trigger('goals:show', newEntity, 'refresh');
                                        }
                                        that.sendDealsFeedback(data.id);
                                    },
                                    error: function(data) {}
                                }) === false) {
                                var sts = newEntity.set('sts', sts);
                                view.triggerMethod("form:data:invalid", newEntity.validationError);
                            }
                        });

                        view.on("keyboard:show", function(value) {
                            var keyboard = new Keyboard.KeyboardWidget({
                                value: value
                            });
                            view.keyboardRegion.show(keyboard);

                            keyboard.on("keyboard:value:changed", function(data) {
                                view.setAmount(data);
                            });
                            keyboard.on("keyboard:close", function(data) {
                                view.keyboardRegion.close();
                            });
                        });

                        view.on("keyboard:close", function() {
                            view.keyboardRegion.close();
                        });
                        var dropdown = new DropDown.DropdownItemsView({
                            collection: categories,
                            selectedItem: categories.first()
                        });
                        dropdown.on("item:selected", function(data) {
                            view.model.set({
                                category: data
                            });
                        });
                        if (!page) {
                            page = 2;
                        }
                        Appersonam.currentApp.trigger('show:main', view, page);
                        view.dropdwonRegion.show(dropdown);
                    });
                });
            },
            editEntity: function(entity) {
                var self = this;
                require(["entities/goal", "entities/category"], function() {
                    var fetchingCategories = Appersonam.request("category:entities");
                    $.when(fetchingCategories).done(function(categories) {
                        self.doneFetching(entity, categories);
                    });
                });
            },
            editEntityById: function(id) {
                var self = this;
                require(["entities/goal", "entities/category"], function() {
                    var fetchingCategories = Appersonam.request("category:entities");
                    var fetchingEntity = Appersonam.request("goal:entity", id);
                    $.when(fetchingEntity, fetchingCategories).done(function(entity, categories) {
                        self.doneFetching(entity, categories);
                    });
                });
            },
            doneFetching: function(entity, categories) {
                var view;
                entity.set({
                    sts: Appersonam.CommonVariables['sts']
                }, {
                    silent: true
                }); // STS SERVE PER MOSTRARE IN ALTO SE L'AMMONTARE DELL'OBBIETTIVO LO SUPERA
                view = new View.Form({
                    model: entity
                });

                view.on("keyboard:show", function(value) {
                    var keyboard = new Keyboard.KeyboardWidget({
                        value: value
                    });
                    view.keyboardRegion.show(keyboard);

                    keyboard.on("keyboard:value:changed", function(data) {
                        view.setAmount(data);
                    });

                    keyboard.on("keyboard:close", function(data) {
                        view.keyboardRegion.close();
                    });
                });

                view.on("back", function() {
                    Appersonam.currentApp.trigger("nav:back", 'activities/goals/' + entity.get('id'), 1);
                });

                view.on("form:submit", function(data) {
                    entity.set(data, {
                        silent: true
                    });
                    entity.set(data, {
                        silent: true
                    });
                    entity.unset('sts');
                    entity.unset('deals');
                    if (entity.save(null, {
                            serviceDestination: 'NEW',
                            success: function(result) {
                                Appersonam.request('tracking:log:event', 'goals_edit_completed');
                                Appersonam.currentApp.trigger('goals:show', entity, "refresh");
                            },
                            error: function(result) {}
                        }) === false) {
                        var sts = entity.set('sts', sts);
                        view.triggerMethod("form:data:invalid", entity.validationError);
                    }
                });
                var dropdown = new DropDown.DropdownItemsView({
                    collection: categories,
                    selectedItem: entity.get('category')
                });
                dropdown.on("item:selected", function(data) {
                    view.model.set({
                        category: data
                    });
                });
                Appersonam.currentApp.trigger('show:main', view, 3); //se sto creando un goal dai deal currentapp è dealsapp
                view.dropdwonRegion.show(dropdown);
            }
        };
    });

    return Appersonam.GoalsApp.Profile.Controller;
});
