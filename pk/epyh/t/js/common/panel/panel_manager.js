define(["app",
    'templates',
], function(Appersonam, JST) {

    Appersonam.module("Common.Panel.View", function(View, Appersonam, Backbone, Marionette, $, _) {

        View.Panels = Marionette.Layout.extend({
            template: JST['assets/js/common/panel/templates/container.html'],
            className: 'panel-manager',
            initialize: function() {
                this.currentLevel = 0; //forse non serve
                this.levelAmount = 0;
                this.backActive = true;
                var self = this;
                this.overLayPanels = new Array();
            },
            closeTopOverlay: function() {
                var topOverlay = this.overLayPanels[(this.overLayPanels.length - 1)];
                this.overLayPanels.pop();
                topOverlay.close();
                $('.blurred-element').removeClass('blurred-element');
            },
            backButton: function() {
                if (Appersonam.CommonVariables['locked'] !== true) {
                    var self = this;
                    if (this.backActive === true) {
                        this.backActive = false;

                        if (this.onBackFunction) {
                            this.onBackFunction();
                        } else {
                            var hasPersistentRegions = _.findWhere(this.overLayPanels, {
                                persistent: true
                            });
                            if (this.overLayPanels.length > 0 && !hasPersistentRegions && $('#overlay-content-lckscrn').length === 0) { //controllo il loggingout perché in caso di screen lock non devo chiudere l'overlay
                                this.closeTopOverlay();
                            } else {
                                if ($('#overlay-content-lckscrn').length === 1) { //caso screen lock
                                    Appersonam.NavigationApp.trigger("exit:app", true, '#overlay-content-lckscrn');
                                } else if (this.currentLevel <= 1) {
                                    if (Appersonam.currentApp.moduleName === 'ActivitiesApp' || Appersonam.currentApp.moduleName === 'LoginApp') {
                                        //navigator.app.exitApp();
                                        if ($('.main-content').hasClass('toggled-android') || $('.main-content').hasClass('toggled')) {
                                            Appersonam.NavigationApp.trigger('corner:menu');
                                        } else {
                                            Appersonam.NavigationApp.trigger("exit:app", true); //true = chiedi conferma prima di chiudere l'app 
                                        }
                                    } else {
                                        if ($('.main-content').hasClass('toggled-android') || $('.main-content').hasClass('toggled')) {
                                            Appersonam.trigger('activities', 'movements:list');
                                        } else {
                                            Appersonam.NavigationApp.trigger('corner:menu');
                                        }
                                    }
                                } else if (this.currentLevel > 1) {
                                    this.removeView(1);
                                }
                            }
                        }
                        setTimeout(function() {
                            self.backActive = true;
                        }, 500);
                    }
                } else {
                    //navigator.app.exitApp();
                }
            },
            goTo: function(childView, index) {
                if (this.levelAmount > index) {
                    //sto tornando indietro, probabilmente tramite freccette browser
                    this.removeView((this.levelAmount - index));
                } else if (this.levelAmount < index) {
                    //sto andando avanti
                    this.addView(childView);
                } else {
                    //aggiorno la view corrente 
                    this.refresh(childView, index);
                }
                //chiudo eventuale overlay
                this.closeOverlay();
            },
            refresh: function(childView, index) {
                var panel = this.regionManager.get('panel_' + (index));
                panel.show(childView);
            },
            showOverlay: function(childView, index) {
                var self = this;
                if (!index) {
                    index = '';
                }
                this.$el.append('<section id="overlay-content' + index + '" class="overlay-panel active"></section>');
                this.addRegion('overlayRegion' + index, '#overlay-content' + index);
                var overLayRegion = this.regionManager.get('overlayRegion' + index);
                if (childView.persistent === true) {
                    overLayRegion.persistent = true;
                }
                this.overLayPanels.push(overLayRegion);
                overLayRegion.show(childView);

            },
            closeOverlay: function(index) {
                if (!index) {
                    index = '';
                }
                var overLayRegion = this.regionManager.get('overlayRegion' + index);
                if (overLayRegion) {
                    overLayRegion.close();
                    this.$el.find('#overlay-content' + index).remove();
                    var index = this.overLayPanels.indexOf(overLayRegion);
                    if (index > -1) {
                        this.overLayPanels.splice(index, 1);
                    }
                }
            },
            addView: function(childView) {
                var self = this;
                this.currentLevel++;
                this.levelAmount++;

                var startPosition = "right";
                if (this.levelAmount == 1) {
                    startPosition = "center";
                }

                var prevPanel = this.regionManager.get('panel_' + (this.levelAmount - 1));
                this.$el.append('<section id="panel_' + this.levelAmount + '"  data-level="' + this.levelAmount + '" class="panel ' + startPosition + '"></section>');
                this.addRegion('panel_' + this.levelAmount, '#panel_' + this.levelAmount);

                var nextPanel = this.regionManager.get('panel_' + (this.levelAmount));

                childView.on('show', function() {
                    setTimeout(function() {
                        if (prevPanel) {
                            self.$el.find('#panel_' + (self.levelAmount - 1)).removeClass('center').addClass('left');
                            self.$el.find('#panel_' + (self.levelAmount)).removeClass('right').addClass('center');
                        } else {
                            // se sono all'inizio della navigazione non esiste un pannello precedente a questo
                            self.$el.find('#panel_' + (self.levelAmount)).addClass('center');
                        }
                    }, 100);
                });
                nextPanel.show(childView);
            },
            removeView: function(quantity) {
                if (Appersonam.CommonVariables.locked !== true) {
                    Appersonam.CommonVariables.locked = true;
                    var i = 1;
                    var self = this;
                    while (i < quantity) {
                        var panelToDelete = this.regionManager.get('panel_' + (this.levelAmount - i));
                        panelToDelete.close();
                        this.$el.find('#panel_' + (this.levelAmount - i)).remove();
                        i++;
                    }
                    //dopo aver rimosso le view intermedie, rimuovo quella più a destra
                    var nextPanel = this.regionManager.get('panel_' + (this.levelAmount));
                    if (nextPanel) {
                        var prevPanel = this.regionManager.get('panel_' + (this.levelAmount - 1));
                        this.$el.find('#panel_' + (this.levelAmount - quantity)).toggleClass('left').addClass('center'); //torno al pannello precedente
                        this.$el.find('#panel_' + (this.levelAmount)).addClass('right').removeClass('center');
                        self.levelAmount -= quantity;
                        self.currentLevel -= quantity;
                        setTimeout(function() {
                            self.$el.find('#panel_' + (self.levelAmount + quantity)).remove();
                            nextPanel.close();
                            Appersonam.CommonVariables.locked = false;
                        }, 500);
                    }
                }
            },
            /* Gesture */
            handleSwipeRight: function(event) {
                event.gesture.stopDetect();
                this.backToPreviousPanel();
            },
            backToPreviousPanel: function() {
                if (this.levelAmount > 1) {
                    this.removeView(1);
                } else {
                    Appersonam.NavigationApp.trigger('corner:menu');
                }
            }
        });
    });
    return Appersonam.Common.Panel.View;
});
