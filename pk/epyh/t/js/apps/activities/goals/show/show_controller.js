define(["app",
    "apps/activities/goals/show/show_view",
    "common/image/profile/profile_view",
    "common/image/show/show_view",
    "common/confirm/profile_view",
    "common/dropdown/list/list_view",
    "common/deals/list/list_view",
    "common/deals/show/show_view",
    "common/innerloading/view"
], function(Appersonam, /*CompletedView, */ View, ImageProfile, ImageShow, Confirm, DropDown, DealsListViews, DealShowViews, InnerLoading) {
    Appersonam.module("GoalsApp.Show", function(Show, Appersonam, Backbone, Marionette, $, _) {
        Show.Controller = {
            sendDealsFeedback: function(service, idDeal, itemCode, queryString, goalId) {
                var feedbackData = {
                    service: service,
                    idDeal: goalId,
                    itemCode: idDeal,
                    queryString: itemCode,
                    idObiettivo: goalId,
                };
                var dealFeedback = Appersonam.request('deals:feedback', feedbackData);
                dealFeedback.save(null, {
                    withoutMethods: true,
                    showLoading: false,
                    success: function(result) {},
                    error: function(result) {}
                });
            },
            showEntity: function(object, mode) { //la navigazione tramite browser per ora non funziona perché manda dei numeri (id) e non delle entità
                var that = this;
                var entity = Appersonam.request('goal:entity:new', object.toJSON());
                var imageId = object.get('image');
                require(["entities/goal", "entities/file"], function() {
                    var fetchingImage = Appersonam.request("get:image", imageId, '#top-image');
                    var fetchingCategories = Appersonam.request("category:entities");
                    $.when(fetchingImage, fetchingCategories).done(function(image, categories) {
                        that.doneFetching(entity, image, mode, categories, object);
                    });
                });
            },
            showEntityById: function(id) { //la navigazione tramite browser per ora non funziona perché manda dei numeri (id) e non delle entità
                var that = this;
                require(["entities/goal", "entities/file"], function() {
                    var fetchingGoal = Appersonam.request("goal:entity", id);
                    $.when(fetchingGoal).done(function(entity) {
                        that.doneFetching(entity);
                    });
                });
            },
            showResult: function(success, message, onComplete) {
                var that = this;
                if (success === true) {
                    var confirmModel = new Backbone.Model({
                        title: 'Operazione completata con successo',
                        description: "",
                        button: 'OK',
                        className: 'information-dialog',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger',
                    });
                }
                var confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    that.entityView.removeBlur();
                    Appersonam.ActivitiesApp.trigger('close:overlay', '-result');
                });
                confirmPanel.on("confirm", function() {
                    if (onComplete) {
                        onComplete();
                    } else {
                        that.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay', '-result');
                        Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 1); //passando 0, non si scatenerà il trigger nav:back
                    }
                });

                Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel, '-result');
            },
            showMovements: function(movements) {
                if (movements && movements.length > 0) {
                    var associatedMovementsView = new View.Movements({
                        collection: movements
                    });
                    Appersonam.ActivitiesApp.trigger('show:main', associatedMovementsView, 3);
                    associatedMovementsView.on("back", function() {
                        Appersonam.ActivitiesApp.trigger("nav:back", '', 1);
                    });
                }
            },
            shareGoal: function() {
                var that = this;
                var shareUrl = this.entityView.model.get('shareUrl');
                if (!!that.entityView.model.get('shared')) {
                    that.entityView.model.save({
                        shared: false
                    }, {
                        silent: true,
                        showLoading: false,
                        success: function(result) {},
                        error: function(result) {

                        }
                    });
                    that.entityView.render();
                    Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //passando 0, non si scatenerà il trigger nav:back
                } else {
                    var shareCompleted = function() {
                        that.entityView.model.save({
                            shared: true
                        }, {
                            silent: true,
                            showLoading: false,
                            success: function(result) {
                                that.entityView.render();
                            },
                            error: function(result) {

                            }
                        });
                        Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //passando 0, non si scatenerà il trigger nav:back
                    };
                    var shareFailed = function(data) {
                        LogDB.log('Share goal error' + JSON.stringify(data));
                    };
                    SocialSharing.prototype.shareViaFacebook('', null, shareUrl, shareCompleted, shareFailed);
                }
            },
            doneFetching: function(entity, showImage, mode, categories, originalObject) {
                var that = this;
                var movements = new Array();
                this.wrapperView = new View.WrapperView();
                this.sidePanel = new View.SidePanelView({
                    model: entity
                });
                this.oldCategory = entity.get('category');
                this.wrapperView.on('show', function() {
                    this.centerRegion.show(that.entityView);
                    this.sideRegion.show(that.sidePanel);
                });
                var dropdown = new DropDown.DropdownItemsView({
                    collection: categories,
                    selectedItem: entity.get('category')
                });
                dropdown.on("item:selected", function(data) {
                    that.entityView.setProperty('category', data.toJSON());
                });
                var deviceVariables = Appersonam.request('global:get:device');
                that.entityView = null;
                if (entity.get('archived') === true) {
                    that.entityView = new View.ShowArchivedGoalView({
                        model: entity
                    });
                } else if (entity.get('completed') === true) {
                    that.entityView = new View.ShowCompletedGoalView({
                        model: entity
                    });
                } else if (entity.get('expired') === true) {
                    that.entityView = new View.ShowExpiredGoalView({
                        model: entity
                    });
                } else {
                    that.entityView = new View.ShowGoalView({
                        model: entity
                    });
                }
                var imageShowView = new ImageShow.ImageWidget({
                    model: showImage
                });
                that.entityView.on("more", function(entity) {
                    that.wrapperView.toggleMore();
                });

                that.entityView.on("show:movements", function() {
                    that.showMovements(movements);
                });

                var imageId = entity.get('image');
                var imageProfile = Appersonam.request("file:entity", imageId);
                that.entityView.on("back", function() {
                    Appersonam.ActivitiesApp.trigger("nav:back", 'activities/goals', 1);
                });

                that.entityView.on("goals:pause", function(viewModel) {
                    var entity = viewModel.clone();
                    var thisView = this;
                    entity.set({
                        paused: true
                    });
                    entity.unset('deals');
                    entity.save(null, {
                        serviceDestination: 'NEW',
                        silent: true,
                        showLoading: false,
                        success: function(result) {
                            Appersonam.request('tracking:log:event', 'goal_pause');
                            Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                            that.entityView.stopSpinner('pause');
                            setTimeout(function() {
                                viewModel.set({
                                    paused: true
                                }, {
                                    silent: false
                                });
                                that.showDealsCollection(thisView);
                                that.entityView.imageShowRegion.show(imageShowView);
                            }, 500);
                        },
                        error: function(result) {
                            that.showEntity(id);
                        }
                    });
                });
                that.entityView.on("goals:play", function(viewModel) {
                    var thisView = this;
                    if (parseFloat(Appersonam.CommonVariables['sts']) <= 0 /*|| viewModel.get('suspended')*/ ) {
                        var confirmModel = new Backbone.Model({
                            title: "Attenzione",
                            description: "Non puoi attivare questo obiettivo, il tuo puoi Puoi Spendere non &egrave; sufficiente.",
                            className: 'confirmation-dialog-safe',
                        });
                        that.entityView.stopSpinner('pause');
                        var confirmPanel = new Confirm.Profile({
                            model: confirmModel
                        });
                        Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel);
                        that.entityView.addBlur();
                        confirmPanel.on('cancel', function() {
                            that.entityView.removeBlur();
                            Appersonam.ActivitiesApp.trigger('close:overlay');
                        });
                    } else {
                        var entity = viewModel.clone();
                        entity.set({
                            paused: false
                        });
                        entity.unset('deals');
                        entity.save(null, {
                            serviceDestination: 'NEW',
                            silent: true,
                            showLoading: false,
                            success: function(result) {
                                Appersonam.request('tracking:log:event', 'goal_play');
                                Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                                that.entityView.stopSpinner('play');
                                setTimeout(function() {
                                    viewModel.set({
                                        paused: false,
                                        suspended: result.get('suspended')
                                    }, {
                                        silent: false
                                    });
                                    that.showDealsCollection(thisView);
                                    that.entityView.imageShowRegion.show(imageShowView)
                                }, 500);
                            },
                            error: function(result) {
                                that.showEntity(id);
                            }
                        });
                    }

                });

                that.entityView.on("goal:share", function(model) {
                    that.shareGoal();
                });

                that.entityView.on("transfer:sts", function(model) {
                    entity.unset('deals');
                    model.save({
                        currentAmount: 0
                    }, {
                        serviceDestination: 'NEW',
                        success: function(result) {
                            Appersonam.request('tracking:log:event', 'transfer_sts');
                            that.entityView.addBlur();
                            that.showResult(true, '', function() {
                                that.entityView.removeBlur();
                                Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                                Appersonam.ActivitiesApp.trigger('close:overlay', '-result');
                                Appersonam.ActivitiesApp.trigger('update:sts');
                            });
                        },
                        error: function(result) {}
                    });
                });

                var deleteGoal = function(model) {
                    var confirmModel = new Backbone.Model({
                        title: "Stai per eliminare l'obiettivo.",
                        description: "Se lo fai, la somma risparmiata per raggiungerlo tornerà a far parte dei soldi che puoi spendere",
                        button: 'Elimina obiettivo',
                        className: 'confirmation-dialog-danger',
                    });
                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel);
                    that.entityView.addBlur();
                    confirmPanel.on('cancel', function() {
                        that.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay');
                    });
                    confirmPanel.on('confirm', function() {
                        var goalId = model.id;
                        model.destroy({
                            serviceDestination: 'NEW',
                            success: function(result) {
                                Appersonam.request('tracking:log:event', 'goal_delete');
                                Appersonam.ActivitiesApp.trigger('close:overlay');
                                Appersonam.ActivitiesApp.trigger('goals:list', "refresh", 1);
                                that.sendDealsFeedback('obiettivoDelete', '', '', '', goalId);
                            },
                            error: function(result) {
                                Appersonam.ActivitiesApp.trigger('close:overlay');
                                Appersonam.ActivitiesApp.trigger('goals:list', "refresh", 1);
                            }
                        });
                    });
                };
                that.entityView.on("goal:complete", function(completeModel) {
                    if (completeModel.get('currentAmount') > 0) {
                        var confirmModel = new Backbone.Model({
                            title: "Stai per completare l'obiettivo",
                            description: "L'obiettivo sarà considerato completato e la differenza tornerà disponibile nel tuo PUOI SPENDERE.",
                            button: 'Completa',
                            className: 'complete-goal-dialog',
                        });
                        var confirmPanel = new Confirm.Profile({
                            model: confirmModel
                        });
                        Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel);
                        that.entityView.addBlur();
                        confirmPanel.on('cancel', function() {
                            that.entityView.removeBlur();
                            Appersonam.ActivitiesApp.trigger('close:overlay');
                        });
                        confirmPanel.on('confirm', function() {
                            var currentAmount = completeModel.get('currentAmount');
                            completeModel.set({
                                completed: true,
                                total: currentAmount
                            }, {
                                silent: true
                            });
                            entity.unset('deals');
                            completeModel.save(null, {
                                serviceDestination: 'NEW',
                                success: function(result) { //goal complete
                                    Appersonam.request('tracking:log:event', 'goal_complete');
                                    Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                                    Appersonam.ActivitiesApp.trigger('close:overlay');
                                    that.entityView.removeBlur();
                                    result.set({
                                        remaining: currentAmount,
                                        remainingPercentage: '1'
                                    }, {
                                        silent: true
                                    });
                                    that.doneFetching(result, showImage);
                                },
                                error: function(result) {

                                }
                            });
                        });
                    } else {
                        var confirmModel = new Backbone.Model({
                            title: "Attenzione",
                            description: "Non puoi completare un obiettivo senza accantonamenti.",
                            className: 'confirmation-dialog-safe',
                        });
                        var confirmPanel = new Confirm.Profile({
                            model: confirmModel
                        });
                        Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel);
                        that.entityView.addBlur();
                    }
                    confirmPanel.on('cancel', function() {
                        that.entityView.removeBlur();
                        that.entityView.uncheckCompleteGoal();
                        Appersonam.ActivitiesApp.trigger('close:overlay');
                    });
                });

                that.entityView.on('close', function() {
                    var newCategory = this.model.get('category');
                    if ((JSON.stringify(newCategory) === JSON.stringify(that.oldCategory))) {} else {
                        entity.unset('deals');
                        entity.set({
                            category: newCategory
                        });
                        entity.save(null, { //GOAL SET CATEGORY
                            showLoading: false,
                            serviceDestination: 'NEW',
                            success: function(data) {
                                console.log('dati aggiornati :');
                                console.log(data.toJSON());
                                originalObject.set({
                                    category: newCategory
                                });
                            },
                            error: function(data) {},
                            silent: true
                        });
                    }
                });

                var archiveGoal = function(archiveGoal) {
                    var confirmModel = new Backbone.Model({
                        header: 'Archivia',
                        title: "Stai per archiviare l’obiettivo.",
                        description: "Se lo fai, la somma risparmiata per raggiungerlo tornerà a far parte dei soldi che puoi spendere <br/><br /> L'obiettivo non sarà più modificabile.",
                        button: 'Archivia obiettivo',
                        className: 'archive-goal-dialog',
                    });
                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    Appersonam.ActivitiesApp.trigger('show:overlay', confirmPanel);
                    that.entityView.addBlur();
                    confirmPanel.on('cancel', function() {
                        that.entityView.removeBlur();
                        Appersonam.ActivitiesApp.trigger('close:overlay');
                    });
                    confirmPanel.on('confirm', function() {
                        archiveGoal.set({
                            archived: true
                        }, {
                            silent: true
                        });
                        entity.unset('deals');
                        archiveGoal.save(null, {
                            serviceDestination: 'NEW',
                            success: function(result) { //goal archive
                                Appersonam.request('tracking:log:event', 'goal_archive');
                                Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                                Appersonam.ActivitiesApp.trigger('close:overlay');
                                that.entityView.removeBlur();
                                that.doneFetching(result, showImage);
                                that.sendDealsFeedback('obiettivoArchive', '', '', '', archiveGoal.id);
                            },
                            error: function(result) {}
                        });
                    });
                };
                that.entityView.on('render', function() {
                    var imageProfileView = new ImageProfile.ImageWidget({
                        model: imageProfile,
                        platform: deviceVariables.platform
                    });
                    imageProfileView.on('image:selected', function(data, model) {
                        entity.unset('deals');
                        model.save({
                            content: data
                        }, {
                            serviceDestination: 'NEW',
                            success: function(result) {
                                imageShowView.model.set('content', data, {
                                    silent: false
                                });
                                that.entityView.imageUploaded();
                                setImageEntity(result, entity);
                            },
                            error: function(data) {}
                        });
                    });
                    that.entityView.imageProfileRegion.show(imageProfileView);
                });
                that.entityView.on('show', function() {
                    var self = this;
                    if (entity.get('completed') === true || entity.get('archived') === true) {
                        var fetchingAssociatedMovements = Appersonam.request('associated:movements', entity.get('id'));
                        $.when(fetchingAssociatedMovements).done(function(associatedMovements) {
                            if (associatedMovements.length > 0) {
                                movements = associatedMovements;
                                self.showMovementsRegion();
                            }
                        });
                    }
                    if (Appersonam.CommonVariables.isDealsActive && entity.get('archived') !== true && self.model.get('deals') && self.model.get('deals').length > 0) {
                        // var listView = new DealsListViews.ListView({
                        //     collection: Appersonam.request('empty:deals:list')
                        // });
                        // self.dealsRegion.show(listView);
                        // listView.collection.reset(self.model.get('deals'), {
                        //     silent: true
                        // });
                        // listView.fillHtml(0);
                        // listView.on('show:deal', function(selectedDeal) {
                        //     that.showDeal(selectedDeal);
                        // });
                        // self.showDeals();
                        that.showDealsCollection(self);
                    }
                    this.imageShowRegion.show(imageShowView);
                    this.dropdownRegion.show(dropdown);
                });

                that.entityView.on('render', function() {
                    this.imageShowRegion.show(imageShowView);
                    this.dropdownRegion.show(dropdown);
                });

                that.sidePanel.on('edit', function() {
                    setTimeout(function() {
                        that.wrapperView.toggleMore();
                    }, 600);
                    Appersonam.ActivitiesApp.trigger("goals:edit", that.entityView.model);
                });
                that.sidePanel.on('delete', function() {
                    deleteGoal(that.entityView.model);
                });
                that.sidePanel.on('archive', function() {
                    archiveGoal(that.entityView.model);
                });
                if (mode === 'refresh') {
                    Appersonam.ActivitiesApp.trigger('refresh:panel', that.wrapperView, 2);
                    Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                    Appersonam.ActivitiesApp.trigger("nav:back", 'activities/goals/' + entity.get('id'), 1);
                } else {
                    Appersonam.ActivitiesApp.trigger('show:main', that.wrapperView, 2);
                }
                var setImageEntity = function(image, entity) {
                    entity.unset('deals');
                    entity.save({
                        image: image.get('id')
                    }, {
                        silent: true,
                        serviceDestination: 'NEW',
                        success: function(result) {
                            Appersonam.ActivitiesApp.trigger('goals:list', 'refresh', 0); //aggiorno la lista, e passando 0, non si scatenerà il trigger nav:back
                        }
                    }, {
                        error: function(data) {}
                    });
                };
            },
            showDeal: function(dealToShow) {
                var that = this;
                var showDealView = new DealShowViews.ShowView({
                    model: dealToShow
                });
                showDealView.on('back', function() {
                    Appersonam.ActivitiesApp.trigger("nav:back", '', 1);
                });
                showDealView.on('openDeal', function() {
                    that.sendDealsFeedback('dealLinkClick', dealToShow.get('id'), dealToShow.get('item').productId, '', '');
                });
                Appersonam.ActivitiesApp.trigger('show:main', showDealView, 3);
            },
            showDealsCollection: function(mainView) {
                var that = this;
                var listView = new DealsListViews.ListView({
                    collection: Appersonam.request('empty:deals:list')
                });
                mainView.dealsRegion.show(listView);
                listView.collection.reset(mainView.model.get('deals'), {
                    silent: true
                });
                listView.fillHtml(0);
                listView.on('show:deal', function(selectedDeal) {
                    that.showDeal(selectedDeal);
                });
                mainView.showDeals();
            }
        }
    });
    return Appersonam.GoalsApp.Show.Controller;
});
