define(["app", "apps/activities/movements/venue_list/venue_list_view"], function(Appersonam, VenueListView) {
    Appersonam.module("MovementsApp.VenueList", function(VenueList, Appersonam, Backbone, Marionette, $, _) {
        VenueList.Controller = {
            listVenueEntities: function(movement) {
                var self = this;
                self.movement = movement;
                require(["entities/movement", "entities/venue"], function() {
                    var layout = new VenueListView.Layout();
                    //var venueEntity = Appersonam.request("venue:entity:new");attualmente non è possibile salvare venue nuovi, quindi commento
                    var topPanel = new VenueListView.TopPanel( /*{ model: venueEntity }*/ );
                    var venueCollection = Appersonam.request("venue:entities:new");
                    var entityListView = new VenueListView.Entities({
                        collection: venueCollection
                    });

                    topPanel.on("venues:filter", function(filterCriterion) {
                        var fetchingVenues = Appersonam.request("venue:entities", filterCriterion);
                        $.when(fetchingVenues).done(function(data) {
                            if (data.length < 1) {
                                var geometry = {
                                    location: {
                                        lat: null,
                                        lng: null
                                    }
                                };
                                venueCollection.reset([{
                                    geometry: geometry,
                                    personal: true,
                                    name: filterCriterion
                                }]);
                            } else {
                                venueCollection.reset(data);
                            }
                            topPanel.hideLoading();
                        });
                    });
                    topPanel.on("back", function() {
                        Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements/' + self.movement.get('id'), 1);
                    });

                    layout.on("show", function() {
                        layout.topRegion.show(topPanel);
                        layout.listRegion.show(entityListView);
                    });
                    entityListView.on("itemview:venue:selected", function(itemView, model) {
                        self.movement.set({
                            merchant: {
                                name: model.get('name'),
                                latitude: model.get('geometry').location.lat,
                                longitude: model.get('geometry').location.lng
                            }
                        }, {
                            silent: true
                        });
                        self.movement.save(null, {
                            serviceDestination: 'NEW',
                            success: function(data) {
                                Appersonam.request('tracking:log:event', 'movement_set_merchant');
                                movement.set('merchant', self.movement.get('merchant'));
                                setTimeout(function() {
                                    Appersonam.ActivitiesApp.trigger('nav:back', '', 1);
                                }, 500);
                            },
                            error: function(data) {}
                        });
                    });
                    Appersonam.ActivitiesApp.trigger('show:main', layout, 3);
                    //});
                });
            }
        }
    });
    return Appersonam.MovementsApp.VenueList.Controller;
});
