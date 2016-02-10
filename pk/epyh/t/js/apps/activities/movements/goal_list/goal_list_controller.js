define(["app",
        //"apps/activities/movements/goal_list/goal_list_view", non più in uso
        "common/confirm/profile_view",
        "common/goals/list/list_view"
    ],
    function(Appersonam, /* GoalListView,  non più in uso*/ Confirm, Goals) {
        Appersonam.module("MovementsApp.GoalList", function(GoalList, Appersonam, Backbone, Marionette, $, _) {
            GoalList.Controller = {
                listGoalEntities: function(movement, criterion, query) {
                    var self = this;
                    self.movement = movement;
                    require(["entities/movement", "entities/goal"], function() {
                        var fetchingEntities = Appersonam.request("goal:report", null, true);

                        self.goal = Appersonam.request("goal:entity:new");
                        self.layout = new Goals.AssociateMovementLayout();

                        var goalPanel = null;
                        self.listPanel = null;
                        self.topPanel = new Goals.TopPanel();
                        self.topPanel.on('back', function() {
                            Appersonam.ActivitiesApp.trigger("nav:back", 'activities/movements/' + self.movement.get('id'), 1);
                        });

                        $.when(fetchingEntities).done(function(goalsResume) {

                            if (goalsResume) {

                                self.listPanel = new Goals.ListPanel({
                                    model: goalsResume
                                });
                                self.listPanel.on('show', function() {
                                    var completedGoals = this.model.get('completedGoals');
                                    var pausedGoals = this.model.get('pausedGoals');
                                    var onGoingGoals = this.model.get('ongoingGoals');
                                    var expiredGoals = this.model.get('expiredGoals');

                                    var completedGoalsView = new Goals.MovementsEntities({
                                        title: '<i class="icon-accept"></i>Completati',
                                        type: 'completed',
                                        collection: new Backbone.Collection(completedGoals)
                                    });
                                    completedGoalsView.on("goal:selected", function(model) {
                                        self.goal.set(model.toJSON());
                                        self.goalSelected();
                                    });
                                    if (completedGoals.length > 0) {
                                        self.listPanel.completedRegion.show(completedGoalsView);
                                    }

                                    var pausedGoalsView = new Goals.MovementsEntities({
                                        title: '<i class="icon-pauseCircle"></i>In Pausa',
                                        type: 'paused',
                                        collection: new Backbone.Collection(pausedGoals)
                                    });
                                    pausedGoalsView.on("goal:selected", function(model) {
                                        self.goal.set(model.toJSON());
                                        self.goalSelected();
                                    });
                                    if (pausedGoals.length > 0) {
                                        self.listPanel.pausedRegion.show(pausedGoalsView);
                                    }

                                    var onGoingGoalsView = new Goals.MovementsEntities({
                                        title: '<i class="icon-refresh"></i>In corso',
                                        type: 'running',
                                        collection: new Backbone.Collection(onGoingGoals)
                                    });
                                    onGoingGoalsView.on("goal:selected", function(model) {
                                        self.goal.set(model.toJSON());
                                        self.goalSelected();
                                    });
                                    if (onGoingGoals.length > 0) {
                                        self.listPanel.onGoingRegion.show(onGoingGoalsView);
                                    }

                                    var expiredGoalsView = new Goals.MovementsEntities({
                                        title: '<i class="icon-time"></i>Scaduti',
                                        type: 'expired',
                                        collection: new Backbone.Collection(expiredGoals)
                                    });
                                    expiredGoalsView.on("goal:selected", function(model) {
                                        self.goal.set(model.toJSON());
                                        self.goalSelected();
                                    });
                                    if (expiredGoals.length > 0) {
                                        self.listPanel.expiredRegion.show(expiredGoalsView);
                                    }
                                });

                                self.layout.on("show", function() {
                                    self.layout.listRegion.show(self.listPanel);
                                    self.layout.topRegion.show(self.topPanel);
                                });

                                Appersonam.ActivitiesApp.trigger('show:main', self.layout, 3)
                            }
                        });
                    });
                },

                impossibleAssociate: function() {
                    var self = this;
                    var messageModel = new Backbone.Model({
                        title: 'Operazione non valida',
                        description: "L'obiettivo non ha un accantonamento sufficiente per completare questa associazione.",
                        className: 'confirmation-dialog-safe',
                    });
                    goalPanel = new Confirm.Profile({
                        model: messageModel
                    });
                    goalPanel.on("cancel", function() {
                        self.layout.toggleBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay');
                    });
                    goalPanel.on("confirm", function() {
                        self.completeGoal();
                    });
                    self.layout.toggleBlur();
                    Appersonam.ActivitiesApp.trigger('show:overlay', goalPanel);
                },

                goalSelected: function() {
                    var self = this;
                    if (self.goal.get('completed') === true) {
                        if (parseFloat(self.goal.get('remaining')) >= parseFloat(self.movement.get('amount'))) {
                            self.associateGoal();
                        } else {
                            self.impossibleAssociate();
                        }
                    } else {
                        if (parseFloat(self.goal.get('currentAmount')) >= parseFloat(self.movement.get('amount'))) {
                            var confirmModel = new Backbone.Model({
                                title: 'Stai spendendo da un obiettivo non completato',
                                description: "L'obiettivo verrà considerato completato e la differenza tornerà disponibile nel tuo PUOI SPENDERE.",
                                button: 'Completa',
                                className: 'confirmation-dialog-safe',
                            });
                            goalPanel = new Confirm.Profile({
                                model: confirmModel
                            });
                            goalPanel.on("cancel", function() {
                                self.layout.toggleBlur();
                                Appersonam.ActivitiesApp.trigger('close:overlay');
                            });
                            goalPanel.on("confirm", function() {
                                self.completeGoal();
                            });
                            self.layout.toggleBlur();
                            Appersonam.ActivitiesApp.trigger('show:overlay', goalPanel);
                            //self.layout.goalRegion.show(goalPanel);
                        } else {
                            self.impossibleAssociate();
                        }
                    }
                },
                completeGoal: function() {
                    var self = this;
                    var currentAmount = self.goal.get('currentAmount');
                    self.goal.unset('deals');
                    self.goal.save({
                        completed: true,
                        total: currentAmount
                    }, {
                        serviceDestination: 'NEW',
                        success: function(data) { //goal complete for association
                            Appersonam.request('tracking:log:event', 'goal_complete');
                            self.associateGoal();
                        },
                        error: function(data) {}
                    });
                },
                associateGoal: function() {
                    var self = this;
                    self.goal.unset('deals');
                    this.movement.set({
                        goal: self.goal
                    }, {
                        silent: true
                    });
                    this.movement.save(null, {
                        serviceDestination: 'NEW',
                        success: function(data) { //goal asssociate movement
                            Appersonam.request('tracking:log:event', 'goal_associate_movement');
                            Appersonam.ActivitiesApp.trigger("goals:list", 'no-action', 0, null, '');
                            Appersonam.ActivitiesApp.trigger("nav:back", 'activities/goals', 1);
                            Appersonam.ActivitiesApp.trigger('close:overlay');
                            //Appersonam.ActivitiesApp.trigger('movements:show', self.movement, "refresh");
                        },
                        error: function(data) {}
                    });
                }
            }
        });
        return Appersonam.MovementsApp.GoalList.Controller;
    });
