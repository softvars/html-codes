define(["app",
    "moment",
    'templates',
    'backbone.hammer'
], function (Appersonam, moment, JST, hammer) {
    Appersonam.module("Common.GoalsList.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        moment.lang('it');
        var pullToRefresh = false;

        Handlebars.registerHelper('percentage_string', function () {
            return Math.round(this.percentage * 100);
        });

        Handlebars.registerHelper('goal_status_description', function () {
            return new Handlebars.SafeString(
                '<span>' + this.currentAmount + '€</span> di <span>' + this.total + '€</span> entro ' + moment(new Date(this.endDate)).format('DD MMM YYYY'));
        });

        View.Layout = Marionette.Layout.extend({
            template: JST['assets/js/common/goals/list/templates/layout.html'],
            className: "goals-wrapper",
            regions: {
                loadingListRegion: "#loading-goals-list-region",
                panelRegion: "#panel-region",
                entitiesRegion: "#entities-region"
            },
            hammerEvents: {
                'dragdown': 'showMenu',
                'dragup': 'hideMenu',
                //'release' : 'releasePullToRefresh',
            },
            hammerOptions: {
                tap: true,
                drag: true,
                drag_lock_to_axis: false,
                drag_block_vertical: false,
                release: true,
                swipe: true,
                touch: true,
            },
            loading: function (value) {
                if (value) {
                    this.$el.find('#entities-region').addClass('loading');
                }
                else {
                    this.$el.find('#entities-region').removeClass('loading');
                }
            },
            onRender: function () {
                this.waiting = false;
                var self = this;
                setTimeout(function () {
                    console.log('lunghezza collezione  ' + length);
                    try {
                        self.firstElementInitialOffset = $('.goals-item').first().offset().top;
                    }
                    catch (ex) {
                        LogDB.log('errore calcolo offset primo elemento lista obiettivi => ' + ex.message);
                        self.firstElementInitialOffset = 300;
                        console.log(ex);
                    }
                }, 800);
            },
            onShow: function () {
                var self = this;
                var panelRegion = this.$el.find("#panel-region");
                var activitiesPanel = this.$el.closest(".activities-wrapper");
                panelRegion.addClass("floating-add-button");
                panelRegion.appendTo(activitiesPanel);
                /*setTimeout(function () {
                    console.log('lunghezza collezione  ' + length); 
                    self.firstElementInitialOffset = $('.goals-item').first().offset().top;
                }, 800);*/
            },
            hideMenu: function () {
                if (!$('.home-header').hasClass('minified')) {
                    //console.log('hide');
                    if ($('#activities-navigation-region').hasClass('rotate')) {
                        Appersonam.ActivitiesApp.trigger('toggle:sts');
                        setTimeout(function () {
                            $('.home-header').addClass('minified');
                        }, 500);
                    } else {
                        Appersonam.ActivitiesApp.trigger('toggle:sts');
                        $('.home-header').addClass('minified');
                    }
                }

            },
            showMenu: function (e) {
                var self = this;
                if ($('.home-header').hasClass('minified')) {
                    $('.home-header').removeClass('minified');
                }
                try {
                    if ((100 + $('.goals-item').first().offset().top) > self.firstElementInitialOffset && self.waiting !== true) {
                        $('#activities-navigation-region li.goals > a').click();
                        this.waiting = true;
                    }
                }
                catch (ex) {
                    LogDB.log('errore show menu lista obiettivi => ' + ex.message);
                }
                
                // si richiama la seconda funzione del dragdown
                //this.dragdownPullToRefresh(e);
            },
        });

        View.AssociateMovementLayout = View.Layout.extend({
            template: JST['assets/js/common/goals/list/templates/movement_layout.html'],
            className: "goals-wrapper-movements",
            regions: {
                topRegion: "#top-region",
                goalRegion: "#goal-region",
                listRegion: "#entities-region"
            },
            toggleBlur: function () {
                this.$el.toggleClass('blurred-element');
            },
        });

        View.TopPanel = Marionette.ItemView.extend({
            template: JST['assets/js/common/goals/list/templates/top_panel.html'],
            events: {
                'click a.back': 'back'
            },
            back: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('back');
            }
        });

        View.Panel = Marionette.ItemView.extend({
            template: JST['assets/js/common/goals/list/templates/panel.html'],
            className: "add-goal-bar",
            events: {
                "click .add-char": "newClicked"
            },
            hideDailyRate: function () {
                $('.daily-rate').hide();
            },
            newClicked: function (event) {
                event.preventDefault();
                this.trigger("goals:new");
            }
        });

        View.ListPanel = Marionette.Layout.extend({
            template: JST['assets/js/common/goals/list/templates/list_panel.html'],
            className: "goals-container",
            hideDailyRate: function () {
                $('.daily-rate').hide();
            },
            regions: {
                completedRegion: '#completed',
                pausedRegion: '#paused',
                onGoingRegion: '#onGoing',
                expiredRegion: '#expired',
                archivedRegion: '#archived',
            }
        });

        View.Entity = Marionette.ItemView.extend({
            template: JST['assets/js/common/goals/list/templates/list_item.html'],
            className: "goals-item",
            events: {
                "click": "clicked"
            },
            initialize: function () {

            },
            clicked: function (e) {
                e.preventDefault();
                //e.stopPropagation();
                this.trigger("clicked", this.model);
            },
            onShow: function () {
                this.$el.find('.main-list-item').addClass(this.options.type);
            },
            remove: function () {
                var self = this;
                this.$el.fadeOut(function () {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });


        View.NoEntitiesView = Marionette.ItemView.extend({
            template: JST['assets/js/common/goals/list/templates/none.html'],
            tagName: "div",
            className: "empty-list",
            initialize: function () {
                console.log();
            },
            onShow: function () {
                var number = 1 + Math.floor(Math.random() * 2);
                this.$el.find('.message').hide();
                this.$el.find('.message_' + number).show();
            }
        });


        View.Entities = Marionette.CompositeView.extend({
            template: JST['assets/js/common/goals/list/templates/list.html'],
            //emptyView: NoEntitiesView,
            className: "goals-container-block",
            itemView: View.Entity,
            itemViewContainer: ".content",
            initialize: function () {
                this.listenTo(this.collection, "reset", function () {
                    this.appendHtml(collectionView, itemView, index);
                });
                this.on("itemview:clicked", function (childView, model) {
                    Appersonam.ActivitiesApp.trigger("goals:show", model);
                });
            },
            buildItemView: function (item, ItemView) {
                var view = new ItemView({
                    model: item,
                    type: this.options.type
                });
                return view;
            },
            onShow: function () {
                this.$el.find('.list-block-title').html(this.options.title)
            },
        });
        View.MovementsEntities = Marionette.CompositeView.extend({
            template: JST['assets/js/common/goals/list/templates/list.html'],
            itemView: View.Entity,
            itemViewContainer: ".content",
            className: "goals-container-block",
            initialize: function () {
                this.listenTo(this.collection, "reset", function () {
                    this.appendHtml();
                });
                this.on("itemview:clicked", function (childView, model) {
                    this.trigger("goal:selected", model);
                });
            },
            onShow: function () {
                this.$el.find('.list-block-title').html(this.options.title)
            },

            onCompositeCollectionRendered: function () {
                this.appendHtml = function (collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                }
            }
        });

    }, Handlebars);
    return Appersonam.Common.GoalsList.View;
});