define(["app", "apps/activities/movements/list/list_view", "common/innerloading/view",
    "common/placeholder/view"
], function(Appersonam, View, InnerLoading, Placeholder) {
    Appersonam.module("MovementsApp.List", function(List, Appersonam, Backbone, Marionette, $, _) {
        List.Controller = {
            showDeals: function() {
                if (Appersonam.CommonVariables.canShowDeals === true && Appersonam.CommonVariables.isDealsActive === true && Appersonam.CommonVariables.movementsFetched === true) {
                    //if(true){  //se ho caricato la financialsituation e i movimenti, e il servizio deal è attivo e non ho chiuso il banner dei deal
                    this.entityListLayout.showDeals();
                }
            },
            listEntities: function(mode, quantity, entities, query) { //entities qua arriva sempre null, da rimuovere
                var self = this;
                var search = false;
                require(["entities/movement"], function() {
                    //TEST
                    //if (true) {
                    if (Appersonam.CommonVariables['ContactsUpdated'] !== true) {
                        Appersonam.CommonVariables['FetchingAllContacts'] = Appersonam.request('update:stored:contacts');
                    }

                    var startDate = new Date().getTime();
                    var disableScrolling = false;

                    if (!self.entityListView) {
                        var firstTime = true;
                    }
                    var fetchingCachedMovements = Appersonam.request("global:get:object", 'movements');
                    $.when(fetchingCachedMovements).done(function(cachedMovements) {
                        self.entityListLayout = new View.Layout();
                        var loadingListView = new InnerLoading.LoadingListView();
                        self.entityListLayout.on("show", function() {
                            if ((query === undefined || query === "") && mode !== 'start') {
                                self.entityListLayout.loadingListRegion.show(loadingListView);
                                setTimeout(function() { //do il tempo al layout di renderizzarsi, per poi animare lo scorrimento verso il basso della lista movimenti
                                    self.entityListLayout.toggleClassToElement('add', '#entities-region', 'loading');
                                }, 80);
                            }
                            self.entityListLayout.entitiesRegion.show(self.entityListView);
                        });

                        if (query !== undefined && query !== "") {
                            var fetchingEntities = Appersonam.request("movement:search:entities", query);
                            disableScrolling = true;
                        } else {
                            var fetchingEntities = Appersonam.request("movement:entities", 0, 19, startDate, entities, firstTime);
                        }
                        entities = Appersonam.request('movement:new:collection', cachedMovements);
                        var entityListModel = new Backbone.Model({
                            search: '',
                            incomes: 0,
                            outcomes: 0
                        });
                        self.entityListView = new View.Entities({
                            collection: entities,
                            model: entityListModel,
                            emptyView: Placeholder.PlaceholderWidget
                        });
                        self.entityListView.setWaiting(true);
                        self.entityListView.on("itemview:movements:show", function(childView, model) {
                            if (query !== undefined && query !== "") {
                                var newModel = Appersonam.request('new:entity', model.toJSON());
                                Appersonam.ActivitiesApp.trigger("movements:show", newModel);
                            } else {
                                Appersonam.ActivitiesApp.trigger("movements:show", model);
                            }
                        });

                        self.entityListView.on("refresh", function() {
                            Appersonam.ActivitiesApp.trigger('update:sts', false);
                            self.listEntities('clear', 1, null, undefined);
                        });

                        self.entityListView.on("itemview:hash:search", function(childView, value) {
                            Appersonam.ActivitiesApp.trigger("hash:search", value);
                        });

                        self.loadingItemViewModel = new Backbone.Model({
                            loading: true,
                            date: Date(-8640000000000000),
                            id: 'loading'
                        }); //elemento da appendere alla lista, in coda

                        $.when(fetchingEntities).done(function(resultEntity) {
                            loadingListView.close();
                            setTimeout(function() {
                                Appersonam.CommonVariables.movementsFetched = true;
                                self.showDeals();                                
                            }, 1000);
                            Appersonam.NavigationApp.trigger("set:selected", 'movements', 0);
                            self.entityListLayout.toggleClassToElement('remove', '#entities-region', 'loading');
                            self.entityListView.setWaiting(disableScrolling);
                            if (resultEntity instanceof Backbone.Model) {
                                self.entityListView.searchMode = true;
                                Appersonam.ActivitiesApp.trigger('show:child', self.entityListLayout, 'movements');
                                var entities = new Backbone.Collection(resultEntity.get('movements'));
                                var incomes = resultEntity.get('entrate');
                                var outcomes = resultEntity.get('uscite');
                                var search = true;
                            } else {
                                self.entityListView.searchMode = false;
                                if (!resultEntity.get('ErrorMessage')) {
                                    Appersonam.request("global:initialize:object", resultEntity, 'movements'); //non ho fatto una ricerca
                                }
                                var entities = resultEntity;
                                var outcomes = null,
                                    outcomes = null;
                                search = false;
                            }
                            var entityListModel = new Backbone.Model({
                                search: search,
                                incomes: incomes,
                                outcomes: outcomes
                            })
                            Appersonam.ActivitiesApp.trigger('update:collection', entities, 'movements');
                            if (entities.models.length < 1) {
                                entities = new Backbone.Collection();
                            }
                            self.entityListView.collection = entities;
                            self.entityListView.model = entityListModel;
                            if (disableScrolling === true) {
                                $('.loading-contacts').hide();
                            }

                            self.entityListView.on("next", function(index, lastMovementDate) {
                                self.updateCollection(index, lastMovementDate);
                            });
                            if (self.entityListLayout.entitiesRegion) {
                                self.entityListLayout.entitiesRegion.show(self.entityListView);
                            }
                            Appersonam.ActivitiesApp.trigger('activate:navigation', true);
                        });
                        if (mode === 'refresh') {
                            Appersonam.ActivitiesApp.trigger('refresh:child', self.entityListLayout, 'movements');
                            if (quantity > 0) {
                                setTimeout(function() {
                                    Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements', quantity);
                                }, 1000);
                            }
                        } else {
                            if (!query || query.length < 1) {
                                Appersonam.ActivitiesApp.trigger('show:child', self.entityListLayout, 'movements');
                            }
                        }
                        Appersonam.trigger('close:loading');
                    });
                });
            },
            updateCollection: function(index, lastMovementDate) {
                var self = this;
                var fetchingEntities = Appersonam.request("movement:entities", index, index + 19, lastMovementDate);
                self.entityListView.collection.add(self.loadingItemViewModel);
                self.entityListView.render();
                $.when(fetchingEntities).done(function(entities) {
                    self.entityListView.collection.remove(self.loadingItemViewModel);
                    if (entities.length > 0) { //devo aggiornare la lista solo se ho aggiunto dei movimenti
                        Appersonam.ActivitiesApp.trigger('update:collection', entities, 'movements');
                        entities.add(self.entityListView.collection.toJSON()); //merge delle due liste
                        self.entityListView.collection.reset(entities.toJSON());
                        self.entityListView.setWaiting(false);
                        self.entityListView.render();
                    }
                });
            },
        }
    });
    return Appersonam.MovementsApp.List.Controller;
});
