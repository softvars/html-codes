define(["app",
    "common/goals/list/list_view",
    "common/innerloading/view",
    "common/placeholder/view"], function (Appersonam, View, InnerLoading, Placeholder) {
        Appersonam.module("GoalsApp.List", function (List, Appersonam, Backbone, Marionette, $, _) {
            List.Controller = {
                listEntities: function (mode, quantity, goalsResume, query) {
                    var self = this;
                    var fetchingCachedGoals = Appersonam.request("global:get:object", 'goals');
                    require(["entities/goal"], function () {

                        if (query !== undefined && query !== "") {
                            var fetchingEntities = Appersonam.request("goal:search:report", query);
                        } else {
                            var fetchingEntities = Appersonam.request("goal:report", goalsResume);
                        }
                        $.when(fetchingCachedGoals).done(function (cachedGoals) {
                            console.log();

                            if ($.isEmptyObject(cachedGoals)) {
                                cachedGoals = {
                                    completedGoals: [],
                                    pausedGoals: [],
                                    ongoingGoals: [],
                                    expiredGoals: [],
                                    archivedGoals: [],
                                };
                            }

                            var entityListLayout = new View.Layout();
                            var entityListPanel = new View.Panel();
                            var containerRegion = null;
                            var listPanel;
                            self.doneFetching = false;
                            var loadingListView = new InnerLoading.LoadingListView();
                            entityListLayout.on("show", function () {
                                entityListLayout.panelRegion.show(entityListPanel);
                                if (mode!=='start' && !goalsResume && !(query !== undefined && query !== "") && self.doneFetching === false) {
                                    entityListLayout.loadingListRegion.show(loadingListView);
                                    setTimeout(function () {//do il tempo al layout di renderizzarsi, per poi animare lo scorrimento verso il basso della lista movimenti
                                        entityListLayout.loading(true);
                                    }, 80);
                                }
                            });
                            $.when(fetchingEntities).done(function (goalsResume) {
                                self.doneFetching = true;

                                Appersonam.request("global:initialize:object", goalsResume.toJSON(), 'goals');
                                listPanel = new View.ListPanel({
                                    model: goalsResume
                                });

                                if ((query || query === '')) {
                                    if (mode === 'no-action') {//no action fa sì che non avvenga lo switching  da movimenti a obbiettivi
                                        Appersonam.ActivitiesApp.trigger('refresh:child', entityListLayout, 'goals', true);
                                    }
                                    else {
                                        Appersonam.ActivitiesApp.trigger('show:child', entityListLayout, 'goals');
                                    }
                                }

                                try {
                                    self.displayLists(query, entityListLayout, entityListPanel, listPanel);
                                }
                                catch (ex) {
                                    LogDB.log('errore displayList lista obiettivi => ' + ex.message);
                                }

                                entityListPanel.on("goals:new", function () {
                                    Appersonam.ActivitiesApp.trigger("goals:new");
                                });

                                if (mode !== 'no-action') {//no action fa sì che non avvenga lo switching  da movimenti a obbiettivi
                                    Appersonam.ActivitiesApp.trigger('activate:navigation', true);
                                }
                                if ((query || query === '')) {
                                    $('.loading-contacts').hide();
                                }

                                loadingListView.close();
                                setTimeout(function () {//do il tempo al layout di renderizzarsi, per poi animare lo scorrimento verso il basso della lista movimenti
                                    entityListLayout.loading(false);
                                }, 80);
                            });
                            if (mode === 'no-action') {
                                Appersonam.ActivitiesApp.trigger('update:sts');
                            }
                            else if (mode === 'refresh') {
                                Appersonam.ActivitiesApp.trigger('update:sts', false);
                                Appersonam.CommonVariables.locked = false;
                                Appersonam.ActivitiesApp.trigger('refresh:child', entityListLayout, 'goals');
                                if (quantity > 0) {
                                    setTimeout(function () {
                                        Appersonam.ActivitiesApp.trigger("nav:back", 'activities/goals', quantity);
                                    }, 1000);
                                }
                            } else {
                                if (!(query || query === '')) {
                                    Appersonam.ActivitiesApp.trigger('show:child', entityListLayout, 'goals');
                                }
                            }

                            listPanel = new View.ListPanel({
                                model: new Backbone.Model(cachedGoals)
                            });

                            self.displayLists(query, entityListLayout, entityListPanel, listPanel);


                            entityListPanel.on("goals:new", function () {
                                Appersonam.ActivitiesApp.trigger("goals:new");
                            });
                        });
                    });
                },
                displayLists: function (query, entityListLayout, entityListPanel, listPanel) {
                    var completedGoals = listPanel.model.get('completedGoals');
                    var pausedGoals = listPanel.model.get('pausedGoals');
                    var onGoingGoals = listPanel.model.get('ongoingGoals');
                    var expiredGoals = listPanel.model.get('expiredGoals');
                    var archivedGoals = listPanel.model.get('archivedGoals');
                    var totalLength;
                    try {
                        totalLength = pausedGoals.length + completedGoals.length + expiredGoals.length + onGoingGoals.length + archivedGoals.length;
                    }
                    catch (ex) {
                        console.log(ex);
                        totalLength = 0;
                        LogDB.log('errore total length obiettivi => ' + ex.message);
                    }
                    if (totalLength > 0) {
                        entityListLayout.panelRegion.show(entityListPanel);
                        entityListLayout.entitiesRegion.show(listPanel);
                        var completedGoalsView = new View.Entities({
                            title: '<i class="icon-accept"></i>Completati',
                            type: 'completed',
                            collection: new Backbone.Collection(completedGoals)
                        });
                        if (completedGoals && completedGoals.length > 0) {
                            listPanel.completedRegion.show(completedGoalsView);
                        }

                        var pausedGoalsView = new View.Entities({
                            title: '<i class="icon-pause"></i>in Pausa',
                            type: 'paused',
                            collection: new Backbone.Collection(pausedGoals)
                        });
                        if (pausedGoals.length > 0) {
                            listPanel.pausedRegion.show(pausedGoalsView);
                        }
                        var onGoingGoalsView = new View.Entities({
                            title: '<i class="icon-refresh"></i>in Corso',
                            type: 'running',
                            collection: new Backbone.Collection(onGoingGoals)
                        });
                        if (onGoingGoals.length > 0) {
                            listPanel.onGoingRegion.show(onGoingGoalsView);
                        }

                        var expiredGoalsView = new View.Entities({
                            title: '<i class="icon-time"></i>Scaduti',
                            type: 'expired',
                            collection: new Backbone.Collection(expiredGoals)
                        });
                        var archivedGoalsView = new View.Entities({
                            title: '<i class="icon-save"></i>Archiviati',
                            type: 'archived',
                            collection: new Backbone.Collection(archivedGoals)
                        });
                        if (archivedGoals.length > 0) {
                            listPanel.archivedRegion.show(archivedGoalsView);
                        }
                        if (expiredGoals.length > 0) {
                            listPanel.expiredRegion.show(expiredGoalsView);
                        }
                    }
                    else {
                        if (query !== undefined && query !== "") {
                            var noGoalsView = new View.NoEntitiesView();
                        }
                        else {
                            var noGoalsView = new Placeholder.PlaceholderWidget({
                                placeholderType: 'goals'
                            });
                        }
                        entityListLayout.panelRegion.show(entityListPanel);
                        entityListLayout.entitiesRegion.show(noGoalsView);
                    }
                }
            }
        });
        return Appersonam.GoalsApp.List.Controller;
    });